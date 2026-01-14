import type { Metadata } from 'next';
import { Inter, Space_Grotesk, Source_Code_Pro } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/sidebar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-source-code-pro',
});

export const metadata: Metadata = {
  title: 'CareAssist',
  description: 'A semi-autonomous smart patient monitoring platform.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${sourceCodePro.variable} font-body antialiased`}
      >
        <SidebarProvider>
          <div className="md:hidden">
            {/* On mobile, sidebar is in a sheet and doesn't take space */}
            <AppSidebar />
            <main>{children}</main>
          </div>
          <div className="hidden md:flex">
            {/* On desktop, sidebar is part of the layout */}
            <AppSidebar />
            {children}
          </div>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
