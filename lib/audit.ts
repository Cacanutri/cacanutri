import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function logAudit(params: {
  userId?: string;
  action: string;
  entityType?: string;
  entityId?: string;
  meta?: Prisma.InputJsonValue;
}) {
  return prisma.auditLog.create({
    data: {
      userId: params.userId,
      action: params.action,
      entityType: params.entityType,
      entityId: params.entityId,
      metaJson: params.meta ?? Prisma.JsonNull
    }
  });
}

