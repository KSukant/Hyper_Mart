"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  RotateCcw,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Download,
  Plus,
  Search,
  Eye,
  Filter,
  RefreshCw,
  CreditCard,
  Package,
  Layers,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  XCircle,
  TrendingUp,
} from "lucide-react";
import { WarehouseManagerShell } from "@/components/warehouse/WarehouseManagerShell";

interface ReturnItem {
  id: string;
  orderId: string;
  customer: string;
  actionType: "Refund" | "Replacement";
  amount: number;
  paymentMode: string;
  status: "Completed" | "In Process" | "Pending";
  processedOn: string;
  items: string;
  approvedOn: string;
  slaDueBy: string;
  image: string;
}

const RETURN_RECORDS: ReturnItem[] = [
  {
    id: "RT-20261029-001",
    orderId: "HM-20261024-0834",
    customer: "Arun Prakash",
    actionType: "Refund",
    amount: 2499,
    paymentMode: "Original (UPI)",
    status: "Completed",
    processedOn: "29 Oct, 10:40 AM",
    items: "1 (Men Running Shoes)",
    approvedOn: "29 Oct 2026, 10:15 AM",
    slaDueBy: "31 Oct 2026, 10:15 AM",
    image: "/images/products/running-shoes.png",
  },
  {
    id: "RT-20261029-002",
    orderId: "HM-20261024-0837",
    customer: "Divya S.",
    actionType: "Replacement",
    amount: 1599,
    paymentMode: "N/A",
    status: "Completed",
    processedOn: "29 Oct, 10:55 AM",
    items: "1 (Wireless Earbuds)",
    approvedOn: "29 Oct 2026, 10:25 AM",
    slaDueBy: "31 Oct 2026, 10:25 AM",
    image: "/images/products/running-shoes.png",
  },
  {
    id: "RT-20261029-003",
    orderId: "HM-20261024-0842",
    customer: "Karthik R.",
    actionType: "Refund",
    amount: 999,
    paymentMode: "Card",
    status: "In Process",
    processedOn: "-",
    items: "1 (Stainless Steel Flask)",
    approvedOn: "29 Oct 2026, 10:45 AM",
    slaDueBy: "31 Oct 2026, 10:45 AM",
    image: "/images/products/running-shoes.png",
  },
  {
    id: "RT-20261029-004",
    orderId: "HM-20261024-0846",
    customer: "Meena K.",
    actionType: "Replacement",
    amount: 3299,
    paymentMode: "N/A",
    status: "Pending",
    processedOn: "-",
    items: "1 (Running Shoes)",
    approvedOn: "29 Oct 2026, 11:18 AM",
    slaDueBy: "31 Oct 2026, 11:18 AM",
    image: "/images/products/running-shoes.png",
  },
  {
    id: "RT-20261029-005",
    orderId: "HM-20261025-0851",
    customer: "Suresh M.",
    actionType: "Refund",
    amount: 799,
    paymentMode: "UPI",
    status: "Completed",
    processedOn: "29 Oct, 11:32 AM",
    items: "2 (Organic Cotton Tee)",
    approvedOn: "29 Oct 2026, 11:00 AM",
    slaDueBy: "31 Oct 2026, 11:00 AM",
    image: "/images/products/running-shoes.png",
  },
  {
    id: "RT-20261029-006",
    orderId: "HM-20261025-0856",
    customer: "Priya N.",
    actionType: "Replacement",
    amount: 1999,
    paymentMode: "N/A",
    status: "In Process",
    processedOn: "-",
    items: "1 (Smart Band Pro)",
    approvedOn: "29 Oct 2026, 11:10 AM",
    slaDueBy: "31 Oct 2026, 11:10 AM",
    image: "/images/products/running-shoes.png",
  },
  {
    id: "RT-20261029-007",
    orderId: "HM-20261025-0860",
    customer: "Rahul V.",
    actionType: "Refund",
    amount: 1299,
    paymentMode: "Card",
    status: "Completed",
    processedOn: "29 Oct, 12:05 PM",
    items: "1 (Ceramic Cookware Pan)",
    approvedOn: "29 Oct 2026, 11:30 AM",
    slaDueBy: "31 Oct 2026, 11:30 AM",
    image: "/images/products/running-shoes.png",
  },
  {
    id: "RT-20261029-008",
    orderId: "HM-20261025-0863",
    customer: "Akash P.",
    actionType: "Replacement",
    amount: 2499,
    paymentMode: "N/A",
    status: "Pending",
    processedOn: "-",
    items: "1 (Mechanical Keyboard)",
    approvedOn: "29 Oct 2026, 11:45 AM",
    slaDueBy: "31 Oct 2026, 11:45 AM",
    image: "/images/products/running-shoes.png",
  },
  {
    id: "RT-20261029-009",
    orderId: "HM-20261025-0867",
    customer: "Nandhini R.",
    actionType: "Refund",
    amount: 599,
    paymentMode: "UPI",
    status: "Completed",
    processedOn: "29 Oct, 12:37 PM",
    items: "1 (Glass Food Storage)",
    approvedOn: "29 Oct 2026, 12:00 PM",
    slaDueBy: "31 Oct 2026, 12:00 PM",
    image: "/images/products/running-shoes.png",
  },
  {
    id: "RT-20261029-010",
    orderId: "HM-20261025-0871",
    customer: "Vignesh K.",
    actionType: "Replacement",
    amount: 1499,
    paymentMode: "N/A",
    status: "In Process",
    processedOn: "-",
    items: "1 (Gaming Mouse RGB)",
    approvedOn: "29 Oct 2026, 12:15 PM",
    slaDueBy: "31 Oct 2026, 12:15 PM",
    image: "/images/products/running-shoes.png",
  },
];

