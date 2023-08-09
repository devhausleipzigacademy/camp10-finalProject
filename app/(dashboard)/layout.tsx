import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-full flex flex-col">
      <p>Dashboard Layout</p>
      {children}
    </main>
  );
}
