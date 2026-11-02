"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Clock,
  Calendar,
  CheckCircle2,
  Target,
  Download,
  Check,
  Search,
  Eye,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  User,
  CalendarClock,
  ChevronDown,
} from "lucide-react";
import { WarehouseManagerShell } from "@/components/warehouse/WarehouseManagerShell";

interface DeadlineTask {
  id: string;
  orderId: string;
  process: string;
  zone: string;
  dueBy: string;
  timeLeft: string;
  priority: "High" | "Medium" | "Low";
  status: "Overdue" | "Due Today" | "Due in 1 Day" | "Due in 2 Days";
  assignedTo?: string;
}

const DEADLINE_TASKS: DeadlineTask[] = [
  {
    id: "TSK-10487",
    orderId: "HM-20261029-0842",
    process: "Picking",
    zone: "A – Receiving",
    dueBy: "23 Oct, 02:30 PM",
    timeLeft: "-2h 18m",
    priority: "High",
    status: "Overdue",
    assignedTo: "R. Praveen (Picker-12)",
  },
  {
    id: "TSK-10488",
    orderId: "HM-20261029-0846",
    process: "Packing",
    zone: "C – Picking",
    dueBy: "23 Oct, 04:00 PM",
    timeLeft: "-48m",
    priority: "High",
    status: "Overdue",
    assignedTo: "K. Mohan (Packer-04)",
  },
  {
    id: "TSK-10489",
    orderId: "HM-20261029-0851",
    process: "Handover",
    zone: "E – Dispatch",
    dueBy: "23 Oct, 05:00 PM",
    timeLeft: "+12m",
    priority: "High",
    status: "Due Today",
    assignedTo: "S. Arjun (Dock-02)",
  },
  {
    id: "TSK-10490",
    orderId: "HM-20261029-0856",
    process: "Picking",
    zone: "B – Storage",
    dueBy: "23 Oct, 05:30 PM",
    timeLeft: "+42m",
    priority: "Medium",
    status: "Due Today",
    assignedTo: "L. Vignesh (Picker-08)",
  },
  {
    id: "TSK-10491",
    orderId: "HM-20261029-0861",
    process: "Packing",
    zone: "D – Packing",
    dueBy: "23 Oct, 06:00 PM",
    timeLeft: "+1h 12m",
    priority: "Medium",
    status: "Due Today",
    assignedTo: "M. Karthik (Packer-02)",
  },
  {
    id: "TSK-10492",
    orderId: "HM-20261029-0863",
    process: "QA Check",
    zone: "C – Picking",
    dueBy: "24 Oct, 10:00 AM",
    timeLeft: "+16h 12m",
    priority: "Medium",
    status: "Due in 1 Day",
    assignedTo: "A. Radhika (QC-01)",
  },
  {
    id: "TSK-10493",
    orderId: "HM-20261029-0867",
    process: "Handover",
    zone: "E – Dispatch",
    dueBy: "24 Oct, 11:00 AM",
    timeLeft: "+17h 12m",
    priority: "Low",
    status: "Due in 1 Day",
    assignedTo: "T. Suresh (Dock-01)",
  },
  {
    id: "TSK-10494",
    orderId: "HM-20261029-0871",
    process: "Picking",
    zone: "A – Receiving",
    dueBy: "24 Oct, 02:00 PM",
    timeLeft: "+20h 12m",
    priority: "Low",
    status: "Due in 1 Day",
    assignedTo: "D. Anand (Picker-05)",
  },
  {
    id: "TSK-10495",
    orderId: "HM-20261029-0874",
    process: "Packing",
    zone: "D – Packing",
    dueBy: "25 Oct, 10:00 AM",
    timeLeft: "+40h 12m",
    priority: "Low",
    status: "Due in 2 Days",
    assignedTo: "P. Nivetha (Packer-06)",
  },
  {
    id: "TSK-10496",
    orderId: "HM-20261029-0876",
    process: "Handover",
    zone: "E – Dispatch",
    dueBy: "25 Oct, 03:00 PM",
    timeLeft: "+45h 12m",
    priority: "Low",
    status: "Due in 2 Days",
    assignedTo: "V. Ganesh (Dock-03)",
  },
];

