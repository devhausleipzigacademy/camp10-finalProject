import prisma from '@/utils/prismaClient';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { NextRequest, NextResponse } from 'next/server';
import { authHandler } from '@/lib/authHandler';
import { auth } from '@clerk/nextjs';
import { TagType } from '@/store/tags';
import { getJob } from '@/lib/getJob';

// TODO: add data validation & error handling if needed
export const PATCH = async (req: NextRequest, { params }: Params) => {
    const { userId } = auth();
    if (!userId) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const { currentStage, tag: tags, ...dataWithoutCol } = await req.json();
    console.log('in patch', tags);
    const updatedJob = await prisma.job.update({
        where: {
            id: params.jobId,
        },
        data: {
            ...dataWithoutCol,
            tag: {
                set: tags.map((tag: TagType) => ({
                    id: tag.id,
                    name: tag.name,
                })),
            },
        },
    });
    return NextResponse.json(updatedJob);
};

export const DELETE = authHandler(async ({ params }) => {
    try {
        const deletedJob = await prisma.job.delete({
            where: {
                id: params.jobId,
            },
        });

        return NextResponse.json(deletedJob);
    } catch (err) {
        console.log('Delete Job Error:', err);
        return NextResponse.json(
            { message: 'Failed to delete the job' },
            { status: 500 }
        );
    }
});

export const GET = async (req: NextRequest, { params }: Params) => {
    try {
        const job = await getJob(params.jobId);
        return NextResponse.json(job);
    } catch (err) {
        return NextResponse.json(
            { message: 'Failed to get the job' },
            { status: 500 }
        );
    } 
}