"use client";

import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { subscribeNewsletter, type FormState } from "@/app/actions";
import { cn } from "@/lib/utils";

/** Compact newsletter signup for dark surfaces (footer, homepage band). */
export function NewsletterForm({ className }: { className?: string }) {
  const [state, action] = useActionState(subscribeNewsletter, { status: "idle" } as FormState);
  const id = useId();

  if (state.status === "success") {
    return (
      <p role="status" className={cn("flex items-start gap-3 rounded-2xl bg-white/5 p-4 text-sm text-white/85", className)}>
        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent-400" />
        {state.message}
      </p>
    );
  }

  return (
    <form action={action} noValidate className={cn("grid gap-3", className)}>
      <label htmlFor={`${id}-email`} className="sr-only">
        Email address
      </label>
      <div
        className={cn(
          "flex items-center gap-1 rounded-full border bg-white/[0.04] p-1.5 pl-5 transition focus-within:border-accent-400 focus-within:bg-white/[0.07]",
          state.errors?.email ? "border-red-400" : "border-white/15",
        )}
      >
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="Your email address"
          defaultValue={state.values?.email}
          aria-invalid={state.errors?.email ? true : undefined}
          aria-describedby={state.errors?.email ? `${id}-err` : undefined}
          className="min-w-0 flex-1 bg-transparent text-[0.95rem] text-white outline-none placeholder:text-white/40 focus-visible:outline-none"
        />
        <Submit />
      </div>
      <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-white/55">
        <input type="checkbox" name="consent" required className="mt-0.5 size-3.5 shrink-0 accent-accent-400" />
        <span>
          I agree to receive InnTech updates and accept the{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-white">
            privacy policy
          </Link>
          .
        </span>
      </label>
      <input type="text" name="website_confirm" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      {state.status === "error" && (
        <p id={`${id}-err`} role="alert" className="text-xs font-medium text-red-300">
          {state.errors?.email ?? state.errors?.consent ?? state.message}
        </p>
      )}
    </form>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-label="Subscribe"
      className="group/s grid size-10 shrink-0 place-items-center rounded-full bg-accent-400 text-night-950 transition hover:bg-accent-300 disabled:opacity-60"
    >
      {pending ? (
        <LoaderCircle className="size-4 animate-spin" />
      ) : (
        <ArrowRight className="size-4 transition-transform group-hover/s:translate-x-0.5" />
      )}
    </button>
  );
}
