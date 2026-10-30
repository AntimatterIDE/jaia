import { tool, type InferUITools, type UIDataTypes, type UIMessage } from "ai";
import { z } from "zod";
import { searchSalesKnowledge } from "@/lib/agents/sales-search";

export const inquiryFormInputSchema = z.object({
  serviceSlug: z
    .string()
    .optional()
    .describe(
      "Approved service slug if the visitor named one: apcm-bhi, hrv-assessment, iv-therapy, billing-rcm, laboratory-coordination, pol-establishment.",
    ),
  suggestedMessage: z
    .string()
    .optional()
    .describe(
      "Short draft of what they want to discuss, in business language only. No patient names, records, or other PHI.",
    ),
});

export const inquiryFormOutputSchema = z.object({
  submitted: z.boolean(),
  dismissed: z.boolean().optional(),
  delivery: z.enum(["sent", "not_configured"]).optional(),
  firstName: z.string().optional(),
  organization: z.string().optional(),
  service: z.string().optional(),
});

export type InquiryFormInput = z.infer<typeof inquiryFormInputSchema>;
export type InquiryFormOutput = z.infer<typeof inquiryFormOutputSchema>;

/**
 * Client-side interactive tool: omit `execute` so the chat UI can render
 * the inquiry form and call `addToolOutput` when the visitor finishes.
 */
export const salesTools = {
  searchKnowledge: tool({
    description:
      "Look up JAIA services, published case-study facts, and site FAQ before answering a visitor question. Use this for billing/RCM, results, programs, and how JAIA works. Do not invent facts that are not in the returned passages.",
    inputSchema: z.object({
      query: z
        .string()
        .describe(
          "Short lookup, e.g. billing RCM collections, Novo results, APCM, how JAIA works.",
        ),
    }),
    execute: async ({ query }) => ({
      passages: searchSalesKnowledge(query),
    }),
    outputSchema: z.object({
      passages: z.array(
        z.object({
          title: z.string(),
          href: z.string(),
          body: z.string(),
        }),
      ),
    }),
  }),
  offerInquiryForm: tool({
    description:
      "Show an in-chat inquiry form when the visitor wants a call, a meeting, a demo, or to leave contact details. Do not ask them to type email or phone in the chat. Call this as soon as that intent is clear.",
    inputSchema: inquiryFormInputSchema,
    outputSchema: inquiryFormOutputSchema,
  }),
};

export type SalesTools = InferUITools<typeof salesTools>;
export type SalesAgentUIMessage = UIMessage<unknown, UIDataTypes, SalesTools>;
