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
                    className=" flex items-center justify-center  border-2 rounded-xl border-basicColors-light mr-m"
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
                            size={20}
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
                            size={20}
                            color={toggleViewMode ? '#3D3D3D' : '#F5F7FE'}
                        />
                    </div>
                </div>
            </header>
        </div>
    );
}
