'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Radio,
  Warehouse,
  Truck,
  ScanBarcode,
  PackageCheck,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RefreshCw,
  SlidersHorizontal,
  ChevronRight,
  ShieldAlert,
  ArrowUpRight,
  Flame,
  Layers,
  Activity,
  Play,
  Pause,
  Box,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { useAdminStore } from '@/store/adminStore';

interface WaveRow {
  id: string;
  destination: string;
  hub: 'Coimbatore DC' | 'Chennai FC';
  totalOrders: number;
  packedOrders: number;
  dockGate: string;
  targetCutoff: string;
  timeRemaining: string;
  status: 'Loading' | 'Staging' | 'Packing' | 'Delayed' | 'Departed';
  carrier: string;
  vehicleNo: string;
  priority: 'High' | 'Normal' | 'Critical';
}

const INITIAL_WAVES: WaveRow[] = [
  {
    id: 'W-7241',
    destination: 'Coimbatore Urban Core (Slots 1-4)',
    hub: 'Coimbatore DC',
    totalOrders: 420,
    packedOrders: 420,
    dockGate: 'Gate D-02',
    targetCutoff: '14:00',
    timeRemaining: 'Departed (13:54)',
    status: 'Departed',
    carrier: 'HyperMart Fleet 12',
    vehicleNo: 'TN-38-BK-4012',
    priority: 'Normal',
  },
  {
    id: 'W-7242',
    destination: 'Chennai South & OMR Corridor',
    hub: 'Chennai FC',
    totalOrders: 680,
    packedOrders: 612,
    dockGate: 'Gate D-04',
    targetCutoff: '15:30',
    timeRemaining: '1h 12m',
    status: 'Loading',
    carrier: 'BlueDart Linehaul',
    vehicleNo: 'TN-09-CQ-8941',
    priority: 'Critical',
  },
  {
    id: 'W-7243',
    destination: 'Bangalore Electronic City Interstate Transfer',
    hub: 'Coimbatore DC',
    totalOrders: 940,
    packedOrders: 658,
    dockGate: 'Gate D-07',
    targetCutoff: '17:00',
    timeRemaining: '2h 36m',
    status: 'Staging',
    carrier: 'Delhivery CrossDock',
    vehicleNo: 'KA-01-MJ-6720',
    priority: 'High',
  },
  {
    id: 'W-7244',
    destination: 'Salem & Erode Regional Feeder',
    hub: 'Coimbatore DC',
    totalOrders: 310,
    packedOrders: 210,
    dockGate: 'Gate D-09',
    targetCutoff: '18:15',
    timeRemaining: '3h 51m',
    status: 'Packing',
    carrier: 'HyperMart Line 04',
    vehicleNo: 'TN-33-AB-1982',
    priority: 'Normal',
  },
  {
    id: 'W-7245',
    destination: 'Madurai Cross-dock Feeder',
    hub: 'Chennai FC',
    totalOrders: 510,
    packedOrders: 395,
    dockGate: 'Gate D-05',
    targetCutoff: '16:00',
    timeRemaining: '1h 42m',
    status: 'Delayed',
    carrier: 'Shadowfax Express',
    vehicleNo: 'TN-58-KL-7721',
    priority: 'Critical',
  },
];

