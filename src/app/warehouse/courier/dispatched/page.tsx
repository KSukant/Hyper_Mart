"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Truck,
  Package,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Download,
  RefreshCw,
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Copy,
  ChevronDown,
} from "lucide-react";
import { WarehouseManagerShell } from "@/components/warehouse/WarehouseManagerShell";

interface DispatchItem {
  id: string;
  orderId: string;
  awb: string;
  courier: string;
  packages: number;
  dispatchedOn: string;
  eta: string;
  status: "In Transit" | "Out for Delivery" | "Delivered";
  location?: string;
  transitStatus?: string;
}

const DISPATCH_RECORDS: DispatchItem[] = [
  {
    id: "DS-20261029-001",
    orderId: "HM-20261028-0834",
    awb: "BD7845632101",
    courier: "BlueDart",
    packages: 74,
    dispatchedOn: "29 Oct, 10:05 AM",
    eta: "29 Oct, 06:00 PM",
    status: "In Transit",
    location: "Bengaluru Sort Hub",
    transitStatus: "In Transit (Hub Departed)",
  },
  {
    id: "DS-20261029-002",
    orderId: "HM-20261028-0837",
    awb: "DLV5587132940",
    courier: "Delhivery",
    packages: 56,
    dispatchedOn: "29 Oct, 10:18 AM",
    eta: "29 Oct, 05:30 PM",
    status: "Out for Delivery",
    location: "Kochi Delivery Center",
    transitStatus: "Out for Delivery (Courier Assigned)",
  },
  {
    id: "DS-20261029-003",
    orderId: "HM-20261028-0842",
    awb: "EK6523098471",
    courier: "Ekart",
    packages: 90,
    dispatchedOn: "29 Oct 2026, 10:27 AM",
    eta: "29 Oct 2026, 07:00 PM",
    status: "In Transit",
    location: "Chennai Sort Center",
    transitStatus: "In Transit (Line Haul)",
  },
  {
    id: "DS-20261029-004",
    orderId: "HM-20261028-0846",
    awb: "BD7845632102",
    courier: "BlueDart",
    packages: 45,
    dispatchedOn: "29 Oct, 10:41 AM",
    eta: "29 Oct, 06:30 PM",
    status: "Delivered",
    location: "Customer Doorstep",
    transitStatus: "Delivered (OTP Verified)",
  },
  {
    id: "DS-20261029-005",
    orderId: "HM-20261028-0851",
    awb: "SF4478216693",
    courier: "Shadowfax",
    packages: 81,
    dispatchedOn: "29 Oct, 10:56 AM",
    eta: "29 Oct, 07:30 PM",
    status: "In Transit",
    location: "Coimbatore Hub",
    transitStatus: "In Transit (Line Haul)",
  },
  {
    id: "DS-20261029-006",
    orderId: "HM-20261028-0856",
    awb: "DLV5587132941",
    courier: "Delhivery",
    packages: 65,
    dispatchedOn: "29 Oct, 11:12 AM",
    eta: "29 Oct, 06:45 PM",
    status: "Out for Delivery",
    location: "Madurai North Hub",
    transitStatus: "Out for Delivery (Rider Dispatched)",
  },
  {
    id: "DS-20261029-007",
    orderId: "HM-20261028-0861",
    awb: "EK6523098472",
    courier: "Ekart",
    packages: 39,
    dispatchedOn: "29 Oct, 11:18 AM",
    eta: "29 Oct, 05:45 PM",
    status: "Delivered",
    location: "Customer Doorstep",
    transitStatus: "Delivered (Signed)",
  },
  {
    id: "DS-20261029-008",
    orderId: "HM-20261028-0863",
    awb: "BD7845632103",
    courier: "BlueDart",
    packages: 71,
    dispatchedOn: "29 Oct, 11:27 AM",
    eta: "29 Oct, 07:15 PM",
    status: "In Transit",
    location: "Salem Hub",
    transitStatus: "In Transit (Line Haul)",
  },
  {
    id: "DS-20261029-009",
    orderId: "HM-20261028-0867",
    awb: "SF4478216694",
    courier: "Shadowfax",
    packages: 52,
    dispatchedOn: "29 Oct, 11:40 AM",
    eta: "29 Oct, 06:20 PM",
    status: "Out for Delivery",
    location: "Trichy Branch",
    transitStatus: "Out for Delivery",
  },
  {
    id: "DS-20261029-010",
    orderId: "HM-20261028-0871",
    awb: "DLV5587132942",
    courier: "Delhivery",
    packages: 60,
    dispatchedOn: "29 Oct, 11:52 AM",
    eta: "29 Oct, 07:10 PM",
    status: "In Transit",
    location: "Trivandrum DC",
    transitStatus: "In Transit (Line Haul)",
  },
];

