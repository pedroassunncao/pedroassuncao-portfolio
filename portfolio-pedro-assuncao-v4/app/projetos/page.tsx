"use client";

import { useEffect, useRef, useState } from "react";
import "./projetos.css";

type Project = {
  number: string;
  eyebrow: string;
  title: string;
  shortTitle: string;
  description: string;
  detail: string;
  stack: string[];
  live: string;
  github: string;
  theme: "gold" | "wine" | "green";
};

const projects: Project[] = [
  {
    number: "01",
    eyebrow: "INTERFACE WEB / LANDING PAGE",
    title: "Prótese Capilar",
    shortTitle: "Prótese",
    description:
      "Landing page premium desenvolvida para apresentar um serviço de prótese capilar com foco em conversão, clareza e experiência visual.",
    detail:
      "O projeto combina hero em destaque, seções comerciais, resultados, FAQ e CTAs para WhatsApp em uma experiência responsiva e elegante.",
    stack: ["React", "TypeScript", "CSS", "Responsive UI"],
    live: "https://projeto-protese-capilar-alpha.vercel.app/",
    github: "https://github.com/pedroassunncao/projeto-protese-capilar",
    theme: "gold",
  },
  {
    number: "02",
    eyebrow: "NEXT.JS / SAAS DASHBOARD",
    title: "Nexus Dashboard",
    shortTitle: "Nexus",
    description:
      "Dashboard SaaS moderno com visão de métricas, projetos, analytics e segurança em uma interface densa, organizada e responsiva.",
    detail:
      "A aplicação explora navegação entre áreas, gráficos, pesquisa, notificações, score de segurança e estados interativos sem depender de uma biblioteca visual externa.",
    stack: ["Next.js", "TypeScript", "UX", "SVG"],
    live: "https://projeto-02-nexus-dashboard.vercel.app/",
    github: "https://github.com/pedroassunncao/projeto-02-nexus-dashboard",
    theme: "wine",
  },
  {
    number: "03",
    eyebrow: "CYBERSECURITY / DEFENSIVE LAB",
    title: "Sentinel Web Security Lab",
    shortTitle: "Sentinel",
    description:
      "Laboratório visual de segurança web voltado a postura defensiva, headers HTTP, OWASP, findings e organização de análises.",
    detail:
      "O Sentinel transforma conceitos de application security em uma interface navegável com security score, checklist OWASP, recomendações defensivas e histórico de scans demonstrativos.",
    stack: ["OWASP", "Web Security", "Next.js", "TypeScript"],
    live: "https://projeto-03-web-security-lab.vercel.app/",
    github: "https://github.com/pedroassunncao/projeto-03-web-security-lab",
    theme: "green",
  },
];

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function ArrowLeft() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.5 5.5 0 0 0 19.3 3.7 5.1 5.1 0 0 0 19.2 0S18 0 15 1.5a13.4 13.4 0 0 0-7 0C5 0 3.8 0 3.8 0a5.1 5.1 0 0 0-.1 3.7 5.5 5.5 0 0 0-1.5 3.8c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 8 18v4" />
      <path d="M8 19c-3 .9-3-1.5-4.2-2" />
    </svg>
  );
}

