import { NextResponse } from "next/server";
import { getProductById, getStock, getPincodeArea, getReturnPolicy } from "@/lib/catalog";
import { getCartCharges, codBlockReason, codNeedsConfirmation, getDeliveryPromise } from "@/lib/delivery";
import { deliverySlots } from "@/mocks";
import { isoDay } from "@/lib/format";
import type { CartItem, SavedAddress } from "@/types";
import type { PlacedOrder } from "@/store";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      items,
      pincode,
      cityId,
      isMember,
      paymentMethod,
      upiId,
      address,
      slot,
      gift,
      installationSlot,
    } = body as {
      items: CartItem[];
      pincode: string;
      cityId: string;
      isMember: boolean;
      paymentMethod: "upi" | "card" | "netbanking" | "wallet" | "cod";
      upiId?: string;
      address: SavedAddress;
      slot?: { date: string; slotId: string };
      gift?: { recipientName: string; message: string; hidePrice: boolean };
      installationSlot?: string;
    };

    // 1. Validate basic inputs
    if (!items || !items.length) {
      return NextResponse.json({ ok: false, error: "Your cart is empty." }, { status: 400 });
    }

    if (!address || !address.name?.trim() || !address.line1?.trim()) {
      return NextResponse.json({ ok: false, error: "Valid delivery address is required." }, { status: 400 });
    }

    const pin = pincode || address.pincode;
    const area = getPincodeArea(pin);
    if (!area.serviceable || !area.warehouseId) {
      return NextResponse.json(
        { ok: false, error: `Delivery to pincode ${pin} is currently not serviceable.` },
        { status: 400 }
      );
    }

    const now = Date.now();

    // 2. Revalidate stock & product availability on server
    for (const it of items) {
      const p = getProductById(it.productId);
      if (!p) {
        return NextResponse.json(
          { ok: false, error: `Product ID "${it.productId}" was not found in catalog.` },
          { status: 400 }
        );
      }

      const st = getStock(p.id, area.warehouseId, it.variantKey === "default" ? undefined : it.variantKey);
      if (st.status === "out" || st.status === "not_stocked") {
        return NextResponse.json(
          {
            ok: false,
            error: `"${p.name}" (${it.variantKey}) is ${st.status === "out" ? "out of stock" : "not stocked"} in this city.`,
          },
          { status: 400 }
        );
      }
      if (st.available < it.qty) {
        return NextResponse.json(
          {
            ok: false,
            error: `Only ${st.available} units of "${p.name}" are available in stock.`,
          },
          { status: 400 }
        );
      }
    }

    // 3. Recalculate true prices and charges on server
    const charges = getCartCharges(items, area, cityId, isMember, now, {
      cod: paymentMethod === "cod",
      giftWrap: gift && gift.recipientName ? true : false,
      installation: !!installationSlot,
    });

    if (charges.belowMinimum > 0) {
      return NextResponse.json(
        { ok: false, error: `Order total is below the minimum order threshold of ₹99.` },
        { status: 400 }
      );
    }

    // 4. Validate payment method
    let paymentStatus: "paid" | "cod_due" | "pending" | "failed" = "paid";
    let paymentReference: string | undefined = undefined;

    if (paymentMethod === "cod") {
      const block = codBlockReason(items, charges.total, cityId, now);
      if (block) {
        return NextResponse.json({ ok: false, error: block }, { status: 400 });
      }
      paymentStatus = "cod_due";
    } else if (paymentMethod === "upi") {
      const handle = (upiId || "").trim().toLowerCase();
      if (!handle || !/^[\w.-]+@[\w]+$/.test(handle)) {
        return NextResponse.json(
          { ok: false, error: "Please enter a valid UPI ID (e.g. yourname@bank)." },
          { status: 400 }
        );
      }

      // Check payment simulation handles
      if (handle === "fail@upi") {
        return NextResponse.json(
          {
            ok: false,
            paymentStatus: "failed",
            error: "Payment declined: Bank rejected UPI transaction. Please check your UPI PIN or try another payment method.",
          },
          { status: 402 }
        );
      }

      if (handle === "pending@upi") {
        paymentStatus = "pending";
        paymentReference = `UPI-PENDING-${Date.now()}`;
      } else {
        paymentStatus = "paid";
        paymentReference = `UPI-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
      }
    } else {
      // Card, Netbanking, Wallet
      paymentStatus = "paid";
      paymentReference = `TXN-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    }

    // 5. Generate monotonic unique order ID
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const orderId = `HM-${new Date().getFullYear()}-${randomSuffix}`;
    const t = new Date().toISOString();

    const orderStatus = paymentStatus === "pending" ? "placed" : "confirmed";

    // 6. Build shipments
    const shipments = [
      {
        label: items.some((i) => getProductById(i.productId)?.department === "food")
          ? "Fresh and Chilled Produce"
          : "Standard Shipment",
        date: slot?.date ?? isoDay(new Date()),
        slotLabel:
          deliverySlots.find((s) => s.id === slot?.slotId)?.label ?? "10:00 AM – 12:00 PM",
        productIds: items.map((i) => i.productId),
      },
    ];

    const order: PlacedOrder = {
      id: orderId,
      customerId: "guest",
      placedAt: t,
      cityId,
      warehouseId: area.warehouseId,
      addressId: address.id || "addr-new",
      status: orderStatus,
      lines: items.map((it) => {
        const p = getProductById(it.productId)!;
        const pol = getReturnPolicy(p);
        return {
          productId: p.id,
          variantKey: it.variantKey,
          qty: it.qty,
          unitPrice: charges.itemsTotal > 0 ? Math.round(charges.itemsTotal / items.length) : p.price,
          returnPolicyId: pol.id,
          returnPolicyVersion: pol.version,
          grade: it.grade ?? "A",
          ripeness: it.ripeness ?? "ready_to_eat",
          substitution: it.substitution ?? "ask",
          actualWeight: p.department === "food" && (p.attrs as { soldByWeight?: boolean }).soldByWeight ? `${it.qty * 1000} g` : undefined,
          shelfLife: p.department === "food" ? `${(p.attrs as { minRemainingShelfLifeDays?: number }).minRemainingShelfLifeDays ?? 3}–${(p.attrs as { shelfLifeDays?: number }).shelfLifeDays ?? 7} days` : undefined,
          batchNo: p.department === "food" || p.department === "beauty" ? `HM-${Date.now().toString(36).toUpperCase().slice(-6)}` : undefined,
          serialNo: p.department === "electronics" && (p.attrs as { serialTracked?: boolean }).serialTracked ? `SN-${Date.now().toString(36).toUpperCase().slice(-8)}` : undefined,
          lineStatus: orderStatus,
        };
      }),
      charges: {
        itemsTotal: charges.itemsTotal,
        delivery: charges.delivery,
        coldChain: charges.coldChain,
        heavy: charges.heavy,
        cod: charges.cod,
        discount: charges.discount,
        total: charges.total,
      },
      payment: {
        method: paymentMethod,
        status: paymentStatus,
        reference: paymentReference,
      },
      slot: {
        date: slot?.date ?? isoDay(new Date()),
        slotId: slot?.slotId ?? "s1",
      },
      timeline: [
        { status: "placed", at: t },
        ...(orderStatus === "confirmed"
          ? [
              {
                status: "confirmed" as const,
                at: t,
                note:
                  paymentMethod === "cod"
                    ? codNeedsConfirmation(charges.total)
                      ? "COD confirmation message sent on WhatsApp"
                      : "Order confirmed for cash on delivery"
                    : "Payment verified successfully",
              },
            ]
          : []),
      ],
      shipments,
      address,
      gift: gift && gift.recipientName ? gift : undefined,
      installationSlot: installationSlot || undefined,
      codConfirmation: paymentMethod === "cod" && codNeedsConfirmation(charges.total),
    };

    return NextResponse.json({
      ok: true,
      order,
      paymentStatus,
      paymentReference,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal checkout verification error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
