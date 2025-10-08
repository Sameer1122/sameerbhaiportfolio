"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactForm from "../components/ContactForm";

type CaseStudy = {
  company: string;
  role: string;
  description: string;
  highlights: string[];
  outcomes: string[];
  tech: string[];
};

type Service = {
  title: string;
  description: string;
  bullets: string[];
};

type ProcessStep = {
  title: string;
  description: string;
};

type Testimonial = {
  quote: string;
  name: string;
  title: string;
};

type Principle = {
  title: string;
  description: string;
};

const stats = [
  { value: "7+", label: "Years leading full-stack product delivery" },
  { value: "18", label: "Venture-backed launches delivered end-to-end" },
  { value: "$420M", label: "Capital raised by teams I have supported" },
  { value: "99.95%", label: "Average uptime across managed workloads" },
] as const;

const focusItems = [
  "Ledger Investing — modernizing specialty insurance underwriting and pricing",
  "IDA.eu — scaling travel operations tooling across six European hubs",
  "YC fintech founders — shipping a compliance-ready platform in under 90 days",
] as const;

const achievements = [
  "Multi-account AWS landing zones with automated guardrails and audit trails",
  "CI/CD pipelines via GitHub Actions, CodePipeline, and ArgoCD for safe rollouts",
  "Observability stacks using OpenTelemetry, Datadog, and native CloudWatch insights",
  "Cost-aware architectures balancing serverless, spot fleets, and Graviton workloads",
] as const;

