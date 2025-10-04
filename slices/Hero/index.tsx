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

export default function Hero({ slice }: Props) {
  const p = slice?.primary || {};

  const eyebrow: string = p.eyebrow || "Software Engineer";
  const heading = p.heading || [
    { type: "heading1", text: "Hi, I’m Sameer.", spans: [] },
  ];
  const headingText = Array.isArray(heading)
    ? heading.map((b: any) => (typeof b?.text === "string" ? b.text : "")).join(" ")
    : String(heading ?? "");
  const description = p.description || [
    {
      type: "paragraph",
      text:
        "I craft delightful, performant web experiences with Next.js and modern tooling.",
      spans: [],
    },
  ];
  const primaryCtaLabel: string = p.primary_cta_label || "Get in touch";
  const primaryCtaLink = p.primary_cta_link || { link_type: "Web", url: "#contact" };
  const secondaryCtaLabel: string = p.secondary_cta_label || "View projects";
  const secondaryCtaLink = p.secondary_cta_link || { link_type: "Web", url: "#projects" };
  const illustration = p.illustration;

  return (
    <section className="relative isolate">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08] dark:opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 10%, #000 0, transparent 40%), radial-gradient(circle at 80% 40%, #000 0, transparent 42%), radial-gradient(circle at 40% 80%, #000 0, transparent 45%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            {eyebrow ? (
              <span className="text-xs uppercase tracking-widest text-foreground/60 dark:text-neutral-400">
                {eyebrow}
              </span>
            ) : null}

            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                {headingText}
              </span>
            </h1>

            <div className="max-w-none text-base text-foreground/80 dark:text-neutral-300">
              <PrismicRichText field={description} />
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <PrismicNextLink
                field={primaryCtaLink}
                className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
              >
                {primaryCtaLabel}
              </PrismicNextLink>
              <PrismicNextLink
                field={secondaryCtaLink}
                className="inline-flex items-center justify-center rounded-full border border-foreground/20 px-5 py-3 text-sm font-medium text-foreground transition hover:bg-foreground/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
              >
                {secondaryCtaLabel}
              </PrismicNextLink>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[480px]">
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-foreground/10 bg-gradient-to-br from-foreground/5 to-transparent shadow-elev-2">
              <div
                aria-hidden
                className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-gradient-to-br from-foreground/20 to-transparent blur-2xl"
              />
              <div
                aria-hidden
                className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-tr from-foreground/20 to-transparent blur-2xl"
              />

              {illustration?.url ? (
                <div className="absolute inset-0">
                  <PrismicNextImage
                    field={illustration}
                    alt={illustration.alt || "Profile image"}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                <div className="absolute inset-0 grid place-items-center">
                  <div className="h-32 w-32 rounded-2xl bg-foreground/10" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
