'use client';

import SquareIcon from '@/icons/SquareIcon';
import Board from '../Board';
import InputDashboardHeader from './InputDashboardHeader';
import { useState } from 'react';
import TabelIcon from '@/icons/TabelIcon';
import SearchIcon from '@/icons/SearchIcon';

export default function DashboardHeader() {
    const [toggleViewMode, setToggleViewMode] = useState(false);
    return (
        <div>
            <header className="bg-basicColors-dark w-full h-[80px] flex flex-row justify-between">
                <InputDashboardHeader
                    className="bg-basicColors-dark rounded-full border-[1px] border-basicColors-light w-[320px] h-[50px] text-basicColors-light pl-xl"
                    placeholder="search..."
                    icon={<SearchIcon  />}
                />

                <div className="flex felx-column">
                    <button  onClick={() => setToggleViewMode(!toggleViewMode)}>
                        <SquareIcon />
                        {/* <TabelIcon /> */}
                        {toggleViewMode ? 'happy' : 'unhappy'}
                    </button>
                </div>
            </header>
        </div>
    );
}
