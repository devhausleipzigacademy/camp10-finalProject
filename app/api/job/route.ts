import prisma from '@/utils/prismaClient';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

export const POST = async (req: NextRequest, { params }: Params) => {
    const data = await req.json();
    // return NextResponse.json(data)
    const { userId } = auth();

    if (!userId) {
        return NextResponse.json('unauthorized', { status: 401 });
    }

    const newJob = await prisma.job.create({
        data: {
            positionInColumn: 0,
            userId,
            ...data,
        },
    });
    //   console.log(data)
    console.log(newJob);
    return NextResponse.json(newJob);
};

const GET = async (req: NextRequest) => {
    const { userId } = auth();
    const res = await prisma.job.findMany({
        where: {
            userId: userId as string,
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
