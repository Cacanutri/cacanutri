import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type RouteContext = {
  params: Promise<{ id: string }>;
};

// GET /api/projects/[id]/intake
export async function GET(
  req: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params;

  const intake = await prisma.intake.findFirst({
    where: { projectId: id },
  });

  if (!intake) {
    return NextResponse.json(
      { error: "Intake não encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(intake);
}

// POST /api/projects/[id]/intake
export async function POST(
  req: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params;

  const body = await req.json();

  const intake = await prisma.intake.upsert({
    where: {
      projectId: id,
    },
    update: {
      dataJson: body.dataJson as Prisma.InputJsonValue,
      isDraft: body.isDraft ?? true,
      submittedAt: body.isDraft ? null : new Date(),
    },
    create: {
      projectId: id,
      dataJson: body.dataJson as Prisma.InputJsonValue,
      isDraft: body.isDraft ?? true,
      submittedAt: body.isDraft ? null : new Date(),
    },
  });

  return NextResponse.json(intake, { status: 201 });
}
