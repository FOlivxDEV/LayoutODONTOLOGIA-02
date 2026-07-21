"use client";
/* eslint-disable @next/next/no-img-element -- vinext local image optimizer requires an ASSETS binding unavailable in development; assets are local, dimensioned and deployment-safe. */

import { useEffect, useState } from "react";
import { getWhatsAppUrl, siteConfig } from "../site-config";

const nav = [
  ["Início", "#inicio"], ["Clínica", "#clinica"], ["Tratamentos", "#tratamentos"],
  ["Equipe", "#equipe"], ["Depoimentos", "#depoimentos"], ["Dúvidas", "#duvidas"], ["Contato", "#contato"],
] as const;

function trackConversion(context: string) {
  window.dispatchEvent(new CustomEvent("whatsapp_click", { detail: { context } }));
}

function WhatsAppLink({ label = "Agendar pelo WhatsApp", treatment, className = "button primary" }: { label?: string; treatment?: string; className?: string }) {
  const message = treatment ? siteConfig.whatsapp.treatmentMessage(treatment) : siteConfig.whatsapp.defaultMessage;
  const href = getWhatsAppUrl(message);
  if (!href && className === "floating-whatsapp") return null;
  if (!href) return <span className={`${className} disabled`} aria-disabled="true" title="Configure o WhatsApp em app/site-config.ts">WhatsApp em configuração</span>;
  return <a className={className} href={href} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion(treatment ?? "geral")}>{label}<span aria-hidden="true"> ↗</span></a>;
}

