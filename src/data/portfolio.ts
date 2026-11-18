/**
 * Single source of truth for all site content.
 * Ported from the legacy Bootstrap site (legacy/index.html, legacy/projects.html).
 * Never invent dates, descriptions or achievements. Never add a phone number.
 */
import type { PsShape } from "@/components/ps/shapes";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type SocialKind = "github" | "linkedin" | "instagram";

export type Social = {
  kind: SocialKind;
  label: string;
  href: string;
};

export type StatusChip = {
  shape: PsShape;
  label: string;
};

export type Profile = {
  name: string;
  /** Lowercase hero display name. */
  displayName: string;
  title: string;
  /** Static prefix of the hero meta line, before the typed role. */
  metaPrefix: string;
  roles: string[];
  status: StatusChip[];
  bio: string[];
  email: string;
  avatar: { src: string; alt: string };
};

export type SkillGroup = {
  title: string;
  description: string;
  shape: PsShape;
  /** Tech names; icons resolved in components/tech-chip.tsx. */
  items: string[];
  /** Non-tool concepts, rendered as plain chips. */
  concepts?: string[];
};

export type ProjectCategory = "foundational" | "fullstack" | "wordpress";

export type Thumbnail =
  | { kind: "themed"; light: string; dark: string }
  | { kind: "single"; src: string };

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  featured: boolean;
  tech: string[];
  live: string;
  repo?: string;
  thumbnail: Thumbnail;
  thumbnailAlt: string;
};

export type Experience = {
  role: string;
  badge?: string;
  line?: string;
};

export type Education = {
  institution: string;
  qualification: string;
  badge?: string;
};

export type Achievement = {
  title: string;
  issuer: string;
  line?: string;
  href?: string;
};

export type NavKey = "home" | "about" | "projects" | "contact";

export type NavItem = {
  key: NavKey;
  label: string;
  /** In-page anchor on the home page. */
  href: string;
  shape: PsShape;
};

/* ------------------------------------------------------------------ */
/* Site                                                                */
/* ------------------------------------------------------------------ */

export const site = {
  /** Set NEXT_PUBLIC_SITE_URL in production (e.g. https://abdullahali.dev). */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  title: "Abdullah Ali",
  description:
    "Abdullah Ali: aspiring software engineer and third-year Computer Science student at Wits. Full stack projects, skills and contact.",
  /** Footer tagline; a ✕ PsSymbol is rendered between the two parts. */
  tagline: { before: "built with next.js · press", after: "to continue" },
  githubUsername: "AbdullahAliCodes",
} as const;

export const nav: NavItem[] = [
  { key: "home", label: "Home", href: "/#home", shape: "triangle" },
  { key: "about", label: "About", href: "/#about", shape: "circle" },
  { key: "projects", label: "Projects", href: "/#projects", shape: "cross" },
  { key: "contact", label: "Contact", href: "/#contact", shape: "square" },
];

/* ------------------------------------------------------------------ */
/* Profile                                                             */
/* ------------------------------------------------------------------ */

export const profile: Profile = {
  name: "Abdullah Ali",
  displayName: "abdullah ali",
  title: "Full Stack Developer",
  metaPrefix: "third-year cs @ wits · ",
  roles: ["student.", "aspiring software engineer.", "tech enthusiast."],
  status: [
    { shape: "circle", label: "Computer Science [III] · Wits" },
    { shape: "cross", label: "Mathematics Tutor" },
  ],
  bio: [
    "Aspiring software developer & engineer, in my third year of Computer Science at Wits.",
    "I enjoy problem solving through code, with the aim of contributing towards something bigger than myself.",
    "I'm also a part-time Mathematics tutor, with a passion for teaching and empowering the next generation.",
    "Away from the keyboard: sports, video games and a dash of digital marketing.",
  ],
  email: "abdullahali.dullz@gmail.com",
  avatar: { src: "/images/abdullah-ali-headshot.jpeg", alt: "Abdullah Ali" },
};

