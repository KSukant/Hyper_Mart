'use client';

import Link from 'next/link';
import {
  Package, CheckCircle2, Clock, AlertCircle, ChevronRight,
  MapPin, Navigation, ClipboardList, Wallet, RotateCcw,
  Activity, Star, AlertTriangle, DollarSign,
} from 'lucide-react';
import { useDeliveryStore } from '@/store/deliveryStore';
import { MOCK_PARTNER, MOCK_URGENT_ITEMS } from '@/mocks/deliveryData';
import { cn } from '@/lib/cn';

// ── Subcomponents ─────────────────────────────────────────────

function KpiCard({
  icon: Icon, iconBg, label, value, sub, href,
}: { icon: typeof Package; iconBg: string; label: string; value: string | number; sub: string; href: string }) {
  return (
    <Link href={href} className="group bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
      <div className={cn('w-12 h-12 rounded-full flex items-center justify-center shrink-0', iconBg)}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400">{label}</p>
        <p className="font-display text-3xl font-black text-gray-900 leading-none mt-0.5">{value}</p>
        <p className="text-[11px] text-gray-500 mt-0.5">{sub}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 ml-auto transition" />
    </Link>
  );
}

const URGENT_ICON_MAP = {
  customer_waiting: { icon: Clock, bg: 'bg-red-50', iconColor: 'text-red-500' },
  cod_variance: { icon: DollarSign, bg: 'bg-amber-50', iconColor: 'text-amber-500' },
  damaged_package: { icon: Package, bg: 'bg-orange-50', iconColor: 'text-orange-500' },
};

// ── Dashboard Page ────────────────────────────────────────────

