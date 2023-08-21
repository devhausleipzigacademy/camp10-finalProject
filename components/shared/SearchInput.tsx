'use client';

import { HiInformationCircle, HiOutlineViewGrid } from 'react-icons/hi';
import { AiFillInfoCircle } from 'react-icons/ai';
import React, { ChangeEvent, useState } from 'react';

export type SearchProps = {
    onSearch: (value: string) => void;
};

export default function SearchInput(props: SearchProps) {
    const { onSearch } = props;
    const [value, setValue] = useState('Search...');
    const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { target } = event;
        setValue(target.value);
    };
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSearch(value);
        }
    };

    return (
        <label
            placeholder="Search..."
            className="flex items-center px-s h-full rounded-full border"
        >
            <AiFillInfoCircle />
            <input
                type={'search'}
                name={'search'}
                placeholder={value}
                onChange={event => searchHandler(event)}
                onKeyDown={handleKeyDown}
                className="bg-transparent outline-none px-xs"
            />
        </label>
    );
}
