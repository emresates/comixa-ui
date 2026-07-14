import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const avatarVariants = cva(
  [
    "relative inline-flex shrink-0 items-center justify-center overflow-hidden",
    "border-2 border-ink bg-paper-cream font-comic uppercase text-ink shadow-comic-sm",
    "select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-paper-cream",
        yellow: "bg-comic-yellow",
        blue: "bg-comic-blue text-white",
        red: "bg-comic-red text-white",
        green: "bg-comic-green",
        pink: "bg-comic-pink",
        ink: "bg-ink text-paper",
      },
      size: {
        sm: "h-8 w-8 rounded-md text-xs",
        md: "h-10 w-10 rounded-lg text-sm",
        lg: "h-14 w-14 rounded-xl text-lg",
        xl: "h-20 w-20 rounded-2xl text-2xl",
      },
      shape: {
        rounded: "",
        square: "rounded-none",
        circle: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      shape: "rounded",
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
  name?: string;
}

function initialsFromName(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      className,
      variant,
      size,
      shape,
      src,
      alt,
      fallback,
      name,
      children,
      ...props
    },
    ref
  ) => {
    const [failed, setFailed] = React.useState(false);
    const showImage = Boolean(src) && !failed;
    const content =
      children ??
      fallback ??
      (name ? initialsFromName(name) : "?");

    return (
      <span
        ref={ref}
        className={cn(avatarVariants({ variant, size, shape }), className)}
        {...props}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt ?? name ?? ""}
            className="h-full w-full object-cover"
            onError={() => setFailed(true)}
          />
        ) : (
          <span aria-hidden className="leading-none">
            {content}
          </span>
        )}
      </span>
    );
  }
);
Avatar.displayName = "Avatar";

export const AvatarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center -space-x-2", className)}
    {...props}
  />
));
AvatarGroup.displayName = "AvatarGroup";
