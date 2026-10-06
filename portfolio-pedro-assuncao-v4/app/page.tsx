"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { contactDisplay, projects, services, whatsappUrl } from "@/lib/site";

const benefits = [
  "Sites institucionais",
  "Landing pages",
  "Design responsivo",
  "Contato pelo WhatsApp",
  "Redesign",
];
const steps = [
  [
    "A conversa",
    "Você me conta sobre seu negócio, seu público e o que precisa do site.",
  ],
  [
    "A proposta",
    "Definimos as páginas, o conteúdo, o investimento e o prazo de entrega.",
  ],
  [
    "A criação",
    "Desenvolvo o site e apresento para você revisar textos, visual e navegação.",
  ],
  [
    "O site no ar",
    "Publicamos a versão aprovada e você recebe as orientações para os próximos cuidados.",
  ],
];
const questions = [
  [
    "Preciso ter os textos e as imagens prontos?",
    "Não precisa ter tudo pronto para começar a conversa. Podemos organizar o conteúdo juntos. Fotos, identidade visual e materiais que você já tem ajudam a dar a sua cara ao projeto; o que faltar entra no planejamento.",
  ],
  [
    "Quanto custa um site?",
    "O valor depende do número de páginas, do conteúdo e das funcionalidades. Depois de entender o que você precisa, envio uma proposta com o escopo, o investimento e as condições. O formulário abaixo ajuda a começar essa conversa.",
  ],
  [
    "Quanto tempo leva para ficar pronto?",
    "O prazo é combinado na proposta. Ele depende do tamanho do site, da disponibilidade do conteúdo e do tempo para as revisões. As etapas ficam definidas antes do início.",
  ],
  [
    "O site funciona no celular?",
    "Sim. O layout é adaptado e conferido em telas de celular e computador, incluindo a navegação, a leitura dos textos e os botões de contato.",
  ],
  [
    "Como funcionam domínio e hospedagem?",
    "O domínio é o endereço do site e a hospedagem é onde ele fica disponível. Esses custos são informados na proposta quando necessários. Posso orientar na configuração e na publicação.",
  ],
  [
    "Você também melhora sites que já existem?",
    "Sim. Posso avaliar o site atual e propor melhorias no visual, na organização das páginas e na experiência no celular. No formulário, escolha Redesign de site e informe o endereço atual.",
  ],
];

