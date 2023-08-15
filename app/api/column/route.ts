import { Column, PrismaClient } from "@prisma/client";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest, { params }: Params) => {
  const columns = await prisma.column.findMany({
    where: {
      userId: params.userId
    },
    include: {
      jobs: true
    }
  });

  return NextResponse.json(columns);
};

