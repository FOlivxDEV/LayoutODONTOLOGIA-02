# Jr Odontologia

Site institucional estático, responsivo e sem coleta de dados, construído com React, Next.js (App Router), TypeScript, vinext e Cloudflare Workers.

## Configuração

Todas as informações editáveis ficam em `app/site-config.ts`: nome, telefone, WhatsApp, endereço, horários, equipe, tratamentos, dúvidas e SEO. O WhatsApp deve usar apenas números, com DDI e DDD.

Substitua `public/logo-jr.png` e `public/clinic-hero.png` quando houver arquivos finais autorizados. Revise todos os textos marcados como pendentes com o responsável técnico antes da publicação.

## Execução

```bash
pnpm install
pnpm dev
```

Validação completa:

```bash
pnpm lint
pnpm test
pnpm build
```

## Privacidade e analytics

Não há formulários, banco, autenticação, cookies não essenciais ou analytics. Cliques em WhatsApp emitem apenas o evento local `whatsapp_click`, sem mensagem ou dado pessoal. Se uma ferramenta de analytics for adicionada, conecte-se a esse evento somente após avaliar a necessidade de consentimento e nunca envie conteúdo clínico.

## Publicação

O projeto está configurado para Cloudflare Workers via Sites. HTTPS e os cabeçalhos de segurança são aplicados pela plataforma e pelo `worker/index.ts`. Antes de publicar, configure o domínio real em `app/site-config.ts` e revise a Política de Privacidade para refletir a hospedagem escolhida.
