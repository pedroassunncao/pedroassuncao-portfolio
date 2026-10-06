"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { whatsappUrl } from "@/lib/site";
import { WhatsAppIcon } from "@/components/whatsapp-icon";

const rooms = [
  {
    id: "estar",
    category: "Estar",
    title: "Luz que entra. Espaço que acolhe.",
    image: "/demos/casa-clara/estar.png",
    detail:
      "Um estudo de sala de estar em que a luz natural, as texturas e a circulação orientam as escolhas. Madeira, linho e pedra dão unidade ao ambiente.",
    choices: [
      "Integração com a luz natural",
      "Materiais de textura suave",
      "Circulação em torno do mobiliário",
    ],
  },
  {
    id: "cozinha",
    category: "Cozinha",
    title: "A rotina encontra seu lugar.",
    image: "/demos/casa-clara/cozinha.png",
    detail:
      "Um estudo de cozinha com armazenamento bem distribuído e uma pequena bancada para as pausas do dia. Os tons naturais mantêm a continuidade entre os materiais.",
    choices: [
      "Armazenamento acessível",
      "Bancada de apoio e refeições",
      "Madeira e verde em equilíbrio",
    ],
  },
  {
    id: "quarto",
    category: "Quarto",
    title: "Menos ruído. Mais descanso.",
    image: "/demos/casa-clara/quarto.png",
    detail:
      "Um estudo de quarto com luz filtrada, marcenaria simples e tecidos naturais. A proposta organiza o ambiente sem tirar o espaço de descanso do centro da atenção.",
    choices: [
      "Luz suave para o descanso",
      "Marcenaria integrada",
      "Tons e tecidos naturais",
    ],
  },
] as const;
type Room = (typeof rooms)[number];
const services = [
  [
    "Interiores residenciais",
    "Organização dos espaços, definição de materiais e escolhas que acompanham a rotina de quem mora.",
  ],
  [
    "Ambientes comerciais",
    "Espaços de atendimento que apresentam a identidade do negócio e recebem bem quem chega.",
  ],
  [
    "Consultoria de ambientes",
    "Uma orientação para repensar um cômodo, escolher acabamentos ou organizar o que você já tem.",
  ],
];

