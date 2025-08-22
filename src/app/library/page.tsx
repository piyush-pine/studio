import LibraryClient from './library-client';

export const metadata = {
  title: 'Vedic Library | Dharma Treasury',
};

export default function LibraryPage() {
  return (
    <div className="p-4 md:p-8">
      <header className="mb-8">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          The Vedic Library
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Explore ancient scriptures and divine wisdom.
        </p>
      </header>
      <LibraryClient />
    </div>
  );
}
