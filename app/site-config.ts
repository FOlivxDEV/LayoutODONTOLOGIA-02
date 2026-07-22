export type Treatment = {
  name: string;
  description: string;
  icon: string;
};

export type Professional = {
  name: string;
  specialty: string;
  cro: string;
  bio: string;
  highlights?: readonly string[];
  photo?: string;
};

export const siteConfig = {
  clinic: {
    name: "Jr Odontologia",
    legalName: "Jr Odontologia",
    tagline: "Cuidado que acolhe. Odontologia que transforma.",
    phoneDisplay: "+55 13 99187-9892",
    whatsapp: "5513991879892",
    email: "contato@jrodontologia.com.br · simulação",
    address: "Av. Nove de Abril, 123 · endereço simulado",
    city: "Cubatão/SP",
    neighborhood: "Centro",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=consultorio+odontologico+Cubatão+SP",
    hours: "Seg–Sex 09h às 18h\nExceto quarta-feira\nSáb 08h às 12h",
    instagram: "https://instagram.com/jrodontologia.cubatao",
    technicalLead: "[INFORMAR RESPONSÁVEL TÉCNICO E CRO]",
  },
  whatsapp: {
    defaultMessage:
      "Olá! Encontrei a Jr Odontologia pelo site e gostaria de solicitar um orçamento odontológico.",
    treatmentMessage: (treatment: string) =>
      `Olá! Encontrei no site informações sobre ${treatment} e gostaria de solicitar um orçamento.`,
  },
  seo: {
    title: "Jr Odontologia | Cuidado odontológico humanizado",
    description:
      "Atendimento odontológico acolhedor, responsável e personalizado. Conheça a Jr Odontologia e fale com a equipe pelo WhatsApp.",
    canonicalUrl: "https://exemplo.com.br", // PENDENTE: substituir pelo domínio real
  },
  treatments: [
    { name: "Avaliação e prevenção", description: "Acompanhamento cuidadoso para orientar hábitos e preservar sua saúde bucal.", icon: "✦" },
    { name: "Limpeza", description: "Cuidado preventivo profissional, indicado após avaliação individual.", icon: "◌" },
    { name: "Clareamento dental", description: "Opções de clareamento planejadas com segurança para cada sorriso.", icon: "☼" },
    { name: "Ortodontia e alinhadores", description: "Planejamento para correção do posicionamento dentário e da mordida.", icon: "⌁" },
    { name: "Implantes", description: "Alternativas para reabilitação oral avaliadas de forma personalizada.", icon: "⊕" },
    { name: "Próteses", description: "Soluções para recuperar função, conforto e harmonia do sorriso.", icon: "◒" },
    { name: "Endodontia", description: "Tratamento de canal com abordagem cuidadosa e foco no conforto.", icon: "◇" },
    { name: "Odontopediatria", description: "Acolhimento e prevenção para construir uma relação positiva com o dentista.", icon: "♡" },
    { name: "Urgências odontológicas", description: "Orientação inicial e avaliação conforme disponibilidade da clínica.", icon: "+" },
  ] satisfies Treatment[],
  professionals: [
    {
      name: "Dr. Marcos Higa",
      specialty: "Cirurgião-dentista",
      cro: "CRO 00.000 · simulação",
      bio: "Atendimento experiente, próximo e voltado ao cuidado integral do sorriso.",
      highlights: [
        "+20 anos de experiência",
        "Referência na Baixada Santista",
        "Extração, ortodontia e canal",
        "Cuidado odontológico completo",
      ],
      photo: "/dr-marcos-photo-v2.png",
    },
    {
      name: "Dra. Ana Ribeiro",
      specialty: "Clínica geral e prevenção",
      cro: "CRO 00.001 · simulação",
      bio: "Perfil demonstrativo para visualizar a composição da equipe. Dados profissionais precisam ser substituídos antes da publicação oficial.",
    },
    {
      name: "Dra. Laura Mendes",
      specialty: "Ortodontia e alinhadores",
      cro: "CRO 00.002 · simulação",
      bio: "Perfil demonstrativo para visualizar a composição da equipe. Dados profissionais precisam ser substituídos antes da publicação oficial.",
    },
  ] satisfies Professional[],
  faqs: [
    { question: "Como solicitar um atendimento?", answer: "Use um dos botões de WhatsApp deste site. A equipe continuará o atendimento e confirmará as possibilidades diretamente pelo aplicativo." },
    { question: "A clínica atende convênios?", answer: "Informação pendente de confirmação pela clínica. Fale com a equipe pelo WhatsApp antes do atendimento." },
    { question: "Quais são as formas de pagamento?", answer: "Informação pendente de confirmação pela clínica. Consulte a equipe para conhecer as condições disponíveis." },
    { question: "Há atendimento de urgência?", answer: "A disponibilidade precisa ser confirmada diretamente com a equipe. O contato pelo WhatsApp não representa reserva de horário." },
    { question: "Onde fica a clínica?", answer: "O endereço completo será publicado após validação. Enquanto isso, solicite a localização pelo WhatsApp." },
    { question: "Existe estacionamento?", answer: "Informação pendente de confirmação pela clínica." },
    { question: "Qual é o horário de atendimento?", answer: "Os horários ainda precisam ser confirmados pela clínica." },
  ],
} as const;

export function getWhatsAppUrl(message?: string) {
  const number = siteConfig.clinic.whatsapp.replace(/\D/g, "");
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message ?? siteConfig.whatsapp.defaultMessage)}`;
}
