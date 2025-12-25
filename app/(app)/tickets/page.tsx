import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import { Card } from "@/components/ui/Card";
import { NewTicketForm } from "@/components/tickets/NewTicketForm";

export default async function TicketsPage() {
  const user = await getSessionUser();
  if (!user) return null;

  const projects = await prisma.project.findMany({
    where: { organization: { ownerId: user.id } },
    include: { tickets: true }
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-display">Chamados</h1>
      {projects.map((project) => (
        <Card key={project.id}>
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <div className="mt-4 space-y-2">
            {project.tickets.map((t) => (
              <a key={t.id} href={`/tickets/${t.id}`} className="block rounded-xl border p-3 text-sm">
                {t.subject} - {t.status} ({t.priority})
              </a>
            ))}
          </div>
          <div className="mt-4">
            <NewTicketForm projectId={project.id} />
          </div>
        </Card>
      ))}
    </div>
  );
}
