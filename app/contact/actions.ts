"use server";

/**
 * Typed boundary for the contact inquiry form.
 *
 * HANDOFF: the delivery backend is intentionally not connected in this pass.
 * Wire Resend (or the chosen ESP) plus persistence here — validate with
 * `validateInquiry`, then send/store. The UI never fakes success: while this
 * returns `not_configured`, the form tells the user the message was not sent.
 */
import {
  validateInquiry,
  type InquiryInput,
  type InquiryResult,
} from "@/lib/inquiry";

export async function submitInquiry(
  input: InquiryInput,
): Promise<InquiryResult> {
  // Honeypot filled — drop silently without delivering anything.
  if (input.company) return { ok: true };

  const fieldErrors = validateInquiry(input);
  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, reason: "invalid", fieldErrors };
  }

  // Not connected yet — the UI reports this honestly instead of faking success.
  return { ok: false, reason: "not_configured" };
}
