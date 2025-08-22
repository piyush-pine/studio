'use client';

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
import { HandCoins, Medal, Gem, Shield, Crown } from 'lucide-react';
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

export default function AccountClient() {
  const { donations } = useDonations();

  return (
    <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
            <KarmaCard />
        </div>
        <div className="lg:col-span-2">
            <Card>
            <CardHeader>
                <CardTitle className="font-headline">Donation History</CardTitle>
                <CardDescription>A record of your contributions.</CardDescription>
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
                            <Badge variant="secondary" className="font-mono text-xs">
                                {donation.transactionId.substring(0, 12)}...
                            </Badge>
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
