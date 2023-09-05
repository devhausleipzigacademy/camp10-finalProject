'use client';

import { cn } from '@/lib/utils';
import React, { useContext } from 'react';
import Button from './Button';
import SearchInput from './SearchInput';

type DashboardProps = {
    children: React.ReactNode;
    defaultValue: string;
    className?: string;
};

type DashboardHeaderProps = {
    children: React.ReactNode | React.ReactNode[];
    className?: string;
    filter: string;
    setFilter: (filter: string) => void;
};

type DashboardTriggerProps = {
    children: React.ReactNode | React.ReactNode[];
    value: string;
    className?: string;
};

type DashboardContentProps = {
    children: React.ReactNode | React.ReactNode[];
    className?: string;
    value: string;
};

const contextType = React.createContext({
    value: ' ',
    setValue: (value: string) => {},
});

export default function DashboardFrame({
    children,
    defaultValue,
    className,
}: DashboardProps) {
    const [value, setValue] = React.useState(defaultValue);

    return (
        <contextType.Provider value={{ value, setValue }}>
            <div className={className}> {children} </div>
        </contextType.Provider>
    );
}

export function DashboardHeader({
    children,
    className,
    filter,
    setFilter,
}: DashboardHeaderProps) {
    const { value } = React.useContext(contextType);
    return (
        <div className={className}>
            {value === 'table' ? (
                <SearchInput onSearch={setFilter} value={filter} />
            ) : (
                <div> </div>
            )}
            {children}
        </div>
    );
}

export function DashboardTrigger({ children, value }: DashboardTriggerProps) {
    const { setValue, value: contextValue } = React.useContext(contextType);

    return (
        <div
            onClick={() => setValue(value)}
            className={cn(
                'flex items-center justify-center w-full',
                value == contextValue
                    ? 'bg-hoverColors-hoverMain text-basicColors-dark'
                    : null
            )}
        >
            {children}
        </div>
    );
}

export function DashboardContent({
    children,
    value,
    className,
}: DashboardContentProps) {
    const { value: contextValue } = React.useContext(contextType);
    return (
        <div className={className}>{contextValue === value && children}</div>
    );
}
