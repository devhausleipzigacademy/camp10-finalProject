import prisma from '@/utils/prismaClient';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { authHandler } from '@/lib/authHandler';

export const POST = async (req: NextRequest) => {
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

export const GET = authHandler(async ({ userId }) => {
    try {
        const jobs = await prisma.job.findMany({
            where: {
                userId,
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
                isArchived: 'asc',
            },
        });
        return NextResponse.json(jobs);
    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { message: 'Something went wrong in Prisma' },
            { status: 500 }
        );
    }
});
