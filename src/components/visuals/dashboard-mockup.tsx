/**
 * Original, hand-built UI mockups for two fictional showcase products —
 * a workflow dashboard ("FLOWDESK") and an AI assistant interface
 * ("INSIGHT AI"). Composed entirely from the existing SYF design tokens.
 */
interface DashboardMockupProps {
  variant: "flowdesk" | "insight";
}

const barHeights = [16, 26, 18, 32, 22, 28];

export function DashboardMockup({ variant }: DashboardMockupProps) {
  if (variant === "insight") {
    return (
      <div className="rounded-[10px] border border-ink/12 bg-paper p-3 shadow-[0_18px_44px_-22px_rgba(24,20,14,0.4)] sm:p-4">
        <div className="flex items-center justify-between">
          <span className="font-display text-[9px] font-bold tracking-wide text-ink/70 sm:text-[10px]">
            INSIGHT AI
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-lime" aria-hidden="true" />
        </div>

        <div className="mt-3 space-y-1.5">
          <div className="ml-auto h-1.5 w-3/4 rounded-full bg-cobalt/25" />
          <div className="h-1.5 w-5/6 rounded-full bg-ink/10" />
          <div className="ml-auto h-1.5 w-2/3 rounded-full bg-cobalt/25" />
        </div>

        <div className="mt-3 flex items-center gap-1 rounded-full border border-ink/10 bg-cream px-2 py-1.5">
          <span className="h-1 w-1 animate-pulse rounded-full bg-lime motion-reduce:animate-none" />
          <span className="h-1 w-1 animate-pulse rounded-full bg-lime motion-reduce:animate-none [animation-delay:150ms]" />
          <span className="h-1 w-1 animate-pulse rounded-full bg-lime motion-reduce:animate-none [animation-delay:300ms]" />
          <span className="ml-1 font-display text-[8px] text-ink/40 sm:text-[9px]">Thinking…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[10px] border border-ink/12 bg-paper p-3 shadow-[0_18px_44px_-22px_rgba(24,20,14,0.4)] sm:p-4">
      <div className="flex items-center justify-between">
        <span className="font-display text-[9px] font-bold tracking-wide text-ink/70 sm:text-[10px]">
          FLOWDESK
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-cobalt" aria-hidden="true" />
      </div>

      <div className="mt-3 flex h-8 items-end gap-1 sm:h-9 sm:gap-1.5">
        {barHeights.map((h, i) => (
          <span
            key={i}
            className="w-full rounded-sm bg-cobalt"
            style={{ height: `${h}px`, opacity: 0.45 + i * 0.09 }}
          />
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="font-display text-[10px] font-bold text-ink sm:text-xs">+24%</span>
        <span className="font-display text-[8px] text-ink/40 sm:text-[9px]">This week</span>
      </div>
    </div>
  );
}
