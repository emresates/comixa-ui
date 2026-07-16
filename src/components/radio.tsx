import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const radioVariants = cva(
  [
    "peer h-5 w-5 shrink-0 appearance-none rounded-full",
    "[border-width:var(--comixa-button-border-width,2px)] [border-color:var(--comixa-outline-border,#1E1E1E)] [background:var(--comixa-outline-bg,#FFFFFF)] [box-shadow:var(--comixa-outline-shadow-value,2px_2px_0_0_var(--comixa-outline-shadow,#1E1E1E))]",
    "transition-[transform,box-shadow,background-color] duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-comic-blue focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "relative after:absolute after:left-1/2 after:top-1/2 after:hidden after:h-2 after:w-2",
    "after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:[background:var(--comixa-radio-dot,#1E1E1E)]",
    "checked:after:block",
  ].join(" "),
  {
    variants: {
      radioSize: {
        sm: "h-4 w-4 after:h-1.5 after:w-1.5",
        md: "h-5 w-5 after:h-2 after:w-2",
        lg: "h-6 w-6 after:h-2.5 after:w-2.5",
      },
    },
    defaultVariants: {
      radioSize: "md",
    },
  }
);

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
    VariantProps<typeof radioVariants> {
  label?: React.ReactNode;
  labelClassName?: string;
  invalid?: boolean;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    { className, radioSize, label, labelClassName, invalid, id, ...props },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    const input = (
      <input
        ref={ref}
        id={inputId}
        type="radio"
        aria-invalid={invalid || props["aria-invalid"] || undefined}
        data-invalid={invalid || props["aria-invalid"] ? "true" : undefined}
        className={cn(
          radioVariants({ radioSize }),
          "checked:[background:var(--comixa-radio-checked-bg,var(--comixa-default-bg,var(--comixa-warning-bg,#FFD84D)))] checked:[border-color:var(--comixa-radio-checked-border,var(--comixa-outline-border,#1E1E1E))] checked:[box-shadow:var(--comixa-radio-checked-shadow,none)]",
          "data-[invalid=true]:[border-color:var(--comixa-radio-invalid-border,var(--comixa-danger-border,#FF5757))] data-[invalid=true]:[box-shadow:var(--comixa-radio-invalid-shadow,var(--comixa-danger-shadow-value,4px_4px_0_0_var(--comixa-danger-shadow,#FF5757)))]",
          className
        )}
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
Radio.displayName = "Radio";

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, orientation = "vertical", ...props }, ref) => (
    <div
      ref={ref}
      role="radiogroup"
      className={cn(
        "flex gap-3",
        orientation === "vertical" ? "flex-col" : "flex-row flex-wrap",
        className
      )}
      {...props}
    />
  )
);
RadioGroup.displayName = "RadioGroup";
