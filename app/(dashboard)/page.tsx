import dynamic from 'next/dynamic';
import { auth } from '@clerk/nextjs';
import { getColumns } from './getColumns';
import DashboardHeader from '@/components/shared/DashboardHeader';
import DashboardComponent from './Dashboard';
import { getJobs } from './getJobs';

export default async function Dashboard() {
    const { userId } = auth();
    let userColumns = await getColumns(userId as string);
    let userJobs = await getJobs(userId as string);

    return <DashboardComponent userColumns={userColumns} userJobs={userJobs} />;
}
