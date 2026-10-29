"use client";

import { useState } from "react";
import Image from "next/image";
import {
  X,
  Check,
  ArrowLeft,
  Truck,
  Wrench,
  CheckCircle2,
  Box,
  ChevronDown,
  Calendar,
  Clock,
} from "lucide-react";
import type { Product } from "@/types";
import { toast } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";
import type { PdpSelection } from "../types";

interface HomeFitModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  selection: PdpSelection;
  onSave: (updated: Partial<PdpSelection>) => void;
}

export function HomeFitModal({
  open,
  onClose,
  product: p,
  selection,
  onSave,
}: HomeFitModalProps) {
  const [door, setDoor] = useState("900");
  const [passage, setPassage] = useState("920");
  const [floor, setFloor] = useState("Ground floor");
  const [lift, setLift] = useState("Yes");
  const [room, setRoom] = useState("900");
  const [doorSwing, setDoorSwing] = useState("100");
  const [installationReq, setInstallationReq] = useState("Standard installation (no charges)");
  const [teamReq, setTeamReq] = useState("Standard team (2 people)");

  if (!open) return null;

  const handleSave = () => {
    onSave({
      homeFit: {
        door,
        passage,
        floor,
        lift,
        room,
        installation: installationReq,
        team: teamReq,
      },
    });
    toast("Fit and installation details saved");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Top Navbar */}
        <div className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-ink sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4" /> Back to product
          </button>
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full hover:bg-bg text-muted hover:text-ink"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
              Will this fit your home?
            </h2>
            <p className="mt-1 text-xs text-muted sm:text-sm">
              Enter a few details about your home to check fit, installation requirements and delivery support.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
            {/* Column 1: 3D Product Visual & Dimensions (3 cols) */}
            <div className="space-y-4 lg:col-span-3">
              <div className="rounded-2xl border border-line/80 bg-[#F8FAF7] p-5 text-center flex flex-col items-center justify-center">
                {/* Refrigerator/Appliance 3D Dimensional illustration */}
                <div className="relative h-60 w-36 mx-auto flex flex-col items-center justify-between py-2">
                  <div className="absolute -left-6 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted -rotate-90">
                    1770 mm (H)
                  </div>
                  {/* Visual box model */}
                  <div className="h-full w-full rounded-2xl bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400 border border-gray-400 p-2 shadow-md flex flex-col justify-between">
                    <div className="h-24 w-full rounded-xl bg-gray-100 border border-gray-300 flex justify-end p-2">
                      <div className="h-10 w-1.5 bg-gray-400 rounded-full" />
                    </div>
                    <div className="h-28 w-full rounded-xl bg-gray-100 border border-gray-300 flex justify-end p-2">
                      <div className="h-12 w-1.5 bg-gray-400 rounded-full" />
                    </div>
                  </div>
                  <div className="absolute -bottom-4 text-[10px] font-bold text-muted">
                    835 mm (W)
                  </div>
                </div>

                <div className="mt-6 w-full text-left rounded-xl border border-line bg-white p-3 space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-ink">
                    <Box className="h-3.5 w-3.5 text-muted" />
                    <span>Product dimensions</span>
                  </div>
                  <div className="text-[11px] text-muted space-y-0.5 pt-1">
                    <p>Height: 1770 mm</p>
                    <p>Width: 835 mm</p>
                    <p>Depth: 700 mm</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Inputs Questionnaire (5 cols) */}
            <div className="space-y-5 lg:col-span-5 rounded-2xl border border-line/80 bg-white p-5">
              <div>
                <h3 className="text-sm font-extrabold text-ink">
                  1. Measure key areas in your home
                </h3>
                <p className="text-xs text-muted">
                  Enter the available space where the product will go.
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3.5">
                  {/* Door width */}
                  <div>
                    <label className="block text-xs font-bold text-ink">Door width</label>
                    <span className="block text-[10px] text-muted leading-tight">Width of the main door the product will pass through</span>
                    <div className="relative mt-1">
                      <input
                        type="number"
                        value={door}
                        onChange={(e) => setDoor(e.target.value)}
                        className="w-full rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink focus:border-[#1D4E89] focus:bg-white focus:outline-none pr-8"
                      />
                      <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-muted font-semibold">mm</span>
                    </div>
                  </div>

                  {/* Passage width */}
                  <div>
                    <label className="block text-xs font-bold text-ink">Passage width</label>
                    <span className="block text-[10px] text-muted leading-tight">Narrowest point in hallways, staircases or lifts</span>
                    <div className="relative mt-1">
                      <input
                        type="number"
                        value={passage}
                        onChange={(e) => setPassage(e.target.value)}
                        className="w-full rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink focus:border-[#1D4E89] focus:bg-white focus:outline-none pr-8"
                      />
                      <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-muted font-semibold">mm</span>
                    </div>
                  </div>

                  {/* Floor */}
                  <div>
                    <label className="block text-xs font-bold text-ink">Floor</label>
                    <span className="block text-[10px] text-muted leading-tight">Which floor will the product be delivered to?</span>
                    <div className="relative mt-1">
                      <select
                        value={floor}
                        onChange={(e) => setFloor(e.target.value)}
                        className="w-full appearance-none rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink focus:border-[#1D4E89] focus:bg-white focus:outline-none pr-7"
                      >
                        <option value="Ground floor">Ground floor</option>
                        <option value="1st to 3rd floor">1st to 3rd floor</option>
                        <option value="4th floor or higher">4th floor or higher</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted" />
                    </div>
                  </div>

                  {/* Lift available */}
                  <div>
                    <label className="block text-xs font-bold text-ink">Lift available</label>
                    <span className="block text-[10px] text-muted leading-tight">Is there a lift large enough for the product?</span>
                    <div className="relative mt-1">
                      <select
                        value={lift}
                        onChange={(e) => setLift(e.target.value)}
                        className="w-full appearance-none rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink focus:border-[#1D4E89] focus:bg-white focus:outline-none pr-7"
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No / Stairs only</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted" />
                    </div>
                  </div>

                  {/* Room clearance */}
                  <div>
                    <label className="block text-xs font-bold text-ink">Room or clearance space</label>
                    <span className="block text-[10px] text-muted leading-tight">Space where the product will be placed</span>
                    <div className="relative mt-1">
                      <input
                        type="number"
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                        className="w-full rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink focus:border-[#1D4E89] focus:bg-white focus:outline-none pr-8"
                      />
                      <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-muted font-semibold">mm</span>
                    </div>
                  </div>

                  {/* Door swing */}
                  <div>
                    <label className="block text-xs font-bold text-ink">Door swing clearance</label>
                    <span className="block text-[10px] text-muted leading-tight">Additional space needed to open doors fully</span>
                    <div className="relative mt-1">
                      <input
                        type="number"
                        value={doorSwing}
                        onChange={(e) => setDoorSwing(e.target.value)}
                        className="w-full rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink focus:border-[#1D4E89] focus:bg-white focus:outline-none pr-8"
                      />
                      <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-muted font-semibold">mm</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Additional Information */}
              <div className="border-t border-line/60 pt-4 space-y-3">
                <h3 className="text-sm font-extrabold text-ink">2. Additional information</h3>
                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-ink">Installation requirement</label>
                    <span className="block text-[10px] text-muted leading-tight">Any special installation needs?</span>
                    <div className="relative mt-1">
                      <select
                        value={installationReq}
                        onChange={(e) => setInstallationReq(e.target.value)}
                        className="w-full appearance-none rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink focus:border-[#1D4E89] focus:bg-white focus:outline-none pr-7"
                      >
                        <option value="Standard installation (no charges)">Standard installation (no charges)</option>
                        <option value="Unpack only">Unpack only</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink">Delivery team requirement</label>
                    <span className="block text-[10px] text-muted leading-tight">Select if extra help is needed on delivery</span>
                    <div className="relative mt-1">
                      <select
                        value={teamReq}
                        onChange={(e) => setTeamReq(e.target.value)}
                        className="w-full appearance-none rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink focus:border-[#1D4E89] focus:bg-white focus:outline-none pr-7"
                      >
                        <option value="Standard team (2 people)">Standard team (2 people)</option>
                        <option value="Heavy team (3 people)">Heavy team (3 people)</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Fits Your Home Verdict & Next Steps (4 cols) */}
            <div className="space-y-4 lg:col-span-4 rounded-2xl border border-line/80 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#17201B] text-white shrink-0">
                  <Check className="h-4 w-4 stroke-[3]" />
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-ink">Fits your home</h3>
                  <p className="text-[11px] text-muted leading-tight">
                    Great! Based on the details you provided, this product should fit and can be delivered and installed.
                  </p>
                </div>
              </div>

              {/* 3 Green Checks */}
              <div className="space-y-2 border-t border-line/60 pt-3 text-xs text-ink/90">
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#15803D] shrink-0" />
                  <span>Fits through door and passage</span>
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#15803D] shrink-0" />
                  <span>Fits in the selected room space</span>
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#15803D] shrink-0" />
                  <span>Standard delivery and installation supported</span>
                </p>
              </div>

              {/* Next Steps List */}
              <div className="border-t border-line/60 pt-3 space-y-3">
                <h4 className="text-xs font-extrabold text-ink">Next steps</h4>

                {/* Step 1 */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-ink">
                    <span className="grid h-5 w-5 place-items-center rounded-full border border-line bg-bg text-[10px]">
                      1
                    </span>
                    <span>Save fit and installation details</span>
                  </div>
                  <p className="text-[11px] text-muted pl-7">
                    We&apos;ll use this information for a smooth delivery and installation.
                  </p>
                  <div className="pl-7 pt-1">
                    <button
                      type="button"
                      onClick={handleSave}
                      className="w-full rounded-2xl bg-[#17201B] hover:bg-black text-white py-2.5 text-xs font-black transition shadow-sm"
                    >
                      Save fit and installation details
                    </button>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-ink">
                    <span className="grid h-5 w-5 place-items-center rounded-full border border-line bg-bg text-[10px]">
                      2
                    </span>
                    <span>Delivery appointment</span>
                  </div>
                  <p className="text-[11px] text-muted pl-7">
                    Choose a date and time that works for you.
                  </p>
                  <div className="pl-7 pt-1">
                    <button
                      type="button"
                      onClick={() => toast("Appointment scheduled at checkout")}
                      className="w-full rounded-2xl border-2 border-line bg-white hover:bg-bg text-ink py-2 text-xs font-bold transition"
                    >
                      Schedule delivery
                    </button>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="space-y-1 pt-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-ink">
                    <span className="grid h-5 w-5 place-items-center rounded-full border border-line bg-bg text-[10px]">
                      3
                    </span>
                    <span>Installation tracking</span>
                  </div>
                  <p className="text-[11px] text-muted pl-7">
                    Track your delivery and installation in real time.
                  </p>
                  <div className="ml-7 rounded-xl bg-bg p-2 text-[10px] text-muted flex items-center gap-2">
                    <Truck className="h-3.5 w-3.5 text-muted shrink-0" />
                    <span>We&apos;ll keep you updated from dispatch to installation.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
