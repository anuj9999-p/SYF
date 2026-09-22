import { siteConfig } from "../../lib/site-config";
import { Reveal } from "../ui/reveal";

export function Industries() {
  return (
    <section className="border-t hairline bg-paper py-20 md:py-28">
      <div className="container-syf">
        <Reveal>
          <p className="font-display text-sm font-semibold tracking-tight text-ink/50">
            03 / Industries
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="text-balance mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
            Who we build for.
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-syf)] border hairline bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.industries.map((industry, index) => (
            <Reveal key={industry.id} as="li" delay={(index % 3) * 0.05}>
              <div className="group h-full bg-cream p-8 transition-colors duration-300 hover:bg-paper">
                <span className="font-display text-sm text-ink/35">{industry.index}</span>
                <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-ink">
                  {industry.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">
                  {industry.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
