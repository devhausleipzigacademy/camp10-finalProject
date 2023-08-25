import React from 'react';
import NavLink from './NavLink';
import Link from 'next/link';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { auth, UserButton, SignOutButton } from '@clerk/nextjs';
import Button from '../shared/Button';

export function MainHeader() {
    const { userId } = auth();
    return (
        <header className={`flex justify-between py-m`}>
            <Link href="/" className="font-500 text-xxl">
                EMPLEO.
            </Link>
            <nav className="space-x-s flex items-center">
                <HiArrowNarrowRight className="text-xl" />
                {!userId && (
                    <>
                        <NavLink href="/login">Login</NavLink>
                        <NavLink href="/registration">Register</NavLink>
                    </>
                )}
                {userId && (
                    <>
                        <UserButton afterSignOutUrl="/" />
                        <SignOutButton />
                    </>
                )}
            </nav>
        </header>
    );
}

export default MainHeader;
