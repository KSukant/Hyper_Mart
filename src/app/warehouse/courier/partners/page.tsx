"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Truck,
  Package,
  CheckCircle2,
  AlertTriangle,
  Clock,
  MapPin,
  Download,
  Plus,
  Search,
  Eye,
  Edit,
  BarChart2,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { WarehouseManagerShell } from "@/components/warehouse/WarehouseManagerShell";

interface PartnerItem {
  code: string;
  name: string;
  shipments: number;
  delivered: number;
  inTransit: number;
  outForDelivery: number;
  exceptions: number;
  onTime: string;
  avgTransit: string;
  serviceAreas: string;
  status: "Active" | "Inactive";
  contactPerson: string;
  contactNumber: string;
  email: string;
  sla: string;
}

const PARTNER_RECORDS: PartnerItem[] = [
  {
    code: "CP-BD",
    name: "BlueDart",
    shipments: 1212,
    delivered: 1185,
    inTransit: 18,
    outForDelivery: 7,
    exceptions: 2,
    onTime: "98.6%",
    avgTransit: "11 min",
    serviceAreas: "All Zones",
    status: "Active",
    contactPerson: "Rajesh Kumar",
    contactNumber: "+91 98765 43210",
    email: "operations@bluedart.com",
    sla: "Within 24 Hours",
  },
  {
    code: "CP-DL",
    name: "Delhivery",
    shipments: 936,
    delivered: 918,
    inTransit: 11,
    outForDelivery: 6,
    exceptions: 1,
    onTime: "98.1%",
    avgTransit: "13 min",
    serviceAreas: "22 Zones",
    status: "Active",
    contactPerson: "Vikram Sethi",
    contactNumber: "+91 98450 11223",
    email: "support@delhivery.com",
    sla: "Within 24 Hours",
  },
  {
    code: "CP-EK",
    name: "Ekart",
    shipments: 668,
    delivered: 649,
    inTransit: 12,
    outForDelivery: 5,
    exceptions: 2,
    onTime: "97.3%",
    avgTransit: "14 min",
    serviceAreas: "18 Zones",
    status: "Active",
    contactPerson: "Siddharth Rao",
    contactNumber: "+91 99887 76655",
    email: "hubops@ekart.com",
    sla: "Within 24 Hours",
  },
  {
    code: "CP-SF",
    name: "Shadowfax",
    shipments: 584,
    delivered: 567,
    inTransit: 9,
    outForDelivery: 6,
    exceptions: 2,
    onTime: "97.9%",
    avgTransit: "12 min",
    serviceAreas: "16 Zones",
    status: "Active",
    contactPerson: "Nitin Verma",
    contactNumber: "+91 91234 56789",
    email: "express@shadowfax.in",
    sla: "Same Day (Express)",
  },
  {
    code: "CP-AR",
    name: "Aramex",
    shipments: 242,
    delivered: 238,
    inTransit: 3,
    outForDelivery: 1,
    exceptions: 0,
    onTime: "99.2%",
    avgTransit: "10 min",
    serviceAreas: "8 Zones",
    status: "Active",
    contactPerson: "Farhan Ali",
    contactNumber: "+91 94433 22110",
    email: "care@aramex.com",
    sla: "Priority Air Cargo",
  },
  {
    code: "CP-OT",
    name: "Others",
    shipments: 200,
    delivered: 196,
    inTransit: 3,
    outForDelivery: 1,
    exceptions: 1,
    onTime: "98.0%",
    avgTransit: "13 min",
    serviceAreas: "6 Zones",
    status: "Active",
    contactPerson: "Regional Dispatch",
    contactNumber: "+91 90000 11111",
    email: "fleet@hypermart.com",
    sla: "Local Dedicated Van",
  },
];