export default function DispatchedOrdersPage() {
  const [selectedId, setSelectedId] = useState<string>("DS-20261029-003");
  const [searchQuery, setSearchQuery] = useState("");
  const selectedItem = DISPATCH_RECORDS.find((r) => r.id === selectedId) || DISPATCH_RECORDS[2];

  return (
    <WarehouseManagerShell
      pageTitle="Dispatched Orders"
      pageDescription="Track all orders handed over to couriers, monitor dispatch status, transit progress, and delivery updates."
      currentPath="/warehouse/courier/dispatched"
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
              <span className="text-[#033129] font-bold">Dispatched Orders</span>
            </div>
            <h1 className="text-xl font-black text-[#033129] tracking-tight">Dispatched Orders</h1>
            <p className="text-xs text-[#5B7564]">
              Track all orders handed over to couriers, monitor dispatch status, transit progress, and delivery updates.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#CBD8D0] text-[#1E3B2F] text-xs font-semibold shadow-xs">
              <Calendar className="w-3.5 h-3.5 text-[#5B7564]" />
              <span>Oct 23, 2026 – Oct 29, 2026</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#5B7564]" />
            </div>
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#CBD8D0] text-[#1E3B2F] text-xs font-semibold hover:bg-[#F2F7F4] transition shadow-xs">
              <Download className="w-3.5 h-3.5 text-[#5B7564]" />
              Export
            </button>
            <button className="p-2 rounded-xl bg-white border border-[#CBD8D0] text-[#1E3B2F] text-xs font-semibold hover:bg-[#F2F7F4] transition shadow-xs">
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 6 KPI Metric Cards (Page 28 exact) */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {/* Total Dispatched */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32]">
              <Truck className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Total Dispatched</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">3,842</div>
              <div className="text-[11px] text-[#2E7D32] font-semibold mt-1">
                ↑ +11.6% vs previous 7 days
              </div>
            </div>
          </div>

          {/* In Transit */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#E3F2FD] flex items-center justify-center text-[#1976D2]">
              <Package className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">In Transit</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">2,976</div>
              <div className="text-[11px] text-[#5B7564] font-medium mt-1">
                (77.5%)
              </div>
            </div>
          </div>

          {/* Out for Delivery */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#FFF8E1] flex items-center justify-center text-[#F57F17]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Out for Delivery</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">536</div>
              <div className="text-[11px] text-[#5B7564] font-medium mt-1">
                (14.0%)
              </div>
            </div>
          </div>

          {/* Delivered */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#F3E5F5] flex items-center justify-center text-[#7B1FA2]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Delivered</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">312</div>
              <div className="text-[11px] text-[#5B7564] font-medium mt-1">
                (8.1%)
              </div>
            </div>
          </div>

          {/* Delivery Exceptions */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#FFEBEE] flex items-center justify-center text-[#D32F2F]">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Delivery Exceptions</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">18</div>
              <div className="text-[11px] text-[#5B7564] font-medium mt-1">
                (0.5%)
              </div>
            </div>
          </div>

          {/* Avg. Dispatch Time */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#E0F7FA] flex items-center justify-center text-[#00838F]">
              <Clock className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Avg. Dispatch Time</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">12 min</div>
              <div className="text-[11px] text-[#2E7D32] font-semibold mt-1">
                ↓ -3 min
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
              placeholder="Search by Order ID, AWB, Courier, or Recipient..."
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
              <option>All Dispatch Statuses</option>
              <option>In Transit</option>
              <option>Out for Delivery</option>
              <option>Delivered</option>
            </select>

            <select className="px-3 py-1.5 rounded-xl border border-[#D5E0D8] bg-white text-[#2B4738] font-medium focus:outline-none">
              <option>All Zones</option>
              <option>North Zone</option>
              <option>South Zone</option>
            </select>

            <select className="px-3 py-1.5 rounded-xl border border-[#D5E0D8] bg-white text-[#2B4738] font-medium focus:outline-none">
              <option>All States</option>
              <option>Tamil Nadu</option>
              <option>Kerala</option>
            </select>

            <select className="px-3 py-1.5 rounded-xl border border-[#D5E0D8] bg-white text-[#2B4738] font-medium focus:outline-none">
              <option>Today</option>
              <option>Yesterday</option>
            </select>
          </div>
        </div>

        {/* Main Content: Table + Side Inspector (Matches Page 28 1:1) */}
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
                    <th className="py-2.5 px-3">Dispatch ID</th>
                    <th className="py-2.5 px-3">Order ID</th>
                    <th className="py-2.5 px-3">AWB / Tracking ID</th>
                    <th className="py-2.5 px-3">Courier</th>
                    <th className="py-2.5 px-3">Packages</th>
                    <th className="py-2.5 px-3">Dispatched On</th>
                    <th className="py-2.5 px-3">ETA</th>
                    <th className="py-2.5 px-3">Dispatch Status</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDF2EE] text-[#1E3B2F]">
                  {DISPATCH_RECORDS.map((row) => {
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
                        <td className="py-2.5 px-3 text-[#5B7564] font-mono text-[11px]">{row.awb}</td>
                        <td className="py-2.5 px-3 font-medium text-[#1976D2]">{row.courier}</td>
                        <td className="py-2.5 px-3 font-semibold">{row.packages}</td>
                        <td className="py-2.5 px-3 text-[#7A9385]">{row.dispatchedOn}</td>
                        <td className="py-2.5 px-3 text-[#7A9385]">{row.eta}</td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              row.status === "In Transit"
                                ? "bg-[#E3F2FD] text-[#1976D2]"
                                : row.status === "Out for Delivery"
                                ? "bg-[#FFF8E1] text-[#F57F17]"
                                : "bg-[#E8F5E9] text-[#2E7D32]"
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
              <div>Showing 1 – 10 of 3,842 dispatched orders</div>
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
                <button className="w-7 h-7 rounded-lg border border-[#D5E0D8] bg-white flex items-center justify-center hover:bg-[#F2F7F4]">385</button>
                <button className="w-7 h-7 rounded-lg border border-[#D5E0D8] bg-white flex items-center justify-center hover:bg-[#F2F7F4]">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Selected Dispatch Details Inspector (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-[#EDF2EE]">
                <div>
                  <h3 className="font-extrabold text-[#033129] text-sm">Dispatch Details</h3>
                  <div className="text-base font-black text-[#033129] mt-0.5">{selectedItem.id}</div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#E3F2FD] text-[#1976D2] border border-[#BBDEFB]">
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
                  <span className="text-[#5B7564]">AWB / Tracking ID</span>
                  <span className="font-mono text-[#033129] flex items-center gap-1">
                    {selectedItem.awb}
                    <Copy className="w-3 h-3 text-[#7A9385] cursor-pointer" />
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">Courier</span>
                  <span className="font-semibold text-[#1976D2]">{selectedItem.courier}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">Packages</span>
                  <span className="font-black text-[#033129]">{selectedItem.packages}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">Dispatched On</span>
                  <span className="font-medium text-[#1E3B2F]">{selectedItem.dispatchedOn}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">ETA</span>
                  <span className="font-medium text-[#033129]">{selectedItem.eta}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">Current Location</span>
                  <span className="font-semibold text-[#033129]">{selectedItem.location}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">Transit Status</span>
                  <span className="font-semibold text-[#2E7D32]">{selectedItem.transitStatus}</span>
                </div>
              </div>

              {/* Tracking Progress Horizontal Stepper */}
              <div>
                <span className="text-[11px] font-bold text-[#5B7564] block mb-3">Tracking Progress</span>
                <div className="relative flex items-center justify-between px-2">
                  {/* Stepper Line */}
                  <div className="absolute left-6 right-6 top-3 h-0.5 bg-[#E1E8E3]" />
                  <div className="absolute left-6 w-1/3 top-3 h-0.5 bg-[#2E7D32]" />

                  {/* Step 1: Picked Up */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-6 h-6 rounded-full bg-[#2E7D32] text-white flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[9px] font-bold text-[#033129] mt-1.5 block">Picked Up</span>
                    <span className="text-[8px] text-[#7A9385] block">10:27 AM</span>
                  </div>

                  {/* Step 2: In Transit */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-6 h-6 rounded-full bg-[#2E7D32] text-white flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[9px] font-bold text-[#033129] mt-1.5 block">In Transit</span>
                    <span className="text-[8px] text-[#7A9385] block">11:45 AM</span>
                  </div>

                  {/* Step 3: Out for Delivery */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-6 h-6 rounded-full bg-white border-2 border-[#CBD8D0] text-[#7A9385] flex items-center justify-center" />
                    <span className="text-[9px] font-medium text-[#7A9385] mt-1.5 block">Out for Delivery</span>
                  </div>

                  {/* Step 4: Delivered */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-6 h-6 rounded-full bg-white border-2 border-[#CBD8D0] text-[#7A9385] flex items-center justify-center" />
                    <span className="text-[9px] font-medium text-[#7A9385] mt-1.5 block">Delivered</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row Analytics: 4 Cards (Matches Page 28 1:1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Dispatch Status Distribution */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs">
            <h4 className="text-xs font-extrabold text-[#033129] mb-3">Dispatch Status Distribution</h4>
            <div className="flex items-center gap-3">
              <div className="relative w-24 h-24 flex-shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  {/* In Transit 77.5% (blue) */}
                  <path className="text-[#1976D2]" strokeDasharray="77.5, 100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Out for Delivery 14.0% (orange) */}
                  <path className="text-[#FFA000]" strokeDasharray="14, 100" strokeDashoffset="-77.5" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Delivered 8.1% (green) */}
                  <path className="text-[#2E7D32]" strokeDasharray="8.1, 100" strokeDashoffset="-91.5" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Exceptions 0.5% (red) */}
                  <path className="text-[#D32F2F]" strokeDasharray="0.5, 100" strokeDashoffset="-99.5" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-sm font-black text-[#033129] leading-none">3,842</span>
                  <span className="text-[9px] text-[#5B7564] font-semibold mt-0.5">Dispatched</span>
                </div>
              </div>

              <div className="space-y-1 text-[10px] flex-1">
                <div className="flex justify-between"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#1976D2]" />In Transit</span><span className="font-bold text-[#033129]">2,976 (77.5%)</span></div>
                <div className="flex justify-between"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#FFA000]" />Out for Delivery</span><span className="font-bold text-[#033129]">536 (14.0%)</span></div>
                <div className="flex justify-between"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#2E7D32]" />Delivered</span><span className="font-bold text-[#033129]">312 (8.1%)</span></div>
                <div className="flex justify-between"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#D32F2F]" />Exceptions</span><span className="font-bold text-[#D32F2F]">18 (0.5%)</span></div>
              </div>
            </div>
          </div>

          {/* 2. Courier-wise Dispatches */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs">
            <h4 className="text-xs font-extrabold text-[#033129] mb-3">Courier-wise Dispatches</h4>
            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">BlueDart</span>
                  <span className="font-bold text-[#033129]">1,212 (31.5%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#1B5E20]" style={{ width: "31.5%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Delhivery</span>
                  <span className="font-bold text-[#033129]">936 (24.4%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#2E7D32]" style={{ width: "24.4%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Ekart</span>
                  <span className="font-bold text-[#033129]">668 (17.4%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#4CAF50]" style={{ width: "17.4%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Shadowfax</span>
                  <span className="font-bold text-[#033129]">584 (15.2%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#81C784]" style={{ width: "15.2%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Others</span>
                  <span className="font-bold text-[#033129]">442 (11.5%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#C8E6C9]" style={{ width: "11.5%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Dispatch SLA Compliance */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <h4 className="text-xs font-extrabold text-[#033129]">Dispatch SLA Compliance</h4>
            <div className="flex items-center justify-center my-auto py-2">
              <div className="relative w-24 h-24">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path className="text-[#2E7D32]" strokeDasharray="98.1, 100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-[#D32F2F]" strokeDasharray="1.9, 100" strokeDashoffset="-98.1" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-sm font-black text-[#033129] leading-none">98.1%</span>
                  <span className="text-[9px] text-[#5B7564] font-semibold mt-0.5">On Time</span>
                </div>
              </div>
            </div>

            <div className="space-y-1 text-xs pt-2 border-t border-[#EDF2EE]">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#5B7564]">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#2E7D32]" /> On Time
                </span>
                <span className="font-bold text-[#033129]">3,769 (98.1%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#5B7564]">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#D32F2F]" /> Delayed
                </span>
                <span className="font-bold text-[#D32F2F]">73 (1.9%)</span>
              </div>
            </div>
          </div>

          {/* 4. Dispatch Trend (Last 7 Days) */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <h4 className="text-xs font-extrabold text-[#033129]">Dispatch Trend (Last 7 Days)</h4>
            <div className="h-24 relative mt-2 flex items-end justify-between px-1">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60">
                <line x1="0" y1="10" x2="200" y2="10" stroke="#F0F4F1" strokeWidth="1" />
                <line x1="0" y1="30" x2="200" y2="30" stroke="#F0F4F1" strokeWidth="1" />
                <line x1="0" y1="50" x2="200" y2="50" stroke="#F0F4F1" strokeWidth="1" />

                {/* Light green area */}
                <polygon
                  fill="#E8F5E9"
                  fillOpacity="0.7"
                  points="10,60 10,40 40,36 70,32 100,28 130,24 160,20 190,16 190,60"
                />
                <polyline
                  fill="none"
                  stroke="#2E7D32"
                  strokeWidth="2.5"
                  points="10,40 40,36 70,32 100,28 130,24 160,20 190,16"
                />
                {[
                  [10, 40], [40, 36], [70, 32], [100, 28], [130, 24], [160, 20], [190, 16]
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
