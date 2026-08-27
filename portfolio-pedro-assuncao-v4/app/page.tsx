"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type Language = "pt" | "en" | "es";

type Copy = {
  nav: { about: string; projects: string; stack: string; contact: string; cta: string };
  eyebrow: string;
  heroLine1: string;
  heroLine2: string;
  heroText: string;
  heroProjects: string;
  heroAbout: string;
  scroll: string;
  aboutLabel: string;
  aboutTitle: string;
  aboutAccent: string;
  aboutP1: string;
  aboutP2: string;
  stats: [string, string, string];
  projectsLabel: string;
  projectsTitle: string;
  projects: { title: string; description: string }[];
  stackLabel: string;
  stackTitle: string;
  contactLabel: string;
  contactIntro: string;
  contactTitle1: string;
  contactTitle2: string;
  contactName: string;
  contactEmail: string;
  contactMessage: string;
  contactSubmit: string;
  contactSending: string;
  contactSuccess: string;
  contactError: string;
  contactPrivacy: string;
  backTop: string;
  languageLabel: string;
};

const technologies = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "HTML",
  "CSS",
  "Git",
  "Acessibilidade",
  "Web Security",
  "OWASP",
  "Linux",
];

const projectMeta = [
  {
    number: "01",
    stack: ["Next.js", "TypeScript", "CSS responsivo"],
    href: "/projetos?projeto=1",
  },
  {
    number: "02",
    stack: ["Next.js", "TypeScript", "Visualização de dados"],
    href: "/projetos?projeto=2",
  },
  {
    number: "03",
    stack: ["Next.js", "OWASP", "Security Headers"],
    href: "/projetos?projeto=3",
  },
];

