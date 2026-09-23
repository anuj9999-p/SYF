import { siteConfig } from "../../lib/site-config";
import { Logo } from "../ui/logo";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/10 bg-paper">
      <div className="container-syf grid gap-10 py-16 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Logo variant="full" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink/70">
            {siteConfig.footer.statement}
          </p>
        </div>

        <div>
          <p className="font-display text-sm font-semibold text-ink">Navigate</p>
          <ul className="mt-4 space-y-3">
            {siteConfig.nav.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="focus-ring text-sm text-ink/70 transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-sm font-semibold text-ink">Contact</p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="focus-ring mt-4 inline-block text-sm text-ink/70 transition-colors hover:text-ink"
          >
            {siteConfig.email}
          </a>
          <p className="mt-4 text-sm text-ink/50">{siteConfig.footer.social}</p>
        </div>
      </div>

      <div className="border-t border-ink/10">
        <div className="container-syf flex flex-col gap-2 py-6 text-xs text-ink/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} SYF — Ship Your Future. All rights reserved.</p>
          <p>{siteConfig.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
