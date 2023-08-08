import React from 'react';
import Header from '@/app/components/Header';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="cloud-background h-screen flex flex-col items-center">
      <Header underline={true}/>
      {children}
    </main>
  );
}
