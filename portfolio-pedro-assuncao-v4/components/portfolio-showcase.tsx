"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { type PortfolioProject, whatsappUrl } from "@/lib/site";
import { WhatsAppIcon } from "./whatsapp-icon";

export function ProjectGallery({
  project,
  phone = false,
}: {
  project: PortfolioProject;
  phone?: boolean;
}) {
  const [selected, setSelected] = useState(0);
  const screen = project.gallery[selected];
  return (
    <div
      className={`projectGallery ${project.theme} ${phone ? "withPhone" : ""}`}
    >
      <div className="galleryStage">
        <div className="galleryBrowser">
          <div className="galleryBrowserBar" aria-hidden="true">
            <span>● ● ●</span>
            <span>
              {project.title.toLowerCase()} / {screen.label.toLowerCase()}
            </span>
            <span>↗</span>
          </div>
          <Image
            src={screen.src}
            alt={`${project.title} — ${screen.label}, versão para computador`}
            width={1440}
            height={1000}
            sizes={
              phone
                ? "(max-width: 760px) 82vw, 50vw"
                : "(max-width: 760px) 90vw, 85vw"
            }
          />
        </div>
        {phone && (
          <div className="galleryPhone">
            <span aria-hidden="true" />
            <Image
              src={project.mobile}
              alt={`${project.title} no celular`}
              width={390}
              height={1250}
              sizes="(max-width: 760px) 22vw, 13vw"
            />
          </div>
        )}
      </div>
      <div
        className="galleryControls"
        role="group"
        aria-label={`Telas de ${project.title}`}
      >
        {project.gallery.map((item, index) => (
          <button
            key={item.src}
            type="button"
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
          >
            {item.label}
          </button>
        ))}
        <span className="galleryCounter" aria-hidden="true">
          0{selected + 1} / 0{project.gallery.length}
        </span>
      </div>
    </div>
  );
}

export function PortfolioShowcase({
  project,
  index,
  headingLevel = 3,
}: {
  project: PortfolioProject;
  index: number;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article
      className={`workShowcase ${project.theme}`}
      aria-labelledby={`work-${project.slug}`}
    >
      <div className="workShowcaseTop">
        <span className="workIndexNumber">0{index + 1}</span>
        <span>{project.category}</span>
        <span>Projeto conceitual</span>
      </div>
      <div className="workShowcaseGrid">
        <ProjectGallery project={project} phone />
        <div className="workShowcaseCopy">
          <p className="workType">{project.type}</p>
          <Heading id={`work-${project.slug}`}>
            <Link href={`/projetos/${project.slug}`}>
              {project.title}
              <span aria-hidden="true">↗</span>
            </Link>
          </Heading>
          <p className="workHeadline">{project.headline}</p>
          <p className="workSummary">{project.summary}</p>
          <div className="workScope" aria-label="O que foi desenvolvido">
            {project.scope.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <ul className="workFeatures">
            {project.features.slice(0, 3).map((item) => (
              <li key={item}>
                <span aria-hidden="true">↗</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="workActions">
            <Link className="workDetails" href={`/projetos/${project.slug}`}>
              Ver estudo completo <span aria-hidden="true">↗</span>
            </Link>
            <a href={project.live} target="_blank" rel="noopener noreferrer">
              Abrir demonstração <span aria-hidden="true">↗</span>
            </a>
          </div>
          <a
            className="workContact"
            href={whatsappUrl(
              `Olá, Pedro! Gostei do projeto ${project.title} no seu portfólio e quero conversar sobre um site para meu negócio.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon /> Quero um site nessa linha
          </a>
        </div>
      </div>
    </article>
  );
}
