import React from 'react';
import Header from '../../components/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen flex flex-col items-center">
      <Header underline={false} />
      <p>Dashboard Layout</p>
      {children}
    </main>
  );
}
