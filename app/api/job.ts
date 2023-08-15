import { PrismaClient } from '@prisma/client';

// Sample code, not tested
const getJob = async () => {
    // select title of column from job table based on the relation
    const prisma = new PrismaClient();
    prisma.job.findMany({
        select: {
            column: {
                select: {
                    title: true,
                },
            },
        },
        where: {
          userId: "userId",
        }
    });
};
