"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Clock,
  Hourglass,
  Users,
  CheckCircle2,
  Download,
  Plus,
  Search,
  Eye,
  Filter,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  UserPlus,
  Edit,
  Check,
} from "lucide-react";
import { WarehouseManagerShell } from "@/components/warehouse/WarehouseManagerShell";

interface ExceptionItem {
  id: string;
  orderId: string;
  type: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  zone: string;
  raisedOn: string;
  slaDue: string;
  status: "In Progress" | "Awaiting Action" | "Overdue";
  notes?: string;
  timeLeft?: string;
}

const EXCEPTION_RECORDS: ExceptionItem[] = [
  {
    id: "EX-20261029-001",
    orderId: "HM-20261024-0834",
    type: "Inventory",
    description: "Stock variance (-12)",
    priority: "High",
    zone: "Aisle A",
    raisedOn: "29 Oct, 10:12 AM",
    slaDue: "29 Oct, 2:12 PM",
    status: "In Progress",
    notes: "Aisle A bin discrepancy detected during morning replenishment.",
    timeLeft: "3h 40m left",
  },
  {
    id: "EX-20261029-002",
    orderId: "HM-20261024-0837",
    type: "Picking",
    description: "Item not found",
    priority: "High",
    zone: "Aisle C",
    raisedOn: "29 Oct, 10:18 AM",
    slaDue: "29 Oct, 1:18 PM",
    status: "Awaiting Action",
    notes: "Target tote empty; stock runner searching reserve racks.",
    timeLeft: "2h 45m left",
  },
  {
    id: "EX-20261029-003",
    orderId: "HM-20261024-0842",
    type: "Packing",
    description: "Wrong item packed",
    priority: "Medium",
    zone: "Aisle B",
    raisedOn: "29 Oct, 10:25 AM",
    slaDue: "29 Oct, 4:25 PM",
    status: "In Progress",
    notes: "Item swapped before seal; re-packing initiated.",
    timeLeft: "5h 50m left",
  },
  {
    id: "EX-20261029-004",
    orderId: "HM-20261024-0846",
    type: "Quality",
    description: "Item failed QC",
    priority: "High",
    zone: "QC Zone",
    raisedOn: "29 Oct 2026, 10:31 AM",
    slaDue: "29 Oct 2026, 1:31 PM",
    status: "In Progress",
    notes: "Surface scratch on body. Needs reinspection or rework.",
    timeLeft: "2h 20m left",
  },
  {
    id: "EX-20261029-005",
    orderId: "HM-20261025-0851",
    type: "Returns",
    description: "Return item damaged",
    priority: "Medium",
    zone: "Returns",
    raisedOn: "29 Oct, 10:37 AM",
    slaDue: "29 Oct, 5:37 PM",
    status: "Awaiting Action",
    notes: "Customer package arrived with transit damage.",
    timeLeft: "7h 00m left",
  },
  {
    id: "EX-20261029-006",
    orderId: "HM-20261025-0856",
    type: "Order",
    description: "Order mismatch (Qty)",
    priority: "High",
    zone: "Aisle D",
    raisedOn: "29 Oct, 10:45 AM",
    slaDue: "29 Oct, 1:45 PM",
    status: "Overdue",
    notes: "Customer ordered 3 units, warehouse picked 2 units.",
    timeLeft: "-15m overdue",
  },
  {
    id: "EX-20261029-007",
    orderId: "HM-20261025-0860",
    type: "Inventory",
    description: "Bin location mismatch",
    priority: "Medium",
    zone: "Aisle E",
    raisedOn: "29 Oct, 10:50 AM",
    slaDue: "29 Oct, 4:50 PM",
    status: "In Progress",
    notes: "SKU stored in B-02 instead of documented A-01.",
    timeLeft: "6h 10m left",
  },
  {
    id: "EX-20261029-008",
    orderId: "HM-20261025-0863",
    type: "Courier",
    description: "Handover delay",
    priority: "Low",
    zone: "Dispatch",
    raisedOn: "29 Oct, 11:02 AM",
    slaDue: "29 Oct, 6:02 PM",
    status: "Awaiting Action",
    notes: "BlueDart van delayed in traffic; staging cage secured.",
    timeLeft: "7h 20m left",
  },
  {
    id: "EX-20261029-009",
    orderId: "HM-20261025-0867",
    type: "Quality",
    description: "Packaging damaged",
    priority: "Medium",
    zone: "QC Zone",
    raisedOn: "29 Oct, 11:06 AM",
    slaDue: "29 Oct, 4:06 PM",
    status: "In Progress",
    notes: "Outer carton seal torn during conveyor transition.",
    timeLeft: "5h 25m left",
  },
  {
    id: "EX-20261029-010",
    orderId: "HM-20261025-0871",
    type: "Picking",
    description: "Short pick (-2)",
    priority: "High",
    zone: "Aisle B",
    raisedOn: "29 Oct, 11:10 AM",
    slaDue: "29 Oct, 2:10 PM",
    status: "Overdue",
    notes: "Picker reported insufficient stock on front pick face.",
    timeLeft: "-30m overdue",
  },
];

