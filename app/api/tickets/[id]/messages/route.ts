import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import { canAccessProject } from "@/lib/permissions";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const ticket = await prisma.ticket.findUnique({ where: { id }, select: { projectId: true } });
  if (!ticket) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const allowed = await canAccessProject(user.id, user.role, ticket.projectId);
  if (!allowed) return NextResponse.json({ error: "Sem permissao" }, { status: 403 });

  const body = await req.json();
  const msg = await prisma.ticketMessage.create({
    data: {
      ticketId: id,
      authorId: user.id,
      message: body.message
    }
  });
  return NextResponse.json(msg);
}
