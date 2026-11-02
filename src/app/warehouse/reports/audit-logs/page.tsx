"use client";

import React, { useState } from "react";
import {
  FileText,
  Users,
  Layers,
  Key,
  AlertTriangle,
  ShieldCheck,
  Search,
  RotateCw,
  Download,
  Calendar,
  ExternalLink,
  ChevronDown,
  Lightbulb,
} from "lucide-react";
import { WarehouseManagerShell } from "@/components/warehouse/WarehouseManagerShell";

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  userEmail: string;
  module: string;
  action: "Create" | "Update" | "Delete" | "Login";
  description: string;
  referenceId: string;
  status: "Success" | "Failed";
  previousValue?: string;
  newValue?: string;
}

const AUDIT_LOGS: AuditLog[] = [
  {
    id: "1",
    timestamp: "Oct 29, 2026, 06:42 PM",
    user: "R. Praveen",
    userEmail: "praveen@hypermart.com",
    module: "Orders",
    action: "Update",
    description: "Order status changed to Dispatched",
    referenceId: "ORD-20261029-0842",
    status: "Success",
    previousValue: "Processing",
    newValue: "Dispatched",
  },
  {
    id: "2",
    timestamp: "Oct 29, 2026, 06:31 PM",
    user: "K. Divya",
    userEmail: "divya@hypermart.com",
    module: "Inventory",
    action: "Create",
    description: "New stock entry added (SKU: HM-4183)",
    referenceId: "STK-20261029-0187",
    status: "Success",
    previousValue: "0 Units",
    newValue: "+150 Units",
  },
  {
    id: "3",
    timestamp: "Oct 29, 2026, 06:20 PM",
    user: "S. Arjun",
    userEmail: "arjun@hypermart.com",
    module: "Picking",
    action: "Update",
    description: "Picklist completed (20 items)",
    referenceId: "PCK-20261029-0671",
    status: "Success",
    previousValue: "In Progress",
    newValue: "Completed",
  },
  {
    id: "4",
    timestamp: "Oct 29, 2026, 05:58 PM",
    user: "M. Karthik",
    userEmail: "karthik@hypermart.com",
    module: "Packing",
    action: "Update",
    description: "Packing done for Order ORD-0841",
    referenceId: "PKG-20261029-0449",
    status: "Success",
    previousValue: "Packing",
    newValue: "Packed",
  },
  {
    id: "5",
    timestamp: "Oct 29, 2026, 05:44 PM",
    user: "P. Nivetha",
    userEmail: "nivetha@hypermart.com",
    module: "Exceptions",
    action: "Create",
    description: "Exception raised: Item mismatch",
    referenceId: "EXP-20261029-0026",
    status: "Success",
    previousValue: "None",
    newValue: "Open",
  },
  {
    id: "6",
    timestamp: "Oct 29, 2026, 05:32 PM",
    user: "R. Praveen",
    userEmail: "praveen@hypermart.com",
    module: "Courier Handover",
    action: "Update",
    description: "Handover marked to BlueDart",
    referenceId: "CH-20261029-0312",
    status: "Success",
    previousValue: "Pending Pickup",
    newValue: "Picked Up",
  },
  {
    id: "7",
    timestamp: "Oct 29, 2026, 05:21 PM",
    user: "Admin",
    userEmail: "admin@hypermart.com",
    module: "Users",
    action: "Update",
    description: "User role updated for K. Divya",
    referenceId: "USR-20261029-0078",
    status: "Success",
    previousValue: "Picker",
    newValue: "Inventory Specialist",
  },
  {
    id: "8",
    timestamp: "Oct 29, 2026, 05:10 PM",
    user: "S. Arjun",
    userEmail: "arjun@hypermart.com",
    module: "Inventory",
    action: "Delete",
    description: "Removed damaged stock (SKU: HM-2761)",
    referenceId: "STK-20261029-0185",
    status: "Success",
    previousValue: "20 Units",
    newValue: "-20 Units (Damaged)",
  },
  {
    id: "9",
    timestamp: "Oct 29, 2026, 04:58 PM",
    user: "K. Divya",
    userEmail: "divya@hypermart.com",
    module: "Orders",
    action: "Create",
    description: "New order created (12 items)",
    referenceId: "ORD-20261029-0841",
    status: "Success",
    previousValue: "None",
    newValue: "Created",
  },
  {
    id: "10",
    timestamp: "Oct 29, 2026, 04:47 PM",
    user: "System",
    userEmail: "system@hypermart.com",
    module: "System",
    action: "Login",
    description: "User login successful (R. Praveen)",
    referenceId: "LOG-20261029-2391",
    status: "Success",
    previousValue: "Offline",
    newValue: "Active Session",
  },
];

