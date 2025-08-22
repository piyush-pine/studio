
'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Temple } from '@/lib/temple-data';
import { useFavorites } from '@/hooks/use-favorites';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useToast } from '@/hooks/use-toast';
import { MapPin, HandCoins, Landmark, Star, Share2, Twitter, Facebook, Linkedin } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function TempleProfileClient({ temple }: { temple: Temple }) {
  const { user } = useAuth();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { toast } = useToast();

  const isFavorite = favorites.some((fav) => fav.id === temple.id);

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
                        <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(getShareUrl())}&text=${encodeURIComponent(`Discover ${temple.name} on Dharma Treasury`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                           <Twitter className="h-4 w-4"/> Twitter
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                           <Facebook className="h-4 w-4"/> Facebook
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                         <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getShareUrl())}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                           <Linkedin className="h-4 w-4"/> LinkedIn
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
                            className="w-full h-auto object-cover aspect-[4/3]"
                            data-ai-hint="temple interior"
                            priority={index === 0}
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
                    <Button size="lg" className="w-full mt-6" asChild>
                        <Link href={`/temples/${temple.id}/donate`}>
                            <HandCoins className="mr-2 h-5 w-5" />
                            Donate Now
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
