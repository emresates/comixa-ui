import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const pricingVariants = cva(
  "grid w-full items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3",
  {
    variants: {
      columns: {
        1: "grid-cols-1 sm:grid-cols-1 lg:grid-cols-1",
        2: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2",
        3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      },
    },
    defaultVariants: {
      columns: 3,
    },
  }
);

export interface PricingProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pricingVariants> {}

export const Pricing = React.forwardRef<HTMLDivElement, PricingProps>(
  ({ className, columns, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(pricingVariants({ columns }), className)}
      {...props}
    />
  )
);
Pricing.displayName = "Pricing";

export const pricingTierVariants = cva(
  [
    "relative flex h-full flex-col gap-4 p-6",
    "[border-width:var(--comixa-button-border-width,2px)] [border-color:var(--comixa-outline-border,#1E1E1E)] [border-radius:var(--comixa-button-radius,0.75rem)]",
    "[background:var(--comixa-outline-bg,#FFFFFF)] [color:var(--comixa-outline-text,#111111)] [box-shadow:var(--comixa-outline-shadow-value,4px_4px_0_0_var(--comixa-outline-shadow,#1E1E1E))]",
  ].join(" "),
  {
    variants: {
      featured: {
        true:
          "z-10 scale-[1.02] -rotate-1 [background:var(--comixa-warning-bg,#FFD84D)] [color:var(--comixa-warning-text,#111111)] [border-color:var(--comixa-warning-border,#1E1E1E)] [box-shadow:var(--comixa-warning-shadow-value,6px_6px_0_0_var(--comixa-warning-shadow,#1E1E1E))]",
        false: "",
      },
    },
    defaultVariants: {
      featured: false,
    },
  }
);

export interface PricingTierProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof pricingTierVariants> {
  name: React.ReactNode;
  price: React.ReactNode;
  period?: React.ReactNode;
  description?: React.ReactNode;
  features?: React.ReactNode[];
  badge?: React.ReactNode;
  cta?: React.ReactNode;
}

export const PricingTier = React.forwardRef<HTMLDivElement, PricingTierProps>(
  (
    {
      className,
      featured,
      name,
      price,
      period,
      description,
      features,
      badge,
      cta,
      children,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(pricingTierVariants({ featured }), className)}
      data-featured={featured ? "" : undefined}
      {...props}
    >
      {badge ? (
        <span className="absolute -top-3 right-4 px-2 py-0.5 font-comic text-xs uppercase tracking-wide [border-width:var(--comixa-button-border-width,2px)] [border-color:var(--comixa-danger-border,#1E1E1E)] [border-radius:var(--comixa-button-radius,0.375rem)] [background:var(--comixa-danger-bg,#FF5757)] [color:var(--comixa-danger-text,#FFFFFF)] [box-shadow:var(--comixa-danger-shadow-value,2px_2px_0_0_var(--comixa-danger-shadow,#1E1E1E))]">
          {badge}
        </span>
      ) : null}
      <div>
        <h3 className="font-comic text-2xl uppercase tracking-wide">{name}</h3>
        {description ? (
          <p className="mt-1 text-sm [color:var(--pg-fg-muted,#5C5C5C)]">
            {description}
          </p>
        ) : null}
      </div>
      <div className="flex items-end gap-1">
        <span className="font-comic text-4xl uppercase leading-none tracking-wide">
          {price}
        </span>
        {period ? (
          <span className="pb-1 text-sm [color:var(--pg-fg-muted,#5C5C5C)]">
            /{period}
          </span>
        ) : null}
      </div>
      {features && features.length > 0 ? (
        <ul className="flex flex-col gap-2 text-sm">
          {features.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span
                className="mt-0.5 font-comic [color:var(--comixa-success-bg,#4ADE80)]"
                aria-hidden="true"
              >
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {children}
      {cta ? <div className="mt-auto pt-2">{cta}</div> : null}
    </div>
  )
);
PricingTier.displayName = "PricingTier";