const caseStudies: CaseStudy[] = [
  {
    company: "Ledger Investing",
    role: "Principal Full-Stack Engineer (Fractional)",
    description:
      "Brought in to unify underwriting, pricing, and analytics into a platform brokers and carriers can trust.",
    highlights: [
      "Orchestrated a secure multi-region AWS architecture spanning VPC networking, EventBridge, and Step Functions",
      "Rebuilt broker-facing experiences with Next.js, tRPC, and design system guardrails for rapid iteration",
      "Introduced infrastructure-as-code with AWS CDK, golden pipelines, and staged releases with feature flags",
    ],
    outcomes: [
      "Cut quoting cycle time by 45% while eliminating weekend fire drills",
      "Enabled the team to close their Series B round with enterprise-readiness proof",
    ],
    tech: ["Next.js", "TypeScript", "AWS CDK", "EventBridge", "PostgreSQL", "Datadog"],
  },
  {
    company: "IDA.eu",
    role: "Lead Platform Consultant",
    description:
      "Partnered with operations and product to transform a paper-heavy logistics business into a resilient SaaS platform.",
    highlights: [
      "Decomposed a monolith into service boundaries backed by GraphQL federation and serverless functions",
      "Deployed a geo-aware content pipeline using S3, Lambda@Edge, and DynamoDB streams",
      "Embedded experiment frameworks for pricing using feature toggles and warehouse feedback loops",
    ],
    outcomes: [
      "Improved booking conversion by 32% across primary markets",
      "Expanded platform coverage to four new countries without downtime",
    ],
    tech: ["React", "NestJS", "GraphQL", "AWS Lambda", "Step Functions", "Snowflake"],
  },
  {
    company: "YC Portfolio (Stealth Fintech)",
    role: "Fractional Head of Engineering",
    description:
      "Guided a seed-stage team from prototype to compliance-ready launch serving regulated financial partners.",
    highlights: [
      "Implemented SOC2-aligned controls with Terraform-managed AWS Organizations and IAM guardrails",
      "Built automated risk scoring pipelines using Python, Kafka, and serverless batch processing",
      "Coached the internal team on delivery rituals, code quality, and observability best practices",
    ],
    outcomes: [
      "Shipped the first enterprise contract in 11 weeks with zero P0 incidents",
      "Secured follow-on Series A financing backed by reliability metrics",
    ],
    tech: ["Terraform", "AWS Organizations", "Python", "Kafka", "React", "CircleCI"],
  },
  {
    company: "PrimeLayer",
    role: "Principal Full-Stack Engineer (Fractional)",
    description:
      "SaaS builder for structured data systems — designed internal backend and AI‑assisted frontend builder powering 10+ active organizations.",
    highlights: [
      "Defined multi-tenant architecture, access controls, and data modeling foundations",
      "Built AI‑assisted UI builder enabling non-engineers to compose workflows",
    ],
    outcomes: [
      "Adopted by 10+ organizations with faster iteration on internal tools",
    ],
    tech: ["Next.js", "TypeScript", "AWS", "PostgreSQL"],
  },
  {
    company: "Viste AI",
    role: "Lead Architect",
    description:
      "AI SaaS platform for retail computer vision — built from scratch, architected cloud APIs, optimized inference pipeline, and launched MVP in 6 weeks.",
    highlights: [
      "Architected cloud APIs and data pipelines for ingestion and inference",
      "Optimized on-demand inference with cost-aware execution and caching",
    ],
    outcomes: [
      "Launched MVP in 6 weeks with a clear path to scale",
    ],
    tech: ["React", "TypeScript", "Python", "AWS"],
  },
  {
    company: "ArtifactX",
    role: "Lead Engineer",
    description:
      "NFT marketplace and smart contract ecosystem — handled full-stack Web3 architecture, event-based indexer, and AWS-based metadata pipeline.",
    highlights: [
      "Led core engineering team; built event-based indexer to track on-chain activity",
      "Built metadata processing pipeline on AWS for reliable refreshes",
    ],
    outcomes: [
      "Revenue during beta with stable on-chain indexing",
      "5% equity stake for engineering leadership",
    ],
    tech: ["Next.js", "TypeScript", "AWS"],
  },
  {
    company: "Cryft Network",
    role: "Blockchain Infrastructure & Security (Contract)",
    description:
      "High-trust blockchain engagement focused on securing live crypto infrastructure.",
    highlights: [
      "Rebuilt production website, Node.js backend, and integrated smart-contract APIs",
      "Hardened deployments against common on-chain exploits with zero downtime",
    ],
    outcomes: [
      "Maintained zero downtime during security hardening",
    ],
    tech: ["Next.js", "Node.js", "Solidity", "Ethers.js", "Hardhat", "AWS"],
  },
  {
    company: "Oliva Health",
    role: "Senior Engineer (Fractional)",
    description:
      "Mental health startup (Series B) — migrated legacy Webflow to Next.js + Prismic, implemented SEO-focused content delivery and analytics integration.",
    highlights: [
      "Migrated marketing platform to Next.js + Prismic with preview flows",
      "Implemented SEO-first rendering and analytics instrumentation",
    ],
    outcomes: [
      "Improved editorial velocity with safer, measurable releases",
    ],
    tech: ["Next.js", "TypeScript", "Prismic", "Vercel"],
  },
];

const services: Service[] = [
  {
    title: "Full-Stack Product Leadership",
    description: "Fractional engineering leadership owning roadmap, architecture, and delivery.",
    bullets: [
      "Translate ambitious founder goals into measurable product increments",
      "Ship hands-on across Next.js, Node.js, Python, and modern front-end stacks",
      "Institutionalize code review, release cadences, and engineering playbooks",
    ],
  },
  {
    title: "AWS Architecture & Operations",
    description: "Design and operate resilient, cost-aware cloud infrastructure.",
    bullets: [
      "Multi-account landing zones, network segmentation, and compliance guardrails",
      "Infrastructure as code with Terraform or AWS CDK plus automated drift detection",
      "Observability with OpenTelemetry, Datadog, and pragmatic incident response loops",
    ],
  },
  {
    title: "Delivery Acceleration & Pipelines",
    description: "Modernize CI/CD so teams can ship confidently several times a day.",
    bullets: [
      "Opinionated pipelines using GitHub Actions, CodeBuild, and ArgoCD",
      "Progressive delivery strategies including feature flags and canary releases",
      "Developer experience workflows: automated QA, preview environments, quality gates",
    ],
  },
];

