import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from '../utils/provider';
import { Footer } from '@/components/shared/Footer';
import { cn } from '@/utils/cn';

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
            <body className="flex flex-col bg-basicColors-dark font-Default min-h-screen">
                <nav className="bg-slate-500 py-4">This is the nav </nav>
                <main className="flex-grow">
                    <Providers>{children}</Providers>
                </main>
                <Footer />
            </body>
        </html>
    );
}
