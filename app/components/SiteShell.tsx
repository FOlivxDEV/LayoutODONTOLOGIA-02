"use client";
/* eslint-disable @next/next/no-img-element -- vinext local image optimizer requires an ASSETS binding unavailable in development; assets are local, dimensioned and deployment-safe. */

import { useEffect, useState } from "react";
import { getWhatsAppUrl, siteConfig } from "../site-config";

const nav = [
  ["Início", "#inicio"], ["Clínica", "#clinica"], ["Tratamentos", "#tratamentos"],
  ["Equipe", "#equipe"], ["Convênios", "#convenios"], ["Dúvidas", "#duvidas"], ["Contato", "#contato"],
] as const;

function trackConversion(context: string) {
  window.dispatchEvent(new CustomEvent("whatsapp_click", { detail: { context } }));
}

function WhatsAppLink({ label = "Agendar pelo WhatsApp", treatment, className = "button primary" }: { label?: string; treatment?: string; className?: string }) {
  const message = treatment ? siteConfig.whatsapp.treatmentMessage(treatment) : siteConfig.whatsapp.defaultMessage;
  const href = getWhatsAppUrl(message);
  if (!href && className === "floating-whatsapp") return null;
  if (!href) return <span className={`${className} disabled`} aria-disabled="true" title="Configure o WhatsApp em app/site-config.ts">WhatsApp em configuração</span>;
  if (className === "floating-whatsapp") return <a className={className} href={href} target="_blank" rel="noopener noreferrer" aria-label="Solicitar orçamento pelo WhatsApp" onClick={() => trackConversion(treatment ?? "geral")}><img src="/whatsapp-icon.png" width="72" height="72" alt="" aria-hidden="true" /></a>;
  return <a className={className} href={href} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion(treatment ?? "geral")}>{label}<span aria-hidden="true"> ↗</span></a>;
}

