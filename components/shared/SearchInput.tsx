'use client';

import { HiInformationCircle, HiOutlineViewGrid } from 'react-icons/hi';
import { AiFillInfoCircle } from 'react-icons/ai';
import React, { ChangeEvent, useState } from 'react';

export type SearchProps = {
    onSearch: (value: string) => void;
    value: string;
};

export default function SearchInput({ onSearch, value }: SearchProps) {
    return (
        <label
            placeholder="Search..."
            className="flex items-center px-s h-full rounded-full border"
        >
            <AiFillInfoCircle />
            <input
                type={'search'}
                name={'search'}
                value={value}
                placeholder={value}
                onChange={event => onSearch(event.target.value)}
                className="bg-transparent outline-none px-xs"
            />
        </label>
    );
}
