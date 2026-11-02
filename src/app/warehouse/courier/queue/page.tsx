"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Truck,
  Package,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Download,
  Plus,
  Search,
  Eye,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Scale,
  Box,
  Check,
  Edit,
} from "lucide-react";
import { WarehouseManagerShell } from "@/components/warehouse/WarehouseManagerShell";

interface HandoverItem {
  id: string;
  orderCount: number;
  packages: number;
  courier: string;
  awb: string;
  handoverTime: string;
  slaPickup: string;
  status: "Ready" | "Assigned" | "Pending Pickup" | "Picked Up" | "Overdue";
  weight: string;
  volume: string;
  timeLeft: string;
}

const HANDOVER_RECORDS: HandoverItem[] = [
  {
    id: "HO-20261029-001",
    orderCount: 68,
    packages: 74,
    courier: "BlueDart",
    awb: "BD7845632101",
    handoverTime: "29 Oct, 10:05 AM",
    slaPickup: "29 Oct, 12:05 PM",
    status: "Ready",
    weight: "245.0 kg",
    volume: "1.45 m³",
    timeLeft: "1h 50m left",
  },
  {
    id: "HO-20261029-002",
    orderCount: 52,
    packages: 56,
    courier: "Delhivery",
    awb: "DLV5587132940",
    handoverTime: "29 Oct, 10:18 AM",
    slaPickup: "29 Oct, 12:18 PM",
    status: "Assigned",
    weight: "188.5 kg",
    volume: "1.12 m³",
    timeLeft: "1h 35m left",
  },
  {
    id: "HO-20261029-003",
    orderCount: 83,
    packages: 90,
    courier: "Ekart",
    awb: "EK6523098471",
    handoverTime: "29 Oct 2026, 10:27 AM",
    slaPickup: "29 Oct 2026, 12:27 PM",
    status: "Pending Pickup",
    weight: "312.5 kg",
    volume: "1.84 m³",
    timeLeft: "1h 2m left",
  },
  {
    id: "HO-20261029-004",
    orderCount: 41,
    packages: 45,
    courier: "BlueDart",
    awb: "BD7845632102",
    handoverTime: "29 Oct, 10:41 AM",
    slaPickup: "29 Oct, 12:41 PM",
    status: "Assigned",
    weight: "155.0 kg",
    volume: "0.95 m³",
    timeLeft: "1h 10m left",
  },
  {
    id: "HO-20261029-005",
    orderCount: 76,
    packages: 81,
    courier: "Shadowfax",
    awb: "SF4478216693",
    handoverTime: "29 Oct, 10:56 AM",
    slaPickup: "29 Oct, 12:56 PM",
    status: "Ready",
    weight: "270.0 kg",
    volume: "1.60 m³",
    timeLeft: "1h 55m left",
  },
  {
    id: "HO-20261029-006",
    orderCount: 59,
    packages: 65,
    courier: "Delhivery",
    awb: "DLV5587132941",
    handoverTime: "29 Oct, 11:12 AM",
    slaPickup: "29 Oct, 01:12 PM",
    status: "Picked Up",
    weight: "215.0 kg",
    volume: "1.25 m³",
    timeLeft: "Completed",
  },
  {
    id: "HO-20261029-007",
    orderCount: 37,
    packages: 39,
    courier: "Ekart",
    awb: "EK6523098472",
    handoverTime: "29 Oct, 11:18 AM",
    slaPickup: "29 Oct, 01:18 PM",
    status: "Assigned",
    weight: "135.0 kg",
    volume: "0.80 m³",
    timeLeft: "1h 45m left",
  },
  {
    id: "HO-20261029-008",
    orderCount: 66,
    packages: 71,
    courier: "BlueDart",
    awb: "BD7845632103",
    handoverTime: "29 Oct, 11:27 AM",
    slaPickup: "29 Oct, 01:27 PM",
    status: "Pending Pickup",
    weight: "240.0 kg",
    volume: "1.40 m³",
    timeLeft: "1h 55m left",
  },
  {
    id: "HO-20261029-009",
    orderCount: 48,
    packages: 52,
    courier: "Shadowfax",
    awb: "SF4478216694",
    handoverTime: "29 Oct, 11:40 AM",
    slaPickup: "29 Oct, 01:40 PM",
    status: "Ready",
    weight: "175.0 kg",
    volume: "1.05 m³",
    timeLeft: "2h 10m left",
  },
  {
    id: "HO-20261029-010",
    orderCount: 55,
    packages: 60,
    courier: "Delhivery",
    awb: "DLV5587132942",
    handoverTime: "29 Oct, 11:52 AM",
    slaPickup: "29 Oct, 01:52 PM",
    status: "Overdue",
    weight: "205.0 kg",
    volume: "1.20 m³",
    timeLeft: "-15m overdue",
  },
];

