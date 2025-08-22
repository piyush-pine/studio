
'use client';

import { useMemo } from 'react';
import { useDonations } from '@/hooks/use-donations';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { HandCoins, Medal, Gem, Shield, Crown, ExternalLink, Calendar, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/use-auth';
import { useKarma, KARMA_BADGES } from '@/hooks/use-karma';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';


function KarmaCard() {
    const { user } = useAuth();
    const { karma, badges } = useKarma();

    return (
        <Card className="text-center">
            <CardHeader>
                <CardTitle className="font-headline text-3xl">
                    {user?.email?.split('@')[0] || 'Devotee'}'s Profile
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <p className="text-muted-foreground text-sm">Karma Points</p>
                    <p className="text-5xl font-bold text-primary">{karma}</p>
                </div>
                 <div>
                    <p className="text-muted-foreground text-sm mb-3">Badges Earned</p>
                    {badges.length > 0 ? (
                        <div className="flex justify-center gap-4">
                            <TooltipProvider>
                                {KARMA_BADGES.map(b => {
                                    const hasBadge = badges.find(badge => badge.name === b.name);
                                    const Icon = b.icon;
                                    return (
                                        <Tooltip key={b.name}>
                                            <TooltipTrigger asChild>
                                                <div className={`p-3 rounded-full border-2 ${hasBadge ? 'bg-amber-100 dark:bg-amber-900/50 border-amber-400' : 'bg-muted/50 border-dashed'}`}>
                                                    <Icon className={`h-8 w-8 ${hasBadge ? 'text-amber-500' : 'text-muted-foreground/50'}`} />
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p className="font-bold">{b.name}</p>
                                                <p className="text-sm text-muted-foreground">{b.description}</p>
                                                {!hasBadge && <p className="text-xs text-primary">Requires {b.points} Karma</p>}
                                            </TooltipContent>
                                        </Tooltip>
                                    )
                                })}
                            </TooltipProvider>
                        </div>
                    ) : (
                         <p className="text-muted-foreground">Start donating to earn badges!</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

function MonthlySummaryCard() {
    const { donations } = useDonations();
    const { user } = useAuth();

    const monthlyDonations = useMemo(() => {
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        return donations.filter(d => new Date(d.date) >= firstDayOfMonth);
    }, [donations]);

    const monthlyTotal = useMemo(() => {
        return monthlyDonations.reduce((acc, curr) => acc + curr.amount, 0);
    }, [monthlyDonations]);

    if(monthlyTotal === 0) return null;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <Calendar className="h-6 w-6 text-accent" />
                    This Month's Summary
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-4xl font-bold text-center text-primary">
                    ?{monthlyTotal.toLocaleString('en-IN')}
                </p>
                <div className="text-center text-muted-foreground">
                    <p>Thank you, {user?.email?.split('@')[0] || 'Devotee'}, for your incredible generosity this month.</p>
                    <p className="mt-2 text-sm flex items-center justify-center gap-2">Your support creates ripples of positive change. <Heart className="h-4 w-4 text-red-500" /></p>
                </div>
            </CardContent>
        </Card>
    )
}

export default function AccountClient() {
  const { donations } = useDonations();

  return (
    <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
            <KarmaCard />
            <MonthlySummaryCard />
        </div>
        <div className="lg:col-span-2">
            <Card>
            <CardHeader>
                <CardTitle className="font-headline">Donation History</CardTitle>
                <CardDescription>A record of your contributions, verifiable on-chain.</CardDescription>
            </CardHeader>
            <CardContent>
                {donations.length > 0 ? (
                <div className="overflow-x-auto">
                    <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Temple</TableHead>
                        <TableHead className="text-right">Amount (INR)</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Transaction ID</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {donations.map((donation) => (
                        <TableRow key={donation.id}>
                            <TableCell className="font-medium">{donation.templeName}</TableCell>
                            <TableCell className="text-right">₹{donation.amount.toLocaleString('en-IN')}</TableCell>
                            <TableCell>{new Date(donation.date).toLocaleDateString()}</TableCell>
                            <TableCell>
                             <Button asChild variant="link" className="p-0 h-auto font-mono text-xs">
                                <Link href={`https://polygonscan.com/tx/${donation.transactionId}`} target="_blank" rel="noopener noreferrer">
                                   {donation.transactionId.substring(0, 12)}...
                                   <ExternalLink className="ml-1 h-3 w-3" />
                                </Link>
                              </Button>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </div>
                ) : (
                <div className="text-center py-12">
                    <HandCoins className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No Donations Yet</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                    Your simulated donations will appear here.
                    </p>
                    <Button asChild className="mt-4">
                    <Link href="/temples">Find a Temple to Support</Link>
                    </Button>
                </div>
                )}
            </CardContent>
            </Card>
        </div>
    </div>
  );
}
