import prisma from '@/utils/prismaClient';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { NextRequest, NextResponse } from 'next/server';
import { Job } from '@prisma/client';


export const PATCH = async (req: NextRequest, { params }: Params) => {
  const data = await req.json();
  const updatedJob = await prisma.job.update({
      where: {
          id: params.jobId,
      },
      data: data as Partial<Job>,
  });
  return NextResponse.json(updatedJob);
}