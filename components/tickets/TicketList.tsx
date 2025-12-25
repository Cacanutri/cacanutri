import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

export function TicketList({ tickets }: { tickets: any[] }) {
  return (
    <div className="space-y-3">
      {tickets.map((t) => (
        <Link key={t.id} href={`/admin/tickets/${t.id}`} className="block rounded-xl border p-3">
          <div className="flex items-center justify-between">
            <span>{t.subject}</span>
            <Badge>{t.status}</Badge>
          </div>
        </Link>
      ))}
    </div>
  );
}
