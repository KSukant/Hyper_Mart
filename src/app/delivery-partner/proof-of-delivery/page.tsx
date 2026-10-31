'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDeliveryStore } from '@/store/deliveryStore';

export default function ProofOfDeliveryIndexPage() {
  const router = useRouter();
  const { tasks } = useDeliveryStore();

  useEffect(() => {
    // Look for task currently at 'proof' step or active
    const candidate = tasks.find((t) => t.stepState === 'proof') || tasks.find((t) => t.status === 'en_route') || tasks[0];
    if (candidate) {
      router.replace(`/delivery-partner/proof-of-delivery/${candidate.id}`);
    }
  }, [router, tasks]);

  return (
    <div className="flex h-64 items-center justify-center">
      <div className="text-center space-y-2">
        <div className="w-8 h-8 rounded-full border-4 border-[#073922]/20 border-t-[#073922] animate-spin mx-auto" />
        <p className="text-xs font-semibold text-gray-500">Loading Proof of Delivery...</p>
      </div>
    </div>
  );
}

