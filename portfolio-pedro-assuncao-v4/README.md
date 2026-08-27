# Portfólio — Pedro Assunção

Portfólio pessoal de frontend e segurança web. O projeto apresenta trabalhos selecionados, tecnologias e um formulário de contato sem expor o endereço de destino no navegador.

## Principais recursos

- conteúdo em português, inglês e espanhol, com preferência salva no navegador;
- página de projetos com links para as demonstrações e para o código-fonte;
- layout responsivo, navegação por teclado e suporte a redução de movimento;
- formulário validado no cliente e no servidor;
- envio de e-mail pela API do Resend, executado somente no servidor;
- metadados para buscadores e compartilhamento social;
- headers HTTP básicos de segurança configurados no Next.js.

## Tecnologias

- Next.js 16 e React 19;
- TypeScript;
- CSS;
- API do Resend.

## Executar localmente

Requer Node.js 20.9 ou mais recente.

~~~bash
npm install
npm run dev
~~~

Acesse http://localhost:3000. No Windows, o arquivo INICIAR_SITE.bat executa a mesma rotina.

## Variáveis de ambiente

Copie .env.example para .env.local e preencha:

| Variável | Uso |
| --- | --- |
| RESEND_API_KEY | chave privada usada pela rota de contato |
| CONTACT_EMAIL | endereço que recebe as mensagens |
| CONTACT_FROM | remetente autorizado no Resend |
| NEXT_PUBLIC_SITE_URL | URL pública usada nos metadados; opcional na Vercel |

.env.local é ignorado pelo Git. Não publique chaves ou endereços privados no repositório.

## Verificação

~~~bash
npm run check
npm run build
~~~

## Como o contato funciona

O navegador envia nome, e-mail, mensagem e um campo antispam para /api/contact. A rota limita o tamanho da requisição, valida os campos e chama o Resend com as credenciais do servidor. O endereço em CONTACT_EMAIL nunca é enviado ao cliente.

Esse controle reduz abuso simples, mas não substitui rate limiting ou uma camada antispam dedicada em aplicações com maior volume.

## Projetos apresentados

1. [Prótese Capilar](https://github.com/pedroassunncao/projeto-protese-capilar) — landing page demonstrativa para serviços.
2. [Nexus Dashboard](https://github.com/pedroassunncao/projeto-02-nexus-dashboard) — interface SaaS com dados simulados.
3. [Sentinel Web Security Lab](https://github.com/pedroassunncao/projeto-03-web-security-lab) — laboratório visual e defensivo.

## Estrutura

~~~text
app/
  api/contact/route.ts   # validação e envio do formulário
  projetos/              # apresentação dos projetos
  globals.css            # estilos globais e responsividade
  layout.tsx             # metadados e estrutura do documento
  page.tsx               # página principal e traduções
public/
  og.png                 # imagem de compartilhamento
next.config.ts           # configuração e headers HTTP
~~~

## Licença e uso

Projeto de portfólio. O conteúdo pessoal e a identidade visual não são oferecidos como template ou material de marca para terceiros.
