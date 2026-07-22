# Jr Odontologia

Site institucional responsivo da Jr Odontologia, construído com Next.js 16, React 19, TypeScript, vinext/Vite e Cloudflare Workers. Não possui backend funcional, banco de dados, cadastro, agenda interna ou formulário; o contato é encaminhado ao WhatsApp.

## Executar

Requer Node.js 22.13+ e pnpm.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Verificação completa:

```bash
pnpm verify
pnpm audit --prod
```

## Configuração de conteúdo

Telefone, endereço, horários, profissionais, tratamentos, convênios, perguntas, links e SEO ficam centralizados em `app/site-config.ts`. Não espalhe dados de contato pelos componentes.

As imagens públicas ficam em `public/`. Antes de substituir arquivos, confirme licença, autorização de uso e dimensões adequadas. Imagens de pacientes exigem autorização documentada.

## Segurança e privacidade

Os cabeçalhos são definidos em `worker/index.ts`. O projeto não precisa de variáveis de ambiente nesta versão; veja `.env.example`. Não adicione chaves privadas ao navegador ou ao Git. Consulte `SECURITY.md`, `AUDITORIA-TECNICA.md` e `CHECKLIST-PUBLICACAO.md`.

Não há banner de cookies porque não existem ferramentas não essenciais ativas. Se analytics, marketing, formulários ou banco forem introduzidos, faça uma nova revisão LGPD antes de publicar.

## Supabase

O conteúdo institucional é armazenado no projeto Supabase `owpvdetxhzuwvtmhacdz`, na tabela `public.site_content`. A tabela contém somente clínica, profissionais, tratamentos, convênios e perguntas frequentes — nunca dados de pacientes, agenda ou prontuário.

Configure `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` conforme `.env.example`. Use apenas a chave publicável: nunca exponha `service_role`, `sb_secret` ou a senha do banco. O site consulta o conteúdo no servidor e usa `app/site-config.ts` como fallback seguro quando o Supabase estiver indisponível.

A tabela possui RLS ativa, política pública somente para leitura e nenhum `INSERT`, `UPDATE` ou `DELETE` concedido a visitantes. A migration correspondente está em `supabase/migrations/`.

## Publicação

O projeto contém `.openai/hosting.json` e é publicado pelo Sites/Cloudflare. Execute o checklist, gere o build e valide a URL publicada antes de divulgar. O código também pode ser versionado no GitHub, sem arquivos de ambiente ou segredos.
