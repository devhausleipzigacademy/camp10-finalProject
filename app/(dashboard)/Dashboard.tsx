'use client';

import { useState } from 'react';
import { ColumnWithJobs } from './getColumns';

import dynamic from 'next/dynamic';
import BasicTable from '@/components/BasicTable';
import DashboardHeader from '@/components/shared/DashboardHeader';

type Props = {
    userColumns: ColumnWithJobs[];
};
const BoardNoSSR = dynamic(() => import('@/components/Board'), { ssr: false });

function Dashboard({ userColumns }: Props) {
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
                        <BasicTable />
                    )}
                </div>
            </div>
        </>
    );
}

export default Dashboard;
