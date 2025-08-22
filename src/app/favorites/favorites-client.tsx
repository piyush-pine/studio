'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useFavorites } from '@/hooks/use-favorites';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';

export default function FavoritesClient() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="text-center py-20">
        <Star className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No Favorites Yet</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Explore temples and save your favorites to see them here.
        </p>
        <Button asChild className="mt-4">
          <Link href="/temples">Find Temples</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {favorites.map((temple) => (
        <Card key={temple.id} className="overflow-hidden">
          <Link href={`/temples/${temple.id}`} className="block">
            <Image
              src={temple.image}
              alt={`Image of ${temple.name}`}
              width={400}
              height={300}
              className="object-cover h-48 w-full"
              data-ai-hint="temple"
            />
          </Link>
          <CardContent className="p-4">
            <h3 className="font-headline text-xl">{temple.name}</h3>
            <p className="text-sm text-muted-foreground mt-1 h-10 overflow-hidden">
              {temple.description}
            </p>
            <Button asChild variant="link" className="px-0 mt-2">
              <Link href={`/temples/${temple.id}`}>
                View Details <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
