import React from 'react';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="cloud-background h-screen flex flex-col items-center">
      <header className="flex justify-between w-[1300px] 2xl:max-w-7xl py-m border border-x-0 border-t-0  border-b-[1px]">
          <Link href="/" className="font-500 text-xxl">
            EMPLEO.
          </Link>
          <nav className="space-x-s flex items-center">
            {/* TODO: add arrow */}
            <Link href="/login">
              <button className="border border-basicColors-light rounded-full px-s py-xxs hover:cursor-pointer">
                Login
              </button>
            </Link>
            <Link href="/registration">
              <button className="border border-basicColors-light rounded-full px-s py-xxs hover:cursor-pointer">
                Register
              </button>
            </Link>
          </nav>
      </header>
      {children}
    </main>
  );
}
