import prisma from '@/utils/prismaClient';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { authHandler } from '@/lib/authHandler';
import { JobSchemaAPI } from '@/schema/job';
import { ZodError } from 'zod';

export const POST = authHandler(async ({ userId, body }) => {
    try {
        const response = await prisma.jobToTag.createMany({
            data: body
        })
        console.log(response);
        return NextResponse.json(response);
    } catch (err) {
        console.log(err);
        return NextResponse.error();
    }
}, JobSchemaAPI);