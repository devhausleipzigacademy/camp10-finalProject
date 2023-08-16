'use client';

import SquareIcon from '@/icons/SquareIcon';

import { useState } from 'react';
import SearchIcon from '@/icons/SearchIcon';
import SearchInput from './SearchInput';
import { getInitialState } from '@dnd-kit/core/dist/store';
import { string } from 'zod';
import dynamic from 'next/dynamic';
import BasicTable from '../BasicTable';

const BoardNoSSR = dynamic(() => import('@/components/Board'), { ssr: false });

export default function DashboardHeader() {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (value: string) => {
        setSearchValue(value);
    };
    const [toggleViewMode, setToggleViewMode] = useState(false);
    return (
        <div>
            <header className="bg-basicColors-dark w-full h-[80px] flex flex-row justify-between py-s">
          
                <SearchInput onSearch={handleSearch} />

                <div className="">
                    <button className='' onClick={() => setToggleViewMode(!toggleViewMode)}>
                       switch
                    </button>
                </div>
            </header>
            {toggleViewMode ? <BasicTable/> : <BoardNoSSR />}
        </div>
    );
}
