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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BookOpen, Search, Sparkles } from 'lucide-react';

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
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-accent" />
            Discover a Random Verse
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={handleGetRandomVerse} disabled={isVerseLoading}>
            {isVerseLoading ? 'Loading...' : 'Get a Random Verse'}
          </Button>
          {isVerseLoading && (
            <div className="space-y-4 mt-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-1/3 mt-2" />
            </div>
          )}
          {verseError && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{verseError}</AlertDescription>
            </Alert>
          )}
          {randomVerse && !isVerseLoading && (
            <blockquote className="border-l-4 border-primary pl-4 mt-4 bg-background p-4 rounded-r-lg">
              <p className="text-lg italic">"{randomVerse.verse}"</p>
              <cite className="mt-2 block text-right font-medium text-muted-foreground">
                - {randomVerse.source}
              </cite>
            </blockquote>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Search className="h-6 w-6 text-accent" />
            Search the Scriptures
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="e.g., 'dharma and karma'"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={isSearchLoading}
            />
            <Button type="submit" disabled={isSearchLoading}>
              {isSearchLoading ? 'Searching...' : <Search className="h-4 w-4" />}
            </Button>
          </form>
          
          <div className="mt-4 space-y-4">
            {isSearchLoading && (
                <>
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-5/6" />
                </>
            )}
            {searchError && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{searchError}</AlertDescription>
              </Alert>
            )}
            {searchResults && (
                <div>
                    <h3 className="font-headline text-lg mb-2">Search Results</h3>
                    <ul className="space-y-3">
                        {searchResults.results.map((result, index) => (
                            <li key={index} className="flex items-start gap-3 p-3 border rounded-lg bg-secondary/30">
                               <BookOpen className="h-5 w-5 mt-1 text-primary shrink-0"/>
                               <span>{result}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
