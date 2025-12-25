import { NextResponse } from "next/server";
import { execSync } from "node:child_process";

export async function POST() {
  execSync("npx prisma db seed", { stdio: "inherit" });
  return NextResponse.json({ ok: true });
}
