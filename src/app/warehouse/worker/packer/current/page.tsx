"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Boxes,
  MapPin,
  Clock,
  AlertTriangle,
  ArrowLeft,
  Barcode,
  Printer,
  Check,
  Play,
  Minus,
  Plus,
  Package,
} from "lucide-react";
import { WarehouseWorkerShell } from "@/components/warehouse/WarehouseWorkerShell";

export default function PackerCurrentTaskPage() {
  const [selectedPackaging, setSelectedPackaging] = useState<"small" | "medium" | "large">("medium");
  const [materials, setMaterials] = useState({
    bubbleWrap: true,
    fragileSticker: false,
    airCushion: true,
    sealingTape: true,
  });
  const [notes, setNotes] = useState("");

  const [quantities, setQuantities] = useState({
    bottle: 2,
    headphones: 2,
    mouse: 1,
    backpack: 0,
    cable: 0,
  });

  return (
    <WarehouseWorkerShell
      role="PACKER"
      workerName="Sukant K."
      pageNumber={46}
      currentStep={3}
      title="Current Task"
    >
      <div className="space-y-4">
        {/* Title */}
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Current Task</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Verify items, pack the order and prepare for handoff.
          </p>
        </div>

        {/* Top Header Card matching page_46.png */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-2xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-green-100 flex items-center justify-center text-green-700 flex-shrink-0">
              <Boxes className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <span className="text-xs text-gray-500 font-medium block">Packing Order</span>
              <span className="text-lg font-black text-gray-900 font-mono leading-none">ORD-20261029-0841</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-gray-400" />
              <div>
                <span className="text-gray-400 block text-[10px]">Items</span>
                <span className="font-bold text-gray-900 text-sm">8</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <div>
                <span className="text-gray-400 block text-[10px]">Station</span>
                <span className="font-bold text-gray-900 text-sm">PK-01</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Boxes className="w-4 h-4 text-gray-400" />
              <div>
                <span className="text-gray-400 block text-[10px]">Packaging</span>
                <span className="font-bold text-gray-900 text-sm">Medium Box</span>
              </div>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px]">Priority</span>
              <span className="px-2 py-0.5 rounded bg-red-50 text-red-600 font-bold text-[11px]">High</span>
            </div>
            <div className="flex items-center gap-1.5 text-red-600 font-bold">
              <Clock className="w-4 h-4" />
              <div>
                <span className="text-gray-400 block text-[10px] font-normal">Due In</span>
                <span>15 min</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Row: Left Order & Packing Details + Right Items to Pack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Column (5 cols): Stepper + Order & Packing Details */}
          <div className="lg:col-span-5 space-y-4">
            {/* Stepper Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs">
              <div className="flex items-center gap-1.5 mb-2">
                <Boxes className="w-4 h-4 text-green-700" />
                <h3 className="text-xs font-bold text-gray-900 tracking-tight">Packing Progress</h3>
              </div>
              <div className="flex items-center justify-between px-2 pt-1">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-[10px] font-bold text-gray-800 mt-1">Verify</span>
                </div>
                <div className="flex-1 h-0.5 bg-green-600 mx-2 -mt-4" />
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full border-2 border-green-600 bg-white flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-600" />
                  </div>
                  <span className="text-[10px] font-bold text-green-700 mt-1">Pack</span>
                </div>
                <div className="flex-1 h-0.5 bg-gray-200 mx-2 -mt-4" />
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 bg-white" />
                  <span className="text-[10px] font-medium text-gray-400 mt-1">Label</span>
                </div>
                <div className="flex-1 h-0.5 bg-gray-200 mx-2 -mt-4" />
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 bg-white" />
                  <span className="text-[10px] font-medium text-gray-400 mt-1">Handoff</span>
                </div>
              </div>
            </div>

            {/* Order & Packing Details */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-2xs flex items-center gap-4">
              <div className="relative w-28 h-28 bg-amber-50 rounded-xl flex items-center justify-center p-2 flex-shrink-0 border border-amber-100">
                <Image src="/warehouse/items/cardboard-box.png" alt="Box" fill className="object-contain p-1" unoptimized />
              </div>
              <div className="space-y-1 text-xs text-gray-600 flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <Boxes className="w-3.5 h-3.5 text-green-700" />
                  <h4 className="text-xs font-bold text-gray-900 tracking-tight">Order &amp; Packing Details</h4>
                </div>
                <p>Order ID : <strong className="font-mono text-gray-900">ORD-20261029-0841</strong></p>
                <p>Items : <strong className="text-gray-900">8 Items (8 Units)</strong></p>
                <p>Packaging : <strong className="text-gray-900">Medium Box</strong></p>
                <p>Station : <strong className="font-mono text-gray-900">PK-01</strong></p>
                <p>Priority : <span className="px-1.5 py-0.2 rounded bg-red-50 text-red-600 font-bold text-[10px]">High</span></p>
                <p className="flex items-center gap-1 text-red-600 font-semibold">
                  Due In : <Clock className="w-3 h-3 text-red-500" /> 15 min
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Items to Pack (8) */}
          <div className="lg:col-span-7 bg-white border border-gray-200 rounded-xl p-4 shadow-2xs">
            <div className="flex items-center gap-2 mb-3">
              <Boxes className="w-4 h-4 text-green-700" />
              <h3 className="text-xs font-bold text-gray-900 tracking-tight">Items to Pack (8)</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-[11px] text-left">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-semibold">
                    <th className="pb-2">#</th>
                    <th className="pb-2">SKU / Item</th>
                    <th className="pb-2 text-center">Qty (To Pack)</th>
                    <th className="pb-2 text-center">Packed</th>
                    <th className="pb-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {/* 1: Bottle */}
                  <tr className="hover:bg-gray-50 transition">
                    <td className="py-2 font-bold text-gray-700">1</td>
                    <td className="py-2 flex items-center gap-2">
                      <div className="relative w-7 h-7 rounded bg-gray-50 overflow-hidden flex-shrink-0">
                        <Image src="/warehouse/items/red-bottle.png" alt="Bottle" fill className="object-contain" unoptimized />
                      </div>
                      <div>
                        <span className="font-mono font-bold text-gray-800 text-[10px] block">SK-BT-014</span>
                        <span className="text-gray-600 text-[11px] block">Steel Water Bottle (750 ml)</span>
                      </div>
                    </td>
                    <td className="py-2 text-center font-bold text-gray-800">2</td>
                    <td className="py-2 text-center">
                      <div className="inline-flex items-center border border-gray-200 rounded-lg bg-gray-50 p-0.5">
                        <button onClick={() => setQuantities({ ...quantities, bottle: Math.max(0, quantities.bottle - 1) })} className="w-5 h-5 bg-white rounded flex items-center justify-center text-gray-600"><Minus className="w-3 h-3" /></button>
                        <span className="w-6 text-center font-bold text-xs">{quantities.bottle}</span>
                        <button onClick={() => setQuantities({ ...quantities, bottle: Math.min(2, quantities.bottle + 1) })} className="w-5 h-5 bg-white rounded flex items-center justify-center text-gray-600"><Plus className="w-3 h-3" /></button>
                      </div>
                    </td>
                    <td className="py-2 text-right">
                      <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-bold text-[10px]">Packed ✓</span>
                    </td>
                  </tr>

                  {/* 2: Headphones */}
                  <tr className="hover:bg-gray-50 transition">
                    <td className="py-2 font-bold text-gray-700">2</td>
                    <td className="py-2 flex items-center gap-2">
                      <div className="relative w-7 h-7 rounded bg-gray-50 overflow-hidden flex-shrink-0">
                        <Image src="/warehouse/items/headphones.png" alt="Headphones" fill className="object-contain" unoptimized />
                      </div>
                      <div>
                        <span className="font-mono font-bold text-gray-800 text-[10px] block">SK-HP-001</span>
                        <span className="text-gray-600 text-[11px] block">Wireless Headphones</span>
                      </div>
                    </td>
                    <td className="py-2 text-center font-bold text-gray-800">2</td>
                    <td className="py-2 text-center">
                      <div className="inline-flex items-center border border-gray-200 rounded-lg bg-gray-50 p-0.5">
                        <button onClick={() => setQuantities({ ...quantities, headphones: Math.max(0, quantities.headphones - 1) })} className="w-5 h-5 bg-white rounded flex items-center justify-center text-gray-600"><Minus className="w-3 h-3" /></button>
                        <span className="w-6 text-center font-bold text-xs">{quantities.headphones}</span>
                        <button onClick={() => setQuantities({ ...quantities, headphones: Math.min(2, quantities.headphones + 1) })} className="w-5 h-5 bg-white rounded flex items-center justify-center text-gray-600"><Plus className="w-3 h-3" /></button>
                      </div>
                    </td>
                    <td className="py-2 text-right">
                      <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-bold text-[10px]">Packed ✓</span>
                    </td>
                  </tr>

                  {/* 3: Mouse */}
                  <tr className="hover:bg-gray-50 transition">
                    <td className="py-2 font-bold text-gray-700">3</td>
                    <td className="py-2 flex items-center gap-2">
                      <div className="relative w-7 h-7 rounded bg-gray-50 overflow-hidden flex-shrink-0">
                        <Image src="/warehouse/items/mouse.png" alt="Mouse" fill className="object-contain" unoptimized />
                      </div>
                      <div>
                        <span className="font-mono font-bold text-gray-800 text-[10px] block">SK-MS-007</span>
                        <span className="text-gray-600 text-[11px] block">Wireless Mouse</span>
                      </div>
                    </td>
                    <td className="py-2 text-center font-bold text-gray-800">1</td>
                    <td className="py-2 text-center">
                      <div className="inline-flex items-center border border-gray-200 rounded-lg bg-gray-50 p-0.5">
                        <button onClick={() => setQuantities({ ...quantities, mouse: Math.max(0, quantities.mouse - 1) })} className="w-5 h-5 bg-white rounded flex items-center justify-center text-gray-600"><Minus className="w-3 h-3" /></button>
                        <span className="w-6 text-center font-bold text-xs">{quantities.mouse}</span>
                        <button onClick={() => setQuantities({ ...quantities, mouse: Math.min(1, quantities.mouse + 1) })} className="w-5 h-5 bg-white rounded flex items-center justify-center text-gray-600"><Plus className="w-3 h-3" /></button>
                      </div>
                    </td>
                    <td className="py-2 text-right">
                      <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-bold text-[10px]">Packed ✓</span>
                    </td>
                  </tr>

                  {/* 4: Backpack */}
                  <tr className="hover:bg-gray-50 transition">
                    <td className="py-2 font-bold text-gray-700">4</td>
                    <td className="py-2 flex items-center gap-2">
                      <div className="relative w-7 h-7 rounded bg-gray-50 overflow-hidden flex-shrink-0">
                        <Image src="/warehouse/items/backpack.png" alt="Backpack" fill className="object-contain" unoptimized />
                      </div>
                      <div>
                        <span className="font-mono font-bold text-gray-800 text-[10px] block">SK-BG-021</span>
                        <span className="text-gray-600 text-[11px] block">Laptop Backpack</span>
                      </div>
                    </td>
                    <td className="py-2 text-center font-bold text-gray-800">1</td>
                    <td className="py-2 text-center">
                      <div className="inline-flex items-center border border-gray-200 rounded-lg bg-gray-50 p-0.5">
                        <button onClick={() => setQuantities({ ...quantities, backpack: Math.max(0, quantities.backpack - 1) })} className="w-5 h-5 bg-white rounded flex items-center justify-center text-gray-600"><Minus className="w-3 h-3" /></button>
                        <span className="w-6 text-center font-bold text-xs">{quantities.backpack}</span>
                        <button onClick={() => setQuantities({ ...quantities, backpack: Math.min(1, quantities.backpack + 1) })} className="w-5 h-5 bg-white rounded flex items-center justify-center text-gray-600"><Plus className="w-3 h-3" /></button>
                      </div>
                    </td>
                    <td className="py-2 text-right">
                      <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[10px]">To Pack</span>
                    </td>
                  </tr>

                  {/* 5: Cable */}
                  <tr className="hover:bg-gray-50 transition">
                    <td className="py-2 font-bold text-gray-700">5</td>
                    <td className="py-2 flex items-center gap-2">
                      <div className="relative w-7 h-7 rounded bg-gray-50 overflow-hidden flex-shrink-0">
                        <Image src="/warehouse/items/cable.png" alt="Cable" fill className="object-contain" unoptimized />
                      </div>
                      <div>
                        <span className="font-mono font-bold text-gray-800 text-[10px] block">SK-CB-009</span>
                        <span className="text-gray-600 text-[11px] block">USB-C Cable (1 m)</span>
                      </div>
                    </td>
                    <td className="py-2 text-center font-bold text-gray-800">2</td>
                    <td className="py-2 text-center">
                      <div className="inline-flex items-center border border-gray-200 rounded-lg bg-gray-50 p-0.5">
                        <button onClick={() => setQuantities({ ...quantities, cable: Math.max(0, quantities.cable - 1) })} className="w-5 h-5 bg-white rounded flex items-center justify-center text-gray-600"><Minus className="w-3 h-3" /></button>
                        <span className="w-6 text-center font-bold text-xs">{quantities.cable}</span>
                        <button onClick={() => setQuantities({ ...quantities, cable: Math.min(2, quantities.cable + 1) })} className="w-5 h-5 bg-white rounded flex items-center justify-center text-gray-600"><Plus className="w-3 h-3" /></button>
                      </div>
                    </td>
                    <td className="py-2 text-right">
                      <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[10px]">To Pack</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Bottom 3 Cards: Select Packaging + Add Packing Materials + Packing Notes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Select Packaging */}
          <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs space-y-2">
            <div className="flex items-center gap-1.5">
              <Boxes className="w-4 h-4 text-green-700" />
              <h3 className="text-xs font-bold text-gray-900 tracking-tight">Select Packaging</h3>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setSelectedPackaging("small")}
                className={`p-2 rounded-xl border text-center transition flex flex-col items-center justify-between ${
                  selectedPackaging === "small"
                    ? "border-green-600 bg-green-50/50 ring-1 ring-green-600"
                    : "border-gray-200 bg-white hover:bg-gray-50"
                }`}
              >
                <div className="relative w-7 h-7 mb-1">
                  <Image src="/warehouse/items/cardboard-box.png" alt="Small" fill className="object-contain" unoptimized />
                </div>
                <span className="text-[10px] font-bold text-gray-800">Small Box</span>
                <span className="text-[8px] text-gray-400 mt-0.5">(20 × 15 × 10 cm)</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPackaging("medium")}
                className={`p-2 rounded-xl border text-center transition flex flex-col items-center justify-between ${
                  selectedPackaging === "medium"
                    ? "border-green-600 bg-green-50/50 ring-1 ring-green-600"
                    : "border-gray-200 bg-white hover:bg-gray-50"
                }`}
              >
                <div className="relative w-7 h-7 mb-1">
                  <Image src="/warehouse/items/cardboard-box.png" alt="Medium" fill className="object-contain" unoptimized />
                </div>
                <span className="text-[10px] font-bold text-gray-800">Medium Box</span>
                <span className="text-[8px] text-gray-400 mt-0.5">(30 × 20 × 15 cm)</span>
                <span className="text-[8px] font-bold text-green-700 mt-0.5">Recommended</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPackaging("large")}
                className={`p-2 rounded-xl border text-center transition flex flex-col items-center justify-between ${
                  selectedPackaging === "large"
                    ? "border-green-600 bg-green-50/50 ring-1 ring-green-600"
                    : "border-gray-200 bg-white hover:bg-gray-50"
                }`}
              >
                <div className="relative w-7 h-7 mb-1">
                  <Image src="/warehouse/items/cardboard-box.png" alt="Large" fill className="object-contain" unoptimized />
                </div>
                <span className="text-[10px] font-bold text-gray-800">Large Box</span>
                <span className="text-[8px] text-gray-400 mt-0.5">(40 × 30 × 25 cm)</span>
              </button>
            </div>
          </div>

          {/* Card 2: Add Packing Materials */}
          <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs space-y-2">
            <div className="flex items-center gap-1.5">
              <Package className="w-4 h-4 text-green-700" />
              <h3 className="text-xs font-bold text-gray-900 tracking-tight">Add Packing Materials</h3>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
              <label className="flex items-center gap-2 p-2 rounded-xl border border-gray-200 bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={materials.bubbleWrap}
                  onChange={(e) => setMaterials({ ...materials, bubbleWrap: e.target.checked })}
                  className="rounded text-green-600 border-gray-300"
                />
                <span className="text-[11px] font-medium text-gray-800">Bubble Wrap</span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-xl border border-gray-200 bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={materials.fragileSticker}
                  onChange={(e) => setMaterials({ ...materials, fragileSticker: e.target.checked })}
                  className="rounded text-green-600 border-gray-300"
                />
                <span className="text-[11px] font-medium text-gray-800">Fragile Sticker</span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-xl border border-gray-200 bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={materials.airCushion}
                  onChange={(e) => setMaterials({ ...materials, airCushion: e.target.checked })}
                  className="rounded text-green-600 border-gray-300"
                />
                <span className="text-[11px] font-medium text-gray-800">Air Cushion</span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-xl border border-gray-200 bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={materials.sealingTape}
                  onChange={(e) => setMaterials({ ...materials, sealingTape: e.target.checked })}
                  className="rounded text-green-600 border-gray-300"
                />
                <span className="text-[11px] font-medium text-gray-800">Sealing Tape</span>
              </label>
            </div>
          </div>

          {/* Card 3: Packing Notes (Optional) */}
          <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs space-y-2">
            <h3 className="text-xs font-bold text-gray-900 tracking-tight">Packing Notes (Optional)</h3>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any packing instructions or remarks..."
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none"
            />
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-2xs flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/warehouse/worker/packer/tasks"
            className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 transition flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-gray-500" />
            Back to Tasks
          </Link>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                const code = prompt("Scan Item Barcode:", "8901234567890");
                if (code) window.location.href = "/warehouse/worker/packer/scan-result";
              }}
              className="px-3.5 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 transition flex items-center gap-1.5"
            >
              <Barcode className="w-3.5 h-3.5 text-gray-500" />
              Scan Item
            </button>
            <button
              onClick={() => alert("Packaging selection updated.")}
              className="px-3.5 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 transition flex items-center gap-1.5"
            >
              <Boxes className="w-3.5 h-3.5 text-gray-500" />
              Change Packaging
            </button>
            <button
              onClick={() => alert("Printing shipping label for ORD-20261029-0841...")}
              className="px-3.5 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 transition flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5 text-gray-500" />
              Print Label
            </button>
            <Link
              href="/warehouse/worker/packer/scan-result"
              className="px-5 py-2.5 bg-[#033129] hover:bg-[#05463b] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              Pack &amp; Next Item
            </Link>
          </div>
        </div>
      </div>
    </WarehouseWorkerShell>
  );
}
