import { siteConfig } from "../../lib/site-config";
import { Reveal } from "../ui/reveal";
import { SectionLabel } from "../ui/section-label";
import { ContactForm } from "../forms/contact-form";
import { ContactVisual } from "../visuals/contact-visual";

export function Contact() {
  return (
    <section id="contact" className="border-t hairline py-20 md:py-28">
      <div className="container-syf">
        <div className="max-w-xl">
          <Reveal>
            <SectionLabel>06 / Contact</SectionLabel>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="text-balance mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
              {siteConfig.contact.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink/65">
              {siteConfig.contact.description}
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-16">
          <Reveal delay={0.1} className="order-1 lg:order-1">
            <div className="rounded-[var(--radius-syf)] border border-ink/10 bg-paper p-6 sm:p-8">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.16} className="order-2 min-h-[340px] sm:min-h-[420px] lg:order-2">
            <ContactVisual />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
