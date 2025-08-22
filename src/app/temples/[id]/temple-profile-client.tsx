'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Temple } from '@/lib/temple-data';
import { useDonations } from '@/hooks/use-donations';
import { useFavorites } from '@/hooks/use-favorites';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { MapPin, HandCoins, CheckCircle, Hourglass, XCircle, Landmark, Share2, Star, Twitter, Facebook, Linkedin } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

const donationSchema = z.object({
  amount: z.coerce.number().min(10, { message: 'Donation must be at least ₹10.' }),
});

type DonationFormValues = z.infer<typeof donationSchema>;

export default function TempleProfileClient({ temple }: { temple: Temple }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [processingState, setProcessingState] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [transactionId, setTransactionId] = useState('');
  const { addDonation } = useDonations();
  const { user } = useAuth();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { toast } = useToast();

  const isFavorite = favorites.some((fav) => fav.id === temple.id);

  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: 101,
    },
  });

  const handleToggleFavorite = () => {
    if (!user) {
        toast({
            variant: 'destructive',
            title: 'Login Required',
            description: 'You must be logged in to save favorites.',
        });
        return;
    }
    if (isFavorite) {
      removeFavorite(temple.id);
      toast({ title: 'Removed from Favorites' });
    } else {
      addFavorite(temple);
      toast({ title: 'Added to Favorites' });
    }
  };
  
  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return '';
  }

  const onSubmit = async (data: DonationFormValues) => {
    setProcessingState('processing');
    setTransactionId('');

    // Simulate blockchain processing
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    const newTransactionId = `0x${[...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;
    setTransactionId(newTransactionId);

    addDonation({
      templeId: temple.id,
      templeName: temple.name,
      amount: data.amount,
      date: new Date().toISOString(),
      transactionId: newTransactionId,
    });
    
    setProcessingState('success');
    toast({
      title: "Donation Successful!",
      description: `Your donation of ₹${data.amount} to ${temple.name} has been confirmed.`,
    });
  };

  const resetModal = () => {
    setIsModalOpen(false);
    // Add a small delay to allow the dialog to close before resetting state
    setTimeout(() => {
        form.reset();
        setProcessingState('idle');
        setTransactionId('');
    }, 300);
  }

  const renderModalContent = () => {
    switch(processingState) {
        case 'processing':
            return (
                <div className="flex flex-col items-center justify-center text-center p-8 min-h-[250px]">
                    <Hourglass className="h-16 w-16 text-primary animate-spin mb-4" />
                    <h3 className="font-headline text-2xl">Processing Transaction</h3>
                    <p className="text-muted-foreground mt-2">Please wait while we confirm your donation on the simulated blockchain...</p>
                </div>
            )
        case 'success':
            return (
                <div className="flex flex-col items-center justify-center text-center p-8 min-h-[250px]">
                    <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                    <h3 className="font-headline text-2xl">Donation Confirmed!</h3>
                    <p className="text-muted-foreground mt-2">Thank you for your generous contribution.</p>
                    <div className="text-xs text-muted-foreground mt-4 break-all bg-secondary p-2 rounded-md">
                        <strong>Transaction ID:</strong> {transactionId}
                    </div>
                    <Button onClick={resetModal} className="mt-6">Close</Button>
                </div>
            )
        case 'error':
             return (
                <div className="flex flex-col items-center justify-center text-center p-8 min-h-[250px]">
                    <XCircle className="h-16 w-16 text-destructive mb-4" />
                    <h3 className="font-headline text-2xl">Transaction Failed</h3>
                    <p className="text-muted-foreground mt-2">Something went wrong. Please try again.</p>
                    <Button onClick={() => setProcessingState('idle')} variant="outline" className="mt-6">Try Again</Button>
                </div>
            )
        default:
            return (
                <>
                <DialogHeader>
                    <DialogTitle className="font-headline text-2xl">Donate to {temple.name}</DialogTitle>
                    <DialogDescription>Your contribution supports the preservation of our sacred heritage.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Amount (INR)</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Enter amount" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                         <DialogFooter>
                            <Button type="submit">Confirm Donation</Button>
                        </DialogFooter>
                    </form>
                </Form>
                </>
            )
    }
  }

  return (
    <div className="p-4 md:p-8">
      <header className="mb-8 flex justify-between items-start">
        <div>
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">{temple.name}</h1>
            <p className="text-muted-foreground mt-2 text-lg flex items-center gap-2"><MapPin className="h-5 w-5"/> {temple.location.city}</p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handleToggleFavorite} aria-label="Toggle Favorite">
                <Star className={cn("h-5 w-5", isFavorite ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground")} />
            </Button>
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" aria-label="Share Temple">
                        <Share2 className="h-5 w-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                     <DropdownMenuItem asChild>
                        <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(getShareUrl())}&text=${encodeURIComponent(`Discover ${temple.name} on Dharma Treasury`)}`} target="_blank" rel="noopener noreferrer">
                           <Twitter className="mr-2" /> Twitter
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`} target="_blank" rel="noopener noreferrer">
                           <Facebook className="mr-2"/> Facebook
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                         <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getShareUrl())}`} target="_blank" rel="noopener noreferrer">
                           <Linkedin className="mr-2"/> LinkedIn
                        </a>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </header>
      
      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
             <Carousel className="w-full rounded-lg overflow-hidden shadow-lg">
                <CarouselContent>
                    {temple.images.map((img, index) => (
                    <CarouselItem key={index}>
                        <Image
                            src={img}
                            alt={`${temple.name} view ${index + 1}`}
                            width={800}
                            height={600}
                            className="w-full h-auto object-cover"
                            data-ai-hint="temple interior"
                        />
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-4"/>
                <CarouselNext className="right-4"/>
            </Carousel>
        </div>
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center gap-2"><Landmark className="h-6 w-6 text-accent"/>About the Temple</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{temple.longDescription}</p>
                    <Button size="lg" className="w-full mt-6" onClick={() => setIsModalOpen(true)}>
                        <HandCoins className="mr-2 h-5 w-5" />
                        Donate Now
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={(open) => !open && resetModal()}>
        <DialogContent>
            {renderModalContent()}
        </DialogContent>
      </Dialog>

    </div>
  );
}
