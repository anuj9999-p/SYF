import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { contactSchema, projectTypeValues } from "../../lib/validation";
import type { ContactFormValues } from "../../lib/validation";
import { supabase, isSupabaseConfigured } from "../../lib/supabase";
import { Button } from "../ui/button";
import { cn } from "../../lib/utilities";

type SubmitStatus = "idle" | "loading" | "success" | "error";

const inputClasses =
  "focus-ring w-full rounded-[var(--radius-syf)] border border-ink/20 bg-cream px-4 py-3 text-sm text-ink placeholder:text-ink/35 transition-colors focus:border-ink/50";

export function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      budget: "",
      message: "",
      companyWebsite: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    // Honeypot: if a bot filled this hidden field, silently drop the submission.
    if (values.companyWebsite) {
      setStatus("success");
      reset();
      return;
    }

    setStatus("loading");
    setErrorMessage(null);

    try {
      if (!isSupabaseConfigured || !supabase) {
        throw new Error(
          "The contact form isn't connected yet. Please email us directly instead.",
        );
      }

      const { error } = await supabase.from("contact_inquiries").insert({
        name: values.name,
        email: values.email,
        company: values.company || null,
        project_type: values.projectType,
        budget: values.budget || null,
        message: values.message,
      });

      if (error) throw error;

      setStatus("success");
      reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong sending your message. Please try again.",
      );
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-[var(--radius-syf)] border border-ink/15 bg-paper p-10 text-center"
      >
        <CheckCircle2 className="mx-auto text-rust" size={32} aria-hidden="true" />
        <p className="mt-4 font-display text-xl font-semibold tracking-tight text-ink">
          Message sent.
        </p>
        <p className="mt-2 text-sm text-ink/65">
          Thanks for reaching out — we'll be in touch soon.
        </p>
        <Button variant="secondary" className="mt-6" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" error={errors.name?.message}>
          <input
            id="name"
            type="text"
            autoComplete="name"
            className={inputClasses}
            aria-invalid={Boolean(errors.name)}
            {...register("name")}
          />
        </Field>

        <Field label="Email" htmlFor="email" error={errors.email?.message}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={inputClasses}
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
        </Field>

        <Field label="Company" htmlFor="company" optional error={errors.company?.message}>
          <input id="company" type="text" autoComplete="organization" className={inputClasses} {...register("company")} />
        </Field>

        <Field label="Project type" htmlFor="projectType" error={errors.projectType?.message}>
          <select
            id="projectType"
            defaultValue=""
            className={inputClasses}
            aria-invalid={Boolean(errors.projectType)}
            {...register("projectType")}
          >
            <option value="" disabled>
              Select one
            </option>
            {projectTypeValues.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Budget" htmlFor="budget" optional error={errors.budget?.message}>
          <input
            id="budget"
            type="text"
            placeholder="e.g. $2,000–$5,000"
            className={inputClasses}
            {...register("budget")}
          />
        </Field>
      </div>

      <Field label="Message" htmlFor="message" error={errors.message?.message}>
        <textarea
          id="message"
          rows={5}
          className={cn(inputClasses, "resize-y")}
          aria-invalid={Boolean(errors.message)}
          {...register("message")}
        />
      </Field>

      {/* Honeypot field — hidden from real users, catches bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="companyWebsite">Leave this field empty</label>
        <input
          id="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("companyWebsite")}
        />
      </div>

      <div aria-live="polite">
        {status === "error" && (
          <p className="flex items-center gap-2 text-sm text-rust">
            <AlertCircle size={16} aria-hidden="true" />
            {errorMessage}
          </p>
        )}
      </div>

      <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          "Send inquiry"
        )}
      </Button>
    </form>
  );
}

interface FieldProps {
  label: string;
  htmlFor: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}

function Field({ label, htmlFor, optional, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="flex items-baseline justify-between text-sm font-medium text-ink">
        <span>{label}</span>
        {optional && <span className="text-xs font-normal text-ink/40">Optional</span>}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p className="mt-1.5 text-xs text-rust" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
