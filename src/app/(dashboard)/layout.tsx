import { AppSidebar } from '@/components/layout/sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="md:hidden">
        {/* On mobile, sidebar is in a sheet and doesn't take space */}
        <AppSidebar />
        <main>{children}</main>
      </div>
      <div className="hidden md:flex">
         {/* On desktop, sidebar is part of the layout */}
        <AppSidebar />
        <SidebarInset>{children}</SidebarInset>
      </div>
    </SidebarProvider>
  );
}
