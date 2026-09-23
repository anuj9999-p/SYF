import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { siteConfig } from "../../lib/site-config";
import type { ProjectTone } from "../../lib/site-config";
import { Reveal } from "../ui/reveal";
import { useReducedMotion } from "../../lib/use-reduced-motion";

const toneRing: Record<ProjectTone, string> = {
  terracotta: "ring-[color:var(--color-rust)]",
  rust: "ring-[color:var(--color-rust)]",
  cobalt: "ring-[color:var(--color-cobalt)]",
  lime: "ring-[color:var(--color-lime)]",
};

export function Work() {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();
  const project = siteConfig.projects[active];

  return (
    <section id="work" className="py-20 md:py-28">
      <div className="container-syf">
        <Reveal>
          <p className="font-display text-sm font-semibold tracking-tight text-ink/50">
            04 / Work
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="text-balance mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
            A look at concept work.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink/60">
            The projects below are fictional showcase concepts built to demonstrate our
            approach — not real client work.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div
            className={`relative aspect-[4/3] overflow-hidden rounded-[var(--radius-syf)] ring-1 ${toneRing[project.tone]} ring-offset-4 ring-offset-cream`}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={project.id}
                src={project.image}
                alt={project.imageAlt}
                loading="lazy"
                width={640}
                height={480}
                className="h-full w-full object-cover"
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.45, ease: "easeInOut" }}
              />
            </AnimatePresence>
            <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-xs font-medium text-ink/80 backdrop-blur">
              {project.label}
            </span>
          </div>

          <div>
            <div
              role="tablist"
              aria-label="Projects"
              className="flex flex-wrap gap-2 border-b hairline pb-6"
            >
              {siteConfig.projects.map((item, index) => (
                <button
                  key={item.id}
                  role="tab"
                  aria-selected={active === index}
                  className={`focus-ring rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    active === index
                      ? "border-lime bg-lime text-cream"
                      : "border-ink/20 text-ink/60 hover:border-ink/40"
                  }`}
                  onClick={() => setActive(index)}
                >
                  {item.name}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={project.id}
                role="tabpanel"
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
                transition={{ duration: reducedMotion ? 0 : 0.35 }}
                className="pt-8"
              >
                <p className="font-display text-xs font-semibold tracking-wide text-ink/40">
                  {project.category}
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
                  {project.name}
                </h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-ink/70">
                  {project.description}
                </p>
                <ul className="mt-6 space-y-2">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-ink/65">
                      <span className="h-1 w-1 rounded-full bg-ink/40" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
