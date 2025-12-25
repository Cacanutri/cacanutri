import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/dashboard" className="text-xl font-semibold">SiteOps</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/tickets">Chamados</Link>
          <Link href="/checkout">Checkout</Link>
          <Link href="/admin">Admin</Link>
          <form action="/api/auth/signout" method="post">
            <Button variant="outline" type="submit">Sair</Button>
          </form>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-6 pb-16">{children}</main>
    </div>
  );
}