export default function WarehouseReadinessPage() {
  const { currentFacility, setFacility, addToast } = useAdminStore();
  const [selectedHub, setSelectedHub] = useState<string>('all');
  const [waves, setWaves] = useState<WaveRow[]>(INITIAL_WAVES);
  const [selectedWave, setSelectedWave] = useState<WaveRow | null>(null);
  const [isLiveStream, setIsLiveStream] = useState(true);
  const [lastHeartbeat, setLastHeartbeat] = useState('Just now');
  const [gateHoldModal, setGateHoldModal] = useState<string | null>(null);

  // Sync facility if selected
  useEffect(() => {
    if (currentFacility === 'Coimbatore DC') setSelectedHub('Coimbatore DC');
    else if (currentFacility === 'Chennai FC') setSelectedHub('Chennai FC');
  }, [currentFacility]);

  // Live seconds ticker simulation
  useEffect(() => {
    if (!isLiveStream) return;
    const interval = setInterval(() => {
      const now = new Date();
      setLastHeartbeat(now.toLocaleTimeString('en-IN', { hour12: false }));
    }, 4000);
    return () => clearInterval(interval);
  }, [isLiveStream]);

  const filteredWaves = waves.filter((w) => {
    if (selectedHub === 'all') return true;
    return w.hub === selectedHub;
  });

  const handleHoldGate = (waveId: string) => {
    setWaves((prev) =>
      prev.map((w) => (w.id === waveId ? { ...w, status: 'Delayed' } : w))
    );
    addToast({
      title: 'Gate Hold Imposed',
      description: `Wave ${waveId} is held at dock. Audit event logged.`,
      type: 'warning',
    });
    setGateHoldModal(null);
  };

  const handleReleaseGate = (waveId: string) => {
    setWaves((prev) =>
      prev.map((w) => (w.id === waveId ? { ...w, status: 'Loading' } : w))
    );
    addToast({
      title: 'Gate Released for Dispatch',
      description: `Wave ${waveId} manifest validated and released.`,
      type: 'success',
    });
    setSelectedWave(null);
  };

  return (
    <div className="space-y-6 text-[#EAF5E9]">
      {/* Top Banner / Operational Context Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#062615] via-[#08301B] to-[#041B0E] border border-[#0D4428] shadow-xl">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-[#C6F04A]/10 border border-[#C6F04A]/30 text-[#C6F04A]">
            <Radio className="w-6 h-6 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#C6F04A] animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase bg-[#C6F04A] text-[#062615]">
                Control Room Live
              </span>
              <span className="text-xs text-[#8FA998]">
                Shift A (06:00 – 14:30) • Hub Corridor Tamil Nadu
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight mt-0.5">
              Warehouse & Fulfilment Readiness
            </h1>
          </div>
        </div>

        {/* Live Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Hub filter tabs */}
          <div className="flex items-center p-1 rounded-xl bg-[#02140A] border border-[#0D4428]">
            <button
              onClick={() => {
                setSelectedHub('all');
                setFacility('All Facilities');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedHub === 'all'
                  ? 'bg-[#C6F04A] text-[#062615] shadow-sm'
                  : 'text-[#8FA998] hover:text-white'
              }`}
            >
              All Hubs (2)
            </button>
            <button
              onClick={() => {
                setSelectedHub('Coimbatore DC');
                setFacility('Coimbatore DC');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedHub === 'Coimbatore DC'
                  ? 'bg-[#C6F04A] text-[#062615] shadow-sm'
                  : 'text-[#8FA998] hover:text-white'
              }`}
            >
              Coimbatore DC
            </button>
            <button
              onClick={() => {
                setSelectedHub('Chennai FC');
                setFacility('Chennai FC');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedHub === 'Chennai FC'
                  ? 'bg-[#C6F04A] text-[#062615] shadow-sm'
                  : 'text-[#8FA998] hover:text-white'
              }`}
            >
              Chennai FC
            </button>
          </div>

          {/* Live toggle */}
          <button
            onClick={() => setIsLiveStream(!isLiveStream)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-medium transition-all ${
              isLiveStream
                ? 'bg-[#0E3A22] border-[#C6F04A]/40 text-[#C6F04A]'
                : 'bg-[#02140A] border-[#0D4428] text-gray-400'
            }`}
          >
            {isLiveStream ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isLiveStream ? 'Stream Active' : 'Stream Paused'}
          </button>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#02140A] border border-[#0D4428] text-xs text-[#8FA998]">
            <Clock className="w-3.5 h-3.5 text-[#C6F04A]" />
            <span>Sync: {lastHeartbeat}</span>
          </div>
        </div>
      </div>

      {/* Critical Alerts Banner (Missed Handoff / Cold Chain) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-start gap-3 p-4 rounded-xl bg-[#381E0D]/80 border border-[#F2B544]/40 text-[#F2B544]">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#F2B544]" />
          <div className="text-xs">
            <span className="font-bold uppercase tracking-wider text-[11px] block text-[#F2B544]">
              Handoff Delay Warning • Dock Gate 4
            </span>
            <p className="mt-0.5 text-amber-100">
              Linehaul truck <strong className="text-white">TN-09-CQ-8941</strong> delayed at Gate 4 by 18 mins due to outbound barcode verification. Chennai FC dispatch buffer reduced to 24 mins.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-[#2D0F14]/80 border border-[#E86B62]/40 text-[#E86B62]">
          <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#E86B62]" />
          <div className="text-xs">
            <span className="font-bold uppercase tracking-wider text-[11px] block text-[#E86B62]">
              Cold-Chain Compliance Check Required
            </span>
            <p className="mt-0.5 text-rose-100">
              Batch <strong className="text-white">CC-092 (Dairy & Fresh Meat)</strong> temperature log pending audit verification at Coimbatore Chilled Bay 2 before dispatch seal is stamped.
            </p>
          </div>
        </div>
      </div>

      {/* Dual Facility Readiness Status Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Coimbatore DC Card */}
        <div className="p-6 rounded-2xl bg-[#062615] border border-[#0D4428] shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#C6F04A]/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#02140A] border border-[#0D4428] text-[#C6F04A]">
                <Warehouse className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white">Coimbatore DC</h2>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#0E3A22] text-[#C6F04A] border border-[#C6F04A]/30">
                    Primary Mother Hub
                  </span>
                </div>
                <p className="text-xs text-[#8FA998]">Avinashi Road Logistics Park • Zone 1 to 14</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-2xl font-black text-[#C6F04A]">96.4%</span>
              <p className="text-[11px] uppercase tracking-wider text-[#8FA998]">Readiness Index</p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-4 gap-3 mt-6 pt-5 border-t border-[#0D4428]">
            <div className="p-3 rounded-xl bg-[#02140A]/60 border border-[#0D4428]/60">
              <span className="text-[11px] text-[#8FA998] block">Picking Zones</span>
              <span className="text-base font-bold text-white mt-0.5 block">14 / 14</span>
              <span className="text-[10px] text-[#C6F04A] flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3 h-3" /> All Active
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#02140A]/60 border border-[#0D4428]/60">
              <span className="text-[11px] text-[#8FA998] block">Scanner Fleet</span>
              <span className="text-base font-bold text-white mt-0.5 block">82 / 84</span>
              <span className="text-[10px] text-[#8FA998] mt-0.5 block">2 Charging</span>
            </div>
            <div className="p-3 rounded-xl bg-[#02140A]/60 border border-[#0D4428]/60">
              <span className="text-[11px] text-[#8FA998] block">Dock Gates</span>
              <span className="text-base font-bold text-white mt-0.5 block">10 / 12</span>
              <span className="text-[10px] text-[#C6F04A] mt-0.5 block">2 Idle Staging</span>
            </div>
            <div className="p-3 rounded-xl bg-[#02140A]/60 border border-[#0D4428]/60">
              <span className="text-[11px] text-[#8FA998] block">Interstate Cut-off</span>
              <span className="text-base font-bold text-[#F2B544] mt-0.5 block">2h 36m</span>
              <span className="text-[10px] text-[#8FA998] mt-0.5 block">17:00 BLR Line</span>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between text-xs">
            <span className="text-[#8FA998]">Daily Wave Throughput: <strong>14 Waves scheduled</strong> (11 finished)</span>
            <button
              onClick={() => {
                setSelectedHub('Coimbatore DC');
                setFacility('Coimbatore DC');
              }}
              className="text-[#C6F04A] hover:underline flex items-center gap-1 font-semibold"
            >
              View DC Board <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Chennai FC Card */}
        <div className="p-6 rounded-2xl bg-[#062615] border border-[#0D4428] shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#C6F04A]/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#02140A] border border-[#0D4428] text-[#C6F04A]">
                <Warehouse className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white">Chennai FC</h2>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#0E3A22] text-[#8FA998] border border-[#0D4428]">
                    Regional Fulfilment
                  </span>
                </div>
                <p className="text-xs text-[#8FA998]">Sriperumbudur Hub • Zone A to L</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-2xl font-black text-[#F2B544]">89.2%</span>
              <p className="text-[11px] uppercase tracking-wider text-[#8FA998]">Readiness Index</p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-4 gap-3 mt-6 pt-5 border-t border-[#0D4428]">
            <div className="p-3 rounded-xl bg-[#02140A]/60 border border-[#0D4428]/60">
              <span className="text-[11px] text-[#8FA998] block">Picking Zones</span>
              <span className="text-base font-bold text-white mt-0.5 block">11 / 12</span>
              <span className="text-[10px] text-[#F2B544] flex items-center gap-1 mt-0.5">
                <AlertTriangle className="w-3 h-3" /> Zone C Maint.
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#02140A]/60 border border-[#0D4428]/60">
              <span className="text-[11px] text-[#8FA998] block">Scanner Fleet</span>
              <span className="text-base font-bold text-white mt-0.5 block">44 / 46</span>
              <span className="text-[10px] text-[#8FA998] mt-0.5 block">2 Offline</span>
            </div>
            <div className="p-3 rounded-xl bg-[#02140A]/60 border border-[#0D4428]/60">
              <span className="text-[11px] text-[#8FA998] block">Dock Gates</span>
              <span className="text-base font-bold text-white mt-0.5 block">4 / 6</span>
              <span className="text-[10px] text-[#F2B544] mt-0.5 block">1 Delay (Gate 4)</span>
            </div>
            <div className="p-3 rounded-xl bg-[#02140A]/60 border border-[#0D4428]/60">
              <span className="text-[11px] text-[#8FA998] block">Intra-city Cut-off</span>
              <span className="text-base font-bold text-[#E86B62] mt-0.5 block">1h 12m</span>
              <span className="text-[10px] text-[#8FA998] mt-0.5 block">15:30 OMR Wave</span>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between text-xs">
            <span className="text-[#8FA998]">Daily Wave Throughput: <strong>10 Waves scheduled</strong> (6 finished)</span>
            <button
              onClick={() => {
                setSelectedHub('Chennai FC');
                setFacility('Chennai FC');
              }}
              className="text-[#C6F04A] hover:underline flex items-center gap-1 font-semibold"
            >
              View FC Board <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Outbound Dispatch Cut-off Timeline Bar */}
      <div className="p-5 rounded-2xl bg-[#062615] border border-[#0D4428]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#C6F04A]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Outbound Dispatch Cut-off Windows (Today)
            </h3>
          </div>
          <span className="text-xs text-[#8FA998]">Timezone: IST (UTC+5:30)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-[#02140A] border border-[#0E3A22] flex items-center justify-between">
            <div>
              <span className="text-[11px] text-[#8FA998] block font-medium">14:00 Express Coimbatore</span>
              <span className="text-sm font-bold text-[#C6F04A] mt-0.5 block">Departed (100%)</span>
              <span className="text-[10px] text-[#8FA998]">Wave W-7241 • 420 orders</span>
            </div>
            <CheckCircle2 className="w-6 h-6 text-[#C6F04A]" />
          </div>

          <div className="p-3 rounded-xl bg-[#02140A] border border-[#F2B544]/40 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-[#F2B544] block font-medium">15:30 Chennai South Hub</span>
              <span className="text-sm font-bold text-white mt-0.5 block">Loading (90%)</span>
              <span className="text-[10px] text-[#F2B544]">1h 12m left • W-7242</span>
            </div>
            <div className="w-8 h-8 rounded-full border-2 border-[#F2B544] border-t-transparent animate-spin flex items-center justify-center text-[10px] font-bold text-[#F2B544]">
              90%
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#02140A] border border-[#0D4428] flex items-center justify-between">
            <div>
              <span className="text-[11px] text-[#8FA998] block font-medium">17:00 Bangalore Interstate</span>
              <span className="text-sm font-bold text-white mt-0.5 block">Staging (70%)</span>
              <span className="text-[10px] text-[#8FA998]">2h 36m left • W-7243</span>
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#C6F04A] animate-pulse" />
          </div>

          <div className="p-3 rounded-xl bg-[#02140A] border border-[#0D4428] flex items-center justify-between">
            <div>
              <span className="text-[11px] text-[#8FA998] block font-medium">19:30 Local Night Express</span>
              <span className="text-sm font-bold text-gray-400 mt-0.5 block">Queued (15%)</span>
              <span className="text-[10px] text-[#8FA998]">Wave W-7246 • 380 orders</span>
            </div>
            <Clock className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Main Live Fulfilment Board Table */}
      <div className="rounded-2xl bg-[#062615] border border-[#0D4428] overflow-hidden shadow-xl">
        <div className="p-5 border-b border-[#0D4428] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#C6F04A]" />
              Live Fulfilment Waves Board
            </h2>
            <p className="text-xs text-[#8FA998] mt-0.5">
              Showing active packing waves across selected operational facilities.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#8FA998]">
              {filteredWaves.length} Active Waves
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#0D4428] bg-[#02140A]/80 text-[11px] uppercase tracking-wider text-[#8FA998]">
                <th className="py-3 px-4 font-semibold">Wave ID</th>
                <th className="py-3 px-4 font-semibold">Hub Facility</th>
                <th className="py-3 px-4 font-semibold">Destination Corridor</th>
                <th className="py-3 px-4 font-semibold">Orders / Progress</th>
                <th className="py-3 px-4 font-semibold">Dock Gate</th>
                <th className="py-3 px-4 font-semibold">Carrier / Vehicle</th>
                <th className="py-3 px-4 font-semibold">Cut-off</th>
                <th className="py-3 px-4 font-semibold">Wave Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0D4428]/60 text-xs">
              {filteredWaves.map((wave) => {
                const percent = Math.round((wave.packedOrders / wave.totalOrders) * 100);
                return (
                  <tr
                    key={wave.id}
                    className="hover:bg-[#08301B]/60 transition-colors group"
                  >
                    <td className="py-3.5 px-4 font-bold text-white">
                      <div className="flex items-center gap-2">
                        <span>{wave.id}</span>
                        {wave.priority === 'Critical' && (
                          <span className="w-2 h-2 rounded-full bg-[#E86B62]" title="Critical Priority" />
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-medium text-[#C6F04A]">
                      {wave.hub}
                    </td>

                    <td className="py-3.5 px-4 text-gray-200">
                      {wave.destination}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="w-36">
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="text-white font-medium">{wave.packedOrders}/{wave.totalOrders}</span>
                          <span className="text-[#8FA998]">{percent}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-[#02140A] overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              percent === 100
                                ? 'bg-[#C6F04A]'
                                : percent >= 75
                                ? 'bg-[#C6F04A]'
                                : percent >= 50
                                ? 'bg-[#F2B544]'
                                : 'bg-[#E86B62]'
                            }`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-medium text-white">
                      {wave.dockGate}
                    </td>

                    <td className="py-3.5 px-4 text-gray-300">
                      <div>{wave.carrier}</div>
                      <div className="text-[10px] text-[#8FA998] font-mono">{wave.vehicleNo}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">{wave.targetCutoff}</div>
                      <div className="text-[10px] text-[#8FA998]">{wave.timeRemaining}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          wave.status === 'Departed'
                            ? 'bg-[#0E3A22] text-[#C6F04A] border border-[#C6F04A]/30'
                            : wave.status === 'Loading'
                            ? 'bg-[#0E3A22] text-[#C6F04A] border border-[#C6F04A]/30'
                            : wave.status === 'Staging'
                            ? 'bg-[#02140A] text-gray-300 border border-[#0D4428]'
                            : wave.status === 'Delayed'
                            ? 'bg-[#381E0D] text-[#F2B544] border border-[#F2B544]/40'
                            : 'bg-[#02140A] text-[#8FA998]'
                        }`}
                      >
                        {wave.status === 'Loading' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C6F04A] animate-ping" />
                        )}
                        {wave.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedWave(wave)}
                          className="px-2.5 py-1 rounded-lg bg-[#02140A] hover:bg-[#0D4428] border border-[#0D4428] text-white font-medium text-xs transition-colors"
                        >
                          Inspect
                        </button>
                        {wave.status !== 'Departed' && wave.status !== 'Delayed' ? (
                          <button
                            onClick={() => setGateHoldModal(wave.id)}
                            className="px-2 py-1 rounded-lg bg-[#381E0D]/60 hover:bg-[#381E0D] border border-[#F2B544]/30 text-[#F2B544] font-medium text-xs transition-colors"
                          >
                            Hold Gate
                          </button>
                        ) : wave.status === 'Delayed' ? (
                          <button
                            onClick={() => handleReleaseGate(wave.id)}
                            className="px-2 py-1 rounded-lg bg-[#0E3A22] hover:bg-[#C6F04A] hover:text-[#062615] border border-[#C6F04A]/40 text-[#C6F04A] font-bold text-xs transition-colors"
                          >
                            Release
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over Inspection Drawer */}
      {selectedWave && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedWave(null)}
          />
          <div className="relative w-full max-w-lg bg-[#062615] border-l border-[#0D4428] text-[#EAF5E9] shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-right duration-200">
            {/* Header */}
            <div className="p-6 border-b border-[#0D4428] flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C6F04A]">
                  Wave Control Drawer
                </span>
                <h2 className="text-xl font-bold text-white mt-0.5">{selectedWave.id} Manifest</h2>
                <p className="text-xs text-[#8FA998]">{selectedWave.destination}</p>
              </div>
              <button
                onClick={() => setSelectedWave(null)}
                className="p-2 rounded-xl bg-[#02140A] text-[#8FA998] hover:text-white border border-[#0D4428]"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-[#02140A] border border-[#0D4428]">
                <div>
                  <span className="text-[11px] text-[#8FA998]">Operating Hub</span>
                  <p className="font-semibold text-white">{selectedWave.hub}</p>
                </div>
                <div>
                  <span className="text-[11px] text-[#8FA998]">Dock Gate</span>
                  <p className="font-mono font-bold text-[#C6F04A]">{selectedWave.dockGate}</p>
                </div>
                <div>
                  <span className="text-[11px] text-[#8FA998]">Assigned Carrier</span>
                  <p className="font-semibold text-white">{selectedWave.carrier}</p>
                </div>
                <div>
                  <span className="text-[11px] text-[#8FA998]">Vehicle Reg.</span>
                  <p className="font-mono text-white">{selectedWave.vehicleNo}</p>
                </div>
              </div>

              {/* Progress Detail */}
              <div className="p-4 rounded-xl bg-[#02140A] border border-[#0D4428] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8FA998]">Packing Completion</span>
                  <span className="font-bold text-[#C6F04A]">
                    {selectedWave.packedOrders} / {selectedWave.totalOrders} Orders
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#062615]">
                  <div
                    className="h-full rounded-full bg-[#C6F04A]"
                    style={{
                      width: `${(selectedWave.packedOrders / selectedWave.totalOrders) * 100}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-[#8FA998]">
                  <span>Target Cut-off: {selectedWave.targetCutoff}</span>
                  <span>{selectedWave.timeRemaining}</span>
                </div>
              </div>

              {/* Pre-dispatch Validation Checklist */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8FA998]">
                  Pre-dispatch Checklist
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#02140A] border border-[#0D4428]">
                    <span>100% Barcode scan validation</span>
                    <span className="text-[#C6F04A] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Passed
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#02140A] border border-[#0D4428]">
                    <span>Driver ID & e-Way bill authenticated</span>
                    <span className="text-[#C6F04A] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Verified
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#02140A] border border-[#0D4428]">
                    <span>Vehicle gross weight sensor reading</span>
                    <span className="text-[#C6F04A] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> 3,420 kg (Safe)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-[#0D4428] flex items-center justify-between gap-3 bg-[#02140A]/60">
              <button
                onClick={() => setSelectedWave(null)}
                className="px-4 py-2 rounded-xl bg-[#02140A] border border-[#0D4428] text-gray-300 hover:text-white font-medium text-xs"
              >
                Close Drawer
              </button>
              {selectedWave.status === 'Delayed' ? (
                <button
                  onClick={() => handleReleaseGate(selectedWave.id)}
                  className="px-4 py-2 rounded-xl bg-[#C6F04A] text-[#062615] font-bold text-xs hover:bg-[#b5e03b]"
                >
                  Force Release Gate
                </button>
              ) : selectedWave.status !== 'Departed' ? (
                <button
                  onClick={() => setGateHoldModal(selectedWave.id)}
                  className="px-4 py-2 rounded-xl bg-[#381E0D] border border-[#F2B544]/40 text-[#F2B544] font-bold text-xs hover:bg-[#4d2913]"
                >
                  Hold Wave Dispatch
                </button>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Gate Hold */}
      {gateHoldModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-2xl bg-[#062615] border border-[#F2B544]/50 shadow-2xl text-[#EAF5E9] space-y-4">
            <div className="flex items-center gap-3 text-[#F2B544]">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-bold text-white">Confirm Gate Hold</h3>
            </div>
            <p className="text-xs text-[#8FA998]">
              Are you sure you want to hold wave <strong className="text-white">{gateHoldModal}</strong>? This will stop loading at the dock gate, notify the linehaul coordinator, and record an audit event.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setGateHoldModal(null)}
                className="px-4 py-2 rounded-xl bg-[#02140A] border border-[#0D4428] text-xs font-semibold text-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleHoldGate(gateHoldModal)}
                className="px-4 py-2 rounded-xl bg-[#F2B544] text-[#062615] text-xs font-bold hover:bg-[#e0a435]"
              >
                Confirm Gate Hold
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
