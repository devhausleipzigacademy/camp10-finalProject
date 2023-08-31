'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import Button from '../shared/Button';

type NavLinkProps = {
    children: React.ReactNode;
    href: string;
};

function NavLink({ children, href }: NavLinkProps) {
    const pathName = usePathname();
    return (
        <Link href={href}>
            <Button
                variant={pathName.startsWith(href) ? 'secondary' : 'primary'}
                size="tiny"
            >
                {children}
            </Button>
        </Link>
    );
}

export default NavLink;
