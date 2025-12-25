import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validators";
import { hashPassword } from "@/lib/password";
import { logAudit } from "@/lib/audit";

export async function POST(req: Request) {
  const form = await req.formData();
  const data = registerSchema.safeParse({
    name: form.get("name"),
    email: form.get("email"),
    password: form.get("password")
  });
  if (!data.success) return NextResponse.json({ error: "Dados invalidos" }, { status: 400 });

  const exists = await prisma.user.findUnique({ where: { email: data.data.email } });
  if (exists) return NextResponse.json({ error: "Email ja usado" }, { status: 400 });

  const user = await prisma.user.create({
    data: {
      name: data.data.name,
      email: data.data.email,
      passwordHash: await hashPassword(data.data.password)
    }
  });

  await logAudit({ userId: user.id, action: "REGISTER", entityType: "User", entityId: user.id });
  return NextResponse.json({ ok: true });
}
