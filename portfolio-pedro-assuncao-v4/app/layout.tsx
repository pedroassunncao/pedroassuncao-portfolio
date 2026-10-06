import type { Metadata } from "next";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  alternates: { canonical: "/" },
  title: {
    default: "Pedro Assunção | Sites para profissionais e pequenos negócios",
    template: "%s | Pedro Assunção",
  },
  description:
    "Sites, landing pages e redesign para apresentar seu negócio. Conheça os projetos de Pedro Assunção e peça um orçamento pelo WhatsApp.",
  authors: [{ name: "Pedro Assunção" }],
  creator: "Pedro Assunção",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "Pedro Assunção | Criação de sites",
    description:
      "Seu próximo cliente precisa encontrar você. Sites para profissionais e pequenos negócios.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Pedro Assunção — Criação de sites para profissionais e pequenos negócios",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pedro Assunção | Criação de sites",
    description:
      "Sites para apresentar seu negócio e facilitar o contato. Peça seu orçamento pelo WhatsApp.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          rel="preload"
          href="/fonts/dm-sans-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/manrope-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
