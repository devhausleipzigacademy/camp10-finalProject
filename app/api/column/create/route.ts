import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
  const body = await req.json()
  const newColumn = await prisma.column.create({
    data: body
  });
  return NextResponse.json(newColumn);
};