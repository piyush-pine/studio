
'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { temples } from '@/lib/temple-data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, ArrowRight, Search } from 'lucide-react';

export default function TemplesClient() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemples = temples.filter((temple) =>
    temple.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-headline text-2xl">Temple List</h2>
          <div className="relative w-full max-w-xs">
            <Input
              type="text"
              placeholder="Search temples..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
        </div>
        <div className="space-y-4 h-[600px] overflow-y-auto pr-4">
          {filteredTemples.length > 0 ? (
            filteredTemples.map((temple) => (
              <Card key={temple.id} className="overflow-hidden">
                <div className="flex">
                  <div className="w-1/3">
                    <Image
                      src={temple.image}
                      alt={`Image of ${temple.name}`}
                      width={200}
                      height={150}
                      className="object-cover h-full w-full"
                      data-ai-hint="temple"
                    />
                  </div>
                  <div className="w-2/3 p-4 flex flex-col">
                    <h3 className="font-headline text-xl">{temple.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1 flex-grow">{temple.description}</p>
                     <Button asChild variant="link" className="px-0 mt-2 self-start">
                      <Link href={`/temples/${temple.id}`}>
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-10">
              <p>No temples found for your search.</p>
            </div>
          )}
        </div>
      </div>
      <div>
        <h2 className="font-headline text-2xl mb-4">Temple Map</h2>
        <Card className="h-[700px] w-full">
            <div className="relative h-full w-full bg-secondary/30 rounded-lg overflow-hidden group">
                <Image src="https://placehold.co/800x800" layout="fill" objectFit="cover" alt="Map of India" data-ai-hint="map India"/>
                <div className="absolute top-4 left-4 text-sm text-muted-foreground bg-background/80 p-2 rounded-md">
                    Map simulation. Click a marker to view details.
                </div>
                {filteredTemples.map(temple => (
                    <Link key={temple.id} href={`/temples/${temple.id}`} passHref>
                        <div 
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                            style={{
                                top: `${15 + (temple.location.lat % 1) * 70}%`,
                                left: `${15 + (temple.location.lng % 1) * 70}%`,
                            }}
                        >
                            <MapPin className="h-8 w-8 text-primary drop-shadow-lg transition-transform duration-200 hover:scale-125"/>
                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-background text-foreground text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
                                {temple.name}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </Card>
      </div>
    </div>
  );
}
