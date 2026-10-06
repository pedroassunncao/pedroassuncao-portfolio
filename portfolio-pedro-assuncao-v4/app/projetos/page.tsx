import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { projects } from "@/lib/site";
import { PortfolioShowcase } from "@/components/portfolio-showcase";

export const metadata: Metadata = {
  title: "Portfólio",
  alternates: { canonical: "/projetos" },
  description:
    "Conheça os projetos de Pedro Assunção: landing pages e interfaces para apresentar serviços e organizar informações.",
  openGraph: {
    title: "Portfólio | Pedro Assunção",
    description: "Conheça as ideias e escolhas por trás dos projetos.",
    images: [
      { url: "/projects/capilar-desktop.png", width: 1440, height: 1000 },
    ],
  },
  twitter: {
    title: "Portfólio | Pedro Assunção",
    description: "Conheça os projetos de Pedro Assunção.",
    images: ["/projects/capilar-desktop.png"],
  },
};

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: Promise<{ projeto?: string }>;
}) {
  const requested = (await searchParams).projeto;
  if (requested === "1") redirect("/projetos/protese-capilar");
  if (requested === "2") redirect("/projetos/nexus-dashboard");

  return (
    <main className="container">
      <header className="caseHeader">
        <Link className="brand" href="/">
          <span className="brandMark">
            pa<span>.</span>
          </span>
          <span className="brandName">
            Pedro Assunção<small>Design & desenvolvimento web</small>
          </span>
        </Link>
        <Link className="textLink" href="/">
          ← Voltar ao início
        </Link>
      </header>
      <section className="workIndex">
        <p className="eyebrow">Portfólio / Projetos conceituais</p>
        <h1>O trabalho, de perto.</h1>
        <p className="sectionDescription">
          Veja a apresentação, as escolhas e as versões para celular de cada
          projeto.
        </p>
        <div className="portfolioCollection workShowcaseList">
          {projects.map((project, index) => (
            <PortfolioShowcase
              key={project.slug}
              project={project}
              index={index}
              headingLevel={2}
            />
          ))}
        </div>
        {requested === "3" && (
          <aside className="caseNote">
            <strong>Sentinel — estudo técnico anterior</strong>
            <p>
              Este laboratório demonstrativo continua disponível como estudo de
              interface.
            </p>
            <a
              href="https://projeto-03-web-security-lab.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir o Sentinel ↗
            </a>
          </aside>
        )}
      </section>
      <section className="caseCta">
        <h2>
          Vamos pensar
          <br />
          <em>no seu site?</em>
        </h2>
        <Link className="button buttonPrimary" href="/#orcamento">
          Pedir um orçamento ↗
        </Link>
      </section>
      <footer className="caseFooter">
        <Link href="/">Pedro Assunção</Link>
        <Link href="/#orcamento">Vamos conversar ↗</Link>
      </footer>
    </main>
  );
}