export default function AuditLogsPage() {
  const [selectedLog, setSelectedLog] = useState<AuditLog>(AUDIT_LOGS[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState("All Users");
  const [selectedModule, setSelectedModule] = useState("All Modules");
  const [selectedAction, setSelectedAction] = useState("All Actions");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");

  return (
    <WarehouseManagerShell pageNumber={37} title="Audit Logs" currentPath="/warehouse/reports/audit-logs">
      <div className="space-y-4">
        {/* Top Header matching page_37.png */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Audit Logs</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Track and review system activities, user actions, and critical changes across the warehouse.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 shadow-2xs hover:bg-gray-50">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <span>Oct 23, 2026 – Oct 29, 2026</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </button>
            <button
              onClick={() => alert("Exporting audit logs...")}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 shadow-2xs hover:bg-gray-50"
            >
              <Download className="w-3.5 h-3.5 text-gray-500" />
              <span>Export</span>
            </button>
            <button
              onClick={() => alert("Downloading raw audit logs...")}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#033129] text-white rounded-lg text-xs font-semibold hover:bg-[#05463b] shadow-2xs transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Logs</span>
            </button>
          </div>
        </div>

        {/* 6 KPI Cards matching page_37.png */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Card 1 */}
          <div className="bg-[#F0FDF4] border border-[#DCFCE7] rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-gray-600">Total Log Events</span>
              <div className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center text-green-700">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold text-gray-900">48,726</span>
              <p className="text-[10px] text-green-700 font-semibold mt-0.5">↑ +12.8% vs last 7 days</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-gray-600">Unique Users</span>
              <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold text-gray-900">62</span>
              <p className="text-[10px] text-blue-700 font-semibold mt-0.5">(Active)</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#FEFCE8] border border-[#FEF9C3] rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-gray-600">Modules Accessed</span>
              <div className="w-7 h-7 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-700">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold text-gray-900">8</span>
              <p className="text-[10px] text-yellow-700 font-semibold mt-0.5">(100%)</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-[#FAF5FF] border border-[#F3E8FF] rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-gray-600">Critical Actions</span>
              <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700">
                <Key className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold text-gray-900">342</span>
              <p className="text-[10px] text-purple-700 font-semibold mt-0.5">(0.7%)</p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-[#FEF2F2] border border-[#FEE2E2] rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-gray-600">Failed Actions</span>
              <div className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center text-red-700">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold text-gray-900">96</span>
              <p className="text-[10px] text-red-600 font-semibold mt-0.5">(0.2%)</p>
            </div>
          </div>

          {/* Card 6 */}
          <div className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-gray-600">Compliance</span>
              <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold text-gray-900">99.8%</span>
              <p className="text-[10px] text-green-700 font-semibold mt-0.5">↑ +0.3 pp</p>
            </div>
          </div>
        </div>

        {/* Filters Bar matching page_37.png */}
        <div className="bg-white border border-gray-200 rounded-xl p-2.5 flex flex-wrap items-center gap-2.5 shadow-2xs">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by User, Action, or Reference ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-600"
            />
          </div>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 focus:outline-none"
          >
            <option>All Users</option>
            <option>R. Praveen</option>
            <option>K. Divya</option>
            <option>S. Arjun</option>
            <option>M. Karthik</option>
            <option>P. Nivetha</option>
            <option>Admin</option>
            <option>System</option>
          </select>
          <select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 focus:outline-none"
          >
            <option>All Modules</option>
            <option>Orders</option>
            <option>Inventory</option>
            <option>Picking</option>
            <option>Packing</option>
            <option>Exceptions</option>
            <option>Courier Handover</option>
            <option>Users</option>
            <option>System</option>
          </select>
          <select
            value={selectedAction}
            onChange={(e) => setSelectedAction(e.target.value)}
            className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 focus:outline-none"
          >
            <option>All Actions</option>
            <option>Create</option>
            <option>Update</option>
            <option>Delete</option>
            <option>Login</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 focus:outline-none"
          >
            <option>All Statuses</option>
            <option>Success</option>
            <option>Failed</option>
          </select>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedUser("All Users");
              setSelectedModule("All Modules");
              setSelectedAction("All Actions");
              setSelectedStatus("All Statuses");
            }}
            className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-100 text-gray-600"
            title="Refresh"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Row 2: Main Table + Right Details Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Table (8 cols / ~70%) */}
          <div className="lg:col-span-8 bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs">
            <h2 className="text-xs font-bold text-gray-900 tracking-tight">Audit Log Records (48,726)</h2>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-[11px] text-left">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-semibold">
                    <th className="pb-2 w-6">
                      <input type="checkbox" className="rounded border-gray-300 text-green-600" />
                    </th>
                    <th className="pb-2">Timestamp ↕</th>
                    <th className="pb-2">User</th>
                    <th className="pb-2">Module</th>
                    <th className="pb-2">Action</th>
                    <th className="pb-2">Description</th>
                    <th className="pb-2">Reference ID</th>
                    <th className="pb-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {AUDIT_LOGS.map((log) => {
                    const isSelected = selectedLog.id === log.id;
                    return (
                      <tr
                        key={log.id}
                        onClick={() => setSelectedLog(log)}
                        className={`cursor-pointer transition ${
                          isSelected ? "bg-green-50/50" : "hover:bg-gray-50/80"
                        }`}
                      >
                        <td className="py-2.5">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => setSelectedLog(log)}
                            className="rounded border-gray-300 text-green-600"
                          />
                        </td>
                        <td className="py-2.5 text-gray-500 whitespace-nowrap">{log.timestamp}</td>
                        <td className="py-2.5 font-medium text-gray-800 whitespace-nowrap">{log.user}</td>
                        <td className="py-2.5 text-gray-600">{log.module}</td>
                        <td className="py-2.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              log.action === "Create"
                                ? "bg-green-50 text-green-700"
                                : log.action === "Update"
                                ? "bg-blue-50 text-blue-700"
                                : log.action === "Delete"
                                ? "bg-red-50 text-red-700"
                                : "bg-purple-50 text-purple-700"
                            }`}
                          >
                            {log.action}
                          </span>
                        </td>
                        <td className="py-2.5 text-gray-700 max-w-[200px] truncate">{log.description}</td>
                        <td className="py-2.5 font-mono text-[10px] text-gray-600">{log.referenceId}</td>
                        <td className="py-2.5 text-right">
                          <span className="px-2 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px]">
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span>Showing 1 – 10 of 48,726 logs</span>
              <div className="flex items-center gap-1">
                <button className="px-2 py-1 rounded border border-gray-200 text-gray-500 hover:bg-gray-50 text-xs">
                  &lt;
                </button>
                <button className="px-2.5 py-1 rounded bg-[#033129] text-white font-bold text-xs">1</button>
                <button className="px-2.5 py-1 rounded border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs">2</button>
                <button className="px-2.5 py-1 rounded border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs">3</button>
                <button className="px-2.5 py-1 rounded border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs">4</button>
                <button className="px-2.5 py-1 rounded border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs">5</button>
                <span className="px-1 text-gray-400">...</span>
                <button className="px-2 py-1 rounded border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs">4,873</button>
                <button className="px-2 py-1 rounded border border-gray-200 text-gray-500 hover:bg-gray-50 text-xs">
                  &gt;
                </button>
              </div>
            </div>
          </div>

          {/* Right Log Details Panel (4 cols / ~30%) */}
          <div className="lg:col-span-4 bg-white border border-gray-200 rounded-xl p-4 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h2 className="text-xs font-bold text-gray-900 tracking-tight">Log Details</h2>
                <ExternalLink className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-gray-600" />
              </div>

              <div className="mt-3.5 space-y-3 text-[11px]">
                <div className="flex justify-between items-center py-1 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Reference ID</span>
                  <span className="font-mono font-bold text-gray-800">{selectedLog.referenceId}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Timestamp</span>
                  <span className="text-gray-800">{selectedLog.timestamp}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">User</span>
                  <span className="text-gray-800 text-right">{selectedLog.user} ({selectedLog.userEmail})</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Module</span>
                  <span className="text-gray-800">{selectedLog.module}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Action</span>
                  <span className="font-semibold text-gray-800">{selectedLog.action}</span>
                </div>
                <div className="py-1 border-b border-gray-50">
                  <span className="text-gray-500 font-medium block mb-1">Description</span>
                  <span className="text-gray-800 leading-relaxed font-medium">{selectedLog.description}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Previous Value</span>
                  <span className="text-gray-600 font-mono text-[10px]">{selectedLog.previousValue || "—"}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">New Value</span>
                  <span className="text-gray-800 font-mono text-[10px] font-semibold">{selectedLog.newValue || "—"}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-500 font-medium">Status</span>
                  <span className="px-2 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px]">
                    {selectedLog.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => alert(`Printing audit certificate for ${selectedLog.referenceId}`)}
                className="w-full py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 transition"
              >
                Inspect Raw JSON Payload
              </button>
            </div>
          </div>
        </div>

        {/* Row 3 (4 cols): Activity Trend, Activities by Module, Top User Activity, Audit Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Activity Trend (Last 7 Days) */}
          <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs">
            <h2 className="text-xs font-bold text-gray-900 tracking-tight">Activity Trend (Last 7 Days)</h2>
            <div className="mt-3 relative h-40">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 240 120" preserveAspectRatio="none">
                {[0, 30, 60, 90, 120].map((y, i) => (
                  <line key={i} x1="20" y1={y} x2="235" y2={y} stroke="#F3F4F6" strokeDasharray="2,2" strokeWidth="1" />
                ))}
                <path
                  d="M 20 85 L 55 76 L 90 70 L 125 66 L 160 62 L 195 56 L 230 46"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2.5"
                />
                <polygon
                  points="20,85 55,76 90,70 125,66 160,62 195,56 230,46 230,120 20,120"
                  fill="url(#auditGrad)"
                  opacity="0.15"
                />
                {[[20,85],[55,76],[90,70],[125,66],[160,62],[195,56],[230,46]].map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r="3" fill="#10B981" stroke="#fff" strokeWidth="1" />
                ))}
                <defs>
                  <linearGradient id="auditGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#ffffff" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="flex items-center justify-between text-[10px] text-gray-400 mt-1 px-1">
              <span>Oct 23</span>
              <span>Oct 24</span>
              <span>Oct 25</span>
              <span>Oct 26</span>
              <span>Oct 27</span>
              <span>Oct 28</span>
              <span>Oct 29</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-[10px] mt-2 pt-2 border-t border-gray-100 font-medium text-gray-700">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#10B981]" /> Log Events
            </div>
          </div>

          {/* Card 2: Activities by Module */}
          <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs">
            <h2 className="text-xs font-bold text-gray-900 tracking-tight">Activities by Module</h2>
            <div className="mt-2 flex items-center justify-between">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" stroke="#E5E7EB" strokeWidth="12" fill="none" />
                  <circle cx="50" cy="50" r="38" stroke="#EF4444" strokeWidth="12" fill="none" strokeDasharray="238.7" strokeDashoffset={238.7 * (1 - 0.228)} />
                  <circle cx="50" cy="50" r="38" stroke="#F97316" strokeWidth="12" fill="none" strokeDasharray="238.7" strokeDashoffset={238.7 * (1 - 0.186)} style={{ transform: "rotate(82deg)", transformOrigin: "center" }} />
                  <circle cx="50" cy="50" r="38" stroke="#10B981" strokeWidth="12" fill="none" strokeDasharray="238.7" strokeDashoffset={238.7 * (1 - 0.143)} style={{ transform: "rotate(149deg)", transformOrigin: "center" }} />
                  <circle cx="50" cy="50" r="38" stroke="#EC4899" strokeWidth="12" fill="none" strokeDasharray="238.7" strokeDashoffset={238.7 * (1 - 0.121)} style={{ transform: "rotate(200deg)", transformOrigin: "center" }} />
                  <circle cx="50" cy="50" r="38" stroke="#EAB308" strokeWidth="12" fill="none" strokeDasharray="238.7" strokeDashoffset={238.7 * (1 - 0.089)} style={{ transform: "rotate(244deg)", transformOrigin: "center" }} />
                  <circle cx="50" cy="50" r="38" stroke="#3B82F6" strokeWidth="12" fill="none" strokeDasharray="238.7" strokeDashoffset={238.7 * (1 - 0.068)} style={{ transform: "rotate(276deg)", transformOrigin: "center" }} />
                  <circle cx="50" cy="50" r="38" stroke="#8B5CF6" strokeWidth="12" fill="none" strokeDasharray="238.7" strokeDashoffset={238.7 * (1 - 0.052)} style={{ transform: "rotate(300deg)", transformOrigin: "center" }} />
                  <circle cx="50" cy="50" r="38" stroke="#9CA3AF" strokeWidth="12" fill="none" strokeDasharray="238.7" strokeDashoffset={238.7 * (1 - 0.113)} style={{ transform: "rotate(319deg)", transformOrigin: "center" }} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xs font-bold text-gray-900">48,726</span>
                  <span className="text-[9px] text-gray-500 font-semibold">Logs</span>
                </div>
              </div>
              <div className="space-y-1 text-[10px] flex-1 pl-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-xs bg-[#EF4444]" /> Orders</span>
                  <span className="font-bold text-gray-900">22.8%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-xs bg-[#F97316]" /> Inventory</span>
                  <span className="font-bold text-gray-900">18.6%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-xs bg-[#10B981]" /> Picking</span>
                  <span className="font-bold text-gray-900">14.3%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-xs bg-[#EC4899]" /> Packing</span>
                  <span className="font-bold text-gray-900">12.1%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-xs bg-[#EAB308]" /> Handover</span>
                  <span className="font-bold text-gray-900">8.9%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-xs bg-[#3B82F6]" /> Exceptions</span>
                  <span className="font-bold text-gray-900">6.8%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-xs bg-[#8B5CF6]" /> Users</span>
                  <span className="font-bold text-gray-900">5.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-xs bg-[#9CA3AF]" /> System</span>
                  <span className="font-bold text-gray-900">11.3%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Top User Activity */}
          <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs">
            <h2 className="text-xs font-bold text-gray-900 tracking-tight">Top User Activity (Log Events)</h2>
            <div className="mt-3 space-y-2.5">
              <div>
                <div className="flex justify-between text-[11px] font-medium mb-1">
                  <span className="text-gray-700">R. Praveen</span>
                  <span className="text-gray-900 font-bold">6,842 (14.0%)</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#15803D] h-full rounded-full" style={{ width: "70%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] font-medium mb-1">
                  <span className="text-gray-700">K. Divya</span>
                  <span className="text-gray-900 font-bold">6,128 (12.6%)</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#15803D] h-full rounded-full" style={{ width: "63%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] font-medium mb-1">
                  <span className="text-gray-700">S. Arjun</span>
                  <span className="text-gray-900 font-bold">5,972 (12.3%)</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#15803D] h-full rounded-full" style={{ width: "61%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] font-medium mb-1">
                  <span className="text-gray-700">M. Karthik</span>
                  <span className="text-gray-900 font-bold">4,816 (9.9%)</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#4ADE80] h-full rounded-full" style={{ width: "49%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] font-medium mb-1">
                  <span className="text-gray-700">P. Nivetha</span>
                  <span className="text-gray-900 font-bold">4,120 (8.5%)</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#4ADE80] h-full rounded-full" style={{ width: "42%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Audit Insights */}
          <div className="bg-[#FEFCE8] border border-[#FEF08A] rounded-xl p-3.5 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-yellow-100 flex items-center justify-center text-yellow-700">
                  <Lightbulb className="w-3.5 h-3.5" />
                </div>
                <h2 className="text-xs font-bold text-gray-900 tracking-tight">Audit Insights</h2>
              </div>
              <ul className="mt-3 space-y-2 text-[11px] text-gray-700 leading-relaxed font-medium">
                <li className="flex items-start gap-1.5">
                  <span className="text-green-700 font-bold">✓</span>
                  <span><strong>48,726 total log events</strong> (+12.8% vs last week).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-green-700 font-bold">✓</span>
                  <span><strong>8 modules accessed</strong> with 99.8% compliance.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-green-700 font-bold">✓</span>
                  <span><strong>342 critical actions</strong> (0.7% of total).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-green-700 font-bold">✓</span>
                  <span><strong>96 failed actions</strong> (0.2%), within acceptable range.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-green-700 font-bold">✓</span>
                  <span>Highest activity in <strong>Orders (22.8%)</strong>.</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-yellow-200/60 flex items-center justify-between text-[10px] text-yellow-800">
              <span>Audited: Real-time</span>
              <span className="font-semibold">Compliance: 99.8%</span>
            </div>
          </div>
        </div>
      </div>
    </WarehouseManagerShell>
  );
}
