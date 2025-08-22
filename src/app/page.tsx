'use client';
import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  getRandomVedaVerse,
  RandomVedaVerseOutput,
} from '@/ai/flows/random-verse-generator';
import { useDonations } from '@/hooks/use-donations';
import { useAuth } from '@/hooks/use-auth';
import { temples, Temple } from '@/lib/temple-data';
import { getUpcomingEvents, TempleEvent } from '@/lib/events-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowRight, BookOpen, CalendarDays, CheckCircle, HandCoins, MapPin, Sparkles } from 'lucide-react';

function VerseOfTheDay() {
  const [verse, setVerse] = useState<RandomVedaVerseOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVerse() {
      try {
        setLoading(true);
        const randomVerse = await getRandomVedaVerse({});
        setVerse(randomVerse);
      } catch (error) {
        console.error('Failed to fetch verse:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchVerse();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-accent" />
          Verse of the Day
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-1/3 mt-2" />
          </div>
        ) : verse ? (
          <blockquote className="border-l-4 border-primary pl-4">
            <p className="text-lg italic">"{verse.verse}"</p>
            <cite className="mt-2 block text-right font-medium text-muted-foreground">
              - {verse.source}
            </cite>
          </blockquote>
        ) : (
          <p>Could not load a verse. Please try again later.</p>
        )}
      </CardContent>
    </Card>
  );
}

function TempleOfTheDay({ temple }: { temple: Temple }) {
  return (
    <Card className="overflow-hidden flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline">Temple of the Day</CardTitle>
        <CardDescription>{temple.name}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <Image
            src={temple.image}
            alt={`Image of ${temple.name}`}
            width={400}
            height={250}
            className="object-cover rounded-lg mb-4 w-full h-48"
            data-ai-hint="temple"
        />
        <p className="text-sm text-muted-foreground mb-4">{temple.description}</p>
        <Button asChild className="w-full mt-auto">
          <Link href={`/temples/${temple.id}`}>Learn More <ArrowRight className="ml-2"/></Link>
        </Button>
      </CardContent>
    </Card>
  );
}

function MiniMap() {
    return (
         <Card>
            <CardHeader>
                <CardTitle className="font-headline">Explore Temples</CardTitle>
                <CardDescription>Find a sacred place near you.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="relative h-64 w-full bg-secondary/30 rounded-lg overflow-hidden group">
                    <Image src="https://placehold.co/600x400" layout="fill" objectFit="cover" alt="Map of India" data-ai-hint="map India" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    {temples.map(temple => (
                        <Link key={temple.id} href={`/temples/${temple.id}`} passHref>
                             <div 
                                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                                style={{
                                    top: `${20 + (temple.location.lat % 1) * 60}%`,
                                    left: `${20 + (temple.location.lng % 1) * 60}%`,
                                }}
                            >
                                <MapPin className="h-8 w-8 text-primary drop-shadow-lg transition-transform duration-200 group-hover:scale-125"/>
                                <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-background text-foreground text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
                                    {temple.name}
                                </span>
                            </div>
                        </Link>
                    ))}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                        <Button asChild>
                            <Link href="/temples">View Full Map</Link>
                        </Button>
                    </div>
                 </div>
            </CardContent>
        </Card>
    )
}

function UpcomingEvents({ events }: { events: TempleEvent[] }) {
    if(events.length === 0) return null;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <CalendarDays className="h-6 w-6 text-accent" />
                    Upcoming Festivals & Events
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent>
                        {events.map((event) => (
                            <CarouselItem key={event.id} className="md:basis-1/2 lg:basis-1/3">
                                <Card className="h-full">
                                    <CardContent className="p-4 flex flex-col h-full">
                                        <Image
                                            src={event.image}
                                            alt={event.name}
                                            width={400}
                                            height={200}
                                            className="rounded-lg object-cover w-full h-32 mb-4"
                                            data-ai-hint="festival celebration"
                                        />
                                        <h3 className="font-headline text-lg">{event.name}</h3>
                                        <p className="text-sm font-medium text-primary">{event.temple}</p>
                                        <p className="text-sm text-muted-foreground my-2 flex-grow">{event.description}</p>
                                        <div className="flex justify-between items-center mt-auto">
                                            <Badge variant="secondary">{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</Badge>
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link href={`/temples/${event.templeId}`}>
                                                    View Temple <ArrowRight className="ml-1 h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-[-1rem]"/>
                    <CarouselNext className="right-[-1rem]"/>
                </Carousel>
            </CardContent>
        </Card>
    )
}


function DonationHighlights() {
    const { donations } = useDonations();
    const recentDonations = useMemo(() => donations.slice(0, 5), [donations]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Donation Highlights</CardTitle>
                <CardDescription>
                    A public ledger of recent simulated donations, fostering community motivation.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {recentDonations.length > 0 ? (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Temple</TableHead>
                                    <TableHead className="text-right">Amount (INR)</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Transaction ID</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentDonations.map((donation) => (
                                <TableRow key={donation.id}>
                                    <TableCell className="font-medium">{donation.templeName}</TableCell>
                                    <TableCell className="text-right">₹{donation.amount.toLocaleString('en-IN')}</TableCell>
                                    <TableCell>{new Date(donation.date).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                    <Badge variant="secondary" className="font-mono text-xs">
                                        {donation.transactionId.substring(0, 12)}...
                                    </Badge>
                                    </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <CheckCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium">No Donations Yet</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            The first transaction will appear here.
                        </p>
                        <Button asChild className="mt-4">
                            <Link href="/temples">Find a Temple to Support</Link>
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

export default function Home() {
    const { user } = useAuth();

    const templeOfTheDay = useMemo(() => {
        const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).valueOf()) / 86400000);
        return temples[dayOfYear % temples.length];
    }, []);

    const upcomingEvents = useMemo(() => getUpcomingEvents(), []);

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <header>
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          {user ? `Welcome back, ${user.email?.split('@')[0]}` : 'Welcome to Dharma Treasury'}
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Your portal to spiritual heritage and selfless giving.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <VerseOfTheDay />
        </div>
        <div className="lg:col-span-1">
            <TempleOfTheDay temple={templeOfTheDay} />
        </div>
        <div className="lg:col-span-3">
            <UpcomingEvents events={upcomingEvents} />
        </div>
        <div className="lg:col-span-3">
            <MiniMap />
        </div>
        <div className="lg:col-span-3">
            <DonationHighlights />
        </div>
      </div>
    </div>
  );
}
