import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("centraliza e protege os links de WhatsApp", async () => {
  const [config, shell] = await Promise.all([
    readFile(new URL("../app/site-config.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/components/SiteShell.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(config, /encodeURIComponent/);
  assert.match(config, /whatsapp:\s*"5513991879892"/);
  assert.match(config, /orçamento odontológico/);
  assert.match(shell, /rel="noopener noreferrer"/);
  assert.doesNotMatch(shell, /https:\/\/wa\.me\/\d+/);
});

test("não inclui coleta de dados ou formulários", async () => {
  const shell = await readFile(new URL("../app/components/SiteShell.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(shell, /<form|<input|localStorage|sessionStorage|dangerouslySetInnerHTML/i);
});

test("inclui metadados, rotas legais e segurança", async () => {
  const [layout, worker, privacy] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../worker/index.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/privacidade/page.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(layout, /pt-BR/);
  assert.match(worker, /Content-Security-Policy/);
  assert.match(worker, /X-Content-Type-Options/);
  assert.match(privacy, /Política de Privacidade/);
});

test("integra conteúdo institucional ao Supabase com fallback seguro", async () => {
  const [loader, migration, envExample] = await Promise.all([
    readFile(new URL("../app/supabase-content.ts", import.meta.url), "utf8"),
    readFile(new URL("../supabase/migrations/20260722163757_create_public_site_content.sql", import.meta.url), "utf8"),
    readFile(new URL("../.env.example", import.meta.url), "utf8"),
  ]);
  assert.match(loader, /NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY/);
  assert.match(loader, /return null/);
  assert.match(migration, /enable row level security/i);
  assert.match(migration, /grant select/i);
  assert.doesNotMatch(envExample, /service_role\s*=/i);
  assert.doesNotMatch(envExample, /sb_secret_[A-Za-z0-9_-]+/);
});
