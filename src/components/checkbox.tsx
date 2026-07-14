import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const checkboxVariants = cva(
  [
    "peer h-5 w-5 shrink-0 appearance-none border-2 border-ink bg-paper shadow-comic-sm",
    "transition-[transform,box-shadow,background-color] duration-150",
    "checked:bg-comic-yellow checked:shadow-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-comic-blue focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "relative after:absolute after:left-1/2 after:top-[45%] after:hidden after:h-[10px] after:w-[5px]",
    "after:-translate-x-1/2 after:-translate-y-1/2 after:rotate-45",
    "after:border-b-2 after:border-r-2 after:border-ink",
    "checked:after:block",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "checked:bg-comic-yellow",
        primary: "checked:bg-comic-blue checked:after:border-white",
        danger: "checked:bg-comic-red checked:after:border-white",
        success: "checked:bg-comic-green",
        pink: "checked:bg-comic-pink",
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
    VariantProps<typeof checkboxVariants> {
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
        className={cn(
          checkboxVariants({ variant, checkboxSize }),
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
          "inline-flex cursor-pointer items-center gap-2 font-body text-ink",
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
