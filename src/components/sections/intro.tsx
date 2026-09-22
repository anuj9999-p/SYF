import { siteConfig } from "../../lib/site-config";
import { Reveal } from "../ui/reveal";

export function Intro() {
  return (
    <section className="border-y hairline">
      <div className="container-syf py-20 md:py-28">
        <Reveal>
          <p className="font-display text-sm font-semibold tracking-tight text-ink/50">
            {siteConfig.intro.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-balance mt-6 max-w-3xl font-display text-2xl font-medium leading-snug tracking-tight text-ink sm:text-3xl md:text-4xl">
            {siteConfig.intro.statement}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
