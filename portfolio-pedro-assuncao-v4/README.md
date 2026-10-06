# Pedro Assunção — Criação de sites

Site comercial para apresentar serviços de criação de sites, mostrar projetos e iniciar pedidos de orçamento pelo WhatsApp. O foco é atender profissionais e pequenos negócios, com linguagem direta e sem posicionamento de cibersegurança.

## O que o site oferece

- apresentação de landing pages, sites institucionais e redesign;
- portfólio com capturas reais das demonstrações e páginas individuais de projeto;
- explicação das etapas de contratação e perguntas frequentes;
- formulário de orçamento que prepara uma mensagem para o WhatsApp;
- contato direto com Pedro pelo número **(71) 98199-1535**;
- navegação responsiva, campos com rótulos, validação, foco por teclado e respeito à preferência de movimento reduzido;
- identidade escura em vinho e rosa, fundos sutis em movimento e uma faixa animada;
- fontes hospedadas no próprio projeto, imagens otimizadas e metadados de compartilhamento.

Há um controle para pausar as animações. O site também gera URLs canônicas, `robots.txt` e `sitemap.xml` usando o endereço público configurado.

O portfólio apresenta projetos **conceituais**, não trabalhos contratados ou resultados de clientes. As fotografias da demonstração de prótese capilar são ilustrativas; os indicadores do dashboard usam dados simulados.

## Executar localmente

Requer Node.js 20.9 ou mais recente. Execute os comandos nesta pasta, que contém `package.json`:

```bash
npm install
npm run dev
```

Acesse http://localhost:3000. No Windows, `INICIAR_SITE.bat` inicia o ambiente local.

## Verificar e preparar para publicação

```bash
npm run check
npm run build
npm start
```

Na Vercel, configure a pasta que contém este README como raiz do projeto. Defina `NEXT_PUBLIC_SITE_URL` com o endereço público completo, incluindo `https://`. Quando essa variável não está definida, o projeto usa o domínio de produção fornecido pela Vercel ou `http://localhost:3000` em desenvolvimento.

## Como o orçamento funciona

O visitante informa nome, negócio, serviço, prazo e uma descrição. Endereço do site atual e investimento previsto são opcionais. Ao continuar, o site abre `https://wa.me/5571981991535` com uma mensagem preparada e codificada na URL.

**A mensagem não é enviada automaticamente.** O visitante revisa e confirma o envio no WhatsApp. Se a abertura da janela for bloqueada, aparece um link para abrir a conversa novamente. O formulário não usa um serviço de e-mail, não calcula preços e não armazena os dados em um banco.

O telefone é público por definição. A mensagem preenchida é incluída no link entregue ao WhatsApp. Para mudar o número, edite `contactNumber` e `contactDisplay` em `lib/site.ts`; a imagem social usa o mesmo contato.

## Conteúdo e projetos

`lib/site.ts` concentra os serviços, os dados dos projetos e os links. Textos da página principal, processo e perguntas frequentes ficam em `app/page.tsx`.

- [Prótese Capilar](https://github.com/pedroassunncao/projeto-protese-capilar): landing page conceitual, em `/projetos/protese-capilar`.
- [Nexus Dashboard](https://github.com/pedroassunncao/projeto-02-nexus-dashboard): estudo de interface de gestão, em `/projetos/nexus-dashboard`.

As capturas desktop e mobile ficam em `public/projects`. Atualize-as quando as demonstrações mudarem. Os links antigos `?projeto=1` e `?projeto=2` redirecionam para as novas apresentações. O antigo estudo Sentinel continua acessível pelo link de arquivo em `/projetos?projeto=3`, mas não é divulgado como serviço comercial.

## Variáveis de ambiente e rota anterior

O novo contato por WhatsApp funciona sem chave de API. `NEXT_PUBLIC_SITE_URL` é a configuração pública dos metadados.

A rota anterior `/api/contact` foi preservada, mas não é chamada pelo formulário atual. Somente para usar essa integração de e-mail, configure no servidor:

| Variável         | Uso                            |
| ---------------- | ------------------------------ |
| `RESEND_API_KEY` | Chave privada do Resend        |
| `CONTACT_EMAIL`  | Destinatário privado           |
| `CONTACT_FROM`   | Remetente autorizado no Resend |

Use `.env.example` como referência. `.env.local` não deve ser publicado. A integração antiga valida os campos e limita o corpo da requisição, mas não substitui controles de abuso para serviços públicos com maior volume.

## Estrutura

```text
app/
  page.tsx                  Página comercial e formulário
  globals.css               Identidade visual e responsividade
  layout.tsx                Metadados e estrutura do documento
  opengraph-image.tsx        Imagem de compartilhamento
  not-found.tsx             Página de endereço não encontrado
  projetos/page.tsx         Lista do portfólio e links antigos
  projetos/[slug]/page.tsx   Apresentação individual de cada projeto
  api/contact/route.ts      Integração de e-mail anterior
lib/site.ts                 Serviços, projetos e WhatsApp
public/projects/             Capturas das demonstrações
public/fonts/                Fontes e licença SIL OFL 1.1
next.config.ts               Configuração e headers HTTP
```

Tecnologias: Next.js 16, React 19, TypeScript e CSS. Sem biblioteca de animação ou dependência de formulário externa.

## Licença e uso

Projeto pessoal de Pedro Assunção. O conteúdo pessoal e a identidade visual não são oferecidos como template de marca para terceiros. DM Sans e Manrope são distribuídas sob a licença SIL Open Font License 1.1, incluída em `public/fonts/OFL.txt`.
