"use client";

import { Button } from "@/components/ui/Button";
import { useState } from "react";

export function NewTicketForm({ projectId }: { projectId: string }) {
  const [status, setStatus] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    form.append("projectId", projectId);
    const res = await fetch("/api/tickets", { method: "POST", body: form });
    setStatus(res.ok ? "Chamado criado." : "Erro ao abrir chamado.");
  }

  return (
    <form className="space-y-3" onSubmit={onSubmit}>
      <input name="subject" placeholder="Assunto" className="w-full rounded-xl border px-3 py-2" />
      <select name="priority" className="w-full rounded-xl border px-3 py-2">
        <option value="BAIXA">Baixa</option>
        <option value="MEDIA">Media</option>
        <option value="ALTA">Alta</option>
      </select>
      <Button type="submit">Abrir chamado</Button>
      {status && <p className="text-sm text-black/60">{status}</p>}
    </form>
  );
}
