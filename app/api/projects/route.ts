import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import { projectSchema } from "@/lib/validators";
import { logAudit } from "@/lib/audit";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const projects = await prisma.project.findMany({
    where: { organization: { ownerId: user.id } }
  });
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const data = projectSchema.safeParse(body);
  if (!data.success) return NextResponse.json({ error: "Dados invalidos" }, { status: 400 });

  const project = await prisma.project.create({
    data: {
      organizationId: data.data.organizationId,
      planId: data.data.planId,
      category: data.data.category as any,
      title: data.data.title
    }
  });

  await logAudit({ userId: user.id, action: "CREATE_PROJECT", entityType: "Project", entityId: project.id });
  return NextResponse.json(project);
}
