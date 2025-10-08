"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

type Payload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string; // honeypot
};

type SubmitState =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "success" }
  | { state: "error"; message: string };

const initialPayload: Payload = {
  name: "",
  email: "",
  subject: "",
  message: "",
  company: "",
};

export default function ContactForm() {
  const [payload, setPayload] = useState<Payload>(initialPayload);
  const [status, setStatus] = useState<SubmitState>({ state: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.state === "loading") return;
    if (payload.company) return; // bots only

    setStatus({ state: "loading" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(typeof data?.error === "string" ? data.error : "Unable to send message");
      }

      setStatus({ state: "success" });
      setPayload(initialPayload);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      setStatus({ state: "error", message });
    }
  }

  function onChange<T extends keyof Payload>(key: T) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setPayload((prev) => ({ ...prev, [key]: value }));
    };
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-[0.25em] text-foreground/60">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            value={payload.name}
            onChange={onChange("name")}
            placeholder="Jane Founder"
            className="mt-2 w-full rounded-xl border border-foreground/15 bg-background px-3 py-2 text-sm outline-none transition focus:border-foreground/35"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-[0.25em] text-foreground/60">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            required
            value={payload.email}
            onChange={onChange("email")}
            placeholder="you@company.com"
            className="mt-2 w-full rounded-xl border border-foreground/15 bg-background px-3 py-2 text-sm outline-none transition focus:border-foreground/35"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-[0.25em] text-foreground/60">
          Subject (optional)
        </label>
        <input
          id="subject"
          name="subject"
          value={payload.subject}
          onChange={onChange("subject")}
          placeholder="Architecture sprint or fractional leadership"
          className="mt-2 w-full rounded-xl border border-foreground/15 bg-background px-3 py-2 text-sm outline-none transition focus:border-foreground/35"
        />
      </div>

      <div className="hidden" aria-hidden>
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          value={payload.company}
          onChange={onChange("company")}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-[0.25em] text-foreground/60">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={payload.message}
          onChange={onChange("message")}
          placeholder="Share your goals, current constraints, and timelines."
          className="mt-2 w-full rounded-xl border border-foreground/15 bg-background px-3 py-2 text-sm outline-none transition focus:border-foreground/35"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={status.state === "loading"}
          className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition hover:opacity-90 disabled:opacity-60"
        >
          {status.state === "loading" ? "Sending..." : "Send message"}
        </button>
        <div className="text-sm text-foreground/70" aria-live="polite">
          {status.state === "success" && "Thanks for reaching out. I will reply within one business day."}
          {status.state === "error" && status.message}
        </div>
      </div>
    </form>
  );
}
