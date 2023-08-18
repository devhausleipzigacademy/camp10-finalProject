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
        <div className="ml-xl">
            <header className="bg-basicColors-dark container h-[80px] flex flex-row justify-between py-s pl-m ">
                <SearchInput onSearch={handleSearch} />

                <div
                    onClick={() => setToggleViewMode(!toggleViewMode)}
                    className=" flex items-center justify-center  border-2 rounded-xl border-basicColors-light mr-m"
                >
                    <div
                        className={cn(
                            'w-[68.5px] h-[49px] rounded-l-xl px-m py-[0.725rem]',
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
                            'w-[68.5px] h-[49px] rounded-r-xl px-m py-[0.725rem]',
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
