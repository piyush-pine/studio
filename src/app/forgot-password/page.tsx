
import ForgotPasswordClient from "./forgot-password-client";

export const metadata = {
  title: 'Forgot Password | Dharma Treasury',
};

export default function ForgotPasswordPage() {
    return (
        <div className="p-4 md:p-8 flex flex-col items-center justify-center">
            <header className="mb-8 text-center">
                <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
                    Forgot Your Password?
                </h1>
                <p className="text-muted-foreground mt-2 text-lg">
                    No problem. Enter your email to receive a reset link.
                </p>
            </header>
            <ForgotPasswordClient />
        </div>
    );
}
