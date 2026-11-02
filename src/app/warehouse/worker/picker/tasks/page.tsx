"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ClipboardList,
  Layers,
  Play,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Search,
  RotateCw,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { WarehouseWorkerShell } from "@/components/warehouse/WarehouseWorkerShell";

export default function PickerMyTaskQueuePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [taskType, setTaskType] = useState("All Task Types");
  const [priority, setPriority] = useState("All Priorities");
  const [zone, setZone] = useState("All Zones");
  const [bin, setBin] = useState("All Bins");

  const tasks = [
    { id: "T-7841", orderId: "ORD-20261029-0841", type: "Pick", items: 8, location: "A-12-03", priority: "High", dueIn: "25 min", isDueSoon: true, status: "To Start" },
    { id: "T-7842", orderId: "ORD-20261029-0842", type: "Pick", items: 5, location: "A-14-01", priority: "High", dueIn: "28 min", isDueSoon: true, status: "To Start" },
    { id: "T-7843", orderId: "ORD-20261029-0843", type: "Pack", items: 3, location: "PK-02", priority: "Medium", dueIn: "52 min", isDueSoon: false, status: "To Start" },
    { id: "T-7844", orderId: "ORD-20261029-0844", type: "Inspect", items: 4, location: "QC-01", priority: "Medium", dueIn: "1 hr 10 min", isDueSoon: false, status: "To Start" },
    { id: "T-7845", orderId: "ORD-20261029-0845", type: "Handover", items: 6, location: "HD-03", priority: "Low", dueIn: "1 hr 25 min", isDueSoon: false, status: "To Start" },
    { id: "T-7846", orderId: "ORD-20261029-0846", type: "Pick", items: 10, location: "A-11-02", priority: "High", dueIn: "—", isDueSoon: false, status: "In Progress" },
    { id: "T-7847", orderId: "ORD-20261029-0847", type: "Pick", items: 7, location: "A-11-04", priority: "Medium", dueIn: "—", isDueSoon: false, status: "In Progress" },
    { id: "T-7848", orderId: "ORD-20261029-0848", type: "Pack", items: 4, location: "PK-01", priority: "Medium", dueIn: "—", isDueSoon: false, status: "In Progress" },
  ];

  return (
    <WarehouseWorkerShell
      role="PICKER"
      workerName="Sukant K."
      pageNumber={39}
      currentStep={2}
      title="My Task Queue"
    >
      <div className="space-y-4">
        {/* Title */}
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">My Task Queue</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            All tasks assigned to you for this shift. Pick a task to start or continue.
          </p>
        </div>

        {/* 6 KPIs matching page_39.png */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="bg-[#F0FDF4] border border-[#DCFCE7] rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-gray-600">Total Tasks</span>
              <div className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center text-green-700">
                <ClipboardList className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold text-gray-900">12</span>
            </div>
          </div>

          <div className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-gray-600">To Start</span>
              <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold text-gray-900">5</span>
            </div>
          </div>

          <div className="bg-[#FEFCE8] border border-[#FEF9C3] rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-gray-600">In Progress</span>
              <div className="w-7 h-7 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-700">
                <Play className="w-4 h-4 fill-yellow-700" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold text-gray-900">3</span>
            </div>
          </div>

          <div className="bg-[#FAF5FF] border border-[#F3E8FF] rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-gray-600">Completed</span>
              <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold text-gray-900">18</span>
              <p className="text-[10px] text-purple-700 font-semibold mt-0.5">(Today)</p>
            </div>
          </div>

          <div className="bg-[#FEF2F2] border border-[#FEE2E2] rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-gray-600">High Priority</span>
              <div className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center text-red-700">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold text-gray-900">4</span>
            </div>
          </div>

          <div className="bg-[#FEFCE8] border border-[#FEF9C3] rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-gray-600">Due Soon</span>
              <div className="w-7 h-7 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-700">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold text-gray-900">2</span>
              <p className="text-[10px] text-yellow-700 font-semibold mt-0.5">(≤ 30 min)</p>
            </div>
          </div>
        </div>

        {/* Filters Bar matching page_39.png */}
        <div className="bg-white border border-gray-200 rounded-xl p-2.5 flex flex-wrap items-center gap-2.5 shadow-2xs">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Order ID, SKU, or Task ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-600"
            />
          </div>
          <select
            value={taskType}
            onChange={(e) => setTaskType(e.target.value)}
            className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 focus:outline-none"
          >
            <option>All Task Types</option>
            <option>Pick</option>
            <option>Pack</option>
            <option>Inspect</option>
            <option>Handover</option>
          </select>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 focus:outline-none"
          >
            <option>All Priorities</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <select
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 focus:outline-none"
          >
            <option>All Zones</option>
            <option>Zone A</option>
            <option>Zone B</option>
            <option>Zone C</option>
          </select>
          <select
            value={bin}
            onChange={(e) => setBin(e.target.value)}
            className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 focus:outline-none"
          >
            <option>All Bins</option>
            <option>A-12-03</option>
            <option>A-14-01</option>
            <option>PK-02</option>
            <option>QC-01</option>
          </select>
          <button
            onClick={() => {
              setSearchQuery("");
              setTaskType("All Task Types");
              setPriority("All Priorities");
              setZone("All Zones");
              setBin("All Bins");
            }}
            className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-100 text-gray-600"
            title="Refresh"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Main Content Row: Table + Right Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Table (8 cols / ~70%) */}
          <div className="lg:col-span-8 bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] text-left">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-semibold">
                    <th className="pb-2 w-6">
                      <input type="checkbox" className="rounded border-gray-300 text-green-600" />
                    </th>
                    <th className="pb-2">Task ID</th>
                    <th className="pb-2">Order ID</th>
                    <th className="pb-2">Task Type</th>
                    <th className="pb-2">Items</th>
                    <th className="pb-2">Bin / Location</th>
                    <th className="pb-2">Priority</th>
                    <th className="pb-2">Due In</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2 w-6"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {tasks.map((t) => (
                    <tr
                      key={t.id}
                      className="hover:bg-gray-50 transition cursor-pointer"
                      onClick={() => (window.location.href = "/warehouse/worker/picker/current")}
                    >
                      <td className="py-2.5" onClick={(e) => e.stopPropagation()}>
                        <input type="checkbox" className="rounded border-gray-300 text-green-600" />
                      </td>
                      <td className="py-2.5 font-mono font-bold text-gray-800">{t.id}</td>
                      <td className="py-2.5 font-mono text-gray-700">{t.orderId}</td>
                      <td className="py-2.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1 w-fit ${
                            t.type === "Pick"
                              ? "bg-blue-50 text-blue-700"
                              : t.type === "Pack"
                              ? "bg-yellow-50 text-yellow-700"
                              : t.type === "Inspect"
                              ? "bg-purple-50 text-purple-700"
                              : "bg-green-50 text-green-700"
                          }`}
                        >
                          {t.type}
                        </span>
                      </td>
                      <td className="py-2.5 text-gray-800 font-medium">{t.items}</td>
                      <td className="py-2.5 font-mono text-gray-700">{t.location}</td>
                      <td className="py-2.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            t.priority === "High"
                              ? "bg-red-50 text-red-600"
                              : t.priority === "Medium"
                              ? "bg-yellow-50 text-yellow-700"
                              : "bg-green-50 text-green-700"
                          }`}
                        >
                          {t.priority}
                        </span>
                      </td>
                      <td className="py-2.5">
                        {t.dueIn !== "—" ? (
                          <span
                            className={`flex items-center gap-1 font-medium ${
                              t.isDueSoon ? "text-red-600 font-bold" : "text-gray-600"
                            }`}
                          >
                            <Clock className="w-3 h-3 text-red-500" />
                            {t.dueIn}
                          </span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="py-2.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                            t.status === "In Progress"
                              ? "bg-blue-50 text-blue-700 font-bold"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {t.status}
                        </span>
                      </td>
                      <td className="py-2.5 text-right">
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span>Showing 1 – 8 of 12 tasks</span>
              <div className="flex items-center gap-1">
                <button className="px-2 py-1 rounded border border-gray-200 text-gray-500 hover:bg-gray-50 text-xs">
                  &lt;
                </button>
                <button className="px-2.5 py-1 rounded bg-[#033129] text-white font-bold text-xs">1</button>
                <button className="px-2.5 py-1 rounded border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs">2</button>
                <button className="px-2 py-1 rounded border border-gray-200 text-gray-500 hover:bg-gray-50 text-xs">
                  &gt;
                </button>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols / ~30%): Task Summary + Next Task */}
          <div className="lg:col-span-4 space-y-4">
            {/* Task Summary Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-2xs">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-md bg-green-100 flex items-center justify-center text-green-700">
                  <ClipboardList className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-bold text-gray-900 tracking-tight">Task Summary</h3>
              </div>

              <div className="flex items-center justify-between">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="38" stroke="#E5E7EB" strokeWidth="12" fill="none" />
                    {/* Pick 50% */}
                    <circle cx="50" cy="50" r="38" stroke="#3B82F6" strokeWidth="12" fill="none" strokeDasharray="238.7" strokeDashoffset={238.7 * (1 - 0.5)} />
                    {/* Pack 16.7% */}
                    <circle cx="50" cy="50" r="38" stroke="#EAB308" strokeWidth="12" fill="none" strokeDasharray="238.7" strokeDashoffset={238.7 * (1 - 0.167)} style={{ transform: "rotate(180deg)", transformOrigin: "center" }} />
                    {/* Inspect 8.3% */}
                    <circle cx="50" cy="50" r="38" stroke="#A855F7" strokeWidth="12" fill="none" strokeDasharray="238.7" strokeDashoffset={238.7 * (1 - 0.083)} style={{ transform: "rotate(240deg)", transformOrigin: "center" }} />
                    {/* Handover 8.3% */}
                    <circle cx="50" cy="50" r="38" stroke="#10B981" strokeWidth="12" fill="none" strokeDasharray="238.7" strokeDashoffset={238.7 * (1 - 0.083)} style={{ transform: "rotate(270deg)", transformOrigin: "center" }} />
                    {/* Others 16.7% */}
                    <circle cx="50" cy="50" r="38" stroke="#9CA3AF" strokeWidth="12" fill="none" strokeDasharray="238.7" strokeDashoffset={238.7 * (1 - 0.167)} style={{ transform: "rotate(300deg)", transformOrigin: "center" }} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-sm font-bold text-gray-900">12</span>
                    <span className="text-[9px] text-gray-500 font-semibold">Tasks</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-[10px] flex-1 pl-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-xs bg-[#3B82F6]" /> Pick</span>
                    <span className="font-bold text-gray-900">6 (50.0%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-xs bg-[#EAB308]" /> Pack</span>
                    <span className="font-bold text-gray-900">2 (16.7%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-xs bg-[#A855F7]" /> Inspect</span>
                    <span className="font-bold text-gray-900">1 (8.3%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-xs bg-[#10B981]" /> Handover</span>
                    <span className="font-bold text-gray-900">1 (8.3%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-xs bg-[#9CA3AF]" /> Others</span>
                    <span className="font-bold text-gray-900">2 (16.7%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Task Card */}
            <div className="bg-[#FEFCE8] border border-[#FEF08A] rounded-xl p-4 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-700">
                    <Play className="w-3.5 h-3.5 fill-yellow-700" />
                  </div>
                  <h3 className="text-xs font-bold text-gray-900 tracking-tight">Next Task</h3>
                </div>
              </div>

              <div className="bg-white/80 rounded-xl p-3 border border-yellow-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-gray-900">T-7841</span>
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-bold">Pick</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-red-50 text-red-600 text-[10px] font-bold">High</span>
                </div>
                <div className="text-[11px] text-gray-600 space-y-0.5">
                  <p>Order: <strong className="font-mono text-gray-800">ORD-20261029-0841</strong></p>
                  <p>Items: <strong className="text-gray-800">8</strong> &nbsp;|&nbsp; Location: <strong className="font-mono text-gray-800">A-12-03</strong></p>
                </div>
              </div>

              <Link
                href="/warehouse/worker/picker/current"
                className="w-full py-2.5 bg-[#033129] hover:bg-[#05463b] text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-2xs"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                Start Task
              </Link>
            </div>
          </div>
        </div>
      </div>
    </WarehouseWorkerShell>
  );
}
