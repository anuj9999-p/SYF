import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "../../lib/site-config";
import { Reveal } from "../ui/reveal";

export function FinalCta() {
  return (
    <section className="bg-ink py-24 text-cream md:py-32">
      <div className="container-syf text-center">
        <Reveal>
          <h2 className="text-balance mx-auto max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {siteConfig.finalCta.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-balance mx-auto mt-6 max-w-md text-base leading-relaxed text-cream/70">
            {siteConfig.finalCta.supportingCopy}
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <a
            href="#contact"
            className="focus-ring group mt-10 inline-flex items-center gap-2 rounded-[var(--radius-syf)] bg-lime px-7 py-3.5 text-sm font-semibold tracking-tight text-ink transition-transform duration-200 hover:-translate-y-0.5"
          >
            {siteConfig.finalCta.cta}
            <ArrowUpRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </Reveal>

        <Reveal delay={0.22}>
          <div className="mx-auto mt-14 flex max-w-xs flex-col items-center gap-2 border-t border-cream/15 pt-8 text-sm">
            <p className="font-display font-semibold tracking-tight text-cream/90">
              {siteConfig.wordmark} — {siteConfig.fullName}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="focus-ring text-cream/60 underline decoration-cream/25 underline-offset-4 transition-colors hover:text-cream hover:decoration-cream/60"
            >
              {siteConfig.email}
            </a>
            <a href="#contact" className="focus-ring mt-1 text-xs uppercase tracking-wide text-cream/40 transition-colors hover:text-cream/70">
              Start a conversation
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
