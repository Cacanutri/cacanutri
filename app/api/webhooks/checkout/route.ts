import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const invoiceId = body.invoiceId;
  if (!invoiceId) return NextResponse.json({ error: "invoiceId obrigatorio" }, { status: 400 });

  const invoice = await prisma.invoice.update({
    where: { id: invoiceId },
    data: { status: "PAID" }
  });

  return NextResponse.json({ ok: true, invoice });
}
