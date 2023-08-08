import './globals.css';
import type { Metadata } from 'next';
import Providers from './utils/provider';

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
      <body className="text-white bg-basicColors-dark font-Default">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
