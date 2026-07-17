import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";
import { mergeComixaThemeStyle, type ThemeableProps } from "../themes";

export const inputVariants = cva(
  [
    "flex w-full font-body",
    "[border-width:var(--comixa-field-border-width,var(--comixa-button-border-width,2px))]",
    "[border-color:var(--comixa-field-border,#1E1E1E)]",
    "[background:var(--comixa-field-bg,#FFFDF5)]",
    "[color:var(--comixa-field-text,#111111)]",
    "[font-family:var(--comixa-field-font,'Comic_Neue',ui-rounded,system-ui,sans-serif)]",
    "[letter-spacing:var(--comixa-field-letter-spacing,0)]",
    "[&::placeholder]:text-[var(--comixa-field-placeholder,#5C5C5C)]",
    "transition-[box-shadow,transform] duration-150",
    "focus-visible:outline-none focus-visible:[box-shadow:var(--comixa-field-focus-shadow,4px_4px_0_0_var(--comixa-field-shadow,#1E1E1E))] focus-visible:-translate-y-0.5",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "file:border-0 file:bg-transparent file:font-comic file:text-sm",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "[box-shadow:var(--comixa-field-shadow-value,3px_3px_0_0_var(--comixa-field-shadow,#1E1E1E))]",
        ghost:
          "border-dashed [background:var(--comixa-field-ghost-bg,transparent)] [box-shadow:var(--comixa-field-ghost-shadow,none)]",
        filled:
          "[background:var(--comixa-field-filled-bg,#FFF3D6)] [box-shadow:var(--comixa-field-shadow-value,3px_3px_0_0_var(--comixa-field-shadow,#1E1E1E))]",
      },
      inputSize: {
        sm: "h-8 px-2.5 text-sm [border-radius:var(--comixa-field-radius-sm,0.375rem)]",
        md: "h-10 px-3 text-base [border-radius:var(--comixa-field-radius,0.5rem)]",
        lg: "h-12 px-4 text-lg [border-radius:var(--comixa-field-radius-lg,0.75rem)]",
      },
      state: {
        default: "",
        error:
          "[border-color:var(--comixa-field-error-border,#FF5757)] [box-shadow:var(--comixa-field-error-shadow,4px_4px_0_0_#FF5757)] focus-visible:[box-shadow:var(--comixa-field-error-shadow,4px_4px_0_0_#FF5757)]",
        success:
          "[border-color:var(--comixa-field-success-border,#4ADE80)] [box-shadow:var(--comixa-field-success-shadow,4px_4px_0_0_#4ADE80)] focus-visible:[box-shadow:var(--comixa-field-success-shadow,4px_4px_0_0_#4ADE80)]",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "md",
      state: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants>,
    ThemeableProps {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, variant, inputSize, state, type = "text", theme, style, ...props },
    ref
  ) => {
    return (
      <input
        ref={ref}
        type={type}
        data-comixa-input=""
        data-comixa-field-state={state ?? "default"}
        data-comixa-theme={theme}
        className={cn(inputVariants({ variant, inputSize, state }), className)}
        style={mergeComixaThemeStyle(theme, style)}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
