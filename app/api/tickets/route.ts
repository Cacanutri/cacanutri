import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import { ticketSchema } from "@/lib/validators";
import { logAudit } from "@/lib/audit";
import { canAccessProject } from "@/lib/permissions";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const tickets = await prisma.ticket.findMany({
    where: { project: { organization: { ownerId: user.id } } }
  });
  return NextResponse.json(tickets);
}

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const data = ticketSchema.safeParse({
    projectId: form.get("projectId"),
    subject: form.get("subject"),
    priority: form.get("priority")
  });
  if (!data.success) return NextResponse.json({ error: "Dados invalidos" }, { status: 400 });

  const allowed = await canAccessProject(user.id, user.role, data.data.projectId);
  if (!allowed) return NextResponse.json({ error: "Sem permissao" }, { status: 403 });

  const ticket = await prisma.ticket.create({
    data: {
      projectId: data.data.projectId,
      createdById: user.id,
      subject: data.data.subject,
      priority: data.data.priority || "MEDIA"
    }
  });

  await logAudit({ userId: user.id, action: "CREATE_TICKET", entityType: "Ticket", entityId: ticket.id });
  return NextResponse.json(ticket);
}
