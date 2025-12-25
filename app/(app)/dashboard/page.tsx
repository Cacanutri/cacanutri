import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) return null;

  const orgs = await prisma.organization.findMany({
    where: { ownerId: user.id },
    include: { projects: true }
  });

  const me = await prisma.user.findUnique({ where: { id: user.id } });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-display">Dashboard</h1>

      {!me?.termsAcceptedAt && (
        <Card>
          <h3 className="font-semibold">Termos</h3>
          <p className="text-sm text-black/60">Voc? precisa aceitar os termos para continuar.</p>
          <form action="/api/terms" method="post" className="mt-3">
            <button className="rounded-full bg-ink px-4 py-2 text-white text-sm">Aceitar termos</button>
          </form>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {orgs.map((org) => (
          <Card key={org.id}>
            <h3 className="text-lg font-semibold">{org.name}</h3>
            <div className="mt-4 space-y-3">
              {org.projects.map((p) => (
                <Link key={p.id} href={`/projects/${p.id}`} className="block rounded-xl border p-3">
                  <div className="flex items-center justify-between">
                    <span>{p.title}</span>
                    <Badge>{p.status}</Badge>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
