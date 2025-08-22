'use client';

import { useState } from 'react';
import {
  getRandomVedaVerse,
  RandomVedaVerseOutput,
} from '@/ai/flows/random-verse-generator';
import {
  vedicLibrarySearch,
  VedicLibrarySearchOutput,
} from '@/ai/flows/vedic-library-search';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BookOpen, Search, Sparkles, BookHeart, ScrollText, Library } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function LibraryClient() {
  const [randomVerse, setRandomVerse] =
    useState<RandomVedaVerseOutput | null>(null);
  const [isVerseLoading, setIsVerseLoading] = useState(false);
  const [verseError, setVerseError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] =
    useState<VedicLibrarySearchOutput | null>(null);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleGetRandomVerse = async () => {
    setIsVerseLoading(true);
    setVerseError(null);
    try {
      const verse = await getRandomVedaVerse({});
      setRandomVerse(verse);
    } catch (error) {
      console.error(error);
      setVerseError('Failed to fetch a random verse. Please try again.');
    } finally {
      setIsVerseLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    setIsSearchLoading(true);
    setSearchError(null);
    setSearchResults(null);
    try {
      const results = await vedicLibrarySearch({ query: searchQuery });
      setSearchResults(results);
    } catch (error) {
      console.error(error);
      setSearchError('Failed to perform search. Please try again.');
    } finally {
      setIsSearchLoading(false);
    }
  };

  return (
    <div className="grid gap-12 lg:grid-cols-5">
      <div className="lg:col-span-3">
          <Card className="bg-card/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-3 text-3xl">
                <Sparkles className="h-8 w-8 text-accent" />
                Verse of the Day
              </CardTitle>
              <CardDescription>
                Draw a random verse from the sacred texts for daily inspiration.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleGetRandomVerse} disabled={isVerseLoading} size="lg">
                {isVerseLoading ? 'Summoning Wisdom...' : 'Reveal a Verse'}
              </Button>

              <div className="mt-6 min-h-[180px]">
                {isVerseLoading && (
                  <div className="space-y-4">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-2/3" />
                    <Skeleton className="h-4 w-full mt-2" />
                    <Skeleton className="h-4 w-1/3 mt-2 ml-auto" />
                  </div>
                )}
                {verseError && (
                  <Alert variant="destructive">
                    <AlertTitle>An Error Occurred</AlertTitle>
                    <AlertDescription>{verseError}</AlertDescription>
                  </Alert>
                )}
                {randomVerse && !isVerseLoading && (
                  <blockquote className="border-l-4 border-primary pl-6 pr-4 py-4 bg-background/50 rounded-r-lg shadow-inner">
                    <p className="text-lg italic font-serif">"{randomVerse.verse}"</p>
                     <p className="text-muted-foreground mt-3 text-base">"{randomVerse.translation}"</p>
                    <cite className="mt-4 block text-right font-medium text-primary">
                      - {randomVerse.source}
                    </cite>
                  </blockquote>
                )}
              </div>
            </CardContent>
          </Card>
      </div>
      
      <div className="lg:col-span-2">
         <Card className="bg-card/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-3 text-3xl">
                <BookHeart className="h-8 w-8 text-accent" />
                Archive Search
              </CardTitle>
              <CardDescription>
                Query the ancient scriptures with your questions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="e.g., 'dharma and karma'"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  disabled={isSearchLoading}
                  className="text-base"
                />
                <Button type="submit" disabled={isSearchLoading} variant="secondary">
                  {isSearchLoading ? 'Searching...' : <Search className="h-4 w-4" />}
                </Button>
              </form>
              
              <div className="mt-4 space-y-4 min-h-[180px]">
                {isSearchLoading && (
                    <div className="space-y-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-5/6" />
                    </div>
                )}
                {searchError && (
                  <Alert variant="destructive">
                    <AlertTitle>Search Failed</AlertTitle>
                    <AlertDescription>{searchError}</AlertDescription>
                  </Alert>
                )}
                {searchResults && (
                    <div className="fade-in">
                        <ul className="space-y-3">
                            {searchResults.results.map((result, index) => (
                                <li key={index} className="flex items-start gap-4 p-4 border-l-2 border-accent bg-secondary/30 rounded-r-md text-sm">
                                   <ScrollText className="h-5 w-5 mt-0.5 text-accent shrink-0"/>
                                   <span>{result}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                 {!isSearchLoading && !searchResults && !searchError && (
                    <div className="text-center text-muted-foreground pt-10">
                        <Library className="h-10 w-10 mx-auto mb-2"/>
                        <p>The archives await your inquiry.</p>
                    </div>
                 )}
              </div>
            </CardContent>
          </Card>
      </div>
    </div>
  );
}
