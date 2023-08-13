'use client';

import React from 'react';
import Link from 'next/link';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { useAuth, UserButton, SignOutButton } from '@clerk/nextjs';
import Button from './shared/Button';

export function MainHeader() {
    // TODO: replace with clerk auth
    // TODO: replace with Button component

    const { isSignedIn } = useAuth();
    return (
        <header className={`flex justify-between 2xl:max-w-7xl py-m`}>
            <Link href="/" className="font-500 text-xxl">
                EMPLEO.
            </Link>
            <nav className="space-x-s flex items-center">
                <HiArrowNarrowRight className="text-xl" />
                {!isSignedIn && (
                    <>
                        <Link href="/login">
                            <Button variant='primary' size='tiny'>
                                Login
                            </Button>
                        </Link>
                        <Link href="/registration">
                            <Button variant='hover' size='tiny'>
                                Register
                            </Button>
                        </Link>
                    </>
                )}
                {isSignedIn && (
                    <>
                        <Link href="/">
                            <UserButton afterSignOutUrl="/" />
                        </Link>
                        <Button variant="primary" size="tiny">
                            <SignOutButton />
                        </Button>
                    </>
                )}
            </nav>
        </header>
    );
}

export default MainHeader;
