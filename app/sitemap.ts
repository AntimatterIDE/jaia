import type { MetadataRoute } from "next";
import { publishedCaseStudies, caseStudyUrl } from "@/content/case-studies";
import { services, serviceUrl } from "@/content/services";
import { siteConfig } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/about`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/contact`,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/case-studies`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/partners`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...publishedCaseStudies().map((study) => ({
      url: `${siteConfig.url}${caseStudyUrl(study.slug)}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...services.map((service) => ({
      url: `${siteConfig.url}${serviceUrl(service.slug)}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
