'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/icons';
import { LayoutDashboard, LogOut } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function AppSidebar() {
  const pathname = usePathname();
  const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar');

  return (
    <Sidebar collapsible="icon" className="border-r border-border/20">
      <SidebarHeader>
        <div className="flex items-center gap-2.5 px-2">
          <Logo className="h-8 w-8 text-primary" />
          <span className="text-lg font-headline font-semibold text-primary">CareAssist</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              href="/dashboard"
              isActive={pathname.startsWith('/dashboard')}
              tooltip="Dashboard"
            >
              <LayoutDashboard />
              <span>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-3 p-2">
          <Avatar className="h-9 w-9">
            <AvatarImage src={userAvatar?.imageUrl} alt="Dr. Anya Sharma" />
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-sm group-data-[collapsible=icon]:hidden">
            <span className="font-semibold text-sidebar-foreground">Dr. Anya Sharma</span>
            <span className="text-xs text-sidebar-foreground/70">Cardiologist</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
