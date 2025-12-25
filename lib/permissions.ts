import { prisma } from "./prisma";
import { UserRole } from "@prisma/client";

export async function canAccessProject(userId: string, role: UserRole, projectId: string) {
  if (role === "ADMIN" || role === "STAFF") return true;
  const project = await prisma.project.findFirst({
    where: { id: projectId, organization: { ownerId: userId } },
    select: { id: true }
  });
  return !!project;
}
