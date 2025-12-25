import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk, Fraunces } from "next/font/google";

const bodyFont = Space_Grotesk({ subsets: ["latin"], variable: "--font-body" });
const displayFont = Fraunces({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "SiteOps",
  description: "SaaS para gerenciar sites est?ticos para estabelecimentos"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${bodyFont.variable} ${displayFont.variable} bg-fog text-ink`}>
        {children}
      </body>
    </html>
  );
}
