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
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    document.documentElement.classList.add("reveal-ready");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -7% 0px" });
    items.forEach((item) => observer.observe(item));
    return () => { document.removeEventListener("keydown", close); observer.disconnect(); };
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
        <div className="hero-content" data-reveal>
          <p className="eyebrow"><span></span> Odontologia humanizada</p>
          <h1>Seu sorriso merece <em>cuidado por inteiro.</em></h1>
          <p className="hero-copy">Acolhimento, escuta e planejamento responsável em cada etapa do seu cuidado odontológico.</p>
          <div className="hero-actions"><WhatsAppLink /><a href="#tratamentos" className="button secondary">Conheça os tratamentos <span aria-hidden="true">↓</span></a></div>
          <p className="helper">O atendimento e a confirmação de disponibilidade acontecem pelo WhatsApp.</p>
          <ul className="trust-list" aria-label="Diferenciais em destaque"><li><b>01</b> Atendimento humanizado</li><li><b>02</b> Planejamento individual</li><li><b>03</b> Ambiente acolhedor</li></ul>
        </div>
        <div className="hero-visual smile-glass" data-reveal>
          <img src="/hero-smile.png" width="1024" height="1536" alt="Sorriso natural iluminado sobre fundo preto" fetchPriority="high" />
          <div className="glass-note"><span className="pulse" aria-hidden="true"></span><div><strong>Seu sorriso, sua história</strong><small>Cuidado próximo em todas as fases</small></div></div>
        </div>
      </section>

      <section className="section clinic-story" aria-labelledby="clinica-story-title">
        <div className="story-photo" data-reveal><img src="/clinic-team.png" width="1704" height="923" alt="Simulação visual da equipe da Jr Odontologia com três profissionais" loading="lazy" /><span>Imagem ilustrativa da equipe</span></div>
        <div className="story-copy" data-reveal><p className="eyebrow dark"><span></span> Três profissionais, um só cuidado</p><h2 id="clinica-story-title">Odontologia completa, feita por uma equipe que trabalha junto.</h2><p>Na Jr Odontologia, três cirurgiões-dentistas reúnem diferentes áreas de atuação para acompanhar prevenção, estética, reabilitação e urgências com uma visão integrada. Cada caso é conversado em equipe quando necessário, sempre com explicações claras e um plano adequado à realidade de cada pessoa.</p><div className="story-highlights"><div><strong>3</strong><span>profissionais atendendo na clínica</span></div><div><strong>1</strong><span>plano de cuidado coordenado</span></div><div><strong>360°</strong><span>visão integral do seu sorriso</span></div></div><WhatsAppLink label="Conhecer a clínica pelo WhatsApp" /></div>
      </section>

      <section className="section about" id="clinica">
        <div className="about-art" data-reveal aria-label="Composição visual da Jr Odontologia"><div className="arch"><span>Jr Odontologia</span><small>consultório em Cubatão</small></div></div>
        <div className="about-copy" data-reveal><p className="eyebrow dark"><span></span> Jr Odontologia</p><h2>Um espaço pensado para você se sentir bem.</h2><p>Atendimento próximo, ambiente organizado e cuidado odontológico para toda a família. As informações de localização e horários abaixo são uma simulação visual e precisam ser confirmadas pela clínica.</p><div className="values"><div><strong>Localização</strong><p>{siteConfig.clinic.address}<br />{siteConfig.clinic.neighborhood} · {siteConfig.clinic.city}</p><a href={siteConfig.clinic.mapUrl} target="_blank" rel="noopener noreferrer" className="mini-link">Veja no Google Maps ↗</a></div><div><strong>Horários de atendimento</strong><p>{siteConfig.clinic.hours}</p></div></div><a href="#equipe" className="text-link">Conheça os três profissionais <span aria-hidden="true">→</span></a></div>
      </section>

      <section className="section place-showcase" data-reveal>
        <div className="place-main"><p className="eyebrow"><span></span> Consultório odontológico em Cubatão</p><h2>Fácil de encontrar.<br />Bom de chegar.</h2><p>Uma localização central para receber pacientes de Cubatão e da Baixada Santista. Endereço e canais exibidos em caráter demonstrativo.</p><div className="place-actions"><a href={siteConfig.clinic.mapUrl} target="_blank" rel="noopener noreferrer" className="button primary">Visualizar no Google Maps ↗</a><WhatsAppLink label="Falar pelo WhatsApp" className="button secondary" /></div></div>
        <div className="place-grid"><div><span>Endereço</span><strong>{siteConfig.clinic.address}</strong><small>{siteConfig.clinic.neighborhood} · {siteConfig.clinic.city}</small></div><div><span>Instagram</span><strong>@jrodontologia.cubatao</strong><a href={siteConfig.clinic.instagram} target="_blank" rel="noopener noreferrer">Abrir perfil ↗</a></div><div><span>WhatsApp</span><strong>{siteConfig.clinic.phoneDisplay}</strong><small>Número real pendente</small></div><div className="map-tile"><span>Google Maps</span><strong>JR</strong><small>Cubatão · SP</small></div></div>
      </section>

      <section className="section treatments" id="tratamentos">
        <div className="section-heading split" data-reveal><div><p className="eyebrow"><span></span> Tratamentos</p><h2>Cuidado completo para cada fase do seu sorriso.</h2></div><p>As informações têm caráter educativo. A indicação de qualquer tratamento depende de avaliação profissional.</p></div>
        <div className="treatment-list">{siteConfig.treatments.map((item, i) => <article className="treatment-row" key={item.name} data-reveal><div className={`treatment-photo treatment-photo-${i % 4}`} role="img" aria-label={`Imagem ilustrativa de ${item.name}`}></div><div className="treatment-body"><span className="treatment-index">{String(i + 1).padStart(2, "0")}</span><h3>{item.name}</h3><p>{item.description}</p><WhatsAppLink treatment={item.name} label="Saiba mais pelo WhatsApp" className="card-link" /></div></article>)}</div>
      </section>

      <section className="results" aria-labelledby="resultados-title" data-reveal>
        <div className="results-heading"><p className="eyebrow dark"><span></span> Resultados</p><h2 id="resultados-title">Sorrisos que contam novas histórias.</h2><p>Imagens demonstrativas fornecidas para esta composição. A publicação exige autorização documentada dos pacientes e validação do responsável técnico. Resultados variam de pessoa para pessoa.</p></div>
        <div className="results-marquee" tabIndex={0} aria-label="Carrossel automático de resultados odontológicos; passe o mouse ou use o foco para pausar">
          <div className="results-track">{[0,1].map(loop => <div className="results-set" key={loop} aria-hidden={loop === 1}>{[0,1,2,3].map((index) => <figure className="result-card" key={`${loop}-${index}`}><div className={`result-image result-image-${index}`} role="img" aria-label={loop === 0 ? `Comparativo odontológico demonstrativo ${index + 1}` : undefined}></div><figcaption><span>0{index + 1}</span>Resultado demonstrativo</figcaption></figure>)}</div>)}</div>
        </div>
        <p className="results-note">O carrossel pausa ao receber foco ou ao passar o mouse.</p>
      </section>

      <section className="section team" id="equipe">
        <div className="section-heading" data-reveal><p className="eyebrow dark"><span></span> Nossa equipe</p><h2>Três profissionais, cuidado compartilhado.</h2><p className="section-intro">Composição demonstrativa solicitada para visualizar a equipe. Nomes, CROs, experiência e especialidades devem ser validados antes da publicação oficial.</p></div>
        <div className="team-grid">{siteConfig.professionals.map((person, i) => <article className={`team-card ${i === 0 ? "featured" : ""}`} key={i} data-reveal>{person.photo ? <div className="portrait-photo"><img src={person.photo} width="1024" height="1536" alt={`Modelo ilustrativo representando ${person.name}`} loading="lazy" /></div> : <div className="portrait-placeholder" aria-label="Fotografia profissional pendente"><span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span><small>Foto pendente</small></div>}<div><p className="status">SIMULAÇÃO · VALIDAR DADOS</p><h3>{person.name}</h3><p className="specialty">{person.specialty} · {person.cro}</p><p>{person.bio}</p>{"highlights" in person && person.highlights && <ul className="professional-highlights">{person.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>}{i === 0 && <WhatsAppLink treatment={`atendimento com ${person.name}`} label="Falar com a equipe" className="card-link" />}</div></article>)}</div>
      </section>

      <section className="section insurance" data-reveal><div><p className="eyebrow"><span></span> Convênios odontológicos</p><h2>Consulte a cobertura do seu plano.</h2><p>Operadoras abaixo são exemplos para composição visual. A rede credenciada e as condições precisam ser confirmadas com a clínica e com o convênio.</p><WhatsAppLink label="Pedir orçamento pelo WhatsApp" /></div><div className="insurance-logos">{["OdontoPrev", "Amil Dental", "SulAmérica Odonto", "Bradesco Dental", "Porto Odonto", "Uniodonto"].map(name => <span key={name}>{name}<small>simulação</small></span>)}</div></section>

      <section className="section testimonials" id="depoimentos" data-reveal>
        <div><p className="eyebrow"><span></span> Experiências reais</p><h2>A confiança dos pacientes merece responsabilidade.</h2></div>
        <div className="testimonial-empty"><span aria-hidden="true">“</span><p>Esta área será publicada quando a clínica fornecer avaliações autorizadas ou um link para avaliações públicas verificáveis.</p><small>Nenhum depoimento foi inventado e nenhuma informação de saúde é exibida.</small></div>
      </section>

      <section className="section faq" id="duvidas" data-reveal>
        <div className="section-heading"><p className="eyebrow dark"><span></span> Dúvidas frequentes</p><h2>Informação clara antes do primeiro contato.</h2></div>
        <div className="faq-list">{siteConfig.faqs.map((faq, i) => <details key={faq.question}><summary><span>{String(i + 1).padStart(2, "0")}</span>{faq.question}<i aria-hidden="true">+</i></summary><p>{faq.answer}</p></details>)}</div>
      </section>

      <section className="section contact" id="contato" data-reveal>
        <div className="contact-copy"><p className="eyebrow"><span></span> Vamos conversar?</p><h2>O próximo passo começa com uma mensagem.</h2><p>Conte à equipe como podemos orientar você. Nenhum dado é coletado neste site: a conversa acontece diretamente no WhatsApp.</p><WhatsAppLink label="Iniciar conversa no WhatsApp" /><small>Clicar não reserva horário. A equipe confirmará o atendimento pelo aplicativo.</small></div>
        <div className="contact-card"><div><span>Endereço</span><strong>{siteConfig.clinic.address}</strong><small>{siteConfig.clinic.neighborhood} · {siteConfig.clinic.city}</small></div><div><span>Atendimento</span><strong>{siteConfig.clinic.hours}</strong></div><div><span>Contato</span><strong>{siteConfig.clinic.phoneDisplay}</strong><small>{siteConfig.clinic.email}</small></div>{siteConfig.clinic.mapUrl ? <a href={siteConfig.clinic.mapUrl} target="_blank" rel="noopener noreferrer" className="text-link light">Abrir no mapa ↗</a> : <span className="map-pending">Mapa disponível após configurar o endereço</span>}</div>
      </section>
    </main>

    <footer><div className="footer-main"><a href="#inicio" className="footer-logo"><img src="/logo-jr.png" width="120" height="120" alt="Jr Odontologia" loading="lazy" /></a><div><span>Navegação</span>{nav.slice(0, 4).map(([label, href]) => <a key={href} href={href}>{label}</a>)}</div><div><span>Informações</span><a href="/privacidade">Política de Privacidade</a><a href="/termos">Termos de Uso</a><p>{siteConfig.clinic.technicalLead}</p></div></div><div className="footer-bottom"><p>© {new Date().getFullYear()} {siteConfig.clinic.name}. Todos os direitos reservados.</p><p>Conteúdo sujeito à revisão do responsável técnico antes da publicação.</p></div></footer>
    <WhatsAppLink label="WhatsApp" className="floating-whatsapp" />
  </>;
}
