import SignupClient from "./signup-client";

export const metadata = {
  title: 'Sign Up | Dharma Treasury',
};

export default function SignupPage() {
    return (
        <div className="p-4 md:p-8 flex flex-col items-center justify-center">
            <header className="mb-8 text-center">
                <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
                Create an Account
                </h1>
                <p className="text-muted-foreground mt-2 text-lg">
                Join our community of givers.
                </p>
            </header>
            <SignupClient />
        </div>
    );
}
