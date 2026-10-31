'use client';

import React, { useState, use, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Camera,
  PenTool,
  Upload,
  RefreshCw,
  AlertTriangle,
  MapPin,
  ShieldCheck,
  Check,
  X,
  FileText,
  Navigation,
} from 'lucide-react';
import { useDeliveryStore } from '@/store/deliveryStore';
import { cn } from '@/lib/cn';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProofOfDeliveryPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  const { tasks, submitProofOfDelivery } = useDeliveryStore();

  const task = tasks.find((t) => t.id === id || t.orderId === id) || tasks[0];

  // Evidence state
  const [photoUrl, setPhotoUrl] = useState<string | null>(task.proofOfDelivery?.photoUrl || null);
  const [signatureData, setSignatureData] = useState<string | null>(task.proofOfDelivery?.signatureDataUrl || null);
  const [receiptUrl, setReceiptUrl] = useState<string | null>(task.proofOfDelivery?.receiptUrl || null);
  const [gpsLocation, setGpsLocation] = useState({
    lat: 12.9352,
    lng: 77.6245,
    address: `${task.address}, ${task.city}`,
  });
  const [isCapturingSignature, setIsCapturingSignature] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  // Simple canvas signature pad
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.strokeStyle = '#073922';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const saveSignature = () => {
    if (canvasRef.current) {
      setSignatureData(canvasRef.current.toDataURL('image/png'));
      setIsCapturingSignature(false);
    }
  };

  // Mock Photo Capture
  const handleSimulatePhoto = () => {
    setPhotoUrl('/landing/card-delivery.jpg');
  };

  const handleSimulateReceipt = () => {
    setReceiptUrl('/landing/card-finance.jpg');
  };

  // Submission validation
  const isReadyToSubmit = Boolean(photoUrl && signatureData);

  const handleSubmit = () => {
    submitProofOfDelivery(task.id, {
      photoUrl: photoUrl || undefined,
      signatureDataUrl: signatureData || undefined,
      receiptUrl: receiptUrl || undefined,
      customerNameConfirmed: true,
      otpVerified: true,
      gpsLat: gpsLocation.lat,
      gpsLng: gpsLocation.lng,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    });
    router.push('/delivery-partner/dashboard');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* ── Back link & Header ── */}
      <div>
        <Link
          href={`/delivery-partner/tasks/${task.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 transition mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to delivery tasks</span>
        </Link>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Proof of Delivery
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Capture and submit delivery evidence for a successful closure.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Order Pill */}
            <div className="flex items-center gap-3 p-2.5 px-4 rounded-2xl bg-white border border-gray-200 shadow-2xs">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                📦
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="font-bold text-gray-900 text-xs">Order {task.orderId}</p>
                  <span className="text-[9.5px] font-bold bg-gray-100 text-gray-600 px-1.5 py-0.2 rounded">
                    {task.orderType}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500">
                  {task.packages.length} packages • ₹{task.codAmount} COD
                </p>
              </div>
            </div>

            {/* Address Pill */}
            <div className="flex items-center gap-3 p-2.5 px-4 rounded-2xl bg-white border border-gray-200 shadow-2xs">
              <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
              <div className="truncate max-w-[200px]">
                <p className="font-bold text-gray-900 text-xs truncate">{task.customerName}</p>
                <p className="text-[11px] text-gray-500 truncate">{task.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3-Column Top Grid: Status, Checklist, Location ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Card 1: Delivery Status */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-display font-bold text-sm text-gray-900">Delivery Status</h2>
              <span className="text-emerald-700 font-bold text-xs">Live Telemetry</span>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 mb-4">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                🚚
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-950">Out for delivery</p>
                <p className="text-[11px] text-emerald-800">Complete proof of delivery to close this order.</p>
              </div>
            </div>

            {/* Stepper */}
            <div className="space-y-3 pl-1">
              {[
                { label: 'Picked up', time: '10:15 AM', done: true },
                { label: 'Out for delivery', time: '12:10 PM', done: true },
                { label: 'Proof of delivery', time: 'In progress', active: true },
                { label: 'Completed', time: 'Pending' },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3 text-xs">
                  <div
                    className={cn(
                      'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0',
                      step.done
                        ? 'bg-emerald-600 text-white'
                        : step.active
                        ? 'border-2 border-emerald-600 text-emerald-600 bg-white ring-2 ring-emerald-600/20'
                        : 'border-2 border-gray-200 text-gray-400 bg-white'
                    )}
                  >
                    {step.done ? <Check className="w-3 h-3 stroke-[3]" /> : i + 1}
                  </div>
                  <div className="flex items-center justify-between flex-1">
                    <span className={cn('font-semibold', step.active ? 'text-gray-900 font-bold' : 'text-gray-600')}>
                      {step.label}
                    </span>
                    <span className="text-[10px] text-gray-400">{step.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 2: Evidence Checklist */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="font-display font-bold text-sm text-gray-900 mb-3">Evidence Checklist</h2>

            <div className="space-y-2 text-xs">
              {[
                { label: 'Customer confirmation (OTP)', status: 'Verified', sub: 'OTP: 772901', verified: true },
                { label: 'Customer name', status: 'Confirmed', verified: true },
                { label: 'Delivery location (GPS)', status: '12.9352, 77.6245', verified: true },
                { label: 'Delivery timestamp', status: 'Mar 10, 2024, 1:28 PM', verified: true },
                {
                  label: 'Customer signature',
                  status: signatureData ? 'Captured' : 'Pending',
                  verified: Boolean(signatureData),
                },
                {
                  label: 'Delivery photo',
                  status: photoUrl ? 'Uploaded' : 'Pending',
                  verified: Boolean(photoUrl),
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded-xl bg-gray-50 border border-gray-100"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        'w-4 h-4 rounded-full flex items-center justify-center shrink-0',
                        item.verified ? 'bg-emerald-600 text-white' : 'bg-gray-300 text-white'
                      )}
                    >
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 leading-tight">{item.label}</p>
                      {item.sub && <p className="text-[10px] text-gray-400">{item.sub}</p>}
                    </div>
                  </div>
                  <span
                    className={cn(
                      'text-[10px] font-bold px-2 py-0.5 rounded-full',
                      item.verified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    )}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 3: Location & Time with Warnings */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display font-bold text-sm text-gray-900">Location & Time</h2>
              <button
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((pos) => {
                      setGpsLocation({
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude,
                        address: `${task.address}, ${task.city}`,
                      });
                    });
                  }
                }}
                className="flex items-center gap-1 text-[11px] text-emerald-700 font-bold hover:underline"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Update location</span>
              </button>
            </div>

            <div className="space-y-3">
              {/* Map coordinates */}
              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-xs">
                <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-800">{gpsLocation.lat.toFixed(4)}, {gpsLocation.lng.toFixed(4)}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">{gpsLocation.address}</p>
                </div>
              </div>

              {/* Timestamp */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-xs">
                <Clock className="w-4 h-4 text-gray-500 shrink-0" />
                <div>
                  <p className="font-bold text-gray-800">Mar 10, 2024, 1:28 PM</p>
                  <p className="text-[10px] text-gray-400">Captured automatically via GPS clock</p>
                </div>
              </div>

              {/* Warning Banners */}
              <div className="space-y-2 pt-1">
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2 text-xs text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-[11px] leading-tight">
                    <strong>Blurry image detected:</strong> Please retake a clear photo showing the package and location.
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2 text-xs text-rose-900">
                  <MapPin className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div className="text-[11px] leading-tight">
                    <strong>GPS location check:</strong> Location verified within 45m of delivery coordinates.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Capture Evidence Panel (4 Tiles) ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display font-bold text-base text-gray-900">Capture Evidence</h2>
            <p className="text-xs text-gray-500">Provide required photo and signature to complete proof.</p>
          </div>
          <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            All evidence is required ⓘ
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Tile 1: Delivery Photo */}
          <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center gap-2 text-gray-900 font-bold text-xs mb-1">
                <Camera className="w-4 h-4 text-emerald-700" />
                <span>Delivery Photo</span>
              </div>
              <p className="text-[11px] text-gray-500">
                Take a clear photo of the delivered package(s) at customer location.
              </p>
            </div>

            {photoUrl ? (
              <div className="relative rounded-xl overflow-hidden border border-gray-200 h-28 bg-black/5 flex items-center justify-center">
                <img src={photoUrl} alt="Delivery Evidence" className="w-full h-full object-cover" />
                <button
                  onClick={() => setPhotoUrl(null)}
                  className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleSimulatePhoto}
                className="w-full py-2 px-3 rounded-xl bg-[#073922] text-[#C6F04A] text-xs font-bold hover:bg-[#052818] transition flex items-center justify-center gap-1.5"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Take photo</span>
              </button>
            )}
          </div>

          {/* Tile 2: Customer Signature */}
          <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center gap-2 text-gray-900 font-bold text-xs mb-1">
                <PenTool className="w-4 h-4 text-emerald-700" />
                <span>Customer Signature</span>
              </div>
              <p className="text-[11px] text-gray-500">
                Get customer signature on device to verify package receipt.
              </p>
            </div>

            {signatureData ? (
              <div className="relative rounded-xl overflow-hidden border border-gray-200 h-28 bg-white flex items-center justify-center p-2">
                <img src={signatureData} alt="Signature" className="max-h-full object-contain" />
                <button
                  onClick={() => setSignatureData(null)}
                  className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsCapturingSignature(true)}
                className="w-full py-2 px-3 rounded-xl bg-[#073922] text-[#C6F04A] text-xs font-bold hover:bg-[#052818] transition flex items-center justify-center gap-1.5"
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>Capture signature</span>
              </button>
            )}
          </div>

          {/* Tile 3: OTP Verification */}
          <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center gap-2 text-gray-900 font-bold text-xs mb-1">
                <ShieldCheck className="w-4 h-4 text-blue-700" />
                <span>OTP Verification</span>
              </div>
              <p className="text-[11px] text-gray-500">
                Enter the 6-digit OTP shared by the customer.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between gap-1 p-2 bg-white rounded-xl border border-gray-200 font-mono font-bold text-sm tracking-widest text-center text-gray-800">
                <span>7</span>
                <span>7</span>
                <span>2</span>
                <span>9</span>
                <span>0</span>
                <span>1</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 py-1 rounded-lg border border-emerald-200">
                <CheckCircle2 className="w-3 h-3" />
                <span>OTP verified • 1:27 PM</span>
              </div>
            </div>
          </div>

          {/* Tile 4: Upload Receipt (Optional) */}
          <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center gap-2 text-gray-900 font-bold text-xs mb-1">
                <FileText className="w-4 h-4 text-gray-700" />
                <span>Upload Receipt (Optional)</span>
              </div>
              <p className="text-[11px] text-gray-500">
                Upload cash receipt or additional proof (if available).
              </p>
            </div>

            {receiptUrl ? (
              <div className="relative rounded-xl overflow-hidden border border-gray-200 h-28 bg-white flex items-center justify-center p-2">
                <img src={receiptUrl} alt="Receipt" className="max-h-full object-contain" />
                <button
                  onClick={() => setReceiptUrl(null)}
                  className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleSimulateReceipt}
                className="w-full py-2 px-3 rounded-xl border border-gray-300 hover:bg-gray-100 text-xs font-bold text-gray-700 transition flex items-center justify-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload receipt</span>
              </button>
            )}
          </div>
        </div>

        {/* ── Submit Action ── */}
        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            Once submitted, this order will be permanently marked as delivered in both the Operations Tower and Customer App.
          </p>

          <button
            onClick={handleSubmit}
            disabled={!isReadyToSubmit}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#C6F04A] text-[#073922] font-black text-sm hover:bg-[#B5DF3A] disabled:opacity-40 disabled:pointer-events-none transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Submit proof of delivery</span>
            <CheckCircle2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Signature Capture Modal ── */}
      {isCapturingSignature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl border border-gray-200 max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-gray-900">Customer Digital Signature</h3>
              <button onClick={() => setIsCapturingSignature(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-500">Please have customer sign in the box below using their finger or stylus.</p>

            <div className="border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 h-44 overflow-hidden relative">
              <canvas
                ref={canvasRef}
                width={400}
                height={176}
                className="w-full h-full cursor-crosshair touch-none"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />
              <span className="absolute bottom-2 right-3 text-[10px] text-gray-400 pointer-events-none">
                Sign above
              </span>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  const canvas = canvasRef.current;
                  if (canvas) {
                    const ctx = canvas.getContext('2d');
                    ctx?.clearRect(0, 0, canvas.width, canvas.height);
                  }
                }}
                className="py-2.5 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={saveSignature}
                className="flex-1 py-2.5 rounded-xl bg-[#073922] text-[#C6F04A] text-xs font-bold hover:bg-[#052818] transition shadow-xs"
              >
                Confirm Signature
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

