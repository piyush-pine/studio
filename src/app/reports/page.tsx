import ReportsClient from "./reports-client";

export const metadata = {
  title: 'Reports | Dharma Treasury',
};

export default function ReportsPage() {
    return (
        <div className="p-4 md:p-8">
            <header className="mb-8">
                <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
                Donation Reports
                </h1>
                <p className="text-muted-foreground mt-2 text-lg">
                Visualizing the flow of generosity.
                </p>
            </header>
            <ReportsClient />
        </div>
    );
}
