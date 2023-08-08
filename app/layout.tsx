import './globals.css';
import type { Metadata } from 'next';
import Providers from './utils/provider';
import MainHeader from '@/components/MainHeader';

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
      <body className="cloud-background font-Default text-basicColors-light">
      <div className="max-w-[1280px] mx-xl xl:mx-xxl 2xl:mx-auto">
        <MainHeader />
        <Providers>{children}</Providers>
      </div>
      </body>
    </html>
  );
}
