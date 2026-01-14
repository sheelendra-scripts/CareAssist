'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/icons';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Stethoscope, Bell, Settings } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const navItems = [
  { href: '/dashboard', label: 'Inpatient', icon: LayoutDashboard },
  { href: '/opd', label: 'OPD', icon: Stethoscope },
  { href: '#', label: 'Alerts', icon: Bell },
  { href: '#', label: 'Settings', icon: Settings },
];

export function GlobalNavbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/dashboard" className="mr-8 flex items-center gap-2">
          <Logo className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block font-headline">CareAssist</span>
        </Link>
        <div className="flex items-center gap-4 text-sm">
          {navItems.map((item) => (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              className={cn(
                'relative px-2 py-1 transition-colors hover:text-primary',
                pathname.startsWith(item.href) && item.href !== '#'
                  ? 'font-medium text-primary'
                  : 'text-muted-foreground'
              )}
            >
              <item.icon className="h-5 w-5 sm:hidden" />
              <span className="hidden sm:inline">{item.label}</span>
              {pathname.startsWith(item.href) && item.href !== '#' && (
                <span className="absolute bottom-[-19px] left-0 h-0.5 w-full bg-primary transition-all"></span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
