import type { Metadata } from 'next';
import { DeliveryPartnerShell } from '@/components/delivery-partner/DeliveryPartnerShell';

export const metadata: Metadata = {
  title: {
    default: 'HyperMart Delivery Partner Portal',
    template: '%s | HyperMart Delivery',
  },
  description: 'HyperMart Delivery Partner — Route execution, deliveries, COD and returns.',
};

export default function DeliveryPartnerLayout({ children }: { children: React.ReactNode }) {
  return <DeliveryPartnerShell>{children}</DeliveryPartnerShell>;
}

