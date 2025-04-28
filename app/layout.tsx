import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AnimationProvider from '@/components/providers/AnimationProvider';
import { Toaster } from 'sonner';
import { ThemeProvider } from 'next-themes';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Portfolio Generator',
  description: 'Create beautiful portfolios with ease',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster position="top-center" richColors closeButton />
          <AnimationProvider>
            {children}
          </AnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
