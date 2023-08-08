import React from 'react';
import Link from 'next/link';
import { HiArrowNarrowRight } from 'react-icons/hi';

export function MainHeader() {
  // TODO: replace with clerk auth
  // TODO: replace with Button component
  const isAuth = false;
  return (
    <header className={`flex justify-between w-full 2xl:max-w-7xl py-m`}>
      <Link href="/" className="font-500 text-xxl">
        EMPLEO.
      </Link>
      <nav className="space-x-s flex items-center">
        <HiArrowNarrowRight className="text-xl" />
        {!isAuth && (
          <>
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
          </>
        )}
        {isAuth && (
          <button className="border border-basicColors-light rounded-full px-s py-xxs hover:cursor-pointer">
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}

export default MainHeader;
