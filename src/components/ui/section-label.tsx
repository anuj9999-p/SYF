import { cn } from "../../lib/utilities";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "font-display text-sm font-semibold tracking-tight text-ink/50",
        className,
      )}
    >
      {children}
    </p>
  );
}
