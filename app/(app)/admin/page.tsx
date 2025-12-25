import { prisma } from "@/lib/prisma";
import { getSessionUser, isAdminOrStaff } from "@/lib/auth";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

export default async function AdminPage() {
  const user = await getSessionUser();
  if (!user || !isAdminOrStaff(user.role)) return null;

  const projectCount = await prisma.project.count();
  const ticketsOpen = await prisma.ticket.count({ where: { status: "ABERTO" } });

  const projects = await prisma.project.findMany({ take: 6, orderBy: { createdAt: "desc" } });
  const tickets = await prisma.ticket.findMany({ take: 6, orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-display">Admin</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>Projetos: {projectCount}</Card>
        <Card>Chamados abertos: {ticketsOpen}</Card>
      </div>

      <Card>
        <h3 className="font-semibold">Fila de projetos</h3>
        <div className="mt-4 space-y-2">
          {projects.map((p) => (
            <Link key={p.id} href={`/admin/projects/${p.id}`} className="block rounded-xl border p-3">
              {p.title} - {p.status}
            </Link>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold">Fila de chamados</h3>
        <div className="mt-4 space-y-2">
          {tickets.map((t) => (
            <Link key={t.id} href={`/admin/tickets/${t.id}`} className="block rounded-xl border p-3">
              {t.subject} - {t.status}
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
