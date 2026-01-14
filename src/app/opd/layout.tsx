import { SidebarInset } from '@/components/ui/sidebar';

export default function OpdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarInset>
        {children}
    </SidebarInset>
  );
}
