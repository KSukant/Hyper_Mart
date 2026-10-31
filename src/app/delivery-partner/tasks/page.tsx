'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  MapPin,
  Package as PackageIcon,
  Clock,
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  Filter,
  AlertCircle,
  Truck,
  CheckCircle2,
  XCircle,
  Calendar,
  Layers,
  ArrowUpDown,
} from 'lucide-react';
import { useDeliveryStore } from '@/store/deliveryStore';
import type { DeliveryTask, DeliveryStatus, DeliveryTag } from '@/types/delivery';
import { cn } from '@/lib/cn';

type StatusFilter = 'all' | 'active' | 'en_route' | 'delivered' | 'failed' | 'rescheduled';

export default function DeliveryTasksPage() {
  const { tasks, taskFilter, setTaskFilter, taskSearch, setTaskSearch } = useDeliveryStore();

  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Status Counts
  const counts = useMemo(() => {
    return {
      all: tasks.length,
      active: tasks.filter((t) => t.status === 'active').length,
      en_route: tasks.filter((t) => t.status === 'en_route').length,
      delivered: tasks.filter((t) => t.status === 'delivered').length,
      failed: tasks.filter((t) => t.status === 'failed').length,
      rescheduled: tasks.filter((t) => t.status === 'rescheduled').length,
    };
  }, [tasks]);

  // Filter & Search
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      // Status filter
      if (taskFilter !== 'all' && t.status !== taskFilter) {
        return false;
      }
      // Tag filter
      if (activeTag) {
        if (activeTag === 'delayed') {
          if (t.status !== 'failed' && t.status !== 'rescheduled') return false;
        } else if (!t.tags.includes(activeTag as DeliveryTag)) {
          return false;
        }
      }
      // Search
      if (taskSearch.trim()) {
        const q = taskSearch.toLowerCase().trim();
        const matchOrder = t.orderId.toLowerCase().includes(q);
        const matchTask = t.id.toLowerCase().includes(q);
        const matchCustomer = t.customerName.toLowerCase().includes(q);
        const matchAddress = t.address.toLowerCase().includes(q);
        const matchPkg = t.packages.some((p) => p.id.toLowerCase().includes(q));
        if (!matchOrder && !matchTask && !matchCustomer && !matchAddress && !matchPkg) {
          return false;
        }
      }
      return true;
    });
  }, [tasks, taskFilter, activeTag, taskSearch]);

  const totalPages = Math.ceil(filteredTasks.length / pageSize) || 1;
  const paginatedTasks = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredTasks.slice(start, start + pageSize);
  }, [filteredTasks, currentPage, pageSize]);

  return (
    <div className="space-y-5 pb-8">
      {/* ── Page Header ── */}
      <div>
        <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
          Delivery Operations
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-black text-gray-900 mt-0.5 tracking-tight">
          My Delivery Tasks
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
          View and manage all assigned orders, packages and delivery stops.
        </p>
      </div>

      {/* ── Search Bar ── */}
      <div className="relative">
        <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={taskSearch}
          onChange={(e) => {
            setTaskSearch(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search by order ID, task ID or package ID..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#073922]/20 focus:border-[#073922] transition shadow-xs"
        />
        {taskSearch && (
          <button
            onClick={() => setTaskSearch('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 hover:text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full"
          >
            Clear
          </button>
        )}
      </div>

      {/* ── Filter Bars ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-gray-200 shadow-xs">
        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          {[
            { id: 'all', label: 'All', count: counts.all, color: '' },
            { id: 'active', label: 'Active', count: counts.active, dot: 'bg-emerald-500' },
            { id: 'en_route', label: 'En route', count: counts.en_route, dot: 'bg-blue-500' },
            { id: 'delivered', label: 'Delivered', count: counts.delivered, dot: 'bg-emerald-600' },
            { id: 'failed', label: 'Failed', count: counts.failed, dot: 'bg-rose-500' },
            { id: 'rescheduled', label: 'Rescheduled', count: counts.rescheduled, dot: 'bg-amber-500' },
          ].map((item) => {
            const isSelected = taskFilter === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setTaskFilter(item.id as StatusFilter);
                  setCurrentPage(1);
                }}
                className={cn(
                  'flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer',
                  isSelected
                    ? 'bg-[#073922] text-[#C6F04A] shadow-xs'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200/60'
                )}
              >
                {item.dot && <span className={cn('w-2 h-2 rounded-full', item.dot)} />}
                <span>{item.label}</span>
                <span
                  className={cn(
                    'px-1.5 py-0.2 rounded-full text-[10px] font-black',
                    isSelected ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                  )}
                >
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 lg:pt-0 border-t lg:border-t-0 border-gray-100">
          {[
            { id: 'cod', label: 'COD', icon: '₹' },
            { id: 'fragile', label: 'Fragile', icon: '🏆' },
            { id: 'cold_chain', label: 'Cold-chain', icon: '❄' },
            { id: 'priority', label: 'Priority', icon: '🚩' },
            { id: 'delayed', label: 'Delayed', icon: '⏱' },
          ].map((tag) => {
            const isSelected = activeTag === tag.id;
            return (
              <button
                key={tag.id}
                onClick={() => {
                  setActiveTag(isSelected ? null : tag.id);
                  setCurrentPage(1);
                }}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition border cursor-pointer',
                  isSelected
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-300 font-bold shadow-2xs'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                )}
              >
                <span className="text-[11px]">{tag.icon}</span>
                <span>{tag.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Table Container ── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[10.5px]">
                <th className="py-3.5 pl-4 pr-2 w-10 text-center">
                  <input type="checkbox" className="rounded text-[#073922] focus:ring-[#073922]" />
                </th>
                <th className="py-3.5 px-3">Order / Task ID</th>
                <th className="py-3.5 px-3 text-center">Stop #</th>
                <th className="py-3.5 px-4">Customer & Location</th>
                <th className="py-3.5 px-3">Delivery Slot</th>
                <th className="py-3.5 px-3">Packages</th>
                <th className="py-3.5 px-3">COD Amount</th>
                <th className="py-3.5 px-3">Tags</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedTasks.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-gray-400">
                    <AlertCircle className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm font-semibold text-gray-700">No delivery tasks found</p>
                    <p className="text-xs text-gray-400 mt-1">Try adjusting your filters or search keywords.</p>
                  </td>
                </tr>
              ) : (
                paginatedTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50/70 transition group">
                    {/* Checkbox */}
                    <td className="py-3 pl-4 pr-2 text-center">
                      <input type="checkbox" className="rounded text-[#073922] focus:ring-[#073922]" />
                    </td>

                    {/* Order & Task ID */}
                    <td className="py-3 px-3">
                      <Link
                        href={`/delivery-partner/tasks/${task.id}`}
                        className="font-bold text-gray-900 group-hover:text-emerald-800 transition block leading-tight font-display"
                      >
                        {task.orderId}
                      </Link>
                      <span className="text-[10px] text-gray-400 font-mono mt-0.5 block">
                        {task.id}
                      </span>
                    </td>

                    {/* Stop # */}
                    <td className="py-3 px-3 text-center">
                      <span
                        className={cn(
                          'inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-black shadow-2xs',
                          task.status === 'delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : task.status === 'en_route'
                            ? 'bg-blue-100 text-blue-800 ring-2 ring-blue-300'
                            : task.status === 'failed'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        )}
                      >
                        {task.stopNumber}
                      </span>
                    </td>

                    {/* Customer & Location */}
                    <td className="py-3 px-4 max-w-[220px]">
                      <div className="flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                        <div className="truncate">
                          <p className="font-bold text-gray-900 truncate leading-tight">
                            {task.customerName}
                          </p>
                          <p className="text-[11px] text-gray-500 truncate mt-0.5">
                            {task.address}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Delivery Slot */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-gray-700 font-semibold">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span>{task.deliverySlot.start} – {task.deliverySlot.end}</span>
                      </div>
                      {task.status === 'en_route' && (
                        <span className="inline-block text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded mt-0.5">
                          Due in 12 min
                        </span>
                      )}
                    </td>

                    {/* Packages */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-gray-700 font-semibold">
                        <PackageIcon className="w-3.5 h-3.5 text-gray-400" />
                        <span>{task.packages.length} package{task.packages.length > 1 ? 's' : ''}</span>
                      </div>
                    </td>

                    {/* COD Amount */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      {task.codAmount > 0 ? (
                        <span className="font-black text-gray-900 font-display">
                          ₹{task.codAmount}
                        </span>
                      ) : (
                        <span className="text-gray-400 font-semibold">—</span>
                      )}
                    </td>

                    {/* Tags */}
                    <td className="py-3 px-3">
                      <div className="flex flex-wrap gap-1">
                        {task.tags.includes('fragile') && (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                            🏆 Fragile
                          </span>
                        )}
                        {task.tags.includes('priority') && (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                            🚩 Priority
                          </span>
                        )}
                        {task.tags.includes('cold_chain') && (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
                            ❄ Cold-chain
                          </span>
                        )}
                        {task.tags.includes('cod') && task.codAmount > 0 && (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                            ₹ COD
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      {task.status === 'en_route' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                          <Truck className="w-3 h-3 text-blue-600" />
                          En route
                        </span>
                      )}
                      {task.status === 'active' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          Active
                        </span>
                      )}
                      {task.status === 'delivered' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                          Delivered
                        </span>
                      )}
                      {task.status === 'failed' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-800 border border-rose-200">
                          <AlertCircle className="w-3 h-3 text-rose-600" />
                          Failed
                        </span>
                      )}
                      {task.status === 'rescheduled' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          <Clock className="w-3 h-3 text-amber-600" />
                          Rescheduled
                        </span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <Link
                        href={`/delivery-partner/tasks/${task.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gray-100 text-[#073922] hover:bg-[#C6F04A] hover:text-[#073922] font-bold text-xs transition shadow-2xs"
                      >
                        <span>Open task</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── Table Footer & Pagination ── */}
        <div className="px-5 py-3.5 bg-gray-50/70 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>
            Showing <strong className="text-gray-900">{paginatedTasks.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}</strong>–
            <strong className="text-gray-900">{Math.min(currentPage * pageSize, filteredTasks.length)}</strong> of{' '}
            <strong className="text-gray-900">{filteredTasks.length}</strong> tasks
          </p>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-30 disabled:pointer-events-none transition"
              aria-label="First page"
            >
              <ChevronsLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-30 disabled:pointer-events-none transition"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={cn(
                  'w-7 h-7 rounded-lg text-xs font-bold transition',
                  currentPage === p
                    ? 'bg-[#073922] text-[#C6F04A] shadow-xs'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
                )}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-30 disabled:pointer-events-none transition"
              aria-label="Next page"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-30 disabled:pointer-events-none transition"
              aria-label="Last page"
            >
              <ChevronsRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