const translations: Record<Language, Copy> = {
  pt: {
    nav: { about: "Sobre", projects: "Projetos", stack: "Tecnologias", contact: "Contato", cta: "Fale comigo" },
    eyebrow: "PEDRO ASSUNÇÃO — FRONTEND E SEGURANÇA WEB",
    heroLine1: "Eu faço a interface.",
    heroLine2: "E cuido do código.",
    heroText:
      "Desenvolvo sites responsivos e acessíveis e reviso o que acontece por trás da tela: desempenho, estrutura e segurança.",
    heroProjects: "Ver meus projetos",
    heroAbout: "Sobre meu trabalho",
    scroll: "SCROLL",
    aboutLabel: "SOBRE",
    aboutTitle: "Uma boa interface resolve o problema",
    aboutAccent: "sem criar outro.",
    aboutP1:
      "Meu trabalho começa pela estrutura: conteúdo compreensível, navegação previsível e componentes que funcionam bem em diferentes telas.",
    aboutP2:
      "O estudo de segurança de aplicações complementa essa prática. Validação de dados, dependências, headers e exposição de informações fazem parte da revisão, não de uma etapa tardia.",
    stats: ["Hierarquia e texto direto", "Código legível e sustentável", "Controles proporcionais ao risco"],
    projectsLabel: "PROJETOS",
    projectsTitle: "Trabalhos selecionados",
    projects: [
      {
        title: "Pamela Dantas — Prótese Capilar",
        description: "Landing page comercial com navegação objetiva, conteúdo de serviço, FAQ e contato configurável.",
      },
      {
        title: "Nexus Dashboard",
        description: "Interface SaaS responsiva com projetos, métricas, pesquisa e estados interativos baseados em dados demonstrativos.",
      },
      {
        title: "Sentinel — Web Security Lab",
        description: "Laboratório defensivo que organiza headers, categorias OWASP, achados e recomendações sem executar varreduras reais.",
      },
    ],
    stackLabel: "TECNOLOGIAS",
    stackTitle: "Ferramentas escolhidas pelo problema, não pela tendência.",
    contactLabel: "CONTATO",
    contactIntro: "Conte brevemente o que você precisa. Eu respondo pelo e-mail informado no formulário.",
    contactTitle1: "Vamos falar sobre",
    contactTitle2: "o seu projeto.",
    contactName: "Nome",
    contactEmail: "E-mail",
    contactMessage: "Mensagem",
    contactSubmit: "Enviar mensagem",
    contactSending: "Enviando...",
    contactSuccess: "Mensagem enviada. Obrigado pelo contato.",
    contactError: "Não foi possível enviar agora. Tente novamente em instantes.",
    contactPrivacy: "Seu e-mail será usado apenas para responder à mensagem.",
    backTop: "Voltar ao início",
    languageLabel: "Selecionar idioma",
  },
  en: {
    nav: { about: "About", projects: "Projects", stack: "Technologies", contact: "Contact", cta: "Contact me" },
    eyebrow: "PEDRO ASSUNÇÃO — FRONTEND AND WEB SECURITY",
    heroLine1: "I build the interface.",
    heroLine2: "And care for the code.",
    heroText:
      "I build responsive, accessible websites and review what happens behind the screen: performance, structure, and security.",
    heroProjects: "View my projects",
    heroAbout: "About my work",
    scroll: "SCROLL",
    aboutLabel: "ABOUT",
    aboutTitle: "A good interface solves the problem",
    aboutAccent: "without creating another one.",
    aboutP1:
      "My work starts with structure: understandable content, predictable navigation, and components that behave well across screen sizes.",
    aboutP2:
      "Application security complements that practice. Input validation, dependencies, headers, and information exposure are part of the review rather than a late-stage concern.",
    stats: ["Hierarchy and direct writing", "Readable, maintainable code", "Controls proportional to risk"],
    projectsLabel: "PROJECTS",
    projectsTitle: "Selected work",
    projects: [
      {
        title: "Pamela Dantas — Hair Replacement",
        description: "A commercial landing page with direct navigation, service content, FAQ, and configurable contact links.",
      },
      {
        title: "Nexus Dashboard",
        description: "A responsive SaaS interface with projects, metrics, search, and interactive states based on demonstration data.",
      },
      {
        title: "Sentinel — Web Security Lab",
        description: "A defensive lab for headers, OWASP categories, findings, and recommendations that runs no real scans.",
      },
    ],
    stackLabel: "TECHNOLOGIES",
    stackTitle: "Tools chosen for the problem, not the trend.",
    contactLabel: "CONTACT",
    contactIntro: "Briefly describe what you need. I will reply to the email address entered in the form.",
    contactTitle1: "Let's discuss",
    contactTitle2: "your project.",
    contactName: "Name",
    contactEmail: "Email",
    contactMessage: "Message",
    contactSubmit: "Send message",
    contactSending: "Sending...",
    contactSuccess: "Message sent. Thank you for getting in touch.",
    contactError: "I couldn't send your message right now. Please try again shortly.",
    contactPrivacy: "Your email will only be used to reply to your message.",
    backTop: "Back to start",
    languageLabel: "Select language",
  },
  es: {
    nav: { about: "Sobre mí", projects: "Proyectos", stack: "Tecnologías", contact: "Contacto", cta: "Contáctame" },
    eyebrow: "PEDRO ASSUNÇÃO — FRONTEND Y SEGURIDAD WEB",
    heroLine1: "Hago la interfaz.",
    heroLine2: "Y cuido el código.",
    heroText:
      "Desarrollo sitios responsivos y accesibles y reviso lo que ocurre detrás de la pantalla: rendimiento, estructura y seguridad.",
    heroProjects: "Ver mis proyectos",
    heroAbout: "Sobre mi trabajo",
    scroll: "SCROLL",
    aboutLabel: "SOBRE MÍ",
    aboutTitle: "Una buena interfaz resuelve el problema",
    aboutAccent: "sin crear otro.",
    aboutP1:
      "Mi trabajo empieza por la estructura: contenido comprensible, navegación previsible y componentes que funcionan bien en distintos tamaños de pantalla.",
    aboutP2:
      "La seguridad de aplicaciones complementa esa práctica. La validación de datos, las dependencias, los headers y la exposición de información forman parte de la revisión desde el inicio.",
    stats: ["Jerarquía y texto directo", "Código legible y mantenible", "Controles proporcionales al riesgo"],
    projectsLabel: "PROYECTOS",
    projectsTitle: "Trabajos seleccionados",
    projects: [
      {
        title: "Pamela Dantas — Prótesis Capilar",
        description: "Landing page comercial con navegación directa, contenido de servicio, preguntas frecuentes y contacto configurable.",
      },
      {
        title: "Nexus Dashboard",
        description: "Interfaz SaaS responsiva con proyectos, métricas, búsqueda y estados interactivos basados en datos demostrativos.",
      },
      {
        title: "Sentinel — Web Security Lab",
        description: "Laboratorio defensivo de headers, categorías OWASP, hallazgos y recomendaciones que no ejecuta análisis reales.",
      },
    ],
    stackLabel: "TECNOLOGÍAS",
    stackTitle: "Herramientas elegidas por el problema, no por la tendencia.",
    contactLabel: "CONTACTO",
    contactIntro: "Cuéntame brevemente qué necesitas. Responderé al correo indicado en el formulario.",
    contactTitle1: "Hablemos de",
    contactTitle2: "tu proyecto.",
    contactName: "Nombre",
    contactEmail: "Correo electrónico",
    contactMessage: "Mensaje",
    contactSubmit: "Enviar mensaje",
    contactSending: "Enviando...",
    contactSuccess: "Mensaje enviado. Gracias por contactarme.",
    contactError: "No pude enviar tu mensaje ahora. Inténtalo de nuevo en unos instantes.",
    contactPrivacy: "Tu correo solo se usará para responder al mensaje.",
    backTop: "Volver al inicio",
    languageLabel: "Seleccionar idioma",
  },
};

