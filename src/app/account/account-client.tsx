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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HandCoins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function AccountClient() {
  const { donations } = useDonations();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Donation History</CardTitle>
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
  );
}
