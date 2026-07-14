import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const testimonialsVariants = cva("grid w-full gap-4", {
  variants: {
    columns: {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    },
  },
  defaultVariants: {
    columns: 3,
  },
});

export interface TestimonialsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof testimonialsVariants> {}

export const Testimonials = React.forwardRef<HTMLDivElement, TestimonialsProps>(
  ({ className, columns, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(testimonialsVariants({ columns }), className)}
      {...props}
    />
  )
);
Testimonials.displayName = "Testimonials";

export const testimonialVariants = cva(
  [
    "relative flex h-full flex-col gap-4 border-2 border-ink p-5",
    "font-body text-ink shadow-comic",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "rounded-xl bg-paper",
        cream: "rounded-xl bg-paper-cream",
        pop: "rounded-xl bg-comic-yellow -rotate-1 shadow-comic-lg",
        speech:
          "rounded-[1.5rem] bg-paper after:absolute after:-bottom-3 after:left-8 after:h-0 after:w-0 after:border-x-[10px] after:border-t-[12px] after:border-x-transparent after:border-t-ink",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Stars({ count }: { count: number }) {
  const n = Math.max(0, Math.min(5, Math.round(count)));
  return (
    <div className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "font-comic text-sm leading-none",
            i < n ? "text-comic-orange" : "text-ink/25"
          )}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
}

export interface TestimonialProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children" | "role">,
    VariantProps<typeof testimonialVariants> {
  quote: React.ReactNode;
  author: React.ReactNode;
  role?: React.ReactNode;
  avatar?: React.ReactNode;
  rating?: number;
  children?: React.ReactNode;
}

export const Testimonial = React.forwardRef<HTMLElement, TestimonialProps>(
  (
    {
      className,
      variant,
      quote,
      author,
      role,
      avatar,
      rating,
      children,
      ...props
    },
    ref
  ) => (
    <figure
      ref={ref}
      className={cn(testimonialVariants({ variant }), className)}
      {...props}
    >
      {typeof rating === "number" ? <Stars count={rating} /> : null}
      <blockquote className="flex-1 text-base leading-relaxed">
        <span className="font-comic text-2xl leading-none text-ink/30">“</span>
        {quote}
        <span className="font-comic text-2xl leading-none text-ink/30">”</span>
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3">
        {avatar ? <div className="shrink-0">{avatar}</div> : null}
        <div className="min-w-0">
          <div className="font-comic text-sm uppercase tracking-wide">
            {author}
          </div>
          {role ? (
            <div className="truncate text-sm text-ink-muted">{role}</div>
          ) : null}
        </div>
      </figcaption>
      {children}
    </figure>
  )
);
Testimonial.displayName = "Testimonial";
