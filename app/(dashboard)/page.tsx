import { auth } from '@clerk/nextjs';
import { getColumns } from './getColumns';
import DashboardComponent from '../../components/Dashboard';

export default async function Dashboard() {
    const { userId } = auth();
    let userColumns = await getColumns(userId as string);

    return <DashboardComponent userColumns={userColumns} />;
}
