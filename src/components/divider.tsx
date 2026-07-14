import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const dividerVariants = cva("relative flex w-full items-center", {
  variants: {
    variant: {
      solid: "",
      dashed: "",
      zigzag: "",
      dots: "",
      burst: "",
    },
    tone: {
      ink: "text-ink",
      muted: "text-ink-muted",
      yellow: "text-comic-yellow",
      red: "text-comic-red",
      blue: "text-comic-blue",
    },
  },
  defaultVariants: {
    variant: "solid",
    tone: "ink",
  },
});

export interface DividerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dividerVariants> {
  label?: React.ReactNode;
  labelClassName?: string;
}

function Line({
  variant,
}: {
  variant: NonNullable<VariantProps<typeof dividerVariants>["variant"]>;
}) {
  if (variant === "zigzag") {
    return (
      <div
        aria-hidden
        className="h-2 w-full bg-current"
        style={{
          WebkitMaskImage:
            "repeating-linear-gradient(135deg, #000 0 6px, transparent 6px 10px)",
          maskImage:
            "repeating-linear-gradient(135deg, #000 0 6px, transparent 6px 10px)",
        }}
      />
    );
  }

  if (variant === "dots") {
    return (
      <div
        aria-hidden
        className="h-2 w-full bg-current"
        style={{
          WebkitMaskImage:
            "radial-gradient(circle, #000 1.5px, transparent 1.8px)",
          maskImage: "radial-gradient(circle, #000 1.5px, transparent 1.8px)",
          WebkitMaskSize: "10px 10px",
          maskSize: "10px 10px",
        }}
      />
    );
  }

  if (variant === "burst") {
    return (
      <div
        aria-hidden
        className="flex h-3 w-full items-center justify-between gap-1 overflow-hidden"
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="h-full w-1 shrink-0 -skew-x-12 bg-current opacity-80"
          />
        ))}
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className={cn(
        "h-0.5 w-full bg-current",
        variant === "dashed" && "border-t-2 border-dashed border-current bg-transparent h-0"
      )}
    />
  );
}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    { className, variant = "solid", tone, label, labelClassName, ...props },
    ref
  ) => {
    const lineVariant = variant ?? "solid";

    if (!label) {
      return (
        <div
          ref={ref}
          role="separator"
          className={cn(dividerVariants({ variant, tone }), "py-2", className)}
          {...props}
        >
          <Line variant={lineVariant} />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="separator"
        className={cn(dividerVariants({ variant, tone }), "gap-3 py-2", className)}
        {...props}
      >
        <div className="min-w-0 flex-1">
          <Line variant={lineVariant} />
        </div>
        <span
          className={cn(
            "shrink-0 border-2 border-ink bg-paper px-2 py-0.5 font-comic text-xs uppercase tracking-wide text-ink shadow-comic-sm",
            labelClassName
          )}
        >
          {label}
        </span>
        <div className="min-w-0 flex-1">
          <Line variant={lineVariant} />
        </div>
      </div>
    );
  }
);
Divider.displayName = "Divider";
