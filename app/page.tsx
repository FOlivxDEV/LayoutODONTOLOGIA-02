import { SiteShell } from "./components/SiteShell";
import { loadSiteContent } from "./supabase-content";

export default async function Home() {
  const content = await loadSiteContent();
  return <SiteShell content={content} />;
}
