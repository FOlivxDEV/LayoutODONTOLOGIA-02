# Segurança

## Arquitetura atual

O site é estático/institucional, sem autenticação, formulários, API própria, banco de dados, uploads ou painel administrativo. O contato ocorre por links para o WhatsApp. Não envie prontuários, dados clínicos ou credenciais para este repositório.

## Relato de vulnerabilidade

Não publique detalhes sensíveis em uma issue pública. Contate o mantenedor do repositório por um canal privado e informe a rota, o impacto e passos mínimos de reprodução. O canal definitivo de segurança da clínica ainda deve ser confirmado.

## Controles

- Cabeçalhos de segurança são aplicados no Worker, incluindo CSP, HSTS, proteção contra incorporação, política de referenciador e permissões restritivas.
- Links externos abertos em nova aba usam `noopener noreferrer`.
- Não existem segredos necessários no cliente. `.env.example` não contém valores reais.
- A CSP mantém `unsafe-inline` para scripts e estilos por compatibilidade com o runtime Next.js/vinext; essa exceção deve ser reavaliada quando o runtime oferecer nonces/hashes estáveis.
- Dependências devem ser verificadas com `pnpm audit --prod` e pelo fluxo `pnpm verify` antes de publicar.

## Evoluções futuras

Qualquer formulário, login, agenda, banco ou integração clínica exige nova análise de ameaça, minimização de dados, validação no servidor, controle de acesso, auditoria, retenção, backup e revisão LGPD antes da implementação.
