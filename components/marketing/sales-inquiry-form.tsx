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
import { submitInquiry } from "@/app/contact/actions";
import { getService, services } from "@/content/services";
import { contactPage } from "@/content/site";
import { validateInquiry, type InquiryInput } from "@/lib/inquiry";
import type { InquiryFormOutput } from "@/lib/agents/sales-tools";
import { cn } from "@/lib/utils";

type FieldName = keyof Omit<InquiryInput, "company">;
type FieldErrors = Partial<Record<FieldName, string>>;

const inputClass =
  "min-h-9 rounded-lg border-input bg-white px-2.5 text-sm text-brand-ink shadow-none";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-destructive text-xs font-medium">
      {message}
    </p>
  );
}

export function SalesInquiryForm({
  formId,
  serviceSlug,
  suggestedMessage,
  onComplete,
}: {
  formId: string;
  serviceSlug?: string;
  suggestedMessage?: string;
  onComplete: (output: InquiryFormOutput) => void;
}) {
  const initialService =
    serviceSlug && getService(serviceSlug) ? serviceSlug : "";
  const [values, setValues] = useState<InquiryInput>({
    firstName: "",
    lastName: "",
    workEmail: "",
    organization: "",
    role: "",
    service: initialService,
    message: suggestedMessage ?? "",
    company: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const summaryRef = useRef<HTMLDivElement>(null);

  const field = (name: FieldName) => `${formId}-${name}`;

  const set = (name: FieldName, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fieldErrors = validateInquiry(values) as FieldErrors;
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setStatus("submitting");
    const result = await submitInquiry(values);
    if (!result.ok && result.reason === "invalid") {
      setErrors(result.fieldErrors as FieldErrors);
      setStatus("idle");
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    onComplete({
      submitted: true,
      delivery: result.ok ? "sent" : "not_configured",
      firstName: values.firstName.trim(),
      organization: values.organization.trim(),
      service: values.service || undefined,
    });
  }

  const errorEntries = Object.entries(errors).filter(([, message]) =>
    Boolean(message),
  );

  return (
    <form
      data-inquiry-form={formId}
      onSubmit={onSubmit}
      noValidate
      className="border-brand-mist relative mt-2 flex flex-col gap-3 rounded-xl border bg-white p-3"
    >
      <p className="text-brand-ink text-sm font-semibold">
        Request a conversation
      </p>
      <p className="text-brand-slate text-xs leading-relaxed">
        {contactPage.phiNotice}
      </p>

      {errorEntries.length > 0 ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="border-destructive/40 bg-destructive/5 rounded-lg border p-2.5 outline-none"
        >
          <div className="flex items-center gap-1.5">
            <CircleAlert
              aria-hidden="true"
              className="text-destructive size-3.5"
            />
            <p className="text-destructive text-xs font-semibold">
              There is a problem with {errorEntries.length}{" "}
              {errorEntries.length === 1 ? "field" : "fields"}.
            </p>
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-1">
          <Label
            htmlFor={field("firstName")}
            className="text-brand-ink text-xs font-semibold"
          >
            First name
          </Label>
          <Input
            id={field("firstName")}
            name="firstName"
            autoComplete="given-name"
            required
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={
              errors.firstName ? `${field("firstName")}-error` : undefined
            }
            value={values.firstName}
            onChange={(event) => set("firstName", event.target.value)}
            className={inputClass}
          />
          <FieldError
            id={`${field("firstName")}-error`}
            message={errors.firstName}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label
            htmlFor={field("lastName")}
            className="text-brand-ink text-xs font-semibold"
          >
            Last name
          </Label>
          <Input
            id={field("lastName")}
            name="lastName"
            autoComplete="family-name"
            required
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby={
              errors.lastName ? `${field("lastName")}-error` : undefined
            }
            value={values.lastName}
            onChange={(event) => set("lastName", event.target.value)}
            className={inputClass}
          />
          <FieldError
            id={`${field("lastName")}-error`}
            message={errors.lastName}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <Label
          htmlFor={field("workEmail")}
          className="text-brand-ink text-xs font-semibold"
        >
          Work email
        </Label>
        <Input
          id={field("workEmail")}
          name="workEmail"
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(errors.workEmail)}
          aria-describedby={
            errors.workEmail ? `${field("workEmail")}-error` : undefined
          }
          value={values.workEmail}
          onChange={(event) => set("workEmail", event.target.value)}
          className={inputClass}
        />
        <FieldError
          id={`${field("workEmail")}-error`}
          message={errors.workEmail}
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label
          htmlFor={field("organization")}
          className="text-brand-ink text-xs font-semibold"
        >
          Organization or practice
        </Label>
        <Input
          id={field("organization")}
          name="organization"
          autoComplete="organization"
          required
          aria-invalid={Boolean(errors.organization)}
          aria-describedby={
            errors.organization ? `${field("organization")}-error` : undefined
          }
          value={values.organization}
          onChange={(event) => set("organization", event.target.value)}
          className={inputClass}
        />
        <FieldError
          id={`${field("organization")}-error`}
          message={errors.organization}
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label
          htmlFor={field("role")}
          className="text-brand-ink text-xs font-semibold"
        >
          Role
        </Label>
        <Input
          id={field("role")}
          name="role"
          autoComplete="organization-title"
          required
          aria-invalid={Boolean(errors.role)}
          aria-describedby={errors.role ? `${field("role")}-error` : undefined}
          value={values.role}
          onChange={(event) => set("role", event.target.value)}
          className={inputClass}
        />
        <FieldError id={`${field("role")}-error`} message={errors.role} />
      </div>

      <div className="flex flex-col gap-1">
        <Label
          htmlFor={field("service")}
          className="text-brand-ink text-xs font-semibold"
        >
          Service of interest{" "}
          <span className="text-brand-slate font-normal">(optional)</span>
        </Label>
        <Select
          name="service"
          value={values.service || undefined}
          onValueChange={(value) => set("service", value)}
        >
          <SelectTrigger
            id={field("service")}
            size="sm"
            className={cn(inputClass, "w-full justify-between")}
            aria-invalid={Boolean(errors.service)}
          >
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent position="popper" className="z-[60]">
            {services.map((service) => (
              <SelectItem key={service.slug} value={service.slug}>
                {service.shortName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError id={`${field("service")}-error`} message={errors.service} />
      </div>

      <div className="flex flex-col gap-1">
        <Label
          htmlFor={field("message")}
          className="text-brand-ink text-xs font-semibold"
        >
          Message
        </Label>
        <Textarea
          id={field("message")}
          name="message"
          rows={3}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? `${field("message")}-error` : undefined
          }
          value={values.message}
          onChange={(event) => set("message", event.target.value)}
          className="border-input text-brand-ink min-h-20 rounded-lg bg-white px-2.5 py-2 text-sm shadow-none"
        />
        <FieldError id={`${field("message")}-error`} message={errors.message} />
      </div>

      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor={`${formId}-company`}>Company</label>
        <input
          id={`${formId}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, company: event.target.value }))
          }
        />
      </div>

      <div className="flex items-center gap-2 pt-1">
        <Button
          type="submit"
          disabled={status === "submitting"}
          aria-busy={status === "submitting"}
          className="bg-brand-ink hover:bg-brand-action-deep h-9 rounded-full px-4 text-sm font-semibold text-white"
        >
          {status === "submitting" ? (
            <>
              <Loader2
                aria-hidden="true"
                className="size-3.5 animate-spin motion-reduce:animate-none"
              />
              Sending…
            </>
          ) : (
            "Send inquiry"
          )}
        </Button>
        <Button
          type="button"
          variant="ghost"
          disabled={status === "submitting"}
          onClick={() => onComplete({ submitted: false, dismissed: true })}
          className="text-brand-slate h-9 px-2 text-sm"
        >
          Not now
        </Button>
      </div>
    </form>
  );
}
