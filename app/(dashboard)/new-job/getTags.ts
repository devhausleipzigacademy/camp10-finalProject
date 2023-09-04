import prisma from '@/utils/prismaClient';

export const getTags = async (userId: string) => {
    // when user is signed in, try to fetch existing columns
    const res = await prisma.tag.findMany({
        where: {
            userId: userId,
        },
        select: {
            id: true,
            name: true,
        },
    });
    return res;
};