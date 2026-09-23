import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { siteConfig } from "../../lib/site-config";
import { Button } from "../ui/button";
import { Logo } from "../ui/logo";
import { useReducedMotion } from "../../lib/use-reduced-motion";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    document.body.classList.add("no-scroll");
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("no-scroll");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-[60] flex flex-col bg-cream md:hidden"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.25, ease: "easeOut" }}
        >
          <div className="container-syf flex h-16 items-center justify-between">
            <Logo variant="mark" />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="focus-ring inline-flex items-center justify-center rounded p-2 text-ink"
            >
              <X size={24} aria-hidden="true" />
            </button>
          </div>

          <nav
            aria-label="Mobile"
            className="container-syf flex flex-1 flex-col justify-center gap-2"
          >
            {siteConfig.nav.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="focus-ring border-b border-ink/10 py-4 font-display text-3xl font-semibold tracking-tight text-ink"
                initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reducedMotion ? 0 : 0.35,
                  delay: reducedMotion ? 0 : 0.08 * index,
                  ease: "easeOut",
                }}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          <div className="container-syf pb-10">
            <Button
              variant="primary"
              className="w-full"
              onClick={() => {
                onClose();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {siteConfig.headerCta}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
