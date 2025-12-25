import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const orgName = String(form.get("orgName") || "");
  const projectTitle = String(form.get("projectTitle") || "");
  const category = String(form.get("category") || "OUTROS");
  const planCode = String(form.get("planCode") || "BASIC");

  const plan = await prisma.plan.findUnique({ where: { code: planCode as any } });
  if (!plan) return NextResponse.json({ error: "Plano invalido" }, { status: 400 });

  const org = await prisma.organization.create({
    data: { name: orgName || "Minha organizacao", ownerId: user.id }
  });

  await prisma.project.create({
    data: {
      organizationId: org.id,
      planId: plan.id,
      category: category as any,
      title: projectTitle || "Novo projeto"
    }
  });

  const invoice = await prisma.invoice.create({
    data: {
      organizationId: org.id,
      amountCents: plan.priceCents,
      status: "PENDING",
      provider: "mock",
      reference: `MOCK-${Date.now()}`
    }
  });

  return NextResponse.json({ ok: true, invoiceId: invoice.id });
}
