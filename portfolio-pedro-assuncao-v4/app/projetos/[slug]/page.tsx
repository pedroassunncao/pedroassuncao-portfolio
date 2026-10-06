import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, whatsappUrl } from "@/lib/site";
import { ProjectGallery } from "@/components/portfolio-showcase";
import { WhatsAppIcon } from "@/components/whatsapp-icon";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { title: "Projeto não encontrado" };
  return {
    title: project.title,
    alternates: { canonical: `/projetos/${project.slug}` },
    description: project.intro,
    openGraph: {
      title: `${project.title} | Pedro Assunção`,
      description: project.intro,
      images: [
        {
          url: project.cover,
          width: 1440,
          height: 1000,
          alt: `Página de ${project.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Pedro Assunção`,
      description: project.intro,
      images: [project.cover],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

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
        <Link className="textLink" href="/#portfolio">
          ← Voltar ao portfólio
        </Link>
      </header>
      <section className="caseIntro">
        <p className="eyebrow">{project.type} / Projeto conceitual</p>
        <h1>{project.title}</h1>
        <p>{project.intro}</p>
        <div className="caseActions">
          <a
            className="button buttonPrimary"
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
          >
            Abrir demonstração ↗
          </a>
          <Link className="textLink" href="/#orcamento">
            Quero conversar sobre meu site ↗
          </Link>
        </div>
      </section>
      <div className="caseGallery">
        <ProjectGallery project={project} />
      </div>
      <section className="caseStory">
        <div>
          <h2>O ponto de partida</h2>
          <p>{project.challenge}</p>
        </div>
        <div>
          <h2>As escolhas do projeto</h2>
          <p>{project.solution}</p>
        </div>
      </section>
      <section className="caseMobile">
        <div>
          <p className="eyebrow">No computador e no celular</p>
          <h2>
            A mesma ideia.
            <br />
            <em>Em outra tela.</em>
          </h2>
          <p>
            A estrutura se adapta à tela para manter a leitura e os controles
            acessíveis. Esta é uma captura da versão para celular.
          </p>
          <ul>
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
        <div
          className="casePhone"
          tabIndex={0}
          role="region"
          aria-label={`Captura de ${project.title} no celular; role para ver mais`}
        >
          <Image
            src={project.mobile}
            alt={`Projeto ${project.title} na versão de celular`}
            width={390}
            height={1250}
            sizes="310px"
          />
        </div>
      </section>
      <p className="caseNote">{project.note}</p>
      <section className="caseCta">
        <p className="eyebrow">Vamos pensar no seu negócio?</p>
        <h2>
          Seu projeto pode
          <br />
          <em>começar com uma conversa.</em>
        </h2>
        <a
          className="button buttonPrimary"
          href={whatsappUrl(
            `Olá, Pedro! Vi o projeto ${project.title} e gostaria de conversar sobre um site para meu negócio.`,
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon /> Falar com Pedro no WhatsApp ↗
        </a>
      </section>
      <footer className="caseFooter">
        <Link href="/">Pedro Assunção</Link>
        <a href={project.github} target="_blank" rel="noopener noreferrer">
          Código deste projeto ↗
        </a>
      </footer>
    </main>
  );
}
