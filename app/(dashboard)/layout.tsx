import React from 'react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div>Board Header</div>
            {children}
        </>
    );
}
