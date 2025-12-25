import fs from "fs/promises";
import path from "path";

export async function saveUploadFile(buffer: Buffer, filename: string) {
  const uploadDir = process.env.UPLOAD_DIR || "./uploads";
  await fs.mkdir(uploadDir, { recursive: true });
  const safeName = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
  const fullPath = path.join(uploadDir, safeName);
  await fs.writeFile(fullPath, buffer);
  return { path: fullPath, filename: safeName };
}
