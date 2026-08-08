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
  "HTML & CSS",
  "Git",
  "Web Security",
  "OWASP",
  "Linux",
];

const projectMeta = [
  {
    number: "01",
    stack: ["React", "TypeScript", "CSS"],
    href: "https://projeto-protese-capilar-alpha.vercel.app/"
  },

  {
    number: "02",
    stack: ["Next.js", "TypeScript", "UX"],
    href: "https://projeto-03-web-security-lab.vercel.app/"
  },
  
  {
    number: "03",
    stack: ["OWASP", "Linux", "Web Security"],
    href: "#"
  },
];

const translations: Record<Language, Copy> = {
  pt: {
    nav: { about: "Sobre", projects: "Projetos", stack: "Stack", contact: "Contato", cta: "Vamos conversar" },
    eyebrow: "PEDRO ASSUNÇÃO / PORTFÓLIO",
    heroLine1: "Frontend que performa.",
    heroLine2: "Segurança que sustenta.",
    heroText:
      "Sou Pedro Assunção, desenvolvedor frontend com atuação em cibersegurança. Crio interfaces modernas, rápidas e responsivas sem deixar segurança e boas práticas em segundo plano.",
    heroProjects: "Ver projetos",
    heroAbout: "Conheça meu trabalho",
    scroll: "SCROLL",
    aboutLabel: "01 / SOBRE",
    aboutTitle: "Interface bonita é só o começo.",
    aboutAccent: "Ela também precisa ser sólida.",
    aboutP1:
      "Meu foco principal é desenvolvimento frontend: transformar ideias em interfaces rápidas, organizadas, responsivas e agradáveis de usar.",
    aboutP2:
      "Paralelamente, atuo e estudo cibersegurança, com interesse especial em segurança de aplicações web. Essa combinação me faz olhar para um projeto não só pela experiência visual, mas também pela qualidade e segurança daquilo que está sendo entregue.",
    stats: ["Interfaces e experiência", "Frontend moderno", "Segurança aplicada"],
    projectsLabel: "02 / PROJETOS",
    projectsTitle: "Projetos & experimentos",
    projects: [
      {
        title: "Interface Web",
        description: "Projeto frontend com foco em responsividade, performance, acessibilidade e uma experiência visual limpa.",
      },
      {
        title: "Aplicação Next.js",
        description: "Aplicação moderna construída com componentes reutilizáveis, boas práticas de desenvolvimento e atenção à experiência do usuário.",
      },
      {
        title: "Web Security Lab",
        description: "Ambiente de estudos e testes voltado à segurança de aplicações web, análise de vulnerabilidades e práticas de desenvolvimento seguro.",
      },
    ],
    stackLabel: "03 / STACK",
    stackTitle: "Frontend, web e segurança no mesmo fluxo.",
    contactLabel: "04 / CONTATO",
    contactIntro: "Tem um projeto em mente? Envie uma mensagem e responderei em breve.",
    contactTitle1: "Vamos",
    contactTitle2: "conversar.",
    contactName: "Nome",
    contactEmail: "E-mail",
    contactMessage: "Mensagem",
    contactSubmit: "Enviar mensagem",
    contactSending: "Enviando...",
    contactSuccess: "Mensagem enviada. Obrigado pelo contato!",
    contactError: "Não foi possível enviar agora. Tente novamente em instantes.",
    contactPrivacy: "Seu e-mail é usado somente para que eu possa responder seu contato.",
    backTop: "Voltar ao topo ↑",
    languageLabel: "Selecionar idioma",
  },
  en: {
    nav: { about: "About", projects: "Projects", stack: "Stack", contact: "Contact", cta: "Let's talk" },
    eyebrow: "PEDRO ASSUNÇÃO / PORTFOLIO",
    heroLine1: "Frontend that performs.",
    heroLine2: "Security that holds.",
    heroText:
      "I'm Pedro Assunção, a frontend developer also working in cybersecurity. I build modern, fast and responsive interfaces without putting security and good practices aside.",
    heroProjects: "View projects",
    heroAbout: "Discover my work",
    scroll: "SCROLL",
    aboutLabel: "01 / ABOUT",
    aboutTitle: "A beautiful interface is just the beginning.",
    aboutAccent: "It also needs to be solid.",
    aboutP1:
      "My main focus is frontend development: turning ideas into fast, organized, responsive interfaces that feel great to use.",
    aboutP2:
      "Alongside development, I work with and study cybersecurity, with a special interest in web application security. That combination makes me look at a project not only through its visual experience, but also through the quality and security of what is being delivered.",
    stats: ["Interfaces & experience", "Modern frontend", "Applied security"],
    projectsLabel: "02 / PROJECTS",
    projectsTitle: "Projects & experiments",
    projects: [
      {
        title: "Web Interface",
        description: "Frontend project focused on responsiveness, performance, accessibility and a clean visual experience.",
      },
      {
        title: "Next.js Application",
        description: "Modern application built with reusable components, development best practices and close attention to user experience.",
      },
      {
        title: "Web Security Lab",
        description: "Study and testing environment focused on web application security, vulnerability analysis and secure development practices.",
      },
    ],
    stackLabel: "03 / STACK",
    stackTitle: "Frontend, web and security in the same workflow.",
    contactLabel: "04 / CONTACT",
    contactIntro: "Have a project in mind? Send me a message and I'll get back to you soon.",
    contactTitle1: "Let's",
    contactTitle2: "talk.",
    contactName: "Name",
    contactEmail: "Email",
    contactMessage: "Message",
    contactSubmit: "Send message",
    contactSending: "Sending...",
    contactSuccess: "Message sent. Thanks for reaching out!",
    contactError: "I couldn't send your message right now. Please try again shortly.",
    contactPrivacy: "Your email is used only so I can reply to your message.",
    backTop: "Back to top ↑",
    languageLabel: "Select language",
  },
  es: {
    nav: { about: "Sobre mí", projects: "Proyectos", stack: "Stack", contact: "Contacto", cta: "Hablemos" },
    eyebrow: "PEDRO ASSUNÇÃO / PORTAFOLIO",
    heroLine1: "Frontend que rinde.",
    heroLine2: "Seguridad que sostiene.",
    heroText:
      "Soy Pedro Assunção, desarrollador frontend con actuación en ciberseguridad. Creo interfaces modernas, rápidas y responsivas sin dejar de lado la seguridad y las buenas prácticas.",
    heroProjects: "Ver proyectos",
    heroAbout: "Conoce mi trabajo",
    scroll: "SCROLL",
    aboutLabel: "01 / SOBRE MÍ",
    aboutTitle: "Una interfaz bonita es solo el comienzo.",
    aboutAccent: "También necesita ser sólida.",
    aboutP1:
      "Mi enfoque principal es el desarrollo frontend: transformar ideas en interfaces rápidas, organizadas, responsivas y agradables de usar.",
    aboutP2:
      "En paralelo, trabajo y estudio ciberseguridad, con especial interés en la seguridad de aplicaciones web. Esta combinación me permite analizar un proyecto no solo por su experiencia visual, sino también por la calidad y seguridad de lo que se entrega.",
    stats: ["Interfaces y experiencia", "Frontend moderno", "Seguridad aplicada"],
    projectsLabel: "02 / PROYECTOS",
    projectsTitle: "Proyectos & experimentos",
    projects: [
      {
        title: "Interfaz Web",
        description: "Proyecto frontend centrado en responsividad, rendimiento, accesibilidad y una experiencia visual limpia.",
      },
      {
        title: "Aplicación Next.js",
        description: "Aplicación moderna construida con componentes reutilizables, buenas prácticas de desarrollo y atención a la experiencia del usuario.",
      },
      {
        title: "Web Security Lab",
        description: "Entorno de estudio y pruebas enfocado en seguridad de aplicaciones web, análisis de vulnerabilidades y prácticas de desarrollo seguro.",
      },
    ],
    stackLabel: "03 / STACK",
    stackTitle: "Frontend, web y seguridad en el mismo flujo.",
    contactLabel: "04 / CONTACTO",
    contactIntro: "¿Tienes un proyecto en mente? Envíame un mensaje y te responderé pronto.",
    contactTitle1: "Hablemos",
    contactTitle2: "de tu idea.",
    contactName: "Nombre",
    contactEmail: "Correo electrónico",
    contactMessage: "Mensaje",
    contactSubmit: "Enviar mensaje",
    contactSending: "Enviando...",
    contactSuccess: "Mensaje enviado. ¡Gracias por contactarme!",
    contactError: "No pude enviar tu mensaje ahora. Inténtalo de nuevo en unos instantes.",
    contactPrivacy: "Tu correo se usa únicamente para que pueda responder a tu mensaje.",
    backTop: "Volver arriba ↑",
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
    const saved = window.localStorage.getItem("portfolio-language") as Language | null;
    if (saved && translations[saved]) setLanguage(saved);
  }, []);

  useEffect(() => {
    const selected = languages.find((item) => item.id === language)!;
    document.documentElement.lang = selected.htmlLang;
    window.localStorage.setItem("portfolio-language", language);
  }, [language]);

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setLanguageOpen(false);
      }
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setLanguageOpen(false);
    }
    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
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
              aria-haspopup="menu"
              aria-expanded={languageOpen}
              onClick={() => setLanguageOpen((open) => !open)}
            >
              <GlobeIcon />
              <span className="languageCountry">{currentLanguage.country}</span>
              <span className="languageCode">{currentLanguage.code}</span>
              <ChevronDown />
            </button>

            <div className={`languageMenu ${languageOpen ? "isOpen" : ""}`} role="menu">
              {languages.map((item) => (
                <button
                  type="button"
                  role="menuitem"
                  className={`languageOption ${language === item.id ? "isActive" : ""}`}
                  onClick={() => changeLanguage(item.id)}
                  key={item.id}
                >
                  <span className="optionCountry">{item.country}</span>
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

        <div className="scrollHint" aria-hidden="true">
          <span />
          {copy.scroll}
        </div>
      </section>

      <section className="marquee" aria-label="Tecnologias">
        <div className="marqueeTrack">
          {[...technologies, ...technologies].map((tech, index) => (
            <span key={`${tech}-${index}`}>
              {tech}<b>✦</b>
            </span>
          ))}
        </div>
      </section>

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
              <div><strong>WEB</strong><span>{copy.stats[1]}</span></div>
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
            <a className="projectCard" href={project.href}  target="_blank"  rel="noopener noreferrer" key={project.number}>
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

          <form className="contactForm" onSubmit={handleContactSubmit}>
            <label className="srOnly" htmlFor="contact-name">{copy.contactName}</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              placeholder={copy.contactName}
              autoComplete="name"
              minLength={2}
              maxLength={80}
              required
            />

            <label className="srOnly" htmlFor="contact-email">{copy.contactEmail}</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder={copy.contactEmail}
              autoComplete="email"
              maxLength={254}
              required
            />

            <label className="srOnly" htmlFor="contact-message">{copy.contactMessage}</label>
            <textarea
              id="contact-message"
              name="message"
              placeholder={copy.contactMessage}
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
         <a
  href="https://github.com/pedroassunncao"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="GitHub"
>
  <GithubIcon />
</a>

<a
  href="https://www.linkedin.com/in/pedroassunncao/"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="LinkedIn"
>
  <LinkedinIcon />
</a>
        </div>
        <a href="#inicio">{copy.backTop}</a>
      </footer>
    </main>
  );
}
