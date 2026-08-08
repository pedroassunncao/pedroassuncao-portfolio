import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pedro Assunção | Frontend & Cybersecurity",
  description:
    "Portfólio de Pedro Assunção — desenvolvimento frontend, interfaces web e cibersegurança.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
