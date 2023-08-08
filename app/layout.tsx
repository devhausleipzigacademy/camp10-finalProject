import './globals.css';
import type { Metadata } from 'next';
import Providers from './utils/provider';
import Header from '@/components/Header';

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
      <body className="text-white cloud-background font-Default">
      <div className="max-w-[1300px] mx-auto">
        <Header underline={true} />
        <Providers>{children}</Providers>
      </div>
      </body>
    </html>
  );
}
