'use client';

import SearchIcon from '@/icons/SearchIcon';
import React, { ChangeEvent, useState } from 'react';

export type SearchProps = {
    onSearch: (value: string) => void;
};

export default function SearchInput(props: SearchProps) {
    const { onSearch } = props;
    const [value, setValue] = useState('search');
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
        <div className="relative-w-full text-basicColors-light">
            <label className=" flex bg-basicColors-dark border-[1px] border-basicColors-light w-[320px] h-[50px] text-basicColors-light rounded-full text-xs focus:outline-none pr-s">
                <SearchIcon />
                <input
                    type={'search'}
                    name={'search'}
                    placeholder={value}
                    onChange={event => searchHandler(event)}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent"
                />
                <button
                    type="submit"
                    className="absolute right-0 top-0 mt-3 ml-4"
                ></button>
            </label>
        </div>
    );
}
