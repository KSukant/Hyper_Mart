'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, Play, Navigation, MapPin, Package, Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import { useDeliveryStore } from '@/store/deliveryStore';
import { MOCK_TASKS } from '@/mocks/deliveryData';
import { cn } from '@/lib/cn';

const STATUS_STYLE = {
  delivered: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  en_route: 'bg-blue-100 text-blue-700 border-blue-200',
  active: 'bg-gray-100 text-gray-600 border-gray-200',
  failed: 'bg-red-100 text-red-700 border-red-200',
  rescheduled: 'bg-amber-100 text-amber-700 border-amber-200',
  arrived: 'bg-teal-100 text-teal-700 border-teal-200',
};
const STATUS_LABEL = {
  delivered: 'Completed',
  en_route: 'En route',
  active: 'Pending',
  failed: 'Delayed',
  rescheduled: 'Rescheduled',
  arrived: 'Arrived',
};

type StopFilter = 'all' | 'completed' | 'pending' | 'delayed';

export default function RoutePlanningPage() {
  const { route, startRoute } = useDeliveryStore();
  const [filter, setFilter] = useState<StopFilter>('all');

  const sortedStops = [...MOCK_TASKS].sort((a, b) => a.stopNumber - b.stopNumber);
  const filtered = sortedStops.filter((t) => {
    if (filter === 'completed') return t.status === 'delivered';
    if (filter === 'pending') return t.status === 'active' || t.status === 'en_route';
    if (filter === 'delayed') return t.status === 'failed' || t.status === 'rescheduled';
    return true;
  });

  return (
    <div className="space-y-5 pb-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400 font-semibold">
        <Link href="/delivery-partner/dashboard" className="hover:text-gray-700 transition">Route planning</Link>
        <span>›</span>
        <span className="text-gray-700">{route.id}</span>
      </div>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex items-center gap-3">
            <Link href="/delivery-partner/dashboard" className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </Link>
            <div>
              <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide">Route</p>
              <h1 className="font-display font-black text-3xl text-gray-900">{route.id}</h1>
              <p className="text-sm text-gray-500 mt-0.5">{route.shift} · {route.hub}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-700">
              <Clock className="w-4 h-4 text-gray-400" />
              {route.date} · Today
            </div>
            <button
              onClick={startRoute}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C6F04A] text-[#073922] text-sm font-bold hover:bg-[#b5df3a] transition"
            >
              <Play className="w-4 h-4 fill-[#073922]" /> Start route
            </button>
            <Link
              href="https://maps.google.com"
              target="_blank"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#073922] text-white text-sm font-bold hover:bg-[#052E1A] transition"
            >
              <Navigation className="w-4 h-4" /> Navigation
            </Link>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Package, iconBg: 'bg-teal-50 text-teal-600', label: 'Total stops', value: route.totalStops, sub: `${route.completedStops} completed · ${route.totalStops - route.completedStops} remaining` },
          { icon: MapPin, iconBg: 'bg-blue-50 text-blue-600', label: 'Total distance', value: `${route.totalDistanceKm} km`, sub: 'Optimal route' },
          { icon: Clock, iconBg: 'bg-amber-50 text-amber-500', label: 'Est. duration', value: '5h 20m', sub: 'Including service time' },
          { icon: ChevronRight, iconBg: 'bg-emerald-50 text-emerald-600', label: 'Total COD', value: `₹${route.totalCodExpected.toLocaleString('en-IN')}`, sub: `From ${MOCK_TASKS.filter(t => t.codAmount > 0).length} orders` },
        ].map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4">
              <div className={cn('w-12 h-12 rounded-full flex items-center justify-center shrink-0', m.iconBg)}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400">{m.label}</p>
                <p className="font-display font-black text-xl text-gray-900 mt-0.5">{m.value}</p>
                <p className="text-[11px] text-gray-500">{m.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Map + Stop List */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-4">
        {/* Map */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-display font-bold text-gray-900">Route Map</h2>
              <p className="text-xs text-gray-400 mt-0.5">Your planned route with {route.totalStops} stops</p>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-semibold text-gray-500">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block border-2 border-blue-700" /> Current</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Completed</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full border-2 border-gray-400 inline-block" /> Pending</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" /> Delayed</span>
            </div>
          </div>
          <div className="h-[480px] rounded-xl bg-[#E8F5E9] border border-emerald-100 flex items-center justify-center relative overflow-hidden">
            {/* Route line visualisation */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 480" preserveAspectRatio="none">
              <polyline
                points="80,440 90,400 100,360 130,300 160,260 180,220 210,190 240,170 270,160 290,150 310,140 320,150 310,180 300,200"
                stroke="#073922" strokeWidth="3" fill="none" strokeDasharray="6 3" opacity="0.4"
              />
            </svg>
            <div className="text-center relative z-10">
              <MapPin className="w-10 h-10 text-[#073922] mx-auto mb-2" />
              <p className="text-sm font-bold text-[#073922]">Bengaluru Route</p>
              <p className="text-xs text-gray-500 mt-1">{route.totalStops} stops · {route.totalDistanceKm} km · ~5h 20m</p>
              <Link
                href="https://maps.google.com"
                target="_blank"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#073922] border border-[#073922]/30 rounded-lg px-3 py-1.5 hover:bg-[#073922]/5 transition"
              >
                View full map ↗
              </Link>
            </div>
          </div>
        </div>

        {/* Stop List */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-bold text-gray-900">Stops ({route.totalStops})</h2>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as StopFilter)}
              className="text-xs font-semibold border border-gray-200 rounded-lg px-2 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#073922]"
            >
              <option value="all">All stops</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="delayed">Delayed</option>
            </select>
          </div>
          <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar max-h-[480px]">
            {filtered.map((stop) => (
              <Link
                key={stop.id}
                href={`/delivery-partner/tasks/${stop.id}`}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition border border-transparent hover:border-gray-200 group"
              >
                {/* Circle number */}
                <div className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black shrink-0',
                  stop.status === 'delivered' ? 'bg-emerald-500 text-white' :
                  stop.status === 'failed' ? 'bg-red-500 text-white' :
                  stop.status === 'en_route' ? 'bg-blue-500 text-white' :
                  'bg-gray-200 text-gray-600'
                )}>
                  {stop.stopNumber}
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900 truncate">{stop.customerName}</p>
                  <p className="text-[10px] text-gray-400 truncate">{stop.address}</p>
                  <p className="text-[10px] text-gray-400">{stop.deliverySlot.start} – {stop.deliverySlot.end}</p>
                </div>
                {/* Right */}
                <div className="text-right shrink-0 space-y-1">
                  <p className="text-[10px] text-gray-500">{stop.packages.length} pkg{stop.packages.length !== 1 ? 's' : ''}{stop.codAmount > 0 ? ` · ₹${stop.codAmount}` : ' · ₹0'}</p>
                  <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full border', STATUS_STYLE[stop.status])}>
                    {STATUS_LABEL[stop.status]}
                  </span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

