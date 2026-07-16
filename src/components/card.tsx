import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const cardVariants = cva(
  [
    "relative flex flex-col",
    "[border-width:var(--comixa-button-border-width,2px)] [border-color:var(--comixa-outline-border,#1E1E1E)] [border-radius:var(--comixa-button-radius,0.75rem)]",
    "[color:var(--comixa-outline-text,#111111)] [font-family:var(--comixa-button-font,inherit)]",
    "transition-[transform,box-shadow] duration-150",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "[background:var(--comixa-outline-bg,#FFFFFF)] [color:var(--comixa-outline-text,#111111)] [box-shadow:var(--comixa-outline-shadow-value,4px_4px_0_0_var(--comixa-outline-shadow,#1E1E1E))]",
        cream:
          "[background:var(--comixa-default-bg,#FFF3D6)] [color:var(--comixa-default-text,#111111)] [border-color:var(--comixa-default-border,#1E1E1E)] [box-shadow:var(--comixa-default-shadow-value,4px_4px_0_0_var(--comixa-default-shadow,#1E1E1E))]",
        pop:
          "-rotate-1 [background:var(--comixa-warning-bg,#FFD84D)] [color:var(--comixa-warning-text,#111111)] [border-color:var(--comixa-warning-border,#1E1E1E)] [box-shadow:var(--comixa-warning-shadow-value,6px_6px_0_0_var(--comixa-warning-shadow,#1E1E1E))]",
        panel:
          "[background:var(--comixa-primary-bg,#4F9CF9)] [color:var(--comixa-primary-text,#FFFFFF)] [border-color:var(--comixa-primary-border,#1E1E1E)] [box-shadow:var(--comixa-primary-shadow-value,4px_4px_0_0_var(--comixa-primary-shadow,#1E1E1E))]",
        danger:
          "[background:var(--comixa-danger-bg,#FF5757)] [color:var(--comixa-danger-text,#FFFFFF)] [border-color:var(--comixa-danger-border,#1E1E1E)] [box-shadow:var(--comixa-danger-shadow-value,4px_4px_0_0_var(--comixa-danger-shadow,#1E1E1E))]",
        speech:
          "[background:var(--comixa-outline-bg,#FFFFFF)] [color:var(--comixa-outline-text,#111111)] [box-shadow:var(--comixa-outline-shadow-value,4px_4px_0_0_var(--comixa-outline-shadow,#1E1E1E))] [border-radius:1.5rem] after:absolute after:-bottom-3 after:left-8 after:h-0 after:w-0 after:border-x-[10px] after:border-t-[12px] after:border-x-transparent after:[border-top-color:var(--comixa-outline-border,#1E1E1E)]",
        outline:
          "border-dashed bg-transparent shadow-none [color:var(--comixa-outline-text,#111111)]",
      },
      padding: {
        none: "p-0",
        sm: "p-3",
        md: "p-5",
        lg: "p-7",
      },
      effect: {
        none: "",
        pop: "animate-comic-pop",
        wiggle: "animate-comic-wiggle",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
      effect: "none",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, effect, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding, effect }), className)}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mb-3 flex flex-col gap-1.5", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-comic text-2xl uppercase leading-none tracking-wide",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "font-body text-base [color:var(--pg-fg-muted,#5C5C5C)]",
      className
    )}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("font-body text-base", className)} {...props} />
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mt-4 flex items-center gap-2", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";
