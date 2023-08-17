'use client';

import { useState } from 'react';
import SearchInput from './SearchInput';
import dynamic from 'next/dynamic';
import BasicTable from '../BasicTable';
import { HiOutlineViewGrid } from 'react-icons/hi';
import { HiOutlineListBullet } from 'react-icons/hi2';
import { SlGrid } from 'react-icons/sl';
import { cn } from '@/utils/cn';

const BoardNoSSR = dynamic(() => import('@/components/Board'), { ssr: false });

export default function DashboardHeader() {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (value: string) => {
        setSearchValue(value);
    };
    const [toggleViewMode, setToggleViewMode] = useState(false);
    return (
        <div className="ml-xl">
            <header className="bg-basicColors-dark w-full h-[80px] flex flex-row justify-between py-s pl-m ">
                <SearchInput onSearch={handleSearch} />

                <div
                    onClick={() => setToggleViewMode(!toggleViewMode)}
                    className=" flex items-center justify-center gap-s px-s border-2 rounded-xl border-basicColors-light mr-m"
                >
                    <div
                        className={cn(
                            'w-[44px] h-[44px]',
                            toggleViewMode
                                ? 'bg-basicColors-light'
                                : 'bg-basicColors-dark'
                        )}
                    >
                        <SlGrid />
                    </div>
                    <div className="bg-basicColors-dark">
                        <HiOutlineListBullet />
                    </div>
                </div>
            </header>
            {toggleViewMode ? <BasicTable /> : <BoardNoSSR />}
        </div>
    );
}
