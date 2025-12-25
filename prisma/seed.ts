import {
  PrismaClient,
  UserRole,
  OrgRole,
  InvoiceStatus,
  ProjectCategory,
  ProjectStatus,
} from "@prisma/client";
import { hashPassword } from "../lib/password";

const prisma = new PrismaClient();

async function main() {
  // Plans (Plan.code é String no schema)
  await prisma.plan.upsert({
    where: { code: "BASIC" },
    update: {},
    create: { code: "BASIC", name: "Basic", priceCents: 9900, slaHours: 48 },
  });

  const pro = await prisma.plan.upsert({
    where: { code: "PRO" },
    update: {},
    create: { code: "PRO", name: "Pro", priceCents: 19900, slaHours: 24 },
  });

  await prisma.plan.upsert({
    where: { code: "PREMIUM" },
    update: {},
    create: { code: "PREMIUM", name: "Premium", priceCents: 39900, slaHours: 12 },
  });

  // Admin
  const adminEmail = "admin@siteops.local";
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name: "Admin SiteOps",
      role: UserRole.ADMIN,
    },
    create: {
      name: "Admin SiteOps",
      email: adminEmail,
      passwordHash: await hashPassword("admin123"),
      role: UserRole.ADMIN,
    },
  });

  // Cliente demo
  const clientEmail = "cliente@siteops.local";
  const client = await prisma.user.upsert({
    where: { email: clientEmail },
    update: {
      name: "Cliente Demo",
      role: UserRole.CLIENT,
    },
    create: {
      name: "Cliente Demo",
      email: clientEmail,
      passwordHash: await hashPassword("cliente123"),
      role: UserRole.CLIENT,
    },
  });

  // Org demo
  const org = await prisma.organization.upsert({
    where: { id: "org-demo" },
    update: {
      name: "Restaurante Demo",
      ownerId: client.id,
    },
    create: {
      id: "org-demo",
      name: "Restaurante Demo",
      ownerId: client.id,
    },
  });

  // Membership
  await prisma.membership.upsert({
    where: { userId_organizationId: { userId: client.id, organizationId: org.id } },
    update: { roleInOrg: OrgRole.OWNER },
    create: { userId: client.id, organizationId: org.id, roleInOrg: OrgRole.OWNER },
  });

  // Project demo
  await prisma.project.upsert({
    where: { id: "proj-demo" },
    update: {
      category: ProjectCategory.RESTAURANTE,
      planId: pro.id,
      status: ProjectStatus.ONBOARDING,
      title: "Restaurante Demo",
    },
    create: {
      id: "proj-demo",
      organizationId: org.id,
      category: ProjectCategory.RESTAURANTE,
      planId: pro.id,
      status: ProjectStatus.ONBOARDING,
      title: "Restaurante Demo",
    },
  });

  // Invoice demo
  await prisma.invoice.upsert({
    where: { id: "inv-demo" },
    update: {
      amountCents: 19900,
      status: InvoiceStatus.PAID,
      provider: "MOCK",
      reference: "MOCK-DEMO",
    },
    create: {
      id: "inv-demo",
      organizationId: org.id,
      amountCents: 19900,
      status: InvoiceStatus.PAID,
      provider: "MOCK",
      reference: "MOCK-DEMO",
    },
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
