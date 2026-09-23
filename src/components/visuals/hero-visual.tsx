import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { BrowserMockup } from "./browser-mockup";
import { DashboardMockup } from "./dashboard-mockup";
import { cn } from "../../lib/utilities";

interface HeroVisualProps {
  reducedMotion: boolean;
}

export function HeroVisual({ reducedMotion }: HeroVisualProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 55, damping: 20, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 55, damping: 20, mass: 0.6 });
  const rotateX = useTransform(springY, [-40, 40], [4, -4]);
  const rotateY = useTransform(springX, [-40, 40], [-4, 4]);
  const translateX = useTransform(springX, [-40, 40], [-7, 7]);
  const translateY = useTransform(springY, [-40, 40], [-7, 7]);

  useEffect(() => {
    if (reducedMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const node = containerRef.current;
    if (!node) return;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const relX = ((event.clientX - rect.left) / rect.width - 0.5) * 80;
      const relY = ((event.clientY - rect.top) / rect.height - 0.5) * 80;
      mouseX.set(relX);
      mouseY.set(relY);
    };
    const handlePointerLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    window.addEventListener("pointermove", handlePointerMove);
    node.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      node.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [reducedMotion, mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="relative mx-auto mt-14 aspect-[4/3.35] w-full max-w-[420px] lg:mx-0 lg:mt-0 lg:max-w-none"
    >
      <OrbitLines reducedMotion={reducedMotion} />

      <motion.div
        className="relative h-full w-full"
        style={
          reducedMotion
            ? undefined
            : {
                rotateX,
                rotateY,
                x: translateX,
                y: translateY,
                transformPerspective: 1000,
              }
        }
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: reducedMotion ? 0 : 0.8,
          delay: reducedMotion ? 0 : 0.55,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
      >
        <FloatingCard
          className="absolute left-0 top-1 w-[76%] sm:w-[72%]"
          reducedMotion={reducedMotion}
          entranceDelay={0.6}
          floatY={-8}
          floatDuration={6.5}
        >
          <BrowserMockup />
          <Tag label="WEB DESIGN" className="absolute -left-2.5 -top-3 sm:-left-4 sm:-top-4" />
        </FloatingCard>

        <FloatingCard
          className="absolute bottom-1 left-[4%] w-[52%] sm:w-[45%]"
          reducedMotion={reducedMotion}
          entranceDelay={0.9}
          floatY={7}
          floatDuration={5.5}
          floatDelay={0.3}
        >
          <DashboardMockup variant="flowdesk" />
          <Tag
            label="DIGITAL PRODUCTS"
            tone="cobalt"
            className="absolute -bottom-3 -left-2 sm:-bottom-4 sm:-left-3"
          />
        </FloatingCard>

        <FloatingCard
          className="absolute -right-1 top-0 w-[46%] sm:w-[40%] lg:-right-3"
          reducedMotion={reducedMotion}
          entranceDelay={1.05}
          floatY={-7}
          floatDuration={5.8}
          floatDelay={0.6}
        >
          <DashboardMockup variant="insight" />
          <Tag label="AI SYSTEMS" tone="lime" className="absolute -right-2 -top-3 sm:-right-3 sm:-top-4" />
        </FloatingCard>
      </motion.div>
    </div>
  );
}

interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  reducedMotion: boolean;
  entranceDelay?: number;
  floatY?: number;
  floatDuration?: number;
  floatDelay?: number;
}

function FloatingCard({
  children,
  className,
  reducedMotion,
  entranceDelay = 0,
  floatY = -8,
  floatDuration = 6,
  floatDelay = 0,
}: FloatingCardProps) {
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 18, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: reducedMotion ? 0 : 0.65,
        delay: reducedMotion ? 0 : entranceDelay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      <motion.div
        animate={reducedMotion ? undefined : { y: [0, floatY, 0] }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

const tagTone: Record<"ink" | "rust" | "cobalt" | "lime", string> = {
  ink: "border-ink/15 bg-cream text-ink/70",
  rust: "border-rust/25 bg-cream text-rust",
  cobalt: "border-cobalt/25 bg-cream text-cobalt",
  lime: "border-ink/10 bg-lime text-cream",
};

function Tag({
  label,
  tone = "ink",
  className,
}: {
  label: string;
  tone?: keyof typeof tagTone;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none select-none whitespace-nowrap rounded-full border px-2.5 py-1 font-display text-[9px] font-semibold uppercase tracking-wide shadow-sm sm:text-[10px]",
        tagTone[tone],
        className,
      )}
    >
      {label}
    </span>
  );
}

function OrbitLines({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 hidden sm:block">
      <motion.svg
        viewBox="0 0 400 400"
        className="h-full w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" className="text-ink/8" strokeWidth="1" />
        <circle cx="200" cy="200" r="135" fill="none" stroke="currentColor" className="text-ink/10" strokeWidth="1" />

        <motion.g
          animate={reducedMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
          style={{ originX: "200px", originY: "200px" }}
        >
          <circle cx="200" cy="20" r="4" fill="var(--color-rust)" opacity="0.7" />
        </motion.g>
        <motion.g
          animate={reducedMotion ? undefined : { rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ originX: "200px", originY: "200px" }}
        >
          <circle cx="65" cy="200" r="3.5" fill="var(--color-cobalt)" opacity="0.7" />
        </motion.g>
      </motion.svg>
    </div>
  );
}
