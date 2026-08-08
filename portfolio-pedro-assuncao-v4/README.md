# Portfólio — Pedro Assunção

Portfólio pessoal em Next.js, com foco em desenvolvimento frontend e cibersegurança.

## 1. Instale no Windows

- Node.js LTS
- Visual Studio Code
- Git for Windows

## 2. Abra o projeto

Extraia a pasta e abra no VS Code. Você também pode clicar com o botão direito na pasta e escolher **Abrir com Code**.

## 3. Instale as dependências

No terminal do VS Code:

```bash
npm install
```

## 4. Rode o site

```bash
npm run dev
```

Abra http://localhost:3000 no navegador.

Você também pode usar `INICIAR_SITE.bat` para instalar as dependências na primeira execução e iniciar o servidor automaticamente.

## 5. Formulário de contato sem expor seu e-mail

O formulário envia Nome + E-mail + Mensagem para uma rota interna do Next.js (`/api/contact`). Seu endereço particular fica em uma variável de ambiente do servidor e **não aparece no HTML nem no JavaScript enviado ao visitante**.

A implementação usa a API do Resend diretamente no servidor, sem biblioteca extra.

### Configuração local

> Nesta versão, o arquivo `.env.local` já foi criado com o endereço privado de recebimento informado por você. Ele está coberto pelo `.gitignore`; não remova essa proteção. Falta apenas adicionar sua `RESEND_API_KEY`.

1. Crie uma conta no Resend e gere uma API Key.
2. Duplique `.env.example` e renomeie a cópia para `.env.local`.
3. Preencha:

```env
RESEND_API_KEY=re_sua_chave
CONTACT_EMAIL=seu-email-privado@exemplo.com
CONTACT_FROM=Portfolio Pedro <onboarding@resend.dev>
```

**Nunca envie `.env.local` para o GitHub.** O `.gitignore` deste projeto já bloqueia arquivos `.env`.

### Configuração na Vercel

No projeto da Vercel, vá em **Settings → Environment Variables** e crie estas variáveis:

- `RESEND_API_KEY`
- `CONTACT_EMAIL`
- `CONTACT_FROM`

Depois faça um novo deploy.

Enquanto estiver testando, você pode usar `onboarding@resend.dev` como remetente conforme as regras da sua conta do Resend. Quando seu domínio estiver configurado, prefira um remetente do próprio domínio, por exemplo:

```text
Portfolio Pedro <contato@pedroassuncao.com.br>
```

O visitante nunca vê `CONTACT_EMAIL`. O e-mail informado por ele é configurado como `reply_to`, então você pode responder diretamente à mensagem recebida.

## 6. Proteções do formulário

- validação no navegador e novamente no servidor;
- limite de tamanho dos campos;
- campo honeypot invisível para reduzir spam automatizado;
- a chave do serviço de e-mail fica apenas no servidor;
- mensagem enviada em texto simples, sem renderizar HTML fornecido pelo visitante.

## 7. O que editar

- `app/page.tsx` — textos, idiomas, projetos, links e tecnologias.
- `app/globals.css` — cores, tamanhos, animações, formulário e responsividade.
- `app/api/contact/route.ts` — envio seguro das mensagens do formulário.
- `app/layout.tsx` — título e descrição do navegador/buscadores.

## 8. Dados que ainda faltam

Pesquise dentro de `app/page.tsx` por `href="#"` e substitua pelos links reais dos seus projetos, GitHub e LinkedIn.

Os três projetos atuais ainda são exemplos de conteúdo.
