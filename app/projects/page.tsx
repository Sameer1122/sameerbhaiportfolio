import { createClient } from "../../prismicio";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

type ProjectDoc = any;

function Card({ p }: { p: any }) {
  const title: string = p?.data?.title || "Untitled Project";
  const desc = p?.data?.description || [
    {
      type: "paragraph",
      text:
        "A thoughtfully engineered project showcasing modern web techniques and attention to detail.",
      spans: [],
    },
  ];
  const img = p?.data?.thumbnail;
  const year = p?.data?.year || "";
  const accent: string = p?.data?.accent_color || "#6EE7F9"; // cyan-300 default
  const live = p?.data?.live_url;
  const repo = p?.data?.repo_url;
  const tags: string[] = Array.isArray(p?.data?.tags)
    ? p.data.tags.map((t: any) => (typeof t?.tag === "string" ? t.tag : "")).filter(Boolean)
    : [];

  return (
    <article
      className="group relative isolate grid overflow-hidden rounded-3xl border border-foreground/10 bg-background/80 p-3 shadow-elev-2 transition-transform duration-300 hover:-translate-y-1"
    >
      <div
        aria-hidden
        className="absolute inset-px -z-10 rounded-[calc(theme(borderRadius.3xl)-1px)] opacity-0 ring-1 ring-inset ring-foreground/10 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `linear-gradient(180deg, ${accent}14, transparent)` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-80 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            `radial-gradient(600px 200px at 100% 0%, ${accent}33 0, transparent 60%), radial-gradient(500px 200px at 0% 100%, ${accent}22 0, transparent 55%)`,
        }}
      />

      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
        {img?.url ? (
          <PrismicNextImage
            field={img}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            alt={img.alt || title}
            priority={false}
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-foreground/5">
            <div className="h-12 w-12 rounded-xl bg-foreground/10" />
          </div>
        )}
        {year ? (
          <div className="pointer-events-none absolute right-3 top-3 rounded-full border border-foreground/15 bg-background/70 px-2 py-1 text-[10px] font-medium text-foreground/70 backdrop-blur">
            {year}
          </div>
        ) : null}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold tracking-tight">
          <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            {title}
          </span>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-foreground/75 dark:text-neutral-300">
          {Array.isArray(desc) ? desc[0]?.text ?? "" : String(desc)}
        </p>

        {tags.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-2">
            {tags.map((t, i) => (
              <li
                key={`${t}-${i}`}
                className="rounded-full border border-foreground/15 bg-foreground/5 px-2.5 py-1 text-[11px] text-foreground/70"
              >
                {t}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-4 flex gap-2">
          {live?.url ? (
            <PrismicNextLink
              field={live}
              className="inline-flex items-center gap-1 rounded-full bg-foreground px-3 py-1.5 text-xs font-medium text-background hover:opacity-90"
            >
              <span>Live</span>
            </PrismicNextLink>
          ) : null}
          {repo?.url ? (
            <PrismicNextLink
              field={repo}
              className="inline-flex items-center gap-1 rounded-full border border-foreground/20 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-foreground/5"
            >
              <span>Code</span>
            </PrismicNextLink>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default async function ProjectsPage() {
  const client = createClient();
  let docs: ProjectDoc[] = [];

  try {
    docs = await client.getAllByType("project");
  } catch (e) {
    // No Prismic yet or API not configured.
  }

  if (!Array.isArray(docs) || docs.length === 0) {
    // Local fallbacks so the page feels complete pre-CMS
    docs = [
      {
        id: "fallback-1",
        data: {
          title: "Portfolio Website",
          description: [
            {
              type: "paragraph",
              text:
                "Personal site built with Next.js, Tailwind, and Prismic slices. Focused on performance and smooth UX.",
              spans: [],
            },
          ],
          year: 2025,
          accent_color: "#6EE7F9",
          thumbnail: null,
          live_url: { link_type: "Web", url: "#" },
          repo_url: { link_type: "Web", url: "#" },
          tags: [{ tag: "Next.js" }, { tag: "Tailwind" }, { tag: "Prismic" }],
        },
      },
      {
        id: "fallback-2",
        data: {
          title: "E‑commerce Starter",
          description: [
            {
              type: "paragraph",
              text:
                "Composable storefront patterns with clean architecture, SSR/ISR, and accessible UI components.",
              spans: [],
            },
          ],
          year: 2024,
          accent_color: "#FDE68A",
          thumbnail: null,
          live_url: { link_type: "Web", url: "#" },
          repo_url: { link_type: "Web", url: "#" },
          tags: [{ tag: "React" }, { tag: "Stripe" }, { tag: "Vercel" }],
        },
      },
      {
        id: "fallback-3",
        data: {
          title: "Design System Kit",
          description: [
            {
              type: "paragraph",
              text:
                "A lightweight, token‑driven component library with theming and strong a11y defaults.",
              spans: [],
            },
          ],
          year: 2023,
          accent_color: "#C4B5FD",
          thumbnail: null,
          live_url: { link_type: "Web", url: "#" },
          repo_url: { link_type: "Web", url: "#" },
          tags: [{ tag: "TypeScript" }, { tag: "Storybook" }],
        },
      },
    ];
  }

  // Sort by year desc if available
  docs.sort((a: any, b: any) => (b?.data?.year ?? 0) - (a?.data?.year ?? 0));

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
              Projects
            </span>
          </h1>
          <p className="mt-4 text-base text-foreground/80 dark:text-neutral-300">
            A curated selection of work exploring performance, accessibility, and clean design. Built with modern tooling and thoughtful UX.
          </p>
        </header>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {docs.map((p) => (
            <Card key={p.id} p={p} />)
          )}
        </div>
      </section>
    </main>
  );
}