export default function DeadlineAlertsPage() {
  const [selectedId, setSelectedId] = useState<string>("TSK-10487");
  const [searchQuery, setSearchQuery] = useState("");
  const selectedTask = DEADLINE_TASKS.find((t) => t.id === selectedId) || DEADLINE_TASKS[0];

  return (
    <WarehouseManagerShell
      pageTitle="Deadline Alerts"
      pageDescription="Monitor time-critical tasks, upcoming deadlines, and overdue operations to ensure on-time fulfillment."
      currentPath="/warehouse/capacity/deadline-alerts"
    >
      <div className="space-y-4">
        {/* Breadcrumb & Header Action Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#5B7564] mb-1">
              <Link href="/warehouse/dashboard" className="hover:text-[#087A4A]">Home</Link>
              <span>›</span>
              <Link href="/warehouse/capacity" className="hover:text-[#087A4A]">Capacity & Deadlines</Link>
              <span>›</span>
              <span className="text-[#033129] font-bold">Deadline Alerts</span>
            </div>
            <h1 className="text-xl font-black text-[#033129] tracking-tight">Deadline Alerts</h1>
            <p className="text-xs text-[#5B7564]">
              Monitor time-critical tasks, upcoming deadlines, and overdue operations to ensure on-time fulfillment.
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
            <button className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#087A4A] text-white text-xs font-bold hover:bg-[#06633C] transition shadow-xs">
              <Check className="w-4 h-4 stroke-[2.5]" />
              Mark All as Reviewed
            </button>
          </div>
        </div>

        {/* 6 KPI Metric Cards (Page 33 exact) */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {/* Overdue Tasks */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#FFEBEE] flex items-center justify-center text-[#D32F2F]">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Overdue Tasks</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">5</div>
              <div className="text-[11px] text-[#D32F2F] font-semibold mt-1">
                ↑ +2 vs previous 7 days
              </div>
            </div>
          </div>

          {/* Due Today */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#FFF8E1] flex items-center justify-center text-[#F57F17]">
              <Clock className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Due Today</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">8</div>
              <div className="text-[11px] text-[#5B7564] font-medium mt-1">
                (28.6%)
              </div>
            </div>
          </div>

          {/* Due in 1–2 Days */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#E3F2FD] flex items-center justify-center text-[#1976D2]">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Due in 1–2 Days</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">10</div>
              <div className="text-[11px] text-[#5B7564] font-medium mt-1">
                (35.7%)
              </div>
            </div>
          </div>

          {/* On Track */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">On Track</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">35</div>
              <div className="text-[11px] text-[#5B7564] font-medium mt-1">
                (71.4%)
              </div>
            </div>
          </div>

          {/* Avg. Time to Deadline */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#EDE7F6] flex items-center justify-center text-[#5E35B1]">
              <Clock className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Avg. Time to Deadline</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">6.4 hrs</div>
              <div className="text-[11px] text-[#2E7D32] font-semibold mt-1">
                ↓ -1.2 hrs
              </div>
            </div>
          </div>

          {/* Deadline Adherence */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#E0F7FA] flex items-center justify-center text-[#00838F]">
              <Target className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Deadline Adherence</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">97.1%</div>
              <div className="text-[11px] text-[#2E7D32] font-semibold mt-1">
                ↑ +1.8 pp
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
              placeholder="Search by Task ID, Order ID, or Process..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-[#D5E0D8] text-xs focus:outline-none focus:border-[#087A4A] bg-[#FAFCFA]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select className="px-3 py-1.5 rounded-xl border border-[#D5E0D8] bg-white text-[#2B4738] font-medium focus:outline-none">
              <option>All Process Types</option>
              <option>Picking</option>
              <option>Packing</option>
              <option>QA Check</option>
              <option>Handover</option>
            </select>

            <select className="px-3 py-1.5 rounded-xl border border-[#D5E0D8] bg-white text-[#2B4738] font-medium focus:outline-none">
              <option>All Zones</option>
              <option>A – Receiving</option>
              <option>B – Storage</option>
              <option>C – Picking</option>
              <option>D – Packing</option>
              <option>E – Dispatch</option>
            </select>

            <select className="px-3 py-1.5 rounded-xl border border-[#D5E0D8] bg-white text-[#2B4738] font-medium focus:outline-none">
              <option>All Priority</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

            <select className="px-3 py-1.5 rounded-xl border border-[#D5E0D8] bg-white text-[#2B4738] font-medium focus:outline-none">
              <option>All Statuses</option>
              <option>Overdue</option>
              <option>Due Today</option>
              <option>Due in 1 Day</option>
            </select>

            <button className="p-2 rounded-xl border border-[#CBD8D0] bg-white text-[#5B7564] hover:bg-[#F2F7F4]">
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Main Content: Table + Side Inspector (Matches Page 33 1:1) */}
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
                    <th className="py-2.5 px-3">Task ID</th>
                    <th className="py-2.5 px-3">Order ID</th>
                    <th className="py-2.5 px-3">Process</th>
                    <th className="py-2.5 px-3">Zone</th>
                    <th className="py-2.5 px-3">Due By</th>
                    <th className="py-2.5 px-3">Time Left</th>
                    <th className="py-2.5 px-3">Priority</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDF2EE] text-[#1E3B2F]">
                  {DEADLINE_TASKS.map((row) => {
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
                              row.process === "Picking"
                                ? "bg-[#E3F2FD] text-[#1976D2]"
                                : row.process === "Packing"
                                ? "bg-[#EDE7F6] text-[#5E35B1]"
                                : row.process === "QA Check"
                                ? "bg-[#FFF8E1] text-[#F57F17]"
                                : "bg-[#E8F5E9] text-[#2E7D32]"
                            }`}
                          >
                            {row.process}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-[#5B7564]">{row.zone}</td>
                        <td className="py-2.5 px-3 text-[#7A9385]">{row.dueBy}</td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`font-semibold ${
                              row.timeLeft.startsWith("-")
                                ? "text-[#D32F2F] bg-[#FFEBEE] px-1.5 py-0.5 rounded"
                                : "text-[#2E7D32]"
                            }`}
                          >
                            {row.timeLeft}
                          </span>
                        </td>
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
                        <td className="py-2.5 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              row.status === "Overdue"
                                ? "bg-[#FFEBEE] text-[#D32F2F]"
                                : row.status === "Due Today"
                                ? "bg-[#FFF8E1] text-[#F57F17]"
                                : "bg-[#E3F2FD] text-[#1976D2]"
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
              <div>Showing 1 – 10 of 58 tasks</div>
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
                <button className="w-7 h-7 rounded-lg border border-[#D5E0D8] bg-white flex items-center justify-center hover:bg-[#F2F7F4]">6</button>
                <button className="w-7 h-7 rounded-lg border border-[#D5E0D8] bg-white flex items-center justify-center hover:bg-[#F2F7F4]">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Selected Task Details Inspector (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-[#EDF2EE]">
                <div>
                  <h3 className="font-extrabold text-[#033129] text-sm">Task Details</h3>
                  <div className="text-base font-black text-[#033129] mt-0.5">{selectedTask.id}</div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#FFEBEE] text-[#D32F2F] border border-[#FFCDD2]">
                  {selectedTask.status}
                </span>
              </div>

              {/* Key Specs */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">Order ID</span>
                  <span className="font-semibold text-[#033129]">{selectedTask.orderId}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">Process</span>
                  <span className="font-semibold text-[#1976D2]">{selectedTask.process}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">Zone</span>
                  <span className="font-medium text-[#1E3B2F]">{selectedTask.zone}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">Assigned To</span>
                  <span className="font-semibold text-[#033129]">{selectedTask.assignedTo}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">Due By</span>
                  <span className="font-medium text-[#1E3B2F]">{selectedTask.dueBy}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">Time Left</span>
                  <span className="font-bold text-[#D32F2F]">{selectedTask.timeLeft} (Overdue)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">Priority</span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#FFEBEE] text-[#D32F2F]">
                    {selectedTask.priority}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F7F5]">
                  <span className="text-[#5B7564]">Status</span>
                  <span className="font-bold text-[#D32F2F]">{selectedTask.status}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-3 border-t border-[#EDF2EE]">
              <button className="w-full py-2 px-3 rounded-xl bg-white border border-[#A5D6A7] text-[#2E7D32] text-xs font-bold hover:bg-[#E8F5E9] transition flex items-center justify-center gap-1.5 shadow-xs">
                <Check className="w-4 h-4 stroke-[2.5]" />
                Mark as Completed
              </button>
              <button className="w-full py-2 px-3 rounded-xl bg-white border border-[#CBD8D0] text-[#1E3B2F] text-xs font-semibold hover:bg-[#F2F7F4] transition flex items-center justify-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#5B7564]" />
                Reschedule
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Row Analytics: 4 Cards (Matches Page 33 1:1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Tasks by Deadline Risk Donut */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs">
            <h4 className="text-xs font-extrabold text-[#033129] mb-3">Tasks by Deadline Risk</h4>
            <div className="flex items-center gap-3">
              <div className="relative w-24 h-24 flex-shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  {/* Overdue 8.6% (red) */}
                  <path className="text-[#D32F2F]" strokeDasharray="8.6, 100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Due Today 13.8% (yellow) */}
                  <path className="text-[#FFA000]" strokeDasharray="13.8, 100" strokeDashoffset="-8.6" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Due in 1-2 Days 17.2% (blue) */}
                  <path className="text-[#1976D2]" strokeDasharray="17.2, 100" strokeDashoffset="-22.4" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* On Track 60.4% (green) */}
                  <path className="text-[#2E7D32]" strokeDasharray="60.4, 100" strokeDashoffset="-39.6" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-sm font-black text-[#033129] leading-none">58</span>
                  <span className="text-[9px] text-[#5B7564] font-semibold mt-0.5">Tasks</span>
                </div>
              </div>

              <div className="space-y-1 text-[10px] flex-1">
                <div className="flex justify-between"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#D32F2F]" />Overdue</span><span className="font-bold text-[#D32F2F]">5 (8.6%)</span></div>
                <div className="flex justify-between"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#FFA000]" />Due Today</span><span className="font-bold text-[#033129]">8 (13.8%)</span></div>
                <div className="flex justify-between"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#1976D2]" />Due in 1–2 Days</span><span className="font-bold text-[#033129]">10 (17.2%)</span></div>
                <div className="flex justify-between"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#2E7D32]" />On Track</span><span className="font-bold text-[#033129]">35 (60.4%)</span></div>
              </div>
            </div>
          </div>

          {/* 2. Deadline Trend (Last 7 Days) */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <h4 className="text-xs font-extrabold text-[#033129]">Deadline Trend (Last 7 Days)</h4>
            <div className="h-24 relative mt-2 flex items-end justify-between px-1">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60">
                <line x1="0" y1="10" x2="200" y2="10" stroke="#F0F4F1" strokeWidth="1" />
                <line x1="0" y1="30" x2="200" y2="30" stroke="#F0F4F1" strokeWidth="1" />
                <line x1="0" y1="50" x2="200" y2="50" stroke="#F0F4F1" strokeWidth="1" />

                {/* Green Line: On-Time (12 to 18) */}
                <polyline
                  fill="none"
                  stroke="#2E7D32"
                  strokeWidth="2.5"
                  points="10,38 40,32 70,28 100,26 130,24 160,22 190,20"
                />
                {[
                  [10, 38], [40, 32], [70, 28], [100, 26], [130, 24], [160, 22], [190, 20]
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="2.5" fill="#2E7D32" />
                ))}

                {/* Red Line: Overdue (4 to 5) */}
                <polyline
                  fill="none"
                  stroke="#D32F2F"
                  strokeWidth="2"
                  points="10,50 40,52 70,54 100,52 130,50 160,50 190,48"
                />
                {[
                  [10, 50], [40, 52], [70, 54], [100, 52], [130, 50], [160, 50], [190, 48]
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="2.5" fill="#D32F2F" />
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
            <div className="flex items-center justify-center gap-4 mt-2 text-[10px] text-[#5B7564]">
              <span className="flex items-center gap-1">
                <span className="w-2 h-0.5 bg-[#D32F2F]" /> Overdue
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-0.5 bg-[#2E7D32]" /> On-Time
              </span>
            </div>
          </div>

          {/* 3. Zone-wise Deadline Risk (Stacked Bars) */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs">
            <h4 className="text-xs font-extrabold text-[#033129] mb-3">Zone-wise Deadline Risk</h4>
            <div className="space-y-2 text-xs">
              {[
                { zone: "A – Receiving", total: 12, red: 2, yel: 3, blu: 3, grn: 4 },
                { zone: "B – Storage", total: 9, red: 1, yel: 2, blu: 2, grn: 4 },
                { zone: "C – Picking", total: 14, red: 2, yel: 2, blu: 3, grn: 7 },
                { zone: "D – Packing", total: 11, red: 1, yel: 2, blu: 3, grn: 5 },
                { zone: "E – Dispatch", total: 12, red: 1, yel: 3, blu: 2, grn: 6 },
              ].map((row, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-[#5B7564]">{row.zone}</span>
                    <span className="font-bold text-[#033129]">{row.total}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#F0F4F1] flex overflow-hidden">
                    <div className="h-full bg-[#D32F2F]" style={{ width: `${(row.red / row.total) * 100}%` }} />
                    <div className="h-full bg-[#FFA000]" style={{ width: `${(row.yel / row.total) * 100}%` }} />
                    <div className="h-full bg-[#1976D2]" style={{ width: `${(row.blu / row.total) * 100}%` }} />
                    <div className="h-full bg-[#2E7D32]" style={{ width: `${(row.grn / row.total) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-[8px] text-[#5B7564] mt-2 pt-1 border-t border-[#EDF2EE]">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#D32F2F]" /> Overdue</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#FFA000]" /> Due Today</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#1976D2]" /> Due in 1-2 Days</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]" /> On Track</span>
            </div>
          </div>

          {/* 4. Top Overdue Reasons */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs">
            <h4 className="text-xs font-extrabold text-[#033129] mb-3">Top Overdue Reasons</h4>
            <div className="space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Resource Unavailable</span>
                  <span className="font-bold text-[#033129]">2 (40.0%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#FFCDD2]" style={{ width: "40%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Higher Workload</span>
                  <span className="font-bold text-[#033129]">1 (20.0%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#FFCDD2]" style={{ width: "20%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Inventory Mismatch</span>
                  <span className="font-bold text-[#033129]">1 (20.0%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#FFCDD2]" style={{ width: "20%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">System Delay</span>
                  <span className="font-bold text-[#033129]">1 (20.0%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#FFCDD2]" style={{ width: "20%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WarehouseManagerShell>
  );
}
