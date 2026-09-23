import { motion } from "motion/react";
import { useReducedMotion } from "../../lib/use-reduced-motion";

/**
 * Original, code-composed editorial visual for the contact section —
 * an abstract "laptop displaying a website" scene built from gradients
 * and SVG shapes using the existing SYF palette. Not a photograph, not
 * a screenshot of any real product.
 */
export function ContactVisual() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className="relative h-full min-h-[340px] overflow-hidden rounded-[var(--radius-syf)] border border-ink/12 bg-paper shadow-[0_30px_70px_-35px_rgba(0,0,0,0.6)] sm:min-h-[420px]"
      initial={reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reducedMotion ? 0 : 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute -left-12 -top-12 h-56 w-56 rounded-full bg-cobalt/35 blur-3xl" />
        <div className="absolute -bottom-16 -right-6 h-64 w-64 rounded-full bg-rust/30 blur-3xl" />
        <div className="absolute right-10 top-16 h-40 w-40 rounded-full bg-lime/20 blur-3xl" />

        <svg viewBox="0 0 600 520" className="relative h-full w-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="contactGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0V40" fill="none" stroke="rgba(245,241,231,0.05)" strokeWidth="1" />
            </pattern>
            <linearGradient id="contactPanel" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--color-rust)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="var(--color-cobalt)" stopOpacity="0.55" />
            </linearGradient>
          </defs>

          <rect width="600" height="520" fill="url(#contactGrid)" />

          <g transform="translate(90 130)">
            <rect
              x="0"
              y="0"
              width="420"
              height="252"
              rx="14"
              fill="rgba(245,241,231,0.05)"
              stroke="rgba(245,241,231,0.22)"
              strokeWidth="1.5"
            />
            <rect x="18" y="18" width="384" height="216" rx="4" fill="rgba(245,241,231,0.04)" />

            <rect x="34" y="34" width="120" height="10" rx="5" fill="rgba(245,241,231,0.5)" />
            <rect x="34" y="54" width="80" height="8" rx="4" fill="rgba(245,241,231,0.22)" />

            <rect x="34" y="86" width="352" height="86" rx="6" fill="url(#contactPanel)" />

            <rect x="34" y="188" width="104" height="26" rx="13" fill="var(--color-lime)" opacity="0.9" />
            <circle cx="330" cy="201" r="10" fill="rgba(245,241,231,0.14)" />
            <circle cx="360" cy="201" r="10" fill="rgba(245,241,231,0.14)" />

            <rect x="-20" y="252" width="460" height="14" rx="6" fill="rgba(245,241,231,0.12)" />
          </g>
        </svg>
      </div>

      <span className="absolute left-5 top-5 rounded-full border border-ink/15 bg-void/70 px-3 py-1 font-display text-[10px] font-semibold uppercase tracking-wide text-ink backdrop-blur sm:left-6 sm:top-6">
        Digital Experiences
      </span>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-void via-void/70 to-transparent p-6 pt-16 sm:p-8 sm:pt-20">
        <p className="max-w-xs text-sm leading-relaxed text-ink/80">
          Thoughtful websites, applications, and AI-powered solutions.
        </p>
      </div>
    </motion.div>
  );
}
