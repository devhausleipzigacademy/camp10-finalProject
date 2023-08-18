'use client';

import { useState } from 'react';
import SearchInput from './SearchInput';
import dynamic from 'next/dynamic';
import BasicTable from '../BasicTable';
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
        <div className="">
            <header className="ui-background  container h-[80px] flex flex-row justify-between py-s px-m border">
                <SearchInput onSearch={handleSearch} />

                <div
                    onClick={() => setToggleViewMode(!toggleViewMode)}
                    className="flex items-center justify-center border rounded-xl border-basicColors-light w-[120px] overflow-hidden"
                >
                    <div
                        className={cn(
                            'w-1/2 h-full flex justify-center items-center',
                            toggleViewMode
                                ? 'bg-basicColors-dark'
                                : 'bg-basicColors-light'
                        )}
                    >
                        <SlGrid
                            size={25}
                            color={!toggleViewMode ? '#3D3D3D' : '#F5F7FE'}
                        />
                    </div>
                    <div
                        className={cn(
                            'w-1/2 h-full flex justify-center items-center',
                            !toggleViewMode
                                ? 'bg-basicColors-dark'
                                : 'bg-basicColors-light'
                        )}
                    >
                        <HiOutlineListBullet
                            size={25}
                            color={toggleViewMode ? '#3D3D3D' : '#F5F7FE'}
                        />
                    </div>
                </div>
            </header>
            {toggleViewMode ? <BasicTable /> : <></>}
        </div>
    );
}
