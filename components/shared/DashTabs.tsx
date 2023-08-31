'use client';

import React, { useContext } from 'react';

type DashboardProps = {
    children: React.ReactNode;
    defaultValue: string;
    className?: string;
};

type DashboardHeaderProps = {
    children: React.ReactNode | React.ReactNode[];
    className?: string;
};

type DashboardTriggerProps = {
    children: React.ReactNode | React.ReactNode[];
    value: string;
};

type DashboardContentProps = {
    children: React.ReactNode | React.ReactNode[];
    className?: string;
    value: string;
};

const contextType = React.createContext({
    value: '',
    setValue: (value: string) => {},
});

export default function Dashboard({
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

export function DashboardHeader({ children, className }: DashboardHeaderProps) {
    return <div className={className}> {children} </div>;
}

export function DashboardTrigger({ children, value }: DashboardTriggerProps) {
    const { setValue } = React.useContext(contextType);

    return <div onClick={() => setValue(value)}>{children}</div>;
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
