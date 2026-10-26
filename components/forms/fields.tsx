"use client";

import { createContext, useActionState, useContext, useId, useState } from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle, ArrowRight, CheckCircle2, LoaderCircle, Upload } from "lucide-react";
import Link from "next/link";
import type { FormState } from "@/app/actions";
import { cn } from "@/lib/utils";
import { buttonStyles } from "@/components/ui/button";

const FormCtx = createContext<FormState>({ status: "idle" });
const useField = (name: string) => {
  const state = useContext(FormCtx);
  return { error: state.errors?.[name], value: state.values?.[name] };
};

type Action = (state: FormState, formData: FormData) => Promise<FormState>;

/**
 * Wraps a server action with useActionState. On success the form is replaced by
 * a confirmation panel; errors are shown inline and announced to screen readers.
 */
export function ActionForm({
  action,
  submitLabel,
  successTitle = "Thank you",
  className,
  children,
}: {
  action: Action;
  submitLabel: string;
  successTitle?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [state, formAction] = useActionState(action, { status: "idle" } as FormState);
  const [dismissedState, setDismissedState] = useState<FormState | null>(null);
  // Remount on each new error so fields pick up the echoed defaultValues.
  const errorKey = state.status === "error" ? JSON.stringify(state.values ?? {}) : "form";

  if (state.status === "success" && dismissedState !== state) {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-5 rounded-3xl border border-accent-400/40 bg-linear-to-br from-accent-200/30 to-brand-50 p-8 sm:p-10"
      >
        <span className="grid size-12 place-items-center rounded-full bg-accent-400 text-night-950">
          <CheckCircle2 className="size-6" />
        </span>
        <div>
          <h3 className="text-2xl font-semibold">{successTitle}</h3>
          <p className="mt-2 max-w-xl text-body">{state.message}</p>
        </div>
        <button type="button" onClick={() => setDismissedState(state)} className={buttonStyles({ variant: "outline", size: "sm" })}>
          Submit another response
        </button>
      </div>
    );
  }

  return (
    <FormCtx.Provider value={state}>
      <form key={errorKey} action={formAction} noValidate className={cn("grid gap-8", className)}>
        {state.status === "error" && state.message && (
          <p role="alert" className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-800">
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            {state.message}
          </p>
        )}
        {children}
        <Honeypot />
        <SubmitButton label={submitLabel} />
      </form>
    </FormCtx.Provider>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <div>
      <button type="submit" disabled={pending} className={buttonStyles({ variant: "primary", size: "lg", className: "w-full sm:w-auto" })}>
        {pending ? <LoaderCircle className="size-4 animate-spin" /> : null}
        {pending ? "Sending…" : label}
        {!pending && <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-0.5" />}
      </button>
    </div>
  );
}

function Honeypot() {
  return (
    <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" name="website_confirm" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function FormSection({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <fieldset className="grid gap-5 border-t border-line pt-8 first-of-type:border-0 first-of-type:pt-0">
      <legend className="contents">
        <span className="font-display text-lg font-semibold text-ink">{title}</span>
      </legend>
      {description && <p className="-mt-3 text-sm text-muted">{description}</p>}
      <div className="grid gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

const inputClass = cn(
  "w-full rounded-xl border border-line bg-white px-4 text-[0.95rem] text-ink placeholder:text-muted/70",
  "transition-[border-color,box-shadow] duration-200 outline-none",
  "hover:border-brand-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15",
  "aria-invalid:border-red-400 aria-invalid:focus:ring-red-500/15",
);

function FieldShell({
  id,
  label,
  hint,
  error,
  optional,
  full,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("grid content-start gap-2", full && "sm:col-span-2")}>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {optional && <span className="ml-1.5 font-normal text-muted">(optional)</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="text-xs text-muted">{hint}</p>}
      {error && (
        <p id={`${id}-error`} className="text-xs font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

type BaseProps = { name: string; label: string; hint?: string; optional?: boolean; full?: boolean };

export function TextField({
  name,
  label,
  hint,
  optional,
  full,
  type = "text",
  ...rest
}: BaseProps & Omit<React.ComponentProps<"input">, "name">) {
  const id = useId();
  const { error, value } = useField(name);
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} optional={optional} full={full}>
      <input
        id={id}
        name={name}
        type={type}
        defaultValue={value}
        required={!optional}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(inputClass, "h-12")}
        {...rest}
      />
    </FieldShell>
  );
}

export function TextArea({ name, label, hint, optional, rows = 5, ...rest }: BaseProps & Omit<React.ComponentProps<"textarea">, "name">) {
  const id = useId();
  const { error, value } = useField(name);
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} optional={optional} full>
      <textarea
        id={id}
        name={name}
        rows={rows}
        defaultValue={value}
        required={!optional}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(inputClass, "resize-y py-3 leading-relaxed")}
        {...rest}
      />
    </FieldShell>
  );
}

export function SelectField({
  name,
  label,
  hint,
  optional,
  full,
  options,
  placeholder = "Select…",
  defaultValue,
}: BaseProps & { options: (string | { value: string; label: string })[]; placeholder?: string; defaultValue?: string }) {
  const id = useId();
  const { error, value } = useField(name);
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} optional={optional} full={full}>
      <div className="relative">
        <select
          id={id}
          name={name}
          defaultValue={value ?? defaultValue ?? ""}
          required={!optional}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(inputClass, "h-12 appearance-none pr-10")}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => {
            const opt = typeof o === "string" ? { value: o, label: o } : o;
            return (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            );
          })}
        </select>
        <svg aria-hidden viewBox="0 0 20 20" className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted">
          <path fill="currentColor" d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4Z" />
        </svg>
      </div>
    </FieldShell>
  );
}

