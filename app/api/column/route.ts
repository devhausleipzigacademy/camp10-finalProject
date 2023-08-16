import { Column, PrismaClient } from "@prisma/client";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
  const body = await req.json()
  console.log("NewCol:", body)
  const newColumn = await prisma.column.create({
    data: body
  });
  return NextResponse.json(newColumn);
};


export const GET = async (req: NextRequest) => {
  const userId = req.nextUrl.searchParams.get("userId") as string;
  const columns = await prisma.column.findMany({
    where: {
      userId: userId
    },
    include: {
      jobs: true
    }
  });

  return NextResponse.json(columns);
};