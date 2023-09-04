import prisma from "@/utils/prismaClient";
import { auth } from "@clerk/nextjs";

export async function getJob(jobId: string) {
  const { userId } = auth();

  if (!userId) throw new Error('Unauthorized');

  const singleJob = await prisma.job.findUnique({
      where: {
          id: jobId,
          userId: userId,
      },
      include: {
          column: {
              select: {
                  color: true,
                  title: true,
              },
          },
          tag: {
              select: {
                  id: true,
                  name: true,
              }
          }
      },
  });
  return singleJob;
}