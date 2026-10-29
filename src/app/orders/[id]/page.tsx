"use client";
import Link from "next/link";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import {
  CheckCircle2,
  Truck,
  MapPin,
  CreditCard,
  Package,
  KeyRound,
  Snowflake,
  Wrench,
  RotateCcw,
  FileText,
  Repeat,
  FastForward,
  XCircle,
  Gift,
  HelpCircle,
  ShieldCheck,
  Sparkles,
  Clock,
  AlertTriangle,
  ChevronRight,
  ShoppingCart,
  Ruler,
  Droplet,
  Laptop,
  Settings,
  Home,
  Download,
  Calendar,
  DoorClosed,
  Headphones,
  X,
  Check,
} from "lucide-react";
import type { OrderStatus } from "@/types";
import { TaskPage } from "@/components/layout/TaskPage";
import { ProductArt } from "@/components/product/ProductArt";
import {
  Pill,
  btn,
  Dialog,
  Field,
  inputCls,
  InfoBar,
  toast,
  EmptyState,
  LinkButton,
} from "@/components/ui/primitives";
import { useAllOrders, isDemoOrder, STATUS } from "@/lib/orders";
import { useOrders, type PlacedOrder } from "@/store";
import { getProductById, getReturnPolicy, productsInCity } from "@/lib/catalog";
import { getPrice } from "@/lib/pricing";
import { formatDay, formatINR, formatTime, addDays, isoDay } from "@/lib/format";
import { orderChangeRules, returnPolicies } from "@/mocks";
import { cn } from "@/lib/cn";
import { QualityComplaintModal } from "@/components/pdp/modals/QualityComplaintModal";
import { EditSizeModal } from "@/components/pdp/modals/EditSizeModal";
import { WarrantyModal } from "@/components/pdp/modals/WarrantyModal";
import { CompatibilityModal } from "@/components/pdp/modals/CompatibilityModal";
import { HomeFitModal } from "@/components/pdp/modals/HomeFitModal";

const FLOW: OrderStatus[] = [
  "placed",
  "confirmed",
  "picking",
  "packed",
  "out_for_delivery",
  "delivered",
];

