import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const switchVariants = cva(
  [
    "relative inline-flex shrink-0 cursor-pointer items-center",
    "[border-width:var(--comixa-button-border-width,2px)] [border-color:var(--comixa-outline-border,#1E1E1E)] [box-shadow:var(--comixa-outline-shadow-value,2px_2px_0_0_var(--comixa-outline-shadow,#1E1E1E))]",
    "transition-[background-color,box-shadow,transform] duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-comic-blue focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[state=checked]:shadow-none",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "[background:var(--comixa-outline-bg,#FFFFFF)] data-[state=checked]:[background:var(--comixa-default-bg,var(--comixa-warning-bg,#FFD84D))]",
        primary:
          "[background:var(--comixa-outline-bg,#FFFFFF)] data-[state=checked]:[background:var(--comixa-primary-bg,#4F9CF9)]",
        danger:
          "[background:var(--comixa-outline-bg,#FFFFFF)] data-[state=checked]:[background:var(--comixa-danger-bg,#FF5757)]",
        success:
          "[background:var(--comixa-outline-bg,#FFFFFF)] data-[state=checked]:[background:var(--comixa-success-bg,#4ADE80)]",
        pink: "[background:var(--comixa-outline-bg,#FFFFFF)] data-[state=checked]:bg-comic-pink",
      },
      switchSize: {
        sm: "h-6 w-10 rounded-md",
        md: "h-7 w-12 rounded-lg",
        lg: "h-8 w-14 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      switchSize: "md",
    },
  }
);

const thumbSize = {
  sm: "h-4 w-4 data-[state=checked]:translate-x-4",
  md: "h-5 w-5 data-[state=checked]:translate-x-5",
  lg: "h-6 w-6 data-[state=checked]:translate-x-6",
} as const;

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange">,
    VariantProps<typeof switchVariants> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  labelClassName?: string;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      variant,
      switchSize = "md",
      checked,
      defaultChecked = false,
      onCheckedChange,
      disabled,
      label,
      labelClassName,
      id,
      ...props
    },
    ref
  ) => {
    const [uncontrolled, setUncontrolled] = React.useState(defaultChecked);
    const isChecked = checked ?? uncontrolled;
    const size = switchSize ?? "md";
    const generatedId = React.useId();
    const switchId = id ?? generatedId;

    const toggle = () => {
      if (disabled) return;
      const next = !isChecked;
      if (checked === undefined) setUncontrolled(next);
      onCheckedChange?.(next);
    };

    const control = (
      <button
        ref={ref}
        id={switchId}
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        data-state={isChecked ? "checked" : "unchecked"}
        data-comixa-switch=""
        data-comixa-switch-variant={variant ?? "default"}
        className={cn(switchVariants({ variant, switchSize: size }), className)}
        onClick={(event) => {
          props.onClick?.(event);
          if (!event.defaultPrevented) toggle();
        }}
        {...props}
      >
        <span
          aria-hidden
          data-state={isChecked ? "checked" : "unchecked"}
          data-comixa-switch-thumb=""
          className={cn(
            "pointer-events-none absolute left-0.5 top-1/2 -translate-y-1/2 rounded-sm transition-transform duration-150 [border-width:var(--comixa-button-border-width,2px)] [border-color:var(--comixa-outline-border,#1E1E1E)] [background:var(--comixa-outline-bg,#FFFFFF)] [box-shadow:var(--comixa-outline-shadow-value,2px_2px_0_0_var(--comixa-outline-shadow,#1E1E1E))]",
            thumbSize[size]
          )}
        />
      </button>
    );

    if (!label) return control;

    return (
      <div
        className={cn(
          "inline-flex items-center gap-2 font-body [color:var(--pg-fg,#1A1A1A)]",
          disabled && "opacity-50",
          labelClassName
        )}
      >
        {control}
        <span className="select-none text-base">{label}</span>
      </div>
    );
  }
);
Switch.displayName = "Switch";
