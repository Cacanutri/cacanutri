"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const [status, setStatus] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");
    const res = await signIn("credentials", { email, password, redirect: false });
    if (res?.ok) {
      window.location.href = "/dashboard";
      return;
    }
    setStatus("Login inv?lido.");
  }

  return (
    <Card>
      <h1 className="text-2xl font-display">Entrar</h1>
      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="text-sm">Email</label>
          <input name="email" type="email" className="mt-1 w-full rounded-xl border px-3 py-2" />
        </div>
        <div>
          <label className="text-sm">Senha</label>
          <input name="password" type="password" className="mt-1 w-full rounded-xl border px-3 py-2" />
        </div>
        <Button type="submit" className="w-full">Entrar</Button>
        {status && <p className="text-sm text-black/60">{status}</p>}
      </form>
    </Card>
  );
}
