"use client";

import { useRef, useState, type FormEvent } from "react";
import { CircleAlert, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { services } from "@/content/services";
import { submitInquiry } from "@/app/contact/actions";
import { validateInquiry, type InquiryInput } from "@/lib/inquiry";
import { cn } from "@/lib/utils";

type FieldName = keyof Omit<InquiryInput, "company">;
type FieldErrors = Partial<Record<FieldName, string>>;

const inputClass =
  "min-h-12 rounded-lg border-input bg-white px-3.5 text-base text-brand-ink shadow-none";

function Required() {
  return (
    <span className="text-brand-slate ml-1 text-[0.8125rem] font-normal">
      (required)
    </span>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-destructive text-sm font-medium">
      {message}
    </p>
  );
}

export function ContactForm({ initialService }: { initialService?: string }) {
  const [values, setValues] = useState<InquiryInput>({
    firstName: "",
    lastName: "",
    workEmail: "",
    organization: "",
    role: "",
    service: initialService ?? "",
    message: "",
    company: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "unavailable">(
    "idle",
  );
  const summaryRef = useRef<HTMLDivElement>(null);

  const set = (name: FieldName, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fieldErrors = validateInquiry(values) as FieldErrors;
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      setStatus("idle");
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setStatus("submitting");
    const result = await submitInquiry(values);
    if (!result.ok) {
      // Backend not connected (or rejected) — say so plainly, keep the draft.
      setStatus("unavailable");
      return;
    }
    setStatus("idle");
  }

  const errorEntries = Object.entries(errors).filter(([, message]) =>
    Boolean(message),
  );

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-describedby="form-status"
      className="flex flex-col gap-6"
    >
      {errorEntries.length > 0 ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="border-destructive/40 bg-destructive/5 rounded-xl border p-4 outline-none"
        >
          <div className="flex items-center gap-2">
            <CircleAlert
              aria-hidden="true"
              className="text-destructive size-4.5"
            />
            <p className="text-destructive text-sm font-semibold">
              There is a problem with {errorEntries.length}{" "}
              {errorEntries.length === 1 ? "field" : "fields"}.
            </p>
          </div>
          <ul className="text-brand-ink mt-2 list-disc pl-9 text-sm">
            {errorEntries.map(([name, message]) => (
              <li key={name}>
                <a
                  href={`#field-${name}`}
                  className="underline underline-offset-2"
                >
                  {message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="field-firstName"
            className="text-brand-ink text-sm font-semibold"
          >
            First name <Required />
          </Label>
          <Input
            id="field-firstName"
            name="firstName"
            autoComplete="given-name"
            required
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? "error-firstName" : undefined}
            value={values.firstName}
            onChange={(e) => set("firstName", e.target.value)}
            className={inputClass}
          />
          <FieldError id="error-firstName" message={errors.firstName} />
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="field-lastName"
            className="text-brand-ink text-sm font-semibold"
          >
            Last name <Required />
          </Label>
          <Input
            id="field-lastName"
            name="lastName"
            autoComplete="family-name"
            required
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby={errors.lastName ? "error-lastName" : undefined}
            value={values.lastName}
            onChange={(e) => set("lastName", e.target.value)}
            className={inputClass}
          />
          <FieldError id="error-lastName" message={errors.lastName} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="field-workEmail"
          className="text-brand-ink text-sm font-semibold"
        >
          Work email <Required />
        </Label>
        <Input
          id="field-workEmail"
          name="workEmail"
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(errors.workEmail)}
          aria-describedby={errors.workEmail ? "error-workEmail" : undefined}
          value={values.workEmail}
          onChange={(e) => set("workEmail", e.target.value)}
          className={inputClass}
        />
        <FieldError id="error-workEmail" message={errors.workEmail} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="field-organization"
            className="text-brand-ink text-sm font-semibold"
          >
            Organization or practice <Required />
          </Label>
          <Input
            id="field-organization"
            name="organization"
            autoComplete="organization"
            required
            aria-invalid={Boolean(errors.organization)}
            aria-describedby={
              errors.organization ? "error-organization" : undefined
            }
            value={values.organization}
            onChange={(e) => set("organization", e.target.value)}
            className={inputClass}
          />
          <FieldError id="error-organization" message={errors.organization} />
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="field-role"
            className="text-brand-ink text-sm font-semibold"
          >
            Role <Required />
          </Label>
          <Input
            id="field-role"
            name="role"
            autoComplete="organization-title"
            required
            aria-invalid={Boolean(errors.role)}
            aria-describedby={errors.role ? "error-role" : undefined}
            value={values.role}
            onChange={(e) => set("role", e.target.value)}
            className={inputClass}
          />
          <FieldError id="error-role" message={errors.role} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="field-service"
          className="text-brand-ink text-sm font-semibold"
        >
          Service of interest{" "}
          <span className="text-brand-slate ml-1 text-[0.8125rem] font-normal">
            (optional)
          </span>
        </Label>
        <Select
          name="service"
          value={values.service}
          onValueChange={(value) => set("service", value)}
        >
          <SelectTrigger
            id="field-service"
            className={cn(inputClass, "w-full justify-between")}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? "error-service" : undefined}
          >
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {services.map((service) => (
              <SelectItem key={service.slug} value={service.slug}>
                {service.shortName} — {service.category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError id="error-service" message={errors.service} />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="field-message"
          className="text-brand-ink text-sm font-semibold"
        >
          Message <Required />
        </Label>
        <Textarea
          id="field-message"
          name="message"
          rows={5}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? "message-note error-message" : "message-note"
          }
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          className="border-input text-brand-ink min-h-32 rounded-lg bg-white px-3.5 py-3 text-base shadow-none"
        />
        <p
          id="message-note"
          className="text-brand-slate text-sm leading-relaxed"
        >
          A short note about your practice is enough to start.
        </p>
        <FieldError id="error-message" message={errors.message} />
      </div>

      {/* Honeypot — invisible to people, ignored by assistive tech */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="field-company">Company</label>
        <input
          id="field-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, company: e.target.value }))
          }
        />
      </div>

      <div aria-live="polite" className="min-h-0">
        {status === "unavailable" ? (
          <p
            id="form-status"
            className="border-brand-sky bg-brand-sky-soft text-brand-ink rounded-xl border p-4 text-sm leading-relaxed"
          >
            Thank you for your interest. This online form is not yet connected
            to JAIA&rsquo;s inbox, so your message could not be sent from here.
            Please try again later — nothing you entered has been stored or
            shared.
          </p>
        ) : (
          <span id="form-status" className="sr-only" />
        )}
      </div>

      <Button
        type="submit"
        disabled={status === "submitting"}
        aria-busy={status === "submitting"}
        className="bg-brand-ink hover:bg-brand-action-deep shadow-soft hover:shadow-lift h-12 w-full rounded-full text-base font-semibold text-white transition-[background-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 disabled:translate-y-0 disabled:opacity-70 motion-reduce:transform-none motion-reduce:transition-none sm:w-auto sm:px-8"
      >
        {status === "submitting" ? (
          <>
            <Loader2
              aria-hidden="true"
              className="mr-2 size-4 animate-spin motion-reduce:animate-none"
            />
            Sending…
          </>
        ) : (
          "Send inquiry"
        )}
      </Button>
    </form>
  );
}