function Arrow({ diagonal = true }: { diagonal?: boolean }) {
  return (
    <span className="arrow" aria-hidden="true">
      {diagonal ? "↗" : "→"}
    </span>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);
  const [selectedService, setSelectedService] = useState("Ainda não sei");
  const [preparedUrl, setPreparedUrl] = useState("");
  const nameInput = useRef<HTMLInputElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }
    if (menuOpen) document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  function chooseService(service: string) {
    setSelectedService(service);
    setPreparedUrl("");
    document.getElementById("orcamento")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
    nameInput.current?.focus({ preventScroll: true });
  }

  function sendQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const field = (key: string) => String(data.get(key) ?? "").trim();
    if (!field("name") || !field("business") || !field("message")) return;
    const lines = [
      "Olá, Pedro! Gostaria de pedir um orçamento.",
      "",
      `Nome: ${field("name")}`,
      `Negócio: ${field("business")}`,
      `Serviço: ${selectedService}`,
      `Prazo desejado: ${field("deadline")}`,
    ];
    if (field("website")) lines.push(`Site atual: ${field("website")}`);
    if (field("budget"))
      lines.push(`Investimento previsto: ${field("budget")}`);
    lines.push("", `Sobre o projeto: ${field("message")}`);
    const url = whatsappUrl(lines.join("\n"));
    setPreparedUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <main className={`commercialSite ${motionPaused ? "motionPaused" : ""}`}>
      <a className="skipLink" href="#conteudo">
        Pular para o conteúdo
      </a>
      <div className="ambient ambientOne" aria-hidden="true" />
      <div className="ambient ambientTwo" aria-hidden="true" />
      <div className="texture" aria-hidden="true" />

      <header className="siteHeader">
        <Link className="brand" href="/" aria-label="Pedro Assunção — início">
          <span className="brandMark">
            pa<span>.</span>
          </span>
          <span className="brandName">
            Pedro Assunção<small>Design & desenvolvimento web</small>
          </span>
        </Link>
        <nav
          id="main-navigation"
          className={`mainNav ${menuOpen ? "isOpen" : ""}`}
          aria-label="Navegação principal"
        >
          <a href="#servicos" onClick={() => setMenuOpen(false)}>
            Serviços
          </a>
          <a href="#portfolio" onClick={() => setMenuOpen(false)}>
            Portfólio
          </a>
          <a href="#processo" onClick={() => setMenuOpen(false)}>
            Como funciona
          </a>
          <a href="#sobre" onClick={() => setMenuOpen(false)}>
            Sobre
          </a>
          <a
            className="navMobileQuote"
            href="#orcamento"
            onClick={() => setMenuOpen(false)}
          >
            Pedir orçamento ↗
          </a>
        </nav>
        <a className="headerQuote" href="#orcamento">
          Vamos conversar <Arrow />
        </a>
        <button
          ref={menuButton}
          className="menuToggle"
          type="button"
          aria-controls="main-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </header>

      <section
        className="hero container"
        id="conteudo"
        aria-labelledby="hero-title"
      >
        <div className="heroCopy enter">
          <p className="eyebrow">
            <span className="eyebrowDot" /> Sites para profissionais e pequenos
            negócios
          </p>
          <h1 id="hero-title">
            Seu próximo cliente
            <br />
            precisa encontrar <em>você.</em>
          </h1>
          <p className="heroDescription">
            Sou Pedro Assunção. Crio sites para apresentar seu trabalho,
            explicar seus serviços e facilitar o primeiro contato.
          </p>
          <div className="heroActions">
            <a className="button buttonPrimary" href="#orcamento">
              Quero um site para meu negócio <Arrow />
            </a>
            <a className="textLink" href="#portfolio">
              Conheça meu trabalho <Arrow diagonal={false} />
            </a>
          </div>
          <div className="heroDetails">
            <span>Visual feito para o seu negócio</span>
            <i />
            <span>Do celular ao computador</span>
          </div>
        </div>
        <div
          className="heroShowcase enter delay"
          aria-label="Uma amostra dos projetos"
        >
          <div className="showcaseCaption">
            <span>DO PLANEJAMENTO À PÁGINA NO AR</span>
            <span>01 — 02</span>
          </div>
          <Link
            className="heroWindow heroWindowMain"
            href="/projetos/protese-capilar"
            aria-label="Conhecer o projeto de prótese capilar"
          >
            <div className="windowBar">
              <span className="windowDots">
                <i />
                <i />
                <i />
              </span>
              <span>pameladantas / landing page</span>
              <Arrow />
            </div>
            <Image
              src={projects[0].cover}
              alt="Landing page de prótese capilar com identidade dourada e fotografia em destaque"
              width={1440}
              height={1000}
              priority
              sizes="(max-width: 760px) 90vw, 44vw"
            />
          </Link>
          <Link
            className="heroWindow heroWindowSecondary"
            href="/projetos/nexus-dashboard"
            aria-label="Conhecer o projeto Nexus Dashboard"
          >
            <div className="windowBar">
              <span className="windowDots">
                <i />
                <i />
                <i />
              </span>
              <span>nexus / interface de gestão</span>
              <Arrow />
            </div>
            <Image
              src={projects[1].cover}
              alt="Nexus Dashboard com navegação, projetos e gráficos"
              width={1440}
              height={1000}
              sizes="(max-width: 760px) 66vw, 30vw"
            />
          </Link>
          <span className="showcaseNote">
            Um site com a sua cara. E fácil de usar.
          </span>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marqueeTrack">
          {[0, 1].map((group) => (
            <div className="marqueeGroup" key={group}>
              {benefits.map((item) => (
                <span key={item}>
                  {item}
                  <b>✦</b>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="motionControls container">
        <button
          type="button"
          aria-pressed={motionPaused}
          onClick={() => setMotionPaused((paused) => !paused)}
        >
          <span aria-hidden="true">{motionPaused ? "▶" : "Ⅱ"}</span>
          {motionPaused ? "Retomar animações" : "Pausar animações"}
        </button>
      </div>

      <section className="servicesSection container section" id="servicos">
        <div className="sectionHeading">
          <p className="eyebrow">01 / O que posso criar</p>
          <div>
            <h2>
              Seu negócio tem uma necessidade.
              <br />
              <em>O site começa por ela.</em>
            </h2>
            <p>
              Para quem atende, vende um serviço ou precisa apresentar melhor a
              própria empresa.
            </p>
          </div>
        </div>
        <div className="serviceGrid">
          {services.map((service, index) => (
            <article className="serviceCard" key={service.id}>
              <div className="serviceTop">
                <span className="mono">0{index + 1}</span>
                <span
                  className={`serviceSymbol symbol${index + 1}`}
                  aria-hidden="true"
                >
                  <i />
                  <i />
                  <i />
                </span>
              </div>
              <h3>{service.title}</h3>
              <p className="serviceSubtitle">{service.subtitle}</p>
              <p>{service.description}</p>
              <ul>
                {service.items.map((item) => (
                  <li key={item}>
                    <span aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="serviceLink"
                onClick={() => chooseService(service.title)}
              >
                Conversar sobre este serviço <Arrow />
              </button>
            </article>
          ))}
        </div>
        <div className="includedStrip">
          <span>Em todo projeto</span>
          <p>
            Layout para celular <b>·</b> Navegação clara <b>·</b> Cuidado com o
            carregamento <b>·</b> Orientação para publicar
          </p>
        </div>
      </section>

      <section className="portfolioSection section" id="portfolio">
        <div className="container">
          <div className="sectionHeading">
            <p className="eyebrow">02 / Portfólio</p>
            <div>
              <h2>
                Veja a ideia
                <br />
                <em>ganhar forma.</em>
              </h2>
              <p>
                Projetos conceituais que mostram meu cuidado com o visual, o
                conteúdo e a navegação.
              </p>
            </div>
          </div>
          <div className="portfolioGrid">
            {projects.map((project, index) => (
              <article
                className={`portfolioCard ${project.theme}`}
                key={project.slug}
              >
                <Link
                  className="portfolioVisual"
                  href={`/projetos/${project.slug}`}
                  aria-label={`Ver detalhes de ${project.title}`}
                >
                  <div className="portfolioScreenshot">
                    <Image
                      src={project.cover}
                      alt={`Página do projeto ${project.title} no computador`}
                      width={1440}
                      height={1000}
                      sizes="(max-width: 760px) 90vw, 43vw"
                    />
                  </div>
                  <span className="projectNumber">0{index + 1}</span>
                  <span className="visualArrow">
                    <Arrow />
                  </span>
                </Link>
                <div className="portfolioCopy">
                  <div className="projectCategory">
                    <span>{project.category}</span>
                    <span>Projeto conceitual</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <div className="portfolioLinks">
                    <Link href={`/projetos/${project.slug}`}>
                      Conhecer o projeto <Arrow />
                    </Link>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Abrir site <Arrow />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="portfolioFootnote">
            Cada negócio pede uma solução própria. Estes projetos são exemplos
            do que podemos construir juntos.
          </p>
        </div>
      </section>

      <section className="processSection container section" id="processo">
        <div className="sectionHeading">
          <p className="eyebrow">03 / Como funciona</p>
          <div>
            <h2>
              Você acompanha.
              <br />
              <em>Eu cuido da criação.</em>
            </h2>
            <p>
              Uma conversa direta, etapas combinadas e espaço para você
              participar.
            </p>
          </div>
        </div>
        <div className="processGrid">
          {steps.map(([title, text], index) => (
            <article key={title}>
              <span className="stepNumber">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="aboutSection section" id="sobre">
        <div className="container aboutGrid">
          <div
            className="aboutIdentity"
            aria-label="Pedro Assunção, criação de sites"
          >
            <span className="aboutMonogram" aria-hidden="true">
              pa<span>.</span>
            </span>
            <div>
              <strong>Pedro Assunção</strong>
              <span>Design & desenvolvimento web</span>
            </div>
            <span className="aboutSignature">
              A pessoa por trás do seu site.
            </span>
          </div>
          <div className="aboutCopy">
            <p className="eyebrow">04 / Prazer, Pedro</p>
            <h2>
              Você fala direto
              <br />
              <em>com quem cria.</em>
            </h2>
            <p>
              Sou desenvolvedor e gosto de dar forma ao que um negócio tem para
              mostrar. Meu trabalho é organizar a informação, encontrar um
              visual que combine com você e transformar isso em uma página que
              funcione bem.
            </p>
            <p>
              Do primeiro contato à publicação, você conversa comigo. Eu explico
              as escolhas, recebo suas revisões e cuido dos detalhes para o site
              ficar pronto.
            </p>
            <a
              className="textLink"
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Me conte sobre seu negócio <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section className="faqSection container section" id="duvidas">
        <div className="faqGrid">
          <div>
            <p className="eyebrow">05 / Antes de começar</p>
            <h2>
              Talvez você esteja
              <br />
              <em>se perguntando.</em>
            </h2>
            <p className="sectionDescription">
              Se sua dúvida não estiver aqui, pode me chamar.
            </p>
            <a
              className="textLink"
              href={whatsappUrl(
                "Olá, Pedro! Tenho uma dúvida sobre a criação de um site.",
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Tirar uma dúvida <Arrow />
            </a>
          </div>
          <div className="faqList">
            {questions.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="quoteSection section" id="orcamento">
        <div className="container quoteGrid">
          <div className="quoteCopy">
            <p className="eyebrow">06 / Vamos conversar</p>
            <h2>
              Me conte sobre
              <br />
              <em>o seu próximo site.</em>
            </h2>
            <p>
              Preencha um resumo do que você precisa. Ele vai direto para nossa
              conversa no WhatsApp, e eu retorno para entender os detalhes e
              preparar uma proposta.
            </p>
            <a
              className="directContact"
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Prefere começar com uma conversa?</span>
              <strong>
                {contactDisplay} <Arrow />
              </strong>
            </a>
            <small>
              O valor e o prazo são combinados depois de definirmos o escopo.
            </small>
          </div>
          <form
            className="quoteForm"
            onSubmit={sendQuote}
            onChange={() => setPreparedUrl("")}
          >
            <div className="formIntro">
              <span className="mono">SEU PROJETO COMEÇA AQUI</span>
              <span aria-hidden="true">↗</span>
            </div>
            <div className="formRow">
              <label>
                Seu nome
                <input
                  ref={nameInput}
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                  placeholder="Como posso te chamar?"
                  pattern=".*\S.*"
                />
              </label>
              <label>
                Seu negócio
                <input
                  name="business"
                  autoComplete="organization"
                  required
                  maxLength={160}
                  placeholder="Empresa ou área de atuação"
                  pattern=".*\S.*"
                />
              </label>
            </div>
            <fieldset>
              <legend>O que você precisa?</legend>
              <div className="serviceChoices">
                {[
                  ...services.map((service) => service.title),
                  "Ainda não sei",
                ].map((service) => (
                  <label className="serviceChoice" key={service}>
                    <input
                      type="radio"
                      name="service"
                      value={service}
                      checked={selectedService === service}
                      onChange={() => setSelectedService(service)}
                    />
                    <span>{service}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="formRow">
              <label>
                Prazo desejado
                <select name="deadline" defaultValue="Ainda não tenho um prazo">
                  <option>Ainda não tenho um prazo</option>
                  <option>Quero começar o quanto antes</option>
                  <option>Dentro de 1 mês</option>
                  <option>Dentro de 2 a 3 meses</option>
                  <option>Estou planejando para mais adiante</option>
                </select>
              </label>
              <label>
                Investimento previsto <small>opcional</small>
                <input
                  name="budget"
                  maxLength={100}
                  placeholder="Se já tiver uma faixa em mente"
                />
              </label>
            </div>
            <label>
              Já tem um site? <small>opcional</small>
              <input
                name="website"
                inputMode="url"
                maxLength={300}
                placeholder="Cole o endereço aqui"
              />
            </label>
            <label>
              Conte um pouco sobre o projeto
              <textarea
                name="message"
                required
                maxLength={1800}
                rows={4}
                onInput={(event) =>
                  event.currentTarget.setCustomValidity(
                    event.currentTarget.value.trim()
                      ? ""
                      : "Conte um pouco sobre o projeto.",
                  )
                }
                placeholder="O que você oferece e o que gostaria de mostrar no site?"
              />
            </label>
            <button className="button buttonPrimary quoteSubmit" type="submit">
              Continuar no WhatsApp <Arrow />
            </button>
            <p className="formNote">
              Você revisa a mensagem no WhatsApp e confirma o envio por lá.
            </p>
            {preparedUrl && (
              <div className="quoteStatus" role="status">
                <span>
                  Seu resumo está pronto. Conclua o envio no WhatsApp.
                </span>
                <a href={preparedUrl} target="_blank" rel="noopener noreferrer">
                  Abrir a conversa novamente ↗
                </a>
              </div>
            )}
          </form>
        </div>
      </section>

      <footer className="footer container">
        <div>
          <Link href="/" className="footerName">
            Pedro Assunção<span>.</span>
          </Link>
          <p>Sites para apresentar seu trabalho e facilitar novas conversas.</p>
        </div>
        <div className="footerLinks">
          <a href="#servicos">Serviços</a>
          <a href="#portfolio">Portfólio</a>
          <a href="#orcamento">Orçamento</a>
        </div>
        <div className="footerBottom">
          <span>© {new Date().getFullYear()} Pedro Assunção</span>
          <a
            href="https://github.com/pedroassunncao"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
          <a href="#conteudo">Voltar ao topo ↑</a>
        </div>
      </footer>
      <a
        className="floatingContact"
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Conversar com Pedro pelo WhatsApp ${contactDisplay}`}
      >
        <span className="chatMark" aria-hidden="true">
          ↗
        </span>
        <span>Fale comigo</span>
      </a>
    </main>
  );
}
