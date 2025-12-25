import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import { canAccessProject } from "@/lib/permissions";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const allowed = await canAccessProject(user.id, user.role, params.id);
  if (!allowed) return NextResponse.json({ error: "Sem permissao" }, { status: 403 });

  const project = await prisma.project.findUnique({ where: { id: params.id } });
  return NextResponse.json(project);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const allowed = await canAccessProject(user.id, user.role, params.id);
  if (!allowed) return NextResponse.json({ error: "Sem permissao" }, { status: 403 });

  const body = await req.json();
  const project = await prisma.project.update({ where: { id: params.id }, data: body });
  return NextResponse.json(project);
}