export const socials: Social[] = [
  { kind: "github", label: "GitHub", href: "https://github.com/AbdullahAliCodes" },
  { kind: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/abdullah-ali-31463783/" },
  { kind: "instagram", label: "Instagram", href: "https://www.instagram.com/uncledullaz/" },
];

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    description: "Interfaces, components and styling for the web.",
    shape: "triangle",
    items: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Chakra UI"],
  },
  {
    title: "Backend",
    description: "Servers, APIs and third-party integrations.",
    shape: "circle",
    items: ["Node.js", "Express", "Python", "REST APIs", "Gemini API"],
    concepts: ["OOP"],
  },
  {
    title: "Database & data",
    description: "Storing, querying and syncing application data.",
    shape: "cross",
    items: ["Supabase", "PostgreSQL", "Firebase"],
  },
  {
    title: "Tools & platforms",
    description: "Version control, deployment, auth, payments and CMS.",
    shape: "square",
    items: ["Git", "Vercel", "Render", "Azure", "Auth0", "Paystack", "WordPress", "Elementor"],
  },
];

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

const themed = (name: string): Thumbnail => ({
  kind: "themed",
  light: `/images/${name}-thumbnail-light.png`,
  dark: `/images/${name}-thumbnail-dark.png`,
});

const ZAIO = "https://zaiocontent.s3.eu-west-2.amazonaws.com/images+of+courses";

export const projectCategories: { key: ProjectCategory | "all"; label: string; shape?: PsShape }[] = [
  { key: "all", label: "All" },
  { key: "foundational", label: "Foundational", shape: "triangle" },
  { key: "fullstack", label: "FullStack", shape: "cross" },
  { key: "wordpress", label: "WordPress", shape: "square" },
];

export const categoryShape: Record<ProjectCategory, PsShape> = {
  foundational: "triangle",
  fullstack: "cross",
  wordpress: "square",
};

