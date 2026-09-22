import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Globe, LayoutGrid, Sparkles, Layers } from "lucide-react";
import { siteConfig } from "../../lib/site-config";
import { Reveal } from "../ui/reveal";
import { useReducedMotion } from "../../lib/use-reduced-motion";

const icons = [Globe, LayoutGrid, Sparkles, Layers];

export function Services() {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();
  const ActiveIcon = icons[active];

  return (
    <section id="services" className="py-20 md:py-28">
      <div className="container-syf">
        <Reveal>
          <p className="font-display text-sm font-semibold tracking-tight text-ink/50">
            02 / Services
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="text-balance mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
            What we build with you.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          <ul className="divide-y hairline border-t hairline" role="list">
            {siteConfig.services.map((service, index) => {
              const isActive = active === index;
              return (
                <li key={service.id}>
                  <button
                    type="button"
                    className="focus-ring group flex w-full items-baseline gap-4 py-6 text-left md:gap-8 md:py-8"
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onClick={() => setActive(index)}
                    aria-pressed={isActive}
                  >
                    <span
                      className={`font-display text-sm transition-colors ${
                        isActive ? "text-rust" : "text-ink/40"
                      }`}
                    >
                      {service.index}
                    </span>
                    <span className="flex-1">
                      <span
                        className={`block font-display text-xl font-semibold tracking-tight transition-colors sm:text-2xl md:text-3xl ${
                          isActive ? "text-ink" : "text-ink/50 group-hover:text-ink/80"
                        }`}
                      >
                        {service.title}
                      </span>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.span
                            className="mt-3 block max-w-md text-sm leading-relaxed text-ink/65 md:hidden"
                            initial={reducedMotion ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={reducedMotion ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                            transition={{ duration: reducedMotion ? 0 : 0.3 }}
                          >
                            {service.description}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                    <span
                      className={`hidden font-display text-xs uppercase tracking-wide sm:block ${
                        isActive ? "text-ink/50" : "text-ink/25"
                      }`}
                    >
                      {service.shortLabel}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="relative hidden min-h-[320px] overflow-hidden rounded-[var(--radius-syf)] border hairline bg-paper p-8 md:flex md:flex-col md:justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
                transition={{ duration: reducedMotion ? 0 : 0.3, ease: "easeOut" }}
                className="flex h-full flex-col justify-between"
              >
                <ActiveIcon size={36} className="text-rust" aria-hidden="true" strokeWidth={1.5} />
                <div>
                  <p className="font-display text-xs font-semibold tracking-wide text-ink/40">
                    {siteConfig.services[active].shortLabel}
                  </p>
                  <p className="mt-3 max-w-sm text-base leading-relaxed text-ink/70">
                    {siteConfig.services[active].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
