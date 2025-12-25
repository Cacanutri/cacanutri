import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import { organizationSchema } from "@/lib/validators";
import { logAudit } from "@/lib/audit";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const orgs = await prisma.organization.findMany({ where: { ownerId: user.id } });
  return NextResponse.json(orgs);
}

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const data = organizationSchema.safeParse(body);
  if (!data.success) return NextResponse.json({ error: "Dados invalidos" }, { status: 400 });

  const org = await prisma.organization.create({
    data: { name: data.data.name, ownerId: user.id }
  });

  await logAudit({ userId: user.id, action: "CREATE_ORG", entityType: "Organization", entityId: org.id });
  return NextResponse.json(org);
}
