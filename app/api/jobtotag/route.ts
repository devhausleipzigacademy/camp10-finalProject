import prisma from '@/utils/prismaClient';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    try {
        const data = await req.json();
        console.log('Req data:', data);

        const res = await prisma.jobToTag.createMany({
            data: data,
            skipDuplicates: true,
        });

        return NextResponse.json(res);
    } catch (err) {
        console.log('Add JobToTag Error:', err);
        return NextResponse.json(
            { message: 'Failed to add the jobToTag' },
            { status: 500 }
        );
    }
};
