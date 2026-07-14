import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const speechBubbleVariants = cva(
  [
    "relative inline-block max-w-md border-2 border-ink font-body text-ink",
    "rounded-2xl shadow-comic",
  ].join(" "),
  {
    variants: {
      shape: {
        speech: "bg-paper",
        thought: "rounded-[2rem] bg-paper",
      },
      tone: {
        default: "",
        pop: "bg-comic-yellow",
        danger: "bg-comic-red text-white",
        blue: "bg-comic-blue text-white",
        pink: "bg-comic-pink",
        cream: "bg-paper-cream",
      },
      size: {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-3 text-base",
        lg: "px-5 py-4 text-lg",
      },
      /** Where the bubble points (who is speaking). */
      tail: {
        bottomLeft: "mb-4",
        bottomRight: "mb-4",
        bottom: "mb-4",
        none: "",
      },
    },
    defaultVariants: {
      shape: "speech",
      tone: "default",
      size: "md",
      tail: "bottomLeft",
    },
  }
);

const toneBg: Record<string, string> = {
  default: "#FFFDF5",
  pop: "#FFE566",
  danger: "#FF4D4D",
  blue: "#4D9FFF",
  pink: "#FF7AB6",
  cream: "#FFF3D6",
};

function SpeechTail({
  side,
  tone,
}: {
  side: "bottomLeft" | "bottomRight" | "bottom";
  tone: string;
}) {
  const fill = toneBg[tone] ?? toneBg.default;

  const position =
    side === "bottomRight"
      ? "right-6"
      : side === "bottom"
        ? "left-1/2 -translate-x-1/2"
        : "left-6";

  // Classic comic pointer: ink outline triangle + fill triangle
  return (
    <span
      aria-hidden
      className={cn("pointer-events-none absolute -bottom-[14px]", position)}
    >
      <svg width="22" height="16" viewBox="0 0 22 16" className="block">
        <path d="M1 1 L11 15 L21 1 Z" fill="#1A1A1A" />
        <path d="M3.2 1 L11 12.5 L18.8 1 Z" fill={fill} />
      </svg>
    </span>
  );
}

function ThoughtTail({
  side,
  tone,
}: {
  side: "bottomLeft" | "bottomRight" | "bottom";
  tone: string;
}) {
  const fill = toneBg[tone] ?? toneBg.default;
  const position =
    side === "bottomRight"
      ? "right-6 flex-row-reverse"
      : side === "bottom"
        ? "left-1/2 -translate-x-1/2"
        : "left-6";

  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute -bottom-[18px] flex items-end gap-1",
        position
      )}
    >
      {[14, 10, 6].map((n, i) => (
        <span
          key={n}
          className="rounded-full border-2 border-ink"
          style={{
            width: n,
            height: n,
            backgroundColor: fill,
            marginBottom: i * -2,
            boxShadow: i === 0 ? "2px 2px 0 0 #1A1A1A" : undefined,
          }}
        />
      ))}
    </span>
  );
}

export interface SpeechBubbleProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof speechBubbleVariants> {
  caption?: React.ReactNode;
}

export const SpeechBubble = React.forwardRef<HTMLDivElement, SpeechBubbleProps>(
  (
    {
      className,
      shape = "speech",
      tone = "default",
      size = "md",
      tail = "bottomLeft",
      caption,
      children,
      ...props
    },
    ref
  ) => {
    const resolvedTone = tone ?? "default";
    const resolvedTail = tail ?? "bottomLeft";
    const resolvedShape = shape ?? "speech";

    // Map legacy left/right if anyone still passes — not in types but safe
    const normalizedTail =
      (resolvedTail as string) === "left"
        ? "bottomLeft"
        : (resolvedTail as string) === "right"
          ? "bottomRight"
          : resolvedTail;

    return (
      <div
        ref={ref}
        className={cn(
          speechBubbleVariants({
            shape: resolvedShape,
            tone: resolvedTone,
            size,
            tail: normalizedTail as "bottomLeft" | "bottomRight" | "bottom" | "none",
          }),
          // ensure tone overrides shape bg when set
          resolvedTone === "default" &&
            resolvedShape === "speech" &&
            "bg-paper",
          resolvedTone === "default" &&
            resolvedShape === "thought" &&
            "bg-paper",
          className
        )}
        data-shape={resolvedShape}
        {...props}
      >
        {caption ? (
          <p className="mb-1 font-comic text-xs uppercase tracking-wide opacity-70">
            {caption}
          </p>
        ) : null}
        <div className="leading-relaxed">{children}</div>

        {normalizedTail !== "none" && resolvedShape === "speech" ? (
          <SpeechTail
            side={normalizedTail as "bottomLeft" | "bottomRight" | "bottom"}
            tone={resolvedTone}
          />
        ) : null}

        {normalizedTail !== "none" && resolvedShape === "thought" ? (
          <ThoughtTail
            side={normalizedTail as "bottomLeft" | "bottomRight" | "bottom"}
            tone={resolvedTone}
          />
        ) : null}
      </div>
    );
  }
);
SpeechBubble.displayName = "SpeechBubble";
