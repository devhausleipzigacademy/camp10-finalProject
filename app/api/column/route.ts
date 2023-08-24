import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prismaClient';
import { ColumnSchema } from '@/schema/column';
import { ZodError } from 'zod';
import { auth } from '@clerk/nextjs';
import { authHandler } from '@/lib/authHandler';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const POST = authHandler(async ({ req, userId, body }) => {
    try {
        const newColumn = await prisma.column.create({
            data: { ...body, userId },
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
        console.log(err);
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
        console.log(err);
        return NextResponse.json(
            { message: 'Something went wrong in Prisma' },
            { status: 500 }
        );
    }
});

// export const GET = async (req: NextRequest) => {
//     const { userId } = auth();
//     console.log(userId);
//     if (!userId) {
//         return new Response('Unauthorized', { status: 401 });
//     }

//     const columns = await prisma.column.findMany({
//         where: {
//             userId,
//         },
//         include: {
//             jobs: {
//                 orderBy: {
//                     positionInColumn: 'asc',
//                 },
//             },
//         },
//         orderBy: {
//             positionInBoard: 'asc',
//         },
//     });

//     return NextResponse.json(columns);
// };
