'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { OmIcon } from '@/components/icons/om';
import {
  Home,
  Landmark,
  BookOpen,
  BarChart2,
  User,
  Github,
  LogIn,
  LogOut,
  UserPlus,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '../ui/skeleton';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/temples', label: 'Temples', icon: Landmark },
  { href: '/library', label: 'Vedic Library', icon: BookOpen },
];

const privateNavItems = [
    { href: '/account', label: 'My Account', icon: User },
    { href: '/reports', label: 'Reports', icon: BarChart2 },
]

export function SidebarNav() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  }

  return (
    <>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2">
          <OmIcon
            className="h-8 w-8 text-primary"
            style={{ color: 'hsl(var(--primary))' }}
          />
          <span className="font-headline text-2xl font-semibold">
            Dharma Treasury
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={
                  item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href)
                }
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          {loading && (
              <>
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </>
          )}
          {user && !loading && privateNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href)}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarSeparator />
        <SidebarMenu>
            {loading && <Skeleton className="h-8 w-full" />}
            {user && !loading && (
                 <SidebarMenuItem>
                    <SidebarMenuButton onClick={handleLogout}>
                        <LogOut />
                        <span>Logout</span>
                    </SidebarMenuButton>
                 </SidebarMenuItem>
            )}
            {!user && !loading && (
                <>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === '/login'}>
                            <Link href="/login">
                                <LogIn />
                                <span>Login</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === '/signup'}>
                            <Link href="/signup">
                                <UserPlus />
                                <span>Sign Up</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </>
            )}
           <SidebarMenuItem>
            <SidebarMenuButton asChild>
                <a href="https://github.com/firebase/genkit/tree/main/studio/samples/dharma-treasury" target="_blank" rel="noopener noreferrer">
                    <Github />
                    <span>View on GitHub</span>
                </a>
            </SidebarMenuButton>
           </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
