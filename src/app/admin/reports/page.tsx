'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  Download,
  Calendar,
  Filter,
  ShoppingBag,
  RotateCcw,
  Clock,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  Sparkles,
  BarChart3,
  PieChart,
} from 'lucide-react';
import { useAdminStore } from '@/store/adminStore';

export default function ReportsAndAnalyticsPage() {
  const { addToast } = useAdminStore();
  const [dateRange, setDateRange] = useState<'7d' | '30d' | 'qtd'>('30d');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');

  const handleExportReport = () => {
    addToast({
      title: 'BI Report Exported',
      description: 'Operations BI dataset exported in CSV format.',
      type: 'success',
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#07563B]">
            <span>Business Intelligence</span>
            <span>•</span>
            <span>Omnichannel Retail Metrics</span>
          </div>
          <h1 className="text-2xl font-bold text-[#202A25] tracking-tight mt-1">
            Reports & Operational Analytics
          </h1>
          <p className="text-xs text-[#6B756F] mt-0.5">
            Holistic performance analytics tracking GMV, product velocity, promotion ROI, delivery SLAs and reverse loss rates.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center p-1 rounded-xl bg-white border border-[#E1E8E1] text-xs">
            <button
              onClick={() => setDateRange('7d')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                dateRange === '7d' ? 'bg-[#07563B] text-white shadow-xs' : 'text-[#6B756F]'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setDateRange('30d')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                dateRange === '30d' ? 'bg-[#07563B] text-white shadow-xs' : 'text-[#6B756F]'
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setDateRange('qtd')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                dateRange === 'qtd' ? 'bg-[#07563B] text-white shadow-xs' : 'text-[#6B756F]'
              }`}
            >
              QTD
            </button>
          </div>

          <button
            onClick={handleExportReport}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#07563B] text-xs font-bold text-white hover:bg-[#06452F] shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#C6F04A]" />
            Export BI Dataset
          </button>
        </div>
      </div>

      {/* KPI Overview Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs">
          <span className="text-[11px] font-semibold text-[#6B756F] uppercase tracking-wider block">
            Gross GMV (30D)
          </span>
          <div className="text-2xl font-black text-[#202A25] mt-1">₹5.42 Cr</div>
          <div className="flex items-center gap-1 text-[11px] text-[#07563B] font-semibold mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +14.2% YoY
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs">
          <span className="text-[11px] font-semibold text-[#6B756F] uppercase tracking-wider block">
            Average Basket (AOV)
          </span>
          <div className="text-2xl font-black text-[#202A25] mt-1">₹1,280</div>
          <div className="text-[11px] text-[#07563B] font-semibold mt-1">4.8 units / basket</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs">
          <span className="text-[11px] font-semibold text-[#6B756F] uppercase tracking-wider block">
            On-Time Fulfilment
          </span>
          <div className="text-2xl font-black text-[#07563B] mt-1">98.4%</div>
          <div className="text-[11px] text-[#07563B] font-semibold mt-1">Exceeds 95% target</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs">
          <span className="text-[11px] font-semibold text-[#6B756F] uppercase tracking-wider block">
            Annual Stock Turn
          </span>
          <div className="text-2xl font-black text-[#202A25] mt-1">5.6x</div>
          <div className="text-[11px] text-[#6B756F] mt-1">Optimal liquidity</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs">
          <span className="text-[11px] font-semibold text-[#6B756F] uppercase tracking-wider block">
            Refund / Return Ratio
          </span>
          <div className="text-2xl font-black text-[#07563B] mt-1">1.4%</div>
          <div className="text-[11px] text-[#07563B] font-semibold mt-1">-0.3% vs prior month</div>
        </div>
      </div>

      {/* Grid: Domain Breakdown + Brand Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales by Retail Domain */}
        <div className="p-6 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#202A25] uppercase tracking-wider flex items-center gap-2">
              <PieChart className="w-4 h-4 text-[#07563B]" />
              GMV Share by Retail Domain
            </h3>
            <span className="text-xs text-[#07563B] font-semibold">Total: ₹5.42 Cr</span>
          </div>

          <div className="space-y-3 pt-2 text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Food & Grocery Staples (58%)</span>
                <span className="text-[#07563B]">₹3.14 Cr</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-100">
                <div className="h-full rounded-full bg-[#07563B]" style={{ width: '58%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Beauty & Personal Care (18%)</span>
                <span className="text-[#07563B]">₹97.5 Lakh</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-100">
                <div className="h-full rounded-full bg-[#C6F04A]" style={{ width: '18%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Electronics & Smart Audio (14%)</span>
                <span className="text-[#07563B]">₹75.8 Lakh</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-100">
                <div className="h-full rounded-full bg-blue-600" style={{ width: '14%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Fashion & Apparel (10%)</span>
                <span className="text-[#07563B]">₹54.2 Lakh</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-100">
                <div className="h-full rounded-full bg-amber-500" style={{ width: '10%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Top Procurement Brands by Revenue */}
        <div className="p-6 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#202A25] uppercase tracking-wider flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#07563B]" />
              Brand Procurement Revenue Ranking
            </h3>
            <Link href="/admin/brands" className="text-xs text-[#07563B] font-semibold hover:underline">
              View Brands
            </Link>
          </div>

          <div className="space-y-3 pt-2 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F7F0]">
              <div>
                <strong className="text-sm text-[#202A25]">1. Aashirvaad (ITC Ltd)</strong>
                <span className="text-[11px] text-[#6B756F] block">Food & Grocery • 86 SKUs</span>
              </div>
              <span className="text-sm font-black text-[#07563B]">₹48.2 Lakh</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F7F0]">
              <div>
                <strong className="text-sm text-[#202A25]">2. Tide (Procter & Gamble)</strong>
                <span className="text-[11px] text-[#6B756F] block">Home Care • 92 SKUs</span>
              </div>
              <span className="text-sm font-black text-[#07563B]">₹34.6 Lakh</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F7F0]">
              <div>
                <strong className="text-sm text-[#202A25]">3. Sony Audio</strong>
                <span className="text-[11px] text-[#6B756F] block">Electronics • 42 SKUs</span>
              </div>
              <span className="text-sm font-black text-[#07563B]">₹28.1 Lakh</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F7F0]">
              <div>
                <strong className="text-sm text-[#202A25]">4. Lakmé Cosmetics</strong>
                <span className="text-[11px] text-[#6B756F] block">Beauty • 64 SKUs</span>
              </div>
              <span className="text-sm font-black text-[#07563B]">₹22.4 Lakh</span>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign & Promo Performance Table */}
      <div className="rounded-2xl bg-white border border-[#E1E8E1] shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#E1E8E1] flex justify-between items-center text-xs">
          <h3 className="font-bold text-[#202A25] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#07563B]" />
            Promotions & Coupon Code ROI
          </h3>
          <Link href="/admin/promotions" className="text-[#07563B] font-semibold hover:underline">
            Manage Promotions
          </Link>
        </div>

        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[#E1E8E1] bg-[#F7F7F0] text-[11px] uppercase tracking-wider text-[#6B756F]">
              <th className="py-2.5 px-4 font-semibold">Coupon Code</th>
              <th className="py-2.5 px-4 font-semibold">Campaign Name</th>
              <th className="py-2.5 px-4 font-semibold">Discount Rule</th>
              <th className="py-2.5 px-4 font-semibold text-right">Redemptions</th>
              <th className="py-2.5 px-4 font-semibold text-right">GMV Generated</th>
              <th className="py-2.5 px-4 font-semibold text-right">Promo ROI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E1E8E1]">
            <tr className="hover:bg-[#F7F7F0]/60">
              <td className="py-3 px-4 font-mono font-bold text-[#07563B]">FRESH20</td>
              <td className="py-3 px-4 text-[#202A25]">Morning Farm Fresh Deals</td>
              <td className="py-3 px-4 text-[#6B756F]">20% off above ₹499</td>
              <td className="py-3 px-4 text-right font-bold text-[#202A25]">4,120</td>
              <td className="py-3 px-4 text-right font-bold text-[#07563B]">₹34.8 Lakh</td>
              <td className="py-3 px-4 text-right font-bold text-[#07563B]">4.8x</td>
            </tr>
            <tr className="hover:bg-[#F7F7F0]/60">
              <td className="py-3 px-4 font-mono font-bold text-[#07563B]">HYPER500</td>
              <td className="py-3 px-4 text-[#202A25]">Mega Monthly Grocery Stock-up</td>
              <td className="py-3 px-4 text-[#6B756F]">Flat ₹500 off on ₹2,500</td>
              <td className="py-3 px-4 text-right font-bold text-[#202A25]">1,840</td>
              <td className="py-3 px-4 text-right font-bold text-[#07563B]">₹52.4 Lakh</td>
              <td className="py-3 px-4 text-right font-bold text-[#07563B]">5.6x</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
