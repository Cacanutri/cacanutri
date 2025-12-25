import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function LandingPage() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <section className="grid gap-10 py-16 md:grid-cols-2">
        <div>
          <p className="text-sm uppercase tracking-widest text-black/60">SiteOps</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-display">
            Gerencie a cria??o de sites est?ticos com controle total
          </h1>
          <p className="mt-4 text-black/70">
            Onboarding inteligente por categoria, tarefas, chamados e painel administrativo.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/register"><Button>Come?ar</Button></Link>
            <Link href="/login"><Button variant="outline">Entrar</Button></Link>
          </div>
        </div>
        <Card className="bg-gradient-to-br from-white to-fog">
          <h3 className="text-lg font-semibold">O que voc? ganha</h3>
          <ul className="mt-4 space-y-2 text-sm text-black/70">
            <li>- Fluxo completo do briefing ao publicado</li>
            <li>- SLA por plano e prazos estimados</li>
            <li>- Central de chamados profissional</li>
          </ul>
        </Card>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <Card>
          <h4 className="font-semibold">Basic</h4>
          <p className="text-sm text-black/60">SLA 48h ?teis</p>
          <p className="mt-4 text-2xl">R$ 99</p>
        </Card>
        <Card>
          <h4 className="font-semibold">Pro</h4>
          <p className="text-sm text-black/60">SLA 24h ?teis</p>
          <p className="mt-4 text-2xl">R$ 199</p>
        </Card>
        <Card>
          <h4 className="font-semibold">Premium</h4>
          <p className="text-sm text-black/60">SLA 12h ?teis</p>
          <p className="mt-4 text-2xl">R$ 399</p>
        </Card>
      </section>

      <section className="py-16">
        <h3 className="text-2xl font-display">FAQ</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Card>Posso criar mais de um projeto? Sim, sem limite.</Card>
          <Card>Como funciona o onboarding? Por categoria e etapas.</Card>
        </div>
      </section>
    </div>
  );
}
