'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  Landmark,
  BookOpen,
  BarChart2,
  User,
  LogIn,
  LogOut,
  UserPlus,
  PanelLeftOpen,
  Github,
  Star,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/theme-toggle';
import { OmIcon } from '@/components/icons/om';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/temples', label: 'Temples', icon: Landmark },
  { href: '/library', label: 'Vedic Library', icon: BookOpen },
  { href: '/wall-of-devotion', label: 'Wall of Devotion', icon: Sparkles },
];

const privateNavItems = [
  { href: '/account', label: 'My Account', icon: User },
  { href: '/reports', label: 'Reports', icon: BarChart2 },
  { href: '/favorites', label: 'My Favorites', icon: Star },
];

export function Header() {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      {navItems.map((item) => (
        <Button
          key={item.href}
          asChild
          variant={pathname === item.href ? 'secondary' : 'ghost'}
          onClick={() => isMobile && setMobileMenuOpen(false)}
          className={isMobile ? 'justify-start' : ''}
        >
          <Link href={item.href}>
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Link>
        </Button>
      ))}
      {user && !loading && (
        <>
          {privateNavItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant={pathname.startsWith(item.href) ? 'secondary' : 'ghost'}
              onClick={() => isMobile && setMobileMenuOpen(false)}
              className={isMobile ? 'justify-start' : ''}
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          ))}
        </>
      )}
    </>
  );

  const AuthMenu = () => {
    if (loading) {
      return <Button variant="ghost" size="icon" className="animate-pulse" />;
    }

    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">Open user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/account">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
             <DropdownMenuItem asChild>
              <Link href="/favorites">
                <Star className="mr-2 h-4 w-4" />
                <span>My Favorites</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost">
          <Link href="/login">
            <LogIn className="mr-2 h-4 w-4" /> Login
          </Link>
        </Button>
        <Button asChild>
          <Link href="/signup">
            <UserPlus className="mr-2 h-4 w-4" /> Sign Up
          </Link>
        </Button>
      </div>
    );
  };

  const MobileMenu = () => (
    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <PanelLeftOpen />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <SheetHeader>
          <Link
            href="/"
            className="flex items-center gap-2 mb-4"
            onClick={() => setMobileMenuOpen(false)}
          >
            <OmIcon className="h-8 w-8 text-primary" />
            <span className="font-headline text-xl font-semibold">
              Dharma Treasury
            </span>
          </Link>
        </SheetHeader>
        <nav className="flex flex-col gap-2">
          <NavLinks isMobile />
          <DropdownMenuSeparator />
          {!user && !loading && (
             <>
                <Button asChild variant="ghost" className="justify-start">
                    <Link href="/login"><LogIn className="mr-2 h-4 w-4" /> Login</Link>
                </Button>
                 <Button asChild className="justify-start">
                    <Link href="/signup"><UserPlus className="mr-2 h-4 w-4" /> Sign Up</Link>
                </Button>
             </>
          )}
           <Button asChild variant="ghost" className="justify-start">
              <a href="https://github.com/firebase/genkit/tree/main/studio/samples/dharma-treasury" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  <span>View on GitHub</span>
              </a>
            </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <OmIcon className="h-8 w-8 text-primary" />
            <span className="font-headline text-xl font-semibold">
              Dharma Treasury
            </span>
          </Link>
        </div>

        <MobileMenu />

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="hidden md:flex items-center gap-2">
            <NavLinks />
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="hidden md:block">
              <AuthMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
