import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { siteConfig } from "../../lib/site-config";
import { Button } from "../ui/button";
import { useReducedMotion } from "../../lib/use-reduced-motion";
import { HeroVisual } from "../visuals/hero-visual";

export function Hero() {
  const reducedMotion = useReducedMotion();
  const words = siteConfig.hero.heading.split(" ");

  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-14 md:pb-28 md:pt-20">
      <div className="container-syf relative grid gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10 xl:gap-16">
      <div>
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cobalt opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cobalt" />
          </span>
          <p className="text-sm font-medium text-ink/60">{siteConfig.hero.availability}</p>
        </div>

        <p className="mt-8 font-display text-sm font-semibold tracking-tight text-ink/50">
          {siteConfig.hero.studioLabel}
        </p>

        <h1 className="text-balance mt-4 max-w-4xl font-display text-[2.6rem] font-bold leading-[1.04] tracking-tight text-ink sm:text-6xl md:text-7xl">
          {words.map((word, index) => (
            <span key={`${word}-${index}`} className="inline-block overflow-hidden">
              <motion.span
                className="inline-block"
                initial={reducedMotion ? { y: 0 } : { y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: reducedMotion ? 0 : 0.7,
                  delay: reducedMotion ? 0 : 0.06 * index,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
              >
                {word}
                {index < words.length - 1 ? "\u00A0" : ""}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="text-balance mt-6 max-w-lg text-lg leading-relaxed text-ink/70"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.5 }}
        >
          {siteConfig.hero.description}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.62 }}
        >
          <Button
            variant="primary"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            {siteConfig.hero.primaryCta}
            <ArrowUpRight size={16} aria-hidden="true" />
          </Button>
          <Button
            variant="secondary"
            onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
          >
            {siteConfig.hero.secondaryCta}
            <ArrowDown size={16} aria-hidden="true" />
          </Button>
        </motion.div>
      </div>

      <HeroVisual reducedMotion={reducedMotion} />
      </div>
    </section>
  );
}
