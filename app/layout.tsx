import './globals.css';
import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import { ClerkProvider } from '@clerk/nextjs';

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
        <ClerkProvider>
            <html lang="en">
                <body className="cloud-background font-Default text-basicColors-light flex justify-center">
                    <div className="max-w-[1280px] mx-xl xl:mx-xxl 2xl:mx-auto">
                        <MainHeader />
                        {children}
                        <footer className="flex justify-center py-m w-screen">
                            {' '}
                            Footer Placeholder{' '}
                        </footer>
                    </div>
                </body>
            </html>
        </ClerkProvider>
    );
}
