import prisma from '@/utils/prismaClient';
// Sample code, not tested
const getJob = async () => {
    // select title of column from job table based on the relation
    prisma.job.findMany({
        include: {
            column: {
                select: {
                    title: true,
                },
            },
        },
        where: {
            userId: 'userId',
        },
    });
};
