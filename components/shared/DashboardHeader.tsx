'use client';

import { useState } from 'react';
import SearchInput from './SearchInput';
import dynamic from 'next/dynamic';
import BasicTable from '../BasicTable';
import { HiOutlineListBullet } from 'react-icons/hi2';
import { SlGrid } from 'react-icons/sl';
import { cn } from '@/utils/cn';

type Props = {
    onToggle: (value: boolean) => void;
    toggleViewMode: boolean;
};

export default function DashboardHeader({ onToggle, toggleViewMode }: Props) {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (value: string) => {
        setSearchValue(value);
    };

    return (
        <div className="">
            <header className="ui-background  container h-xxxl flex flex-row justify-between py-s px-m border">
                <SearchInput onSearch={handleSearch} />

                <div
                    onClick={() => onToggle(!toggleViewMode)}
                    className=" flex items-center justify-center  border-2 rounded-xl border-basicColors-light mr-m  w-[7.5rem] overflow-hidden"
                >
                    <div
                        className={cn(
                            'w-1/2 h-full flex justify-center items-center',
                            toggleViewMode
                                ? 'bg-basicColors-light'
                                : 'bg-basicColors-dark'
                        )}
                    >
                        <SlGrid
                            size={20}
                            color={!toggleViewMode ? '#F5F7FE' : '#3D3D3D'}
                        />
                    </div>
                    <div
                        className={cn(
                            'w-1/2 h-full flex justify-center items-center',
                            !toggleViewMode
                                ? 'bg-basicColors-light'
                                : 'bg-basicColors-dark'
                        )}
                    >
                        <HiOutlineListBullet
                            size={20}
                            color={toggleViewMode ? '#F5F7FE' : '#3D3D3D'}
                        />
                    </div>
                </div>
            </header>
        </div>
    );
}
