'use client';
import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import {
  getRandomVedaVerse,
  RandomVedaVerseOutput,
} from '@/ai/flows/random-verse-generator';
import { useDonations } from '@/hooks/use-donations';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Landmark, HandCoins, BarChart2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const [verse, setVerse] = useState<RandomVedaVerseOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const { donations } = useDonations();

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

  const totalDonated = useMemo(() => {
    return donations.reduce((acc, curr) => acc + curr.amount, 0);
  }, [donations]);

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <header>
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          Welcome to Dharma Treasury
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Your portal to spiritual heritage and selfless giving.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-accent" />
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

        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <HandCoins className="h-6 w-6 text-accent" />
              My Contributions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              ₹{totalDonated.toLocaleString('en-IN')}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Total simulated donations made.
            </p>
            <Button asChild className="mt-4 w-full">
              <Link href="/account">View My Account</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Explore</CardTitle>
          <CardDescription>Discover temples and ancient wisdom.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/temples" passHref>
            <div className="group flex flex-col items-center justify-center p-6 border rounded-lg hover:bg-primary/5 transition-colors text-center">
              <Landmark className="h-10 w-10 mb-2 text-accent" />
              <h3 className="font-headline text-xl font-semibold">Find Temples</h3>
              <p className="text-muted-foreground text-sm mt-1">Locate temples near you.</p>
            </div>
          </Link>
          <Link href="/library" passHref>
            <div className="group flex flex-col items-center justify-center p-6 border rounded-lg hover:bg-primary/5 transition-colors text-center">
              <BookOpen className="h-10 w-10 mb-2 text-accent" />
              <h3 className="font-headline text-xl font-semibold">Vedic Library</h3>
              <p className="text-muted-foreground text-sm mt-1">Access sacred texts.</p>
            </div>
          </Link>
          <Link href="/reports" passHref>
            <div className="group flex flex-col items-center justify-center p-6 border rounded-lg hover:bg-primary/5 transition-colors text-center">
              <BarChart2 className="h-10 w-10 mb-2 text-accent" />
              <h3 className="font-headline text-xl font-semibold">Donation Reports</h3>
              <p className="text-muted-foreground text-sm mt-1">Visualize your impact.</p>
            </div>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
