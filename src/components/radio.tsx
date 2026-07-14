import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const radioVariants = cva(
  [
    "peer h-5 w-5 shrink-0 appearance-none rounded-full border-2 border-ink bg-paper shadow-comic-sm",
    "transition-[transform,box-shadow,background-color] duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-comic-blue focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "relative after:absolute after:left-1/2 after:top-1/2 after:hidden after:h-2 after:w-2",
    "after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-ink",
    "checked:after:block checked:shadow-none",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "checked:bg-comic-yellow",
        primary: "checked:bg-comic-blue checked:after:bg-white",
        danger: "checked:bg-comic-red checked:after:bg-white",
        success: "checked:bg-comic-green",
        pink: "checked:bg-comic-pink",
      },
      radioSize: {
        sm: "h-4 w-4 after:h-1.5 after:w-1.5",
        md: "h-5 w-5 after:h-2 after:w-2",
        lg: "h-6 w-6 after:h-2.5 after:w-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      radioSize: "md",
    },
  }
);

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
    VariantProps<typeof radioVariants> {
  label?: React.ReactNode;
  labelClassName?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    { className, variant, radioSize, label, labelClassName, id, ...props },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    const input = (
      <input
        ref={ref}
        id={inputId}
        type="radio"
        className={cn(radioVariants({ variant, radioSize }), className)}
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
