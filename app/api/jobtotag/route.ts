import { TagSchema } from '@/schema/tag';
import prisma from '@/utils/prismaClient';
import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    const { userId } = auth();
    if (!userId) {
        return NextResponse.json(
            { message: 'Unauthorized' },
            { status: 401 }
        );
    }
    
    try {
        const data = await req.json();
        const parsedData = TagSchema.parse(data);
        console.log('Req data:', parsedData);

        const res = await prisma.jobToTag.createMany({
            data: parsedData,
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
