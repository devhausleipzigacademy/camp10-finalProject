import prisma from '@/utils/prismaClient';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { NextRequest, NextResponse } from 'next/server';
import { Job } from '@prisma/client';
import { authHandler } from '@/lib/authHandler';

// TODO: add data validation & error handling if needed
export const PATCH = async (req: NextRequest, { params }: Params) => {
    const data = await req.json();
    console.log('bodydata', data);
    console.log('params', params);
    const updatedJob = await prisma.job.update({
        where: {
            id: params.jobId,
        },
        data: {
            title: data.title,
            description: data.description,
            companyName: data.companyName,
            companyWebsite: data.companyWebsite,
            url: data.url,
            remoteType: data.remoteType,
            priority: data.priority,
            columnId: data.columnId,
            deadline: new Date(data.deadline),
        },
    });
    console.log(updatedJob);

    return NextResponse.json(updatedJob);
};

export const DELETE = authHandler(async ({ params }) => {
    console.log('in delete', params.jobId);
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
