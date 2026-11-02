"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Package,
  Layers,
  AlertTriangle,
  RotateCcw,
  Trash2,
  Search,
  Download,
  Plus,
  Eye,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { WarehouseManagerShell } from "@/components/warehouse/WarehouseManagerShell";

export default function RejectedItemsPage() {
  const [selectedReason, setSelectedReason] = useState("All Rejection Reasons");
  const [selectedType, setSelectedType] = useState("All Inspection Types");
  const [selectedZone, setSelectedZone] = useState("All Zones");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const rejectedItems = [
    {
      id: "RJ-20261029-001",
      orderId: "HM-20261029-0142",
      sku: "HM-BAG-001",
      name: "Backpack 30L",
      qty: 4,
      reason: "Material Defect",
      action: "Rework",
      status: "Pending",
    },
    {
      id: "RJ-20261029-002",
      orderId: "HM-20261029-0141",
      sku: "HM-SHO-021",
      name: "Running Shoes",
      qty: 2,
      reason: "Size Mismatch",
      action: "Return",
      status: "In Progress",
    },
    {
      id: "RJ-20261029-003",
      orderId: "HM-20261029-0139",
      sku: "HM-DRK-002",
      name: "Water Bottle 1L",
      qty: 6,
      reason: "Functional Defect",
      action: "Dispose",
      status: "Pending",
    },
    {
      id: "RJ-20261029-004",
      orderId: "HM-20261029-0137",
      sku: "HM-ACC-017",
      name: "Bluetooth Speaker",
      qty: 3,
      reason: "Quality Not Standard",
      action: "Rework",
      status: "In Progress",
    },
    {
      id: "RJ-20261029-005",
      orderId: "HM-20261029-0136",
      sku: "HM-APP-008",
      name: "T-Shirt (L)",
      qty: 5,
      reason: "Stitching Issue",
      action: "Rework",
      status: "Completed",
    },
    {
      id: "RJ-20261029-006",
      orderId: "HM-20261029-0135",
      sku: "HM-KIT-003",
      name: "Kitchen Knife Set",
      qty: 1,
      reason: "Damaged Item",
      action: "Dispose",
      status: "Pending",
    },
    {
      id: "RJ-20261029-007",
      orderId: "HM-20261029-0133",
      sku: "HM-BAG-001",
      name: "Backpack 30L",
      qty: 3,
      reason: "Incorrect Item",
      action: "Return",
      status: "In Progress",
    },
    {
      id: "RJ-20261029-008",
      orderId: "HM-20261029-0131",
      sku: "HM-SHO-021",
      name: "Running Shoes",
      qty: 4,
      reason: "Damaged Item",
      action: "Rework",
      status: "Pending",
    },
    {
      id: "RJ-20261029-009",
      orderId: "HM-20261029-0130",
      sku: "HM-DRK-002",
      name: "Water Bottle 1L",
      qty: 2,
      reason: "Leakage",
      action: "Dispose",
      status: "Completed",
    },
    {
      id: "RJ-20261029-010",
      orderId: "HM-20261029-0129",
      sku: "HM-APP-008",
      name: "T-Shirt (L)",
      qty: 6,
      reason: "Color Variation",
      action: "Rework",
      status: "Pending",
    },
  ];

  const toggleSelectAll = () => {
    if (selectedRows.length === rejectedItems.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(rejectedItems.map((r) => r.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  return (
    <WarehouseManagerShell pageNumber={19} title="Rejected Items" currentPath="/warehouse/quality/rejected">
      <div className="space-y-6">
        {/* Header matching page_20.png */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Rejected Items
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              View and manage items that failed quality inspection, track reasons, and take corrective actions.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition shadow-2xs">
              <Download className="w-3.5 h-3.5 text-gray-500" />
              <span>Export</span>
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#087A4A] hover:bg-[#06633B] rounded-xl transition shadow-xs">
              <Plus className="w-4 h-4" />
              <span>Create Disposition</span>
            </button>
          </div>
        </div>

        {/* 5 KPI Cards (Exact from page_20.png) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {/* Card 1: Total Rejected Items */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">Total Rejected Items</div>
              <div className="text-2xl font-black text-gray-900 leading-none mt-1">568</div>
            </div>
            <div className="text-[11px] font-bold text-emerald-600 mt-2">
              ↑ +6.8% vs yesterday
            </div>
          </div>

          {/* Card 2: Rejected Orders */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">Rejected Orders</div>
              <div className="text-2xl font-black text-gray-900 leading-none mt-1">142</div>
            </div>
            <div className="text-[11px] font-medium text-gray-400 mt-2">Orders affected</div>
          </div>

          {/* Card 3: Rejection Rate */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">Rejection Rate</div>
              <div className="text-2xl font-black text-gray-900 leading-none mt-1">8.1%</div>
            </div>
            <div className="text-[11px] font-medium text-gray-400 mt-2">Benchmark &lt; 5.0%</div>
          </div>

          {/* Card 4: To Be Reworked */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">To Be Reworked</div>
              <div className="text-2xl font-black text-gray-900 leading-none mt-1">346</div>
            </div>
            <div className="text-[11px] font-medium text-gray-400 mt-2">Salvageable units</div>
          </div>

          {/* Card 5: To Be Disposed */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <Trash2 className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">To Be Disposed</div>
              <div className="text-2xl font-black text-rose-600 leading-none mt-1">222</div>
            </div>
            <div className="text-[11px] font-medium text-gray-400 mt-2">Scrap authorized</div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-white rounded-2xl p-3 border border-gray-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Order ID, SKU, Item, or Reason..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-[#F8FAF9] border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#087A4A] text-gray-800 placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAF9] border border-gray-200 rounded-xl font-medium text-gray-700 cursor-pointer">
              <span>All Rejection Reasons</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAF9] border border-gray-200 rounded-xl font-medium text-gray-700 cursor-pointer">
              <span>All Inspection Types</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAF9] border border-gray-200 rounded-xl font-medium text-gray-700 cursor-pointer">
              <span>All Zones</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAF9] border border-gray-200 rounded-xl font-medium text-gray-700 cursor-pointer">
              <span>Today</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </div>
          </div>
        </div>

        {/* Master Table + Right Side Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Table: 8 cols */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden flex flex-col justify-between">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAF9] text-gray-500 font-semibold border-b border-gray-200">
                  <tr>
                    <th className="py-2.5 px-3 w-8">
                      <input
                        type="checkbox"
                        checked={selectedRows.length === rejectedItems.length}
                        onChange={toggleSelectAll}
                        className="rounded border-gray-300 text-[#087A4A] focus:ring-[#087A4A]"
                      />
                    </th>
                    <th className="py-2.5 px-3">Rejection ID</th>
                    <th className="py-2.5 px-3">Order ID</th>
                    <th className="py-2.5 px-3">SKU</th>
                    <th className="py-2.5 px-3">Item Name</th>
                    <th className="py-2.5 px-3">Qty</th>
                    <th className="py-2.5 px-3">Rejection Reason</th>
                    <th className="py-2.5 px-3">Action</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {rejectedItems.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-2.5 px-3">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(r.id)}
                          onChange={() => toggleSelectRow(r.id)}
                          className="rounded border-gray-300 text-[#087A4A] focus:ring-[#087A4A]"
                        />
                      </td>
                      <td className="py-2.5 px-3 font-bold text-gray-900">{r.id}</td>
                      <td className="py-2.5 px-3 text-gray-600 font-mono text-[11px]">{r.orderId}</td>
                      <td className="py-2.5 px-3 font-mono text-[11px] text-gray-700">{r.sku}</td>
                      <td className="py-2.5 px-3 text-gray-800 font-semibold">{r.name}</td>
                      <td className="py-2.5 px-3 text-gray-900 font-bold">{r.qty}</td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          {r.reason}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-gray-700">{r.action}</td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          r.status === "Completed"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : r.status === "In Progress"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}>
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div className="p-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500">
              <span>Showing 1 – 10 of 568 rejected items</span>
              <div className="flex items-center gap-1">
                <button className="p-1 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-400">
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button className="w-6 h-6 rounded-lg bg-[#087A4A] text-white font-bold text-xs flex items-center justify-center">
                  1
                </button>
                <button className="w-6 h-6 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium text-xs flex items-center justify-center">
                  2
                </button>
                <button className="w-6 h-6 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium text-xs flex items-center justify-center">
                  3
                </button>
                <button className="w-6 h-6 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium text-xs flex items-center justify-center">
                  4
                </button>
                <button className="w-6 h-6 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium text-xs flex items-center justify-center">
                  5
                </button>
                <span className="text-gray-400 px-1">...</span>
                <button className="w-6 h-6 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium text-xs flex items-center justify-center">
                  57
                </button>
                <button className="p-1 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Panels: 4 cols */}
          <div className="lg:col-span-4 space-y-5">
            {/* Rejection Reasons Donut */}
            <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs">
              <h2 className="text-xs font-bold text-gray-900 mb-2">Rejection Reasons (568)</h2>
              <div className="flex items-center gap-4">
                <div className="relative w-28 h-28 flex-shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    {/* Material Defect 28.5% = 64.4 */}
                    <circle cx="50" cy="50" r="36" fill="none" stroke="#EF4444" strokeWidth="14" strokeDasharray="64 226" strokeDashoffset="0" />
                    {/* Damaged 20.1% = 45.4 */}
                    <circle cx="50" cy="50" r="36" fill="none" stroke="#F59E0B" strokeWidth="14" strokeDasharray="45 226" strokeDashoffset="-64" />
                    {/* Functional 14.6% = 33 */}
                    <circle cx="50" cy="50" r="36" fill="none" stroke="#10B981" strokeWidth="14" strokeDasharray="33 226" strokeDashoffset="-109" />
                    {/* Size Mismatch 11.4% = 25.8 */}
                    <circle cx="50" cy="50" r="36" fill="none" stroke="#3B82F6" strokeWidth="14" strokeDasharray="26 226" strokeDashoffset="-142" />
                    {/* Other 25.4% = 57.4 */}
                    <circle cx="50" cy="50" r="36" fill="none" stroke="#8B5CF6" strokeWidth="14" strokeDasharray="57 226" strokeDashoffset="-168" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-base font-black text-gray-900 leading-none">568</span>
                    <span className="text-[9px] text-gray-400 font-semibold mt-0.5">Items</span>
                  </div>
                </div>

                <div className="flex-1 space-y-1 text-[11px]">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5 text-gray-700">
                      <span className="w-2 h-2 rounded-sm bg-rose-500" /> Material Defect
                    </span>
                    <span className="font-bold text-gray-900">28.5% (162)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5 text-gray-700">
                      <span className="w-2 h-2 rounded-sm bg-amber-500" /> Damaged Item
                    </span>
                    <span className="font-bold text-gray-900">20.1% (114)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5 text-gray-700">
                      <span className="w-2 h-2 rounded-sm bg-emerald-500" /> Functional Defect
                    </span>
                    <span className="font-bold text-gray-900">14.6% (83)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5 text-gray-700">
                      <span className="w-2 h-2 rounded-sm bg-blue-500" /> Size Mismatch
                    </span>
                    <span className="font-bold text-gray-900">11.4% (65)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5 text-gray-700">
                      <span className="w-2 h-2 rounded-sm bg-purple-500" /> Other
                    </span>
                    <span className="font-bold text-gray-900">25.4% (144)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rejection Trend (Last 7 Days) */}
            <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs">
              <h2 className="text-xs font-bold text-gray-900 mb-2">Rejection Trend (Last 7 Days)</h2>
              <div className="h-28 w-full relative">
                <svg className="w-full h-full" viewBox="0 0 280 80" preserveAspectRatio="none">
                  <line x1="20" y1="15" x2="270" y2="15" stroke="#F1F5F9" strokeDasharray="2,2" />
                  <line x1="20" y1="35" x2="270" y2="35" stroke="#F1F5F9" strokeDasharray="2,2" />
                  <line x1="20" y1="55" x2="270" y2="55" stroke="#F1F5F9" strokeDasharray="2,2" />

                  <text x="5" y="18" fill="#94A3B8" fontSize="7">100</text>
                  <text x="5" y="38" fill="#94A3B8" fontSize="7">60</text>
                  <text x="5" y="58" fill="#94A3B8" fontSize="7">20</text>
                  <text x="10" y="75" fill="#94A3B8" fontSize="7">0</text>

                  {/* Red line */}
                  <path
                    d="M30 65 L 70 55 L 110 48 L 150 52 L 190 38 L 230 36 L 265 24"
                    stroke="#EF4444"
                    strokeWidth="2"
                    fill="none"
                  />
                  {[
                    [30, 65], [70, 55], [110, 48], [150, 52], [190, 38], [230, 36], [265, 24]
                  ].map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r="2.5" fill="#EF4444" />
                  ))}
                </svg>
                <div className="flex justify-between pl-6 pr-1 text-[8px] text-gray-400 font-medium mt-1">
                  <span>Oct 23</span>
                  <span>Oct 24</span>
                  <span>Oct 25</span>
                  <span>Oct 26</span>
                  <span>Oct 27</span>
                  <span>Oct 28</span>
                  <span>Oct 29</span>
                </div>
              </div>
            </div>

            {/* Recent Dispositions */}
            <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs">
              <div className="flex items-center justify-between mb-2.5">
                <h2 className="text-xs font-bold text-gray-900">Recent Dispositions</h2>
                <button className="text-[11px] font-bold text-[#087A4A] hover:underline">
                  View All →
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="font-semibold text-gray-900 text-[11px]">
                      RJ-20261029-005 – Reworked & Approved
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400">10 min ago</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="font-semibold text-gray-900 text-[11px]">
                      RJ-20261029-009 – Disposed
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400">22 min ago</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <RotateCcw className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span className="font-semibold text-gray-900 text-[11px]">
                      RJ-20261029-002 – Return Initiated
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400">34 min ago</span>
                </div>

                <div className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="font-semibold text-gray-900 text-[11px]">
                      RJ-20261029-004 – Rework Completed
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400">48 min ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WarehouseManagerShell>
  );
}
