"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Package,
  Plus,
  Download,
  Search,
  Filter,
  MoreVertical,
  Check,
  Edit,
  ExternalLink,
  Trash2,
} from "lucide-react";
import { ADMIN_PRODUCTS, type AdminProduct } from "@/mocks/adminData";
import { toast } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

export default function ProductsListPage() {
  const [products, setProducts] = useState<AdminProduct[]>(ADMIN_PRODUCTS);
  const [search, setSearch] = useState("");
  const [domainFilter, setDomainFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [actionMenuOpenId, setActionMenuOpenId] = useState<string | null>(null);

  const filteredProducts = products.filter((p) => {
    if (domainFilter !== "all" && p.domain !== domainFilter) return false;
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    if (
      search.trim() &&
      !p.name.toLowerCase().includes(search.toLowerCase()) &&
      !p.sku.toLowerCase().includes(search.toLowerCase()) &&
      !p.brand.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredProducts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProducts.map((p) => p.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["SKU,Product,Brand,Category,Price,Stock,Status"]
        .concat(
          filteredProducts.map(
            (p) =>
              `"${p.sku}","${p.name}","${p.brand}","${p.category}",${p.price},${p.stock},"${p.status}"`
          )
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "hypermart-products.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast("Exported visible products to hypermart-products.csv");
  };

  return (
    <div className="space-y-6">
      {/* ── 1. Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Products
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-neutral-500 font-medium">
            Manage your product catalog, inventory, pricing and availability across HyperMart.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExport}
            className="flex h-10 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3.5 text-xs font-bold text-neutral-700 shadow-2xs hover:bg-neutral-50 transition cursor-pointer"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          <Link
            href="/admin/products/new"
            className="flex h-10 items-center gap-2 rounded-xl bg-[#0E5E3A] px-4 text-xs font-bold text-white shadow-sm hover:bg-[#0b4d2f] transition cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add product</span>
          </Link>
        </div>
      </div>

      {/* ── 2. Filter & Search Toolbar ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-neutral-200/80 bg-white p-3.5 shadow-2xs">
        <div className="flex flex-1 items-center gap-3 min-w-[280px]">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by product name, SKU or brand"
              className="h-10 w-full rounded-xl border border-neutral-200 pl-10 pr-3 text-xs font-medium text-neutral-900 placeholder-neutral-400 focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
            />
          </div>

          <select
            value={domainFilter}
            onChange={(e) => setDomainFilter(e.target.value)}
            className="h-10 rounded-xl border border-neutral-200 bg-neutral-50 px-3 text-xs font-bold text-neutral-700"
          >
            <option value="all">All domains</option>
            <option value="food">Food & Grocery</option>
            <option value="electronics">Electronics</option>
            <option value="beauty">Beauty & Personal Care</option>
            <option value="fashion">Fashion & Apparel</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 rounded-xl border border-neutral-200 bg-neutral-50 px-3 text-xs font-bold text-neutral-700"
          >
            <option value="all">All status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Draft">Draft</option>
          </select>
        </div>

        {(search || domainFilter !== "all" || statusFilter !== "all") && (
          <button
            onClick={() => {
              setSearch("");
              setDomainFilter("all");
              setStatusFilter("all");
            }}
            className="text-xs font-semibold text-neutral-500 hover:text-neutral-800"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* ── 3. Products Data Table ── */}
      <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-neutral-200 bg-neutral-50/80 text-[11px] font-bold uppercase tracking-wider text-neutral-500">
              <tr>
                <th className="w-10 px-4 py-3.5">
                  <input
                    type="checkbox"
                    checked={
                      selectedIds.length === filteredProducts.length &&
                      filteredProducts.length > 0
                    }
                    onChange={toggleSelectAll}
                    className="rounded border-neutral-300 text-emerald-700 focus:ring-emerald-700 cursor-pointer"
                  />
                </th>
                <th className="py-3.5 px-3">Product</th>
                <th className="py-3.5 px-3">SKU</th>
                <th className="py-3.5 px-3">Brand</th>
                <th className="py-3.5 px-3">Category</th>
                <th className="py-3.5 px-3 text-right">Price</th>
                <th className="py-3.5 px-3 text-right">Stock</th>
                <th className="py-3.5 px-3">Offer</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredProducts.map((p) => {
                const isSelected = selectedIds.includes(p.id);
                return (
                  <tr
                    key={p.id}
                    className={cn(
                      "transition-colors hover:bg-emerald-50/30",
                      isSelected && "bg-emerald-50/50"
                    )}
                  >
                    <td className="px-4 py-3.5">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(p.id)}
                        className="rounded border-neutral-300 text-emerald-700 focus:ring-emerald-700 cursor-pointer"
                      />
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-neutral-100 border border-neutral-200/60 font-bold text-neutral-400">
                          <Package className="h-5 w-5 text-emerald-800" />
                        </span>
                        <div>
                          <Link
                            href={`/admin/products/${p.id}`}
                            className="font-bold text-neutral-900 hover:text-emerald-800 hover:underline transition"
                          >
                            {p.name}
                          </Link>
                          <p className="text-[11px] text-neutral-500 font-medium">
                            {p.packSize}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 font-mono text-[11px] font-semibold text-neutral-600">
                      {p.sku}
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-neutral-800">
                      {p.brand}
                    </td>
                    <td className="py-3.5 px-3 text-neutral-600">{p.category}</td>
                    <td className="py-3.5 px-3 text-right font-bold text-neutral-900">
                      ₹{p.price}
                    </td>
                    <td className="py-3.5 px-3 text-right font-semibold text-neutral-800">
                      {p.stock}
                    </td>
                    <td className="py-3.5 px-3">
                      {p.offer ? (
                        <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-800 border border-amber-200/60">
                          {p.offer}
                        </span>
                      ) : (
                        <span className="text-neutral-400">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Link
                          href={`/admin/products/${p.id}`}
                          title="Edit Product"
                          className="grid h-8 w-8 place-items-center rounded-lg hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900 transition"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination & Count Footer */}
        <div className="flex items-center justify-between border-t border-neutral-100 px-6 py-3 text-xs text-neutral-500">
          <span>
            Showing 1–{filteredProducts.length} of {filteredProducts.length} products
          </span>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Rows per page: 10</span>
          </div>
        </div>
      </div>
    </div>
  );
}
