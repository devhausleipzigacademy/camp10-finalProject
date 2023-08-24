import prisma from '@/utils/prismaClient';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { NextRequest, NextResponse } from 'next/server';
import { Column } from '@prisma/client';
import { auth } from '@clerk/nextjs';
import { authHandler } from '@/lib/authHandler';
import { ColumnSchemaPartial } from '@/schema/column';

export const PATCH = authHandler(async ({ params, body }) => {
    console.log(body);
    try {
        const updatedColumn = await prisma.column.update({
            where: {
                id: params.columnId,
            },
            data: body as Partial<Column>,
        });
        return NextResponse.json(updatedColumn);
    } catch (err) {
        console.log('Patch column Error:', err);
        return NextResponse.error();
    }
}, ColumnSchemaPartial);

export const DELETE = authHandler(async ({ params }) => {
    console.log('in delete', params.columnId);
    try {
        const deletedColumn = await prisma.column.delete({
            where: {
                id: params.columnId,
            },
        });

        return NextResponse.json(deletedColumn);
    } catch (err) {
        console.log('Delete column Error:', err);
        return NextResponse.json(
            { message: 'Failed to delete the column' },
            { status: 500 }
        );
    }
});
