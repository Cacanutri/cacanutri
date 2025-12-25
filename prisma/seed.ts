import { PrismaClient, UserRole, PlanCode, ProjectCategory, ProjectStatus } from "@prisma/client";
import { hashPassword } from "../lib/password";

const prisma = new PrismaClient();

async function main() {
  await prisma.plan.upsert({
    where: { code: PlanCode.BASIC },
    update: {},
    create: { code: PlanCode.BASIC, name: "Basic", priceCents: 9900, slaHours: 48 }
  });

  const pro = await prisma.plan.upsert({
    where: { code: PlanCode.PRO },
    update: {},
    create: { code: PlanCode.PRO, name: "Pro", priceCents: 19900, slaHours: 24 }
  });

  await prisma.plan.upsert({
    where: { code: PlanCode.PREMIUM },
    update: {},
    create: { code: PlanCode.PREMIUM, name: "Premium", priceCents: 39900, slaHours: 12 }
  });

  const adminEmail = "admin@siteops.local";
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: "Admin SiteOps",
      email: adminEmail,
      passwordHash: await hashPassword("admin123"),
      role: UserRole.ADMIN
    }
  });

  const clientEmail = "cliente@siteops.local";
  const client = await prisma.user.upsert({
    where: { email: clientEmail },
    update: {},
    create: {
      name: "Cliente Demo",
      email: clientEmail,
      passwordHash: await hashPassword("cliente123"),
      role: UserRole.CLIENT
    }
  });

  const org = await prisma.organization.upsert({
    where: { id: "org-demo" },
    update: {},
    create: {
      id: "org-demo",
      name: "Restaurante Demo",
      ownerId: client.id
    }
  });

  await prisma.membership.upsert({
    where: { userId_organizationId: { userId: client.id, organizationId: org.id } },
    update: {},
    create: { userId: client.id, organizationId: org.id, roleInOrg: "OWNER" }
  });

  await prisma.project.upsert({
    where: { id: "proj-demo" },
    update: {},
    create: {
      id: "proj-demo",
      organizationId: org.id,
      category: ProjectCategory.RESTAURANTE,
      planId: pro.id,
      status: ProjectStatus.ONBOARDING,
      title: "Restaurante Demo"
    }
  });

  await prisma.invoice.upsert({
    where: { id: "inv-demo" },
    update: {},
    create: {
      id: "inv-demo",
      organizationId: org.id,
      amountCents: 19900,
      status: "PAID",
      provider: "mock",
      reference: "MOCK-DEMO"
    }
  });

  console.log("Seed OK");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
