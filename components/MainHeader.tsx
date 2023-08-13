import React from 'react';
import Link from 'next/link';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { auth, UserButton, SignOutButton } from '@clerk/nextjs';
import Button from './shared/Button';

export function MainHeader() {

    const { userId } = auth();
    return (
        <header className={`flex justify-between 2xl:max-w-7xl py-m`}>
            <Link href="/" className="font-500 text-xxl">
                EMPLEO.
            </Link>
            <nav className="space-x-s flex items-center">
                <HiArrowNarrowRight className="text-xl" />
                {!userId && (
                    <>
                        <Link href="/login">
                            <Button variant="primary" size="tiny">
                                Login
                            </Button>
                        </Link>
                        <Link href="/registration">
                            <Button variant="active" size="tiny">
                                Register
                            </Button>
                        </Link>
                    </>
                )}
                {userId && (
                    <>
                        <UserButton afterSignOutUrl="/" />
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
