// import BasicTable from '@/components/BasicTable';
// import Board from '@/components/Board';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { auth } from '@clerk/nextjs';
import { Column, Job, PrismaClient } from '@prisma/client';

const BoardNoSSR = dynamic(() => import('@/components/Board'), { ssr: false });
const prisma = new PrismaClient();
export type ColumnWithJobs = Omit<Column, 'userId' | 'createdAt'> & {
    jobs: Job[];
};

const DUMMY_JOBCARD_DATA_FROM_DB: Job[] = [];

const DUMMY_COLUMN_DATA_FROM_DB: ColumnWithJobs[] = [
    {
        id: 'c1',
        positionInBoard: 0,
        title: 'Scouted',
        color: '#B4A0D1',
        jobs: [] as Job[],
    },
    {
        id: 'c2',
        positionInBoard: 1,
        title: 'Applied',
        color: '#CBD87E',
        jobs: [] as Job[],
    },
    {
        id: 'c3',
        positionInBoard: 2,
        title: 'Interview',
        color: '#FDC959',
        jobs: DUMMY_JOBCARD_DATA_FROM_DB,
    },
    {
        id: 'c4',
        positionInBoard: 3,
        title: 'Offer',
        color: '#FE5A35',
        jobs: [],
    },
];

const initColumns = [
    {
        title: 'Scouted',
        color: '#B4A0D1',
        positionInBoard: 0,
    },
    {
        title: 'Applied',
        color: '#CBD87E',
        positionInBoard: 1,
    },
    {
        title: 'Interview',
        color: '#FDC959',
        positionInBoard: 2,
    },
    {
        title: 'Offer',
        color: '#FE5A35',
        positionInBoard: 3,
    },
    {
        title: 'Rejected',
        color: '#4C9A2A',
        positionInBoard: 4,
    },
];

export default async function KanbanBoard() {
    const { userId } = auth();
    console.log(userId);
    type ColumnSchema = Omit<Column, 'createdAt' | 'id'>;

    const getColumns = async ():Promise<ColumnWithJobs[]> => {
        // if user is signed in, try to fetch existing columns
        const res = await prisma.column.findMany({
            where: {
                userId: userId as string,
            },
            include: {
                jobs: true,
            },
        });
        // if response if null, create new columns and job for the user. 
        if (res.length === 0 && userId) {
            const res = await prisma.column.createMany({
                data: initColumns.map(col => {
                    return {
                        ...col,
                        userId,
                    };
                }),
            });
            console.log('res:', res);

            const column = await prisma.column.findFirst({
                where: {
                    userId,
                },
                select: {
                    id: true,
                },
            });

            if (column) {
                const resNewJob = await prisma.job.create({
                    data: {
                        title: 'Frontend Developer',
                        companyName: 'Google',
                        userId,
                        columnId: column.id,
                        positionInColumn: 0,
                        url: 'https://example.com/careers',
                    },
                });
                console.log("new job:", resNewJob)
            }
            return await getColumns()
        }
        return res;
    };
    let userColumns = await getColumns();
    console.log('userColumnsFromDB:', userColumns);

    return <BoardNoSSR columnData={userColumns} />;
    // return <BasicTable />;
}
