import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export type BackgroundVariant =
  | "dots"
  | "grid"
  | "lines"
  | "pattern"
  | "explosion"
  | "comic-paper"
  | "pop-art"
  | "vintage-paper";

export const backgroundVariants = cva("relative overflow-hidden", {
  variants: {
    tone: {
      paper:
        "[background:var(--comixa-outline-bg,#FFFFFF)] [color:var(--comixa-outline-text,#111111)]",
      cream:
        "[background:var(--comixa-default-bg,#FFF3D6)] [color:var(--comixa-default-text,#111111)]",
      yellow:
        "[background:var(--comixa-warning-bg,#FFD84D)] [color:var(--comixa-warning-text,#111111)]",
      ink:
        "[background:var(--comixa-outline-border,#1A1A1A)] [color:var(--comixa-outline-bg,#FFFDF5)]",
    },
    intensity: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: {
    tone: "paper",
    intensity: "md",
  },
});

function layerStyle(
  variant: BackgroundVariant,
  intensity: "sm" | "md" | "lg"
): React.CSSProperties {
  const inkSoft = "rgba(26,26,26,0.16)";
  const inkFaint = "rgba(26,26,26,0.1)";

  switch (variant) {
    case "dots": {
      const size = intensity === "sm" ? 12 : intensity === "lg" ? 22 : 16;
      return {
        backgroundImage: `radial-gradient(circle, ${inkSoft} 1.4px, transparent 1.5px)`,
        backgroundSize: `${size}px ${size}px`,
      };
    }
    case "grid": {
      const step = intensity === "sm" ? 24 : intensity === "lg" ? 48 : 32;
      return {
        backgroundImage: `linear-gradient(${inkFaint} 1px, transparent 1px), linear-gradient(90deg, ${inkFaint} 1px, transparent 1px)`,
        backgroundSize: `${step}px ${step}px`,
      };
    }
    case "lines": {
      const gap = intensity === "sm" ? 10 : intensity === "lg" ? 22 : 14;
      return {
        opacity: 0.85,
        backgroundImage: `repeating-linear-gradient(-28deg, transparent, transparent ${gap}px, ${inkSoft} ${gap}px, transparent ${gap + 2}px)`,
      };
    }
    case "pattern": {
      const size = intensity === "sm" ? 18 : intensity === "lg" ? 36 : 24;
      return {
        opacity: 0.75,
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(26,26,26,0.28) 1px, transparent 0), radial-gradient(circle at 1px 1px, rgba(255,229,102,0.45) 1px, transparent 0)`,
        backgroundSize: `${size}px ${size}px, ${size * 2}px ${size * 2}px`,
        backgroundPosition: `0 0, ${size}px ${size}px`,
      };
    }
    case "explosion": {
      const opacity = intensity === "sm" ? 0.35 : intensity === "lg" ? 0.7 : 0.5;
      return {
        opacity,
        background:
          "conic-gradient(from 0deg,#FFE566 0deg 18deg,transparent 18deg 36deg,#FF4D4D 36deg 54deg,transparent 54deg 72deg,#4D9FFF 72deg 90deg,transparent 90deg 108deg,#FF7AB6 108deg 126deg,transparent 126deg 144deg,#5BD67A 144deg 162deg,transparent 162deg 180deg,#FFE566 180deg 198deg,transparent 198deg 216deg,#FF9F43 216deg 234deg,transparent 234deg 252deg,#4D9FFF 252deg 270deg,transparent 270deg 288deg,#FF4D4D 288deg 306deg,transparent 306deg 324deg,#FF7AB6 324deg 342deg,transparent 342deg 360deg)",
        WebkitMaskImage:
          "radial-gradient(circle, black 8%, transparent 72%)",
        maskImage: "radial-gradient(circle, black 8%, transparent 72%)",
      };
    }
    case "comic-paper":
      return {
        backgroundImage:
          "linear-gradient(180deg,rgba(255,255,255,0.35),transparent 40%), radial-gradient(ellipse at 20% 10%, rgba(255,229,102,0.25), transparent 45%), radial-gradient(ellipse at 80% 90%, rgba(77,159,255,0.12), transparent 40%), repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(26,26,26,0.03) 3px)",
        boxShadow: "inset 0 0 0 3px rgba(255,253,245,0.45)",
        border: "2px solid #1A1A1A",
      };
    case "pop-art": {
      const size = intensity === "sm" ? 11 : intensity === "lg" ? 20 : 15;
      return {
        backgroundImage:
          "radial-gradient(circle at 2px 2px, var(--comixa-warning-bg,#FFE14D) 2px, transparent 0), linear-gradient(135deg, transparent 0 48%, rgba(255,255,255,0.34) 48% 52%, transparent 52% 100%)",
        backgroundSize: `${size}px ${size}px, 32px 32px`,
        backgroundColor: "var(--comixa-danger-bg,#FF4B4B)",
        opacity: intensity === "sm" ? 0.55 : intensity === "lg" ? 0.9 : 0.72,
      };
    }
    case "vintage-paper":
      return {
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(74,58,42,0.18) 0.8px, transparent 0), repeating-linear-gradient(0deg, rgba(74,58,42,0.08) 0, rgba(74,58,42,0.08) 1px, transparent 1px, transparent 6px)",
        backgroundSize:
          intensity === "sm"
            ? "10px 10px, 100% 8px"
            : intensity === "lg"
              ? "6px 6px, 100% 4px"
              : "8px 8px, 100% 6px",
        backgroundColor: "var(--comixa-outline-bg,#F7EED8)",
        boxShadow:
          "inset 0 0 0 1px rgba(74,58,42,0.2), inset 0 0 38px rgba(74,58,42,0.12)",
      };
  }
}

export interface BackgroundProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof backgroundVariants> {
  variant?: BackgroundVariant;
}

export const Background = React.forwardRef<HTMLDivElement, BackgroundProps>(
  (
    {
      className,
      tone = "paper",
      intensity = "md",
      variant = "dots",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(backgroundVariants({ tone, intensity }), className)}
        {...props}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={layerStyle(variant, intensity ?? "md")}
        />
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);
Background.displayName = "Background";

function makeNamed(variant: BackgroundVariant, name: string) {
  const Comp = React.forwardRef<
    HTMLDivElement,
    Omit<BackgroundProps, "variant">
  >((props, ref) => <Background ref={ref} variant={variant} {...props} />);
  Comp.displayName = name;
  return Comp;
}

export const DotsBackground = makeNamed("dots", "DotsBackground");
export const GridBackground = makeNamed("grid", "GridBackground");
export const LinesBackground = makeNamed("lines", "LinesBackground");
export const PatternBackground = makeNamed("pattern", "PatternBackground");
export const ExplosionBackground = makeNamed(
  "explosion",
  "ExplosionBackground"
);
export const ComicPaperBackground = makeNamed(
  "comic-paper",
  "ComicPaperBackground"
);
export const PopArtBackground = makeNamed("pop-art", "PopArtBackground");
export const VintagePaperBackground = makeNamed(
  "vintage-paper",
  "VintagePaperBackground"
);
