import { caseStudies, caseStudyUrl } from "@/content/case-studies";
import { services, serviceUrl } from "@/content/services";
import { faq } from "@/content/site";
import { testimonials } from "@/content/testimonials";

export type KnowledgePassage = {
  title: string;
  href: string;
  body: string;
};

const STOP = new Set([
  "the",
  "and",
  "for",
  "with",
  "that",
  "this",
  "from",
  "your",
  "what",
  "how",
  "can",
  "you",
  "our",
  "are",
  "have",
  "has",
  "been",
  "into",
  "about",
]);

function tokens(value: string) {
  return value
    .toLowerCase()
    .split(/[^a-z0-9+$%]+/)
    .filter((token) => token.length > 1 && !STOP.has(token));
}

function score(haystack: string, queryTokens: string[]) {
  const hay = haystack.toLowerCase();
  return queryTokens.reduce((total, token) => {
    if (!hay.includes(token)) return total;
    return total + (token.length > 4 ? 2 : 1);
  }, 0);
}

function indexPassages(): KnowledgePassage[] {
  const passages: KnowledgePassage[] = [];

  for (const service of services) {
    passages.push({
      title: service.shortName,
      href: serviceUrl(service.slug),
      body: [
        service.name,
        service.page.acronymNote,
        service.summary,
        service.page.intro,
        `Capabilities: ${service.capabilityLabels.join("; ")}`,
      ]
        .filter(Boolean)
        .join("\n"),
    });
  }

  for (const study of caseStudies) {
    const lines = [
      study.name,
      "Status: Live public study. Use only the facts in this passage.",
      study.intro,
      `Services: ${study.serviceSlugs.join(", ")}`,
    ];

    if (study.narrative) {
      const { narrative } = study;
      lines.push(
        narrative.practice ? `Practice: ${narrative.practice}` : "",
        narrative.engagement ? `Engagement: ${narrative.engagement}` : "",
        narrative.situation
          ? `${narrative.situationHeading}: ${narrative.situation}`
          : "",
        narrative.work && narrative.work.length > 0
          ? `${narrative.workHeading}: ${narrative.work.join(" ")}`
          : "",
        `${narrative.resultsHeading}:`,
        ...narrative.results.map((stat) => `${stat.value} — ${stat.label}`),
        narrative.resultStatement ?? "",
        narrative.resultsNote ?? "",
        narrative.quote
          ? `Quote: “${narrative.quote.text}” — ${narrative.quote.attribution}, ${narrative.quote.role}`
          : "",
      );
    }

    passages.push({
      title: study.name,
      href: caseStudyUrl(study.slug),
      body: lines.filter(Boolean).join("\n"),
    });
  }

  for (const item of faq.items) {
    passages.push({
      title: item.question,
      href: "/#faq",
      body: item.answer,
    });
  }

  passages.push({
    title: "Client testimonials",
    href: "/#social-proof-heading",
    body: [
      "What practices, clients, and billing partners say about working with JAIA. Quote verbatim with attribution only.",
      ...testimonials.map(
        (item) =>
          `“${item.quote}” — ${item.name}, ${item.title}, ${item.organization}`,
      ),
    ].join("\n"),
  });

  return passages;
}

const PASSAGES = indexPassages();

export function searchSalesKnowledge(
  query: string,
  limit = 4,
): KnowledgePassage[] {
  const queryTokens = tokens(query);
  if (queryTokens.length === 0) {
    return PASSAGES.filter((passage) =>
      passage.href.startsWith("/services/"),
    ).slice(0, limit);
  }

  return PASSAGES.map((passage) => ({
    passage,
    rank: score(
      `${passage.title}\n${passage.body}\n${passage.href}`,
      queryTokens,
    ),
  }))
    .filter((entry) => entry.rank > 0)
    .sort((a, b) => b.rank - a.rank)
    .slice(0, limit)
    .map((entry) => entry.passage);
}
