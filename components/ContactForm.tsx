"use client";

import { useState } from "react";

type Payload = {
  name: string;
  email: string;
  message: string;
  subject?: string;
  company?: string; // honeypot
};

export default function ContactForm() {
  const [payload, setPayload] = useState<Payload>({
    name: "",
    email: "",
    message: "",
    subject: "",
    company: "",
  });
  const [status, setStatus] = useState<
    | { state: "idle" }
    | { state: "loading" }
    | { state: "success" }
    | { state: "error"; message: string }
  >({ state: "idle" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status.state === "loading") return;
    if (payload.company) return; // honeypot

    setStatus({ state: "loading" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to send message");
      }

      setStatus({ state: "success" });
      setPayload({ name: "", email: "", message: "", subject: "", company: "" });
    } catch (err: any) {
      setStatus({ state: "error", message: err?.message || "Something went wrong" });
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          value={payload.name}
          onChange={(e) => setPayload((p) => ({ ...p, name: e.target.value }))}
          className="mt-1 w-full rounded-xl border border-foreground/15 bg-background px-3 py-2 text-sm outline-none ring-0 transition focus:border-foreground/30"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          required
          value={payload.email}
          onChange={(e) => setPayload((p) => ({ ...p, email: e.target.value }))}
          className="mt-1 w-full rounded-xl border border-foreground/15 bg-background px-3 py-2 text-sm outline-none ring-0 transition focus:border-foreground/30"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium">
          Subject (optional)
        </label>
        <input
          id="subject"
          name="subject"
          value={payload.subject}
          onChange={(e) => setPayload((p) => ({ ...p, subject: e.target.value }))}
          className="mt-1 w-full rounded-xl border border-foreground/15 bg-background px-3 py-2 text-sm outline-none ring-0 transition focus:border-foreground/30"
          placeholder="Quick chat about a project"
        />
      </div>

      <div className="hidden" aria-hidden>
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          value={payload.company}
          onChange={(e) => setPayload((p) => ({ ...p, company: e.target.value }))}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={payload.message}
          onChange={(e) => setPayload((p) => ({ ...p, message: e.target.value }))}
          className="mt-1 w-full resize-y rounded-xl border border-foreground/15 bg-background px-3 py-2 text-sm outline-none ring-0 transition focus:border-foreground/30"
          placeholder="Share details about your goals, timeline, and constraints."
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={status.state === "loading"}
          className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90 disabled:opacity-60"
        >
          {status.state === "loading" ? "Sending…" : "Send message"}
        </button>
        {status.state === "success" ? (
          <span className="text-sm text-emerald-600 dark:text-emerald-400">
            Thanks! I’ll get back to you shortly.
          </span>
        ) : status.state === "error" ? (
          <span className="text-sm text-red-600 dark:text-red-400">
            {status.message}
          </span>
        ) : null}
      </div>
    </form>
  );
}

