import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prismaClient';
import { auth } from '@clerk/nextjs';

export const GET = async (req: NextRequest) => {
    const { userId } = auth();

    if (!userId) {
        return NextResponse.json('You are not authorized. Are you logged in?', {
            status: 401,
        });
    }

    const tags = await prisma.tag.findMany({
        where: {
            userId: userId,
        },
        select: {
            id: true,
            name: true,
        },
    });
    return NextResponse.json(tags);
};

export const POST = async (req: NextRequest) => {
    const { userId } = auth();

    if (!userId) {
        return NextResponse.json('You are not authorized. Are you logged in?', {
            status: 401,
        });
    }

    const data = await req.json();

    const tag = await prisma.tag.create({
        data: { ...data, userId },
    });

    return NextResponse.json(tag);
};
