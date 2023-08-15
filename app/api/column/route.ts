import { PrismaClient } from "@prisma/client";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest, { params }: Params) => {
  const columns = await prisma.column.findMany({
    // select: {
    //   jobs: {
    //     select: {
    //       title: true,
    //       companyName: true,
    //     }
    //   }
    // },
    where: {
      userId: params.userId
    }
  });

  return NextResponse.json(columns);
};