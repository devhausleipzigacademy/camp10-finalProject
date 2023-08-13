'use client';

import React from 'react';
import Link from 'next/link';
import { HiArrowNarrowRight } from 'react-icons/hi';
<<<<<<< HEAD
import { auth, UserButton, SignOutButton } from '@clerk/nextjs';
=======
import { useAuth, UserButton, SignOutButton } from '@clerk/nextjs';
>>>>>>> d04eef2 (use Button component in  MainHeader)
import Button from './shared/Button';

export function MainHeader() {

<<<<<<< HEAD
    const { userId } = auth();
=======
    const { isSignedIn } = useAuth();
>>>>>>> d04eef2 (use Button component in  MainHeader)
    return (
        <header className={`flex justify-between 2xl:max-w-7xl py-m`}>
            <Link href="/" className="font-500 text-xxl">
                EMPLEO.
            </Link>
            <nav className="space-x-s flex items-center">
                <HiArrowNarrowRight className="text-xl" />
<<<<<<< HEAD
                {!userId && (
                    <>
                        <Link href="/login">
                            <Button variant="primary" size="tiny">
=======
                {!isSignedIn && (
                    <>
                        <Link href="/login">
                            <Button variant='primary' size='tiny'>
>>>>>>> d04eef2 (use Button component in  MainHeader)
                                Login
                            </Button>
                        </Link>
                        <Link href="/registration">
<<<<<<< HEAD
                            <Button variant="active" size="tiny">
=======
                            <Button variant='hover' size='tiny'>
>>>>>>> d04eef2 (use Button component in  MainHeader)
                                Register
                            </Button>
                        </Link>
                    </>
                )}
<<<<<<< HEAD
                {userId && (
                    <>
                        <UserButton afterSignOutUrl="/" />
=======
                {isSignedIn && (
                    <>
                        <Link href="/">
                            <UserButton afterSignOutUrl="/" />
                        </Link>
>>>>>>> d04eef2 (use Button component in  MainHeader)
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