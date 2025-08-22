import LoginClient from "./login-client";

export const metadata = {
  title: 'Login | Dharma Treasury',
};

export default function LoginPage() {
    return (
        <div className="p-4 md:p-8 flex flex-col items-center justify-center">
            <header className="mb-8 text-center">
                <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
                Welcome Back
                </h1>
                <p className="text-muted-foreground mt-2 text-lg">
                Sign in to access your account.
                </p>
            </header>
            <LoginClient />
        </div>
    );
}
