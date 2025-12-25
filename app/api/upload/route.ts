import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { saveUploadFile } from "@/lib/upload";
import { canAccessProject } from "@/lib/permissions";

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const projectId = String(form.get("projectId") || "");
  const files = form.getAll("files") as File[];

  if (!projectId || files.length === 0) return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });

  const allowed = await canAccessProject(user.id, user.role, projectId);
  if (!allowed) return NextResponse.json({ error: "Sem permissao" }, { status: 403 });

  const created = [];
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const { path, filename } = await saveUploadFile(Buffer.from(arrayBuffer), file.name);
    const asset = await prisma.asset.create({
      data: {
        projectId,
        type: file.type || "file",
        filename,
        path
      }
    });
    created.push(asset);
  }

  return NextResponse.json({ ok: true, assets: created });
}