export default function DeliveryDashboardPage() {
  const { route, tasks, codSettlement, returns, partnerStatus } = useDeliveryStore();

  const completed = tasks.filter((t) => t.status === 'delivered').length;
  const delayed = tasks.filter((t) => t.status === 'failed' || t.stepState === 'arrived').length;
  const remaining = route.totalStops - completed;
  const pct = Math.round((completed / route.totalStops) * 100);
  const nextTask = tasks.find((t) => t.status === 'en_route' || t.status === 'active');
  const returnsDue = returns.filter((r) => r.status !== 'handed_over').length;

  return (
    <div className="space-y-5 pb-6">
      {/* ── Row 1: Greeting + Context Cards ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_auto_auto] gap-4 items-start">
        {/* Greeting */}
        <div className="bg-white rounded-2xl border border-gray-200 px-6 py-5">
          <p className="text-sm text-gray-500 font-medium">Good morning,</p>
          <h1 className="font-display text-3xl font-black text-gray-900 mt-0.5">
            {MOCK_PARTNER.firstName} 👋
          </h1>
          <p className="text-sm text-gray-500 mt-1">Let&apos;s keep the momentum going. Deliver more smiles today!</p>
        </div>

        {/* Shift Status */}
        <div className="bg-[#F0FDF4] border border-emerald-200 rounded-2xl px-5 py-4 flex items-center gap-3 min-w-[180px]">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <div>
            <p className="text-xs font-bold text-emerald-800">Shift Active</p>
            <p className="text-[11px] text-emerald-600 mt-0.5">Started at 8:00 AM</p>
          </div>
          <ChevronRight className="w-4 h-4 text-emerald-400 ml-2" />
        </div>

        {/* Route Info */}
        <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4 min-w-[200px]">
          <div className="flex items-center gap-2 text-[11px] text-gray-400 font-semibold uppercase tracking-wide">
            <Navigation className="w-3.5 h-3.5" /> Route
          </div>
          <p className="font-display font-black text-gray-900 text-lg leading-tight mt-1">{route.id}</p>
          <p className="text-[11px] text-gray-500 mt-0.5">{route.city} • {route.totalStops} stops</p>
        </div>

        {/* Date */}
        <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4 min-w-[160px]">
          <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide">Date</p>
          <p className="font-display font-black text-gray-900 text-lg leading-tight mt-1">{route.date}</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">Today</p>
        </div>
      </div>

      {/* ── Row 2: KPI Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          icon={Package} iconBg="bg-teal-50 text-teal-600"
          label="Assigned" value={route.totalStops} sub="Total deliveries today"
          href="/delivery-partner/tasks"
        />
        <KpiCard
          icon={CheckCircle2} iconBg="bg-emerald-50 text-emerald-600"
          label="Completed" value={completed} sub={`${pct}% complete`}
          href="/delivery-partner/tasks?filter=delivered"
        />
        <KpiCard
          icon={Clock} iconBg="bg-amber-50 text-amber-500"
          label="Remaining" value={remaining} sub="On track"
          href="/delivery-partner/tasks?filter=active"
        />
        <KpiCard
          icon={AlertCircle} iconBg="bg-red-50 text-red-500"
          label="Delayed" value={delayed} sub="Needs attention"
          href="/delivery-partner/tasks?filter=failed"
        />
      </div>

      {/* ── Row 3: Route Progress + Map | Urgent Attention | Next Delivery ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1.1fr_1.1fr] gap-4">

        {/* Route Progress + Map */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-gray-900 text-[15px]">Route Progress</h2>
            <span className="font-display font-black text-2xl text-emerald-700">{pct}%</span>
          </div>
          <div>
            <div className="h-3 w-full rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#073922] transition-all duration-700"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-gray-400 mt-1.5">
              <span>{completed} of {route.totalStops} deliveries completed</span>
              <span>Est. completion {route.estimatedCompletion}</span>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="relative h-52 rounded-xl overflow-hidden border border-gray-100 bg-[#E8F5E9]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-[#073922] mx-auto mb-2" />
                <p className="text-xs font-bold text-[#073922]">Route RT-CBE-1024</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Bengaluru · {route.totalStops} stops · {route.totalDistanceKm} km</p>
              </div>
            </div>
            {/* Dot Legend */}
            <div className="absolute bottom-3 left-3 flex items-center gap-3 text-[10px] font-semibold bg-white/90 rounded-lg px-2.5 py-1.5">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500 inline-block" /> Your location</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Completed</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-300 inline-block" /> Upcoming</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> Issue</span>
            </div>
            <Link
              href="/delivery-partner/route-planning"
              className="absolute top-3 right-3 text-[11px] font-bold text-[#073922] bg-white border border-gray-200 rounded-lg px-2.5 py-1 hover:bg-gray-50 transition"
            >
              View full map ↗
            </Link>
          </div>
        </div>

        {/* Urgent Attention */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="font-display font-bold text-gray-900 text-[15px]">Urgent Attention</h2>
              <span className="min-w-[20px] h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center px-1.5">
                {MOCK_URGENT_ITEMS.length}
              </span>
            </div>
            <Link href="/delivery-partner/tasks" className="text-[11px] font-bold text-emerald-700 hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {MOCK_URGENT_ITEMS.map((item) => {
              const conf = URGENT_ICON_MAP[item.type];
              const Icon = conf.icon;
              return (
                <Link key={item.id} href={item.href} className="group flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition border border-gray-100">
                  <div className={cn('w-8 h-8 rounded-full flex items-center justify-center shrink-0', conf.bg)}>
                    <Icon className={cn('w-4 h-4', conf.iconColor)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className={cn('text-xs font-bold', item.badgeColor === 'red' ? 'text-red-600' : item.badgeColor === 'amber' ? 'text-amber-600' : 'text-orange-600')}>
                        {item.title}
                      </p>
                      <span className={cn(
                        'text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0',
                        item.badgeColor === 'red' ? 'bg-red-100 text-red-700' : item.badgeColor === 'amber' ? 'bg-amber-100 text-amber-700' : 'bg-orange-100 text-orange-700'
                      )}>
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5 truncate">Order {item.orderId}</p>
                    <p className="text-[11px] text-gray-400 truncate">{item.detail}</p>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 shrink-0 mt-0.5" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Next Delivery */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-gray-900 text-[15px]">Next Delivery</h2>
            {nextTask && (
              <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                #{nextTask.stopNumber} of {route.totalStops}
              </span>
            )}
          </div>

          {nextTask ? (
            <div className="flex-1 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="font-display font-black text-[15px] text-gray-900">Order {nextTask.orderId}</p>
                <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{nextTask.orderType}</span>
              </div>
              <div className="flex items-start gap-2 text-[12px] text-gray-600">
                <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
                <span>{nextTask.customerName}<br />{nextTask.address}<br />{nextTask.city}, {nextTask.pincode}</span>
              </div>
              <div className="flex items-center gap-4 text-[12px]">
                <div className="flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-gray-400" />
                  <span className="font-semibold">{nextTask.packages.length} packages</span>
                </div>
                {nextTask.codAmount > 0 && (
                  <div className="flex items-center gap-1.5">
                    <Wallet className="w-3.5 h-3.5 text-gray-400" />
                    <span className="font-semibold">₹{nextTask.codAmount}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {nextTask.tags.includes('fragile') && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-100">🏆 Fragile</span>
                )}
                {nextTask.codAmount > 0 && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD]">🔒 OTP required</span>
                )}
              </div>
              <div className="mt-auto space-y-2 pt-2">
                <Link
                  href={`/delivery-partner/route-planning`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#073922] text-white text-xs font-bold hover:bg-[#052E1A] transition"
                >
                  <Navigation className="w-3.5 h-3.5" /> Navigate
                </Link>
                <Link
                  href={`/delivery-partner/tasks/${nextTask.id}`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#C6F04A] text-[#073922] text-xs font-bold hover:bg-[#b5df3a] transition"
                >
                  <ClipboardList className="w-3.5 h-3.5" /> Open task
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mb-2" />
              <p className="text-sm font-bold text-gray-700">All deliveries complete!</p>
              <p className="text-xs text-gray-400 mt-1">Great work today, {MOCK_PARTNER.firstName}.</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Row 4: Bottom Info Tiles ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* COD Collections */}
        <Link href="/delivery-partner/cod-collection" className="group bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-all cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center">
              <Wallet className="w-4.5 h-4.5 text-emerald-600" />
            </div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Today&apos;s Collections</p>
          </div>
          <p className="font-display font-black text-2xl text-gray-900">₹{codSettlement.expectedCash.toLocaleString('en-IN')}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">COD collected · ₹{codSettlement.variance > 0 ? codSettlement.variance : 0} pending</p>
          <ChevronRight className="w-4 h-4 text-gray-300 mt-2 group-hover:text-emerald-600 transition" />
        </Link>

        {/* Returns */}
        <Link href="/delivery-partner/returns" className="group bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-all cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center">
              <RotateCcw className="w-4.5 h-4.5 text-purple-600" />
            </div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Packages to Return</p>
          </div>
          <p className="font-display font-black text-2xl text-gray-900">{returnsDue}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">Return item{returnsDue !== 1 ? 's' : ''}</p>
          <ChevronRight className="w-4 h-4 text-gray-300 mt-2 group-hover:text-purple-600 transition" />
        </Link>

        {/* Work Hours */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
              <Activity className="w-4.5 h-4.5 text-blue-600" />
            </div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Work Hours</p>
          </div>
          <p className="font-display font-black text-2xl text-gray-900">6h 15m</p>
          <p className="text-[11px] text-gray-400 mt-0.5">On duty · 1h 45m Remaining</p>
        </div>

        {/* Performance */}
        <Link href="/delivery-partner/profile" className="group bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-all cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-[#E8F8F0] flex items-center justify-center">
              <Star className="w-4.5 h-4.5 text-[#10B981]" />
            </div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Performance</p>
          </div>
          <p className="font-display font-bold text-sm text-gray-900">Great work, {MOCK_PARTNER.firstName}!</p>
          <p className="text-[11px] text-gray-500 mt-0.5">{completed} deliveries completed so far. Keep it up!</p>
          <ChevronRight className="w-4 h-4 text-gray-300 mt-2 group-hover:text-emerald-600 transition" />
        </Link>
      </div>
    </div>
  );
}