export default function ProjectsPage() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = Number(params.get("projeto"));
    if (requested >= 1 && requested <= projects.length) {
      setActive(requested - 1);
    }
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") previous();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  function updateUrl(index: number) {
    const url = new URL(window.location.href);
    url.searchParams.set("projeto", String(index + 1));
    window.history.replaceState({}, "", url);
  }

  function goTo(index: number, nextDirection: "next" | "prev" = "next") {
    const normalized = (index + projects.length) % projects.length;
    setDirection(nextDirection);
    setActive(normalized);
    updateUrl(normalized);
  }

  function next() {
    goTo(active + 1, "next");
  }

  function previous() {
    goTo(active - 1, "prev");
  }

  function handleTouchStart(event: React.TouchEvent) {
    touchStart.current = event.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd(event: React.TouchEvent) {
    if (touchStart.current === null) return;
    const end = event.changedTouches[0]?.clientX ?? touchStart.current;
    const distance = touchStart.current - end;

    if (Math.abs(distance) > 55) {
      distance > 0 ? next() : previous();
    }

    touchStart.current = null;
  }

  const project = projects[active];

  return (
    <main className={`projectsPage theme-${project.theme}`}>
      <div className="projectNoise" aria-hidden="true" />
      <div className="projectGlow projectGlowOne" aria-hidden="true" />
      <div className="projectGlow projectGlowTwo" aria-hidden="true" />

      <header className="projectsHeader">
        <a className="projectsBrand" href="/" aria-label="Voltar para o início">
          PA<span>.</span>
        </a>

        <nav className="projectsNav" aria-label="Navegação">
          <a href="/">Início</a>
          <a className="isActive" href="/projetos">Projetos</a>
          <a href="/#contato">Contato</a>
        </nav>

        <a className="backPortfolio" href="/">
          Voltar ao portfólio <ArrowUpRight />
        </a>
      </header>

      <section
        className="showcase"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="showcaseTop">
          <div className="showcaseLabel">
            <span>PROJETOS SELECIONADOS</span>
            <i />
            <strong>{project.number} / 03</strong>
          </div>

          <div className="showcaseProgress" aria-label={`Projeto ${active + 1} de 3`}>
            {projects.map((item, index) => (
              <button
                type="button"
                key={item.number}
                className={active === index ? "isActive" : ""}
                onClick={() => goTo(index, index >= active ? "next" : "prev")}
                aria-label={`Abrir projeto ${item.number}: ${item.title}`}
              >
                <span>{item.number}</span>
                <i />
              </button>
            ))}
          </div>
        </div>

        <div
          className={`showcaseGrid slide-${direction}`}
          key={`${project.number}-${direction}`}
        >
          <div className="projectCopy">
            <p className="projectEyebrow">{project.eyebrow}</p>

            <h1>
              {project.title}
              <span>.</span>
            </h1>

            <p className="projectLead">{project.description}</p>
            <p className="projectDetail">{project.detail}</p>

            <div className="projectStack">
              {project.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <div className="projectActions">
              <a
                className="projectPrimary"
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver projeto <ArrowUpRight />
              </a>

              <a
                className="projectSecondary"
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon />
                GitHub
              </a>
            </div>
          </div>

          <div className="previewColumn">
            <div className="previewFrame">
              <div className="browserBar">
                <div className="browserDots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>

                <div className="browserAddress">
                  <span>●</span>
                  {project.live.replace("https://", "").replace(/\/$/, "")}
                </div>

                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Abrir ${project.title}`}
                >
                  <ArrowUpRight />
                </a>
              </div>

              <div className="previewViewport">
                <iframe
                  key={project.live}
                  title={`Preview ao vivo — ${project.title}`}
                  src={project.live}
                  loading="lazy"
                  tabIndex={-1}
                />
                <a
                  className="previewOverlay"
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Abrir ${project.title} em nova guia`}
                >
                  <span>LIVE PREVIEW</span>
                </a>
              </div>
            </div>

            <div className="previewMeta">
              <div>
                <span>CASE</span>
                <strong>{project.number}</strong>
              </div>
              <div>
                <span>STATUS</span>
                <strong className="onlineStatus"><i /> ONLINE</strong>
              </div>
              <div>
                <span>FOCO</span>
                <strong>{project.stack[0]}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="showcaseBottom">
          <button
            type="button"
            className="navArrow"
            onClick={previous}
            aria-label="Projeto anterior"
          >
            <ArrowLeft />
            <span>Anterior</span>
          </button>

          <div className="projectRail" aria-hidden="true">
            <span>{projects[(active + projects.length - 1) % projects.length].shortTitle}</span>
            <i>
              <b style={{ width: `${((active + 1) / projects.length) * 100}%` }} />
            </i>
            <span>{projects[(active + 1) % projects.length].shortTitle}</span>
          </div>

          <button
            type="button"
            className="navArrow navArrowNext"
            onClick={next}
            aria-label="Próximo projeto"
          >
            <span>Próximo</span>
            <ArrowRight />
          </button>
        </div>
      </section>

      <footer className="projectsFooter">
        <span>© 2026 Pedro Assunção</span>
        <p>Frontend · Web · Cybersecurity</p>
        <span>Use ← → para navegar</span>
      </footer>
    </main>
  );
}
