import FavoritesClient from "./favorites-client";

export const metadata = {
  title: 'My Favorites | Dharma Treasury',
};

export default function FavoritesPage() {
    return (
        <div className="p-4 md:p-8">
            <header className="mb-8">
                <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
                My Favorite Temples
                </h1>
                <p className="text-muted-foreground mt-2 text-lg">
                Your saved collection of sacred places.
                </p>
            </header>
            <FavoritesClient />
        </div>
    );
}
