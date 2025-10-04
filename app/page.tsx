/* eslint-disable @typescript-eslint/no-explicit-any */
import { SliceZone } from "@prismicio/react";
import { createClient } from "../prismicio";
import { components } from "../slices";

export default async function Home() {
  const client = createClient();

  let page: any = null;
  try {
    page = await client.getSingle("homepage");
  } catch (e) {
    console.log(e);
    // No Prismic content yet; we will render a sensible local fallback
  }

  // Fallback to a local hero slice if Prismic is not set up yet.
  const fallbackSlices = [
    {
      slice_type: "hero",
      variation: "default",
      version: "1",
      items: [],
      primary: {
        eyebrow: "Developer • Designer",
        heading: [
          { type: "heading1", text: "Hi, I’m Sameer.", spans: [] },
        ],
        description: [
          {
            type: "paragraph",
            text:
              "I build clean, fast, and accessible web apps using Next.js and contemporary tools.",
            spans: [],
          },
        ],
        primary_cta_label: "Get in touch",
        primary_cta_link: { link_type: "Web", url: "/contact" },
        secondary_cta_label: "View projects",
        secondary_cta_link: { link_type: "Web", url: "/projects" },
        illustration: null,
      },
    },
    {
      slice_type: "about",
      variation: "default",
      version: "1",
      items: [
        { skill: "Next.js" },
        { skill: "TypeScript" },
        { skill: "Tailwind" },
        { skill: "Prismic" },
        { skill: "React" },
        { skill: "Node.js" }
      ],
      primary: {
        heading: [
          { type: "heading2", text: "About Me", spans: [] }
        ],
        subheading: "Building for the web since 2018",
        content: [
          {
            type: "paragraph",
            text:
              "I’m a full‑stack developer who loves building delightful, performant experiences. I care about good UX, clean design systems, and maintainable code.",
            spans: [],
          },
        ],
        highlights: [
          { highlight: "Performance-first mindset and accessibility focus" },
          { highlight: "Design systems and component libraries" },
          { highlight: "End-to-end product thinking" }
        ],
        stats: [
          { label: "Years", value: "5+" },
          { label: "Projects", value: "30+" },
          { label: "Clients", value: "12+" }
        ],
        resume_link: { link_type: "Web", url: "#resume" },
        contact_link: { link_type: "Web", url: "/contact" },
        socials: [
          { label: "GitHub", url: { link_type: "Web", url: "#" } },
          { label: "LinkedIn", url: { link_type: "Web", url: "#" } }
        ],
        profile_image: null,
      },
    },
  ];

  const slices = page?.data?.slices?.length ? page.data.slices : fallbackSlices;

  return (
    <main>
      <SliceZone slices={slices} components={components} />
    </main>
  );
}
