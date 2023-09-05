import prisma from '@/utils/prismaClient';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { NextRequest, NextResponse } from 'next/server';
import { Column } from '@prisma/client';
import { auth } from '@clerk/nextjs';
import { authHandler } from '@/lib/authHandler';
import { ColumnSchemaPartial } from '@/schema/column';

export const PATCH = authHandler(async ({ params, body }) => {
    try {
        const updatedColumn = await prisma.column.update({
            where: {
                id: params.columnId,
            },
            data: body as Partial<Column>,
        });
        return NextResponse.json(updatedColumn);
    } catch (err) {
        return NextResponse.error();
    }
}, ColumnSchemaPartial);

export const DELETE = authHandler(async ({ params }) => {
    try {
        const deletedColumn = await prisma.column.delete({
            where: {
                id: params.columnId,
            },
        });

        return NextResponse.json(deletedColumn);
    } catch (err) {
        return NextResponse.json(
            { message: 'Failed to delete the column' },
            { status: 500 }
        );
    }
});
