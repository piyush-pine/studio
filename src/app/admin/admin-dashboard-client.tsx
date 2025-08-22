
'use client';

import { useDonations } from '@/hooks/use-donations';
import { usePosts } from '@/hooks/use-posts';
import { useAuth } from '@/hooks/use-auth';
import { temples } from '@/lib/temple-data';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Users,
  Landmark,
  HandCoins,
  ShieldCheck,
  CheckCircle,
  XCircle,
  MessageSquare,
} from 'lucide-react';
import Link from 'next/link';

function AnalyticsOverview() {
  const { donations } = useDonations();
  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
  const totalTemples = temples.length;
  // This is a placeholder for user count. In a real app, you'd fetch this from your backend.
  const activeUsers = 1; 

  const stats = [
    {
      title: 'Total Donations (INR)',
      value: `₹${totalDonations.toLocaleString('en-IN')}`,
      icon: HandCoins,
    },
    { title: 'Temples on Platform', value: totalTemples, icon: Landmark },
    { title: 'Registered Users', value: activeUsers, icon: Users },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Analytics</CardTitle>
        <CardDescription>
          A high-level overview of platform activity.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}

function TempleManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Temple Management</CardTitle>
        <CardDescription>
          Monitor and verify temple profiles.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Temple Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {temples.map((temple) => (
              <TableRow key={temple.id}>
                <TableCell className="font-medium">{temple.name}</TableCell>
                <TableCell>{temple.location.city}</TableCell>
                <TableCell>
                  <Badge variant={temple.id === '1' ? 'destructive' : 'default'} className={temple.id === '1' ? "bg-yellow-500" : "bg-green-500"}>
                    {temple.id === '1' ? 'Pending' : 'Approved'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function DonationOversight() {
  const { donations } = useDonations();
  const recentDonations = donations.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Donation Oversight</CardTitle>
        <CardDescription>
          Review recent transactions and flagged donations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {recentDonations.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Temple</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentDonations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell className="font-mono text-xs">
                    {donation.transactionId.substring(0, 12)}...
                  </TableCell>
                  <TableCell>₹{donation.amount}</TableCell>
                  <TableCell>{donation.templeName}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-500 hover:bg-green-600">
                      <ShieldCheck className="mr-1 h-3 w-3" /> Verified
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-sm text-muted-foreground">
            No donations recorded yet.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function CommunityModeration() {
  const { posts } = usePosts();
  const recentPosts = posts.slice(0, 3);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Community Moderation</CardTitle>
        <CardDescription>
          Oversee the "Wall of Devotion."
        </CardDescription>
      </CardHeader>
      <CardContent>
        {recentPosts.length > 0 ? (
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-start justify-between rounded-lg border p-4"
              >
                <div>
                  <p className="text-sm">"{post.message}"</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    - {post.author}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <XCircle className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No posts on the wall yet.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default function AdminDashboardClient() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold">Access Denied</h2>
        <p className="text-muted-foreground">
          You must be logged in to view the admin dashboard.
        </p>
        <Button asChild className="mt-4">
          <Link href="/login">Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-8">
      <header>
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          Super Admin Dashboard
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Welcome, {user.email}. Manage the Dharma Treasury platform.
        </p>
      </header>

      <AnalyticsOverview />

      <div className="grid gap-8 lg:grid-cols-2">
        <TempleManagement />
        <DonationOversight />
      </div>

      <CommunityModeration />
    </div>
  );
}
