import AccountClient from "./account-client";

export const metadata = {
  title: 'My Account | Dharma Treasury',
};

export default function AccountPage() {
    return (
        <div className="p-4 md:p-8">
            <header className="mb-8">
                <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
                My Simulated Account
                </h1>
                <p className="text-muted-foreground mt-2 text-lg">
                A summary of your simulated contributions.
                </p>
            </header>
            <AccountClient />
        </div>
    );
}
