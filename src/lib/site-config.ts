import stayoraImg from "../assets/projects/stayora.svg";
import brewCoImg from "../assets/projects/brew-co.svg";
import flowdeskImg from "../assets/projects/flowdesk.svg";
import insightAiImg from "../assets/projects/insight-ai.svg";

export type ProjectTone = "terracotta" | "rust" | "cobalt" | "lime";

export interface Project {
  id: string;
  name: string;
  category: string;
  label: "Concept Project" | "Demo Template";
  description: string;
  features: string[];
  tone: ProjectTone;
  image: string;
  imageAlt: string;
}

export interface Service {
  id: string;
  index: string;
  title: string;
  shortLabel: string;
  description: string;
}

export interface Industry {
  id: string;
  index: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  index: string;
  title: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export const siteConfig = {
  name: "SYF",
  fullName: "Ship Your Future",
  wordmark: "SYF",
  studioLabel: "Independent Digital Studio",
  availability: "Available for select projects",
  tagline: "Digital experiences, crafted with care.",
  email: "syf.builds@gmail.com",
  url: "https://syf.studio",

  nav: [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ] satisfies NavLink[],

  headerCta: "Start a project",

  hero: {
    studioLabel: "Independent Digital Studio",
    availability: "Available for select projects",
    heading: "We build digital experiences that move businesses forward.",
    description:
      "We design and build thoughtful websites, web applications, and digital experiences for businesses ready to grow.",
    primaryCta: "Start a project",
    secondaryCta: "Explore our work",
  },

  intro: {
    eyebrow: "About the studio",
    statement:
      "SYF is built around a simple idea: good digital work comes from paying attention. We design with intention, build with care, and stay close to the businesses we work with — hotels finding their first guests online, cafés translating their menu into a website, founders shipping the first version of something new. The technology should be practical and built to last, not a showcase for its own sake. Our job is to make the thing that helps your business move forward, and make it well.",
  },

  services: [
    {
      id: "websites",
      index: "01",
      title: "Website Design & Development",
      shortLabel: "Websites",
      description:
        "Modern, responsive websites that help your business look professional, connect with customers, and grow online.",
    },
    {
      id: "platforms",
      index: "02",
      title: "Web Applications",
      shortLabel: "Platforms",
      description:
        "Custom booking systems, dashboards, business tools, and digital platforms built around your workflow.",
    },
    {
      id: "intelligence",
      index: "03",
      title: "AI-Powered Solutions",
      shortLabel: "Intelligence",
      description:
        "Practical AI integrations, intelligent assistants, and automated workflows designed around real business needs.",
    },
    {
      id: "experiences",
      index: "04",
      title: "Digital Experiences",
      shortLabel: "Experiences",
      description:
        "Thoughtful user experiences that connect your brand, content, and customers.",
    },
  ] satisfies Service[],

  industries: [
    {
      id: "hospitality",
      index: "01",
      title: "Hotels & Hospitality",
      description: "Room showcases, booking journeys, and guest-first interfaces.",
    },
    {
      id: "cafes",
      index: "02",
      title: "Cafés & Restaurants",
      description: "Digital menus, reservations, ordering, and brand storytelling.",
    },
    {
      id: "startups",
      index: "03",
      title: "Startups",
      description: "Launch sites, SaaS interfaces, landing pages, and MVP applications.",
    },
    {
      id: "local",
      index: "04",
      title: "Local Businesses",
      description: "Clear, credible digital homes that turn visits into conversations.",
    },
    {
      id: "fitness",
      index: "05",
      title: "Gyms & Fitness",
      description: "Membership journeys, schedules, classes, and community touchpoints.",
    },
    {
      id: "professional",
      index: "06",
      title: "Professional Services",
      description: "Trust-led websites and tools that make expertise easy to understand.",
    },
  ] satisfies Industry[],

  projects: [
    {
      id: "stayora",
      name: "STAYORA",
      category: "Hospitality / Website",
      label: "Concept Project",
      description: "A premium digital experience for a modern boutique hotel.",
      features: ["Room showcase", "Booking-focused design", "Responsive layout"],
      tone: "terracotta",
      image: stayoraImg,
      imageAlt:
        "Abstract editorial cover artwork for STAYORA, a boutique hotel concept, in warm terracotta tones",
    },
    {
      id: "brew-co",
      name: "BREW & CO.",
      category: "Café / Digital Experience",
      label: "Concept Project",
      description: "A warm and modern digital presence for an independent café.",
      features: ["Digital menu", "Brand storytelling", "Location and contact"],
      tone: "rust",
      image: brewCoImg,
      imageAlt:
        "Abstract editorial cover artwork for BREW & CO., a café concept, in rust tones",
    },
    {
      id: "flowdesk",
      name: "FLOWDESK",
      category: "Web Application",
      label: "Demo Template",
      description: "A modern workflow platform concept for growing businesses.",
      features: ["Dashboard", "Workflow management", "Data visualization"],
      tone: "cobalt",
      image: flowdeskImg,
      imageAlt:
        "Abstract editorial cover artwork for FLOWDESK, a workflow platform concept, in cobalt tones",
    },
    {
      id: "insight-ai",
      name: "INSIGHT AI",
      category: "AI / Web Application",
      label: "Demo Template",
      description: "An AI-powered business assistant concept designed for productivity.",
      features: ["AI interaction", "Analytics interface", "Responsive application design"],
      tone: "lime",
      image: insightAiImg,
      imageAlt:
        "Abstract editorial cover artwork for INSIGHT AI, an AI assistant concept, in lime tones",
    },
  ] satisfies Project[],

  process: [
    {
      index: "01",
      title: "Discover",
      description: "We learn about your business, audience, goals, and requirements.",
    },
    {
      index: "02",
      title: "Design",
      description: "We shape the structure, visual direction, and user experience.",
    },
    {
      index: "03",
      title: "Build",
      description: "We develop a responsive, accessible, and reliable digital product.",
    },
    {
      index: "04",
      title: "Launch",
      description: "We test, refine, deploy, and help you move forward.",
    },
  ] satisfies ProcessStep[],

  about: {
    eyebrow: "Why SYF",
    heading: "A studio that pays attention to the details that matter.",
    values: [
      { title: "Thoughtful design", description: "Every layout and interaction is considered against how people actually use your product." },
      { title: "Clear communication", description: "You always know what's happening, what's next, and why." },
      { title: "Practical technology", description: "We choose tools for what they'll do for your business, not for novelty." },
      { title: "Responsive experiences", description: "Built to work cleanly across phones, tablets, and desktops." },
      { title: "Business-focused solutions", description: "Every decision is weighed against your actual goals." },
      { title: "Attention to detail", description: "Spacing, copy, and motion are treated as part of the product, not an afterthought." },
      { title: "Scalable foundations", description: "We build in a way that leaves room to grow, not a rebuild in a year." },
      { title: "Human-centered execution", description: "Real conversations, real collaboration, no black boxes." },
    ],
  },

  finalCta: {
    heading: "Have a future in mind? Let's build it.",
    supportingCopy:
      "Tell us what you're working on, and let's explore how SYF can help bring it to life.",
    cta: "Start a project",
  },

  contact: {
    heading: "Have a project in mind?",
    description:
      "Tell us what you're building and how SYF can help bring your idea to life.",
    email: "syf.builds@gmail.com",
    projectTypes: [
      "Website",
      "Web Application",
      "AI-Powered Solution",
      "Digital Experience",
      "Other",
    ],
  },

  footer: {
    statement: "An independent digital studio designing and building for businesses ready to grow.",
    social: "Social links available on request",
  },

  seo: {
    title: "SYF — Ship Your Future | Independent Digital Studio",
    description:
      "SYF designs and builds thoughtful websites, web applications, and AI-powered digital experiences for hotels, cafés, startups, gyms, and local businesses.",
    ogImageAlt: "SYF — Ship Your Future",
  },
} as const;

export type SiteConfig = typeof siteConfig;
