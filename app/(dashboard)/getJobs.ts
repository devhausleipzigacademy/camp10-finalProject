import prisma from '@/utils/prismaClient';
import { Column as ColumnType, Job } from '@prisma/client';

export type JobsWithCols = Job & {
    column: { title: string; color: string };
};

export const getJobs = async (
    userId: string | undefined
): Promise<JobsWithCols[]> => {
    // when user is signed in, try to fetch existing columns
    const res = await prisma.job.findMany({
        where: {
            userId: userId,
        },
        include: {
            column: {
                select: {
                    title: true,
                    color: true,
                },
            },
        },
        orderBy: {
            createdAt: 'asc',
        },
    });
    return res;
};
