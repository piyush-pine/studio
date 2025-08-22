import TemplesClient from "./temples-client";

export const metadata = {
  title: 'Find Temples | Dharma Treasury',
};

export default function TemplesPage() {
  return (
    <div className="p-4 md:p-8">
      <header className="mb-8">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          Temple Locator
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Discover sacred temples near and far.
        </p>
      </header>
      <TemplesClient />
    </div>
  );
}
