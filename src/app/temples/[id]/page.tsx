
import { getTempleById, temples } from '@/lib/temple-data';
import { notFound } from 'next/navigation';
import TempleProfileClient from './temple-profile-client';
import type { Metadata } from 'next';

interface TempleProfilePageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return temples.map((temple) => ({
    id: temple.id,
  }));
}

export async function generateMetadata({ params }: TempleProfilePageProps): Promise<Metadata> {
  const temple = getTempleById(params.id);

  if (!temple) {
    return {
      title: 'Temple Not Found | Dharma Treasury',
    };
  }

  return {
    title: `${temple.name} | Dharma Treasury`,
    description: temple.description,
  };
}

export default function TempleProfilePage({ params }: TempleProfilePageProps) {
  const temple = getTempleById(params.id);

  if (!temple) {
    notFound();
  }

  return <TempleProfileClient temple={temple} />;
}