export default function OpenExceptionsPage() {
  const [selectedId, setSelectedId] = useState<string>("EX-20261029-004");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");

  const selectedItem = EXCEPTION_RECORDS.find((r) => r.id === selectedId) || EXCEPTION_RECORDS[3];

  return (
    <WarehouseManagerShell
      pageTitle="Open Exceptions"
      pageDescription="View and manage all active exceptions across orders, inventory, picking, packing, quality, and returns."
      currentPath="/warehouse/exceptions/open"
    >
      <div className="space-y-4">
        {/* Breadcrumb & Header Action Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#5B7564] mb-1">
              <Link href="/warehouse/dashboard" className="hover:text-[#087A4A]">Home</Link>
              <span>›</span>
              <Link href="/warehouse/exceptions" className="hover:text-[#087A4A]">Exceptions</Link>
              <span>›</span>
              <span className="text-[#033129] font-bold">Open Exceptions</span>
            </div>
            <h1 className="text-xl font-black text-[#033129] tracking-tight">Open Exceptions</h1>
            <p className="text-xs text-[#5B7564]">
              View and manage all active exceptions across orders, inventory, picking, packing, quality, and returns.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#CBD8D0] text-[#1E3B2F] text-xs font-semibold hover:bg-[#F2F7F4] transition shadow-xs">
              <Download className="w-3.5 h-3.5 text-[#5B7564]" />
              Export
            </button>
            <button className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#087A4A] text-white text-xs font-bold hover:bg-[#06633C] transition shadow-xs">
              <Plus className="w-4 h-4 stroke-[2.5]" />
              Create Exception
            </button>
          </div>
        </div>

        {/* 5 KPI Metric Cards (Page 25 exact) */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {/* Total Open Exceptions */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#FFEBEE] flex items-center justify-center text-[#D32F2F]">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Total Open Exceptions</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">132</div>
              <div className="text-[11px] text-[#2E7D32] font-semibold mt-1">
                ↓ -12.6% vs yesterday
              </div>
            </div>
          </div>

          {/* New (Today) */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#E3F2FD] flex items-center justify-center text-[#1976D2]">
              <Clock className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">New (Today)</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">28</div>
              <div className="text-[11px] text-[#5B7564] font-medium mt-1 opacity-0">.</div>
            </div>
          </div>

          {/* In Progress */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#FFF8E1] flex items-center justify-center text-[#F57F17]">
              <Hourglass className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">In Progress</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">64</div>
              <div className="text-[11px] text-[#5B7564] font-medium mt-1 opacity-0">.</div>
            </div>
          </div>

          {/* Awaiting Action */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#F3E5F5] flex items-center justify-center text-[#7B1FA2]">
              <Users className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Awaiting Action</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">32</div>
              <div className="text-[11px] text-[#5B7564] font-medium mt-1 opacity-0">.</div>
            </div>
          </div>

          {/* Overdue */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Overdue</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">8</div>
              <div className="text-[11px] text-[#D32F2F] font-semibold mt-1">
                ↑ +3 vs yesterday
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
              placeholder="Search by Exception ID, Order ID, SKU, or Description..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-[#D5E0D8] text-xs focus:outline-none focus:border-[#087A4A] bg-[#FAFCFA]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-[#D5E0D8] bg-white text-[#2B4738] font-medium focus:outline-none"
            >
              <option value="All">All Exception Types</option>
              <option value="Inventory">Inventory</option>
              <option value="Picking">Picking</option>
              <option value="Packing">Packing</option>
              <option value="Quality">Quality</option>
              <option value="Returns">Returns</option>
              <option value="Order">Order</option>
              <option value="Courier">Courier</option>
            </select>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-[#D5E0D8] bg-white text-[#2B4738] font-medium focus:outline-none"
            >
              <option value="All">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <select className="px-3 py-1.5 rounded-xl border border-[#D5E0D8] bg-white text-[#2B4738] font-medium focus:outline-none">
              <option>All Zones</option>
              <option>Aisle A</option>
              <option>Aisle B</option>
              <option>Aisle C</option>
              <option>QC Zone</option>
              <option>Returns</option>
            </select>

            <select className="px-3 py-1.5 rounded-xl border border-[#D5E0D8] bg-white text-[#2B4738] font-medium focus:outline-none">
              <option>All Statuses</option>
              <option>In Progress</option>
              <option>Awaiting Action</option>
              <option>Overdue</option>
            </select>

            <select className="px-3 py-1.5 rounded-xl border border-[#D5E0D8] bg-white text-[#2B4738] font-medium focus:outline-none">
              <option>Today</option>
              <option>Yesterday</option>
              <option>Last 7 Days</option>
            </select>
          </div>
        </div>

        {/* Main Content: Table + Side Inspector (Matches Page 25 1:1) */}
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
                    <th className="py-2.5 px-3">Exception ID</th>
                    <th className="py-2.5 px-3">Order ID</th>
                    <th className="py-2.5 px-3">Type</th>
                    <th className="py-2.5 px-3">Description</th>
                    <th className="py-2.5 px-3">Priority</th>
                    <th className="py-2.5 px-3">Zone</th>
                    <th className="py-2.5 px-3">Raised On</th>
                    <th className="py-2.5 px-3">SLA Due</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDF2EE] text-[#1E3B2F]">
                  {EXCEPTION_RECORDS.map((row) => {
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
                        <td className="py-2.5 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              row.type === "Inventory"
                                ? "bg-[#E3F2FD] text-[#1976D2]"
                                : row.type === "Picking"
                                ? "bg-[#EDE7F6] text-[#5E35B1]"
                                : row.type === "Packing"
                                ? "bg-[#FFF8E1] text-[#F57F17]"
                                : row.type === "Quality"
                                ? "bg-[#E8F5E9] text-[#2E7D32]"
                                : row.type === "Returns"
                                ? "bg-[#FCE4EC] text-[#C2185B]"
                                : row.type === "Order"
                                ? "bg-[#E0F7FA] text-[#00838F]"
                                : "bg-[#EDE7F6] text-[#4527A0]"
                            }`}
                          >
                            {row.type}
                          </span>
                        </td>
                        <td className="py-2.5 px-3">{row.description}</td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              row.priority === "High"
                                ? "bg-[#FFEBEE] text-[#D32F2F]"
                                : row.priority === "Medium"
                                ? "bg-[#FFF8E1] text-[#F57F17]"
                                : "bg-[#E8F5E9] text-[#2E7D32]"
                            }`}
                          >
                            {row.priority}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-[#5B7564]">{row.zone}</td>
                        <td className="py-2.5 px-3 text-[#7A9385]">{row.raisedOn}</td>
                        <td className="py-2.5 px-3 text-[#7A9385]">{row.slaDue}</td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              row.status === "In Progress"
                                ? "bg-[#E1F5FE] text-[#0288D1]"
                                : row.status === "Awaiting Action"
                                ? "bg-[#FFF8E1] text-[#F57F17]"
                                : "bg-[#FFEBEE] text-[#D32F2F]"
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
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
              <div>Showing 1 – 10 of 132 exceptions</div>
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
                <button className="w-7 h-7 rounded-lg border border-[#D5E0D8] bg-white flex items-center justify-center hover:bg-[#F2F7F4]">14</button>
                <button className="w-7 h-7 rounded-lg border border-[#D5E0D8] bg-white flex items-center justify-center hover:bg-[#F2F7F4]">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Selected Exception Details Inspector (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-[#EDF2EE]">
                <div>
                  <h3 className="font-extrabold text-[#033129] text-sm">Exception Details</h3>
                  <div className="text-base font-black text-[#033129] mt-0.5">{selectedItem.id}</div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#E1F5FE] text-[#0288D1] border border-[#B3E5FC]">
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
                  <span className="text-[#5B7564]">Type</span>
                  <span className="font-semibold text-[#1E3B2F]">{selectedItem.type}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">Description</span>
                  <span className="font-semibold text-[#033129]">{selectedItem.description}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">Priority</span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#FFEBEE] text-[#D32F2F]">
                    {selectedItem.priority}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">Zone</span>
                  <span className="font-medium text-[#1E3B2F]">{selectedItem.zone}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">Raised On</span>
                  <span className="font-medium text-[#1E3B2F]">{selectedItem.raisedOn}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">SLA Due By</span>
                  <span className="font-medium text-[#2E7D32]">
                    {selectedItem.slaDue}{" "}
                    <span className="font-bold">({selectedItem.timeLeft})</span>
                  </span>
                </div>
              </div>

              {/* Notes */}
              <div>
                <span className="text-[11px] font-bold text-[#5B7564] block mb-1">Notes</span>
                <div className="p-3 rounded-xl bg-[#FAFCFA] border border-[#E1E8E3] text-xs text-[#1E3B2F] leading-relaxed">
                  {selectedItem.notes || "No notes provided."}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-3 border-t border-[#EDF2EE]">
              <div className="text-[11px] font-bold text-[#5B7564]">Actions</div>
              <div className="grid grid-cols-2 gap-2">
                <button className="py-2 px-3 rounded-xl bg-white border border-[#CBD8D0] text-[#1E3B2F] text-xs font-semibold hover:bg-[#F2F7F4] transition flex items-center justify-center gap-1.5">
                  <UserPlus className="w-3.5 h-3.5 text-[#5B7564]" />
                  Assign
                </button>
                <button className="py-2 px-3 rounded-xl bg-white border border-[#CBD8D0] text-[#1E3B2F] text-xs font-semibold hover:bg-[#F2F7F4] transition flex items-center justify-center gap-1.5">
                  <Edit className="w-3.5 h-3.5 text-[#5B7564]" />
                  Update Status
                </button>
              </div>
              <button className="w-full py-2 px-3 rounded-xl bg-[#087A4A] text-white text-xs font-bold hover:bg-[#06633C] transition flex items-center justify-center gap-1.5 shadow-xs">
                <Check className="w-4 h-4 stroke-[2.5]" />
                Close Exception
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Row Analytics: 4 Cards (Matches Page 25 1:1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Exceptions by Type Donut */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs">
            <h4 className="text-xs font-extrabold text-[#033129] mb-3">Exceptions by Type</h4>
            <div className="flex items-center gap-3">
              <div className="relative w-24 h-24 flex-shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  {/* Inventory 21.2% (blue) */}
                  <path className="text-[#1976D2]" strokeDasharray="21.2, 100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Picking 18.2% (purple) */}
                  <path className="text-[#7B1FA2]" strokeDasharray="18.2, 100" strokeDashoffset="-21.2" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Packing 13.6% (yellow) */}
                  <path className="text-[#FBC02D]" strokeDasharray="13.6, 100" strokeDashoffset="-39.4" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Quality 15.2% (green) */}
                  <path className="text-[#2E7D32]" strokeDasharray="15.2, 100" strokeDashoffset="-53.0" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Returns 12.1% (pink) */}
                  <path className="text-[#E91E63]" strokeDasharray="12.1, 100" strokeDashoffset="-68.2" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Order 7.6% (sky blue) */}
                  <path className="text-[#00BCD4]" strokeDasharray="7.6, 100" strokeDashoffset="-80.3" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Courier 6.1% (indigo) */}
                  <path className="text-[#3F51B5]" strokeDasharray="6.1, 100" strokeDashoffset="-87.9" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Other 6.1% (gray) */}
                  <path className="text-[#9E9E9E]" strokeDasharray="6.1, 100" strokeDashoffset="-94.0" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-sm font-black text-[#033129] leading-none">132</span>
                  <span className="text-[9px] text-[#5B7564] font-semibold mt-0.5">Open</span>
                </div>
              </div>

              <div className="space-y-1 text-[10px] flex-1">
                <div className="flex justify-between"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#1976D2]" />Inventory</span><span className="font-bold text-[#033129]">28 (21.2%)</span></div>
                <div className="flex justify-between"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#7B1FA2]" />Picking</span><span className="font-bold text-[#033129]">24 (18.2%)</span></div>
                <div className="flex justify-between"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#FBC02D]" />Packing</span><span className="font-bold text-[#033129]">18 (13.6%)</span></div>
                <div className="flex justify-between"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#2E7D32]" />Quality</span><span className="font-bold text-[#033129]">20 (15.2%)</span></div>
                <div className="flex justify-between"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#E91E63]" />Returns</span><span className="font-bold text-[#033129]">16 (12.1%)</span></div>
                <div className="flex justify-between"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#00BCD4]" />Order</span><span className="font-bold text-[#033129]">10 (7.6%)</span></div>
                <div className="flex justify-between"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#3F51B5]" />Courier</span><span className="font-bold text-[#033129]">8 (6.1%)</span></div>
                <div className="flex justify-between"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#9E9E9E]" />Other</span><span className="font-bold text-[#033129]">8 (6.1%)</span></div>
              </div>
            </div>
          </div>

          {/* 2. Priority Distribution Donut */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <h4 className="text-xs font-extrabold text-[#033129]">Priority Distribution</h4>
            <div className="flex items-center gap-3 my-auto py-2">
              <div className="relative w-24 h-24 flex-shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  {/* High 39.4% (red) */}
                  <path className="text-[#D32F2F]" strokeDasharray="39.4, 100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Medium 36.4% (yellow) */}
                  <path className="text-[#FFA000]" strokeDasharray="36.4, 100" strokeDashoffset="-39.4" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Low 24.2% (green) */}
                  <path className="text-[#2E7D32]" strokeDasharray="24.2, 100" strokeDashoffset="-75.8" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-sm font-black text-[#033129] leading-none">132</span>
                  <span className="text-[9px] text-[#5B7564] font-semibold mt-0.5">Exceptions</span>
                </div>
              </div>

              <div className="space-y-2 text-xs flex-1">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[#5B7564]">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#D32F2F]" /> High
                  </span>
                  <span className="font-bold text-[#033129]">52 (39.4%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[#5B7564]">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#FFA000]" /> Medium
                  </span>
                  <span className="font-bold text-[#033129]">48 (36.4%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[#5B7564]">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#2E7D32]" /> Low
                  </span>
                  <span className="font-bold text-[#033129]">32 (24.2%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Resolution SLA Compliance */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <h4 className="text-xs font-extrabold text-[#033129]">Resolution SLA Compliance</h4>
            <div className="flex items-center justify-center my-auto py-2">
              <div className="relative w-24 h-24">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path className="text-[#2E7D32]" strokeDasharray="93.9, 100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-[#D32F2F]" strokeDasharray="6.1, 100" strokeDashoffset="-93.9" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-sm font-black text-[#033129] leading-none">93.9%</span>
                  <span className="text-[9px] text-[#5B7564] font-semibold mt-0.5">On Time</span>
                </div>
              </div>
            </div>

            <div className="space-y-1 text-xs pt-2 border-t border-[#EDF2EE]">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#5B7564]">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#2E7D32]" /> On Time
                </span>
                <span className="font-bold text-[#033129]">124 (93.9%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#5B7564]">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#D32F2F]" /> Overdue
                </span>
                <span className="font-bold text-[#D32F2F]">8 (6.1%)</span>
              </div>
            </div>
          </div>

          {/* 4. Exception Trend (Last 7 Days) */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <h4 className="text-xs font-extrabold text-[#033129]">Exception Trend (Last 7 Days)</h4>
            <div className="h-24 relative mt-2 flex items-end justify-between px-1">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60">
                <line x1="0" y1="10" x2="200" y2="10" stroke="#F0F4F1" strokeWidth="1" />
                <line x1="0" y1="30" x2="200" y2="30" stroke="#F0F4F1" strokeWidth="1" />
                <line x1="0" y1="50" x2="200" y2="50" stroke="#F0F4F1" strokeWidth="1" />

                {/* Green area */}
                <polygon
                  fill="#E8F5E9"
                  fillOpacity="0.7"
                  points="10,60 10,48 40,42 70,38 100,32 130,28 160,26 190,22 190,60"
                />
                <polyline
                  fill="none"
                  stroke="#2E7D32"
                  strokeWidth="2.5"
                  points="10,48 40,42 70,38 100,32 130,28 160,26 190,22"
                />
                {[
                  [10, 48], [40, 42], [70, 38], [100, 32], [130, 28], [160, 26], [190, 22]
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="3" fill="#2E7D32" />
                ))}
              </svg>
            </div>
            <div className="flex justify-between text-[9px] text-[#7A9385] mt-1 px-1">
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
      </div>
    </WarehouseManagerShell>
  );
}
