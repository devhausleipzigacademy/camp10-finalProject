import prisma from '@/utils/prismaClient';
import { Column as ColumnType, Job } from '@prisma/client';

export type ColumnWithJobs = ColumnType & {
    jobs: Job[];
    isNewColumn?: boolean;
};

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

export const getColumns = async (
    userId: string | undefined
): Promise<ColumnWithJobs[]> => {
    // when user is signed in, try to fetch existing columns
    const res = await prisma.column.findMany({
        where: {
            userId: userId,
        },
        include: {
            jobs: {
                where: {
                    isArchived: false,
                },
                orderBy: {
                    positionInColumn: 'desc',
                },
            },
        },
        orderBy: {
            positionInBoard: 'asc',
        },
    });

    // If no columns are found for the user, create new columns based on initColumns
    if (res.length === 0 && userId) {
        console.log('called twice');
        const newColumns = await Promise.all(
            initColumns.map((column, index) =>
                prisma.column.create({
                    data: {
                        ...column,
                        userId: userId,
                        positionInBoard: index,
                    },
                })
            )
        );

        // Return the newly created columns with an empty jobs array for each
        return newColumns.map(column => ({
            ...column,
            jobs: [],
        }));
    }

    return res;
};
