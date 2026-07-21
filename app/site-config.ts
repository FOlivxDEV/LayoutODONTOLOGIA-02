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
  photo?: string;
};

export const siteConfig = {
  clinic: {
    name: "Jr Odontologia",
    legalName: "Jr Odontologia",
    tagline: "Cuidado que acolhe. Odontologia que transforma.",
    phoneDisplay: "[INFORMAR TELEFONE]",
    whatsapp: "", // PENDENTE: somente números, com DDI e DDD. Ex.: 5511999999999
    email: "[INFORMAR E-MAIL]",
    address: "[INFORMAR ENDEREÇO COMPLETO]",
    city: "[INFORMAR CIDADE]",
    neighborhood: "[INFORMAR BAIRRO]",
    mapUrl: "",
    hours: "[INFORMAR HORÁRIOS DE ATENDIMENTO]",
    instagram: "",
    technicalLead: "[INFORMAR RESPONSÁVEL TÉCNICO E CRO]",
  },
  whatsapp: {
    defaultMessage:
      "Olá! Encontrei a clínica pelo site e gostaria de solicitar um atendimento odontológico.",
    treatmentMessage: (treatment: string) =>
      `Olá! Encontrei no site informações sobre ${treatment} e gostaria de saber mais.`,
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
      name: "Profissional a confirmar",
      specialty: "Área de atuação a informar",
      cro: "CRO a informar",
      bio: "Biografia profissional pendente de validação pela clínica.",
    },
    {
      name: "Profissional a confirmar",
      specialty: "Área de atuação a informar",
      cro: "CRO a informar",
      bio: "Biografia profissional pendente de validação pela clínica.",
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
