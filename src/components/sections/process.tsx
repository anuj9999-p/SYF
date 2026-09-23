import { siteConfig } from "../../lib/site-config";
import { Reveal } from "../ui/reveal";

export function Process() {
  return (
    <section className="border-t hairline bg-paper py-20 md:py-28">
      <div className="container-syf">
        <Reveal>
          <p className="font-display text-sm font-semibold tracking-tight text-ink/50">
            05 / Process
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="text-balance mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
            How a project moves.
          </h2>
        </Reveal>

        <ol className="mt-16 grid gap-10 border-t hairline pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {siteConfig.process.map((step, index) => (
            <Reveal key={step.index} as="li" delay={index * 0.08}>
              <div className="relative pl-6">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1 h-2 w-2 -translate-x-1/2 rounded-full bg-ink"
                />
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1 h-full w-px -translate-x-1/2 bg-ink/15 lg:hidden"
                />
                <p className="font-display text-sm text-ink/40">{step.index}</p>
                <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[22ch] text-sm leading-relaxed text-ink/65">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
