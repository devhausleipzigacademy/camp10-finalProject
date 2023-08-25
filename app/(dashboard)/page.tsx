import { auth } from '@clerk/nextjs';
import { getColumns } from './getColumns';
import { getJobs } from './getJobs';
import Dashboard from '@/components/Dashboard';

export default async function Page() {
    const { userId } = auth();
    let userColumns = await getColumns(userId as string);
    let userJobs = await getJobs(userId as string);

    return <Dashboard userColumns={userColumns} userJobs={userJobs} />;
}
