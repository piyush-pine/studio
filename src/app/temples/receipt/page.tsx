
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Download, Share2, ExternalLink, FileText } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


function ReceiptContent() {
    const searchParams = useSearchParams();

    const templeName = searchParams.get('templeName');
    const amount = searchParams.get('amount');
    const date = searchParams.get('date');
    const transactionId = searchParams.get('transactionId');
    const purpose = searchParams.get('purpose');

    if (!templeName || !amount || !date || !transactionId || !purpose) {
        return (
            <div className="text-center">
                <h2 className="text-2xl font-bold text-destructive">Receipt Data Missing</h2>
                <p className="text-muted-foreground">Could not load donation details. Please check your account page for the record.</p>
            </div>
        )
    }

    const handlePrint = () => {
        if (typeof window !== 'undefined') {
            window.print();
        }
    }
    
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'My Donation Receipt',
                text: `I just made a donation of ?${amount} to ${templeName} via Dharma Treasury! Transaction ID: ${transactionId.substring(0,12)}...`,
                url: window.location.href,
            })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error));
        }
    }

    return (
         <Card className="w-full max-w-2xl mx-auto print:shadow-none print:border-none">
            <CardHeader className="text-center">
                <div className="mx-auto bg-green-100 dark:bg-green-900/50 p-3 rounded-full mb-4">
                    <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
                <CardTitle className="font-headline text-3xl">Donation Successful!</CardTitle>
                <CardDescription className="text-lg">Thank you for your generous contribution.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Separator />
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Donated To:</span>
                        <span className="font-medium text-right">{templeName}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Purpose:</span>
                        <span className="font-medium text-right">{purpose}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-bold text-lg text-primary text-right">?{Number(amount).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span className="font-medium text-right">{new Date(date).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-start gap-4">
                        <span className="text-muted-foreground">Transaction ID:</span>
                        <Link href={`https://polygonscan.com/tx/${transactionId}`} target="_blank" rel="noopener noreferrer" className="font-mono text-xs break-all text-right text-primary hover:underline flex items-center gap-1">
                          <span>{transactionId}</span>
                          <ExternalLink className="h-3 w-3 shrink-0" />
                        </Link>
                    </div>
                </div>
                <Separator />
                <Alert>
                    <FileText className="h-4 w-4" />
                    <AlertTitle>Tax Information (Simulation)</AlertTitle>
                    <AlertDescription>
                        This is a simulated receipt for demonstration purposes. In a real-world scenario, donations to registered non-profit religious organizations may be eligible for tax deductions under section 80G of the Income Tax Act. Please consult a tax professional for advice on your specific situation.
                    </AlertDescription>
                </Alert>
                 <p className="text-xs text-muted-foreground text-center pt-2">
                    This is a simulated receipt. Clicking the transaction ID will show a real transaction on PolygonScan to demonstrate the concept. Your contribution is deeply valued. May you be blessed with peace and prosperity.
                </p>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-2 print:hidden">
                 <Button onClick={handlePrint} className="w-full">
                    <Download className="mr-2" />
                    Download Receipt
                </Button>
                <Button onClick={handleShare} variant="outline" className="w-full">
                    <Share2 className="mr-2" />
                    Share
                </Button>
            </CardFooter>
        </Card>
    );
}

function ReceiptSkeleton() {
    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader className="text-center">
                 <Skeleton className="h-16 w-16 rounded-full mx-auto mb-4" />
                 <Skeleton className="h-8 w-3/4 mx-auto" />
                 <Skeleton className="h-6 w-1/2 mx-auto mt-2" />
            </CardHeader>
            <CardContent className="space-y-4">
                <Separator />
                <div className="space-y-4">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                </div>
                <Separator />
                 <Skeleton className="h-4 w-full mt-2" />
            </CardContent>
             <CardFooter className="flex flex-col sm:flex-row gap-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </CardFooter>
        </Card>
    )
}

export default function ReceiptPage() {
    return (
        <div className="p-4 md:p-8 bg-muted/20 min-h-[calc(100vh-theme(space.14))] flex items-center justify-center">
            <style jsx global>{`
                @media print {
                    body {
                        background: white !important;
                    }
                    .container {
                        padding: 0;
                        max-width: 100%;
                    }
                    header, footer {
                        display: none;
                    }
                }
            `}</style>
             <Suspense fallback={<ReceiptSkeleton />}>
                <ReceiptContent />
            </Suspense>
        </div>
    );
}
