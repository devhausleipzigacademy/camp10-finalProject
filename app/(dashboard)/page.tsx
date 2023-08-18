import dynamic from 'next/dynamic';
import { auth } from '@clerk/nextjs';
import { Column, Job } from '@prisma/client';
import { getColumns } from './getColumns';


const BoardNoSSR = dynamic(() => import('@/components/Board'), { ssr: false });

export default async function Dashboard() {
    const { userId } = auth();
    let userColumns = await getColumns(userId as string);
    // console.log('userColumnsFromDB:', userColumns);

    return <BoardNoSSR columnData={userColumns} />;
}

