import {
  convertToModelMessages,
  smoothStream,
  stepCountIs,
  streamText,
  validateUIMessages,
} from "ai";
import { getSalesAgentInstructions } from "@/lib/agents/sales-knowledge";
import {
  getSalesLanguageModel,
  isSalesChatConfigured,
} from "@/lib/agents/sales-agent";
import { salesTools, type SalesAgentUIMessage } from "@/lib/agents/sales-tools";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET() {
  return Response.json({ configured: isSalesChatConfigured() });
}

export async function POST(req: Request) {
  if (!isSalesChatConfigured()) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  let messages: SalesAgentUIMessage[];
  try {
    const body: unknown = await req.json();
    const incoming =
      body && typeof body === "object" && "messages" in body
        ? body.messages
        : undefined;
    messages = await validateUIMessages<SalesAgentUIMessage>({
      messages: incoming,
      tools: salesTools,
    });
  } catch {
    return Response.json({ error: "invalid_request" }, { status: 400 });
  }

  const result = streamText({
    model: getSalesLanguageModel(),
    system: getSalesAgentInstructions(),
    messages: await convertToModelMessages(messages, { tools: salesTools }),
    tools: salesTools,
    stopWhen: stepCountIs(6),
    abortSignal: req.signal,
    experimental_transform: smoothStream({ delayInMs: 12, chunking: "word" }),
  });

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    sendReasoning: true,
    sendSources: true,
    onError: () =>
      "Something went wrong. You can still reach JAIA through the contact page.",
  });
}
