import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const textareaVariants = cva(
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
      textareaSize: {
        sm: "min-h-20 px-2.5 py-2 text-sm [border-radius:var(--comixa-field-radius-sm,0.375rem)]",
        md: "min-h-28 px-3 py-2.5 text-base [border-radius:var(--comixa-field-radius,0.5rem)]",
        lg: "min-h-36 px-4 py-3 text-lg [border-radius:var(--comixa-field-radius-lg,0.75rem)]",
      },
      state: {
        default: "",
        error:
          "[border-color:var(--comixa-field-error-border,#FF5757)] [box-shadow:var(--comixa-field-error-shadow,4px_4px_0_0_#FF5757)] focus-visible:[box-shadow:var(--comixa-field-error-shadow,4px_4px_0_0_#FF5757)]",
        success:
          "[border-color:var(--comixa-field-success-border,#4ADE80)] [box-shadow:var(--comixa-field-success-shadow,4px_4px_0_0_#4ADE80)] focus-visible:[box-shadow:var(--comixa-field-success-shadow,4px_4px_0_0_#4ADE80)]",
      },
      resize: {
        none: "resize-none",
        vertical: "resize-y",
        horizontal: "resize-x",
        both: "resize",
      },
    },
    defaultVariants: {
      variant: "default",
      textareaSize: "md",
      state: "default",
      resize: "vertical",
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, variant, textareaSize, state, resize, ...props },
    ref
  ) => (
    <textarea
      ref={ref}
      data-comixa-textarea=""
      data-comixa-field-state={state ?? "default"}
      className={cn(
        textareaVariants({ variant, textareaSize, state, resize }),
        className
      )}
      {...props}
    />
  )
);

Textarea.displayName = "Textarea";
