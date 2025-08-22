import WallOfDevotionClient from "./wall-of-devotion-client";
import Image from 'next/image';

export const metadata = {
  title: 'Wall of Devotion | Dharma Treasury',
};

export default function WallOfDevotionPage() {
    return (
        <div className="relative p-4 md:p-8">
             <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20">
                <Image 
                    src="https://placehold.co/1920x1080" 
                    alt="Abstract spiritual background"
                    fill
                    style={{ objectFit: 'cover' }}
                    data-ai-hint="spiritual patterns"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/50"></div>
            </div>
            <div className="relative z-10">
                <header className="mb-8 text-center">
                    <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
                    Wall of Devotion
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">
                    Share your wishes, gratitude, and greetings with our community. Let's build a tapestry of positive energy together.
                    </p>
                </header>
                <WallOfDevotionClient />
            </div>
        </div>
    );
}
