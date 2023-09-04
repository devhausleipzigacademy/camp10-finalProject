import { authHandler } from "@/lib/authHandler";
import { NextResponse } from "next/server";
import prisma from '@/utils/prismaClient';


export const DELETE = authHandler(async ({ params }) => {
  console.log('in delete', params.tagId);
  try {
      const deletedJob = await prisma.job.delete({
          where: {
              id: params.tagId,
          },
      });

      return NextResponse.json(deletedJob);
  } catch (err) {
      console.log('Delete Job Error:', err);
      return NextResponse.json(
          { message: 'Failed to delete the job' },
          { status: 500 }
      );
  }
});