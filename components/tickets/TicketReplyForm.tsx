"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function TicketReplyForm({ ticketId }: { ticketId: string }) {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch(`/api/tickets/${ticketId}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });
    if (res.ok) {
      setStatus("Resposta enviada.");
      setMessage("");
      return;
    }
    setStatus("Erro ao responder.");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <textarea
        className="w-full rounded-xl border px-3 py-2"
        placeholder="Escreva sua resposta"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button type="submit">Responder</Button>
      {status && <p className="text-sm text-black/60">{status}</p>}
    </form>
  );
}
