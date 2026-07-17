import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";
import { mergeComixaThemeStyle, type ThemeableProps } from "../themes";

export const checkboxVariants = cva(
  [
    "peer h-5 w-5 shrink-0 appearance-none",
    "[border-width:var(--comixa-button-border-width,2px)] [border-color:var(--comixa-outline-border,#1E1E1E)] [background:var(--comixa-outline-bg,#FFFFFF)] [box-shadow:var(--comixa-outline-shadow-value,2px_2px_0_0_var(--comixa-outline-shadow,#1E1E1E))]",
    "transition-[transform,box-shadow,background-color] duration-150",
    "checked:shadow-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-comic-blue focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "relative after:absolute after:left-1/2 after:top-[45%] after:hidden after:h-[10px] after:w-[5px]",
    "after:-translate-x-1/2 after:-translate-y-1/2 after:rotate-45",
    "after:border-b-2 after:border-r-2 after:[border-color:var(--comixa-checkmark-color,#1E1E1E)]",
    "checked:after:block",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "checked:[background:var(--comixa-default-bg,var(--comixa-warning-bg,#FFD84D))]",
        primary:
          "[--comixa-checkmark-color:var(--comixa-primary-text,#FFFFFF)] checked:[background:var(--comixa-primary-bg,#4F9CF9)]",
        danger:
          "[--comixa-checkmark-color:var(--comixa-danger-text,#FFFFFF)] checked:[background:var(--comixa-danger-bg,#FF5757)]",
        success:
          "[--comixa-checkmark-color:var(--comixa-success-text,#111111)] checked:[background:var(--comixa-success-bg,#4ADE80)]",
        pink:
          "[--comixa-checkmark-color:#111111] checked:bg-comic-pink",
      },
      checkboxSize: {
        sm: "h-4 w-4 rounded-sm after:h-[8px] after:w-[4px]",
        md: "h-5 w-5 rounded-md",
        lg: "h-6 w-6 rounded-lg after:h-[12px] after:w-[6px]",
      },
    },
    defaultVariants: {
      variant: "default",
      checkboxSize: "md",
    },
  }
);

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
    VariantProps<typeof checkboxVariants>,
    ThemeableProps {
  label?: React.ReactNode;
  labelClassName?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      variant,
      checkboxSize,
      label,
      labelClassName,
      id,
      theme,
      style,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    const input = (
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        data-comixa-checkbox=""
        data-comixa-checkbox-variant={variant ?? "default"}
        data-comixa-theme={theme}
        className={cn(
          checkboxVariants({ variant, checkboxSize }),
          className
        )}
        style={mergeComixaThemeStyle(theme, style)}
        {...props}
      />
    );

    if (!label) return input;

    return (
      <label
        htmlFor={inputId}
        className={cn(
          "inline-flex cursor-pointer items-center gap-2 font-body [color:var(--pg-fg,#1A1A1A)]",
          props.disabled && "cursor-not-allowed opacity-50",
          labelClassName
        )}
      >
        {input}
        <span className="select-none text-base">{label}</span>
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";
