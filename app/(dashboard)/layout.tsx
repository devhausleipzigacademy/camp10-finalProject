import { Footer } from '@/components/shared/Footer';
import React from 'react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="flex-grow">
                Dashboard Layout
                {children}
            </div>
        </>
    );
}
