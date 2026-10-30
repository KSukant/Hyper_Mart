'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Truck,
  Package,
  Layers,
  ChevronRight,
  ShieldAlert,
  ArrowUpDown,
  CreditCard,
  Ban,
  Printer,
  FileSpreadsheet,
} from 'lucide-react';
import { ADMIN_ORDERS, AdminOrder } from '@/mocks/adminData';
import { useAdminStore } from '@/store/adminStore';

export default function AdminOrdersPage() {
  const { addToast, currentFacility } = useAdminStore();
  const [orders, setOrders] = useState<AdminOrder[]>(ADMIN_ORDERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedFacility, setSelectedFacility] = useState<string>(currentFacility === 'All Facilities' ? 'all' : currentFacility);
  const [selectedPayment, setSelectedPayment] = useState<string>('all');
  const [selectedSlot, setSelectedSlot] = useState<string>('all');
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Stage filter
      if (selectedStage !== 'all' && order.stage.toLowerCase() !== selectedStage.toLowerCase()) {
        return false;
      }
      // Facility filter
      if (selectedFacility !== 'all') {
        const matchesFacility = order.warehouse.toLowerCase().includes(selectedFacility.toLowerCase().split(' ')[0]);
        if (!matchesFacility) return false;
      }
      // Payment filter
      if (selectedPayment !== 'all' && order.paymentMethod.toLowerCase() !== selectedPayment.toLowerCase()) {
        return false;
      }
      // Slot filter
      if (selectedSlot !== 'all' && !order.deliverySlot.toLowerCase().includes(selectedSlot.toLowerCase())) {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesId = order.orderNumber.toLowerCase().includes(q);
        const matchesName = order.customerName.toLowerCase().includes(q);
        const matchesPhone = order.customerPhone.toLowerCase().includes(q);
        if (!matchesId && !matchesName && !matchesPhone) return false;
      }
      return true;
    });
  }, [orders, selectedStage, selectedFacility, selectedPayment, selectedSlot, searchQuery]);

  // Bulk selection
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedOrderIds(filteredOrders.map((o) => o.id));
    } else {
      setSelectedOrderIds([]);
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedOrderIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Hold order toggle
  const handleToggleHold = (orderId: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const nextHealth = ord.health === 'Exception' ? 'On track' : 'Exception';
          return { ...ord, health: nextHealth };
        }
        return ord;
      })
    );
    addToast({
      title: 'Order Status Updated',
      description: `Order ${orderId} status toggled in operations queue.`,
      type: 'info',
    });
  };

  // CSV Export
  const handleExportCSV = () => {
    const headers = ['Order Number,Customer Name,Phone,Value (INR),Payment Method,Stage,Slot,Warehouse,Health'];
    const rows = filteredOrders.map((o) =>
      `"${o.orderNumber}","${o.customerName}","${o.customerPhone}",${o.value},"${o.paymentMethod}","${o.stage}","${o.deliverySlot}","${o.warehouse}","${o.health}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `hypermart-orders-export-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast({
      title: 'Orders Exported',
      description: `Generated CSV containing ${filteredOrders.length} order records.`,
      type: 'success',
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#07563B]">
            <span>Fulfilment & Delivery</span>
            <span>•</span>
            <span>Real-time Order Stream</span>
          </div>
          <h1 className="text-2xl font-bold text-[#202A25] tracking-tight mt-1">
            Orders Management
          </h1>
          <p className="text-xs text-[#6B756F] mt-0.5">
            Monitor, inspect, route and dispatch customer retail orders across hypermarket corridors.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E1E8E1] bg-white text-xs font-semibold text-[#202A25] hover:bg-[#F7F7F0] shadow-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#6B756F]" />
            Export CSV
          </button>
          <Link
            href="/portal/fulfilment"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#07563B] text-xs font-bold text-white hover:bg-[#06452F] shadow-sm transition-colors"
          >
            <Truck className="w-3.5 h-3.5 text-[#C6F04A]" />
            Fulfilment Tower
          </Link>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs">
          <span className="text-[11px] font-semibold text-[#6B756F] uppercase tracking-wider block">
            Orders Today
          </span>
          <div className="text-2xl font-black text-[#202A25] mt-1">12,480</div>
          <div className="flex items-center gap-1 text-[11px] text-[#07563B] font-semibold mt-1">
            <span>₹1.84 Cr gross</span>
            <span className="text-[#07563B] font-bold">(+14.2%)</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs">
          <span className="text-[11px] font-semibold text-[#6B756F] uppercase tracking-wider block">
            In Picking Queue
          </span>
          <div className="text-2xl font-black text-[#202A25] mt-1">840</div>
          <div className="text-[11px] text-[#6B756F] mt-1">12 waves active</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs">
          <span className="text-[11px] font-semibold text-[#6B756F] uppercase tracking-wider block">
            Packed & Staged
          </span>
          <div className="text-2xl font-black text-[#202A25] mt-1">1,420</div>
          <div className="text-[11px] text-[#07563B] font-semibold mt-1">Docks 1-10 loading</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs">
          <span className="text-[11px] font-semibold text-[#6B756F] uppercase tracking-wider block">
            Out for Delivery
          </span>
          <div className="text-2xl font-black text-[#07563B] mt-1">3,180</div>
          <div className="text-[11px] text-[#6B756F] mt-1">42 vans on route</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs">
          <span className="text-[11px] font-semibold text-[#6B756F] uppercase tracking-wider block">
            On Hold / Issues
          </span>
          <div className="text-2xl font-black text-[#E86B62] mt-1">38</div>
          <div className="text-[11px] text-[#E86B62] font-semibold mt-1">₹2.14L value flagged</div>
        </div>
      </div>

      {/* Stage Tabs Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-[#E1E8E1]">
        {[
          { id: 'all', label: 'All Orders', count: orders.length },
          { id: 'picking', label: 'Picking', count: orders.filter((o) => o.stage === 'Picking').length },
          { id: 'packed', label: 'Packed & Staged', count: orders.filter((o) => o.stage === 'Packed').length },
          { id: 'out for delivery', label: 'Out for Delivery', count: orders.filter((o) => o.stage === 'Out for delivery').length },
          { id: 'delivered', label: 'Delivered', count: orders.filter((o) => o.stage === 'Delivered').length },
          { id: 'exception', label: 'Exceptions / Hold', count: orders.filter((o) => o.stage === 'Exception').length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedStage(tab.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedStage === tab.id
                ? 'bg-[#07563B] text-white shadow-xs'
                : 'text-[#6B756F] hover:bg-white hover:text-[#202A25]'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Filter and Search Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6B756F]" />
          <input
            type="text"
            placeholder="Search order ID, customer name or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#F7F7F0] border border-[#E1E8E1] text-xs text-[#202A25] placeholder:text-[#6B756F] focus:bg-white focus:outline-none focus:border-[#07563B]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Facility Filter */}
          <select
            value={selectedFacility}
            onChange={(e) => setSelectedFacility(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#F7F7F0] border border-[#E1E8E1] text-xs font-medium text-[#202A25] focus:outline-none"
          >
            <option value="all">All Warehouses</option>
            <option value="Coimbatore DC">Coimbatore DC</option>
            <option value="Chennai FC">Chennai FC</option>
            <option value="Bengaluru Hub">Bengaluru Hub</option>
          </select>

          {/* Payment Method Filter */}
          <select
            value={selectedPayment}
            onChange={(e) => setSelectedPayment(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#F7F7F0] border border-[#E1E8E1] text-xs font-medium text-[#202A25] focus:outline-none"
          >
            <option value="all">All Payments</option>
            <option value="UPI">UPI Instant</option>
            <option value="Card">Credit / Debit Card</option>
            <option value="COD">Cash on Delivery</option>
            <option value="NetBanking">Net Banking</option>
          </select>

          {/* Delivery Slot Filter */}
          <select
            value={selectedSlot}
            onChange={(e) => setSelectedSlot(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#F7F7F0] border border-[#E1E8E1] text-xs font-medium text-[#202A25] focus:outline-none"
          >
            <option value="all">All Delivery Slots</option>
            <option value="10am – 12pm">10:00 – 12:00</option>
            <option value="12pm – 2pm">12:00 – 14:00</option>
            <option value="4:00 PM – 6:00 PM">16:00 – 18:00</option>
          </select>

          {(searchQuery || selectedStage !== 'all' || selectedFacility !== 'all' || selectedPayment !== 'all' || selectedSlot !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedStage('all');
                setSelectedFacility('all');
                setSelectedPayment('all');
                setSelectedSlot('all');
              }}
              className="text-xs text-[#07563B] hover:underline font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl bg-white border border-[#E1E8E1] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E1E8E1] bg-[#F7F7F0] text-[11px] uppercase tracking-wider text-[#6B756F]">
                <th className="py-3 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedOrderIds.length > 0 && selectedOrderIds.length === filteredOrders.length}
                    onChange={handleSelectAll}
                    className="rounded border-[#E1E8E1] text-[#07563B] focus:ring-[#07563B]"
                  />
                </th>
                <th className="py-3 px-4 font-semibold">Order ID</th>
                <th className="py-3 px-4 font-semibold">Customer</th>
                <th className="py-3 px-4 font-semibold">Value (INR)</th>
                <th className="py-3 px-4 font-semibold">Payment</th>
                <th className="py-3 px-4 font-semibold">Fulfilment Stage</th>
                <th className="py-3 px-4 font-semibold">Delivery Slot</th>
                <th className="py-3 px-4 font-semibold">Warehouse Hub</th>
                <th className="py-3 px-4 font-semibold">Health / Risk</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E1E8E1] text-xs">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-[#6B756F]">
                    <ShoppingBag className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p className="font-semibold text-[#202A25]">No orders match the current filters</p>
                    <p className="text-xs text-[#6B756F] mt-0.5">Try clearing your search query or slot selections.</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const isSelected = selectedOrderIds.includes(order.id);
                  return (
                    <tr
                      key={order.id}
                      className={`hover:bg-[#EAF5E9]/50 transition-colors ${
                        isSelected ? 'bg-[#EAF5E9]/80' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectRow(order.id)}
                          className="rounded border-[#E1E8E1] text-[#07563B] focus:ring-[#07563B]"
                        />
                      </td>

                      <td className="py-3.5 px-4 font-bold text-[#07563B]">
                        <Link
                          href={`/portal/orders/${order.id}`}
                          className="hover:underline flex items-center gap-1 font-mono"
                        >
                          {order.orderNumber}
                        </Link>
                        <span className="text-[10px] text-[#6B756F] block font-normal">{order.date}</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-[#202A25]">{order.customerName}</div>
                        <div className="text-[11px] text-[#6B756F]">{order.customerPhone}</div>
                      </td>

                      <td className="py-3.5 px-4 font-semibold text-[#202A25]">
                        ₹{order.value.toLocaleString('en-IN')}
                        <span className="text-[10px] text-[#6B756F] block font-normal">{order.itemsCount} items</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-[#F7F7F0] border border-[#E1E8E1] text-[#202A25]">
                          <CreditCard className="w-3 h-3 text-[#07563B]" />
                          {order.paymentMethod}
                        </span>
                        {order.paymentUtr && (
                          <span className="text-[10px] text-[#6B756F] font-mono block mt-0.5">
                            {order.paymentUtr}
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            order.stage === 'Delivered'
                              ? 'bg-[#EAF5E9] text-[#07563B] border border-[#C6F04A]'
                              : order.stage === 'Out for delivery'
                              ? 'bg-[#EAF5E9] text-[#07563B]'
                              : order.stage === 'Packed'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : order.stage === 'Picking'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {order.stage}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-[#202A25]">
                        <div className="font-medium">{order.deliverySlot}</div>
                      </td>

                      <td className="py-3.5 px-4 text-[#6B756F]">
                        {order.warehouse}
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                            order.health === 'On track'
                              ? 'text-[#07563B]'
                              : order.health === 'Review'
                              ? 'text-[#F2B544]'
                              : 'text-[#E86B62]'
                          }`}
                        >
                          {order.health === 'On track' ? (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          ) : (
                            <AlertTriangle className="w-3.5 h-3.5" />
                          )}
                          {order.health}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/portal/orders/${order.id}`}
                            className="p-1.5 rounded-lg border border-[#E1E8E1] hover:bg-[#EAF5E9] text-[#07563B] transition-colors"
                            title="Inspect order details"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleToggleHold(order.id)}
                            className="p-1.5 rounded-lg border border-[#E1E8E1] hover:bg-rose-50 text-[#E86B62] transition-colors"
                            title="Toggle Hold / Exception"
                          >
                            <Ban className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <div className="p-4 border-t border-[#E1E8E1] flex items-center justify-between text-xs text-[#6B756F]">
          <div>
            Showing <strong className="text-[#202A25]">{filteredOrders.length}</strong> of {orders.length} orders
          </div>
          <div className="flex items-center gap-1.5">
            <button className="px-3 py-1.5 rounded-lg border border-[#E1E8E1] text-[#202A25] disabled:opacity-50" disabled>
              Previous
            </button>
            <span className="px-3 py-1.5 rounded-lg bg-[#07563B] text-white font-bold">1</span>
            <button className="px-3 py-1.5 rounded-lg border border-[#E1E8E1] text-[#202A25] disabled:opacity-50" disabled>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
