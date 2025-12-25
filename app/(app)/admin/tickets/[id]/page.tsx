import { prisma } from "@/lib/prisma";
import { getSessionUser, isAdminOrStaff } from "@/lib/auth";
import { Card } from "@/components/ui/Card";
import { TicketReplyForm } from "@/components/tickets/TicketReplyForm";

export default async function AdminTicketDetail({ params }: { params: { id: string } }) {
  const user = await getSessionUser();
  if (!user || !isAdminOrStaff(user.role)) return null;

  const ticket = await prisma.ticket.findUnique({
    where: { id: params.id },
    include: { messages: true }
  });
  if (!ticket) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display">{ticket.subject}</h1>
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
