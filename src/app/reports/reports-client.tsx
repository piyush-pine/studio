'use client';

import { useMemo } from 'react';
import { useDonations } from '@/hooks/use-donations';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartTooltipContent, ChartContainer } from '@/components/ui/chart';
import { BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ReportsClient() {
  const { donations } = useDonations();

  const chartData = useMemo(() => {
    if (donations.length === 0) return [];
    
    const aggregation: { [key: string]: { name: string, total: number } } = {};
    
    donations.forEach(donation => {
      if (!aggregation[donation.templeId]) {
        aggregation[donation.templeId] = { name: donation.templeName, total: 0 };
      }
      aggregation[donation.templeId].total += donation.amount;
    });

    return Object.values(aggregation);
  }, [donations]);

  const totalDonated = useMemo(() => {
    return donations.reduce((acc, curr) => acc + curr.amount, 0);
  }, [donations]);

  if (donations.length === 0) {
    return (
       <div className="text-center py-20">
            <BarChart2 className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No Data for Reports</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Make a donation to see reports here.
            </p>
            <Button asChild className="mt-4">
              <Link href="/temples">Find a Temple to Support</Link>
            </Button>
          </div>
    )
  }

  return (
    <div className="grid gap-8">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Donations per Temple</CardTitle>
                <CardDescription>
                    Total donated: ₹{totalDonated.toLocaleString('en-IN')}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer 
                    config={{
                        total: {
                            label: "Total (INR)",
                            color: "hsl(var(--primary))",
                        },
                    }}
                    className="h-[400px] w-full"
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis 
                                dataKey="name" 
                                tickLine={false}
                                axisLine={false}
                                tickMargin={10}
                                angle={-30}
                                textAnchor="end"
                                height={70}
                            />
                            <YAxis 
                                stroke="hsl(var(--muted-foreground))"
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `₹${value}`}
                            />
                            <Tooltip
                                cursor={{ fill: 'hsl(var(--secondary))' }}
                                content={<ChartTooltipContent />}
                             />
                            <Bar 
                                dataKey="total" 
                                fill="hsl(var(--primary))" 
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    </div>
  );
}
