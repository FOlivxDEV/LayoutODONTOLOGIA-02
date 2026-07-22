# Segurança

## Arquitetura atual

O site é institucional, sem autenticação, formulários, API própria, uploads ou painel administrativo. O Supabase armazena somente conteúdo público configurável. O contato ocorre por links para o WhatsApp. Não envie prontuários, dados clínicos ou credenciais para este repositório ou para `site_content`.

## Relato de vulnerabilidade

Não publique detalhes sensíveis em uma issue pública. Contate o mantenedor do repositório por um canal privado e informe a rota, o impacto e passos mínimos de reprodução. O canal definitivo de segurança da clínica ainda deve ser confirmado.

## Controles

- Cabeçalhos de segurança são aplicados no Worker, incluindo CSP, HSTS, proteção contra incorporação, política de referenciador e permissões restritivas.
- Links externos abertos em nova aba usam `noopener noreferrer`.
- Não existem segredos necessários no cliente. `.env.example` não contém valores reais.
- A chave publicável do Supabase pode ser usada no cliente/servidor público; chaves `service_role`, `sb_secret` e senhas de banco são proibidas no repositório e em variáveis `NEXT_PUBLIC_*`.
- A tabela `site_content` tem RLS ativa e somente `SELECT` para `anon`/`authenticated`; alterações são administrativas.
- A CSP mantém `unsafe-inline` para scripts e estilos por compatibilidade com o runtime Next.js/vinext; essa exceção deve ser reavaliada quando o runtime oferecer nonces/hashes estáveis.
- Dependências devem ser verificadas com `pnpm audit --prod` e pelo fluxo `pnpm verify` antes de publicar.

## Evoluções futuras

Qualquer formulário, login, agenda, banco ou integração clínica exige nova análise de ameaça, minimização de dados, validação no servidor, controle de acesso, auditoria, retenção, backup e revisão LGPD antes da implementação.
