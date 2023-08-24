import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prismaClient';
import { ColumnSchema } from '@/schema/column';
import { ZodError } from 'zod';
import { auth } from '@clerk/nextjs';

// TODO: can we use middleware to validate user 

export const POST = async (req: NextRequest) => {
    const { userId } = auth();
    if (!userId) {
        return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();

    try {
        const col = ColumnSchema.parse({ ...body, userId });
        const newColumn = await prisma.column.create({
            data: col,
        });
        return NextResponse.json(newColumn, { status: 201 });
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
};

export const GET = async (req: NextRequest) => {
    const { userId } = auth();
    console.log(userId);
    if (!userId) {
        return new Response('Unauthorized', { status: 401 });
    }

    const columns = await prisma.column.findMany({
        where: {
            userId,
        },
        include: {
            jobs: {
                orderBy: {
                    positionInColumn: 'asc',
                },
            },
        },
        orderBy: {
            positionInBoard: 'asc',
        },
    });

    return NextResponse.json(columns);
};
