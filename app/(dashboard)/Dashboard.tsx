'use client';

import { useState } from 'react';
import { ColumnWithJobs } from './getColumns';

import dynamic from 'next/dynamic';
import BasicTable from '@/components/BasicTable';
import DashboardHeader from '@/components/shared/DashboardHeader';
import { JobsWithCols } from './getJobs';

type Props = {
    userColumns: ColumnWithJobs[];
    userJobs: JobsWithCols[];
};
const BoardNoSSR = dynamic(() => import('@/components/Board'), { ssr: false });

function Dashboard({ userColumns, userJobs }: Props) {
    const [toggleViewMode, setToggleViewMode] = useState(false);
    return (
        <>
            <div className="ml-xl">
                <DashboardHeader
                    onToggle={setToggleViewMode}
                    toggleViewMode={toggleViewMode}
                />
                <div>
                    {toggleViewMode ? (
                        <BoardNoSSR columnData={userColumns} />
                    ) : (
                        <BasicTable jobData={userJobs} />
                    )}
                </div>
            </div>
        </>
    );
}

export default Dashboard;
