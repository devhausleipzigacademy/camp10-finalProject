import { NextResponse } from 'next/server';
import prisma from '@/utils/prismaClient';
import { ColumnSchema } from '@/schema/column';
import { ZodError } from 'zod';
import { authHandler } from '@/lib/authHandler';

export const POST = authHandler(async ({ body }) => {
    try {
        const newColumn = await prisma.column.create({
            data: body,
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
}, ColumnSchema);

export const GET = authHandler(async ({ userId }) => {
    try {
        const columns = await prisma.column.findMany({
            where: {
                userId,
            },
            include: {
                jobs: {
                    where: {
                        isArchived: false,
                    },
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
    } catch (err) {
        return NextResponse.json(
            { message: 'Something went wrong in Prisma' },
            { status: 500 }
        );
    }
});