const languages: { id: Language; country: string; code: string; name: string; htmlLang: string }[] = [
  { id: "pt", country: "BR", code: "PT", name: "Português", htmlLang: "pt-BR" },
  { id: "en", country: "US", code: "EN", name: "English", htmlLang: "en" },
  { id: "es", country: "ES", code: "ES", name: "Español", htmlLang: "es" },
];

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.2 2.5 3.3 5.5 3.3 9S14.2 18.5 12 21M12 3C9.8 5.5 8.7 8.5 8.7 12s1.1 6.5 3.3 9" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m8 10 4 4 4-4" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m21 3-7.4 18-3.9-7.1L3 10.6 21 3Z" />
      <path d="m9.7 13.9 4.5-4.5" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.8a9.4 9.4 0 0 0-3 18.3c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 0 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 2.9.9.1-.7.4-1.1.7-1.4-2.3-.3-4.7-1.1-4.7-5a3.9 3.9 0 0 1 1-2.7 3.6 3.6 0 0 1 .1-2.7s.9-.3 2.8 1a9.8 9.8 0 0 1 5.1 0c2-1.3 2.8-1 2.8-1a3.6 3.6 0 0 1 .1 2.7 3.9 3.9 0 0 1 1 2.7c0 3.9-2.4 4.7-4.7 5 .4.3.7 1 .7 1.9v2.9c0 .3.2.6.7.5A9.4 9.4 0 0 0 12 2.8Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.5 8.4V18M6.5 5.3v.1M10.4 18v-5.3c0-2.6 3.5-2.8 3.5 0V18M10.4 8.4v1.4M3.8 3.8h16.4v16.4H3.8z" />
    </svg>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("pt");
  const [languageOpen, setLanguageOpen] = useState(false);
  const languageRef = useRef<HTMLDivElement>(null);
  const copy = translations[language];
  const currentLanguage = languages.find((item) => item.id === language)!;
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-language");
    if (saved === "pt" || saved === "en" || saved === "es") setLanguage(saved);
  }, []);

  useEffect(() => {
    const selected = languages.find((item) => item.id === language)!;
    document.documentElement.lang = selected.htmlLang;
    window.localStorage.setItem("portfolio-language", language);
  }, [language]);

  useEffect(() => {
    function closeOnOutsideClick(event: PointerEvent) {
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setLanguageOpen(false);
      }
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setLanguageOpen(false);
    }
    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  function changeLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);
    setLanguageOpen(false);
  }

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormStatus("sending");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      });

      if (!response.ok) throw new Error("Contact request failed");

      form.reset();
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    }
  }

  return (
    <main>
      <div className="noise" aria-hidden="true" />
      <div className="orb orbOne" aria-hidden="true" />
      <div className="orb orbTwo" aria-hidden="true" />

      <header className="siteHeader">
        <a className="brand" href="#inicio" aria-label="Ir para o início">
          PA<span>.</span>
        </a>

        <nav className="nav" aria-label="Navegação principal">
          <a href="#sobre">{copy.nav.about}</a>
          <a href="#projetos">{copy.nav.projects}</a>
          <a href="#stack">{copy.nav.stack}</a>
          <a href="#contato">{copy.nav.contact}</a>
        </nav>

        <div className="headerActions">
          <div className="languageSelector" ref={languageRef}>
            <button
              className="languageButton"
              type="button"
              aria-label={copy.languageLabel}
              aria-expanded={languageOpen}
              aria-controls="language-options"
              onClick={() => setLanguageOpen((open) => !open)}
            >
              <GlobeIcon />
              <span className="languageCode">{currentLanguage.code}</span>
              <ChevronDown />
            </button>

            <div
              className={`languageMenu ${languageOpen ? "isOpen" : ""}`}
              id="language-options"
              aria-label={copy.languageLabel}
              hidden={!languageOpen}
            >
              {languages.map((item) => (
                <button
                  type="button"
                  aria-pressed={language === item.id}
                  className={`languageOption ${language === item.id ? "isActive" : ""}`}
                  onClick={() => changeLanguage(item.id)}
                  key={item.id}
                >
                  <span className="optionCode">{item.code}</span>
                  <span className="optionName">{item.name}</span>
                  <span className="activeDot" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>

          <a className="miniButton" href="#contato">
            {copy.nav.cta} <ArrowUpRight />
          </a>
        </div>
      </header>

      <section className="hero section" id="inicio">
        <div className="heroEyebrow reveal">{copy.eyebrow}</div>
        <h1 className="heroTitle reveal delay1">
          {copy.heroLine1}
          <span>{copy.heroLine2}</span>
        </h1>
        <div className="heroBottom reveal delay2">
          <p>{copy.heroText}</p>
          <div className="heroActions">
            <a className="primaryButton" href="#projetos">
              {copy.heroProjects} <ArrowUpRight />
            </a>
            <a className="textLink" href="#sobre">
              {copy.heroAbout}
            </a>
          </div>
        </div>

      </section>

      <div className="marquee" aria-label={copy.stackLabel}>
        <div className="marqueeTrack" aria-hidden="true">
          {[...technologies, ...technologies].map((tech, index) => (
            <span key={`${tech}-${index}`}>
              {tech}<b>✦</b>
            </span>
          ))}
        </div>
      </div>

      <section className="section about" id="sobre">
        <div className="sectionLabel">{copy.aboutLabel}</div>
        <div className="aboutGrid">
          <h2>
            {copy.aboutTitle} <em>{copy.aboutAccent}</em>
          </h2>
          <div className="aboutCopy">
            <p>{copy.aboutP1}</p>
            <p>{copy.aboutP2}</p>
            <div className="stats">
              <div><strong>UI</strong><span>{copy.stats[0]}</span></div>
              <div><strong>CODE</strong><span>{copy.stats[1]}</span></div>
              <div><strong>SEC</strong><span>{copy.stats[2]}</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section projects" id="projetos">
        <div className="sectionHeading">
          <div className="sectionLabel">{copy.projectsLabel}</div>
          <h2>{copy.projectsTitle}</h2>
        </div>

        <div className="projectList">
          {projectMeta.map((project, index) => (
            <a className="projectCard" href={project.href} key={project.number}>
              <div className="projectNumber">{project.number}</div>
              <div className="projectContent">
                <h3>{copy.projects[index].title}</h3>
                <p>{copy.projects[index].description}</p>
                <div className="tags">
                  {project.stack.map((item) => <span key={item}>{item}</span>)}
                </div>
              </div>
              <div className="projectArrow"><ArrowUpRight /></div>
            </a>
          ))}
        </div>
      </section>

      <section className="section skills" id="stack">
        <div className="sectionLabel">{copy.stackLabel}</div>
        <div className="skillsGrid">
          <h2>{copy.stackTitle}</h2>
          <div className="skillCloud">
            {technologies.map((tech) => <span key={tech}>{tech}</span>)}
          </div>
        </div>
      </section>

      <section className="section contact" id="contato">
        <div className="contactInner">
          <div className="sectionLabel">{copy.contactLabel}</div>
          <div className="contactHeading">
            <h2>{copy.contactTitle1} <span>{copy.contactTitle2}</span></h2>
            <p>{copy.contactIntro}</p>
          </div>

          <form className="contactForm" onSubmit={handleContactSubmit} aria-busy={formStatus === "sending"}>
            <label htmlFor="contact-name">{copy.contactName}</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              minLength={2}
              maxLength={80}
              required
            />

            <label htmlFor="contact-email">{copy.contactEmail}</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength={254}
              required
            />

            <label htmlFor="contact-message">{copy.contactMessage}</label>
            <textarea
              id="contact-message"
              name="message"
              minLength={10}
              maxLength={4000}
              rows={7}
              required
            />

            <div className="honeypot" aria-hidden="true">
              <label htmlFor="contact-website">Website</label>
              <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <button className="contactSubmit" type="submit" disabled={formStatus === "sending"}>
              <SendIcon />
              {formStatus === "sending" ? copy.contactSending : copy.contactSubmit}
            </button>

            <div className="contactFormFooter">
              <small>{copy.contactPrivacy}</small>
              <span
                className={`formStatus ${formStatus === "success" ? "isSuccess" : formStatus === "error" ? "isError" : ""}`}
                role="status"
                aria-live="polite"
              >
                {formStatus === "success" ? copy.contactSuccess : formStatus === "error" ? copy.contactError : ""}
              </span>
            </div>
          </form>
        </div>
      </section>

      <footer className="footer">
        <span>© 2026 Pedro Assunção</span>
        <div className="socials">
          <a href="https://github.com/pedroassunncao" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <GithubIcon />
          </a>
          <a href="https://www.linkedin.com/in/pedroassunncao/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <LinkedinIcon />
          </a>
        </div>
        <a href="#inicio">{copy.backTop} ↑</a>
      </footer>
    </main>
  );
}
