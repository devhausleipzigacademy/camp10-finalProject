'use client';

import { useState } from 'react';
import { ColumnWithJobs } from '../app/(dashboard)/getColumns';
import { JobsWithCols } from '../app/(dashboard)/getJobs';
import BasicTable from '@/components/BasicTable';
import DashboardFrame, {
    DashboardContent,
    DashboardHeader,
    DashboardTrigger,
} from '@/components/shared/DashTabs';
import Board from '@/components/Board';
import { HiOutlineListBullet } from 'react-icons/hi2';
import { SlGrid } from 'react-icons/sl';

type Props = {
    userColumns: ColumnWithJobs[];
    userJobs: JobsWithCols[];
};

function Dashboard({ userColumns, userJobs }: Props) {
    const [filter, setFilter] = useState('');
    return (
        <DashboardFrame defaultValue="kanban">
            <DashboardHeader
                filter={filter}
                setFilter={setFilter}
                className="ui-background container h-xxxl flex py-s px-m border justify-between"
            >
                <div className="border-2 rounded-2xl border-basicColors-light w-[7.5rem] overflow-hidden flex justify-evenly">
                    <DashboardTrigger value="kanban">
                        <SlGrid size={25} />
                    </DashboardTrigger>
                    <DashboardTrigger value="table">
                        <HiOutlineListBullet size={30} />
                    </DashboardTrigger>
                </div>
            </DashboardHeader>
            <DashboardContent value="kanban" className='relative'>
                <Board columnData={userColumns} />
            </DashboardContent>
            <DashboardContent value="table">
                <BasicTable
                    filter={filter}
                    setFilter={setFilter}
                    jobData={userJobs}
                />
            </DashboardContent>
        </DashboardFrame>
    );
}

export default Dashboard;
