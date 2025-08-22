
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Temple } from '@/lib/temple-data';
import { useDonations } from '@/hooks/use-donations';
import { useKarma } from '@/hooks/use-karma';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { HandCoins, ShieldCheck, Heart, Users, Hourglass, CheckCircle, XCircle } from 'lucide-react';

const donationSchema = z.object({
  amount: z.coerce.number().min(10, { message: 'Donation must be at least ₹10.' }),
});

type DonationFormValues = z.infer<typeof donationSchema>;

export default function DonationClient({ temple }: { temple: Temple }) {
  const [processingState, setProcessingState] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const { addDonation } = useDonations();
  const { addKarma } = useKarma();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: 101,
    },
  });

  const onSubmit = async (data: DonationFormValues) => {
    setProcessingState('processing');

    // Simulate blockchain processing
    await new Promise((resolve) => setTimeout(resolve, 2500));
    
    const newTransactionId = `0x${[...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;

    const newDonation = {
      templeId: temple.id,
      templeName: temple.name,
      amount: data.amount,
      date: new Date().toISOString(),
      transactionId: newTransactionId,
    };
    
    addDonation(newDonation);
    addKarma(10); // Award 10 Karma points for a donation
    
    setProcessingState('success');
    toast({
      title: "Donation Successful!",
      description: `You earned 10 Karma Points! Your donation of ₹${data.amount} to ${temple.name} has been confirmed.`,
    });

    // Redirect to the receipt page with donation details
    const query = new URLSearchParams({
        ...newDonation,
        amount: String(newDonation.amount)
    }).toString();
    router.push(`/temples/receipt?${query}`);
  };
  
  if (processingState === 'processing') {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 min-h-[60vh]">
          <Hourglass className="h-16 w-16 text-primary animate-spin mb-4" />
          <h3 className="font-headline text-3xl">Processing Your Donation</h3>
          <p className="text-muted-foreground mt-2 max-w-md">Please wait while we securely confirm your transaction on the simulated blockchain. Do not close or refresh this page.</p>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
        <header className="text-center mb-8">
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Support {temple.name}</h1>
            <p className="text-muted-foreground mt-2 text-lg">Your contribution makes a difference.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                        <HandCoins className="h-6 w-6 text-accent" />
                        Make Your Donation
                    </CardTitle>
                    <CardDescription>All transactions are secure and transparent.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Amount (INR)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Enter amount" {...field} className="text-base py-6"/>
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex gap-2">
                                {[51, 101, 251, 501].map(amount => (
                                    <Button key={amount} type="button" variant="outline" onClick={() => form.setValue('amount', amount)}>
                                        ₹{amount}
                                    </Button>
                                ))}
                            </div>
                            <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? 'Processing...' : 'Confirm Donation'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">Why Your Donation Matters</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                       <div className="flex items-start gap-3">
                            <Heart className="h-5 w-5 mt-1 text-primary shrink-0"/>
                            <span>Your contribution directly supports the maintenance, preservation, and daily rituals of {temple.name}.</span>
                        </div>
                         <div className="flex items-start gap-3">
                            <Users className="h-5 w-5 mt-1 text-primary shrink-0"/>
                            <span>You become part of a community dedicated to upholding our rich cultural and spiritual heritage for future generations.</span>
                        </div>
                         <div className="flex items-start gap-3">
                            <HandCoins className="h-5 w-5 mt-1 text-primary shrink-0"/>
                            <span>The donated money goes directly to temple authorities and partner organizations to perform rituals and help the needy.</span>
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">Secure & Transparent</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                       <div className="flex items-start gap-3">
                            <ShieldCheck className="h-5 w-5 mt-1 text-green-500 shrink-0"/>
                            <span>We use a simulated blockchain to ensure every transaction is recorded immutably and transparently, providing full accountability.</span>
                        </div>
                         <div className="flex items-start gap-3">
                            <ShieldCheck className="h-5 w-5 mt-1 text-green-500 shrink-0"/>
                            <span>Your personal information is kept secure and is never shared. All donations are processed with the highest standards of security.</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
