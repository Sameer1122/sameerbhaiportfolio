import Link from "next/link";
import ContactForm from "../../components/ContactForm";

export const metadata = {
  title: "Contact | Portfolio",
  description: "Get in touch to discuss projects, collaborations, or ideas.",
};

export default function ContactPage() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "you@example.com";

  return (
    <main className="relative isolate">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] dark:opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(900px 300px at 10% -10%, #000 0, transparent 60%), radial-gradient(900px 300px at 110% 110%, #000 0, transparent 60%)",
        }}
      />

      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <header className="max-w-2xl">
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              Let’s build something great
            </span>
          </h1>
          <p className="mt-4 text-base text-foreground/80 dark:text-neutral-300">
            Tell me about your project, your goals, and your constraints. I’ll get back to you with ideas and next steps.
          </p>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Contact details */}
          <div className="rounded-3xl border border-foreground/10 p-6 shadow-elev-1">
            <div className="text-sm uppercase tracking-widest text-foreground/60 dark:text-neutral-400">
              Contact
            </div>
            <div className="mt-3 text-lg font-semibold">
              <Link
                href={`mailto:${email}`}
                className="underline decoration-transparent underline-offset-4 transition hover:decoration-foreground/40"
              >
                {email}
              </Link>
            </div>
            <p className="mt-4 text-sm text-foreground/75 dark:text-neutral-300">
              Prefer scheduling? Include your timezone and general availability.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-foreground/10 bg-foreground/5 p-4 shadow-elev-1">
                <div className="text-[11px] uppercase tracking-wider text-foreground/70">
                  Typical reply
                </div>
                <div className="mt-1 text-base font-medium text-foreground">24–48h</div>
              </div>
              <div className="rounded-2xl border border-foreground/10 bg-foreground/5 p-4 shadow-elev-1">
                <div className="text-[11px] uppercase tracking-wider text-foreground/70">
                  Availability
                </div>
                <div className="mt-1 text-base font-medium text-foreground">Open for projects</div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-gradient-to-br from-foreground/5 to-transparent p-1 shadow-elev-2">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 opacity-80 blur-2xl"
              style={{
                background:
                  "radial-gradient(700px 200px at 100% 0%, rgba(139,92,246,0.15) 0, transparent 60%), radial-gradient(600px 200px at 0% 100%, rgba(139,92,246,0.12) 0, transparent 55%)",
              }}
            />
            <div className="rounded-[calc(theme(borderRadius.3xl)-4px)] bg-background/80 p-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
