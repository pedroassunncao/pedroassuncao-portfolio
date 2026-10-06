import type { MetadataRoute } from "next";
import { projects } from "@/lib/site";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    "/projetos",
    "/demonstracoes/casa-clara",
    ...projects.map((project) => `/projetos/${project.slug}`),
  ].map((path) => ({
    url: new URL(path, siteUrl).href,
  }));
}
