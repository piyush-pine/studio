
import { getTempleById } from '@/lib/temple-data';
import { notFound } from 'next/navigation';
import DonationClient from './donation-client';
import type { Metadata } from 'next';

interface DonationPageProps {
    params: { id: string };
}

export async function generateMetadata({ params }: DonationPageProps): Promise<Metadata> {
  const temple = getTempleById(params.id);

  if (!temple) {
    return {
      title: 'Temple Not Found | Dharma Treasury',
    };
  }

  return {
    title: `Donate to ${temple.name} | Dharma Treasury`,
    description: `Support ${temple.name} through a secure donation.`,
  };
}


export default function DonationPage({ params }: DonationPageProps) {
    const temple = getTempleById(params.id);
    if(!temple) {
        notFound();
    }
    return <DonationClient temple={temple} />;
}
