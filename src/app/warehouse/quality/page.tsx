"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Plus,
  Search,
  ChevronDown,
  Calendar,
  FileText,
  RotateCcw,
  Boxes,
  Eye,
  MoreHorizontal,
  Package,
} from "lucide-react";
import { WarehouseManagerShell } from "@/components/warehouse/WarehouseManagerShell";
import { cn } from "@/lib/cn";

export default function QualityOverviewPage() {
  return (
    <WarehouseManagerShell pageNumber={7} pageTitle="Quality Overview">
      <div className="space-y-6">
        {/* ── 1. Page Header: Title, Subtitle, Action Buttons ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1">
          <div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-[#17231E] tracking-tight">
              Quality Overview
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
              Monitor quality checks, defects and approval status across all products.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3.5 py-2 rounded-xl bg-white border border-[#E1E8E3] hover:bg-gray-50 text-gray-700 font-bold text-xs flex items-center gap-1.5 shadow-2xs transition">
              <FileText className="w-3.5 h-3.5" />
              <span>Export Report</span>
            </button>
            <button className="px-4 py-2 rounded-xl bg-[#087A4A] hover:bg-[#06653E] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition">
              <Plus className="w-4 h-4" />
              <span>New Inspection</span>
            </button>
          </div>
        </div>

        {/* ── 2. Top Metrics Row: 4 Metric Cards + Inspection Pass Rate Donut (Page 07) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-stretch">
          {/* Card 1: Passed Items */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#F0FDF4] to-white rounded-2xl border border-[#DCFCE7] p-4 shadow-2xs flex flex-col justify-between">
            <span className="w-9 h-9 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shadow-2xs">
              <CheckCircle2 className="w-4 h-4" />
            </span>
            <div className="mt-3">
              <p className="font-display font-black text-2xl text-gray-900 leading-none">310</p>
              <p className="text-[11px] text-gray-500 font-medium mt-1">Passed Items</p>
            </div>
            <div className="mt-2 pt-2 border-t border-[#EAF7EF] flex items-center justify-between text-[11px] font-bold text-[#16A34A]">
              <span>↑ 12%</span>
              <svg className="w-14 h-3.5" viewBox="0 0 60 15" fill="none">
                <path d="M2 13 C 15 15, 30 5, 58 3" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Card 2: Rejected Items */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#FEF2F2] to-white rounded-2xl border border-[#FEE2E2] p-4 shadow-2xs flex flex-col justify-between">
            <span className="w-9 h-9 rounded-xl bg-[#FEE2E2] text-[#EF4444] flex items-center justify-center shadow-2xs">
              <XCircle className="w-4 h-4" />
            </span>
            <div className="mt-3">
              <p className="font-display font-black text-2xl text-gray-900 leading-none">45</p>
              <p className="text-[11px] text-gray-500 font-medium mt-1">Rejected Items</p>
            </div>
            <div className="mt-2 pt-2 border-t border-[#FEF2F2] flex items-center justify-between text-[11px] font-bold text-[#EF4444]">
              <span>↓ 8%</span>
              <svg className="w-14 h-3.5" viewBox="0 0 60 15" fill="none">
                <path d="M2 6 C 15 8, 30 13, 58 13" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Card 3: Rework Items */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#EFF6FF] to-white rounded-2xl border border-[#DBEAFE] p-4 shadow-2xs flex flex-col justify-between">
            <span className="w-9 h-9 rounded-xl bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center shadow-2xs">
              <Clock className="w-4 h-4" />
            </span>
            <div className="mt-3">
              <p className="font-display font-black text-2xl text-gray-900 leading-none">25</p>
              <p className="text-[11px] text-gray-500 font-medium mt-1">Rework Items</p>
            </div>
            <div className="mt-2 pt-2 border-t border-[#EFF6FF] flex items-center justify-between text-[11px] font-bold text-[#2563EB]">
              <span>↓ 15%</span>
              <svg className="w-14 h-3.5" viewBox="0 0 60 15" fill="none">
                <path d="M2 6 C 15 9, 30 12, 58 12" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Card 4: Total Inspected */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#FAF5FF] to-white rounded-2xl border border-[#F3E8FF] p-4 shadow-2xs flex flex-col justify-between">
            <span className="w-9 h-9 rounded-xl bg-[#F3E8FF] text-[#9333EA] flex items-center justify-center shadow-2xs">
              <Boxes className="w-4 h-4" />
            </span>
            <div className="mt-3">
              <p className="font-display font-black text-2xl text-gray-900 leading-none">566</p>
              <p className="text-[11px] text-gray-500 font-medium mt-1">Total Inspected</p>
            </div>
            <div className="mt-2 pt-2 border-t border-[#FAF5FF] flex items-center justify-between text-[11px] font-bold text-[#9333EA]">
              <span>↑ 10%</span>
              <svg className="w-14 h-3.5" viewBox="0 0 60 15" fill="none">
                <path d="M2 13 C 15 14, 30 7, 58 5" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Card 5: Inspection Pass Rate Donut (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E1E8E3] p-4 shadow-2xs flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="font-display font-bold text-xs text-gray-900">Inspection Pass Rate</h4>
              <div className="relative flex items-center justify-center w-28 h-28 my-1">
                <svg className="w-28 h-28 -rotate-90 transform" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" stroke="#F1F5F9" strokeWidth="14" fill="none" />
                  <circle cx="50" cy="50" r="38" stroke="#10B981" strokeWidth="14" fill="none" strokeDasharray="202.9 35.8" strokeDashoffset="0" />
                  <circle cx="50" cy="50" r="38" stroke="#EF4444" strokeWidth="14" fill="none" strokeDasharray="28.6 210.1" strokeDashoffset="-202.9" />
                  <circle cx="50" cy="50" r="38" stroke="#3B82F6" strokeWidth="14" fill="none" strokeDasharray="9.5 229.2" strokeDashoffset="-231.5" />
                </svg>
                <div className="absolute text-center">
                  <span className="font-display font-black text-sm text-gray-900 leading-none">85%</span>
                  <span className="text-[9px] text-gray-400 block">Pass Rate</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-[11px] flex-1">
              {[
                { label: "Passed", val: "310 (85%)", color: "bg-[#10B981]" },
                { label: "Rejected", val: "45 (12%)", color: "bg-[#EF4444]" },
                { label: "Rework", val: "25 (4%)", color: "bg-[#3B82F6]" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className={cn("w-2 h-2 rounded-full", s.color)} />
                    <span className="text-gray-600">{s.label}</span>
                  </div>
                  <span className="font-semibold text-gray-900">{s.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 3. Filters Bar ── */}
        <div className="bg-white rounded-2xl border border-[#E1E8E3] p-3 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 bg-[#F5F7F6] border border-[#E1E8E3] rounded-lg px-2.5 py-1.5 text-gray-700">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              <span>Today</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </div>

            <select className="bg-[#F5F7F6] border border-[#E1E8E3] rounded-lg px-2.5 py-1.5 text-gray-700">
              <option>All Categories</option>
              <option>Footwear</option>
              <option>Apparel</option>
            </select>

            <select className="bg-[#F5F7F6] border border-[#E1E8E3] rounded-lg px-2.5 py-1.5 text-gray-700">
              <option>All Stages</option>
              <option>Receiving</option>
              <option>Picking</option>
              <option>Packing</option>
              <option>Final QC</option>
            </select>

            <select className="bg-[#F5F7F6] border border-[#E1E8E3] rounded-lg px-2.5 py-1.5 text-gray-700">
              <option>All Results</option>
              <option>Passed</option>
              <option>Rejected</option>
              <option>Rework</option>
            </select>

            <select className="bg-[#F5F7F6] border border-[#E1E8E3] rounded-lg px-2.5 py-1.5 text-gray-700">
              <option>All Inspectors</option>
              <option>Arjun K</option>
              <option>Priya S</option>
              <option>Suresh R</option>
            </select>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Order ID, SKU, product..."
              className="pl-8 pr-3 py-1.5 bg-[#F5F7F6] border border-[#E1E8E3] rounded-xl text-xs w-64"
            />
          </div>
        </div>

        {/* ── 4. Middle Row: Quality Trend Line (6 cols) + Defect Reasons Donut (3 cols) + Stations (3 cols) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Quality Trend (Last 7 Days) */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-[#E1E8E3] p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-sm text-gray-900">Quality Trend (Last 7 Days)</h3>
              <div className="flex items-center gap-3 text-[11px] font-medium text-gray-600">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  <span>Passed</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                  <span>Rejected</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                  <span>Rework</span>
                </span>
              </div>
            </div>

            {/* Line chart visualization */}
            <div className="h-44 pt-4 relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 120" preserveAspectRatio="none">
                <line x1="0" y1="20" x2="500" y2="20" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="0" y1="60" x2="500" y2="60" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="0" y1="100" x2="500" y2="100" stroke="#F1F5F9" strokeWidth="1" />

                {/* Passed Line */}
                <path d="M 10 30 Q 90 20, 170 30 T 330 25 T 490 35" fill="none" stroke="#10B981" strokeWidth="2.5" />
                <circle cx="10" cy="30" r="3" fill="#10B981" />
                <circle cx="90" cy="22" r="3" fill="#10B981" />
                <circle cx="170" cy="30" r="3" fill="#10B981" />
                <circle cx="250" cy="28" r="3" fill="#10B981" />
                <circle cx="330" cy="25" r="3" fill="#10B981" />
                <circle cx="410" cy="32" r="3" fill="#10B981" />
                <circle cx="490" cy="35" r="3" fill="#10B981" />

                {/* Rejected Line */}
                <path d="M 10 100 Q 90 95, 170 98 T 330 92 T 490 95" fill="none" stroke="#EF4444" strokeWidth="2" />
                <circle cx="10" cy="100" r="2.5" fill="#EF4444" />
                <circle cx="90" cy="95" r="2.5" fill="#EF4444" />
                <circle cx="170" cy="98" r="2.5" fill="#EF4444" />
                <circle cx="250" cy="96" r="2.5" fill="#EF4444" />
                <circle cx="330" cy="92" r="2.5" fill="#EF4444" />
                <circle cx="410" cy="96" r="2.5" fill="#EF4444" />
                <circle cx="490" cy="95" r="2.5" fill="#EF4444" />

                {/* Rework Line */}
                <path d="M 10 110 Q 90 108, 170 105 T 330 105 T 490 110" fill="none" stroke="#3B82F6" strokeWidth="2" />
                <circle cx="10" cy="110" r="2.5" fill="#3B82F6" />
                <circle cx="90" cy="108" r="2.5" fill="#3B82F6" />
                <circle cx="170" cy="105" r="2.5" fill="#3B82F6" />
                <circle cx="250" cy="107" r="2.5" fill="#3B82F6" />
                <circle cx="330" cy="105" r="2.5" fill="#3B82F6" />
                <circle cx="410" cy="108" r="2.5" fill="#3B82F6" />
                <circle cx="490" cy="110" r="2.5" fill="#3B82F6" />
              </svg>

              <div className="flex items-center justify-between text-[10px] text-gray-400 mt-2 font-mono">
                <span>22 Oct</span>
                <span>23 Oct</span>
                <span>24 Oct</span>
                <span>25 Oct</span>
                <span>26 Oct</span>
                <span>27 Oct</span>
                <span>28 Oct</span>
              </div>
            </div>
          </div>

          {/* Defect Reasons Donut */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-[#E1E8E3] p-5 shadow-2xs flex flex-col justify-between">
            <h3 className="font-display font-bold text-sm text-gray-900 mb-2">Defect Reasons</h3>

            <div className="flex flex-col items-center justify-center py-1">
              <div className="relative flex items-center justify-center">
                <svg className="w-28 h-28 -rotate-90 transform" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" stroke="#F1F5F9" strokeWidth="12" fill="none" />
                  <circle cx="50" cy="50" r="38" stroke="#F59E0B" strokeWidth="12" fill="none" strokeDasharray="86 152" strokeDashoffset="0" />
                  <circle cx="50" cy="50" r="38" stroke="#3B82F6" strokeWidth="12" fill="none" strokeDasharray="52.5 186" strokeDashoffset="-86" />
                  <circle cx="50" cy="50" r="38" stroke="#EC4899" strokeWidth="12" fill="none" strokeDasharray="43 195" strokeDashoffset="-138.5" />
                  <circle cx="50" cy="50" r="38" stroke="#8B5CF6" strokeWidth="12" fill="none" strokeDasharray="31 207" strokeDashoffset="-181.5" />
                  <circle cx="50" cy="50" r="38" stroke="#EF4444" strokeWidth="12" fill="none" strokeDasharray="26 212" strokeDashoffset="-212.5" />
                </svg>
                <div className="absolute text-center">
                  <span className="font-display font-black text-sm text-gray-900 leading-none">45</span>
                  <span className="text-[8px] text-gray-400 block">Total Defects</span>
                </div>
              </div>

              <div className="w-full space-y-1.5 text-[11px] mt-3">
                {[
                  { reason: "Damaged Packaging", count: "16 (36%)", color: "bg-[#F59E0B]" },
                  { reason: "Wrong Item", count: "10 (22%)", color: "bg-[#3B82F6]" },
                  { reason: "Product Defect", count: "8 (18%)", color: "bg-[#EC4899]" },
                  { reason: "Missing Accessory", count: "6 (13%)", color: "bg-[#8B5CF6]" },
                  { reason: "Expired / Near Expiry", count: "5 (11%)", color: "bg-[#EF4444]" },
                ].map((d) => (
                  <div key={d.reason} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className={cn("w-2 h-2 rounded-full", d.color)} />
                      <span className="text-gray-600 truncate max-w-[130px]">{d.reason}</span>
                    </div>
                    <span className="font-semibold text-gray-900">{d.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Inspection by Station */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-[#E1E8E3] p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-sm text-gray-900">Inspection by Station</h3>
              <button className="text-xs font-bold text-[#087A4A] hover:underline">View All</button>
            </div>

            <div className="space-y-3.5 text-xs py-2">
              {[
                { name: "Receiving Inspection", pct: 92, count: "120 / 130", color: "bg-[#10B981]" },
                { name: "Picking Inspection", pct: 85, count: "110 / 130", color: "bg-[#3B82F6]" },
                { name: "Packing Inspection", pct: 82, count: "95 / 115", color: "bg-[#EC4899]" },
                { name: "Final QC", pct: 78, count: "85 / 110", color: "bg-[#8B5CF6]" },
              ].map((s) => (
                <div key={s.name} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-800">{s.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">{s.pct}%</span>
                      <span className="text-[10px] text-gray-400">{s.count}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full", s.color)} style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 5. Bottom Row: Recent Quality Inspections Table (8 cols) + Right Panels (4 cols) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Recent Quality Inspections Table (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E1E8E3] p-5 shadow-2xs space-y-4">
            <h3 className="font-display font-bold text-sm text-gray-900">Recent Quality Inspections</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-semibold text-[10px]">
                    <th className="pb-3 w-6">
                      <input type="checkbox" className="rounded-sm" />
                    </th>
                    <th className="pb-3">Inspection ID</th>
                    <th className="pb-3">Order ID</th>
                    <th className="pb-3">Product</th>
                    <th className="pb-3">SKU</th>
                    <th className="pb-3">Stage</th>
                    <th className="pb-3">Result</th>
                    <th className="pb-3">Inspector</th>
                    <th className="pb-3">Inspection Time</th>
                    <th className="pb-3">Remarks</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { id: "QI-20261028-101", ord: "HM-20261028-001", prod: "Men's Running Shoes Size 9", sku: "HM-SHOE-001", stage: "Packing", res: "Passed", resColor: "bg-[#EAF7EF] text-[#087A4A]", insp: "Arjun K", time: "10:18 AM", rem: "Good condition" },
                    { id: "QI-20261028-102", ord: "HM-20261028-002", prod: "Wireless Earbuds Black", sku: "HM-ELC-010", stage: "Quality Check", res: "Rejected", resColor: "bg-red-50 text-red-600", insp: "Priya S", time: "09:55 AM", rem: "Left bud not working" },
                    { id: "QI-20261028-103", ord: "HM-20261028-003", prod: "Backpack 30L Grey", sku: "HM-BAG-003", stage: "Packing", res: "Passed", resColor: "bg-[#EAF7EF] text-[#087A4A]", insp: "Suresh R", time: "09:42 AM", rem: "OK" },
                    { id: "QI-20261028-104", ord: "HM-20261028-004", prod: "Face Wash 100ml", sku: "HM-BEA-002", stage: "Picking", res: "Passed", resColor: "bg-[#EAF7EF] text-[#087A4A]", insp: "Deepak V", time: "09:30 AM", rem: "Label verified" },
                    { id: "QI-20261028-105", ord: "HM-20261028-005", prod: "Rice 5kg", sku: "HM-GRO-015", stage: "Quality Check", res: "Rework", resColor: "bg-purple-50 text-purple-700", insp: "Manoj K", time: "09:12 AM", rem: "Outer pack damaged" },
                    { id: "QI-20261028-106", ord: "HM-20261028-006", prod: "Cooking Oil 1L", sku: "HM-GRO-021", stage: "Final QC", res: "Passed", resColor: "bg-[#EAF7EF] text-[#087A4A]", insp: "Anita S", time: "08:58 AM", rem: "Seal OK" },
                    { id: "QI-20261028-107", ord: "HM-20261028-007", prod: "T-Shirt XL", sku: "HM-TSH-002", stage: "Packing", res: "Rejected", resColor: "bg-red-50 text-red-600", insp: "Vikram D", time: "08:40 AM", rem: "Wrong size" },
                    { id: "QI-20261028-108", ord: "HM-20261028-008", prod: "Face Mask 50pcs", sku: "HM-BEA-009", stage: "Picking", res: "Passed", resColor: "bg-[#EAF7EF] text-[#087A4A]", insp: "Divya M", time: "08:25 AM", rem: "Good" },
                  ].map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50/80 transition">
                      <td className="py-2.5">
                        <input type="checkbox" className="rounded-sm" />
                      </td>
                      <td className="py-2.5 font-semibold text-gray-900 whitespace-nowrap">{row.id}</td>
                      <td className="py-2.5 font-mono text-[10px] text-gray-500 whitespace-nowrap">{row.ord}</td>
                      <td className="py-2.5 font-medium text-gray-900 truncate max-w-[130px]">{row.prod}</td>
                      <td className="py-2.5 font-mono text-[10px] text-gray-500 whitespace-nowrap">{row.sku}</td>
                      <td className="py-2.5 text-gray-600 whitespace-nowrap">{row.stage}</td>
                      <td className="py-2.5">
                        <span className={cn("px-2 py-0.5 rounded-full text-[9px] font-bold whitespace-nowrap", row.resColor)}>
                          {row.res}
                        </span>
                      </td>
                      <td className="py-2.5 text-gray-700 whitespace-nowrap">{row.insp}</td>
                      <td className="py-2.5 font-mono text-[10px] text-gray-500 whitespace-nowrap">{row.time}</td>
                      <td className="py-2.5 text-gray-600 truncate max-w-[100px]">{row.rem}</td>
                      <td className="py-2.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button className="px-2 py-0.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100 text-[10px] font-bold">
                            View
                          </button>
                          <button className="text-gray-400 hover:text-gray-700">
                            <MoreHorizontal className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-500">
              <span>Showing 1-8 of 566 inspections</span>
              <div className="flex items-center gap-1">
                <button className="px-2 py-1 rounded-md border border-gray-200 text-gray-500">&lt;</button>
                <button className="px-2.5 py-1 rounded-md bg-[#087A4A] text-white font-bold">1</button>
                <button className="px-2.5 py-1 rounded-md border border-gray-200 text-gray-700">2</button>
                <button className="px-2.5 py-1 rounded-md border border-gray-200 text-gray-700">3</button>
                <button className="px-2.5 py-1 rounded-md border border-gray-200 text-gray-700">4</button>
                <button className="px-2.5 py-1 rounded-md border border-gray-200 text-gray-700">5</button>
                <span>...</span>
                <button className="px-2.5 py-1 rounded-md border border-gray-200 text-gray-700">57</button>
                <button className="px-2 py-1 rounded-md border border-gray-200 text-gray-500">&gt;</button>
              </div>
            </div>
          </div>

          {/* Right Column: Items Awaiting Inspection + Top Defective Products (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Items Awaiting Inspection */}
            <div className="bg-white rounded-2xl border border-[#E1E8E3] p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-sm text-gray-900">Items Awaiting Inspection</h3>
                <button className="text-xs font-bold text-[#087A4A] hover:underline">View All</button>
              </div>

              <div className="space-y-3 text-xs">
                {[
                  { name: "Men's T-Shirt", sku: "HM-TSH-002", stage: "Packing", stageColor: "bg-blue-50 text-blue-600", time: "10 mins" },
                  { name: "Backpack 30L", sku: "HM-BAG-003", stage: "Quality Check", stageColor: "bg-purple-50 text-purple-700", time: "15 mins" },
                  { name: "Wireless Earbuds", sku: "HM-ELC-010", stage: "Picking", stageColor: "bg-[#EAF7EF] text-[#087A4A]", time: "20 mins" },
                  { name: "Rice 5kg", sku: "HM-GRO-015", stage: "Final QC", stageColor: "bg-amber-50 text-amber-700", time: "25 mins" },
                ].map((item) => (
                  <div key={item.sku} className="flex items-center justify-between p-2 rounded-xl bg-gray-50">
                    <div>
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-[10px] font-mono text-gray-400">{item.sku}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={cn("px-1.5 py-0.5 rounded-md text-[9px] font-bold", item.stageColor)}>
                          {item.stage}
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono">{item.time}</span>
                      </div>
                    </div>

                    <Link
                      href="/warehouse/worker/quality-checker"
                      className="px-3 py-1.5 rounded-xl bg-[#087A4A] hover:bg-[#06653E] text-white text-[11px] font-bold transition shadow-2xs"
                    >
                      Inspect
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Defective Products (Last 7 Days) */}
            <div className="bg-white rounded-2xl border border-[#E1E8E3] p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-sm text-gray-900">Top Defective Products (Last 7 Days)</h3>
                <button className="text-xs font-bold text-[#087A4A] hover:underline">View All</button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-400 font-semibold text-[10px]">
                      <th className="pb-2 w-6">#</th>
                      <th className="pb-2">Product</th>
                      <th className="pb-2">SKU</th>
                      <th className="pb-2 text-center">Defects</th>
                      <th className="pb-2 text-right">% of Defects</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      { num: 1, name: "Men's Running Shoes", sku: "HM-SHOE-001", def: 12, pct: "26%" },
                      { num: 2, name: "Wireless Earbuds", sku: "HM-ELC-010", def: 10, pct: "22%" },
                      { num: 3, name: "Face Wash 100ml", sku: "HM-BEA-002", def: 6, pct: "13%" },
                      { num: 4, name: "Backpack 30L", sku: "HM-BAG-003", def: 5, pct: "11%" },
                      { num: 5, name: "Cooking Oil 1L", sku: "HM-GRO-021", def: 4, pct: "9%" },
                    ].map((p) => (
                      <tr key={p.num} className="hover:bg-gray-50/80 transition">
                        <td className="py-2 text-gray-500 font-semibold">{p.num}</td>
                        <td className="py-2 font-semibold text-gray-900 truncate max-w-[110px]">{p.name}</td>
                        <td className="py-2 font-mono text-[10px] text-gray-400">{p.sku}</td>
                        <td className="py-2 text-center font-bold text-red-600">{p.def}</td>
                        <td className="py-2 text-right font-medium text-gray-700">{p.pct}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WarehouseManagerShell>
  );
}
