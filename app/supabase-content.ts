import type { Professional, TreatmentCategory } from "./site-config";

export type RemoteSiteContent = {
  clinic: Record<string, string>;
  insurances: string[];
  treatmentCategories: TreatmentCategory[];
  professionals: Professional[];
  faqs: { question: string; answer: string }[];
};

type ContentRow = { section: string; content: unknown };

export async function loadSiteContent(): Promise<RemoteSiteContent | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;

  try {
    const response = await fetch(`${url}/rest/v1/site_content?select=section,content`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      cache: "no-store",
    });
    if (!response.ok) return null;

    const rows = await response.json() as ContentRow[];
    const sections = Object.fromEntries(rows.map((row) => [row.section, row.content]));
    if (!sections.clinic || !Array.isArray(sections.insurances) || !Array.isArray(sections.treatment_categories) || !Array.isArray(sections.professionals) || !Array.isArray(sections.faqs)) return null;

    return {
      clinic: sections.clinic as Record<string, string>,
      insurances: sections.insurances as string[],
      treatmentCategories: sections.treatment_categories as TreatmentCategory[],
      professionals: sections.professionals as Professional[],
      faqs: sections.faqs as { question: string; answer: string }[],
    };
  } catch {
    return null;
  }
}
