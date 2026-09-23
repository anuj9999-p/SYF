import logoFull from "../../assets/brand/syf-logo-full.png";
import logoMark from "../../assets/brand/syf-logo-mark.png";
import { cn } from "../../lib/utilities";

interface LogoProps {
  /** "mark" = SYF + arrow only (compact, for nav). "full" = mark + wordmark + tagline. */
  variant?: "mark" | "full";
  className?: string;
  imgClassName?: string;
}

/**
 * The real SYF brand mark, exactly as supplied. It's designed as a subtle
 * dark monogram with a single lime accent, so it's always presented on its
 * own near-black chip (--color-void) to preserve that intended contrast,
 * regardless of the section it sits in.
 */
export function Logo({ variant = "mark", className, imgClassName }: LogoProps) {
  const src = variant === "full" ? logoFull : logoMark;

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-[10px] bg-void px-2.5 py-1.5 ring-1 ring-ink/10",
        className,
      )}
    >
      <img
        src={src}
        alt="SYF — Ship Your Future"
        className={cn(variant === "full" ? "h-10 w-auto sm:h-12" : "h-6 w-auto sm:h-7", "object-contain", imgClassName)}
      />
    </span>
  );
}
