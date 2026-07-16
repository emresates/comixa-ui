import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const SOUND_WORDS = [
  "POW",
  "BAM",
  "WOW",
  "BOOM",
  "ZAP",
  "CRASH",
  "WHAM",
  "BANG",
  "KAPOW",
  "SPLASH",
] as const;

export type SoundWord = (typeof SOUND_WORDS)[number];

export const soundBadgeVariants = cva(
  [
    "inline-flex select-none items-center justify-center border-2 border-ink",
    "font-comic uppercase leading-none tracking-wide shadow-comic",
    "rotate-[-6deg]",
  ].join(" "),
  {
    variants: {
      variant: {
        pow: "bg-comic-yellow text-ink",
        bam: "bg-comic-red text-white rotate-[4deg]",
        wow: "bg-comic-pink text-ink rotate-[-3deg]",
        boom: "bg-comic-orange !text-white rotate-[8deg]",
        zap: "bg-comic-blue text-white rotate-[-8deg]",
        crash: "bg-comic-green text-ink rotate-[5deg]",
        wham: "bg-ink text-comic-yellow rotate-[-2deg]",
        bang: "bg-comic-red text-comic-yellow rotate-[6deg]",
        kapow: "bg-comic-yellow text-comic-red rotate-[-10deg]",
        splash: "bg-comic-blue text-paper rotate-[3deg]",
      },
      size: {
        sm: "rounded-md px-2 py-1 text-sm",
        md: "rounded-lg px-3 py-1.5 text-xl",
        lg: "rounded-xl px-4 py-2 text-3xl",
      },
      burst: {
        true: "[clip-path:polygon(50%_0%,62%_14%,80%_8%,76%_28%,98%_35%,80%_48%,100%_55%,80%_62%,98%_75%,76%_78%,80%_95%,62%_86%,50%_100%,38%_86%,20%_95%,24%_78%,2%_75%,20%_62%,0%_55%,20%_48%,2%_35%,24%_28%,20%_8%,38%_14%)] border-0 shadow-none",
        false: "",
      },
    },
    defaultVariants: {
      variant: "pow",
      size: "md",
      burst: false,
    },
  }
);

const defaultWord: Record<
  NonNullable<VariantProps<typeof soundBadgeVariants>["variant"]>,
  string
> = {
  pow: "POW!",
  bam: "BAM!",
  wow: "WOW!",
  boom: "BOOM!",
  zap: "ZAP!",
  crash: "CRASH!",
  wham: "WHAM!",
  bang: "BANG!",
  kapow: "KAPOW!",
  splash: "SPLASH!",
};

export interface SoundBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof soundBadgeVariants> {
  /** Override text — defaults to the variant word (POW!, BAM!, …). */
  word?: string;
}

export const SoundBadge = React.forwardRef<HTMLSpanElement, SoundBadgeProps>(
  ({ className, variant = "pow", size, burst, word, children, ...props }, ref) => {
    const label =
      children ?? word ?? defaultWord[variant ?? "pow"] ?? "POW!";

    return (
      <span
        ref={ref}
        data-comixa-sound-badge=""
        className={cn(
          soundBadgeVariants({ variant, size, burst }),
          burst && "relative px-5 py-4",
          className
        )}
        {...props}
      >
        {burst ? (
          <span
            aria-hidden
            className="absolute inset-0 -z-10 scale-110 bg-ink [clip-path:polygon(50%_0%,62%_14%,80%_8%,76%_28%,98%_35%,80%_48%,100%_55%,80%_62%,98%_75%,76%_78%,80%_95%,62%_86%,50%_100%,38%_86%,20%_95%,24%_78%,2%_75%,20%_62%,0%_55%,20%_48%,2%_35%,24%_28%,20%_8%,38%_14%)]"
          />
        ) : null}
        <span className="relative z-[1]">{label}</span>
      </span>
    );
  }
);
SoundBadge.displayName = "SoundBadge";
