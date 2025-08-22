'use client';

import { usePosts, type Post } from '@/hooks/use-posts';
import { useAuth } from '@/hooks/use-auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { PenSquare, MessageCircle } from 'lucide-react';
import { OmIcon } from '@/components/icons/om';

const postSchema = z.object({
  message: z.string().min(10, 'Message must be at least 10 characters.').max(280, 'Message must be 280 characters or less.'),
});
type PostFormValues = z.infer<typeof postSchema>;


function PostCard({ post }: { post: Post }) {
    return (
        <Card className="bg-card/60 backdrop-blur-sm break-inside-avoid">
            <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">"{post.message}"</p>
                <div className="flex items-center justify-between text-sm">
                    <p className="font-medium text-primary">
                        - {post.author}
                    </p>
                    <p className="text-muted-foreground/80">
                        {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}

function PostForm() {
    const { addPost } = usePosts();
    const { user } = useAuth();
    const { toast } = useToast();

    const form = useForm<PostFormValues>({
        resolver: zodResolver(postSchema),
        defaultValues: { message: '' }
    });
    
    const onSubmit = (data: PostFormValues) => {
        if(!user) return;
        addPost({
            author: user.email?.split('@')[0] || 'Anonymous',
            message: data.message
        });
        form.reset();
        toast({ title: 'Message Posted!', description: 'Your message is now on the Wall of Devotion.' });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <PenSquare className="h-6 w-6 text-accent"/>
                    Share Your Message
                </CardTitle>
                <CardDescription>
                    Add your voice to our community wall.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea placeholder="Share a message of gratitude, a wish, or a simple greeting..." {...field} rows={4}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit" disabled={form.formState.isSubmitting}>
                            Post to the Wall
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}


export default function WallOfDevotionClient() {
  const { user } = useAuth();
  const { posts } = usePosts();

  return (
    <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
            {user ? (
                <PostForm />
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Join the Conversation</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4"/>
                        <p className="text-muted-foreground mb-4">You must be logged in to post on the Wall of Devotion.</p>
                        <Button asChild>
                            <Link href="/login">Login or Sign Up</Link>
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
        <div className="lg:col-span-2">
             {posts.length > 0 ? (
                <div className="columns-1 md:columns-2 gap-8 space-y-8">
                    {posts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 flex flex-col items-center">
                    <OmIcon className="h-16 w-16 text-muted-foreground mb-4"/>
                    <h3 className="text-xl font-headline">The Wall is Quiet...</h3>
                    <p className="text-muted-foreground mt-2">Be the first to share a message and start the conversation.</p>
                </div>
            )}
        </div>
    </div>
  );
}
