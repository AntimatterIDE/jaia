/**
 * Copy for the on-site sales chat. Keep starters in JAIA’s voice and
 * aligned with live pages — do not invent programs, stats, or clients.
 */

export const salesAgentCopy = {
  title: "Talk with JAIA",
  subtitle: "Programs, services, and next steps.",
  launcherOpen: "Open JAIA chat",
  launcherClose: "Close JAIA chat",
  placeholder: "Ask how JAIA can help",
  send: "Send",
  unavailable:
    "Chat isn’t available right now. You can still reach JAIA through the contact page.",
  contactCta: "Go to contact",
  error:
    "Something went wrong on this chat. Nothing you typed has been stored. You can retry, or use the contact page.",
  thinking: "Thinking…",
  emptyHint:
    "Ask how JAIA can help your practice — billing and RCM, results from other clinics, or a call. Business inquiries only; please do not include patient information.",
} as const;

export const salesConversationStarters = [
  {
    label: "How can you help with billing and RCM?",
    prompt:
      "How can JAIA help an independent practice with billing and revenue cycle management — claims, denials, and collections?",
  },
  {
    label: "What results have you seen with other practices?",
    prompt:
      "What results have you seen with other practices? I have not worked with JAIA before and want to know what has actually happened.",
  },
  {
    label: "What can JAIA do for a practice like ours?",
    prompt:
      "What can JAIA do for an independent practice? We have not worked with you before.",
  },
  {
    label: "I’d like to schedule a call",
    prompt:
      "I’d like to schedule a call to talk about whether JAIA could help our practice.",
  },
] as const;
