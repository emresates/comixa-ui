import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const cardVariants = cva(
  [
    "relative flex flex-col border-2 border-ink text-ink",
    "transition-[transform,box-shadow] duration-150",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-paper shadow-comic rounded-xl",
        cream: "bg-paper-cream shadow-comic rounded-xl",
        pop: "bg-comic-yellow shadow-comic-lg rounded-xl -rotate-1",
        panel: "bg-comic-blue text-white shadow-comic rounded-lg",
        danger: "bg-comic-red text-white shadow-comic rounded-lg",
        speech:
          "bg-paper shadow-comic rounded-[1.5rem] after:absolute after:-bottom-3 after:left-8 after:h-0 after:w-0 after:border-x-[10px] after:border-t-[12px] after:border-x-transparent after:border-t-ink",
        outline: "bg-transparent shadow-none rounded-xl border-dashed",
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
    className={cn("font-body text-base text-ink-muted", className)}
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
