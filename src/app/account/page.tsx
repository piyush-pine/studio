import AccountClient from "./account-client";

export const metadata = {
  title: 'My Profile | Dharma Treasury',
};

export default function AccountPage() {
    return (
        <div className="p-4 md:p-8">
            <header className="mb-8">
                <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
                My Devotional Profile
                </h1>
                <p className="text-muted-foreground mt-2 text-lg">
                View your Karma Points, badges, and contribution history.
                </p>
            </header>
            <AccountClient />
        </div>
    );
}
