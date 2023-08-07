import Link from 'next/link';
import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <nav>
        <Link href="/login">Login</Link>
        <Link href="/registration">Register</Link>
        <Link href="/">Home</Link>
      </nav>
      {children}
    </div>
  );
}
