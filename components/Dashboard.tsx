'use client';

import { useState } from 'react';
import { ColumnWithJobs } from '../app/(dashboard)/getColumns';
import { JobsWithCols } from '../app/(dashboard)/getJobs';
import dynamic from 'next/dynamic';
import BasicTable from '@/components/BasicTable';
import DropDownFrame, { DropDownTrigger } from './shared/DropDownCompositional';
import DashboardFrame, { DashboardContent, DashboardHeader, DashboardTrigger } from '@/components/shared/DashTabs'
import Board from '@/components/Board';

type Props = {
    userColumns: ColumnWithJobs[];
    userJobs: JobsWithCols[];
};
const BoardNoSSR = dynamic(() => import('@/components/Board'), { ssr: false });

function Dashboard({ userColumns, userJobs }: Props) {
    const [toggleViewMode, setToggleViewMode] = useState(true);
    const [filter, setFilter] = useState('');
    return (
        <DashboardFrame defaultValue='kanban'>
            <DashboardHeader
                className='ui-background container h-xxxl flex justify-end py-s px-m border'
            >
                <div className='border-2 rounded-xl border-basicColors-light w-[7.5rem] overflow-hidden'>
                    <DashboardTrigger value='kanban'>
                        
                    </DashboardTrigger>
                    <DashboardTrigger value='table'>
                    </DashboardTrigger>
                </div>
            </DashboardHeader>
            <DashboardContent value='kanban'>
                <Board columnData={userColumns}/>
            </DashboardContent>
            <DashboardContent value='table'>
                <BasicTable 
                    filter={filter}
                    jobData={userJobs}
                    setFilter={setFilter}
                />
            </DashboardContent>
        </DashboardFrame>
        // <div className="w-full">
        //     <DashboardHeader
        //         filter={filter}
        //         setFilter={setFilter}
        //         onToggle={setToggleViewMode}
        //         toggleViewMode={toggleViewMode}
        // />  

        //     <div className="h-full w-full relative">
        //         {toggleViewMode ? (
        //             <BoardNoSSR columnData={userColumns} />
        //         ) : (
        //             <BasicTable
        //                 filter={filter}
        //                 setFilter={setFilter}
        //                 jobData={userJobs}
        //             />
        //         )}
        //     </div>
        // </div>
    );
}

export default Dashboard;
