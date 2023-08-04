import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from './utils/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'there will be a name',
  description: 'A job search organizer...',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <p>This is the root layout</p>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