export default function HandoverQueuePage() {
  const [selectedId, setSelectedId] = useState<string>("HO-20261029-003");
  const [searchQuery, setSearchQuery] = useState("");
  const selectedItem = HANDOVER_RECORDS.find((r) => r.id === selectedId) || HANDOVER_RECORDS[2];

  return (
    <WarehouseManagerShell
      pageTitle="Handover Queue"
      pageDescription="Manage ready shipments for courier handover, assign to couriers, and track pickup status."
      currentPath="/warehouse/courier/queue"
    >
      <div className="space-y-4">
        {/* Breadcrumb & Header Action Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#5B7564] mb-1">
              <Link href="/warehouse/dashboard" className="hover:text-[#087A4A]">Home</Link>
              <span>›</span>
              <Link href="/warehouse/courier" className="hover:text-[#087A4A]">Courier Handover</Link>
              <span>›</span>
              <span className="text-[#033129] font-bold">Handover Queue</span>
            </div>
            <h1 className="text-xl font-black text-[#033129] tracking-tight">Handover Queue</h1>
            <p className="text-xs text-[#5B7564]">
              Manage ready shipments for courier handover, assign to couriers, and track pickup status.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#CBD8D0] text-[#1E3B2F] text-xs font-semibold hover:bg-[#F2F7F4] transition shadow-xs">
              <Download className="w-3.5 h-3.5 text-[#5B7564]" />
              Export
            </button>
            <button className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#087A4A] text-white text-xs font-bold hover:bg-[#06633C] transition shadow-xs">
              <Plus className="w-4 h-4 stroke-[2.5]" />
              Create Handover
            </button>
          </div>
        </div>

        {/* 5 KPI Metric Cards (Page 27 exact) */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {/* Ready for Handover */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32]">
              <Package className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Ready for Handover</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">528</div>
              <div className="text-[11px] text-[#2E7D32] font-semibold mt-1">
                ↑ +12.8% vs yesterday
              </div>
            </div>
          </div>

          {/* Assigned to Courier */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#E3F2FD] flex items-center justify-center text-[#1976D2]">
              <Truck className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Assigned to Courier</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">412</div>
              <div className="text-[11px] text-[#5B7564] font-medium mt-1">
                (78.0%)
              </div>
            </div>
          </div>

          {/* Pending Pickup */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#FFF8E1] flex items-center justify-center text-[#F57F17]">
              <Clock className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Pending Pickup</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">96</div>
              <div className="text-[11px] text-[#5B7564] font-medium mt-1">
                (18.2%)
              </div>
            </div>
          </div>

          {/* Picked Up (Today) */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#F3E5F5] flex items-center justify-center text-[#7B1FA2]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Picked Up (Today)</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">384</div>
              <div className="text-[11px] text-[#2E7D32] font-semibold mt-1">
                ↑ +10.3%
              </div>
            </div>
          </div>

          {/* Overdue */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#FFEBEE] flex items-center justify-center text-[#D32F2F]">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Overdue</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">12</div>
              <div className="text-[11px] text-[#D32F2F] font-semibold mt-1">
                (2.3%)
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
              placeholder="Search by Order ID, Handover ID, AWB, or Courier..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-[#D5E0D8] text-xs focus:outline-none focus:border-[#087A4A] bg-[#FAFCFA]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select className="px-3 py-1.5 rounded-xl border border-[#D5E0D8] bg-white text-[#2B4738] font-medium focus:outline-none">
              <option>All Couriers</option>
              <option>BlueDart</option>
              <option>Delhivery</option>
              <option>Ekart</option>
              <option>Shadowfax</option>
            </select>

            <select className="px-3 py-1.5 rounded-xl border border-[#D5E0D8] bg-white text-[#2B4738] font-medium focus:outline-none">
              <option>All States</option>
              <option>Tamil Nadu</option>
              <option>Kerala</option>
              <option>Karnataka</option>
            </select>

            <select className="px-3 py-1.5 rounded-xl border border-[#D5E0D8] bg-white text-[#2B4738] font-medium focus:outline-none">
              <option>All Statuses</option>
              <option>Ready</option>
              <option>Assigned</option>
              <option>Pending Pickup</option>
              <option>Picked Up</option>
              <option>Overdue</option>
            </select>

            <select className="px-3 py-1.5 rounded-xl border border-[#D5E0D8] bg-white text-[#2B4738] font-medium focus:outline-none">
              <option>Today</option>
              <option>Yesterday</option>
              <option>Last 7 Days</option>
            </select>

            <button className="p-2 rounded-xl border border-[#CBD8D0] bg-white text-[#5B7564] hover:bg-[#F2F7F4]">
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Main Content: Table + Side Inspector (Matches Page 27 1:1) */}
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
                    <th className="py-2.5 px-3">Handover ID</th>
                    <th className="py-2.5 px-3">Order Count</th>
                    <th className="py-2.5 px-3">Packages</th>
                    <th className="py-2.5 px-3">Courier</th>
                    <th className="py-2.5 px-3">AWB / Manifest</th>
                    <th className="py-2.5 px-3">Handover Time</th>
                    <th className="py-2.5 px-3">SLA Pickup</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDF2EE] text-[#1E3B2F]">
                  {HANDOVER_RECORDS.map((row) => {
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
                        <td className="py-2.5 px-3">{row.orderCount}</td>
                        <td className="py-2.5 px-3 font-semibold">{row.packages}</td>
                        <td className="py-2.5 px-3 font-medium text-[#1976D2]">{row.courier}</td>
                        <td className="py-2.5 px-3 text-[#5B7564] font-mono text-[11px]">{row.awb}</td>
                        <td className="py-2.5 px-3 text-[#7A9385]">{row.handoverTime}</td>
                        <td className="py-2.5 px-3 text-[#7A9385]">{row.slaPickup}</td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              row.status === "Ready"
                                ? "bg-[#E8F5E9] text-[#2E7D32]"
                                : row.status === "Assigned"
                                ? "bg-[#E3F2FD] text-[#1976D2]"
                                : row.status === "Pending Pickup"
                                ? "bg-[#FFF8E1] text-[#F57F17]"
                                : row.status === "Picked Up"
                                ? "bg-[#E8F5E9] text-[#2E7D32]"
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
              <div>Showing 1 – 10 of 528 handovers</div>
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
                <button className="w-7 h-7 rounded-lg border border-[#D5E0D8] bg-white flex items-center justify-center hover:bg-[#F2F7F4]">53</button>
                <button className="w-7 h-7 rounded-lg border border-[#D5E0D8] bg-white flex items-center justify-center hover:bg-[#F2F7F4]">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Selected Handover Details Inspector (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-[#EDF2EE]">
                <div>
                  <h3 className="font-extrabold text-[#033129] text-sm">Handover Details</h3>
                  <div className="text-base font-black text-[#033129] mt-0.5">{selectedItem.id}</div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#FFF8E1] text-[#F57F17] border border-[#FFE082]">
                  {selectedItem.status}
                </span>
              </div>

              {/* Key Specs */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">Courier</span>
                  <span className="font-semibold text-[#033129]">{selectedItem.courier}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">AWB / Manifest</span>
                  <span className="font-mono text-[#033129]">{selectedItem.awb}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">Order Count</span>
                  <span className="font-black text-[#033129]">{selectedItem.orderCount}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">Package Count</span>
                  <span className="font-black text-[#033129]">{selectedItem.packages}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">Handover Time</span>
                  <span className="font-medium text-[#1E3B2F]">{selectedItem.handoverTime}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">SLA Pickup By</span>
                  <span className="font-medium text-[#2E7D32]">
                    {selectedItem.slaPickup}{" "}
                    <span className="font-bold">({selectedItem.timeLeft})</span>
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">Status</span>
                  <span className="font-bold text-[#F57F17]">{selectedItem.status}</span>
                </div>
              </div>

              {/* Packages Summary widget */}
              <div>
                <span className="text-[11px] font-bold text-[#5B7564] block mb-2">Packages Summary</span>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-xl bg-[#FAFCFA] border border-[#E1E8E3] text-center">
                    <Package className="w-4 h-4 text-[#2E7D32] mx-auto mb-1" />
                    <span className="text-sm font-black text-[#033129] block leading-none">{selectedItem.packages}</span>
                    <span className="text-[9px] text-[#7A9385] font-semibold mt-0.5 block">Packages</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FAFCFA] border border-[#E1E8E3] text-center">
                    <Scale className="w-4 h-4 text-[#1976D2] mx-auto mb-1" />
                    <span className="text-sm font-black text-[#033129] block leading-none">{selectedItem.weight}</span>
                    <span className="text-[9px] text-[#7A9385] font-semibold mt-0.5 block">Total Weight</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FAFCFA] border border-[#E1E8E3] text-center">
                    <Box className="w-4 h-4 text-[#7B1FA2] mx-auto mb-1" />
                    <span className="text-sm font-black text-[#033129] block leading-none">{selectedItem.volume}</span>
                    <span className="text-[9px] text-[#7A9385] font-semibold mt-0.5 block">Total Volume</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-3 border-t border-[#EDF2EE]">
              <div className="text-[11px] font-bold text-[#5B7564]">Actions</div>
              <button className="w-full py-2 px-3 rounded-xl bg-white border border-[#CBD8D0] text-[#1E3B2F] text-xs font-semibold hover:bg-[#F2F7F4] transition flex items-center justify-center gap-1.5">
                <Edit className="w-3.5 h-3.5 text-[#5B7564]" />
                Update Status
              </button>
              <button className="w-full py-2 px-3 rounded-xl bg-[#087A4A] text-white text-xs font-bold hover:bg-[#06633C] transition flex items-center justify-center gap-1.5 shadow-xs">
                <Check className="w-4 h-4 stroke-[2.5]" />
                Mark as Picked Up
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Row Analytics: 4 Cards (Matches Page 27 1:1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Handover Status Distribution */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs">
            <h4 className="text-xs font-extrabold text-[#033129] mb-3">Handover Status Distribution</h4>
            <div className="flex items-center gap-3">
              <div className="relative w-24 h-24 flex-shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  {/* Picked Up (green) */}
                  <path className="text-[#2E7D32]" strokeDasharray="72.7, 100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Pending Pickup (yellow) */}
                  <path className="text-[#FFA000]" strokeDasharray="18.2, 100" strokeDashoffset="-72.7" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Overdue (red) */}
                  <path className="text-[#D32F2F]" strokeDasharray="2.3, 100" strokeDashoffset="-90.9" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-sm font-black text-[#033129] leading-none">528</span>
                  <span className="text-[9px] text-[#5B7564] font-semibold mt-0.5">Handovers</span>
                </div>
              </div>

              <div className="space-y-1 text-[10px] flex-1">
                <div className="flex justify-between"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#2E7D32]" />Picked Up</span><span className="font-bold text-[#033129]">384 (72.7%)</span></div>
                <div className="flex justify-between"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#1976D2]" />Assigned</span><span className="font-bold text-[#033129]">412 (78.0%)</span></div>
                <div className="flex justify-between"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#FFA000]" />Pending Pickup</span><span className="font-bold text-[#033129]">96 (18.2%)</span></div>
                <div className="flex justify-between"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#81C784]" />Ready</span><span className="font-bold text-[#033129]">528 (100.0%)</span></div>
                <div className="flex justify-between"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#D32F2F]" />Overdue</span><span className="font-bold text-[#D32F2F]">12 (2.3%)</span></div>
              </div>
            </div>
          </div>

          {/* 2. Courier-wise Handovers */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs">
            <h4 className="text-xs font-extrabold text-[#033129] mb-3">Courier-wise Handovers</h4>
            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">BlueDart</span>
                  <span className="font-bold text-[#033129]">128 (24.2%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#1B5E20]" style={{ width: "24.2%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Delhivery</span>
                  <span className="font-bold text-[#033129]">116 (22.0%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#2E7D32]" style={{ width: "22%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Ekart</span>
                  <span className="font-bold text-[#033129]">104 (19.7%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#4CAF50]" style={{ width: "19.7%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Shadowfax</span>
                  <span className="font-bold text-[#033129]">96 (18.2%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#81C784]" style={{ width: "18.2%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Others</span>
                  <span className="font-bold text-[#033129]">80 (15.2%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#C8E6C9]" style={{ width: "15.2%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* 3. SLA Pickup Compliance */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <h4 className="text-xs font-extrabold text-[#033129]">SLA Pickup Compliance</h4>
            <div className="flex items-center justify-center my-auto py-2">
              <div className="relative w-24 h-24">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path className="text-[#2E7D32]" strokeDasharray="97.7, 100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-[#D32F2F]" strokeDasharray="2.3, 100" strokeDashoffset="-97.7" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-sm font-black text-[#033129] leading-none">97.7%</span>
                  <span className="text-[9px] text-[#5B7564] font-semibold mt-0.5">On Time</span>
                </div>
              </div>
            </div>

            <div className="space-y-1 text-xs pt-2 border-t border-[#EDF2EE]">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#5B7564]">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#2E7D32]" /> On Time
                </span>
                <span className="font-bold text-[#033129]">516 (97.7%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#5B7564]">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#D32F2F]" /> Breached
                </span>
                <span className="font-bold text-[#D32F2F]">12 (2.3%)</span>
              </div>
            </div>
          </div>

          {/* 4. Handover Trend (Last 7 Days) */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <h4 className="text-xs font-extrabold text-[#033129]">Handover Trend (Last 7 Days)</h4>
            <div className="h-24 relative mt-2 flex items-end justify-between px-1">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60">
                <line x1="0" y1="10" x2="200" y2="10" stroke="#F0F4F1" strokeWidth="1" />
                <line x1="0" y1="30" x2="200" y2="30" stroke="#F0F4F1" strokeWidth="1" />
                <line x1="0" y1="50" x2="200" y2="50" stroke="#F0F4F1" strokeWidth="1" />

                {/* Light green area */}
                <polygon
                  fill="#E8F5E9"
                  fillOpacity="0.7"
                  points="10,60 10,48 40,44 70,40 100,36 130,30 160,26 190,20 190,60"
                />
                <polyline
                  fill="none"
                  stroke="#2E7D32"
                  strokeWidth="2.5"
                  points="10,48 40,44 70,40 100,36 130,30 160,26 190,20"
                />
                {[
                  [10, 48], [40, 44], [70, 40], [100, 36], [130, 30], [160, 26], [190, 20]
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