export default function ReturnsRefundReplacementPage() {
  const [selectedId, setSelectedId] = useState<string>("RT-20261029-004");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAction, setFilterAction] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const selectedItem = RETURN_RECORDS.find((r) => r.id === selectedId) || RETURN_RECORDS[3];

  return (
    <WarehouseManagerShell
      pageTitle="Refund / Replacement"
      pageDescription="Process approved returns with refunds or replacements, track status, and manage settlements."
      currentPath="/warehouse/returns/refund-replacement"
    >
      <div className="space-y-4">
        {/* Breadcrumb & Header Action Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#5B7564] mb-1">
              <Link href="/warehouse/dashboard" className="hover:text-[#087A4A]">Home</Link>
              <span>›</span>
              <Link href="/warehouse/returns/inspect-approve" className="hover:text-[#087A4A]">Returns</Link>
              <span>›</span>
              <span className="text-[#033129] font-bold">Refund / Replacement</span>
            </div>
            <h1 className="text-xl font-black text-[#033129] tracking-tight">Refund / Replacement</h1>
            <p className="text-xs text-[#5B7564]">
              Process approved returns with refunds or replacements, track status, and manage settlements.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#CBD8D0] text-[#1E3B2F] text-xs font-semibold hover:bg-[#F2F7F4] transition shadow-xs">
              <Download className="w-3.5 h-3.5 text-[#5B7564]" />
              Export
            </button>
            <button className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#087A4A] text-white text-xs font-bold hover:bg-[#06633C] transition shadow-xs">
              <Plus className="w-4 h-4 stroke-[2.5]" />
              Create Refund/Replacement
            </button>
          </div>
        </div>

        {/* 5 KPI Metric Cards (Page 23 exact) */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {/* Total Approved Returns */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32]">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Total Approved Returns</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">142</div>
              <div className="text-[11px] text-[#2E7D32] font-semibold mt-1 flex items-center gap-1">
                <span>↑ +9.8% vs yesterday</span>
              </div>
            </div>
          </div>

          {/* Refunds (Today) */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-[#E3F2FD] flex items-center justify-center text-[#1976D2]">
                <RotateCcw className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Refunds (Today)</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">68</div>
              <div className="text-[11px] text-[#5B7564] font-medium mt-1">
                (₹1,34,560)
              </div>
            </div>
          </div>

          {/* Replacements (Today) */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-[#FFF3E0] flex items-center justify-center text-[#E65100]">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Replacements (Today)</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">74</div>
              <div className="text-[11px] text-[#5B7564] font-medium mt-1">
                (₹1,62,340)
              </div>
            </div>
          </div>

          {/* Completed */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-[#F3E5F5] flex items-center justify-center text-[#7B1FA2]">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Completed</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">118</div>
              <div className="text-[11px] text-[#5B7564] font-medium mt-1">
                (83.1%)
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-[#FFEBEE] flex items-center justify-center text-[#D32F2F]">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Pending</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">24</div>
              <div className="text-[11px] text-[#5B7564] font-medium mt-1">
                (16.9%)
              </div>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white rounded-2xl p-3 border border-[#E1E8E3] shadow-xs flex flex-wrap items-center gap-3 justify-between">
          <div className="flex-1 min-w-[260px] relative">
            <Search className="w-4 h-4 text-[#7A9385] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Return ID, Order ID, Customer, or SKU..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-[#D5E0D8] text-xs focus:outline-none focus:border-[#087A4A] bg-[#FAFCFA]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-[#D5E0D8] bg-white text-[#2B4738] font-medium focus:outline-none"
            >
              <option value="All">All Action Types</option>
              <option value="Refund">Refund</option>
              <option value="Replacement">Replacement</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-[#D5E0D8] bg-white text-[#2B4738] font-medium focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="In Process">In Process</option>
              <option value="Pending">Pending</option>
            </select>

            <select className="px-3 py-1.5 rounded-xl border border-[#D5E0D8] bg-white text-[#2B4738] font-medium focus:outline-none">
              <option>All Payment Modes</option>
              <option>Original (UPI)</option>
              <option>Card</option>
              <option>UPI</option>
            </select>

            <select className="px-3 py-1.5 rounded-xl border border-[#D5E0D8] bg-white text-[#2B4738] font-medium focus:outline-none">
              <option>All Zones</option>
              <option>North Zone</option>
              <option>South Zone</option>
            </select>

            <select className="px-3 py-1.5 rounded-xl border border-[#D5E0D8] bg-white text-[#2B4738] font-medium focus:outline-none">
              <option>Today</option>
              <option>Yesterday</option>
              <option>Last 7 Days</option>
            </select>
          </div>
        </div>

        {/* Main Content: Table + Side Inspector (Matches Page 23 1:1) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Table (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E1E8E3] shadow-xs overflow-hidden flex flex-col justify-between">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAF9] border-b border-[#E1E8E3] text-[#5B7564] font-bold">
                  <tr>
                    <th className="py-2.5 px-3 w-8">
                      <input type="checkbox" className="rounded text-[#087A4A] focus:ring-0" />
                    </th>
                    <th className="py-2.5 px-3">Return ID</th>
                    <th className="py-2.5 px-3">Order ID</th>
                    <th className="py-2.5 px-3">Customer</th>
                    <th className="py-2.5 px-3">Action Type</th>
                    <th className="py-2.5 px-3">Amount (₹)</th>
                    <th className="py-2.5 px-3">Payment Mode</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Processed On</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDF2EE] text-[#1E3B2F]">
                  {RETURN_RECORDS.map((row) => {
                    const isSelected = row.id === selectedId;
                    return (
                      <tr
                        key={row.id}
                        onClick={() => setSelectedId(row.id)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? "bg-[#F0FAF4] font-semibold" : "hover:bg-[#F9FCFA]"
                        }`}
                      >
                        <td className="py-2.5 px-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => setSelectedId(row.id)}
                            className="rounded text-[#087A4A] focus:ring-0"
                          />
                        </td>
                        <td className="py-2.5 px-3 font-bold text-[#033129]">{row.id}</td>
                        <td className="py-2.5 px-3 text-[#5B7564]">{row.orderId}</td>
                        <td className="py-2.5 px-3">{row.customer}</td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              row.actionType === "Refund"
                                ? "bg-[#E8F5E9] text-[#2E7D32]"
                                : "bg-[#E3F2FD] text-[#1976D2]"
                            }`}
                          >
                            {row.actionType}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-semibold">{row.amount.toLocaleString()}</td>
                        <td className="py-2.5 px-3 text-[#5B7564]">{row.paymentMode}</td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              row.status === "Completed"
                                ? "bg-[#E8F5E9] text-[#2E7D32]"
                                : row.status === "In Process"
                                ? "bg-[#E1F5FE] text-[#0288D1]"
                                : "bg-[#FFF8E1] text-[#F57F17]"
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-[#7A9385]">{row.processedOn}</td>
                        <td className="py-2.5 px-3 text-right">
                          <button className="text-[#087A4A] hover:text-[#06633C] font-semibold flex items-center gap-1 justify-end ml-auto">
                            <Eye className="w-3.5 h-3.5" />
                            <span>View</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-3 border-t border-[#E1E8E3] bg-[#FAFCFA] flex items-center justify-between text-xs text-[#5B7564]">
              <div>Showing 1 – 10 of 142 records</div>
              <div className="flex items-center gap-1">
                <button className="w-7 h-7 rounded-lg border border-[#D5E0D8] bg-white flex items-center justify-center hover:bg-[#F2F7F4]">
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button className="w-7 h-7 rounded-lg bg-[#087A4A] text-white font-bold flex items-center justify-center">1</button>
                <button className="w-7 h-7 rounded-lg border border-[#D5E0D8] bg-white flex items-center justify-center hover:bg-[#F2F7F4]">2</button>
                <button className="w-7 h-7 rounded-lg border border-[#D5E0D8] bg-white flex items-center justify-center hover:bg-[#F2F7F4]">3</button>
                <button className="w-7 h-7 rounded-lg border border-[#D5E0D8] bg-white flex items-center justify-center hover:bg-[#F2F7F4]">4</button>
                <button className="w-7 h-7 rounded-lg border border-[#D5E0D8] bg-white flex items-center justify-center hover:bg-[#F2F7F4]">5</button>
                <span className="px-1">...</span>
                <button className="w-7 h-7 rounded-lg border border-[#D5E0D8] bg-white flex items-center justify-center hover:bg-[#F2F7F4]">15</button>
                <button className="w-7 h-7 rounded-lg border border-[#D5E0D8] bg-white flex items-center justify-center hover:bg-[#F2F7F4]">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Selected Return Details Inspector (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-[#EDF2EE]">
                <div>
                  <h3 className="font-extrabold text-[#033129] text-sm">Selected Return Details</h3>
                  <div className="text-base font-black text-[#033129] mt-0.5">{selectedItem.id}</div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#FFF8E1] text-[#F57F17] border border-[#FFE082]">
                  {selectedItem.status}
                </span>
              </div>

              {/* Key Specs */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">Order ID</span>
                  <span className="font-semibold text-[#033129]">{selectedItem.orderId}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">Customer</span>
                  <span className="font-semibold text-[#033129]">{selectedItem.customer}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">Action Type</span>
                  <span className="font-semibold text-[#1976D2]">{selectedItem.actionType}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">Amount</span>
                  <span className="font-black text-[#033129]">₹{selectedItem.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">Item(s)</span>
                  <span className="font-semibold text-[#033129]">{selectedItem.items}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">Approved On</span>
                  <span className="font-medium text-[#1E3B2F]">{selectedItem.approvedOn}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">SLA Due By</span>
                  <span className="font-medium text-[#D32F2F]">{selectedItem.slaDueBy}</span>
                </div>
              </div>

              {/* Product Thumbnail from Reference */}
              <div className="p-3 rounded-xl bg-[#FAFCFA] border border-[#E1E8E3] flex items-center justify-center">
                <div className="w-32 h-24 rounded-lg bg-white border border-[#EDF2EE] flex items-center justify-center shadow-inner overflow-hidden">
                  <div className="text-center p-2">
                    <Package className="w-10 h-10 text-[#7A9385] mx-auto mb-1 stroke-1" />
                    <span className="text-[10px] text-[#5B7564] font-medium block leading-tight">
                      Running Shoes (White)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Process Action Buttons */}
            <div className="space-y-2 pt-3 border-t border-[#EDF2EE]">
              <div className="text-[11px] font-bold text-[#5B7564]">Process Action</div>
              <button className="w-full py-2 px-3 rounded-xl bg-[#087A4A] text-white text-xs font-bold hover:bg-[#06633C] transition flex items-center justify-center gap-1.5 shadow-xs">
                <CheckCircle2 className="w-4 h-4" />
                Process Replacement
              </button>
              <button className="w-full py-2 px-3 rounded-xl bg-white border border-[#CBD8D0] text-[#1E3B2F] text-xs font-semibold hover:bg-[#F2F7F4] transition flex items-center justify-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-[#5B7564]" />
                Mark as Completed
              </button>
              <button className="w-full py-2 px-3 rounded-xl bg-white border border-[#CBD8D0] text-[#1E3B2F] text-xs font-semibold hover:bg-[#F2F7F4] transition flex items-center justify-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#5B7564]" />
                Request Payment Review
              </button>
              <button className="w-full py-2 px-3 rounded-xl bg-white border border-[#FFCDD2] text-[#D32F2F] text-xs font-semibold hover:bg-[#FFEBEE] transition flex items-center justify-center gap-1.5">
                <XCircle className="w-3.5 h-3.5" />
                Cancel Processing
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Row Analytics: 4 Cards (Matches Page 23 1:1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Return Action Distribution Donut */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs">
            <h4 className="text-xs font-extrabold text-[#033129] mb-3">Return Action Distribution</h4>
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24 flex-shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  {/* Background ring */}
                  <path
                    className="text-[#F0F4F1]"
                    strokeWidth="3.8"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Refund 47.9% (green) */}
                  <path
                    className="text-[#2E7D32]"
                    strokeDasharray="47.9, 100"
                    strokeWidth="3.8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Replacement 52.1% (orange) */}
                  <path
                    className="text-[#FFA000]"
                    strokeDasharray="52.1, 100"
                    strokeDashoffset="-47.9"
                    strokeWidth="3.8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-sm font-black text-[#033129] leading-none">142</span>
                  <span className="text-[9px] text-[#5B7564] font-semibold mt-0.5">Approved</span>
                </div>
              </div>

              <div className="space-y-1.5 text-[11px] flex-1">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[#5B7564]">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#2E7D32]" />
                    Refund
                  </span>
                  <span className="font-bold text-[#033129]">68 (47.9%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[#5B7564]">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#FFA000]" />
                    Replacement
                  </span>
                  <span className="font-bold text-[#033129]">74 (52.1%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Refunds Overview */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <h4 className="text-xs font-extrabold text-[#033129]">Refunds Overview</h4>
            <div className="flex items-center gap-3 my-2">
              <div className="w-10 h-10 rounded-xl bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32] font-black text-lg">
                ₹
              </div>
              <div>
                <span className="text-[10px] text-[#5B7564] block font-semibold">Transactions</span>
                <span className="text-xl font-black text-[#033129]">68</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#EDF2EE] text-xs">
              <div>
                <span className="text-[10px] text-[#7A9385] block font-semibold">Total Refunded</span>
                <span className="text-base font-black text-[#033129]">₹2,34,312</span>
              </div>
              <div>
                <span className="text-[10px] text-[#7A9385] block font-semibold">Avg. Refund</span>
                <span className="text-sm font-bold text-[#033129]">₹3,446</span>
              </div>
            </div>
          </div>

          {/* 3. Replacements Overview */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <h4 className="text-xs font-extrabold text-[#033129]">Replacements Overview</h4>
            <div className="flex items-center gap-3 my-2">
              <div className="w-10 h-10 rounded-xl bg-[#E3F2FD] flex items-center justify-center text-[#1976D2]">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-[#5B7564] block font-semibold">Transactions</span>
                <span className="text-xl font-black text-[#033129]">74</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#EDF2EE] text-xs">
              <div>
                <span className="text-[10px] text-[#7A9385] block font-semibold">Total Replacements</span>
                <span className="text-base font-black text-[#033129]">₹2,63,939</span>
              </div>
              <div>
                <span className="text-[10px] text-[#7A9385] block font-semibold">Avg. Value</span>
                <span className="text-sm font-bold text-[#033129]">₹3,567</span>
              </div>
            </div>
          </div>

          {/* 4. Processing Trend (Last 7 Days) */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs">
            <h4 className="text-xs font-extrabold text-[#033129] mb-2">Processing Trend (Last 7 Days)</h4>
            <div className="h-24 relative flex items-end justify-between px-2 pt-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60">
                {/* Grid lines */}
                <line x1="0" y1="10" x2="200" y2="10" stroke="#F0F4F1" strokeWidth="1" />
                <line x1="0" y1="30" x2="200" y2="30" stroke="#F0F4F1" strokeWidth="1" />
                <line x1="0" y1="50" x2="200" y2="50" stroke="#F0F4F1" strokeWidth="1" />

                {/* Orange line (Replacements) */}
                <polyline
                  fill="none"
                  stroke="#FFA000"
                  strokeWidth="2.5"
                  points="10,40 40,36 70,32 100,28 130,26 160,22 190,18"
                />
                {/* Yellow dots */}
                {[
                  [10, 40],
                  [40, 36],
                  [70, 32],
                  [100, 28],
                  [130, 26],
                  [160, 22],
                  [190, 18],
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="3" fill="#FFA000" />
                ))}

                {/* Green line (Refunds) */}
                <polyline
                  fill="none"
                  stroke="#2E7D32"
                  strokeWidth="2.5"
                  points="10,50 40,46 70,44 100,42 130,38 160,34 190,30"
                />
                {/* Green dots */}
                {[
                  [10, 50],
                  [40, 46],
                  [70, 44],
                  [100, 42],
                  [130, 38],
                  [160, 34],
                  [190, 30],
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="3" fill="#2E7D32" />
                ))}
              </svg>
            </div>
            <div className="flex justify-between text-[9px] text-[#7A9385] mt-2 px-1">
              <span>Oct 23</span>
              <span>Oct 24</span>
              <span>Oct 25</span>
              <span>Oct 26</span>
              <span>Oct 27</span>
              <span>Oct 28</span>
              <span>Oct 29</span>
            </div>
            <div className="flex items-center justify-center gap-4 mt-2 text-[10px] text-[#5B7564]">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#2E7D32]" /> Refunds
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#FFA000]" /> Replacements
              </span>
            </div>
          </div>
        </div>
      </div>
    </WarehouseManagerShell>
  );
}
