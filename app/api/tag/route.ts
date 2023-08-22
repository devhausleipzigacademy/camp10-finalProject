import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prismaClient';
import { auth } from '@clerk/nextjs';

export const GET = async (req: NextRequest) => {
    const { userId } = auth();

    if (!userId) {
        return NextResponse.json('Unauthorized', { status: 401 });
    }

    const tags = await prisma.tag.findMany({
        where: {
            userId: userId,
        },
        select: {
            name: true,
        },
    });
    return NextResponse.json(
        tags.map(tag => {
            return tag.name;
        })
    );
};
