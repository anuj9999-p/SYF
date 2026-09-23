/**
 * Original, hand-built UI mockup representing a fictional boutique-hotel
 * website ("STAYORA"). Not a screenshot of any real product — every shape,
 * color, and proportion below is composed from the existing SYF design
 * tokens (cream / paper / ink / lime / rust / cobalt).
 */
export function BrowserMockup() {
  return (
    <div className="overflow-hidden rounded-[10px] border border-ink/12 bg-paper shadow-[0_24px_60px_-28px_rgba(24,20,14,0.4)]">
      <div className="flex items-center gap-1.5 border-b border-ink/10 bg-cream px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-rust/70" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full bg-lime/80" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full bg-cobalt/60" aria-hidden="true" />
        <span className="ml-2 flex-1 truncate rounded-full bg-ink/5 px-2.5 py-1 text-center font-display text-[9px] tracking-tight text-ink/40 sm:text-[10px]">
          stayora.com
        </span>
      </div>

      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#E7C9A8] via-[#DCA97D] to-rust/60 p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <span className="font-display text-[10px] font-bold tracking-wide text-cream/80 sm:text-xs">
            STAYORA
          </span>
          <div className="flex gap-1.5 sm:gap-2">
            <span className="h-1 w-3.5 rounded-full bg-cream/30 sm:w-4" />
            <span className="h-1 w-3.5 rounded-full bg-cream/30 sm:w-4" />
            <span className="h-1 w-3.5 rounded-full bg-cream/30 sm:w-4" />
          </div>
        </div>

        <div className="mt-4 h-2 w-2/3 rounded-full bg-cream/70 sm:mt-6" />
        <div className="mt-2 h-2 w-2/5 rounded-full bg-cream/40" />

        <span className="mt-4 inline-block rounded-full bg-lime px-3 py-1 font-display text-[9px] font-semibold tracking-tight text-cream sm:mt-5">
          Book your stay
        </span>

        <div className="mt-4 grid grid-cols-3 gap-1.5 sm:mt-5 sm:gap-2">
          <div className="aspect-square rounded-md bg-cream/15" />
          <div className="aspect-square rounded-md bg-cream/10" />
          <div className="aspect-square rounded-md bg-cream/20" />
        </div>
      </div>
    </div>
  );
}
