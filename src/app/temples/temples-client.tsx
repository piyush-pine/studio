'use client';
import Link from 'next/link';
import Image from 'next/image';
import { temples } from '@/lib/temple-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowRight } from 'lucide-react';

export default function TemplesClient() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <h2 className="font-headline text-2xl mb-4">Temple List</h2>
        <div className="space-y-4">
          {temples.map((temple) => (
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
                <div className="w-2/3 p-4">
                  <h3 className="font-headline text-xl">{temple.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{temple.description}</p>
                   <Button asChild variant="link" className="px-0 mt-2">
                    <Link href={`/temples/${temple.id}`}>
                      View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <div>
        <h2 className="font-headline text-2xl mb-4">Temple Map</h2>
        <Card className="h-[500px] w-full">
            <div className="relative h-full w-full bg-secondary/30 rounded-lg overflow-hidden">
                <p className="absolute top-4 left-4 text-sm text-muted-foreground bg-background/80 p-2 rounded-md">
                    Map simulation. Click a marker to view details.
                </p>
                {temples.map(temple => (
                    <Link key={temple.id} href={`/temples/${temple.id}`} passHref>
                        <div 
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                            style={{
                                top: `${20 + (temple.location.lat % 1) * 60}%`,
                                left: `${20 + (temple.location.lng % 1) * 60}%`,
                            }}
                        >
                            <MapPin className="h-8 w-8 text-primary transition-transform duration-200 group-hover:scale-125"/>
                            <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-background text-foreground text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                {temple.name}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </Card>
      </div>
    </div>
  );
}