const processSteps: ProcessStep[] = [
  {
    title: "01 / Discovery & Alignment",
    description:
      "Immersive workshops with founders, product, and operations to map constraints, compliance, and success metrics.",
  },
  {
    title: "02 / Architecture Blueprints",
    description:
      "Collaborative architecture artifacts with C4 diagrams, AWS reference stacks, and decision records to de-risk execution.",
  },
  {
    title: "03 / Delivery & Enablement",
    description:
      "Lead sprints, pair with internal engineers, and ship vertical slices weekly with automated quality gates.",
  },
  {
    title: "04 / Reliability & Growth",
    description:
      "Operational handover, runbooks, observability dashboards, and hiring support to sustain momentum.",
  },
];

const testimonials: Testimonial[] = [
  {
    quote:
      "Sameer gave us the confidence to speak to enterprise clients. Infrastructure, product velocity, and team rituals leveled up fast.",
    name: "Paul M.",
    title: "CEO, Ledger Investing",
  },
  {
    quote:
      "He translated legacy chaos into a crisp roadmap and delivered it. Series A diligence became the easiest part of our raise.",
    name: "Laura F.",
    title: "Chief Product Officer, IDA.eu",
  },
  {
    quote:
      "We got a fractional CTO who still wrote the tough code. Compliance, pipelines, and customer trust followed quickly.",
    name: "YC Founder",
    title: "Stealth Fintech (Series A)",
  },
];

const toolbelt = [
  "Next.js 15, React 19, Remix",
  "TypeScript, Python, Go",
  "PostgreSQL, DynamoDB, Snowflake",
  "EventBridge, Step Functions, Kafka, SQS",
  "Terraform, AWS CDK, Pulumi",
  "GitHub Actions, CircleCI, ArgoCD",
  "Datadog, New Relic, OpenTelemetry",
  "Storybook, Design Systems, Accessibility",
] as const;

const operatingPrinciples: Principle[] = [
  {
    title: "Design for auditability",
    description:
      "Versioned infrastructure, automated change records, and compliance artifacts from day one.",
  },
  {
    title: "Data-driven iteration",
    description:
      "Telemetry-first decisions, experimentation platforms, and customer feedback loops built into the roadmap.",
  },
  {
    title: "People enablement",
    description:
      "Pairing, documentation, and rituals that leave internal teams stronger than when I arrived.",
  },
];

