import { createFileRoute } from "@tanstack/react-router";
import { siteConfig } from "../lib/site-config";
import { Hero } from "../components/sections/hero";
import { Intro } from "../components/sections/intro";
import { Services } from "../components/sections/services";
import { Industries } from "../components/sections/industries";
import { Work } from "../components/sections/work";
import { Process } from "../components/sections/process";
import { About } from "../components/sections/about";
import { FinalCta } from "../components/sections/final-cta";
import { Contact } from "../components/sections/contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: siteConfig.seo.title },
      { name: "description", content: siteConfig.seo.description },
      { property: "og:title", content: siteConfig.seo.title },
      { property: "og:description", content: siteConfig.seo.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteConfig.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: siteConfig.seo.title },
      { name: "twitter:description", content: siteConfig.seo.description },
    ],
    links: [{ rel: "canonical", href: siteConfig.url }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Services />
      <Industries />
      <Work />
      <Process />
      <About />
      <Contact />
      <FinalCta />
    </>
  );
}
