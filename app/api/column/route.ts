import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prismaClient';
import { ColumnSchema } from '@/schema/column';

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    try {
        const col = ColumnSchema.parse(body);
        const newColumn = await prisma.column.create({
            data: col,
        });
        return NextResponse.json(newColumn);
    } catch (err) {
        console.log(err);
        return NextResponse.error();
    }
};

export const GET = async (req: NextRequest) => {
    const userId = req.nextUrl.searchParams.get('userId') as string;
    const columns = await prisma.column.findMany({
        where: {
            userId: userId,
        },
        include: {
            jobs: {
                orderBy: {
                    positionInColumn: 'asc',
                }
            }
        },
        orderBy: {
            positionInBoard: 'asc',
        }
    });

    return NextResponse.json(columns);
};