function OrderView() {
  const { id } = useParams<{ id: string }>();
  const sp = useSearchParams();
  const orders = useAllOrders();
  const { updateOrder } = useOrders();
  const [demoPatch, setDemoPatch] = useState<Partial<PlacedOrder>>({});
  const found = orders.find((o) => o.id === id);

  const [cancel, setCancel] = useState(false);
  const [ret, setRet] = useState<string | null>(null);
  const [sub, setSub] = useState<string | null>(null);
  const [complaintOpen, setComplaintOpen] = useState(false);

  if (!found) {
    return (
      <TaskPage>
        <EmptyState
          icon={<Package className="h-7 w-7" />}
          title="We couldn't find that order"
          action={<LinkButton href="/orders">My orders</LinkButton>}
        />
      </TaskPage>
    );
  }

  const o = { ...found, ...demoPatch } as PlacedOrder;
  const demo = isDemoOrder(o.id);
  const patch = (p: Partial<PlacedOrder>) =>
    demo ? setDemoPatch({ ...demoPatch, ...p }) : updateOrder(o.id, p);
  const idx = FLOW.indexOf(o.status);
  const editable = (orderChangeRules.editableStatuses as readonly string[]).includes(o.status);
  const highValue = o.lines.some((l) => getProductById(l.productId)?.handling.includes("high_value"));
  const [label, tone] = STATUS[o.status];

  const next = () => {
    const n = FLOW[idx + 1];
    if (!n) return;
    patch({
      status: n,
      timeline: [...o.timeline, { status: n, at: new Date().toISOString() }],
      lines: o.lines.map((l) =>
        ["returned", "refunded", "substituted"].includes(l.lineStatus) ? l : { ...l, lineStatus: n }
      ),
    });
  };

  const doCancel = (reason: string) => {
    const prepaid = o.payment.method !== "cod";
    patch({
      status: "cancelled",
      timeline: [
        ...o.timeline,
        { status: "cancelled", at: new Date().toISOString(), note: reason },
      ],
      refund: prepaid
        ? {
            amount: o.charges.total,
            expected: isoDay(addDays(new Date(), 5)),
            status: "Refund initiated",
          }
        : undefined,
    });
    setCancel(false);
    toast("Order cancelled");
  };

  const isElectronicsDemo = o.id === "OD72845193";
  const isFashionDemo = o.id === "OD12897654";
  const isFoodDemo = o.id === "OD12345678";
  const isDedicatedDemo = isElectronicsDemo || isFashionDemo || isFoodDemo;

  const [cancelReason, setCancelReason] = useState("Ordered by mistake");
  const [retReason, setRetReason] = useState("defective");
  const [retNotes, setRetNotes] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const hasFoodItem = o.lines.some(
    (l) => getProductById(l.productId)?.department === "food"
  );
  const foodLine = o.lines.find(
    (l) => getProductById(l.productId)?.department === "food"
  );
  const foodProduct = foodLine ? getProductById(foodLine.productId) : null;

  const hasFashionItem = o.lines.some(
    (l) => getProductById(l.productId)?.department === "fashion"
  );
  const fashionLine = o.lines.find(
    (l) => getProductById(l.productId)?.department === "fashion"
  );
  const fashionProduct = fashionLine ? getProductById(fashionLine.productId) : null;
  const [editSizeOpen, setEditSizeOpen] = useState(false);
  const [fashionSize, setFashionSize] = useState<string | null>(null);
  const currentSize =
    fashionSize ??
    (fashionLine?.variantKey.split("|")[0] && fashionLine?.variantKey.split("|")[0] !== "default"
      ? fashionLine?.variantKey.split("|")[0]
      : "L");
  const currentColour = fashionLine?.variantKey.split("|")[1] || "Blue";

  const hasElectronicsItem = o.lines.some(
    (l) => getProductById(l.productId)?.department === "electronics"
  );
  const electronicsLine = o.lines.find(
    (l) => getProductById(l.productId)?.department === "electronics"
  );
  const electronicsProduct = electronicsLine ? getProductById(electronicsLine.productId) : null;
  const [editOrderOpen, setEditOrderOpen] = useState(true);
  const [reviewChangeOpen, setReviewChangeOpen] = useState(true);
  const [orderConfig, setOrderConfig] = useState(
    electronicsLine?.variantKey && electronicsLine.variantKey !== "default"
      ? electronicsLine.variantKey
      : "16 GB RAM / 512 GB SSD"
  );
  const [orderModel, setOrderModel] = useState("TL14-512");
  const [warrantyOpen, setWarrantyOpen] = useState(false);
  const [compatibilityOpen, setCompatibilityOpen] = useState(false);
  const [homeFitOpen, setHomeFitOpen] = useState(false);

  return (
    <TaskPage
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Orders", href: "/orders" },
        { label: `Order #${o.id}` },
      ]}
    >
      {/* Top Bar with Timestamp */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
        <div className="flex items-center gap-2">
          <Link href="/orders" className="hover:text-ink">
            &lsaquo; Back to all orders
          </Link>
        </div>
        <span>
          Ordered on {formatDay(o.placedAt)}, {formatTime(o.placedAt)}
        </span>
      </div>

      {/* ── Screen 9: Order Confirmed Status Banner (Fashion Demo) ── */}
      {o.status === "confirmed" && isFashionDemo && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-line/80 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-black text-white shrink-0">
              <CheckCircle2 className="h-6 w-6 text-white" />
            </span>
            <div>
              <h1 className="text-xl font-extrabold text-ink sm:text-2xl">Order Confirmed</h1>
              <p className="text-xs text-muted sm:text-sm">
                Thank you! Your order has been placed.
              </p>
              <p className="text-xs text-muted mt-1">
                Order #{o.id} &nbsp;|&nbsp; Placed on {formatDay(o.placedAt)}, {formatTime(o.placedAt)}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("order-summary");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="rounded-2xl border border-line bg-white px-4 py-2.5 text-xs font-bold text-ink shadow-xs transition hover:bg-bg"
          >
            View order details &rsaquo;
          </button>
        </div>
      )}

      {/* ── Screen 9: 5-Minute Pre-Fulfillment Edit Countdown Banner (Electronics Demo) ── */}
      {isElectronicsDemo && (
        <div className="mb-6 rounded-3xl border border-line/80 bg-white p-5 shadow-sm space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-black text-white shrink-0">
                <Clock className="h-5 w-5 text-white" />
              </span>
              <div>
                <h2 className="text-sm font-extrabold text-ink sm:text-base">
                  Edit order available &mdash; 04:59 remaining
                </h2>
                <p className="text-xs text-muted">
                  You can still make changes to your order. Review and confirm before time runs out.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setEditOrderOpen(!editOrderOpen);
                setReviewChangeOpen(true);
              }}
              className="rounded-2xl bg-[#17201B] hover:bg-black text-white px-5 py-2.5 text-xs font-bold transition shadow-sm"
            >
              {editOrderOpen ? "Hide edit options" : "Edit Order"}
            </button>
          </div>
        </div>
      )}

      {/* ── Screen 9: 5-Minute Pre-Fulfillment Edit Countdown Banner (Fashion Demo) ── */}
      {o.status === "confirmed" && isFashionDemo && (
        <div className="mb-6 rounded-3xl border border-line/80 bg-white p-5 shadow-sm space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-black text-white shrink-0">
                <Clock className="h-5 w-5 text-white" />
              </span>
              <div>
                <h2 className="text-sm font-extrabold text-ink sm:text-base">
                  Edit order available &mdash; 04:59 remaining
                </h2>
                <p className="text-xs text-muted">
                  Make changes to your order before preparation starts.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setEditSizeOpen(true)}
              className="rounded-2xl bg-[#17201B] hover:bg-black text-white px-5 py-2.5 text-xs font-bold transition shadow-sm"
            >
              Edit order
            </button>
          </div>
          <p className="text-[11px] text-muted pl-13">Editing closes when preparation starts.</p>
        </div>
      )}

      {/* ── Screen 9: Delivered Status Banner (Food Demo) ── */}
      {o.status === "delivered" && isFoodDemo && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-line/80 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-black text-white shrink-0">
              <CheckCircle2 className="h-6 w-6 text-white" />
            </span>
            <div>
              <h1 className="text-xl font-extrabold text-ink sm:text-2xl">Delivered</h1>
              <p className="text-xs text-muted sm:text-sm">
                Your order has been delivered successfully.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("order-summary");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="rounded-2xl border border-line bg-white px-4 py-2.5 text-xs font-bold text-ink shadow-xs transition hover:bg-bg"
          >
            View order summary
          </button>
        </div>
      )}

      {/* Demo Controls for Dedicated Demos */}
      {isDedicatedDemo && o.status !== "delivered" && !(o.status === "confirmed" && isFashionDemo) && !isElectronicsDemo && (
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-extrabold sm:text-3xl">{o.id}</h1>
          <Pill tone={tone} className="text-sm">
            {label}
          </Pill>
          <span className="text-sm text-muted">
            Placed {formatDay(o.placedAt)}, {formatTime(o.placedAt)}
          </span>
          <button
            onClick={next}
            disabled={idx < 0 || idx >= FLOW.length - 1}
            className={btn("ghost", "sm", "ml-auto")}
            title="Demo only"
          >
            <FastForward className="h-4 w-4" />
            Simulate next status
          </button>
        </div>
      )}

      {isElectronicsDemo && electronicsProduct && electronicsLine ? (
        /* Screen 9 Electronics Order View */
        <div className="space-y-6">
          <div className="grid gap-5 xl:grid-cols-12 items-start">
            {/* ── Column 1: Left Product Card & Financials ── */}
            <div className="rounded-3xl border border-line/80 bg-white p-5 shadow-sm space-y-4 xl:col-span-3">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-bg border border-line/60 p-2">
                <ProductArt product={electronicsProduct} className="h-full w-full object-contain" />
              </div>

              <div>
                <h2 className="text-base font-extrabold text-ink">{electronicsProduct.name}</h2>
                <p className="text-xs text-muted font-medium mt-0.5">{orderConfig}</p>
                <p className="text-[11px] text-muted">Model: {orderModel}</p>
                <p className="text-[11px] text-muted">Colour: Silver</p>
                <p className="text-xs font-extrabold text-ink mt-1">
                  Qty: {electronicsLine.qty} | ₹ {(electronicsLine.unitPrice * electronicsLine.qty).toLocaleString("en-IN")}
                </p>
              </div>

              <div className="border-t border-line/60 pt-3 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted">Order number</span>
                  <strong className="text-ink font-bold">{o.id}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Order date</span>
                  <span className="text-ink font-medium">12 Mar 2025, 10:24 AM</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-muted">Status</span>
                  <div className="text-right">
                    <span className="inline-block rounded-md bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 text-[11px] font-bold">
                      Out for delivery
                    </span>
                    <button
                      type="button"
                      onClick={() => toast("Shipment is out with courier partner (Van #KA01-9876)")}
                      className="block text-[10px] text-[#1E3A8A] font-bold hover:underline mt-0.5"
                    >
                      Track shipment &rsaquo;
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-t border-line/60 pt-3 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted">Item price</span>
                  <span className="tabular font-medium">₹ 69,990</span>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span>Discount</span>
                  <span className="tabular font-bold">- ₹ 15,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Subtotal</span>
                  <span className="tabular font-medium">₹ 54,990</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Shipping</span>
                  <span className="font-bold text-emerald-700">FREE</span>
                </div>
                <div className="flex justify-between border-t border-line/60 pt-2 text-sm font-extrabold text-ink">
                  <span>Total (inclusive of all taxes)</span>
                  <span className="tabular text-base font-display">₹ 54,990</span>
                </div>
              </div>
            </div>

            {/* ── Column 2: Center Timeline, 4 Cards, Product Info, Support & Services ── */}
            <div className="space-y-5 xl:col-span-5">
              {/* Delivery & Installation Timeline */}
              <div className="rounded-3xl border border-line/80 bg-white p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-ink">Delivery &amp; Installation Timeline</h3>
                  <span className="rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 text-[11px] font-bold">
                    On track
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 pt-1 text-center">
                  <div className="flex flex-col items-center">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-ink text-white text-[10px] font-bold">
                      <Check className="h-3 w-3 stroke-[2.5]" />
                    </span>
                    <strong className="text-[11px] font-bold text-ink mt-1.5 leading-tight">Order placed</strong>
                    <span className="text-[10px] text-muted">12 Mar, 10:24 AM</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-ink text-white text-[10px] font-bold">
                      <Check className="h-3 w-3 stroke-[2.5]" />
                    </span>
                    <strong className="text-[11px] font-bold text-ink mt-1.5 leading-tight">Shipped</strong>
                    <span className="text-[10px] text-muted">12 Mar, 6:40 PM</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-ink text-white text-[10px] font-bold">
                      <Check className="h-3 w-3 stroke-[2.5]" />
                    </span>
                    <strong className="text-[11px] font-bold text-ink mt-1.5 leading-tight">Out for delivery</strong>
                    <span className="text-[10px] text-muted">13 Mar, 9:10 AM</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="grid h-6 w-6 place-items-center rounded-full border-2 border-[#1E3A8A] bg-white text-[#1E3A8A] text-[10px] font-bold">
                      <Clock className="h-3 w-3" />
                    </span>
                    <strong className="text-[11px] font-bold text-[#1E3A8A] mt-1.5 leading-tight">Delivery &amp; installation</strong>
                    <span className="text-[10px] text-[#1E3A8A] font-semibold">Today, 2:00 – 6:00 PM</span>
                  </div>
                </div>
              </div>

              {/* 4 Metadata Cards Grid (2x2) */}
              <div className="grid grid-cols-2 gap-3.5">
                {/* Warranty */}
                <div className="rounded-2xl border border-line/80 bg-white p-3.5 shadow-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[#1E3A8A]" />
                    <h4 className="text-xs font-bold text-ink">Warranty</h4>
                  </div>
                  <p className="text-xs font-extrabold text-ink">2 years limited warranty</p>
                  <p className="text-[11px] text-muted">Valid till 13 Mar 2027</p>
                  <button
                    type="button"
                    onClick={() => setWarrantyOpen(true)}
                    className="text-[11px] font-bold text-[#1E3A8A] hover:underline pt-1 block"
                  >
                    View details &rsaquo;
                  </button>
                </div>

                {/* Invoice */}
                <div className="rounded-2xl border border-line/80 bg-white p-3.5 shadow-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-[#1E3A8A]" />
                    <h4 className="text-xs font-bold text-ink">Invoice</h4>
                  </div>
                  <p className="text-xs font-extrabold text-ink">#INV72845193</p>
                  <p className="text-[11px] text-muted">12 Mar 2025</p>
                  <button
                    type="button"
                    onClick={() => toast("Downloading invoice #INV72845193.pdf")}
                    className="text-[11px] font-bold text-[#1E3A8A] hover:underline pt-1 block"
                  >
                    Download &rsaquo;
                  </button>
                </div>

                {/* Compatibility */}
                <div className="rounded-2xl border border-line/80 bg-white p-3.5 shadow-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-[#1E3A8A]" />
                    <h4 className="text-xs font-bold text-ink">Compatibility</h4>
                  </div>
                  <p className="text-xs font-extrabold text-ink">Compatible</p>
                  <p className="text-[11px] text-muted">Works with your devices</p>
                  <button
                    type="button"
                    onClick={() => setCompatibilityOpen(true)}
                    className="text-[11px] font-bold text-[#1E3A8A] hover:underline pt-1 block"
                  >
                    View details &rsaquo;
                  </button>
                </div>

                {/* Home fit result */}
                <div className="rounded-2xl border border-line/80 bg-white p-3.5 shadow-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-[#1E3A8A]" />
                    <h4 className="text-xs font-bold text-ink">Home fit result</h4>
                  </div>
                  <p className="text-xs font-extrabold text-ink">Suitable</p>
                  <p className="text-[11px] text-muted">Fits your space and setup</p>
                  <button
                    type="button"
                    onClick={() => setHomeFitOpen(true)}
                    className="text-[11px] font-bold text-[#1E3A8A] hover:underline pt-1 block"
                  >
                    View details &rsaquo;
                  </button>
                </div>
              </div>

              {/* Product Information Card */}
              <div className="rounded-2xl border border-line/80 bg-white p-4 shadow-xs space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-ink">
                  <Laptop className="h-4 w-4 text-[#1E3A8A]" />
                  <span>Product information</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-muted">
                  <div>
                    <span>Model: <strong className="text-ink font-bold">{orderModel}</strong></span>
                    <span className="mx-2">|</span>
                    <span>Configuration: <strong className="text-ink font-bold">{orderConfig}</strong></span>
                  </div>
                  <button
                    type="button"
                    onClick={() => toast("Viewing complete hardware specifications")}
                    className="text-[11px] font-bold text-[#1E3A8A] hover:underline"
                  >
                    View all specs &rsaquo;
                  </button>
                </div>
                <p className="text-[11px] text-muted font-mono">
                  Serial number: <strong className="text-ink font-sans">SN4Z8X7Q1P3</strong>
                </p>
              </div>

              {/* Support & Services 7-Item Grid */}
              <div className="rounded-3xl border border-line/80 bg-white p-5 shadow-sm space-y-3">
                <h3 className="text-sm font-extrabold text-ink">Support &amp; Services</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <button
                    type="button"
                    onClick={() => toast("Report delivery damage ticket created (#DM-78451)")}
                    className="flex items-center justify-between rounded-xl border border-line/80 p-3 hover:bg-bg text-left transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <Package className="h-4 w-4 text-[#1E3A8A]" />
                      <div>
                        <strong className="block text-ink font-bold">Report delivery damage</strong>
                        <span className="text-[10px] text-muted">Item arrived damaged</span>
                      </div>
                    </div>
                    <span className="text-muted text-sm">&rsaquo;</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setWarrantyOpen(true)}
                    className="flex items-center justify-between rounded-xl border border-line/80 p-3 hover:bg-bg text-left transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="h-4 w-4 text-[#1E3A8A]" />
                      <div>
                        <strong className="block text-ink font-bold">Request warranty service</strong>
                        <span className="text-[10px] text-muted">Under warranty support</span>
                      </div>
                    </div>
                    <span className="text-muted text-sm">&rsaquo;</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toast("Repair technician service enquiry booked")}
                    className="flex items-center justify-between rounded-xl border border-line/80 p-3 hover:bg-bg text-left transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <Wrench className="h-4 w-4 text-[#1E3A8A]" />
                      <div>
                        <strong className="block text-ink font-bold">Start repair</strong>
                        <span className="text-[10px] text-muted">Book a repair service</span>
                      </div>
                    </div>
                    <span className="text-muted text-sm">&rsaquo;</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toast("No active repair in progress")}
                    className="flex items-center justify-between rounded-xl border border-line/80 p-3 hover:bg-bg text-left transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <Clock className="h-4 w-4 text-[#1E3A8A]" />
                      <div>
                        <strong className="block text-ink font-bold">Track repair</strong>
                        <span className="text-[10px] text-muted">Check repair status</span>
                      </div>
                    </div>
                    <span className="text-muted text-sm">&rsaquo;</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toast("Exchange request submitted for verification")}
                    className="flex items-center justify-between rounded-xl border border-line/80 p-3 hover:bg-bg text-left transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <Repeat className="h-4 w-4 text-[#1E3A8A]" />
                      <div>
                        <strong className="block text-ink font-bold">Request exchange</strong>
                        <span className="text-[10px] text-muted">Replacement for this item</span>
                      </div>
                    </div>
                    <span className="text-muted text-sm">&rsaquo;</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toast("Missing accessory claim registered")}
                    className="flex items-center justify-between rounded-xl border border-line/80 p-3 hover:bg-bg text-left transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="h-4 w-4 text-[#1E3A8A]" />
                      <div>
                        <strong className="block text-ink font-bold">Report missing accessory</strong>
                        <span className="text-[10px] text-muted">Missing items from package</span>
                      </div>
                    </div>
                    <span className="text-muted text-sm">&rsaquo;</span>
                  </button>
                </div>

                <div className="pt-1">
                  <Link
                    href="/help/contact"
                    className="flex items-center justify-between rounded-xl border border-line/80 p-3 hover:bg-bg text-left transition text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <Headphones className="h-4 w-4 text-[#1E3A8A]" />
                      <div>
                        <strong className="block text-ink font-bold">Contact support</strong>
                        <span className="text-[10px] text-muted">Get help from our support team</span>
                      </div>
                    </div>
                    <span className="text-muted text-sm">&rsaquo;</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* ── Column 3: Edit your order ── */}
            {editOrderOpen && (
              <div className="rounded-3xl border border-line/80 bg-white p-5 shadow-sm space-y-4 xl:col-span-2">
                <div>
                  <h3 className="text-sm font-extrabold text-ink">Edit your order</h3>
                  <p className="text-[11px] text-muted mt-0.5">Make changes before the timer ends.</p>
                </div>

                <div className="divide-y divide-line/60 text-xs">
                  {/* Model or configuration */}
                  <div className="py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Laptop className="h-4 w-4 text-muted shrink-0" />
                      <div>
                        <strong className="block text-ink font-bold text-[11px]">Model or configuration</strong>
                        <span className="text-[10px] text-muted block">{orderModel}</span>
                        <span className="text-[10px] text-muted block">{orderConfig}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setReviewChangeOpen(true)}
                      className="text-[11px] font-bold text-[#1E3A8A] hover:underline"
                    >
                      Edit &rsaquo;
                    </button>
                  </div>

                  {/* Quantity */}
                  <div className="py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-muted shrink-0" />
                      <div>
                        <strong className="block text-ink font-bold text-[11px]">Quantity</strong>
                        <span className="text-[10px] text-muted">1</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toast("Quantity locked to 1 for this serial-tracked item")}
                      className="text-[11px] font-bold text-[#1E3A8A] hover:underline"
                    >
                      Edit &rsaquo;
                    </button>
                  </div>

                  {/* Delivery address */}
                  <div className="py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted shrink-0" />
                      <div>
                        <strong className="block text-ink font-bold text-[11px]">Delivery address</strong>
                        <span className="text-[10px] text-muted block line-clamp-1">123 Green Park, Bengaluru</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toast("Address change requested")}
                      className="text-[11px] font-bold text-[#1E3A8A] hover:underline"
                    >
                      Edit &rsaquo;
                    </button>
                  </div>

                  {/* Delivery slot */}
                  <div className="py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted shrink-0" />
                      <div>
                        <strong className="block text-ink font-bold text-[11px]">Delivery slot</strong>
                        <span className="text-[10px] text-muted">Today, 2:00 – 6:00 PM</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toast("Slot reschedule active")}
                      className="text-[11px] font-bold text-[#1E3A8A] hover:underline"
                    >
                      Edit &rsaquo;
                    </button>
                  </div>

                  {/* Installation option */}
                  <div className="py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Wrench className="h-4 w-4 text-muted shrink-0" />
                      <div>
                        <strong className="block text-ink font-bold text-[11px]">Installation option</strong>
                        <span className="text-[10px] text-muted">Laptop setup (FREE)</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toast("Installation preferences confirmed")}
                      className="text-[11px] font-bold text-[#1E3A8A] hover:underline"
                    >
                      Edit &rsaquo;
                    </button>
                  </div>

                  {/* Access details */}
                  <div className="py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DoorClosed className="h-4 w-4 text-muted shrink-0" />
                      <div>
                        <strong className="block text-ink font-bold text-[11px]">Access details</strong>
                        <span className="text-[10px] text-muted">Gate code: 4507</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toast("Gate code updated")}
                      className="text-[11px] font-bold text-[#1E3A8A] hover:underline"
                    >
                      Edit &rsaquo;
                    </button>
                  </div>

                  {/* Cancellation */}
                  <div className="py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-muted shrink-0" />
                      <div>
                        <strong className="block text-ink font-bold text-[11px]">Cancellation</strong>
                        <span className="text-[10px] text-muted">Eligible until dispatch</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCancel(true)}
                      className="text-[11px] font-bold text-danger hover:underline"
                    >
                      Edit &rsaquo;
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── Column 4: Review your change ── */}
            {editOrderOpen && reviewChangeOpen && (
              <div className="rounded-3xl border border-line/80 bg-white p-5 shadow-sm space-y-4 xl:col-span-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-ink">Review your change</h3>
                  <button
                    type="button"
                    onClick={() => setReviewChangeOpen(false)}
                    className="grid h-6 w-6 place-items-center rounded-full text-muted hover:bg-bg"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-[11px] text-muted">Check the impact of your change before confirming.</p>

                <div className="rounded-2xl border border-line bg-bg/40 p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 shrink-0 rounded-lg overflow-hidden bg-white border border-line/60 p-1">
                      <ProductArt product={electronicsProduct} className="h-full w-full object-contain" />
                    </div>
                    <div>
                      <strong className="block text-xs font-bold text-ink">Model or configuration</strong>
                      <span className="text-[10px] text-muted">Change to a different model</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-muted">Previous value</span>
                      <span className="font-semibold text-ink text-right">TL14-256<br />(8 GB RAM / 256 GB SSD)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">New value</span>
                      <span className="font-bold text-[#1E3A8A] text-right">TL14-512<br />(16 GB RAM / 512 GB SSD)</span>
                    </div>
                    <div className="flex justify-between border-t border-line/60 pt-1">
                      <span className="text-muted">Price difference</span>
                      <strong className="font-extrabold text-ink">+ ₹ 10,000</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Delivery effect</span>
                      <span className="text-ink text-right">No change<br />Still arrives today, 2:00 – 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Policy effect</span>
                      <span className="text-ink text-right">Eligible for exchange and full warranty</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setOrderModel("TL14-512");
                      setOrderConfig("16 GB RAM / 512 GB SSD");
                      patch({
                        lines: o.lines.map((l) =>
                          l.productId === electronicsProduct.id
                            ? { ...l, variantKey: "16 GB RAM / 512 GB SSD" }
                            : l
                        ),
                      });
                      toast("Order configuration updated to TL14-512 (16 GB RAM / 512 GB SSD) (+ ₹ 10,000)");
                      setReviewChangeOpen(false);
                    }}
                    className="w-full rounded-2xl bg-[#17201B] hover:bg-black text-white py-3 text-xs font-bold transition shadow-sm"
                  >
                    Confirm change
                  </button>
                  <button
                    type="button"
                    onClick={() => setReviewChangeOpen(false)}
                    className="w-full rounded-2xl border border-line bg-white hover:bg-bg text-ink py-2.5 text-xs font-semibold transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          {/* ── Screen 9: Fashion Order Items Card & Editable Actions ── */}
          {isFashionDemo && fashionProduct && fashionLine ? (
            <div className="space-y-4">
              <h2 className="text-lg font-extrabold text-ink">Order items ({o.lines.length})</h2>
              <div className="rounded-3xl border border-line/80 bg-white p-5 shadow-sm">
                <div className="grid gap-6 sm:grid-cols-12 sm:items-start">
                  {/* Product Image */}
                  <div className="sm:col-span-4">
                    <div className="relative aspect-3/4 w-full overflow-hidden rounded-2xl bg-bg border border-line/60">
                      <Image
                        src={fashionProduct.images[0]?.src ?? "/products/fashion/manyavar-mens-cotton-kurta-1.jpg"}
                        alt={fashionProduct.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                  </div>

                  {/* Product Information */}
                  <div className="sm:col-span-4 space-y-3">
                    <div>
                      <h3 className="text-lg font-extrabold text-ink">{fashionProduct.name}</h3>
                      <p className="font-display text-xl font-extrabold text-ink mt-1">
                        ₹ {fashionLine.unitPrice.toLocaleString("en-IN")}
                      </p>
                      <p className="text-[11px] text-muted">Inclusive of all taxes</p>
                    </div>

                    <div className="space-y-1.5 text-xs pt-1">
                      <div className="flex gap-4">
                        <span className="text-muted w-14">Colour</span>
                        <strong className="text-ink font-bold">{currentColour}</strong>
                      </div>
                      <div className="flex gap-4">
                        <span className="text-muted w-14">Size</span>
                        <strong className="text-ink font-bold">{currentSize}</strong>
                      </div>
                      <div className="flex gap-4">
                        <span className="text-muted w-14">Fit</span>
                        <strong className="text-ink font-bold">Regular fit</strong>
                      </div>
                      <div className="flex gap-4">
                        <span className="text-muted w-14">Quantity</span>
                        <strong className="text-ink font-bold">{fashionLine.qty}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Action Rows List Matching Screen 9 */}
                  <div className="sm:col-span-4 divide-y divide-line/60 rounded-2xl border border-line bg-bg/40 px-3 py-1 text-xs">
                    {/* 1. Edit size */}
                    <button
                      type="button"
                      onClick={() => setEditSizeOpen(true)}
                      className="flex w-full items-center justify-between py-2.5 text-left hover:text-primary transition group"
                    >
                      <div className="flex items-center gap-2">
                        <Ruler className="h-4 w-4 text-muted group-hover:text-primary" />
                        <div>
                          <strong className="block text-ink group-hover:text-primary">Edit size</strong>
                          <span className="text-[11px] text-muted">Current size: {currentSize}</span>
                        </div>
                      </div>
                      <span className="text-muted group-hover:text-primary text-sm">&rsaquo;</span>
                    </button>

                    {/* 2. Edit colour */}
                    <button
                      type="button"
                      onClick={() => toast("Colour selection updated")}
                      className="flex w-full items-center justify-between py-2.5 text-left hover:text-primary transition group"
                    >
                      <div className="flex items-center gap-2">
                        <Droplet className="h-4 w-4 text-muted group-hover:text-primary" />
                        <div>
                          <strong className="block text-ink group-hover:text-primary">Edit colour</strong>
                          <span className="text-[11px] text-muted">Current colour: {currentColour}</span>
                        </div>
                      </div>
                      <span className="text-muted group-hover:text-primary text-sm">&rsaquo;</span>
                    </button>

                    {/* 3. Edit quantity */}
                    <button
                      type="button"
                      onClick={() => toast("Quantity edit saved")}
                      className="flex w-full items-center justify-between py-2.5 text-left hover:text-primary transition group"
                    >
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-muted group-hover:text-primary" />
                        <div>
                          <strong className="block text-ink group-hover:text-primary">Edit quantity</strong>
                          <span className="text-[11px] text-muted">Current quantity: {fashionLine.qty}</span>
                        </div>
                      </div>
                      <span className="text-muted group-hover:text-primary text-sm">&rsaquo;</span>
                    </button>

                    {/* 4. Edit delivery address */}
                    <button
                      type="button"
                      onClick={() => toast("Address change option active")}
                      className="flex w-full items-center justify-between py-2.5 text-left hover:text-primary transition group"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted group-hover:text-primary" />
                        <div>
                          <strong className="block text-ink group-hover:text-primary">Edit delivery address</strong>
                          <span className="text-[11px] text-muted">Home, Bengaluru</span>
                        </div>
                      </div>
                      <span className="text-muted group-hover:text-primary text-sm">&rsaquo;</span>
                    </button>

                    {/* 5. Edit delivery slot */}
                    <button
                      type="button"
                      onClick={() => toast("Slot change saved")}
                      className="flex w-full items-center justify-between py-2.5 text-left hover:text-primary transition group"
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted group-hover:text-primary" />
                        <div>
                          <strong className="block text-ink group-hover:text-primary">Edit delivery slot</strong>
                          <span className="text-[11px] text-muted">Thu, 25 Apr, 9 AM – 1 PM</span>
                        </div>
                      </div>
                      <span className="text-muted group-hover:text-primary text-sm">&rsaquo;</span>
                    </button>

                    {/* 6. Cancel item */}
                    <button
                      type="button"
                      onClick={() => setCancel(true)}
                      className="flex w-full items-center justify-between py-2.5 text-left hover:text-danger transition group"
                    >
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-muted group-hover:text-danger" />
                        <div>
                          <strong className="block text-ink group-hover:text-danger">Cancel item</strong>
                          <span className="text-[11px] text-muted">Eligible for cancellation</span>
                        </div>
                      </div>
                      <span className="text-muted group-hover:text-danger text-sm">&rsaquo;</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Address & Slot Subcards Matching Screen 9 Bottom */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center justify-between rounded-2xl border border-line/80 bg-white p-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted shrink-0" />
                    <div className="text-xs">
                      <strong className="block text-ink font-bold">Delivery to Home</strong>
                      <span className="text-muted">12, MG Road, Bengaluru, 560001</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => toast("Address editing active")}
                    className="text-xs font-bold text-muted hover:text-ink underline"
                  >
                    Edit &rsaquo;
                  </button>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-line/80 bg-white p-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted shrink-0" />
                    <div className="text-xs">
                      <strong className="block text-ink font-bold">Delivery slot</strong>
                      <span className="text-muted">Thu, 25 Apr 2025, 9 AM – 1 PM</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => toast("Slot editing active")}
                    className="text-xs font-bold text-muted hover:text-ink underline"
                  >
                    Edit &rsaquo;
                  </button>
                </div>
              </div>
            </div>
          ) : isFoodDemo && foodProduct && foodLine ? (
            <div className="rounded-3xl border border-line/80 bg-white p-6 shadow-sm space-y-6">
              {/* Product Info Row */}
              <div className="grid gap-6 sm:grid-cols-12">
                {/* Left: Product Images */}
                <div className="sm:col-span-4 space-y-3">
                  <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-bg border border-line/60">
                    <Image
                      src={foodProduct.images[0]?.src ?? "/products/food/fresh-tomatoes-1.jpg"}
                      alt={foodProduct.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  {/* Thumbnails */}
                  <div className="grid grid-cols-3 gap-2">
                    {[0, 1, 2].map((idx) => (
                      <div
                        key={idx}
                        className="relative aspect-square overflow-hidden rounded-xl bg-bg border border-line/60"
                      >
                        <Image
                          src={
                            foodProduct.images[idx]?.src ??
                            foodProduct.images[0]?.src ??
                            "/products/food/fresh-tomatoes-1.jpg"
                          }
                          alt=""
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Product Details & Badges */}
                <div className="sm:col-span-8 space-y-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-ink">{foodProduct.name}</h2>
                    <p className="text-xs text-muted mt-0.5">
                      {foodProduct.highlights?.[0] ?? "Juicy, fresh and naturally nutritious."}
                    </p>
                  </div>

                  {/* Quality & Ripeness Badges Matching Screen 9 */}
                  <div className="grid gap-3 sm:grid-cols-2 text-xs">
                    <div className="flex items-start gap-2.5 rounded-2xl border border-line/60 bg-bg/40 p-3">
                      <ShieldCheck className="h-4 w-4 text-emerald-800 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-ink">Grade Grade {foodLine.grade ?? "A"}</strong>
                        <span className="text-[11px] text-muted">
                          Carefully selected for quality.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 rounded-2xl border border-line/60 bg-bg/40 p-3">
                      <Sparkles className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-ink">
                          Ripeness {foodLine.ripeness === "raw" ? "Raw" : foodLine.ripeness === "very_ripe" ? "Very ripe" : "Ready to eat"}
                        </strong>
                        <span className="text-[11px] text-muted">
                          Washed and ready for consumption.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 4 Metric Columns Matching Screen 9 */}
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 rounded-2xl border border-line/60 bg-white p-3.5 text-xs">
                    <div>
                      <span className="text-muted block text-[11px]">Price per 500 g</span>
                      <strong className="text-ink font-extrabold text-sm block">
                        ₹ {foodLine.unitPrice}
                      </strong>
                      <span className="text-[10px] text-muted block">(Inclusive of all taxes)</span>
                    </div>

                    <div>
                      <span className="text-muted block text-[11px]">Actual weight</span>
                      <strong className="text-ink font-extrabold text-sm block">
                        {foodLine.actualWeight ?? "520 g"}
                      </strong>
                      <span className="text-[10px] text-muted block">
                        (₹ {(foodLine.unitPrice * 1.04).toFixed(2)}) ⓘ
                      </span>
                    </div>

                    <div>
                      <span className="text-muted block text-[11px]">Batch / Lot</span>
                      <strong className="text-ink font-extrabold text-sm block">
                        {foodLine.batchNo ?? "TM250412A"}
                      </strong>
                      <span className="text-[10px] text-muted block">Packed on 12 Apr 2025</span>
                    </div>

                    <div>
                      <span className="text-muted block text-[11px]">Remaining shelf life</span>
                      <strong className="text-ink font-extrabold text-sm block flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-muted" />
                        <span>{foodLine.shelfLife ?? "4–6 days"}</span>
                      </strong>
                      <span className="text-[10px] text-muted block">(from delivery date)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Farm-to-Home Timeline Matching Screen 9 ── */}
              <div className="border-t border-line/60 pt-6">
                <h3 className="font-extrabold text-base text-ink mb-4">
                  From farm to your home
                </h3>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-line">
                  {/* Step 1 */}
                  <div className="relative">
                    <span className="absolute -left-6 top-0.5 grid h-4 w-4 place-items-center rounded-full bg-emerald-800 ring-4 ring-white">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                      <div>
                        <strong className="font-bold text-ink">Sourced from farm</strong>
                        <span className="text-muted block sm:inline sm:ml-2">
                          12 Apr 2025, 06:10 AM
                        </span>
                      </div>
                      <span className="text-muted text-[11px]">Harvested and quality checked</span>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="relative">
                    <span className="absolute -left-6 top-0.5 grid h-4 w-4 place-items-center rounded-full bg-sky-700 ring-4 ring-white">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                      <div>
                        <strong className="font-bold text-ink">Cold-chain preparation</strong>
                        <span className="text-muted block sm:inline sm:ml-2">
                          12 Apr 2025, 09:25 AM
                        </span>
                      </div>
                      <span className="text-muted text-[11px]">
                        Kept at recommended temperature (2–8 °C)
                      </span>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative">
                    <span className="absolute -left-6 top-0.5 grid h-4 w-4 place-items-center rounded-full bg-amber-700 ring-4 ring-white">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                      <div>
                        <strong className="font-bold text-ink">Out for delivery</strong>
                        <span className="text-muted block sm:inline sm:ml-2">
                          12 Apr 2025, 01:15 PM
                        </span>
                      </div>
                      <span className="text-muted text-[11px]">
                        In temperature-controlled vehicle
                      </span>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="relative">
                    <span className="absolute -left-6 top-0.5 grid h-4 w-4 place-items-center rounded-full bg-black ring-4 ring-white">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                      <div>
                        <strong className="font-bold text-ink">Delivered</strong>
                        <span className="text-muted block sm:inline sm:ml-2">
                          12 Apr 2025, 04:42 PM
                        </span>
                      </div>
                      <span className="text-muted text-[11px]">Delivered to your address</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Substitution Status */}
              <div className="border-t border-line/60 pt-4 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4 text-ink" />
                  <div>
                    <strong className="font-bold text-ink">Substitution</strong>
                    <span className="text-muted ml-2">No substitution</span>
                  </div>
                </div>
                <span className="text-muted text-[11px]">
                  You received the exact item you ordered.
                </span>
              </div>

              {/* Action Buttons Matching Screen 9 */}
              <div className="border-t border-line/60 pt-4 grid gap-3 sm:grid-cols-2">
                <Link
                  href={`/product/${foodProduct.slug}`}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-line bg-white py-3.5 text-xs font-bold text-ink transition hover:bg-bg"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Buy again</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setComplaintOpen(true)}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-line bg-white py-3.5 text-xs font-bold text-ink transition hover:bg-bg"
                >
                  <AlertTriangle className="h-4 w-4 text-amber-700" />
                  <span>Report damaged or unusable quantity</span>
                  <span className="text-sm">&rsaquo;</span>
                </button>
              </div>
            </div>
          ) : (
            /* Standard Dynamic Order Tracking & Fulfillment View */
            <div className="space-y-6">
              {/* Top Bar for Dynamic Order */}
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-extrabold sm:text-3xl text-ink">Order #{o.id}</h1>
                <Pill tone={tone} className="text-sm">
                  {label}
                </Pill>
                <span className="text-sm text-muted">
                  Placed {formatDay(o.placedAt)}, {formatTime(o.placedAt)}
                </span>
                <button
                  onClick={next}
                  disabled={idx < 0 || idx >= FLOW.length - 1}
                  className={btn("ghost", "sm", "ml-auto")}
                  title="Simulate fulfillment workflow"
                >
                  <FastForward className="h-4 w-4" />
                  Simulate next status
                </button>
              </div>

              {/* Cancelled Alert Banner */}
              {o.status === "cancelled" && (
                <div className="rounded-3xl border border-red-200 bg-red-50 p-5 shadow-sm text-red-900">
                  <div className="flex items-start gap-3">
                    <XCircle className="h-6 w-6 text-red-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h2 className="text-base font-extrabold">This order has been cancelled</h2>
                      <p className="text-xs text-red-800">
                        {o.timeline.find((t) => t.status === "cancelled")?.note
                          ? `Reason: ${o.timeline.find((t) => t.status === "cancelled")?.note}`
                          : "Order cancelled during pre-fulfillment window."}
                      </p>
                      {o.refund && (
                        <div className="mt-2 rounded-xl bg-white/90 p-3 text-xs font-semibold text-red-950 border border-red-200">
                          {o.refund.status}: ₹{o.refund.amount.toLocaleString("en-IN")}. Expected back in bank account by {o.refund.expected}.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Pre-Fulfillment Window Banner */}
              {["placed", "confirmed"].includes(o.status) && (
                <div className="rounded-3xl border border-line/80 bg-white p-5 shadow-sm space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-black text-white shrink-0">
                        <Clock className="h-5 w-5 text-white" />
                      </span>
                      <div>
                        <h2 className="text-sm font-extrabold text-ink sm:text-base">
                          Pre-fulfillment editing window active
                        </h2>
                        <p className="text-xs text-muted">
                          Your order is confirmed. You can cancel or request changes before warehouse packing begins.
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCancel(true)}
                      className="rounded-2xl border border-danger/40 bg-white px-4 py-2.5 text-xs font-bold text-danger hover:bg-danger-tint transition shadow-xs"
                    >
                      Cancel order
                    </button>
                  </div>
                </div>
              )}

              {/* Order Tracking Stepper */}
              {o.status !== "cancelled" && (
                <section className="rounded-3xl bg-white p-5 shadow-card sm:p-6">
                  <h2 className="mb-5 text-base font-extrabold text-ink">Tracking &amp; fulfillment progress</h2>
                  <ol className="relative grid grid-cols-6 gap-1">
                    {FLOW.map((s, i) => (
                      <li key={s} className="flex flex-col items-center text-center">
                        <span
                          className={cn(
                            "z-10 grid h-9 w-9 place-items-center rounded-full text-xs font-bold transition",
                            i <= idx ? "bg-primary text-white" : "bg-bg text-muted",
                            i === idx && "ring-4 ring-accent"
                          )}
                        >
                          {i < idx ? <CheckCircle2 className="h-5 w-5" /> : i + 1}
                        </span>
                        <span
                          className={cn(
                            "mt-2 text-[11px] font-semibold leading-tight sm:text-xs",
                            i <= idx ? "text-ink" : "text-muted"
                          )}
                        >
                          {STATUS[s][0]}
                        </span>
                        {o.timeline.find((t) => t.status === s) && (
                          <span className="text-[10px] text-muted">
                            {formatTime(o.timeline.find((t) => t.status === s)!.at)}
                          </span>
                        )}
                      </li>
                    ))}
                    <span className="absolute left-[8%] right-[8%] top-[18px] h-1 rounded-full bg-bg">
                      <span
                        className="block h-full rounded-full bg-primary transition-all duration-300"
                        style={{
                          width: `${(Math.max(0, idx) / (FLOW.length - 1)) * 100}%`,
                        }}
                      />
                    </span>
                  </ol>
                </section>
              )}

              {/* Order Lines Card */}
              <section className="overflow-hidden rounded-3xl bg-white shadow-card">
                <header className="flex flex-wrap items-center justify-between gap-2 bg-primary-soft px-5 py-3 text-sm font-bold text-primary">
                  <span className="flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    Delivery Package · {o.lines.length} items
                  </span>
                  <span className="text-xs font-medium text-primary/80">
                    Slot: {o.slot?.date ? formatDay(o.slot.date) : "Standard fulfillment"}
                  </span>
                </header>
                <ul className="divide-y divide-line">
                  {o.lines.map((l) => {
                    const p = getProductById(l.productId);
                    if (!p) return null;
                    const pol = returnPolicies.find((r) => r.id === l.returnPolicyId) ?? getReturnPolicy(p);

                    return (
                      <li
                        key={l.productId + l.variantKey}
                        className="flex flex-wrap sm:flex-nowrap items-center gap-4 p-4 sm:p-5"
                      >
                        <ProductArt product={p} className="h-16 w-16 rounded-2xl shrink-0" />
                        <div className="min-w-0 flex-1 space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={cn(
                              "inline-block rounded-md px-1.5 py-0.5 text-[10px] font-extrabold uppercase",
                              p.department === "food" && "bg-food-tint text-food",
                              p.department === "fashion" && "bg-fashion-tint text-fashion",
                              p.department === "beauty" && "bg-beauty-tint text-beauty",
                              p.department === "electronics" && "bg-electronics-tint text-electronics",
                            )}>
                              {p.department}
                            </span>
                            <Link
                              href={`/product/${p.slug}`}
                              className="font-bold text-ink hover:text-primary transition text-sm"
                            >
                              {p.name}
                            </Link>
                          </div>
                          {l.variantKey && l.variantKey !== "default" && (
                            <p className="text-xs text-muted">
                              Variant: <strong className="text-ink font-semibold">{l.variantKey}</strong>
                            </p>
                          )}
                          <p className="text-xs text-muted">
                            Qty {l.qty} · {formatINR(l.unitPrice)} each · Line total: <strong>{formatINR(l.unitPrice * l.qty)}</strong>
                          </p>
                          <p className="text-[11px] text-muted">
                            Policy: <span className="font-medium text-ink">{pol.label}</span>
                          </p>
                        </div>

                        <div className="flex flex-wrap sm:flex-col items-center sm:items-end gap-2 shrink-0">
                          {o.status === "delivered" && (
                            <>
                              {p.department === "food" ? (
                                <button
                                  type="button"
                                  className={btn("secondary", "sm")}
                                  onClick={() => {
                                    setSelectedProduct(p);
                                    setComplaintOpen(true);
                                  }}
                                >
                                  <AlertTriangle className="h-3.5 w-3.5 text-amber-700" />
                                  Quality complaint
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  className={btn("secondary", "sm")}
                                  onClick={() => {
                                    setSelectedProduct(p);
                                    setRet(l.productId);
                                  }}
                                >
                                  <RotateCcw className="h-3.5 w-3.5" />
                                  Report problem
                                </button>
                              )}
                            </>
                          )}
                          {["placed", "confirmed"].includes(o.status) && (
                            <button
                              type="button"
                              onClick={() => setCancel(true)}
                              className="text-xs font-semibold text-danger hover:underline"
                            >
                              Cancel item
                            </button>
                          )}
                          <Link
                            href={`/product/${p.slug}`}
                            className="text-xs font-semibold text-primary hover:underline"
                          >
                            Buy again &rsaquo;
                          </Link>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            </div>
          )}
        </div>

        {/* ── Order Summary Sidebar ── */}
        <aside id="order-summary" className="space-y-4 lg:col-span-4">
          <div className="rounded-3xl bg-white p-5 shadow-card">
            <h3 className="mb-2 flex items-center gap-2 font-extrabold text-sm sm:text-base">
              <MapPin className="h-4 w-4 text-primary" />
              Delivery address
            </h3>
            <p className="text-sm font-semibold text-ink">{o.address.name}</p>
            <p className="text-xs text-muted leading-relaxed mt-1">
              {o.address.line1}
              {o.address.landmark ? `, ${o.address.landmark}` : ""}, {o.address.area},{" "}
              {o.address.city} {o.address.pincode}
            </p>
            {o.address.phone && (
              <p className="text-xs text-muted mt-1.5">Phone: +91 {o.address.phone}</p>
            )}
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-card">
            <h3 className="mb-3 flex items-center gap-2 font-extrabold text-sm sm:text-base">
              <CreditCard className="h-4 w-4 text-primary" />
              Payment breakdown
            </h3>
            <dl className="space-y-2 text-xs">
              <div className="flex justify-between">
                <dt className="text-muted">Items subtotal</dt>
                <dd className="tabular font-semibold">₹ {o.charges.itemsTotal.toLocaleString("en-IN")}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Delivery</dt>
                <dd className="tabular font-semibold">
                  {o.charges.delivery === 0 ? (
                    <span className="font-bold text-emerald-700">FREE</span>
                  ) : (
                    `₹ ${o.charges.delivery}`
                  )}
                </dd>
              </div>
              {o.charges.coldChain > 0 && (
                <div className="flex justify-between">
                  <dt className="text-muted">Cold-chain</dt>
                  <dd className="tabular font-semibold">₹ {o.charges.coldChain}</dd>
                </div>
              )}
              {o.charges.heavy > 0 && (
                <div className="flex justify-between">
                  <dt className="text-muted">Heavy / bulk handling</dt>
                  <dd className="tabular font-semibold">₹ {o.charges.heavy}</dd>
                </div>
              )}
              {((o.charges as any).installation ?? 0) > 0 && (
                <div className="flex justify-between">
                  <dt className="text-muted">Installation service</dt>
                  <dd className="tabular font-semibold">₹ {(o.charges as any).installation}</dd>
                </div>
              )}
              {o.charges.discount > 0 && (
                <div className="flex justify-between text-emerald-800">
                  <dt className="font-semibold">Promo discount</dt>
                  <dd className="tabular font-semibold">- ₹ {o.charges.discount.toLocaleString("en-IN")}</dd>
                </div>
              )}
              <div className="flex justify-between border-t border-line pt-2 font-extrabold text-sm text-ink">
                <dt>Total amount</dt>
                <dd className="tabular font-display text-base">₹ {o.charges.total.toLocaleString("en-IN")}</dd>
              </div>
            </dl>

            <div className="mt-3 rounded-xl bg-bg p-3 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-muted">Method</span>
                <strong className="text-ink uppercase">{o.payment.method}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Status</span>
                <strong className={cn(
                  "uppercase text-[11px]",
                  o.payment.status === "paid" ? "text-emerald-700" : "text-amber-800"
                )}>
                  {o.payment.status}
                </strong>
              </div>
              {o.payment.reference && (
                <div className="flex justify-between text-[11px]">
                  <span className="text-muted">Reference</span>
                  <span className="font-mono text-muted">{o.payment.reference}</span>
                </div>
              )}
              <p className="text-[10px] text-muted pt-1">GST included in product prices</p>
            </div>

            {["placed", "confirmed"].includes(o.status) && (
              <button
                type="button"
                onClick={() => setCancel(true)}
                className="mt-3 w-full rounded-2xl border border-danger/40 bg-white py-2.5 text-xs font-bold text-danger hover:bg-danger-tint transition shadow-xs"
              >
                Cancel order
              </button>
            )}
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-card space-y-2">
            <h3 className="font-extrabold text-sm">Need help with this order?</h3>
            <Link
              href="/help/contact"
              className="flex w-full items-center justify-center gap-1.5 rounded-2xl border border-line py-2.5 text-xs font-bold text-ink hover:bg-bg transition"
            >
              <HelpCircle className="h-4 w-4 text-primary" />
              <span>Contact support</span>
            </Link>
          </div>
        </aside>
      </div>
      )}

      {/* Screen 9B: Quality Complaint Modal */}
      <QualityComplaintModal
        open={complaintOpen}
        onClose={() => setComplaintOpen(false)}
        productName={foodProduct?.name ?? "Fresh Tomatoes"}
        orderId={o.id}
        deliveryDate="12 Apr 2025"
        actualWeightG={520}
        productImage={foodProduct?.images[0]?.src ?? "/products/food/fresh-tomatoes-1.jpg"}
        onSubmitted={() => {
          setComplaintOpen(false);
          toast("Complaint registered: Case ID SR98765432");
        }}
      />

      {/* Screen 9B: Fashion Edit Size Modal */}
      {fashionProduct && (
        <EditSizeModal
          open={editSizeOpen}
          onClose={() => setEditSizeOpen(false)}
          product={fashionProduct}
          currentSize={currentSize}
          currentColour={currentColour}
          onConfirm={(newSize) => {
            setFashionSize(newSize);
            patch({
              lines: o.lines.map((l) =>
                l.productId === fashionProduct.id
                  ? { ...l, variantKey: `${newSize}|${currentColour}` }
                  : l
              ),
            });
          }}
        />
      )}

      {/* Screen 9: Electronics Modals */}
      {electronicsProduct && (
        <>
          <WarrantyModal
            open={warrantyOpen}
            onClose={() => setWarrantyOpen(false)}
            product={electronicsProduct}
          />
          <CompatibilityModal
            open={compatibilityOpen}
            onClose={() => setCompatibilityOpen(false)}
            product={electronicsProduct}
            selection={{}}
            onSave={(patch) => {
              toast("Compatibility saved");
              setCompatibilityOpen(false);
            }}
          />
          <HomeFitModal
            open={homeFitOpen}
            onClose={() => setHomeFitOpen(false)}
            product={electronicsProduct}
            selection={{}}
            onSave={(patch) => {
              toast("Home fit verification saved");
              setHomeFitOpen(false);
            }}
          />
        </>
      )}

      {/* Cancellation Dialog */}
      <Dialog open={cancel} onClose={() => setCancel(false)} title="Cancel Order">
        <div className="space-y-4 text-xs">
          <p className="text-muted leading-relaxed">
            Are you sure you want to cancel Order <strong>#{o.id}</strong>? Once cancelled, preparation will be halted immediately.
          </p>
          {o.payment.method !== "cod" ? (
            <div className="rounded-2xl bg-primary-tint/60 p-3.5 text-primary leading-relaxed">
              <strong>Prepaid refund policy:</strong> A full refund of ₹{o.charges.total.toLocaleString("en-IN")} will be credited back to your original payment method ({o.payment.method.toUpperCase()}) within 3–5 business days.
            </div>
          ) : (
            <div className="rounded-2xl bg-bg p-3.5 text-muted leading-relaxed">
              This was a Cash on Delivery order. No charge has been debited.
            </div>
          )}
          <Field label="Cancellation reason">
            <select
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className={inputCls}
            >
              <option value="Ordered by mistake">Ordered by mistake</option>
              <option value="Delivery time is too long">Delivery time is too long</option>
              <option value="Need to change shipping address or items">Need to change shipping address or items</option>
              <option value="Found a better price elsewhere">Found a better price elsewhere</option>
              <option value="Other">Other reason</option>
            </select>
          </Field>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setCancel(false)} className={btn("ghost", "sm")}>
              Keep order
            </button>
            <button type="button" onClick={() => doCancel(cancelReason)} className={btn("danger", "sm")}>
              Confirm cancellation
            </button>
          </div>
        </div>
      </Dialog>

      {/* Return / Problem Dialog */}
      <Dialog open={!!ret} onClose={() => setRet(null)} title="Report a Problem / Return Request">
        <div className="space-y-4 text-xs">
          <p className="text-muted leading-relaxed">
            Please tell us about the issue with this item. Our fulfillment and customer care team will review and process your return, replacement or refund.
          </p>
          <Field label="Reason for request">
            <select
              value={retReason}
              onChange={(e) => setRetReason(e.target.value)}
              className={inputCls}
            >
              <option value="defective">Damaged or defective item</option>
              <option value="wrong_item">Wrong item delivered</option>
              <option value="quality">Quality not as expected</option>
              <option value="size_fit">Size or fit mismatch</option>
              <option value="missing">Missing parts or accessories</option>
              <option value="expired">Expired or close to expiry</option>
            </select>
          </Field>
          <Field label="Additional notes (optional)">
            <textarea
              rows={3}
              value={retNotes}
              onChange={(e) => setRetNotes(e.target.value)}
              placeholder="Describe the issue in detail..."
              className={inputCls}
            />
          </Field>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setRet(null)} className={btn("ghost", "sm")}>
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                const caseId = "RT" + Math.floor(10000000 + Math.random() * 90000000);
                toast(`Return request registered: Case ID ${caseId}`);
                setRet(null);
                setRetNotes("");
              }}
              className={btn("primary", "sm")}
            >
              Submit return request
            </button>
          </div>
        </div>
      </Dialog>
    </TaskPage>
  );
}

export default function Page() {
  return (
    <Suspense>
      <OrderView />
    </Suspense>
  );
}