/** Radio or checkbox options rendered as selectable chips. */
export function ChoiceGroup({
  name,
  label,
  hint,
  options,
  multiple = false,
  columns = 2,
  defaultValue,
}: {
  name: string;
  label: string;
  hint?: string;
  options: string[];
  multiple?: boolean;
  columns?: 1 | 2 | 3;
  defaultValue?: string;
}) {
  const id = useId();
  const { error, value } = useField(name);
  const selected = new Set((value ?? defaultValue ?? "").split("\n").filter(Boolean));
  return (
    <fieldset
      className="grid gap-3 sm:col-span-2"
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
    >
      <legend className="mb-3 text-sm font-medium text-ink">
        {label}
        {multiple && <span className="ml-1.5 font-normal text-muted">(choose all that apply)</span>}
      </legend>
      {hint && <p className="-mt-2 text-xs text-muted">{hint}</p>}
      <div className={cn("grid gap-2.5", columns === 2 && "sm:grid-cols-2", columns === 3 && "sm:grid-cols-3")}>
        {options.map((opt) => (
          <label
            key={opt}
            className={cn(
              "group/choice flex cursor-pointer items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 text-[0.92rem] text-ink transition",
              "hover:border-brand-200 has-checked:border-brand-500 has-checked:bg-brand-50 has-checked:ring-4 has-checked:ring-brand-500/10",
              "has-focus-visible:ring-4 has-focus-visible:ring-brand-500/25",
            )}
          >
            <input
              type={multiple ? "checkbox" : "radio"}
              name={name}
              value={opt}
              defaultChecked={selected.has(opt)}
              className="peer sr-only"
            />
            <span
              aria-hidden
              className={cn(
                "grid size-5 shrink-0 place-items-center border border-line bg-white transition peer-checked:border-brand-600 peer-checked:bg-brand-600",
                multiple ? "rounded-md" : "rounded-full",
              )}
            >
              <svg viewBox="0 0 16 16" className="size-3 text-white opacity-0 transition group-has-checked/choice:opacity-100">
                {multiple ? (
                  <path fill="none" stroke="currentColor" strokeWidth="2.2" d="m3.5 8.5 3 3 6-7" />
                ) : (
                  <circle cx="8" cy="8" r="3.5" fill="currentColor" />
                )}
              </svg>
            </span>
            {opt}
          </label>
        ))}
      </div>
      {error && (
        <p id={`${id}-error`} className="text-xs font-medium text-red-700">
          {error}
        </p>
      )}
    </fieldset>
  );
}

export function FileField({
  name,
  label,
  hint,
  optional,
  accept,
}: BaseProps & { accept: string }) {
  const id = useId();
  const { error } = useField(name);
  const [fileName, setFileName] = useState<string>();
  return (
    <FieldShell id={id} label={label} error={error} optional={optional} full>
      <label
        htmlFor={id}
        className={cn(
          "flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-brand-200 bg-brand-50/40 px-5 py-4 transition",
          "hover:border-brand-400 hover:bg-brand-50 has-focus-visible:ring-4 has-focus-visible:ring-brand-500/25",
          error && "border-red-400",
        )}
      >
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-brand-600 shadow-sm">
          <Upload className="size-4" />
        </span>
        <span className="min-w-0 text-sm">
          <span className="block truncate font-medium text-ink">{fileName ?? "Choose a file"}</span>
          <span className="text-muted">{hint}</span>
        </span>
        <input
          id={id}
          name={name}
          type="file"
          accept={accept}
          required={!optional}
          aria-invalid={error ? true : undefined}
          onChange={(e) => setFileName(e.target.files?.[0]?.name)}
          className="sr-only"
        />
      </label>
    </FieldShell>
  );
}

export function Consent({ children }: { children?: React.ReactNode }) {
  const id = useId();
  const { error } = useField("consent");
  const marketing = useField("marketing");
  return (
    <div className="grid gap-3 rounded-2xl bg-mist p-5">
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm text-body">
        <input
          id={id}
          type="checkbox"
          name="consent"
          required
          aria-invalid={error ? true : undefined}
          className="mt-0.5 size-4.5 shrink-0 accent-brand-600"
        />
        <span>
          {children ?? (
            <>
              I agree that InnTech Summit and iCentra may process my details to handle this request, in line with the{" "}
              <Link href="/privacy" className="font-medium text-brand-600 underline underline-offset-2">
                privacy policy
              </Link>{" "}
              and the Nigeria Data Protection Act.
            </>
          )}
        </span>
      </label>
      {error && <p className="text-xs font-medium text-red-700">{error}</p>}
      {children === undefined && (
        <label className="flex cursor-pointer items-start gap-3 text-sm text-body">
          <input
            type="checkbox"
            name="marketing"
            defaultChecked={marketing.value === "on"}
            className="mt-0.5 size-4.5 shrink-0 accent-brand-600"
          />
          <span>Send me summit news and updates. You can unsubscribe at any time.</span>
        </label>
      )}
    </div>
  );
}

export function HiddenField({ name, value }: { name: string; value: string }) {
  return <input type="hidden" name={name} value={value} />;
}
