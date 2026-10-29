"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import {
  ChevronLeft,
  Upload,
  Plus,
  Trash2,
  CheckCircle2,
  ShieldCheck,
  Save,
  Globe,
  Truck,
  RotateCcw,
  Package,
} from "lucide-react";
import { ADMIN_PRODUCTS, type AdminProduct } from "@/mocks/adminData";
import { toast } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

export default function ProductEditorPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const existing = ADMIN_PRODUCTS.find((p) => p.id === id) || ADMIN_PRODUCTS[4]; // Default to Hydro Flask as in PDF Page 7

  const [name, setName] = useState(existing.name);
  const [brand, setBrand] = useState(existing.brand);
  const [category, setCategory] = useState(existing.category);
  const [sku, setSku] = useState(existing.sku);
  const [description, setDescription] = useState(existing.description);
  const [price, setPrice] = useState(existing.price);
  const [comparePrice, setComparePrice] = useState(existing.compareAtPrice || 2899);
  const [status, setStatus] = useState<"Draft" | "Live">(existing.status === "Active" ? "Live" : "Draft");
  const [threshold, setThreshold] = useState(existing.lowStockThreshold || 20);

  const [variants, setVariants] = useState(
    existing.variants.length > 0
      ? existing.variants
      : [
          { color: "Olive", sku: "HFL-32-OLV", price: 2499, stock: 120 },
          { color: "Black", sku: "HFL-32-BLK", price: 2499, stock: 85 },
          { color: "Pacific Blue", sku: "HFL-32-BLU", price: 2499, stock: 64 },
        ]
  );

  const [compliance, setCompliance] = useState({
    standards: true,
    nonHazardous: true,
    packaging: true,
  });

  const totalStock = variants.reduce((acc, v) => acc + (Number(v.stock) || 0), 0);

  const handleSave = (publish: boolean) => {
    setStatus(publish ? "Live" : "Draft");
    toast(publish ? "Product published live to HyperMart catalog!" : "Draft changes saved successfully.");
    setTimeout(() => {
      router.push("/admin/products");
    }, 600);
  };

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      { color: "New Color", sku: `${sku}-${prev.length + 1}`, price, stock: 50 },
    ]);
  };

  const removeVariant = (index: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* ── 1. Breadcrumbs & Action Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-200 pb-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-semibold mb-1">
            <Link href="/admin/products" className="hover:text-emerald-700">
              Products
            </Link>
            <span>/</span>
            <span className="text-neutral-800">Edit product</span>
          </div>
          <h1 className="font-display text-2xl font-extrabold text-neutral-900">
            {name || "Untitled Product"}
          </h1>
          <p className="text-xs text-neutral-500">Keep your product information accurate and up to date across HyperMart.</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Status Toggle */}
          <div className="flex items-center rounded-xl border border-neutral-200 bg-neutral-100 p-1 text-xs font-bold">
            <button
              type="button"
              onClick={() => setStatus("Draft")}
              className={cn(
                "rounded-lg px-3 py-1 transition cursor-pointer",
                status === "Draft" ? "bg-white text-neutral-900 shadow-2xs" : "text-neutral-500"
              )}
            >
              Draft
            </button>
            <button
              type="button"
              onClick={() => setStatus("Live")}
              className={cn(
                "rounded-lg px-3 py-1 transition cursor-pointer",
                status === "Live" ? "bg-emerald-700 text-white shadow-2xs" : "text-neutral-500"
              )}
            >
              Live
            </button>
          </div>

          <button
            type="button"
            onClick={() => handleSave(false)}
            className="flex h-10 items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-3.5 text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition cursor-pointer shadow-2xs"
          >
            <Save className="h-4 w-4" />
            <span>Save draft</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave(true)}
            className="flex h-10 items-center gap-1.5 rounded-xl bg-[#C6F04A] px-4 text-xs font-extrabold text-[#073922] shadow-sm hover:bg-[#b8e43e] transition cursor-pointer"
          >
            <Globe className="h-4 w-4" />
            <span>Publish product</span>
          </button>
        </div>
      </div>

      {/* ── 2. Grid Layout: Main Details + Side Panels ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-6">
        {/* Left Column: Product Info, Media, Variants */}
        <div className="space-y-6">
          {/* Product Media Gallery */}
          <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-2xs space-y-4">
            <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">Product imagery</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative aspect-square w-full sm:w-56 rounded-2xl bg-neutral-100 border border-neutral-200 grid place-items-center overflow-hidden">
                <Package className="h-16 w-16 text-emerald-800" />
                <span className="absolute bottom-2 left-2 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-bold text-white">
                  Primary
                </span>
              </div>
              <div className="flex-1 grid grid-cols-3 gap-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-xl bg-neutral-50 border border-dashed border-neutral-300 grid place-items-center text-neutral-400 hover:border-emerald-600 hover:text-emerald-700 transition cursor-pointer"
                  >
                    <Upload className="h-5 w-5" />
                  </div>
                ))}
              </div>
            </div>

            {/* Feature Badges */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-100 text-[11px] font-semibold text-neutral-600">
              <span className="rounded-md bg-neutral-100 px-2.5 py-1">Cold for 24 hours</span>
              <span className="rounded-md bg-neutral-100 px-2.5 py-1">Leak-resistant</span>
              <span className="rounded-md bg-neutral-100 px-2.5 py-1">BPA-free</span>
              <span className="rounded-md bg-neutral-100 px-2.5 py-1">Built for anywhere</span>
            </div>
          </div>

          {/* Product Core Attributes */}
          <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-2xs space-y-4">
            <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">General information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">Product name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-10 w-full rounded-xl border border-neutral-200 px-3 text-xs font-medium text-neutral-900 focus:border-emerald-700 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Brand</label>
                  <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="h-10 w-full rounded-xl border border-neutral-200 px-3 text-xs font-medium text-neutral-900 focus:border-emerald-700 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">SKU code</label>
                  <input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="h-10 w-full rounded-xl border border-neutral-200 px-3 text-xs font-mono font-medium text-neutral-900 focus:border-emerald-700 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="h-10 w-full rounded-xl border border-neutral-200 px-3 text-xs font-medium text-neutral-900 focus:border-emerald-700 focus:outline-none"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-neutral-700">Description</label>
                  <span className="text-[10px] text-neutral-400">{description.length}/2000</span>
                </div>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-xl border border-neutral-200 p-3 text-xs font-medium text-neutral-900 focus:border-emerald-700 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Variants Matrix */}
          <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">Variants & options</h2>
              <button
                type="button"
                onClick={addVariant}
                className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add variant</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-neutral-200 text-neutral-400 font-bold uppercase text-[10px]">
                    <th className="py-2 px-2">Option / Colour</th>
                    <th className="py-2 px-2">SKU</th>
                    <th className="py-2 px-2 text-right">Price (₹)</th>
                    <th className="py-2 px-2 text-right">Stock</th>
                    <th className="py-2 px-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {variants.map((v, idx) => (
                    <tr key={idx}>
                      <td className="py-2.5 px-2">
                        <input
                          type="text"
                          value={v.color || v.size || ""}
                          onChange={(e) => {
                            const updated = [...variants];
                            updated[idx].color = e.target.value;
                            setVariants(updated);
                          }}
                          className="h-8 rounded-lg border border-neutral-200 px-2 text-xs font-medium"
                        />
                      </td>
                      <td className="py-2.5 px-2">
                        <input
                          type="text"
                          value={v.sku}
                          onChange={(e) => {
                            const updated = [...variants];
                            updated[idx].sku = e.target.value;
                            setVariants(updated);
                          }}
                          className="h-8 rounded-lg border border-neutral-200 px-2 font-mono text-[11px]"
                        />
                      </td>
                      <td className="py-2.5 px-2 text-right">
                        <input
                          type="number"
                          value={v.price}
                          onChange={(e) => {
                            const updated = [...variants];
                            updated[idx].price = Number(e.target.value);
                            setVariants(updated);
                          }}
                          className="h-8 w-20 rounded-lg border border-neutral-200 px-2 text-right text-xs font-bold"
                        />
                      </td>
                      <td className="py-2.5 px-2 text-right">
                        <input
                          type="number"
                          value={v.stock}
                          onChange={(e) => {
                            const updated = [...variants];
                            updated[idx].stock = Number(e.target.value);
                            setVariants(updated);
                          }}
                          className="h-8 w-20 rounded-lg border border-neutral-200 px-2 text-right text-xs font-bold"
                        />
                      </td>
                      <td className="py-2.5 px-2 text-center">
                        <button
                          type="button"
                          onClick={() => removeVariant(idx)}
                          className="text-neutral-400 hover:text-rose-600 transition"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing, Inventory, Fulfillment, Compliance */}
        <div className="space-y-6">
          {/* Availability & Fulfilment */}
          <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">Availability & fulfilment</h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/60">
                <Truck className="h-4 w-4 text-emerald-700 shrink-0" />
                <div>
                  <p className="font-bold text-neutral-800">Home delivery eligible</p>
                  <p className="text-[11px] text-neutral-500">Available for standard & express delivery</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/60">
                <RotateCcw className="h-4 w-4 text-emerald-700 shrink-0" />
                <div>
                  <p className="font-bold text-neutral-800">Return window: 30 days</p>
                  <p className="text-[11px] text-neutral-500">Doorstep return pickup in original condition</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Tax */}
          <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">Pricing & tax</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1">Price (₹)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="h-10 w-full rounded-xl border border-neutral-200 px-3 text-xs font-bold text-neutral-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1">Compare at (₹)</label>
                <input
                  type="number"
                  value={comparePrice}
                  onChange={(e) => setComparePrice(Number(e.target.value))}
                  className="h-10 w-full rounded-xl border border-neutral-200 px-3 text-xs font-medium text-neutral-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-600 mb-1">Tax category</label>
              <select className="h-10 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 text-xs font-bold text-neutral-800">
                <option>Standard Rate (18% GST)</option>
                <option>Reduced Rate (5% GST - Staples)</option>
                <option>Exempt (0% GST - Fresh Produce)</option>
              </select>
            </div>
          </div>

          {/* Stock Summary */}
          <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">Stock summary</h3>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-neutral-50 p-2 border border-neutral-200/60">
                <span className="text-[10px] text-neutral-500 font-semibold block">Total</span>
                <span className="font-display font-black text-lg text-neutral-900">{totalStock}</span>
              </div>
              <div className="rounded-xl bg-emerald-50 p-2 border border-emerald-200/60">
                <span className="text-[10px] text-emerald-700 font-semibold block">In stock</span>
                <span className="font-display font-black text-lg text-emerald-800">{totalStock}</span>
              </div>
              <div className="rounded-xl bg-neutral-50 p-2 border border-neutral-200/60">
                <span className="text-[10px] text-neutral-500 font-semibold block">Out</span>
                <span className="font-display font-black text-lg text-neutral-400">0</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-600 mb-1">Low stock threshold</label>
              <input
                type="number"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="h-10 w-full rounded-xl border border-neutral-200 px-3 text-xs font-bold text-neutral-900"
              />
              <p className="mt-1 text-[11px] text-neutral-400">
                Trigger replenishment alert when stock drops below this number.
              </p>
            </div>
          </div>

          {/* Compliance Checklist */}
          <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">Product compliance</h3>
            <div className="space-y-2 text-xs">
              {[
                { key: "standards", label: "Meets safety and quality standards" },
                { key: "nonHazardous", label: "No hazardous materials contained" },
                { key: "packaging", label: "Packaging complies with regulations" },
              ].map((item) => (
                <label key={item.key} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={compliance[item.key as keyof typeof compliance]}
                    onChange={(e) =>
                      setCompliance((prev) => ({ ...prev, [item.key]: e.target.checked }))
                    }
                    className="rounded border-neutral-300 text-emerald-700 focus:ring-emerald-700"
                  />
                  <span className="text-neutral-700 font-medium">{item.label}</span>
                </label>
              ))}
            </div>
            <div className="pt-2 border-t border-neutral-100 flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold">
              <ShieldCheck className="h-4 w-4" />
              <span>All compliance documentation verified.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
