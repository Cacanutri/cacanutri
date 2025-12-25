import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" className="text-xl font-semibold">SiteOps</Link>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm">Entrar</Link>
          <Link href="/register">
            <Button>Come?ar</Button>
          </Link>
        </div>
      </header>
      <main>{children}</main>
      <footer className="mx-auto max-w-6xl px-6 py-10 text-sm text-black/60">
        SiteOps 2024. Todos os direitos reservados.
      </footer>
    </div>
  );
}
