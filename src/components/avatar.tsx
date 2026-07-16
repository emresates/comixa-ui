import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const avatarVariants = cva(
  [
    "relative inline-flex shrink-0 items-center justify-center overflow-hidden",
    "font-comic uppercase",
    "[border-width:var(--comixa-button-border-width,2px)] [border-color:var(--comixa-outline-border,#1E1E1E)]",
    "[background:var(--comixa-default-bg,#FFF3D6)] [color:var(--comixa-default-text,#111111)] [box-shadow:var(--comixa-default-shadow-value,2px_2px_0_0_var(--comixa-default-shadow,#1E1E1E))]",
    "select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "[background:var(--comixa-default-bg,#FFF3D6)] [color:var(--comixa-default-text,#111111)] [border-color:var(--comixa-default-border,#1E1E1E)] [box-shadow:var(--comixa-default-shadow-value,2px_2px_0_0_var(--comixa-default-shadow,#1E1E1E))]",
        yellow:
          "[background:var(--comixa-warning-bg,#FFD84D)] [color:var(--comixa-warning-text,#111111)] [border-color:var(--comixa-warning-border,#1E1E1E)] [box-shadow:var(--comixa-warning-shadow-value,2px_2px_0_0_var(--comixa-warning-shadow,#1E1E1E))]",
        blue:
          "[background:var(--comixa-primary-bg,#4F9CF9)] [color:var(--comixa-primary-text,#FFFFFF)] [border-color:var(--comixa-primary-border,#1E1E1E)] [box-shadow:var(--comixa-primary-shadow-value,2px_2px_0_0_var(--comixa-primary-shadow,#1E1E1E))]",
        red:
          "[background:var(--comixa-danger-bg,#FF5757)] [color:var(--comixa-danger-text,#FFFFFF)] [border-color:var(--comixa-danger-border,#1E1E1E)] [box-shadow:var(--comixa-danger-shadow-value,2px_2px_0_0_var(--comixa-danger-shadow,#1E1E1E))]",
        green:
          "[background:var(--comixa-success-bg,#4ADE80)] [color:var(--comixa-success-text,#111111)] [border-color:var(--comixa-success-border,#1E1E1E)] [box-shadow:var(--comixa-success-shadow-value,2px_2px_0_0_var(--comixa-success-shadow,#1E1E1E))]",
        pink:
          "[background:var(--comixa-danger-bg,#FF4FA3)] [color:var(--comixa-danger-text,#FFFFFF)] [border-color:var(--comixa-danger-border,#1E1E1E)] [box-shadow:var(--comixa-danger-shadow-value,2px_2px_0_0_var(--comixa-danger-shadow,#1E1E1E))]",
        ink:
          "[background:var(--comixa-outline-border,#1E1E1E)] [color:var(--comixa-outline-bg,#FFFFFF)] [border-color:var(--comixa-outline-border,#1E1E1E)] [box-shadow:var(--comixa-outline-shadow-value,2px_2px_0_0_var(--comixa-outline-shadow,#1E1E1E))]",
      },
      size: {
        sm: "h-8 w-8 [border-radius:calc(var(--comixa-button-radius,0.5rem)_*_0.75)] text-xs",
        md: "h-10 w-10 [border-radius:var(--comixa-button-radius,0.5rem)] text-sm",
        lg: "h-14 w-14 [border-radius:calc(var(--comixa-button-radius,0.5rem)_*_1.35)] text-lg",
        xl: "h-20 w-20 [border-radius:calc(var(--comixa-button-radius,0.5rem)_*_1.85)] text-2xl",
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
