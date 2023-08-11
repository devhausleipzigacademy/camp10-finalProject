import React from 'react';
import Link from 'next/link';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { auth } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs';

export function MainHeader() {
    // TODO: replace with clerk auth
    // TODO: replace with Button component

    const { isAuth } = auth();
    return (
        <header className={`flex justify-between 2xl:max-w-7xl py-m`}>
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
                        <Link href="/">
                            <UserButton afterSignOutUrl="/" />
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