export default function HomePage() {
  const pageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!pageRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const heroItems = gsap.utils.toArray<HTMLElement>(".hero-animate");
      if (heroItems.length) {
        gsap.from(heroItems, {
          opacity: 0,
          y: 28,
          duration: 1,
          ease: "power3.out",
          stagger: 0.14,
          delay: 0.15,
        });
      }

      gsap.utils.toArray<HTMLElement>(".fade-in-on-scroll").forEach((element) => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: "top 82%",
          },
          opacity: 0,
          y: 36,
          duration: 0.9,
          ease: "power3.out",
        });
      });

      gsap.utils.toArray<HTMLElement>(".case-card").forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="relative overflow-hidden bg-background text-foreground">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-foreground/10 blur-3xl sm:h-[680px] sm:w-[680px]" />
        <div className="absolute right-12 top-1/3 h-64 w-64 rounded-full bg-emerald-500/15 blur-3xl dark:bg-emerald-400/10" />
        <div className="absolute left-12 bottom-0 h-72 w-72 rounded-full bg-sky-500/15 blur-3xl dark:bg-sky-400/10" />
      </div>

      <div className="relative pb-24">
        <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 pt-10 text-sm">
          <div className="flex items-center gap-2 font-mono uppercase tracking-[0.3em] text-foreground/70">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Sameer Ahmed
          </div>
          <nav className="hidden items-center gap-6 text-foreground/70 md:flex">
            <Link href="#case-studies" className="transition hover:text-foreground">
              Case Studies
            </Link>
            <Link href="#services" className="transition hover:text-foreground">
              Services
            </Link>
            <Link href="#process" className="transition hover:text-foreground">
              Way of Working
            </Link>
            <Link href="#contact" className="transition hover:text-foreground">
              Contact
            </Link>
          </nav>
          <a
            href="mailto:hello@sameer.build"
            className="inline-flex items-center justify-center rounded-full border border-foreground/15 bg-background/80 px-4 py-2 font-medium text-foreground shadow-sm backdrop-blur transition hover:border-foreground/30 hover:bg-foreground/5"
          >
            hello@sameer.build
          </a>
        </header>

        <section id="top" className="relative px-6 pb-24 pt-28 sm:pt-32">
          <div className="mx-auto max-w-6xl">
            <p className="hero-animate inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-foreground/70 shadow-sm backdrop-blur">
              Senior Full-Stack & AWS Engineering Leader
            </p>
            <h1 className="hero-animate mt-10 max-w-4xl text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
              I ship venture-ready platforms that scale from first customer to Series B—reliably.
            </h1>
            <p className="hero-animate mt-6 max-w-3xl text-lg text-foreground/80 sm:text-xl">
              Seven years leading high-stakes builds for YC founders, insurance marketplaces, and fintech teams.
              Type-safe full‑stack engineering and AWS architecture focused on uptime, speed, and measurable outcomes.
            </p>
            <div className="hero-animate mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-medium !text-white dark:!text-background shadow-elev-1 transition hover:opacity-90"
              >
                Book intro
              </Link>
              <Link
                href="#case-studies"
                className="inline-flex items-center justify-center rounded-full border border-foreground/20 px-6 py-3 text-sm font-medium text-foreground transition hover:border-foreground/40 hover:bg-foreground/5"
              >
                See proof of work
              </Link>
            </div>
            <div className="hero-animate mt-12 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
              <div className="rounded-3xl border border-foreground/15 bg-background/80 p-8 shadow-elev-1 backdrop-blur">
                <h2 className="text-sm font-medium uppercase tracking-[0.25em] text-foreground/60">Current Mandates</h2>
                <ul className="mt-4 space-y-3 text-sm text-foreground/80 sm:text-base">
                  {focusItems.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-foreground/10 bg-foreground/95 p-8 text-background shadow-elev-2">
                <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-background/70">AWS, done right</h3>
                <ul className="mt-5 space-y-3 text-sm sm:text-base">
                  {achievements.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section id="stats" className="relative border-y border-foreground/10 bg-background/70 py-16 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="stat-card rounded-3xl border border-foreground/10 bg-background/90 p-6 text-center shadow-elev-1"
              >
                <div className="text-4xl font-semibold tracking-tight sm:text-5xl">{value}</div>
                <p className="mt-3 text-sm text-foreground/70">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="case-studies" className="fade-in-on-scroll px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">Case Studies</p>
              <h2 className="mt-3 max-w-3xl text-balance text-3xl font-semibold sm:text-4xl">
                Outcomes for venture-backed teams shipping regulated and high-trust products.
              </h2>
            </div>
            <a
              href="mailto:hello@sameer.build"
              className="inline-flex items-center justify-center rounded-full border border-foreground/15 px-4 py-2 text-sm font-medium text-foreground transition hover:border-foreground/30 hover:bg-foreground/5"
            >
              Request the full portfolio
            </a>
          </div>

          <div className="mt-12 space-y-8">
            {caseStudies.map((study) => (
              <article
                key={study.company}
                className="case-card rounded-3xl border border-foreground/12 bg-background/85 p-8 shadow-elev-1 backdrop-blur lg:p-12"
              >
                <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
                  <div className="max-w-2xl space-y-5">
                    <div className="flex flex-wrap items-center gap-3 text-sm uppercase tracking-[0.25em] text-foreground/60">
                      <span>{study.company}</span>
                      <span className="hidden h-1 w-1 rounded-full bg-foreground/30 sm:inline" />
                      <span className="text-foreground/50">{study.role}</span>
                    </div>
                    <p className="text-lg text-foreground/80">{study.description}</p>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/50">Highlights</p>
                      <ul className="mt-3 space-y-3 text-sm text-foreground/80">
                        {study.highlights.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="max-w-sm space-y-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/50">Results</p>
                      <ul className="mt-3 space-y-3 text-sm text-foreground/80">
                        {study.outcomes.map((outcome) => (
                          <li key={outcome} className="flex items-start gap-3">
                            <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-sky-500" />
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/50">Stack</p>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium text-foreground/70">
                        {study.tech.map((tool) => (
                          <span key={tool} className="rounded-full border border-foreground/15 px-3 py-1">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="fade-in-on-scroll bg-foreground/5 px-6 py-24 dark:bg-foreground/10">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">Services</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold sm:text-4xl">
              Fractional leadership with hands-on delivery when the roadmap is too important to stall.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.title} className="rounded-3xl border border-foreground/10 bg-background/90 p-8 shadow-elev-1">
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="mt-3 text-sm text-foreground/75">{service.description}</p>
                <ul className="mt-5 space-y-3 text-sm text-foreground/80">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-foreground/50" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="principles" className="fade-in-on-scroll px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">Operating Principles</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold sm:text-4xl">
              Technical leadership anchored in clarity, measurement, and enablement.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {operatingPrinciples.map((principle) => (
              <div key={principle.title} className="rounded-3xl border border-foreground/10 bg-background/90 p-8 shadow-elev-1">
                <h3 className="text-lg font-semibold">{principle.title}</h3>
                <p className="mt-3 text-sm text-foreground/80">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="fade-in-on-scroll bg-background/80 px-6 py-24 backdrop-blur">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">Way of Working</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold sm:text-4xl">
              Proven delivery rhythm that keeps momentum high and surprises low.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-4">
            {processSteps.map((step) => (
              <div key={step.title} className="rounded-3xl border border-foreground/10 bg-background/95 p-6 shadow-elev-1">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/60">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm text-foreground/80">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tooling" className="fade-in-on-scroll px-6 py-24">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">Tooling & Stack</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold sm:text-4xl">
              Modern, pragmatic tooling that scales with your team.
            </h2>
            <p className="mt-5 text-sm text-foreground/75">
              I meet teams where they are, then evolve the stack with automation and observability so releases stay boring
              and customer impact stays loud.
            </p>
          </div>
          <div className="flex-1">
            <div className="grid gap-3 sm:grid-cols-2">
              {toolbelt.map((item) => (
                <div key={item} className="rounded-2xl border border-foreground/10 bg-background/90 px-5 py-4 text-sm text-foreground/75">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="fade-in-on-scroll bg-foreground/5 px-6 py-24 dark:bg-foreground/10">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">Founder Voices</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold sm:text-4xl">
              Trusted by repeat founders and venture-backed teams.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <figure key={testimonial.quote} className="rounded-3xl border border-foreground/10 bg-background/90 p-8 shadow-elev-1">
                <blockquote className="text-sm text-foreground/80">"{testimonial.quote}"</blockquote>
                <figcaption className="mt-6 text-sm font-medium text-foreground/70">
                  {testimonial.name}
                  <span className="block font-normal text-foreground/60">{testimonial.title}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="fade-in-on-scroll px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div className="rounded-3xl border border-foreground/10 bg-background/90 p-8 shadow-elev-1">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">Let's Build</p>
              <h2 className="mt-3 text-balance text-3xl font-semibold sm:text-4xl">
                Ready for your launch or scale chapter? Let's architect it together.
              </h2>
              <p className="mt-5 text-sm text-foreground/75">
                Tell me about the product you are building, where the risk sits today, and the traction you need in the next
                two quarters. I will respond within one business day with next steps.
              </p>
              <div className="mt-6 space-y-3 text-sm text-foreground/70">
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  <a href="mailto:hello@sameer.build" className="underline-offset-4 hover:underline">
                    hello@sameer.build
                  </a>
                </p>
                <p>
                  <span className="font-medium">Based in:</span> Remote across EU & North America
                </p>
                <p>
                  <span className="font-medium">Engagements:</span> Fractional leadership, build squads, architecture audits
                </p>
              </div>
            </div>
            <div className="rounded-3xl border border-foreground/10 bg-background/95 p-8 shadow-elev-1">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-foreground/10 bg-background/85 px-6 py-10 text-sm text-foreground/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span>Copyright {new Date().getFullYear()} Sameer Ahmed. Available for fractional leadership engagements.</span>
          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="hover:text-foreground">
              LinkedIn
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-foreground">
              GitHub
            </a>
            <a href="mailto:hello@sameer.build" className="hover:text-foreground">
              Email
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}


