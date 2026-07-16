import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const featuresVariants = cva("grid w-full gap-4", {
  variants: {
    columns: {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    },
  },
  defaultVariants: {
    columns: 3,
  },
});

export interface FeaturesProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof featuresVariants> {}

export const Features = React.forwardRef<HTMLDivElement, FeaturesProps>(
  ({ className, columns, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(featuresVariants({ columns }), className)}
      {...props}
    />
  )
);
Features.displayName = "Features";

export const featureVariants = cva(
  [
    "relative flex h-full flex-col gap-3 overflow-hidden p-5",
    "font-body transition-transform duration-150 hover:-translate-y-1",
    "[border-width:var(--comixa-button-border-width,2px)] [border-color:var(--comixa-outline-border,#1E1E1E)] [border-radius:var(--comixa-button-radius,0.75rem)]",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "[background:var(--comixa-outline-bg,#FFFFFF)] [color:var(--comixa-outline-text,#111111)] [box-shadow:var(--comixa-outline-shadow-value,4px_4px_0_0_var(--comixa-outline-shadow,#1E1E1E))]",
        yellow:
          "[background:var(--comixa-warning-bg,#FFD84D)] [color:var(--comixa-warning-text,#111111)] [border-color:var(--comixa-warning-border,#1E1E1E)] [box-shadow:var(--comixa-warning-shadow-value,4px_4px_0_0_var(--comixa-warning-shadow,#1E1E1E))]",
        blue:
          "[background:var(--comixa-primary-bg,#4F9CF9)] [color:var(--comixa-primary-text,#FFFFFF)] [border-color:var(--comixa-primary-border,#1E1E1E)] [box-shadow:var(--comixa-primary-shadow-value,4px_4px_0_0_var(--comixa-primary-shadow,#1E1E1E))]",
        burst:
          "[background:var(--comixa-danger-bg,#FF4FA3)] [color:var(--comixa-danger-text,#FFFFFF)] [border-color:var(--comixa-danger-border,#1E1E1E)] [box-shadow:var(--comixa-danger-shadow-value,4px_4px_0_0_var(--comixa-danger-shadow,#1E1E1E))] before:absolute before:-right-8 before:-top-8 before:h-24 before:w-24 before:rounded-full before:[border-width:var(--comixa-button-border-width,2px)] before:[border-color:var(--comixa-danger-border,#1E1E1E)] before:[background:var(--comixa-warning-bg,#FFD84D)] before:opacity-80",
        outline:
          "border-dashed bg-transparent shadow-none [color:var(--comixa-outline-text,#111111)]",
      },
      align: {
        left: "items-start text-left",
        center: "items-center text-center",
      },
    },
    defaultVariants: {
      variant: "default",
      align: "left",
    },
  }
);

export interface FeatureProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title">,
    VariantProps<typeof featureVariants> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
}

export const Feature = React.forwardRef<HTMLElement, FeatureProps>(
  (
    { className, variant, align, icon, title, description, children, ...props },
    ref
  ) => (
    <article
      ref={ref}
      className={cn(featureVariants({ variant, align }), className)}
      {...props}
    >
      {icon ? (
        <div className="relative z-10 grid h-12 w-12 shrink-0 place-items-center [border-width:var(--comixa-button-border-width,2px)] [border-color:var(--comixa-outline-border,#1E1E1E)] [border-radius:var(--comixa-button-radius,0.5rem)] [background:var(--comixa-outline-bg,#FFFFFF)] [color:var(--comixa-outline-text,#111111)] [box-shadow:var(--comixa-outline-shadow-value,2px_2px_0_0_var(--comixa-outline-shadow,#1E1E1E))]">
          {icon}
        </div>
      ) : null}
      <div className="relative z-10 flex flex-col gap-2">
        <h3 className="font-comic text-2xl uppercase leading-none tracking-wide">
          {title}
        </h3>
        {description ? (
          <p className="text-sm leading-relaxed opacity-80">
            {description}
          </p>
        ) : null}
      </div>
      {children ? <div className="relative z-10 mt-auto">{children}</div> : null}
    </article>
  )
);
Feature.displayName = "Feature";