export function SiteShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [clinicSlide, setClinicSlide] = useState(0);
  const [teamIndex, setTeamIndex] = useState(0);
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", close);
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    document.documentElement.classList.add("reveal-ready");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        (entry.target as HTMLElement).classList.toggle("is-visible", entry.isIntersecting);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -7% 0px" });
    items.forEach((item) => observer.observe(item));
    return () => { document.removeEventListener("keydown", close); observer.disconnect(); };
  }, []);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setClinicSlide((current) => (current + 1) % 2), 3000);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setTeamIndex((current) => (current + 1) % siteConfig.professionals.length), 8000);
    return () => window.clearInterval(timer);
  }, []);

  return <>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header className="site-header">
      <a href="#inicio" className="brand" aria-label="Jr Odontologia — início">
        <img src="/logo-jr-transparent.png" width="96" height="96" alt="Jr Odontologia" />
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
          <p className="eyebrow"><span></span> JR Odontologia</p>
          <h1>Seu sorriso merece <em>cuidado por inteiro.</em></h1>
          <p className="hero-copy">Clínica odontológica em Cubatão, SP, que reúne profissionais reconhecidos na Baixada Santista. Oferecemos cuidado completo, da prevenção e manutenção aos tratamentos estéticos, sempre com avaliação responsável e atendimento próximo.</p>
          <div className="hero-actions"><WhatsAppLink /><a href="#clinica" className="button secondary">Conheça nossa localização <span aria-hidden="true">↓</span></a></div>
          <p className="helper">O atendimento e a confirmação de disponibilidade acontecem pelo WhatsApp.</p>
        </div>
        <div className="hero-visual smile-glass" data-reveal>
          <img src="/hero-smile.png" width="1024" height="1536" alt="Sorriso natural iluminado sobre fundo preto" fetchPriority="high" />
          <div className="glass-note"><span className="pulse" aria-hidden="true"></span><div><strong>Seu sorriso, sua história</strong><small>Cuidado próximo em todas as fases</small></div></div>
        </div>
      </section>

      <section className="section clinic-story" id="equipe" aria-labelledby="clinica-story-title">
        <div className="team-carousel" data-reveal aria-roledescription="carrossel" aria-label="Profissionais da Jr Odontologia"><div className="team-carousel-track" style={{ transform: `translateX(-${teamIndex * 100}%)` }}>{siteConfig.professionals.map((person, i) => <article className="team-slide" key={person.name} aria-hidden={i !== teamIndex}>{person.photo ? <div className="portrait-photo"><img src={person.photo} width="1024" height="1536" alt={`Fotografia de ${person.name}`} /></div> : <div className="portrait-placeholder" aria-label="Fotografia profissional pendente"><span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span><small>Foto será adicionada em breve</small></div>}<div className="team-slide-copy"><p className="status">EQUIPE JR ODONTOLOGIA</p><h3>{person.name}</h3><p className="specialty">{person.specialty} · {person.cro}</p><p>{person.bio}</p>{"highlights" in person && person.highlights && <ul className="professional-highlights">{person.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>}</div></article>)}</div><div className="team-carousel-controls"><button type="button" onClick={() => setTeamIndex((teamIndex - 1 + siteConfig.professionals.length) % siteConfig.professionals.length)} aria-label="Profissional anterior">‹</button><button type="button" onClick={() => setTeamIndex((teamIndex + 1) % siteConfig.professionals.length)} aria-label="Próximo profissional">›</button></div></div>
        <div className="story-copy" data-reveal><p className="eyebrow dark"><span></span> Três profissionais, um só cuidado</p><h2 id="clinica-story-title">Odontologia completa, feita por uma equipe que trabalha junto.</h2><p>Na Jr Odontologia, três cirurgiões-dentistas reúnem diferentes áreas de atuação para acompanhar prevenção, estética, reabilitação e urgências com uma visão integrada. Cada caso é conversado em equipe quando necessário, sempre com explicações claras e um plano adequado à realidade de cada pessoa.</p><WhatsAppLink label="Conhecer a clínica pelo WhatsApp" /></div>
      </section>

      <section className="section place-showcase" id="clinica" data-reveal>
        <div className="place-main"><p className="eyebrow"><span></span> Consultório odontológico em Cubatão</p><h2>Fácil de encontrar.<br />Bom de chegar.</h2><p>No Centro de Cubatão, acima do Centro Médico Popular e na esquina com a Praça Princesa Isabel. Consulte a rota e fale com a equipe antes de sair.</p><div className="place-actions"><a href={siteConfig.clinic.mapUrl} target="_blank" rel="noopener noreferrer" className="button primary">Visualizar no Google Maps ↗</a><WhatsAppLink label="Falar pelo WhatsApp" className="button secondary" /></div></div>
        <button className="clinic-photo-stack compact" type="button" onClick={() => setClinicSlide((current) => (current + 1) % 2)} aria-label="Alternar entre foto ilustrativa da fachada e do consultório"><img className={clinicSlide === 0 ? "active" : ""} src="/clinic-facade-illustrative.png" width="1024" height="1280" alt="Imagem ilustrativa da fachada de uma clínica odontológica" /><img className={clinicSlide === 1 ? "active" : ""} src="/clinic-office-illustrative.png" width="1024" height="1280" alt="Imagem ilustrativa de um consultório odontológico" /><span>Imagem ilustrativa · toque para alternar</span><i aria-hidden="true">{clinicSlide + 1} / 2</i></button>
        <div className="place-grid"><div><span>Endereço</span><strong>{siteConfig.clinic.address}</strong><small>{siteConfig.clinic.neighborhood} · {siteConfig.clinic.city} · CEP {siteConfig.clinic.postalCode}</small></div><div><span>Instagram</span><strong>{siteConfig.clinic.instagramHandle}</strong><a href={siteConfig.clinic.instagram} target="_blank" rel="noopener noreferrer">Abrir perfil ↗</a></div><div><span>WhatsApp</span><strong>{siteConfig.clinic.phoneDisplay}</strong><small>Atendimento e orçamento pelo aplicativo</small></div><a className="map-preview" href={siteConfig.clinic.mapUrl} target="_blank" rel="noopener noreferrer" aria-label="Abrir a localização da Jr Odontologia no Google Maps"><span className="map-road road-one">Praça Princesa Isabel</span><span className="map-road road-two">Rua Bahia</span><i aria-hidden="true"></i><strong>JR Odontologia<br />Rua Bahia, 21</strong><small>Abrir no Google Maps ↗</small></a></div>
      </section>

      <section className="section treatments" id="tratamentos">
        <div className="section-heading split" data-reveal><div><p className="eyebrow"><span></span> Tratamentos</p><h2>Duas áreas de cuidado, um atendimento integrado.</h2></div><p>Explore os procedimentos odontológicos e de estética do sorriso oferecidos pela equipe. Cada indicação é definida somente após avaliação profissional.</p></div>
        <div className="treatment-categories">{siteConfig.treatmentCategories.map((category, i) => <details className="treatment-category" key={category.name} data-reveal><summary><div className={`category-photo category-photo-${category.image}`} role="img" aria-label={`Imagem representativa de ${category.name}`}></div><div className="category-heading"><span>{String(i + 1).padStart(2, "0")} · {category.procedures.length} opções</span><h3>{category.name}</h3><p>{category.description}</p><i aria-hidden="true">+</i></div></summary><div className="procedure-grid">{category.procedures.map((procedure) => <article key={procedure.name}><h4>{procedure.name}</h4><p>{procedure.description}</p></article>)}</div></details>)}</div>
        <div className="treatments-cta" data-reveal><p>Quer entender qual cuidado combina com a sua necessidade?</p><WhatsAppLink label="Solicitar orçamento pelo WhatsApp" /></div>
      </section>

      <section className="results" aria-labelledby="resultados-title" data-reveal>
        <div className="results-heading"><p className="eyebrow dark"><span></span> Resultados</p><h2 id="resultados-title">Sorrisos que contam novas histórias.</h2><p>Conheça alguns resultados odontológicos compartilhados pela clínica. Cada tratamento é individual: as respostas variam e as imagens não representam promessa de resultado.</p></div>
        <div className="results-marquee" tabIndex={0} aria-label="Carrossel automático de resultados odontológicos; passe o mouse ou use o foco para pausar">
          <div className="results-track">{[0,1].map(loop => <div className="results-set" key={loop} aria-hidden={loop === 1}>{[0,1,2,3].map((index) => <figure className="result-card" key={`${loop}-${index}`}><div className={`result-image result-image-${index}`} role="img" aria-label={loop === 0 ? `Comparativo odontológico demonstrativo ${index + 1}` : undefined}></div><figcaption><span>0{index + 1}</span>Resultado demonstrativo</figcaption></figure>)}</div>)}</div>
        </div>
        <p className="results-note">O carrossel pausa ao receber foco ou ao passar o mouse.</p>
      </section>

      <section className="section insurance" id="convenios" data-reveal><div><p className="eyebrow"><span></span> Convênios odontológicos</p><h2>Consulte a cobertura do seu plano.</h2><p>Atendemos os convênios listados ao lado. A cobertura varia conforme o plano e o procedimento; confirme a elegibilidade com a equipe antes do atendimento.</p><WhatsAppLink label="Pedir orçamento pelo WhatsApp" /></div><div className="insurance-logos">{siteConfig.insurances.map(name => <span key={name}>{name}<small>convênio atendido</small></span>)}</div></section>

      <section className="section faq" id="duvidas" data-reveal>
        <div className="section-heading"><p className="eyebrow dark"><span></span> Dúvidas frequentes</p><h2>Informação clara antes do primeiro contato.</h2></div>
        <div className="faq-list">{siteConfig.faqs.map((faq, i) => <details key={faq.question} data-reveal><summary><span>{String(i + 1).padStart(2, "0")}</span>{faq.question}<i aria-hidden="true">+</i></summary><p>{faq.answer}</p></details>)}</div>
      </section>

      <section className="section contact" id="contato" data-reveal>
        <div className="contact-copy"><p className="eyebrow"><span></span> Vamos conversar?</p><h2>O próximo passo começa com uma mensagem.</h2><p>Conte à equipe como podemos orientar você. Nenhum dado é coletado neste site: a conversa acontece diretamente no WhatsApp.</p><WhatsAppLink label="Iniciar conversa no WhatsApp" /><small>Clicar não reserva horário. A equipe confirmará o atendimento pelo aplicativo.</small></div>
        <div className="contact-card"><div><span>Endereço</span><strong>{siteConfig.clinic.address}</strong><small>{siteConfig.clinic.neighborhood} · {siteConfig.clinic.city} · CEP {siteConfig.clinic.postalCode}</small></div><div><span>Atendimento</span><strong>{siteConfig.clinic.hours}</strong></div><div><span>Contato</span><strong>{siteConfig.clinic.phoneDisplay}</strong><small>{siteConfig.clinic.email}</small></div>{siteConfig.clinic.mapUrl ? <a href={siteConfig.clinic.mapUrl} target="_blank" rel="noopener noreferrer" className="text-link light">Abrir no mapa ↗</a> : <span className="map-pending">Mapa disponível após configurar o endereço</span>}</div>
      </section>
    </main>

    <footer><div className="footer-main"><a href="#inicio" className="footer-logo"><img src="/logo-jr.png" width="120" height="120" alt="Jr Odontologia" loading="lazy" /></a><div><span>Navegação</span>{nav.slice(0, 4).map(([label, href]) => <a key={href} href={href}>{label}</a>)}</div><div><span>Informações</span><a href="/privacidade">Política de Privacidade</a><a href="/termos">Termos de Uso</a><p>{siteConfig.clinic.technicalLead}</p></div></div><div className="footer-bottom"><p>© {new Date().getFullYear()} {siteConfig.clinic.name}. Todos os direitos reservados.</p><p>Conteúdo sujeito à revisão do responsável técnico antes da publicação.</p></div></footer>
    <WhatsAppLink label="WhatsApp" className="floating-whatsapp" />
  </>;
}
