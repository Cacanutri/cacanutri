import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TicketReplyForm } from "@/components/tickets/TicketReplyForm";
import { canAccessProject } from "@/lib/permissions";
import { addBusinessHours } from "@/lib/sla";

export default async function TicketDetailPage({ params }: { params: { id: string } }) {
  const user = await getSessionUser();
  if (!user) return null;

  const ticket = await prisma.ticket.findUnique({
    where: { id: params.id },
    include: { messages: true, project: { include: { plan: true } } }
  });
  if (!ticket) return null;

  const allowed = await canAccessProject(user.id, user.role, ticket.projectId);
  if (!allowed) return null;

  const deadline = addBusinessHours(ticket.createdAt, ticket.project.plan.slaHours);

  function formatDate(date: Date) {
    return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short"
    }).format(date);
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-display">{ticket.subject}</h1>
        <div className="flex flex-wrap gap-2">
          <Badge>Status: {ticket.status}</Badge>
          <Badge>Prioridade: {ticket.priority}</Badge>
          <Badge>Plano: {ticket.project.plan.name}</Badge>
        </div>
      </div>
      <Card>
        <h3 className="font-semibold">Detalhes</h3>
        <div className="mt-3 text-sm text-black/70">
          <p>Projeto: {ticket.project.title}</p>
          <p>Abertura: {formatDate(ticket.createdAt)}</p>
          <p>Atualizacao: {formatDate(ticket.updatedAt)}</p>
          <p>Prazo estimado (SLA): {formatDate(deadline)}</p>
        </div>
      </Card>
      <Card>
        <h3 className="font-semibold">Mensagens</h3>
        <div className="mt-4 space-y-2">
          {ticket.messages.map((m) => (
            <div key={m.id} className="rounded-xl border p-3 text-sm">{m.message}</div>
          ))}
        </div>
      </Card>
      <Card>
        <h3 className="font-semibold">Responder</h3>
        <div className="mt-3">
          <TicketReplyForm ticketId={ticket.id} />
        </div>
      </Card>
    </div>
  );
}
