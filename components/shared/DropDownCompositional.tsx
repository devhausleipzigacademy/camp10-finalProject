'use client';

import React from 'react';

type DdTabProps = {
    children: React.ReactNode[];
    defaultValue: string;
    className?: string;
};

type DdListProps = {
    children: React.ReactNode[];
    className?: string;
};

type DdTriggerProps = {
    children: React.ReactNode[] | React.ReactNode;
    value: string;
};
type DdContentProps = {
    children: React.ReactNode[] | React.ReactNode;
    value: string;
    className?: string;
};

const TabsContext = React.createContext({
    value: '',
    setValue: (value: string) => {},
});

export default function DdTab({
    children,
    defaultValue,
    className,
}: DdTabProps) {
    const [value, setValue] = React.useState(defaultValue);

    return (
        <TabsContext.Provider value={{ value, setValue }}>
            <div className={className}>{children}</div>
        </TabsContext.Provider>
    );
}

export function DdList({ children, className }: DdListProps) {
    return <ul className={className}>{children}</ul>;
}
export function DdContent({ children, className }: DdContentProps) {
    return <li className={className}>{children}</li>;
}

export function DdTrigger({ children, value }: DdTriggerProps) {
    const { setValue } = React.useContext(TabsContext);
    return (
        <li
            onClick={() => {
                setValue(value);
            }}
        >
            {children}
        </li>
    );
}

// copy-pasted Julians boiler, deleted TabContent-Component and Value/setValue
