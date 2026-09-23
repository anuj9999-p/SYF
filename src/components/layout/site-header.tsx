import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { siteConfig } from "../../lib/site-config";
import { Button } from "../ui/button";
import { Logo } from "../ui/logo";
import { MobileMenu } from "./mobile-menu";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "border-b border-ink/10 bg-cream/90 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-syf flex h-16 items-center justify-between md:h-20">
          <a
            href="#top"
            className="focus-ring"
            aria-label={`${siteConfig.fullName} — home`}
          >
            <Logo variant="mark" />
          </a>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 md:flex"
          >
            {siteConfig.nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="focus-ring text-sm font-medium text-ink/70 transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button variant="primary" onClick={() => scrollToId("contact")}>
              {siteConfig.headerCta}
            </Button>
          </div>

          <button
            type="button"
            className="focus-ring inline-flex items-center justify-center rounded p-2 text-ink md:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={24} aria-hidden="true" />
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
