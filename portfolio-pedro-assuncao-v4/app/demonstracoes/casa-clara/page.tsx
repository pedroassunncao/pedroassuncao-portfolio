import type { Metadata } from "next";
import CasaSite from "./casa-site";
import "./casa.css";

export const metadata: Metadata = {
  title: "Casa Clara — demonstração de site institucional",
  description:
    "Estudo de um site para interiores, criado por Pedro Assunção. Marca fictícia, ambientes ilustrativos e formulário demonstrativo.",
  alternates: { canonical: "/demonstracoes/casa-clara" },
  openGraph: {
    title: "Casa Clara — um projeto de Pedro Assunção",
    description:
      "Uma demonstração navegável de site institucional para interiores.",
    images: [{ url: "/projects/casa-desktop.png", width: 1440, height: 1000 }],
  },
  twitter: {
    title: "Casa Clara — um projeto de Pedro Assunção",
    description: "Site institucional conceitual para interiores.",
    images: ["/projects/casa-desktop.png"],
  },
};

export default function CasaPage() {
  return <CasaSite />;
}
