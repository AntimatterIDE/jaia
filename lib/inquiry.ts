/**
 * Shared inquiry types and validation, used by the client form for immediate
 * feedback and by the server action for authoritative validation.
 */
import { getService } from "@/content/services";

export interface InquiryInput {
  firstName: string;
  lastName: string;
  workEmail: string;
  organization: string;
  role: string;
  service: string;
  message: string;
  /** Honeypot — must stay empty; bots that fill it are silently dropped */
  company?: string;
}

export type InquiryResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" }
  | { ok: false; reason: "invalid"; fieldErrors: Record<string, string> };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateInquiry(input: InquiryInput): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!input.firstName.trim()) errors.firstName = "Enter your first name.";
  if (!input.lastName.trim()) errors.lastName = "Enter your last name.";
  if (!input.workEmail.trim()) {
    errors.workEmail = "Enter your work email.";
  } else if (!EMAIL_PATTERN.test(input.workEmail.trim())) {
    errors.workEmail = "Enter a valid work email address.";
  }
  if (!input.organization.trim())
    errors.organization = "Enter your organization or practice.";
  if (!input.role.trim()) errors.role = "Enter your role.";
  if (input.service && !getService(input.service))
    errors.service = "Choose a service from the list.";
  if (!input.message.trim())
    errors.message = "Tell us briefly what you are hoping to accomplish.";
  return errors;
}
