"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Boxes,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Barcode,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
  ExternalLink,
} from "lucide-react";
import { useWarehouseStore } from "@/store/warehouseStore";
import type { WarehouseRole } from "@/types/warehouse";

export default function WarehouseLoginPage() {
  const router = useRouter();
  const { availableUsers, availableFacilities, switchUser, switchFacility } = useWarehouseStore();

  const [activeTab, setActiveTab] = useState<"employee" | "partner">("employee");
  const [emailOrId, setEmailOrId] = useState("arjun.m@hypermart.com");
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState("fac-kochi");
  const [rememberStation, setRememberStation] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      // Find matching user or fallback to selected persona
      const matched = availableUsers.find(
        (u) => u.email.toLowerCase() === emailOrId.toLowerCase() || u.employeeBadge.toLowerCase() === emailOrId.toLowerCase()
      ) || availableUsers[0];

      switchFacility(selectedFacility);
      switchUser(matched.id);

      // Route by role per acceptance criteria
      switch (matched.role) {
        case "picker":
          router.push("/warehouse/worker/picker");
          break;
        case "packer":
          router.push("/warehouse/worker/packer");
          break;
        case "quality_checker":
          router.push("/warehouse/worker/quality-checker");
          break;
        case "inventory_officer":
          router.push("/warehouse/worker/inventory-officer");
          break;
        case "courier_operator":
          router.push("/warehouse/courier");
          break;
        case "manager":
        case "supervisor":
        default:
          router.push("/warehouse/dashboard");
          break;
      }
    }, 400);
  };

  const handleQuickPersona = (userId: string, targetPath: string) => {
    switchUser(userId);
    switchFacility(selectedFacility);
    router.push(targetPath);
  };

  return (
    <div className="min-h-screen bg-[#F5F7F6] text-[#17231E] flex flex-col justify-between font-sans">
      {/* ── Top Mini Header ── */}
      <header className="p-4 sm:px-8 flex items-center justify-between border-b border-[#E1E8E3] bg-white">
        <Link href="/" className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-[#033129] flex items-center justify-center text-[#C6F04A] font-bold">
            <Boxes className="w-4 h-4" />
          </span>
          <span className="font-display font-black text-lg text-[#033129] tracking-tight">
            HyperMart WMS
          </span>
        </Link>

        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
          <ShieldCheck className="w-4 h-4 text-[#087A4A]" />
          <span>Fulfillment Facility Access Control</span>
        </div>
      </header>

      {/* ── Main Dual-Panel Layout (Matches Page 01) ── */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-4xl w-full bg-white rounded-3xl border border-[#E1E8E3] shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
          {/* Left Brand & Mission Panel */}
          <div className="bg-[#033129] p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-4 relative z-10">
              <span className="px-3 py-1 rounded-full bg-white/10 text-[11px] font-black uppercase tracking-wider text-[#C6F04A]">
                PAGE 01 — AUTHENTICATION
              </span>

              <h1 className="font-display font-black text-2xl sm:text-3xl text-white leading-tight">
                Enterprise Warehouse Management Portal
              </h1>

              <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                Empowering high-velocity warehouse operations across picking waves, automated packing lines, quality assurance, and courier fleet dispatches.
              </p>
            </div>

            {/* Quick Demo Persona Switcher */}
            <div className="pt-6 relative z-10 border-t border-white/15 space-y-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#C6F04A]">
                Instant Demo Access by Role:
              </p>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <button
                  type="button"
                  onClick={() => handleQuickPersona("usr-mgr", "/warehouse/dashboard")}
                  className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-left font-bold text-white transition truncate"
                >
                  👑 General Manager
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickPersona("usr-pck", "/warehouse/worker/picker")}
                  className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-left font-bold text-white transition truncate"
                >
                  ⚡ Floor Picker
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickPersona("usr-pak", "/warehouse/worker/packer")}
                  className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-left font-bold text-white transition truncate"
                >
                  📦 Packing Table
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickPersona("usr-qc", "/warehouse/worker/quality-checker")}
                  className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-left font-bold text-white transition truncate"
                >
                  🔍 Quality Checker
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickPersona("usr-inv", "/warehouse/worker/inventory-officer")}
                  className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-left font-bold text-white transition truncate"
                >
                  📊 Inventory Officer
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickPersona("usr-courier", "/warehouse/courier")}
                  className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-left font-bold text-white transition truncate"
                >
                  🚚 Courier Handover
                </button>
              </div>
            </div>

            {/* Subtle background glow */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#087A4A] rounded-full blur-3xl opacity-40 pointer-events-none" />
          </div>

          {/* Right Form Panel */}
          <div className="p-8 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Tab Selector */}
              <div className="flex rounded-xl bg-gray-100 p-1 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setActiveTab("employee")}
                  className={`flex-1 py-2 rounded-lg transition ${
                    activeTab === "employee" ? "bg-white text-[#033129] shadow-xs" : "text-gray-500 hover:text-black"
                  }`}
                >
                  Employee Login
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("partner")}
                  className={`flex-1 py-2 rounded-lg transition ${
                    activeTab === "partner" ? "bg-white text-[#033129] shadow-xs" : "text-gray-500 hover:text-black"
                  }`}
                >
                  Partner / Courier
                </button>
              </div>

              <form onSubmit={handleLogin} className="space-y-3.5">
                {/* Facility Selector */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                    Facility / DC Location
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={selectedFacility}
                      onChange={(e) => setSelectedFacility(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs font-semibold bg-[#F5F7F6] border border-[#E1E8E3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#087A4A]"
                    >
                      {availableFacilities.map((f) => (
                        <option key={f.id} value={f.id}>
                          {f.code} — {f.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* ID Input */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                    Employee ID or Company Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={emailOrId}
                      onChange={(e) => setEmailOrId(e.target.value)}
                      placeholder="e.g. EMP-9041 or arjun.m@hypermart.com"
                      className="w-full pl-9 pr-3 py-2 text-xs font-semibold bg-[#F5F7F6] border border-[#E1E8E3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#087A4A]"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                    Security Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-9 pr-10 py-2 text-xs font-semibold bg-[#F5F7F6] border border-[#E1E8E3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#087A4A]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Options row */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-1.5 cursor-pointer text-gray-600 font-medium">
                    <input
                      type="checkbox"
                      checked={rememberStation}
                      onChange={(e) => setRememberStation(e.target.checked)}
                      className="rounded text-[#087A4A] focus:ring-[#087A4A]"
                    />
                    <span>Remember terminal</span>
                  </label>
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Contact IT Ops Helpdesk: ext 4401"); }} className="text-[#087A4A] hover:underline font-bold">
                    Forgot Password?
                  </a>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#087A4A] hover:bg-[#07563F] text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                >
                  {loading ? (
                    <span>Authenticating station...</span>
                  ) : (
                    <>
                      <span>Sign In to Terminal</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
              <span>Station Security v2.4</span>
              <span>Encrypted TLS 1.3</span>
            </div>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="p-4 text-center text-xs text-gray-400 border-t border-[#E1E8E3] bg-white">
        HyperMart Operations Platform • Central DC Operations • Internal Enterprise Use Only
      </footer>
    </div>
  );
}

