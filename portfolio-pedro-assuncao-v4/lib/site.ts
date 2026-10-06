export const contactNumber = "5571981991535";
export const contactDisplay = "(71) 98199-1535";

export function whatsappUrl(
  message = "Olá, Pedro! Gostaria de conversar sobre um site para o meu negócio.",
) {
  return `https://wa.me/${contactNumber}?text=${encodeURIComponent(message)}`;
}

export const services = [
  {
    id: "landing",
    title: "Landing page",
    subtitle: "Um serviço. Uma página. Um caminho para o contato.",
    description:
      "Para divulgar seu atendimento, um serviço específico ou uma campanha. Tudo o que o visitante precisa saber em uma página bem organizada.",
    items: [
      "Apresentação do serviço",
      "Perguntas frequentes",
      "Contato pelo WhatsApp",
    ],
  },
  {
    id: "institucional",
    title: "Site institucional",
    subtitle: "Seu negócio apresentado com o cuidado que merece.",
    description:
      "Para mostrar sua empresa, os serviços que oferece e como você trabalha. Uma presença própria que complementa suas redes sociais.",
    items: [
      "Páginas de serviços e sobre",
      "Portfólio ou galeria",
      "Informações de contato",
    ],
  },
  {
    id: "redesign",
    title: "Redesign de site",
    subtitle: "Uma nova fase para o site que você já tem.",
    description:
      "Para quem tem um site desatualizado ou difícil de usar no celular. Reviso a estrutura, a apresentação e o caminho até o contato.",
    items: [
      "Revisão da experiência atual",
      "Novo visual e conteúdo",
      "Ajustes para celular",
    ],
  },
] as const;

export const projects = [
  {
    slug: "protese-capilar",
    title: "Pamela Dantas",
    category: "Beleza & atendimento",
    type: "Landing page",
    theme: "gold",
    cover: "/projects/capilar-desktop.png",
    mobile: "/projects/capilar-mobile.png",
    live: "https://projeto-protese-capilar-alpha.vercel.app/",
    github: "https://github.com/pedroassunncao/projeto-protese-capilar",
    summary:
      "Um serviço apresentado com calma, personalidade e um caminho claro até o contato.",
    intro:
      "Landing page conceitual para um serviço de prótese capilar. O projeto reúne apresentação, etapas do atendimento, imagens ilustrativas e respostas às dúvidas mais comuns.",
    challenge:
      "Organizar as informações que alguém procura antes de conversar sobre o serviço: como funciona, quais cuidados exige e o que acontece em cada etapa.",
    solution:
      "Uma página com sequência simples, identidade em preto e dourado, fotografia em destaque e atalhos para contato. O conteúdo vai da apresentação às perguntas frequentes, sem obrigar o visitante a procurar a informação.",
    features: [
      "Apresentação rotativa com controles de pausa",
      "Etapas de avaliação, aplicação e manutenção",
      "Perguntas frequentes expansíveis",
      "Contato configurável pelo WhatsApp",
    ],
    note: "Projeto conceitual para portfólio. As fotografias são ilustrativas e não representam clientes ou resultados reais. O contato da demonstração fica desativado até a configuração do número.",
  },
  {
    slug: "nexus-dashboard",
    title: "Nexus Dashboard",
    category: "Gestão & produto digital",
    type: "Interface de gestão",
    theme: "wine",
    cover: "/projects/nexus-desktop.png",
    mobile: "/projects/nexus-mobile.png",
    live: "https://projeto-02-nexus-dashboard.vercel.app/",
    github: "https://github.com/pedroassunncao/projeto-02-nexus-dashboard",
    summary:
      "Projetos, indicadores e atividades reunidos em uma interface fácil de consultar.",
    intro:
      "Estudo de interface para um painel de gestão. O objetivo é mostrar como informações de um produto podem ser apresentadas com hierarquia, organização e boa leitura em diferentes telas.",
    challenge:
      "Dar espaço a diferentes tipos de informação — projetos, indicadores, gráficos e atividades — sem perder a clareza da navegação.",
    solution:
      "Um painel com navegação por áreas, pesquisa e componentes organizados por prioridade. Gráficos e tabelas ajudam a consultar as informações, com adaptações para telas pequenas.",
    features: [
      "Navegação entre áreas do painel",
      "Pesquisa e filtros de projetos",
      "Gráficos e indicadores de demonstração",
      "Notificações e estados interativos",
    ],
    note: "Projeto conceitual com dados locais e simulados. Os indicadores não são resultados de clientes. A demonstração não se conecta a um sistema de gestão real.",
  },
] as const;

export type PortfolioProject = (typeof projects)[number];
