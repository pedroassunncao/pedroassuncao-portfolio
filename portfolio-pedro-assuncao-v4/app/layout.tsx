import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Pedro Assunção | Frontend e segurança web",
    template: "%s | Pedro Assunção",
  },
  description:
    "Portfólio de Pedro Assunção: interfaces responsivas, acessibilidade, performance e segurança de aplicações web.",
  authors: [{ name: "Pedro Assunção" }],
  creator: "Pedro Assunção",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "Pedro Assunção | Frontend e segurança web",
    description: "Interfaces claras, código responsável e atenção à segurança em cada etapa do projeto.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Pedro Assunção — Frontend e segurança web" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pedro Assunção | Frontend e segurança web",
    description: "Interfaces claras, código responsável e atenção à segurança em cada etapa do projeto.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
