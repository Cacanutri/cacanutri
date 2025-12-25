import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { canAccessProject } from "@/lib/permissions";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const allowed = await canAccessProject(user.id, user.role, params.id);
  if (!allowed) return NextResponse.json({ error: "Sem permissao" }, { status: 403 });

  const intake = await prisma.intake.findUnique({ where: { projectId: params.id } });
  return NextResponse.json(intake);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const allowed = await canAccessProject(user.id, user.role, params.id);
  if (!allowed) return NextResponse.json({ error: "Sem permissao" }, { status: 403 });

  const me = await prisma.user.findUnique({ where: { id: user.id } });
  if (!me?.termsAcceptedAt) return NextResponse.json({ error: "Aceite os termos" }, { status: 403 });

  const body = await req.json();
  const intake = await prisma.intake.upsert({
    where: { projectId: params.id },
    update: { dataJson: body.data, isDraft: true },
    create: { projectId: params.id, dataJson: body.data, isDraft: true }
  });

  await logAudit({ userId: user.id, action: "SAVE_INTAKE_DRAFT", entityType: "Intake", entityId: intake.id });
  return NextResponse.json(intake);
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const allowed = await canAccessProject(user.id, user.role, params.id);
  if (!allowed) return NextResponse.json({ error: "Sem permissao" }, { status: 403 });

  const me = await prisma.user.findUnique({ where: { id: user.id } });
  if (!me?.termsAcceptedAt) return NextResponse.json({ error: "Aceite os termos" }, { status: 403 });

  const body = await req.json();
  const intake = await prisma.intake.upsert({
    where: { projectId: params.id },
    update: { dataJson: body.data, isDraft: false, submittedAt: new Date() },
    create: { projectId: params.id, dataJson: body.data, isDraft: false, submittedAt: new Date() }
  });

  await logAudit({ userId: user.id, action: "SUBMIT_INTAKE", entityType: "Intake", entityId: intake.id });
  return NextResponse.json(intake);
}
