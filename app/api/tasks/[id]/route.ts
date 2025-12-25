import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser, isAdminOrStaff } from "@/lib/auth";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isAdminOrStaff(user.role)) return NextResponse.json({ error: "Sem permissao" }, { status: 403 });

  const body = await req.json();
  const task = await prisma.task.update({ where: { id: params.id }, data: body });
  return NextResponse.json(task);
}
