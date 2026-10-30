'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Truck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Warehouse,
  ShieldCheck,
  Package,
  Layers,
  MapPin,
  RefreshCw,
  SlidersHorizontal,
  ChevronRight,
  Gauge,
} from 'lucide-react';
import { useAdminStore } from '@/store/adminStore';

export default function FulfilmentControlTowerPage() {
  const { currentFacility, setFacility, addToast } = useAdminStore();
  const [selectedHub, setSelectedHub] = useState<string>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      addToast({
        title: 'Control Tower Synced',
        description: 'Corridor pipeline data refreshed from warehouse nodes.',
        type: 'success',
      });
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#07563B]">
            <span>Logistics Control Tower</span>
            <span>•</span>
            <span>Tamil Nadu Corridor</span>
          </div>
          <h1 className="text-2xl font-bold text-[#202A25] tracking-tight mt-1">
            Fulfilment Control Tower
          </h1>
          <p className="text-xs text-[#6B756F] mt-0.5">
            End-to-end operational visibility across payment intake, wave picking, dock staging and final delivery handoffs.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E1E8E1] bg-white text-xs font-semibold text-[#202A25] hover:bg-[#F7F7F0] shadow-xs transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#07563B] ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh Stream
          </button>
          <Link
            href="/portal/warehouse-readiness"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#07563B] text-xs font-bold text-white hover:bg-[#06452F] shadow-xs transition-colors"
          >
            <Warehouse className="w-3.5 h-3.5 text-[#C6F04A]" />
            Warehouse Readiness
          </Link>
        </div>
      </div>

      {/* Horizontal Pipeline Progression Flow */}
      <div className="p-6 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#202A25] uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#07563B]" />
            Live Pipeline Velocity (Today: 12,480 Orders)
          </h2>
          <span className="text-xs text-[#07563B] font-semibold">Average intake to dispatch: 24.2 mins</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          {/* Step 1: Paid */}
          <Link
            href="/portal/orders?stage=paid"
            className="p-4 rounded-xl bg-[#F7F7F0] hover:bg-[#EAF5E9] border border-[#E1E8E1] transition-all group"
          >
            <span className="text-[11px] font-semibold text-[#6B756F] uppercase tracking-wider block">
              1. Paid / Intake
            </span>
            <div className="text-2xl font-black text-[#202A25] mt-1 group-hover:text-[#07563B]">12,480</div>
            <div className="text-[11px] text-[#07563B] font-semibold mt-1">100% gateway cleared</div>
          </Link>

          {/* Step 2: Picking */}
          <Link
            href="/portal/orders?stage=picking"
            className="p-4 rounded-xl bg-[#F7F7F0] hover:bg-[#EAF5E9] border border-[#E1E8E1] transition-all group"
          >
            <span className="text-[11px] font-semibold text-[#6B756F] uppercase tracking-wider block">
              2. Wave Picking
            </span>
            <div className="text-2xl font-black text-[#202A25] mt-1 group-hover:text-[#07563B]">1,840</div>
            <div className="text-[11px] text-[#6B756F] mt-1">12 waves in zone A-G</div>
          </Link>

          {/* Step 3: Packing */}
          <Link
            href="/portal/orders?stage=packed"
            className="p-4 rounded-xl bg-[#F7F7F0] hover:bg-[#EAF5E9] border border-[#E1E8E1] transition-all group"
          >
            <span className="text-[11px] font-semibold text-[#6B756F] uppercase tracking-wider block">
              3. Packed & Staged
            </span>
            <div className="text-2xl font-black text-[#202A25] mt-1 group-hover:text-[#07563B]">2,420</div>
            <div className="text-[11px] text-[#07563B] font-semibold mt-1">Docks 1-12 loading</div>
          </Link>

          {/* Step 4: Out for delivery */}
          <Link
            href="/portal/orders?stage=out for delivery"
            className="p-4 rounded-xl bg-[#EAF5E9] border border-[#C6F04A] transition-all group"
          >
            <span className="text-[11px] font-bold text-[#07563B] uppercase tracking-wider block">
              4. Out for Delivery
            </span>
            <div className="text-2xl font-black text-[#07563B] mt-1">3,180</div>
            <div className="text-[11px] text-[#07563B] font-semibold mt-1">54 fleet vans active</div>
          </Link>

          {/* Step 5: Delivered */}
          <Link
            href="/portal/orders?stage=delivered"
            className="p-4 rounded-xl bg-[#F7F7F0] hover:bg-[#EAF5E9] border border-[#E1E8E1] transition-all group"
          >
            <span className="text-[11px] font-semibold text-[#6B756F] uppercase tracking-wider block">
              5. Completed
            </span>
            <div className="text-2xl font-black text-[#202A25] mt-1 group-hover:text-[#07563B]">5,040</div>
            <div className="text-[11px] text-[#07563B] font-semibold mt-1">OTP verified</div>
          </Link>
        </div>
      </div>

      {/* 3-Column Metrics Grid: SLA, Warehouse Breakdown & Slot Capacity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SLA Health Card */}
        <div className="p-6 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#202A25] uppercase tracking-wider flex items-center gap-2">
              <Gauge className="w-4 h-4 text-[#07563B]" />
              Corridor SLA Adherence
            </h3>
            <span className="text-xs font-bold text-[#07563B] bg-[#EAF5E9] px-2 py-0.5 rounded">
              Target: 95.0%
            </span>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <div className="text-4xl font-black text-[#07563B]">98.4%</div>
            <div className="text-xs text-[#6B756F]">
              <span className="text-[#07563B] font-bold">+1.2%</span> vs last week. Only 18 deliveries breached slot window today.
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#E1E8E1] text-xs">
            <div className="flex justify-between text-[#6B756F]">
              <span>On-time slot delivery</span>
              <strong className="text-[#202A25]">98.4%</strong>
            </div>
            <div className="flex justify-between text-[#6B756F]">
              <span>First-attempt success</span>
              <strong className="text-[#202A25]">99.1%</strong>
            </div>
            <div className="flex justify-between text-[#6B756F]">
              <span>Customer rating post-delivery</span>
              <strong className="text-[#07563B]">4.86 / 5.0</strong>
            </div>
          </div>
        </div>

        {/* Warehouse Nodes Performance */}
        <div className="p-6 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[#202A25] uppercase tracking-wider flex items-center gap-2">
            <Warehouse className="w-4 h-4 text-[#07563B]" />
            Node Fulfilment Velocity
          </h3>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-[#F7F7F0] border border-[#E1E8E1]">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-xs text-[#202A25]">Coimbatore DC</span>
                <span className="text-xs font-black text-[#07563B]">99.1% SLA</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-200">
                <div className="h-full rounded-full bg-[#07563B]" style={{ width: '99.1%' }} />
              </div>
              <div className="flex justify-between text-[11px] text-[#6B756F] mt-1.5">
                <span>7,820 orders handled</span>
                <span>14 waves complete</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#F7F7F0] border border-[#E1E8E1]">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-xs text-[#202A25]">Chennai FC</span>
                <span className="text-xs font-black text-[#07563B]">97.4% SLA</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-200">
                <div className="h-full rounded-full bg-[#07563B]" style={{ width: '97.4%' }} />
              </div>
              <div className="flex justify-between text-[11px] text-[#6B756F] mt-1.5">
                <span>4,660 orders handled</span>
                <span>10 waves complete</span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Slot Hourly Capacity */}
        <div className="p-6 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[#202A25] uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#07563B]" />
            Delivery Slot Capacity
          </h3>

          <div className="space-y-2.5 text-xs">
            <div>
              <div className="flex justify-between text-[#6B756F] mb-1">
                <span>Slot 1 (07:00 – 10:00)</span>
                <strong className="text-[#07563B]">100% (Completed)</strong>
              </div>
              <div className="w-full h-1.5 rounded-full bg-gray-200">
                <div className="h-full rounded-full bg-[#07563B]" style={{ width: '100%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[#6B756F] mb-1">
                <span>Slot 2 (11:00 – 14:00)</span>
                <strong className="text-[#07563B]">94% (Completed)</strong>
              </div>
              <div className="w-full h-1.5 rounded-full bg-gray-200">
                <div className="h-full rounded-full bg-[#07563B]" style={{ width: '94%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[#6B756F] mb-1">
                <span>Slot 3 (16:00 – 19:00)</span>
                <strong className="text-[#F2B544]">88% (Dispatching)</strong>
              </div>
              <div className="w-full h-1.5 rounded-full bg-gray-200">
                <div className="h-full rounded-full bg-[#F2B544]" style={{ width: '88%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[#6B756F] mb-1">
                <span>Slot 4 (19:00 – 22:00)</span>
                <strong className="text-[#6B756F]">42% (Booking open)</strong>
              </div>
              <div className="w-full h-1.5 rounded-full bg-gray-200">
                <div className="h-full rounded-full bg-blue-600" style={{ width: '42%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Fulfilment Dispatch Events Table */}
      <div className="rounded-2xl bg-white border border-[#E1E8E1] shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#E1E8E1] flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#202A25] flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#07563B]" />
              Recent Dispatch & Handoff Events
            </h3>
            <p className="text-xs text-[#6B756F] mt-0.5">
              Live updates recorded by driver OTP verifications and dock gates.
            </p>
          </div>
          <Link
            href="/portal/orders"
            className="text-xs text-[#07563B] font-semibold hover:underline flex items-center gap-1"
          >
            All Orders <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E1E8E1] bg-[#F7F7F0] text-[11px] uppercase tracking-wider text-[#6B756F]">
                <th className="py-2.5 px-4 font-semibold">Time</th>
                <th className="py-2.5 px-4 font-semibold">Order ID</th>
                <th className="py-2.5 px-4 font-semibold">Customer / Destination</th>
                <th className="py-2.5 px-4 font-semibold">Warehouse Hub</th>
                <th className="py-2.5 px-4 font-semibold">Milestone Event</th>
                <th className="py-2.5 px-4 font-semibold">Carrier / Agent</th>
                <th className="py-2.5 px-4 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E1E8E1]">
              <tr className="hover:bg-[#F7F7F0]/60">
                <td className="py-3 px-4 font-mono text-[#6B756F]">14:22:10</td>
                <td className="py-3 px-4 font-bold text-[#07563B]">
                  <Link href="/portal/orders/ord-88219" className="hover:underline">
                    HM-88219
                  </Link>
                </td>
                <td className="py-3 px-4 text-[#202A25]">Meera K. (HSR Layout, Bengaluru)</td>
                <td className="py-3 px-4 text-[#6B756F]">Coimbatore DC</td>
                <td className="py-3 px-4 font-medium text-[#202A25]">Out for delivery</td>
                <td className="py-3 px-4 text-[#6B756F]">Ramesh Kumar (Van #04)</td>
                <td className="py-3 px-4 text-right">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#EAF5E9] text-[#07563B]">
                    Active
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-[#F7F7F0]/60">
                <td className="py-3 px-4 font-mono text-[#6B756F]">14:19:45</td>
                <td className="py-3 px-4 font-bold text-[#07563B]">
                  <Link href="/portal/orders/ord-1003287" className="hover:underline">
                    HM1003287
                  </Link>
                </td>
                <td className="py-3 px-4 text-[#202A25]">Priya Sharma (Sriperumbudur)</td>
                <td className="py-3 px-4 text-[#6B756F]">Chennai FC</td>
                <td className="py-3 px-4 font-medium text-[#202A25]">Packed & Staged at Gate 2</td>
                <td className="py-3 px-4 text-[#6B756F]">Gate D-02 Dock Agent</td>
                <td className="py-3 px-4 text-right">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-700">
                    Staged
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-[#F7F7F0]/60">
                <td className="py-3 px-4 font-mono text-[#6B756F]">14:15:02</td>
                <td className="py-3 px-4 font-bold text-[#07563B]">
                  <Link href="/portal/orders/ord-1003286" className="hover:underline">
                    HM1003286
                  </Link>
                </td>
                <td className="py-3 px-4 text-[#202A25]">Rohan Mehta (OMR Corridor)</td>
                <td className="py-3 px-4 text-[#6B756F]">Chennai FC</td>
                <td className="py-3 px-4 font-medium text-[#202A25]">Picking Zone C (Audio)</td>
                <td className="py-3 px-4 text-[#6B756F]">Scanner #12 (M. Murugan)</td>
                <td className="py-3 px-4 text-right">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-700">
                    Picking
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
