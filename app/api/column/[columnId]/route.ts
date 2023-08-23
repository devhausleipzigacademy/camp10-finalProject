import prisma from '@/utils/prismaClient';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { NextRequest, NextResponse } from 'next/server';
import { Column } from '@prisma/client';
import { auth } from '@clerk/nextjs';

// TODO: add data validation & error handling
export const GET = async (req: NextRequest, { params }: Params) => {
    console.log(params.columnId);

    const deletedColumn = await prisma.column.findUnique({
        where: {
            id: params.columnId,
        },
    });

    return NextResponse.json(deletedColumn);
};

export const PATCH = async (req: NextRequest, { params }: Params) => {
    const { userId } = auth();
    if (!userId) {
        return new Response('Unauthorized', { status: 401 });
    }

    try {
        const data = await req.json();
        const updatedColumn = await prisma.column.update({
            where: {
                id: params.columnId,
            },
            data: data as Partial<Column>,
        });
        // console.log(data)
        return NextResponse.json(updatedColumn);
    } catch (err) {
        console.log("Patch column Error:", err);
        return NextResponse.error();
    }
};

export const DELETE = async (req: NextRequest, { params }: Params) => {
    const { userId } = auth();
    if (!userId) {
        return new Response('Unauthorized', { status: 401 });
    }

    // console.log(params.columnId);
    const deletedColumn = await prisma.column.delete({
        where: {
            id: params.columnId,
        },
    });

    return NextResponse.json(deletedColumn);
};
