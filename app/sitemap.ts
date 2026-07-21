import type { MetadataRoute } from "next";
import { siteConfig } from "./site-config";
export default function sitemap(): MetadataRoute.Sitemap { return ["", "/privacidade", "/termos"].map(path => ({ url: `${siteConfig.seo.canonicalUrl}${path}`, lastModified: new Date(), changeFrequency: path ? "yearly" : "monthly", priority: path ? 0.4 : 1 })); }
