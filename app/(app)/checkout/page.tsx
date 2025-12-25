"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function CheckoutPage() {
  const [status, setStatus] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/checkout", { method: "POST", body: form });
    if (!res.ok) {
      setStatus("Falha no checkout.");
      return;
    }
    const data = await res.json();
    setStatus(`Checkout criado. Use o webhook mock com invoice ${data.invoiceId}.`);
  }

  return (
    <Card>
      <h1 className="text-2xl font-display">Checkout Mock</h1>
      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="text-sm">Nome da organiza??o</label>
          <input name="orgName" className="mt-1 w-full rounded-xl border px-3 py-2" />
        </div>
        <div>
          <label className="text-sm">T?tulo do projeto</label>
          <input name="projectTitle" className="mt-1 w-full rounded-xl border px-3 py-2" />
        </div>
        <div>
          <label className="text-sm">Categoria</label>
          <select name="category" className="mt-1 w-full rounded-xl border px-3 py-2">
            <option value="RESTAURANTE">Restaurante</option>
            <option value="OFICINA">Oficina</option>
            <option value="LOJA">Loja</option>
            <option value="SERVICOS">Servi?os</option>
            <option value="OUTROS">Outros</option>
          </select>
        </div>
        <div>
          <label className="text-sm">Plano</label>
          <select name="planCode" className="mt-1 w-full rounded-xl border px-3 py-2">
            <option value="BASIC">Basic</option>
            <option value="PRO">Pro</option>
            <option value="PREMIUM">Premium</option>
          </select>
        </div>
        <Button type="submit">Pagar (mock)</Button>
      </form>
      {status && <p className="mt-4 text-sm text-black/60">{status}</p>}
    </Card>
  );
}
