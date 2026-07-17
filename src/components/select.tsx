import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";
import { mergeComixaThemeStyle, type ThemeableProps } from "../themes";

export type SelectOption = {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
};

export const selectTriggerVariants = cva(
  [
    "relative flex w-full items-center justify-between gap-2 font-body",
    "[border-width:var(--comixa-button-border-width,2px)] [border-color:var(--comixa-select-border,var(--comixa-outline-border,#1E1E1E))] [border-radius:var(--comixa-button-radius,0.5rem)] [color:var(--comixa-select-text,var(--comixa-outline-text,#111111))]",
    "transition-[box-shadow,transform] duration-150",
    "focus-visible:outline-none focus-visible:[box-shadow:var(--comixa-select-focus-shadow,var(--comixa-primary-shadow-value,4px_4px_0_0_var(--comixa-primary-shadow,#1E1E1E)))] focus-visible:-translate-y-0.5",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "text-left",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "[background:var(--comixa-select-bg,var(--comixa-outline-bg,#FFFFFF))] [box-shadow:var(--comixa-outline-shadow-value,2px_2px_0_0_var(--comixa-outline-shadow,#1E1E1E))]",
        ghost:
          "border-dashed [background:var(--comixa-select-ghost-bg,var(--comixa-ghost-bg,transparent))] shadow-none",
        filled:
          "[background:var(--comixa-select-filled-bg,var(--comixa-default-bg,#FFD84D))] [box-shadow:var(--comixa-default-shadow-value,2px_2px_0_0_var(--comixa-default-shadow,#1E1E1E))]",
      },
      selectSize: {
        sm: "h-8 rounded-md px-2.5 text-sm",
        md: "h-10 rounded-lg px-3 text-base",
        lg: "h-12 rounded-xl px-4 text-lg",
      },
      state: {
        default: "",
        error:
          "[border-color:var(--comixa-select-error-border,var(--comixa-danger-border,#FF4D4D))] [background:var(--comixa-select-error-bg,var(--comixa-select-bg,var(--comixa-outline-bg,#FFFFFF)))] [color:var(--comixa-select-error-text,var(--comixa-select-text,var(--comixa-outline-text,#111111)))] [box-shadow:var(--comixa-select-error-shadow,var(--comixa-danger-shadow-value,4px_4px_0_0_var(--comixa-danger-shadow,#FF4D4D)))]",
        success:
          "[border-color:var(--comixa-select-success-border,var(--comixa-success-border,#5BD67A))] [background:var(--comixa-select-success-bg,var(--comixa-select-bg,var(--comixa-outline-bg,#FFFFFF)))] [color:var(--comixa-select-success-text,var(--comixa-select-text,var(--comixa-outline-text,#111111)))] [box-shadow:var(--comixa-select-success-shadow,var(--comixa-success-shadow-value,4px_4px_0_0_var(--comixa-success-shadow,#5BD67A)))]",
      },
    },
    defaultVariants: {
      variant: "default",
      selectSize: "md",
      state: "default",
    },
  }
);

export type SelectClassNames = {
  root?: string;
  trigger?: string;
  value?: string;
  placeholder?: string;
  icon?: string;
  list?: string;
  option?: string;
  optionActive?: string;
};

export interface SelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue">,
    VariantProps<typeof selectTriggerVariants>,
    ThemeableProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  classNames?: SelectClassNames;
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      className,
      variant,
      selectSize,
      state,
      options,
      value,
      defaultValue,
      onValueChange,
      placeholder = "Select...",
      disabled,
      name,
      classNames,
      id,
      theme,
      style,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [uncontrolled, setUncontrolled] = React.useState(defaultValue);
    const selected = value ?? uncontrolled;
    const rootRef = React.useRef<HTMLDivElement>(null);
    const listId = React.useId();

    const selectedOption = options.find((opt) => opt.value === selected);

    React.useEffect(() => {
      if (!open) return;

      const onPointerDown = (event: MouseEvent) => {
        if (!rootRef.current?.contains(event.target as Node)) {
          setOpen(false);
        }
      };
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") setOpen(false);
      };

      document.addEventListener("mousedown", onPointerDown);
      document.addEventListener("keydown", onKeyDown);
      return () => {
        document.removeEventListener("mousedown", onPointerDown);
        document.removeEventListener("keydown", onKeyDown);
      };
    }, [open]);

    const choose = (next: string) => {
      if (value === undefined) setUncontrolled(next);
      onValueChange?.(next);
      setOpen(false);
    };

    return (
      <div
        ref={rootRef}
        className={cn("relative w-full", classNames?.root, className)}
        data-state={open ? "open" : "closed"}
        data-comixa-theme={theme}
        style={mergeComixaThemeStyle(theme, style)}
        {...props}
      >
        {name ? (
          <input type="hidden" name={name} value={selected ?? ""} />
        ) : null}

        <button
          ref={ref}
          id={id}
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          data-comixa-select-trigger=""
          data-comixa-select-state={state ?? "default"}
          className={cn(
            selectTriggerVariants({ variant, selectSize, state }),
            classNames?.trigger
          )}
          onClick={() => {
            if (!disabled) setOpen((prev) => !prev);
          }}
        >
          <span
            className={cn(
              "min-w-0 flex-1 truncate",
              selectedOption
                ? classNames?.value
                : cn("text-ink-muted", classNames?.placeholder)
            )}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span
            aria-hidden
            className={cn(
              "pointer-events-none ml-2 inline-flex shrink-0 items-center justify-center text-ink",
              classNames?.icon
            )}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className={cn(
                "transition-transform duration-150",
                open && "rotate-180"
              )}
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>

        {open ? (
          <ul
            id={listId}
            role="listbox"
            className={cn(
              "absolute left-0 right-0 top-[calc(100%+0.35rem)] z-50 max-h-60 overflow-auto",
              "p-1 [border-width:var(--comixa-button-border-width,2px)] [border-color:var(--comixa-select-menu-border,var(--comixa-outline-border,#1E1E1E))] [background:var(--comixa-select-menu-bg,var(--comixa-outline-bg,#FFFFFF))] [box-shadow:var(--comixa-select-menu-shadow,var(--comixa-outline-shadow-value,4px_4px_0_0_var(--comixa-outline-shadow,#1E1E1E)))]",
              selectSize === "sm" && "rounded-md",
              (!selectSize || selectSize === "md") && "rounded-lg",
              selectSize === "lg" && "rounded-xl",
              classNames?.list
            )}
          >
            {options.map((option) => {
              const active = option.value === selected;
              return (
                <li key={option.value} role="none">
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    disabled={option.disabled}
                    className={cn(
                      "flex w-full items-center rounded-md px-2.5 py-2 text-left font-body [color:var(--comixa-outline-text,#111111)]",
                      "transition-colors duration-100",
                      "hover:[background:var(--comixa-default-bg,#FFF3D6)]",
                      "disabled:cursor-not-allowed disabled:opacity-40",
                      active &&
                        "font-comic uppercase tracking-wide [background:var(--comixa-warning-bg,#FFD84D)] [color:var(--comixa-warning-text,#111111)]",
                      classNames?.option,
                      active && classNames?.optionActive
                    )}
                    onClick={() => {
                      if (!option.disabled) choose(option.value);
                    }}
                  >
                    {option.label}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    );
  }
);
Select.displayName = "Select";

/** @deprecated Use `selectTriggerVariants`. */
export const selectVariants = selectTriggerVariants;
