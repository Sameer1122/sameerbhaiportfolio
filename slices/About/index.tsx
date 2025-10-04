"use client";

import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

type AnySlice = {
  primary?: Record<string, any>;
  items?: any[];
};

type Props = {
  slice: AnySlice;
};

export default function About({ slice }: Props) {
  const p = slice?.primary || {};
  const items = Array.isArray(slice?.items) ? slice?.items : [];

  const heading = p.heading || [
    { type: "heading2", text: "About Me", spans: [] },
  ];
  const subheading: string = p.subheading || "Building for the web with care and craft.";
  const content = p.content || [
    {
      type: "paragraph",
      text:
        "I’m a full‑stack web developer focused on crafting crisp, accessible experiences. I enjoy shipping thoughtful UX, clean design, and scalable code.",
      spans: [],
    },
  ];
  const profile = p.profile_image;
  const highlights: string[] = Array.isArray(p.highlights)
    ? p.highlights
        .map((h: any) => (typeof h?.highlight === "string" ? h.highlight : ""))
        .filter(Boolean)
    : [];
  const stats: { label: string; value: string }[] = Array.isArray(p.stats)
    ? p.stats
        .map((s: any) => ({ label: String(s?.label || ""), value: String(s?.value || "") }))
        .filter((s) => s.label || s.value)
    : [];
  const resume = p.resume_link;
  const contact = p.contact_link;
  const socials: { label: string; url: any }[] = Array.isArray(p.socials)
    ? p.socials
        .map((s: any) => ({ label: String(s?.label || ""), url: s?.url }))
        .filter((s) => s.label && s.url)
    : [];

  const skills: string[] = items
    .map((it: any) => (typeof it?.skill === "string" ? it.skill : ""))
    .filter(Boolean)
    .slice(0, 12);

  return (
    <section className="relative isolate">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] dark:opacity-[0.1]"
        style={{
          backgroundImage:
            "radial-gradient(700px 200px at 10% 0%, #000 0, transparent 60%), radial-gradient(500px 200px at 100% 100%, #000 0, transparent 55%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(260px,360px)_1fr] lg:gap-16">
          {/* Profile / Media */}
          <aside className="order-2 lg:order-1">
            <div className="relative w-full overflow-hidden rounded-3xl border border-foreground/10 bg-gradient-to-br from-foreground/5 to-transparent shadow-elev-2">
              <div
                aria-hidden
                className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-foreground/20 to-transparent blur-2xl"
              />
              <div
                aria-hidden
                className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-tr from-foreground/20 to-transparent blur-2xl"
              />

              <div className="relative aspect-[4/5] w-full">
                {profile?.url ? (
                  <PrismicNextImage
                    field={profile}
                    alt={profile.alt || "Profile"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="h-24 w-24 rounded-2xl bg-foreground/10" />
                  </div>
                )}
              </div>
            </div>

            {stats.length > 0 ? (
              <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {stats.map((s, i) => (
                  <div
                    key={`${s.label}-${i}`}
                    className="rounded-2xl border border-foreground/10 bg-foreground/5 p-3 text-center shadow-elev-1"
                  >
                    <dt className="text-[11px] uppercase tracking-wider text-foreground/70">
                      {s.label}
                    </dt>
                    <dd className="mt-1 text-lg font-semibold text-foreground">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </aside>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                <PrismicRichText field={heading} />
              </span>
            </h2>
            <p className="mt-2 text-sm text-foreground/60 dark:text-neutral-400">{subheading}</p>

            <div className="mt-6 space-y-4 text-base text-foreground/80 dark:text-neutral-300">
              <PrismicRichText field={content} />
            </div>

            {highlights.length > 0 ? (
              <ul className="mt-6 list-inside list-disc space-y-2 text-foreground/90 dark:text-neutral-200">
                {highlights.map((h, i) => (
                  <li key={`${h}-${i}`}>{h}</li>
                ))}
              </ul>
            ) : null}

            {skills.length > 0 ? (
              <div className="mt-6">
                <div className="text-xs uppercase tracking-widest text-foreground/60 dark:text-neutral-400">
                  Skills
                </div>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {skills.map((s, i) => (
                    <li
                      key={`${s}-${i}`}
                      className="rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1 text-xs font-medium text-foreground/80"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {(resume?.url || contact?.url) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {resume?.url ? (
                  <PrismicNextLink
                    field={resume}
                    className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-90"
                  >
                    Download CV
                  </PrismicNextLink>
                ) : null}
                {contact?.url ? (
                  <PrismicNextLink
                    field={contact}
                    className="inline-flex items-center justify-center rounded-full border border-foreground/20 px-5 py-3 text-sm font-medium text-foreground transition hover:bg-foreground/5"
                  >
                    Contact Me
                  </PrismicNextLink>
                ) : null}
              </div>
            )}

            {socials.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-3">
                {socials.map((s, i) => (
                  <PrismicNextLink
                    key={`${s.label}-${i}`}
                    field={s.url}
                    className="inline-flex items-center rounded-full border border-foreground/15 px-3 py-1.5 text-xs text-foreground/80 hover:bg-foreground/5"
                  >
                    {s.label}
                  </PrismicNextLink>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
