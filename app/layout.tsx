import './globals.css';
import type { Metadata } from 'next';
import { Footer } from '@/components/shared/Footer';
import { MainHeader } from '@/components/header/MainHeader';
import Providers from '@/utils/provider';
import { ClerkProvider } from '@clerk/nextjs';
import { ToastContainer } from 'react-toastify';

export const metadata: Metadata = {
    title: 'EMPLEO',
    description: 'Your job search organizer...',
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
                    <Providers>
                        <div className="max-w-[1280px] mx-xl xl:mx-xxl 2xl:mx-auto">
                            <MainHeader />
                            {children}
                            <Footer />
                        </div>
                        <ToastContainer
                            containerId={'myToast'}
                            position="top-right"
                            autoClose={1000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            draggable
                            theme="light"
                        />
                    </Providers>
                </body>
            </html>
        </ClerkProvider>
    );
}
