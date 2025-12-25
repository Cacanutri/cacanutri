"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type Props = {
  projectId: string;
  category: string;
  initialData?: any;
  isDraft?: boolean;
};

export function OnboardingForm({ projectId, category, initialData, isDraft }: Props) {
  const [data, setData] = useState<any>(initialData || {});
  const [status, setStatus] = useState("");

  function update(key: string, value: any) {
    setData({ ...data, [key]: value });
  }

  async function saveDraft() {
    const res = await fetch(`/api/projects/${projectId}/intake`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data })
    });
    setStatus(res.ok ? "Rascunho salvo." : "Erro ao salvar.");
  }

  async function submit() {
    const res = await fetch(`/api/projects/${projectId}/intake`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data })
    });
    setStatus(res.ok ? "Onboarding enviado." : "Erro ao enviar.");
  }

  async function uploadFiles(files: FileList | null) {
    if (!files?.length) return;
    const form = new FormData();
    form.append("projectId", projectId);
    Array.from(files).forEach((file) => form.append("files", file));
    const res = await fetch("/api/upload", { method: "POST", body: form });
    setStatus(res.ok ? "Upload OK." : "Erro no upload.");
  }

  return (
    <Card className="space-y-4">
      <h2 className="text-xl font-display">Onboarding ({category})</h2>

      {category === "RESTAURANTE" && (
        <>
          <input placeholder="Endereco" className="w-full rounded-xl border px-3 py-2" onChange={(e) => update("endereco", e.target.value)} />
          <input placeholder="Whatsapp" className="w-full rounded-xl border px-3 py-2" onChange={(e) => update("whatsapp", e.target.value)} />
          <input placeholder="Instagram" className="w-full rounded-xl border px-3 py-2" onChange={(e) => update("instagram", e.target.value)} />
          <textarea placeholder="Cardapio (texto livre)" className="w-full rounded-xl border px-3 py-2" onChange={(e) => update("cardapio", e.target.value)} />
          <input placeholder="Link iFood/Delivery" className="w-full rounded-xl border px-3 py-2" onChange={(e) => update("ifood", e.target.value)} />
        </>
      )}

      {category === "OFICINA" && (
        <>
          <textarea placeholder="Servi?os principais" className="w-full rounded-xl border px-3 py-2" onChange={(e) => update("servicos", e.target.value)} />
          <input placeholder="Endereco" className="w-full rounded-xl border px-3 py-2" onChange={(e) => update("endereco", e.target.value)} />
          <input placeholder="Whatsapp" className="w-full rounded-xl border px-3 py-2" onChange={(e) => update("whatsapp", e.target.value)} />
        </>
      )}

      {category === "LOJA" && (
        <>
          <textarea placeholder="Categorias de produtos" className="w-full rounded-xl border px-3 py-2" onChange={(e) => update("categorias", e.target.value)} />
          <input placeholder="Endereco" className="w-full rounded-xl border px-3 py-2" onChange={(e) => update("endereco", e.target.value)} />
          <input placeholder="Whatsapp" className="w-full rounded-xl border px-3 py-2" onChange={(e) => update("whatsapp", e.target.value)} />
        </>
      )}

      <div>
        <label className="text-sm">Upload de fotos</label>
        <input type="file" multiple onChange={(e) => uploadFiles(e.target.files)} className="mt-2 block" />
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={saveDraft}>Salvar rascunho</Button>
        <Button onClick={submit}>Enviar onboarding</Button>
      </div>

      {status && <p className="text-sm text-black/60">{status}</p>}
      {isDraft === false && <p className="text-sm text-moss">Onboarding enviado</p>}
    </Card>
  );
}