export default function CourierPartnersPage() {
  const [selectedCode, setSelectedCode] = useState<string>("CP-BD");
  const [searchQuery, setSearchQuery] = useState("");
  const selectedPartner = PARTNER_RECORDS.find((p) => p.code === selectedCode) || PARTNER_RECORDS[0];

  return (
    <WarehouseManagerShell
      pageTitle="Courier Partners"
      pageDescription="Manage courier partners, service coverage, SLAs, and performance."
      currentPath="/warehouse/courier/partners"
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
              <span className="text-[#033129] font-bold">Courier Partners</span>
            </div>
            <h1 className="text-xl font-black text-[#033129] tracking-tight">Courier Partners</h1>
            <p className="text-xs text-[#5B7564]">
              Manage courier partners, service coverage, SLAs, and performance.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#CBD8D0] text-[#1E3B2F] text-xs font-semibold hover:bg-[#F2F7F4] transition shadow-xs">
              <Download className="w-3.5 h-3.5 text-[#5B7564]" />
              Export
            </button>
            <button className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#087A4A] text-white text-xs font-bold hover:bg-[#06633C] transition shadow-xs">
              <Plus className="w-4 h-4 stroke-[2.5]" />
              Add Partner
            </button>
          </div>
        </div>

        {/* 6 KPI Metric Cards (Page 29 exact) */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {/* Total Partners */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32]">
              <Truck className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Total Partners</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">6</div>
              <div className="text-[11px] text-[#2E7D32] font-semibold mt-1">
                ↑ No change
              </div>
            </div>
          </div>

          {/* Total Shipments */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#E3F2FD] flex items-center justify-center text-[#1976D2]">
              <Package className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Total Shipments</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">3,842</div>
              <div className="text-[11px] text-[#2E7D32] font-semibold mt-1">
                ↑ +11.6% vs previous 7 days
              </div>
            </div>
          </div>

          {/* On-Time Delivery */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#FFF8E1] flex items-center justify-center text-[#F57F17]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">On-Time Delivery</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">98.1%</div>
              <div className="text-[11px] text-[#2E7D32] font-semibold mt-1">
                ↑ +1.9 pp
              </div>
            </div>
          </div>

          {/* Avg. Transit Time */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#EDE7F6] flex items-center justify-center text-[#5E35B1]">
              <Clock className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Avg. Transit Time</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">12 min</div>
              <div className="text-[11px] text-[#2E7D32] font-semibold mt-1">
                ↓ -3 min
              </div>
            </div>
          </div>

          {/* SLA Breaches */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#FFEBEE] flex items-center justify-center text-[#D32F2F]">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">SLA Breaches</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">18</div>
              <div className="text-[11px] text-[#5B7564] font-medium mt-1">
                (0.5%)
              </div>
            </div>
          </div>

          {/* Service Coverage */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#E0F7FA] flex items-center justify-center text-[#00838F]">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Service Coverage</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">28</div>
              <div className="text-[11px] text-[#5B7564] font-medium mt-1">
                Zones
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
              placeholder="Search by Partner Name, Code, or Service Area..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-[#D5E0D8] text-xs focus:outline-none focus:border-[#087A4A] bg-[#FAFCFA]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select className="px-3 py-1.5 rounded-xl border border-[#D5E0D8] bg-white text-[#2B4738] font-medium focus:outline-none">
              <option>All Partners</option>
              <option>BlueDart</option>
              <option>Delhivery</option>
              <option>Ekart</option>
              <option>Shadowfax</option>
              <option>Aramex</option>
            </select>

            <select className="px-3 py-1.5 rounded-xl border border-[#D5E0D8] bg-white text-[#2B4738] font-medium focus:outline-none">
              <option>All Service Areas</option>
              <option>All Zones (28)</option>
              <option>Metro Hubs</option>
            </select>

            <select className="px-3 py-1.5 rounded-xl border border-[#D5E0D8] bg-white text-[#2B4738] font-medium focus:outline-none">
              <option>All Statuses</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>

            <select className="px-3 py-1.5 rounded-xl border border-[#D5E0D8] bg-white text-[#2B4738] font-medium focus:outline-none">
              <option>Today</option>
              <option>Yesterday</option>
              <option>Last 7 Days</option>
            </select>
          </div>
        </div>

        {/* Main Content: Table + Side Inspector (Matches Page 29 1:1) */}
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
                    <th className="py-2.5 px-3">Partner Code</th>
                    <th className="py-2.5 px-3">Courier Partner</th>
                    <th className="py-2.5 px-3">Shipments</th>
                    <th className="py-2.5 px-3">Delivered</th>
                    <th className="py-2.5 px-3">In Transit</th>
                    <th className="py-2.5 px-3">Out for Delivery</th>
                    <th className="py-2.5 px-3">Exceptions</th>
                    <th className="py-2.5 px-3">On-Time %</th>
                    <th className="py-2.5 px-3">Avg. Transit</th>
                    <th className="py-2.5 px-3">Service Areas</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDF2EE] text-[#1E3B2F]">
                  {PARTNER_RECORDS.map((row) => {
                    const isSelected = row.code === selectedCode;
                    return (
                      <tr
                        key={row.code}
                        onClick={() => setSelectedCode(row.code)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? "bg-[#F0FAF4] font-semibold" : "hover:bg-[#F9FCFA]"
                        }`}
                      >
                        <td className="py-2.5 px-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => setSelectedCode(row.code)}
                            className="rounded text-[#087A4A] focus:ring-0"
                          />
                        </td>
                        <td className="py-2.5 px-3 font-bold text-[#033129]">{row.code}</td>
                        <td className="py-2.5 px-3 font-semibold text-[#1976D2]">{row.name}</td>
                        <td className="py-2.5 px-3">{row.shipments.toLocaleString()}</td>
                        <td className="py-2.5 px-3 text-[#2E7D32] font-semibold">{row.delivered.toLocaleString()}</td>
                        <td className="py-2.5 px-3">{row.inTransit}</td>
                        <td className="py-2.5 px-3">{row.outForDelivery}</td>
                        <td className="py-2.5 px-3 text-[#D32F2F]">{row.exceptions}</td>
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#E8F5E9] text-[#2E7D32]">
                            {row.onTime}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-[#5B7564]">{row.avgTransit}</td>
                        <td className="py-2.5 px-3">{row.serviceAreas}</td>
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#E8F5E9] text-[#2E7D32]">
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
              <div>Showing 1 – 6 of 6 courier partners</div>
              <div className="flex items-center gap-1">
                <button className="w-7 h-7 rounded-lg border border-[#D5E0D8] bg-white flex items-center justify-center opacity-50 cursor-not-allowed">
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button className="w-7 h-7 rounded-lg bg-[#087A4A] text-white font-bold flex items-center justify-center">1</button>
                <button className="w-7 h-7 rounded-lg border border-[#D5E0D8] bg-white flex items-center justify-center opacity-50 cursor-not-allowed">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Selected Partner Details Inspector (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-[#EDF2EE]">
                <div>
                  <h3 className="font-extrabold text-[#033129] text-sm">Partner Details</h3>
                  <div className="text-base font-black text-[#033129] mt-0.5">{selectedPartner.name}</div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#E8F5E9] text-[#2E7D32] border border-[#A5D6A7]">
                  {selectedPartner.status}
                </span>
              </div>

              {/* Key Specs */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">Partner Code</span>
                  <span className="font-semibold text-[#033129]">{selectedPartner.code}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">Contact Person</span>
                  <span className="font-semibold text-[#033129]">{selectedPartner.contactPerson}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">Contact Number</span>
                  <span className="font-semibold text-[#033129]">{selectedPartner.contactNumber}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">Email</span>
                  <span className="font-mono text-[#1976D2]">{selectedPartner.email}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">Service Areas</span>
                  <span className="font-medium text-[#1E3B2F]">{selectedPartner.serviceAreas}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">SLA (Delivery)</span>
                  <span className="font-medium text-[#033129]">{selectedPartner.sla}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">Avg. Transit Time</span>
                  <span className="font-bold text-[#033129]">{selectedPartner.avgTransit}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">On-Time Delivery</span>
                  <span className="font-black text-[#2E7D32]">{selectedPartner.onTime}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">Total Shipments</span>
                  <span className="font-black text-[#033129]">{selectedPartner.shipments.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#EDF2EE]">
              <button className="py-2 px-3 rounded-xl bg-white border border-[#CBD8D0] text-[#1E3B2F] text-xs font-semibold hover:bg-[#F2F7F4] transition flex items-center justify-center gap-1.5">
                <Edit className="w-3.5 h-3.5 text-[#5B7564]" />
                Edit Partner
              </button>
              <button className="py-2 px-3 rounded-xl bg-[#087A4A] text-white text-xs font-bold hover:bg-[#06633C] transition flex items-center justify-center gap-1.5 shadow-xs">
                <BarChart2 className="w-4 h-4 stroke-[2.5]" />
                View Performance
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Row Analytics: 4 Cards (Matches Page 29 1:1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Shipment Share by Partner */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs">
            <h4 className="text-xs font-extrabold text-[#033129] mb-3">Shipment Share by Partner</h4>
            <div className="flex items-center gap-3">
              <div className="relative w-24 h-24 flex-shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  {/* BlueDart 31.5% */}
                  <path className="text-[#1976D2]" strokeDasharray="31.5, 100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Delhivery 24.4% */}
                  <path className="text-[#D32F2F]" strokeDasharray="24.4, 100" strokeDashoffset="-31.5" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Ekart 17.4% */}
                  <path className="text-[#FFA000]" strokeDasharray="17.4, 100" strokeDashoffset="-55.9" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Shadowfax 15.2% */}
                  <path className="text-[#7B1FA2]" strokeDasharray="15.2, 100" strokeDashoffset="-73.3" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Aramex 6.3% */}
                  <path className="text-[#FF8A80]" strokeDasharray="6.3, 100" strokeDashoffset="-88.5" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Others 5.2% */}
                  <path className="text-[#90A4AE]" strokeDasharray="5.2, 100" strokeDashoffset="-94.8" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-sm font-black text-[#033129] leading-none">3,842</span>
                  <span className="text-[9px] text-[#5B7564] font-semibold mt-0.5">Shipments</span>
                </div>
              </div>

              <div className="space-y-1 text-[10px] flex-1">
                <div className="flex justify-between"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#1976D2]" />BlueDart</span><span className="font-bold text-[#033129]">1,212 (31.5%)</span></div>
                <div className="flex justify-between"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#D32F2F]" />Delhivery</span><span className="font-bold text-[#033129]">936 (24.4%)</span></div>
                <div className="flex justify-between"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#FFA000]" />Ekart</span><span className="font-bold text-[#033129]">668 (17.4%)</span></div>
                <div className="flex justify-between"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#7B1FA2]" />Shadowfax</span><span className="font-bold text-[#033129]">584 (15.2%)</span></div>
                <div className="flex justify-between"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#FF8A80]" />Aramex</span><span className="font-bold text-[#033129]">242 (6.3%)</span></div>
                <div className="flex justify-between"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#90A4AE]" />Others</span><span className="font-bold text-[#033129]">200 (5.2%)</span></div>
              </div>
            </div>
          </div>

          {/* 2. On-Time Delivery by Partner */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs">
            <h4 className="text-xs font-extrabold text-[#033129] mb-3">On-Time Delivery by Partner</h4>
            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Aramex</span>
                  <span className="font-bold text-[#033129]">99.2%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#1B5E20]" style={{ width: "99.2%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">BlueDart</span>
                  <span className="font-bold text-[#033129]">98.6%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#2E7D32]" style={{ width: "98.6%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Delhivery</span>
                  <span className="font-bold text-[#033129]">98.1%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#4CAF50]" style={{ width: "98.1%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Others</span>
                  <span className="font-bold text-[#033129]">98.0%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#81C784]" style={{ width: "98.0%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Shadowfax</span>
                  <span className="font-bold text-[#033129]">97.9%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#A5D6A7]" style={{ width: "97.9%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Ekart</span>
                  <span className="font-bold text-[#033129]">97.3%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#C8E6C9]" style={{ width: "97.3%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* 3. SLA Compliance (Overall) */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <h4 className="text-xs font-extrabold text-[#033129]">SLA Compliance (Overall)</h4>
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
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#2E7D32]" /> Within SLA
                </span>
                <span className="font-bold text-[#033129]">3,769 (98.1%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#5B7564]">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#D32F2F]" /> Breached SLA
                </span>
                <span className="font-bold text-[#D32F2F]">18 (0.5%)</span>
              </div>
            </div>
          </div>

          {/* 4. Avg. Transit Time Trend (Last 7 Days) */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <h4 className="text-xs font-extrabold text-[#033129]">Avg. Transit Time Trend (Last 7 Days)</h4>
            <div className="h-24 relative mt-2 flex items-end justify-between px-1">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60">
                <line x1="0" y1="10" x2="200" y2="10" stroke="#F0F4F1" strokeWidth="1" />
                <line x1="0" y1="30" x2="200" y2="30" stroke="#F0F4F1" strokeWidth="1" />
                <line x1="0" y1="50" x2="200" y2="50" stroke="#F0F4F1" strokeWidth="1" />

                {/* Light green area */}
                <polygon
                  fill="#E8F5E9"
                  fillOpacity="0.7"
                  points="10,60 10,24 40,28 70,32 100,30 130,30 160,34 190,30 190,60"
                />
                <polyline
                  fill="none"
                  stroke="#2E7D32"
                  strokeWidth="2.5"
                  points="10,24 40,28 70,32 100,30 130,30 160,34 190,30"
                />
                {[
                  [10, 24], [40, 28], [70, 32], [100, 30], [130, 30], [160, 34], [190, 30]
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
