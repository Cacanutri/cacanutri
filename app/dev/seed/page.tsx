"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function SeedPage() {
  const [status, setStatus] = useState("");

  async function runSeed() {
    const res = await fetch("/api/dev/seed", { method: "POST" });
    setStatus(res.ok ? "Seed executado." : "Falha no seed.");
  }

  return (
    <Card>
      <h1 className="text-2xl font-display">Seed manual</h1>
      <Button onClick={runSeed}>Executar seed</Button>
      {status && <p className="text-sm text-black/60">{status}</p>}
    </Card>
  );
}
