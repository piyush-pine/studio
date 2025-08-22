import LibraryClient from './library-client';
import Image from 'next/image';

export const metadata = {
  title: 'Vedic Library | Dharma Treasury',
};

export default function LibraryPage() {
  return (
    <div className="relative min-h-[calc(100vh-theme(space.14))] p-4 md:p-8 flex flex-col">
      <div className="absolute inset-0 z-0">
          <Image 
            src="https://placehold.co/1920x1080" 
            alt="Ancient library background"
            fill
            style={{ objectFit: 'cover' }}
            className="opacity-20"
            data-ai-hint="ancient library"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/50"></div>
      </div>

      <div className="relative z-10">
          <header className="mb-12 text-center">
            <h1 className="font-headline text-5xl md:text-7xl font-bold text-primary drop-shadow-lg">
              The Vedic Library
            </h1>
            <p className="text-muted-foreground mt-4 text-xl max-w-3xl mx-auto">
              Explore timeless wisdom from the dawn of civilization. Here, ancient scriptures and divine knowledge await the curious mind.
            </p>
          </header>
          <LibraryClient />
      </div>
    </div>
  );
}
