import React from 'react';
import DashboardHeader from '@/components/shared/DashboardHeader';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <DashboardHeader />
            {children}
        </>
    );
}