export const projects: Project[] = [
  {
    slug: "raceiq",
    title: "RaceIQ: F1 Stats Tracker",
    category: "fullstack",
    featured: true,
    tech: ["React", "TypeScript", "Node.js", "Supabase", "PostgreSQL", "Gemini API", "Auth0", "Vercel", "Render", "Chakra UI"],
    live: "https://race-iq.vercel.app/",
    repo: "https://github.com/Race1Q/RaceIQ",
    thumbnail: themed("raceiq"),
    thumbnailAlt: "RaceIQ project thumbnail",
  },
  {
    slug: "hood-goods",
    title: "Hood Goods: Artisan Marketplace",
    category: "fullstack",
    featured: true,
    tech: ["React", "JavaScript", "Node.js", "Supabase", "Auth0", "Azure"],
    live: "https://victorious-mud-0224f2003.6.azurestaticapps.net/",
    repo: "https://github.com/AbdullahAliCodes/HoodGoods",
    thumbnail: themed("hoodgoods"),
    thumbnailAlt: "Hood Goods project thumbnail",
  },
  {
    slug: "stokgeld",
    title: "StokGeld: Stokvel Management System",
    category: "fullstack",
    featured: true,
    tech: ["React", "JavaScript", "Tailwind CSS", "Node.js", "Express", "Supabase", "PostgreSQL", "Vercel", "Render", "Paystack"],
    live: "https://stokvel-sd.vercel.app/",
    thumbnail: themed("stokvel"),
    thumbnailAlt: "StokGeld project thumbnail",
  },
  {
    slug: "horizon-star-academy",
    title: "Horizon Star Academy",
    category: "wordpress",
    featured: false,
    tech: ["WordPress", "Elementor", "Slider Revolution", "Custom CSS"],
    live: "https://staracademy.co.za/",
    thumbnail: { kind: "single", src: "/images/hsa-thumbnail.png" },
    thumbnailAlt: "Horizon Star Academy project thumbnail",
  },
  {
    slug: "google-keep-clone",
    title: "Google Keep Clone",
    category: "foundational",
    featured: false,
    tech: ["React", "JavaScript", "CSS", "Local Storage"],
    live: "https://goggles-keeping-cloon.netlify.app/",
    repo: "https://github.com/AbdullahAliCodes/google-keep-clone-react",
    thumbnail: themed("google-keep"),
    thumbnailAlt: "Google Keep Clone project thumbnail",
  },
  {
    slug: "twitter-clone",
    title: "Twitter Clone",
    category: "foundational",
    featured: false,
    tech: ["HTML", "CSS", "JavaScript"],
    live: "https://twooter-eloonmoosk-clone.netlify.app/",
    repo: "https://github.com/AbdullahAliCodes/twitter-clone-htmlcss",
    thumbnail: themed("x"),
    thumbnailAlt: "Twitter clone project thumbnail",
  },
  {
    slug: "netflix-landing",
    title: "Netflix Landing Page",
    category: "foundational",
    featured: false,
    tech: ["HTML", "CSS"],
    live: "https://flix-of-the-net.netlify.app/",
    repo: "https://github.com/AbdullahAliCodes/netflix-clone-htmlcss",
    thumbnail: { kind: "single", src: `${ZAIO}/css_netflix.png` },
    thumbnailAlt: "Netflix Landing Page project thumbnail",
  },
  {
    slug: "youtube-landing",
    title: "YouTube Landing Page",
    category: "foundational",
    featured: false,
    tech: ["HTML", "CSS"],
    live: "https://yourtubs-clone.netlify.app/",
    repo: "https://github.com/AbdullahAliCodes/youtube-clone-htmlcss",
    thumbnail: { kind: "single", src: `${ZAIO}/html_youtube.png` },
    thumbnailAlt: "YouTube Landing Page project thumbnail",
  },
  {
    slug: "tesla-landing",
    title: "Tesla Landing Page",
    category: "foundational",
    featured: false,
    tech: ["HTML", "CSS"],
    live: "https://modern-car-brand-elon.netlify.app/",
    repo: "https://github.com/AbdullahAliCodes/tesla-clone-htmlcss",
    thumbnail: { kind: "single", src: `${ZAIO}/Tesla.png` },
    thumbnailAlt: "Tesla Landing Page project thumbnail",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

/* ------------------------------------------------------------------ */
/* Experience, education, achievements                                 */
/* ------------------------------------------------------------------ */

export const experience: Experience[] = [
  {
    role: "Mathematics Tutor",
    badge: "Part-time",
    line: "Teaching and empowering the next generation.",
  },
];

export const education: Education[] = [
  {
    institution: "University of the Witwatersrand",
    qualification: "BSc Computer Science",
    badge: "3rd year",
  },
];

/** Empty for now: the section shows a "coming soon" placeholder until entries are added. */
export const achievements: Achievement[] = [];

/* ------------------------------------------------------------------ */
/* Section copy                                                        */
/* ------------------------------------------------------------------ */

export const sections = {
  stack: { eyebrow: "stack", title: "What I Work With" },
  projects: { eyebrow: "builds", title: "Featured Projects", viewAll: "View all projects" },
  experience: { eyebrow: "experience", title: "Work" },
  education: { eyebrow: "education", title: "Education" },
  achievements: { eyebrow: "achievements", title: "Achievements", placeholder: "coming soon", placeholderHint: "now loading…" },
  contributions: {
    eyebrow: "open source",
    title: "GitHub Contributions",
    regionLabel: "Contribution calendar (scrollable)",
    fallback: "Couldn't load the contribution graph right now.",
  },
  contact: {
    eyebrow: "contact",
    title: "Want to work with me?",
    copy: "Would love to connect with fellow developers and employers looking for developers. Drop me an email, or follow along with my developer journey on socials.",
    cta: "Say hello",
  },
  allProjects: {
    eyebrow: "builds",
    title: "All Projects",
    intro: "Everything I've built so far, from foundational clones to full stack apps.",
    empty: "No projects in this category yet.",
  },
  notFound: { title: "GAME OVER", copy: "This page doesn't exist.", cta: "press ✕ to return home" },
} as const;
