import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from '../utils/provider';
import { Footer } from '@/components/shared/Footer';
import { cn } from '@/utils/cn';
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
            <body className="cloud-background font-Default text-basicColors-light flex justify-center">
                <div className="max-w-[1280px] flex flex-col justify-between mx-xl xl:mx-xxl 2xl:mx-auto">
                    <MainHeader />
                    <Providers>{children}</Providers>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