export function SiteShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, []);

  return <>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header className="site-header">
      <a href="#inicio" className="brand" aria-label="Jr Odontologia — início">
        <img src="/logo-jr.png" width="96" height="96" alt="Jr Odontologia" />
      </a>
      <nav id="main-nav" className={menuOpen ? "nav open" : "nav"} aria-label="Navegação principal">
        {nav.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        <WhatsAppLink className="button primary nav-cta" />
      </nav>
      <button className="menu-button" aria-expanded={menuOpen} aria-controls="main-nav" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} onClick={() => setMenuOpen(v => !v)}>
        <span></span><span></span><span></span>
      </button>
    </header>

    <main id="conteudo">
      <section className="hero" id="inicio">
        <div className="orb orb-one" aria-hidden="true"></div><div className="orb orb-two" aria-hidden="true"></div>
        <div className="hero-content">
          <p className="eyebrow"><span></span> Odontologia humanizada</p>
          <h1>Seu sorriso merece <em>cuidado por inteiro.</em></h1>
          <p className="hero-copy">Acolhimento, escuta e planejamento responsável em cada etapa do seu cuidado odontológico.</p>
          <div className="hero-actions"><WhatsAppLink /><a href="#tratamentos" className="button secondary">Conheça os tratamentos <span aria-hidden="true">↓</span></a></div>
          <p className="helper">O atendimento e a confirmação de disponibilidade acontecem pelo WhatsApp.</p>
          <ul className="trust-list" aria-label="Diferenciais em destaque"><li><b>01</b> Atendimento humanizado</li><li><b>02</b> Planejamento individual</li><li><b>03</b> Ambiente acolhedor</li></ul>
        </div>
        <div className="hero-visual">
          <img src="/clinic-hero.png" width="1536" height="1024" alt="Ambiente odontológico contemporâneo, claro e acolhedor" fetchPriority="high" />
          <div className="glass-note"><span className="pulse" aria-hidden="true"></span><div><strong>Cuidado com calma</strong><small>Cada pessoa é recebida com atenção</small></div></div>
        </div>
      </section>

      <section className="section differentiators" aria-labelledby="diferenciais-title">
        <div className="section-heading"><p className="eyebrow dark"><span></span> Nosso jeito de cuidar</p><h2 id="diferenciais-title">Confiança se constrói nos detalhes.</h2></div>
        <div className="feature-grid">
          {[
            ["01", "Atendimento humanizado", "Escuta atenta, explicações claras e respeito às suas necessidades."],
            ["02", "Profissionais qualificados", "Equipe apresentada com formação e registros verificáveis."],
            ["03", "Tecnologia e conforto", "Recursos escolhidos para apoiar precisão e uma experiência tranquila."],
            ["04", "Biossegurança", "Rotinas de higiene e proteção alinhadas às boas práticas odontológicas."],
            ["05", "Cuidado personalizado", "Cada plano é definido após avaliação profissional individual."],
            ["06", "Acesso facilitado", "Localização e condições de acesso serão informadas após validação."],
          ].map(([n, title, text]) => <article className="feature-card" key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="section about" id="clinica">
        <div className="about-art" aria-label="Espaço reservado para fotografias autorizadas da clínica"><div className="arch"><span>Fotografias da clínica</span><small>conteúdo pendente</small></div></div>
        <div className="about-copy"><p className="eyebrow dark"><span></span> A clínica</p><h2>Um espaço pensado para você se sentir bem.</h2><p>A Jr Odontologia acredita que um bom atendimento começa antes do procedimento: na forma de ouvir, explicar e acolher. Esta apresentação institucional é provisória e deve ser revisada pela clínica antes da publicação.</p><div className="values"><div><strong>Missão</strong><p>Promover cuidado odontológico responsável, próximo e compreensível.</p></div><div><strong>Valores</strong><p>Ética, respeito, transparência, biossegurança e atenção individual.</p></div></div><a href="#equipe" className="text-link">Conheça quem cuida de você <span aria-hidden="true">→</span></a></div>
      </section>

      <section className="section treatments" id="tratamentos">
        <div className="section-heading split"><div><p className="eyebrow"><span></span> Possibilidades de cuidado</p><h2>Tratamentos para cada fase do seu sorriso.</h2></div><p>As informações têm caráter educativo. A indicação de qualquer tratamento depende de avaliação profissional.</p></div>
        <div className="treatment-grid">{siteConfig.treatments.map((item, i) => <article className="treatment-card" key={item.name}><div className="treatment-top"><span className="treatment-icon" aria-hidden="true">{item.icon}</span><span className="treatment-index">{String(i + 1).padStart(2, "0")}</span></div><h3>{item.name}</h3><p>{item.description}</p><WhatsAppLink treatment={item.name} label="Falar sobre este cuidado" className="card-link" /></article>)}</div>
      </section>

      <section className="section team" id="equipe">
        <div className="section-heading"><p className="eyebrow dark"><span></span> Nossa equipe</p><h2>Profissionais apresentados com transparência.</h2><p className="section-intro">Os dados abaixo são marcadores neutros. Nomes, fotografias, especialidades e CROs devem ser fornecidos e aprovados pela clínica.</p></div>
        <div className="team-grid">{siteConfig.professionals.map((person, i) => <article className="team-card" key={i}><div className="portrait-placeholder" aria-label="Fotografia profissional pendente"><span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span><small>Foto pendente</small></div><div><p className="status">DADOS A CONFIRMAR</p><h3>{person.name}</h3><p className="specialty">{person.specialty} · {person.cro}</p><p>{person.bio}</p></div></article>)}</div>
      </section>

      <section className="section testimonials" id="depoimentos">
        <div><p className="eyebrow"><span></span> Experiências reais</p><h2>A confiança dos pacientes merece responsabilidade.</h2></div>
        <div className="testimonial-empty"><span aria-hidden="true">“</span><p>Esta área será publicada quando a clínica fornecer avaliações autorizadas ou um link para avaliações públicas verificáveis.</p><small>Nenhum depoimento foi inventado e nenhuma informação de saúde é exibida.</small></div>
      </section>

      <section className="section faq" id="duvidas">
        <div className="section-heading"><p className="eyebrow dark"><span></span> Dúvidas frequentes</p><h2>Informação clara antes do primeiro contato.</h2></div>
        <div className="faq-list">{siteConfig.faqs.map((faq, i) => <details key={faq.question}><summary><span>{String(i + 1).padStart(2, "0")}</span>{faq.question}<i aria-hidden="true">+</i></summary><p>{faq.answer}</p></details>)}</div>
      </section>

      <section className="section contact" id="contato">
        <div className="contact-copy"><p className="eyebrow"><span></span> Vamos conversar?</p><h2>O próximo passo começa com uma mensagem.</h2><p>Conte à equipe como podemos orientar você. Nenhum dado é coletado neste site: a conversa acontece diretamente no WhatsApp.</p><WhatsAppLink label="Iniciar conversa no WhatsApp" /><small>Clicar não reserva horário. A equipe confirmará o atendimento pelo aplicativo.</small></div>
        <div className="contact-card"><div><span>Endereço</span><strong>{siteConfig.clinic.address}</strong><small>{siteConfig.clinic.neighborhood} · {siteConfig.clinic.city}</small></div><div><span>Atendimento</span><strong>{siteConfig.clinic.hours}</strong></div><div><span>Contato</span><strong>{siteConfig.clinic.phoneDisplay}</strong><small>{siteConfig.clinic.email}</small></div>{siteConfig.clinic.mapUrl ? <a href={siteConfig.clinic.mapUrl} target="_blank" rel="noopener noreferrer" className="text-link light">Abrir no mapa ↗</a> : <span className="map-pending">Mapa disponível após configurar o endereço</span>}</div>
      </section>
    </main>

    <footer><div className="footer-main"><a href="#inicio" className="footer-logo"><img src="/logo-jr.png" width="120" height="120" alt="Jr Odontologia" loading="lazy" /></a><div><span>Navegação</span>{nav.slice(0, 4).map(([label, href]) => <a key={href} href={href}>{label}</a>)}</div><div><span>Informações</span><a href="/privacidade">Política de Privacidade</a><a href="/termos">Termos de Uso</a><p>{siteConfig.clinic.technicalLead}</p></div></div><div className="footer-bottom"><p>© {new Date().getFullYear()} {siteConfig.clinic.name}. Todos os direitos reservados.</p><p>Conteúdo sujeito à revisão do responsável técnico antes da publicação.</p></div></footer>
    <WhatsAppLink label="WhatsApp" className="floating-whatsapp" />
  </>;
}
