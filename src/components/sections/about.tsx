import { siteConfig } from "../../lib/site-config";
import { Reveal } from "../ui/reveal";

export function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container-syf">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="font-display text-sm font-semibold tracking-tight text-ink/50">
                {siteConfig.about.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="text-balance mt-4 max-w-sm font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                {siteConfig.about.heading}
              </h2>
            </Reveal>
          </div>

          <ul className="grid gap-x-10 gap-y-8 border-t hairline pt-10 sm:grid-cols-2">
            {siteConfig.about.values.map((value, index) => (
              <Reveal key={value.title} as="li" delay={(index % 2) * 0.08}>
                <h3 className="font-display text-base font-semibold tracking-tight text-ink">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">
                  {value.description}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
