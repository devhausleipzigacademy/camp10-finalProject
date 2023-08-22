import dynamic from 'next/dynamic';
import { auth } from '@clerk/nextjs';
import { getColumns } from './getColumns';

const BoardNoSSR = dynamic(() => import('@/components/Board'), { ssr: false });

export default async function Dashboard() {
    const { userId } = auth();
    console.log(userId);
    let userColumns = await getColumns(userId as string);

    return <BoardNoSSR columnData={userColumns} />;
}
