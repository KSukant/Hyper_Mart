"use client";

import { useState } from "react";
import {
  X,
  Check,
  ArrowLeft,
  Truck,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  Box,
  ChevronDown,
  Tv,
  Refrigerator,
  Laptop,
  Smartphone,
  Headphones,
  Zap,
} from "lucide-react";
import type { Product } from "@/types";
import { toast } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";
import type { PdpSelection } from "../types";
import { getProductHomeFitSpec } from "@/lib/electronicsData";

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
  const fitSpec = getProductHomeFitSpec(p);

  const [door, setDoor] = useState(String(Math.max(850, fitSpec.minDoorwayWidthMm + 50)));
  const [passage, setPassage] = useState(String(Math.max(900, fitSpec.minDoorwayWidthMm + 100)));
  const [floor, setFloor] = useState("Ground floor");
  const [lift, setLift] = useState("Yes");
  const [room, setRoom] = useState(String(fitSpec.widthMm + 200));
  const [installationReq, setInstallationReq] = useState("Standard installation (Free)");
  const [teamReq, setTeamReq] = useState(
    fitSpec.weightKg > 40 ? "Heavy team (2-3 people)" : "Standard delivery (1-2 people)"
  );

  if (!open) return null;

  const doorNum = Number(door) || 0;
  const passageNum = Number(passage) || 0;
  const roomNum = Number(room) || 0;

  const fitsDoor = doorNum >= fitSpec.minDoorwayWidthMm;
  const fitsPassage = passageNum >= fitSpec.minDoorwayWidthMm;
  const fitsRoom = roomNum >= fitSpec.widthMm;
  const allFit = fitsDoor && fitsPassage && fitsRoom;

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
    toast(`Home-fit assessment saved for ${p.name}`);
    onClose();
  };

  const renderProductIllustration = () => {
    if (p.categoryId === "elec-tv") {
      return (
        <div className="relative w-full max-w-[240px] mx-auto py-4">
          <div className="text-[10px] font-bold text-muted text-center mb-1">
            {fitSpec.widthMm} mm (W)
          </div>
          <div className="aspect-16/9 w-full rounded-xl bg-neutral-900 border-2 border-neutral-700 p-2 shadow-lg flex flex-col justify-between">
            <div className="flex justify-between items-center text-[8px] text-white/50 px-1">
              <span>{p.attrs?.department === "electronics" && p.attrs.model ? String(p.attrs.model) : "Smart Display"}</span>
              <span className="font-mono text-[#B8F34A]">{fitSpec.wallMountable ? "VESA Mountable" : "Tabletop Stand"}</span>
            </div>
            <div className="h-full flex items-center justify-center">
              <Tv className="h-10 w-10 text-white/30" />
            </div>
            <div className="text-center text-[9px] font-bold text-white/70">
              LED Panel ({fitSpec.weightKg} kg)
            </div>
          </div>
          <div className="mx-auto h-3 w-16 bg-neutral-600 rounded-b-md shadow-xs" />
          <div className="mx-auto h-1 w-24 bg-neutral-700 rounded-full" />
          <div className="text-[10px] font-bold text-muted text-center mt-1">
            Height: {fitSpec.heightMm} mm · Depth: {fitSpec.depthMm} mm
          </div>
        </div>
      );
    }

    if (p.categoryId === "elec-appliances") {
      return (
        <div className="relative w-full max-w-[170px] mx-auto py-2">
          <div className="text-[10px] font-bold text-muted text-center mb-1">
            {fitSpec.widthMm} mm (W)
          </div>
          <div className="h-56 w-full rounded-2xl bg-gradient-to-b from-neutral-100 via-neutral-200 to-neutral-300 border border-neutral-400 p-2 shadow-md flex flex-col justify-between">
            <div className="h-22 w-full rounded-xl bg-white border border-neutral-300 flex justify-end p-2 shadow-2xs">
              <div className="h-10 w-1.5 bg-[#085A2E]/60 rounded-full" />
            </div>
            <div className="h-28 w-full rounded-xl bg-white border border-neutral-300 flex justify-end p-2 shadow-2xs">
              <div className="h-12 w-1.5 bg-[#085A2E]/60 rounded-full" />
            </div>
          </div>
          <div className="text-[10px] font-bold text-muted text-center mt-1">
            Height: {fitSpec.heightMm} mm · {fitSpec.weightKg} kg
          </div>
        </div>
      );
    }

    if (p.categoryId === "elec-laptops") {
      return (
        <div className="relative w-full max-w-[220px] mx-auto py-4">
          <div className="text-[10px] font-bold text-muted text-center mb-1">
            {fitSpec.widthMm} mm (W)
          </div>
          <div className="aspect-16/10 w-full rounded-t-xl bg-neutral-900 border border-neutral-700 p-2 shadow-md flex items-center justify-center">
            <Laptop className="h-10 w-10 text-[#B8F34A]/80" />
          </div>
          <div className="h-2.5 w-full bg-neutral-300 border-x border-b border-neutral-400 rounded-b-lg shadow-inner" />
          <div className="text-[10px] font-bold text-muted text-center mt-1">
            Thickness: {fitSpec.depthMm} mm · {fitSpec.weightKg} kg
          </div>
        </div>
      );
    }

    if (p.categoryId === "elec-audio") {
      return (
        <div className="relative w-full max-w-[200px] mx-auto py-4 text-center">
          <div className="aspect-square w-28 mx-auto rounded-3xl bg-[#F0F8EC] border border-[#DCEDD2] flex items-center justify-center shadow-xs">
            <Headphones className="h-14 w-14 text-[#085A2E]" />
          </div>
          <div className="text-[10px] font-bold text-muted mt-2">
            Compact Audio Profile · {fitSpec.weightKg} kg
          </div>
        </div>
      );
    }

    // Mobiles default
    return (
      <div className="relative w-full max-w-[130px] mx-auto py-4">
        <div className="aspect-9/19 w-full rounded-3xl bg-neutral-900 border-2 border-neutral-700 p-2 shadow-lg flex flex-col justify-between">
          <div className="mx-auto h-2 w-10 bg-neutral-700 rounded-full" />
          <div className="flex items-center justify-center">
            <Smartphone className="h-10 w-10 text-[#B8F34A]" />
          </div>
          <div className="mx-auto h-1 w-12 bg-neutral-600 rounded-full" />
        </div>
        <div className="text-[10px] font-bold text-muted text-center mt-1">
          {fitSpec.heightMm} × {fitSpec.widthMm} mm · {fitSpec.weightKg} kg
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Top Navbar */}
        <div className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-ink sm:text-sm cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 text-[#085A2E]" /> Back to product
          </button>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex rounded-full bg-[#F0F8EC] border border-[#DCEDD2] px-2.5 py-0.5 text-xs font-bold text-[#085A2E]">
              HyperMart Doorstep Delivery &amp; Fit Check
            </span>
            <button
              type="button"
              onClick={onClose}
              className="grid h-8 w-8 place-items-center rounded-full hover:bg-neutral-100 text-muted hover:text-ink cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-[#085A2E] text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5">
                Will It Fit?
              </span>
              <span className="text-xs font-bold text-muted">
                {p.categoryId || "Electronics & Appliances"}
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl mt-1">
              Home-Fit Assessment for {p.name}
            </h2>
            <p className="mt-1 text-xs text-muted sm:text-sm">
              Verify doorway dimensions, hallway turns, electrical power sockets, and installation access before delivery.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
            {/* Column 1: 3D Product Visual & Authoritative Dimensions (3 cols) */}
            <div className="space-y-4 lg:col-span-3">
              <div className="rounded-2xl border border-[#DCEDD2] bg-[#F0F8EC]/40 p-4 text-center flex flex-col items-center justify-center">
                {renderProductIllustration()}

                <div className="mt-4 w-full text-left rounded-xl border border-line bg-white p-3 space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-[#085A2E]">
                    <Box className="h-4 w-4" />
                    <span>Authorised Product Specs</span>
                  </div>
                  <div className="text-[11px] text-neutral-700 space-y-1 pt-1">
                    <p className="flex justify-between">
                      <span className="text-muted">Height:</span>
                      <strong className="font-bold">{fitSpec.heightMm} mm</strong>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-muted">Width:</span>
                      <strong className="font-bold">{fitSpec.widthMm} mm</strong>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-muted">Depth:</span>
                      <strong className="font-bold">{fitSpec.depthMm} mm</strong>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-muted">Weight:</span>
                      <strong className="font-bold">{fitSpec.weightKg} kg</strong>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-muted">Power Requirement:</span>
                      <strong className="font-bold">{fitSpec.powerRequirement}</strong>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-muted">Clearance Margin:</span>
                      <strong className="font-bold">
                        {fitSpec.recommendedClearanceMm.back}mm back, {fitSpec.recommendedClearanceMm.sides}mm sides
                      </strong>
                    </p>
                  </div>
                </div>

                <div className="mt-3 w-full rounded-xl bg-white border border-[#DCEDD2] p-2.5 text-[10px] text-left text-[#14532D]">
                  <strong className="block font-bold">Min Entry Clearance:</strong>
                  <span>Requires at least {fitSpec.minDoorwayWidthMm} mm clear passage.</span>
                </div>
              </div>
            </div>

            {/* Column 2: Home Entry & Space Inputs (5 cols) */}
            <div className="space-y-5 lg:col-span-5 rounded-2xl border border-line/80 bg-white p-5">
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-[#085A2E]">
                  1. Check Entryway &amp; Room Dimensions
                </h3>
                <p className="text-xs text-muted mt-0.5">
                  Confirm the path from your gate/lift to final installation spot:
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3.5">
                  {/* Door width */}
                  <div>
                    <label className="block text-xs font-bold text-ink">
                      Main door width
                    </label>
                    <span className="block text-[10px] text-muted leading-tight">
                      Narrowest entry frame
                    </span>
                    <div className="relative mt-1">
                      <input
                        type="number"
                        value={door}
                        onChange={(e) => setDoor(e.target.value)}
                        className={cn(
                          "w-full rounded-xl border px-3 py-2 text-xs font-bold text-ink focus:outline-none pr-8",
                          fitsDoor
                            ? "border-line bg-bg focus:border-[#085A2E]"
                            : "border-rose-300 bg-rose-50 text-rose-900 focus:border-rose-600"
                        )}
                      />
                      <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-muted font-semibold">
                        mm
                      </span>
                    </div>
                  </div>

                  {/* Passage width */}
                  <div>
                    <label className="block text-xs font-bold text-ink">
                      Hallway / Stair width
                    </label>
                    <span className="block text-[10px] text-muted leading-tight">
                      Turns or corridors
                    </span>
                    <div className="relative mt-1">
                      <input
                        type="number"
                        value={passage}
                        onChange={(e) => setPassage(e.target.value)}
                        className={cn(
                          "w-full rounded-xl border px-3 py-2 text-xs font-bold text-ink focus:outline-none pr-8",
                          fitsPassage
                            ? "border-line bg-bg focus:border-[#085A2E]"
                            : "border-rose-300 bg-rose-50 text-rose-900 focus:border-rose-600"
                        )}
                      />
                      <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-muted font-semibold">
                        mm
                      </span>
                    </div>
                  </div>

                  {/* Floor */}
                  <div>
                    <label className="block text-xs font-bold text-ink">
                      Delivery Floor
                    </label>
                    <span className="block text-[10px] text-muted leading-tight">
                      Destination floor level
                    </span>
                    <div className="relative mt-1">
                      <select
                        value={floor}
                        onChange={(e) => setFloor(e.target.value)}
                        className="w-full appearance-none rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink focus:border-[#085A2E] focus:outline-none pr-7 cursor-pointer"
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
                    <label className="block text-xs font-bold text-ink">
                      Service / Passenger Lift
                    </label>
                    <span className="block text-[10px] text-muted leading-tight">
                      Lift accessible for cargo
                    </span>
                    <div className="relative mt-1">
                      <select
                        value={lift}
                        onChange={(e) => setLift(e.target.value)}
                        className="w-full appearance-none rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink focus:border-[#085A2E] focus:outline-none pr-7 cursor-pointer"
                      >
                        <option value="Yes">Yes (Lift available)</option>
                        <option value="No">No (Staircase only)</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted" />
                    </div>
                  </div>

                  {/* Placement room width */}
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-ink">
                      Dedicated Placement / Wall Space
                    </label>
                    <span className="block text-[10px] text-muted leading-tight">
                      Available width where device will sit or mount
                    </span>
                    <div className="relative mt-1">
                      <input
                        type="number"
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                        className={cn(
                          "w-full rounded-xl border px-3 py-2 text-xs font-bold text-ink focus:outline-none pr-8",
                          fitsRoom
                            ? "border-line bg-bg focus:border-[#085A2E]"
                            : "border-rose-300 bg-rose-50 text-rose-900 focus:border-rose-600"
                        )}
                      />
                      <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-muted font-semibold">
                        mm
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Installation Preferences */}
              <div className="border-t border-line/60 pt-4 space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#085A2E]">
                  2. Installation &amp; Technician Booking
                </h3>
                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-ink">
                      Installation service
                    </label>
                    <div className="relative mt-1">
                      <select
                        value={installationReq}
                        onChange={(e) => setInstallationReq(e.target.value)}
                        className="w-full appearance-none rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink focus:border-[#085A2E] focus:outline-none pr-7 cursor-pointer"
                      >
                        <option value="Standard installation (Free)">
                          Certified HyperMart Installation (Free)
                        </option>
                        <option value="Unpack & Demo only">
                          Unpack &amp; Demo only
                        </option>
                        <option value="Delivery only">
                          Box Delivery Only (No installation)
                        </option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink">
                      Handling crew requirement
                    </label>
                    <div className="relative mt-1">
                      <select
                        value={teamReq}
                        onChange={(e) => setTeamReq(e.target.value)}
                        className="w-full appearance-none rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink focus:border-[#085A2E] focus:outline-none pr-7 cursor-pointer"
                      >
                        <option value="Standard delivery (1-2 people)">
                          Standard crew (1-2 specialists)
                        </option>
                        <option value="Heavy team (2-3 people)">
                          Heavy lifting crew (2-3 specialists)
                        </option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Fits Your Home Verdict & Next Steps (4 cols) */}
            <div className="space-y-4 lg:col-span-4 rounded-2xl border border-line/80 bg-white p-5 shadow-sm">
              <p className="text-xs font-black uppercase tracking-wider text-[#085A2E]">
                3. Space &amp; Clearance Verdict
              </p>

              {allFit ? (
                <div className="rounded-2xl border border-[#DCEDD2] bg-[#F0F8EC] p-3.5 space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-[#085A2E] text-white shrink-0 shadow-xs">
                      <Check className="h-5 w-5 stroke-[3]" />
                    </span>
                    <div>
                      <h3 className="text-sm font-extrabold text-[#085A2E]">
                        Guaranteed Home Fit
                      </h3>
                      <p className="text-[11px] text-[#14532D]">
                        Clear passage from gate to room confirmed.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3.5 space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-amber-600 text-white shrink-0 shadow-xs">
                      <AlertTriangle className="h-4 w-4 stroke-[2.5]" />
                    </span>
                    <div>
                      <h3 className="text-sm font-extrabold text-amber-900">
                        Tight Fit Detected
                      </h3>
                      <p className="text-[11px] text-amber-800">
                        Special handling or box-free transit required.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Status Checks */}
              <div className="space-y-2 border-t border-line/60 pt-3 text-xs">
                <p className="flex items-center gap-2">
                  {fitsDoor ? (
                    <CheckCircle2 className="h-4 w-4 text-[#085A2E] shrink-0" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                  )}
                  <span className={fitsDoor ? "text-ink" : "text-amber-900 font-bold"}>
                    Doorway ({door} mm vs min {fitSpec.minDoorwayWidthMm} mm)
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  {fitsPassage ? (
                    <CheckCircle2 className="h-4 w-4 text-[#085A2E] shrink-0" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                  )}
                  <span className={fitsPassage ? "text-ink" : "text-amber-900 font-bold"}>
                    Hallway / Stair turn clearance
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  {fitsRoom ? (
                    <CheckCircle2 className="h-4 w-4 text-[#085A2E] shrink-0" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                  )}
                  <span className={fitsRoom ? "text-ink" : "text-amber-900 font-bold"}>
                    Space width ({room} mm vs {fitSpec.widthMm} mm)
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#085A2E] shrink-0" />
                  <span className="text-ink">
                    Power supply ({fitSpec.powerRequirement})
                  </span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-line/60 pt-3 space-y-3">
                <button
                  type="button"
                  onClick={handleSave}
                  className="w-full rounded-2xl bg-[#085A2E] hover:bg-[#064825] text-white py-3 text-xs font-black transition shadow-sm cursor-pointer"
                >
                  Confirm &amp; Attach Fit Report
                </button>
                <p className="text-center text-[10px] text-muted">
                  Attached to your order so the delivery van and installation technician arrive with appropriate trollies and mounts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