export default function CasaSite() {
  const [category, setCategory] = useState("Todos");
  const [activeRoom, setActiveRoom] = useState<Room | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [brief, setBrief] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!activeRoom) return;
    const modal = dialog.current;
    if (modal && !modal.open) modal.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [activeRoom]);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [menuOpen]);

  function makeBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !message) return;
    setBrief(
      `${name}, seu estudo é para ${String(data.get("room")).toLowerCase()}.\n\n${message}`,
    );
  }

  return (
    <main className="casaDemo">
      <a className="ccSkip" href="#cc-inicio">
        Pular para o conteúdo
      </a>
      <div className="ccDemoBar">
        <span>CASA CLARA — PROJETO CONCEITUAL</span>
        <Link href="/projetos/casa-clara">
          Um site de Pedro Assunção <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <header className="ccHeader ccContainer">
        <a
          className="ccLogo"
          href="#cc-inicio"
          aria-label="Casa Clara — início"
        >
          <span aria-hidden="true">⌂</span>
          <span>
            casa clara<small>ESTÚDIO DE INTERIORES · DEMONSTRAÇÃO</small>
          </span>
        </a>
        <nav
          className={`ccNav ${menuOpen ? "isOpen" : ""}`}
          id="cc-navigation"
          aria-label="Navegação Casa Clara"
        >
          {[
            ["cc-estudio", "O estúdio"],
            ["cc-ambientes", "Ambientes"],
            ["cc-servicos", "Serviços"],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <a
            className="ccNavCta"
            href="#cc-contato"
            onClick={() => setMenuOpen(false)}
          >
            Começar uma conversa <span aria-hidden="true">↗</span>
          </a>
        </nav>
        <button
          ref={menuButton}
          className="ccMenu"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="cc-navigation"
          aria-label={
            menuOpen ? "Fechar menu Casa Clara" : "Abrir menu Casa Clara"
          }
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </header>

      <section
        className="ccHero ccContainer"
        id="cc-inicio"
        aria-labelledby="cc-title"
      >
        <div className="ccHeroHeading">
          <p className="ccEyebrow">ESPAÇOS PARA A VIDA ACONTECER</p>
          <h1 id="cc-title">
            Uma casa com espaço
            <br />
            para <em>ser sua.</em>
          </h1>
          <div className="ccHeroSide">
            <p>
              Interiores pensados para o jeito que você vive. A luz, os
              materiais e os detalhes começam pela sua rotina.
            </p>
            <a href="#cc-ambientes">
              Conheça os ambientes <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <div className="ccHeroImage">
          <Image
            src="/demos/casa-clara/estar.png"
            alt="Estudo ilustrativo de uma sala com sofá de linho, madeira e luz natural"
            width={1672}
            height={940}
            priority
            sizes="(max-width: 760px) 100vw, 90vw"
          />
          <div className="ccImageLabel">
            <span>01 / ESTUDO RESIDENCIAL</span>
            <span>Luz, textura e acolhimento.</span>
          </div>
          <a className="ccHeroCircle" href="#cc-contato">
            Vamos
            <br />
            pensar no
            <br />
            seu espaço <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="ccHeroFoot">
          <span>INTERIORES RESIDENCIAIS</span>
          <span>ESPAÇOS COMERCIAIS</span>
          <span>CONSULTORIA</span>
          <span>IMAGEM ILUSTRATIVA GERADA POR IA</span>
        </div>
      </section>

      <section className="ccAbout ccContainer ccSection" id="cc-estudio">
        <p className="ccEyebrow">01 / O ESTÚDIO</p>
        <div>
          <h2>
            A beleza está nas escolhas.
            <br />
            <em>E em como elas fazem você se sentir.</em>
          </h2>
          <div className="ccAboutText">
            <p>
              Uma sala que recebe. Uma cozinha que acompanha a rotina. Um quarto
              que convida a desacelerar. O ponto de partida é entender como cada
              espaço será usado.
            </p>
            <p>
              A Casa Clara é um estúdio fictício criado para explorar essa
              apresentação: explicar o serviço com clareza e deixar os ambientes
              contarem parte da história.
            </p>
          </div>
        </div>
      </section>

      <section className="ccWork ccContainer ccSection" id="cc-ambientes">
        <div className="ccSectionHeading">
          <div>
            <p className="ccEyebrow">02 / AMBIENTES</p>
            <h2>
              Cada espaço,
              <br />
              <em>uma intenção.</em>
            </h2>
          </div>
          <p>
            Estudos visuais de ambientes. Explore as propostas e os detalhes de
            cada uma.
          </p>
        </div>
        <div
          className="ccFilters"
          role="group"
          aria-label="Filtrar estudos por ambiente"
        >
          {["Todos", "Estar", "Cozinha", "Quarto"].map((item) => (
            <button
              type="button"
              key={item}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <p className="ccCount" role="status">
          {
            rooms.filter(
              (room) => category === "Todos" || room.category === category,
            ).length
          }{" "}
          {category === "Todos" ? "estudos disponíveis" : "estudo disponível"}
        </p>
        <div className="ccRoomGrid">
          {rooms
            .filter(
              (room) => category === "Todos" || room.category === category,
            )
            .map((room) => (
              <article className="ccRoom" key={room.id}>
                <button
                  type="button"
                  onClick={() => setActiveRoom(room)}
                  aria-label={`Explorar estudo: ${room.title}`}
                >
                  <div className="ccRoomImage">
                    <Image
                      src={room.image}
                      alt={`Ambiente ilustrativo: ${room.category}`}
                      width={1536}
                      height={1024}
                      sizes="(max-width: 760px) 90vw, 29vw"
                    />
                    <span aria-hidden="true">↗</span>
                  </div>
                  <span className="ccRoomCategory">
                    {room.category} / Estudo conceitual
                  </span>
                  <h3>{room.title}</h3>
                </button>
              </article>
            ))}
        </div>
        <p className="ccIllustrationNote">
          As imagens desta demonstração foram geradas por IA. Não representam
          obras executadas ou clientes reais.
        </p>
      </section>

      <section className="ccServices" id="cc-servicos">
        <div className="ccContainer ccSection">
          <p className="ccEyebrow">03 / POSSIBILIDADES</p>
          <h2>
            Do primeiro esboço
            <br />
            <em>aos detalhes do dia a dia.</em>
          </h2>
          <div className="ccServiceList">
            {services.map(([title, text], index) => (
              <details key={title} open={index === 0}>
                <summary>
                  <span>0{index + 1}</span>
                  <h3>{title}</h3>
                  <b aria-hidden="true">+</b>
                </summary>
                <p>{text}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="ccProcess ccContainer ccSection">
        <div>
          <p className="ccEyebrow">04 / O CAMINHO</p>
          <h2>
            Começa com escuta.
            <br />
            <em>Ganha forma com cuidado.</em>
          </h2>
        </div>
        <ol>
          {[
            [
              "Entender",
              "Rotina, necessidades e o que você quer sentir no espaço.",
            ],
            [
              "Desenhar",
              "Distribuição, materiais e referências que dão direção às escolhas.",
            ],
            [
              "Detalhar",
              "Uma proposta organizada para visualizar o conjunto e revisar os detalhes.",
            ],
          ].map(([title, text], index) => (
            <li key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="ccContact" id="cc-contato">
        <div className="ccContainer ccContactGrid ccSection">
          <div>
            <p className="ccEyebrow">05 / PRIMEIRO CONTATO</p>
            <h2>
              O que seu espaço
              <br />
              <em>precisa hoje?</em>
            </h2>
            <p>
              Um bom começo é colocar as ideias em palavras. Experimente o
              formulário para ver como um pedido de projeto pode ser organizado.
            </p>
            <div className="ccDemoNotice">
              <strong>Você está em uma demonstração.</strong>
              <p>
                Não há um estúdio atendendo por aqui. O formulário gera um
                resumo apenas nesta página, sem enviar ou salvar seus dados.
              </p>
            </div>
            <a
              className="ccPedroContact"
              href={whatsappUrl(
                "Olá, Pedro! Vi a demonstração Casa Clara e quero um site institucional nessa linha para o meu negócio.",
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon /> Quero um site como este{" "}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <form
            className="ccForm"
            onSubmit={makeBrief}
            onChange={() => setBrief("")}
          >
            <label>
              Seu nome
              <input
                name="name"
                required
                pattern=".*\S.*"
                maxLength={100}
                autoComplete="name"
                placeholder="Como podemos te chamar?"
              />
            </label>
            <label>
              Que ambiente você tem em mente?
              <select name="room" defaultValue="Uma casa completa">
                <option>Uma casa completa</option>
                <option>Uma sala de estar</option>
                <option>Uma cozinha</option>
                <option>Um quarto</option>
                <option>Um espaço comercial</option>
              </select>
            </label>
            <label>
              Conte sua ideia
              <textarea
                name="message"
                required
                rows={4}
                maxLength={1500}
                onInput={(event) =>
                  event.currentTarget.setCustomValidity(
                    event.currentTarget.value.trim()
                      ? ""
                      : "Conte sua ideia para gerar o resumo.",
                  )
                }
                placeholder="O que você gostaria de mudar ou criar?"
              />
            </label>
            <button type="submit">
              Gerar resumo demonstrativo <span aria-hidden="true">↗</span>
            </button>
            {brief && (
              <div className="ccBrief" role="status">
                <strong>Resumo gerado. Nenhuma solicitação foi enviada.</strong>
                <p>{brief}</p>
              </div>
            )}
          </form>
        </div>
      </section>
      <footer className="ccFooter ccContainer">
        <a className="ccFooterLogo" href="#cc-inicio">
          casa clara<span>.</span>
        </a>
        <p>Uma marca fictícia. Um estudo de possibilidades.</p>
        <Link href="/projetos/casa-clara">
          Design e desenvolvimento por Pedro Assunção ↗
        </Link>
      </footer>
      <dialog
        ref={dialog}
        className="ccDialog"
        aria-labelledby="cc-dialog-title"
        onClose={() => setActiveRoom(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        {activeRoom && (
          <div className="ccDialogContent">
            <button
              className="ccDialogClose"
              type="button"
              autoFocus
              onClick={() => dialog.current?.close()}
              aria-label="Fechar detalhes do ambiente"
            >
              ×
            </button>
            <Image
              src={activeRoom.image}
              alt={`Estudo ilustrativo de ${activeRoom.category}`}
              width={1536}
              height={1024}
              sizes="(max-width: 760px) 90vw, 65vw"
            />
            <div>
              <p className="ccEyebrow">
                {activeRoom.category} / ESTUDO ILUSTRATIVO
              </p>
              <h2 id="cc-dialog-title">{activeRoom.title}</h2>
              <p>{activeRoom.detail}</p>
              <ul>
                {activeRoom.choices.map((choice) => (
                  <li key={choice}>{choice}</li>
                ))}
              </ul>
              <small>
                Imagem gerada por IA para esta demonstração, não uma obra
                executada.
              </small>
            </div>
          </div>
        )}
      </dialog>
    </main>
  );
}
