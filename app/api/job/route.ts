import prisma from '@/utils/prismaClient';
import { NextResponse } from 'next/server';
import { authHandler } from '@/lib/authHandler';
import { JobSchemaAPI } from '@/schema/job';
import { ZodError } from 'zod';
import { TagType } from '@/store/tags';

export const POST = authHandler(async ({ userId, body }) => {
    const tags = body.tag as TagType[];
    try {
        const newJob = await prisma.job.create({
            data: {
                ...body,
                deadline: new Date(body.deadline),
                userId,
                tag: {
                    connectOrCreate:
                        tags.length >= 0 &&
                        tags.map(tag => ({
                            create: {
                                name: tag.name,
                                userId,
                            },
                            where: {
                                id: tag.id,
                            },
                        })),
                },
            },
        });
        return NextResponse.json(newJob);
    } catch (err) {
        if (err instanceof ZodError) {
            return NextResponse.json(
                {
                    statusText: err.issues[0].message,
                },
                { status: 422 }
            );
        }
        return NextResponse.error();
    }
}, JobSchemaAPI);

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
        return NextResponse.json(
            { message: 'Something went wrong in Prisma' },
            { status: 500 }
        );
    }
});
