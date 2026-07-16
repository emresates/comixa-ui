import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

type FAQType = "single" | "multiple";

type FAQContextValue = {
  type: FAQType;
  open: Set<string>;
  toggle: (id: string) => void;
};

const FAQContext = React.createContext<FAQContextValue | null>(null);

function useFAQContext() {
  const ctx = React.useContext(FAQContext);
  if (!ctx) throw new Error("FAQItem must be used within FAQ");
  return ctx;
}

export const faqVariants = cva("flex w-full flex-col gap-3", {
  variants: {
    variant: {
      default: "",
      panel:
        "p-3 [border-width:var(--comixa-button-border-width,2px)] [border-color:var(--comixa-outline-border,#1E1E1E)] [border-radius:var(--comixa-button-radius,0.75rem)] [background:var(--comixa-outline-bg,#FFFFFF)] [color:var(--comixa-outline-text,#111111)] [box-shadow:var(--comixa-outline-shadow-value,2px_2px_0_0_var(--comixa-outline-shadow,#1E1E1E))]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface FAQProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof faqVariants> {
  type?: FAQType;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
}

function toSet(value: string | string[] | undefined): Set<string> {
  if (!value) return new Set();
  return new Set(Array.isArray(value) ? value : [value]);
}

export const FAQ = React.forwardRef<HTMLDivElement, FAQProps>(
  (
    {
      className,
      variant,
      type = "single",
      defaultValue,
      value,
      onValueChange,
      children,
      ...props
    },
    ref
  ) => {
    const controlled = value !== undefined;
    const [internal, setInternal] = React.useState(() => toSet(defaultValue));
    const open = controlled ? toSet(value) : internal;

    const toggle = React.useCallback(
      (id: string) => {
        const next = new Set(open);
        if (type === "single") {
          if (next.has(id)) next.clear();
          else {
            next.clear();
            next.add(id);
          }
        } else if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }

        if (!controlled) setInternal(next);
        if (onValueChange) {
          const arr = Array.from(next);
          onValueChange(type === "single" ? (arr[0] ?? "") : arr);
        }
      },
      [open, type, controlled, onValueChange]
    );

    const ctx = React.useMemo(
      () => ({ type, open, toggle }),
      [type, open, toggle]
    );

    return (
      <FAQContext.Provider value={ctx}>
        <div
          ref={ref}
          className={cn(faqVariants({ variant }), className)}
          {...props}
        >
          {children}
        </div>
      </FAQContext.Provider>
    );
  }
);
FAQ.displayName = "FAQ";

export const faqItemVariants = cva(
  [
    "overflow-hidden",
    "[border-width:var(--comixa-button-border-width,2px)] [border-color:var(--comixa-outline-border,#1E1E1E)] [border-radius:var(--comixa-button-radius,0.75rem)]",
    "[background:var(--comixa-outline-bg,#FFFFFF)] [color:var(--comixa-outline-text,#111111)] [box-shadow:var(--comixa-outline-shadow-value,2px_2px_0_0_var(--comixa-outline-shadow,#1E1E1E))]",
  ].join(" "),
  {
    variants: {
      open: {
        true:
          "[background:var(--comixa-default-bg,#FFF3D6)] [color:var(--comixa-default-text,#111111)] [border-color:var(--comixa-default-border,#1E1E1E)]",
        false: "",
      },
    },
    defaultVariants: {
      open: false,
    },
  }
);

export interface FAQItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  value: string;
  title: React.ReactNode;
  children: React.ReactNode;
}

export const FAQItem = React.forwardRef<HTMLDivElement, FAQItemProps>(
  ({ className, value, title, children, ...props }, ref) => {
    const { open, toggle } = useFAQContext();
    const reactId = React.useId();
    const panelId = `comixa-faq-panel-${reactId}`;
    const buttonId = `comixa-faq-button-${reactId}`;
    const isOpen = open.has(value);

    return (
      <div
        ref={ref}
        className={cn(faqItemVariants({ open: isOpen }), className)}
        data-state={isOpen ? "open" : "closed"}
        {...props}
      >
        <h3 className="m-0">
          <button
            type="button"
            id={buttonId}
            aria-expanded={isOpen}
            aria-controls={panelId}
            className={cn(
              "flex w-full items-center justify-between gap-3 px-4 py-3 text-left",
              "font-comic text-base uppercase tracking-wide [color:inherit]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-comic-blue focus-visible:ring-offset-2"
            )}
            onClick={() => toggle(value)}
          >
            <span>{title}</span>
            <span
              className={cn(
                "inline-flex h-7 w-7 shrink-0 items-center justify-center text-sm transition-transform",
                "[border-width:var(--comixa-button-border-width,2px)] [border-color:var(--comixa-warning-border,#1E1E1E)] [border-radius:var(--comixa-button-radius,0.375rem)] [background:var(--comixa-warning-bg,#FFD84D)] [color:var(--comixa-warning-text,#111111)] [box-shadow:var(--comixa-warning-shadow-value,2px_2px_0_0_var(--comixa-warning-shadow,#1E1E1E))]",
                isOpen &&
                  "rotate-45 [background:var(--comixa-danger-bg,#FF9B54)] [color:var(--comixa-danger-text,#FFFFFF)]"
              )}
              aria-hidden="true"
            >
              +
            </span>
          </button>
        </h3>
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          hidden={!isOpen}
          className={cn(
            "border-t-2 px-4 py-3 font-body text-sm [border-color:var(--comixa-outline-border,#1E1E1E)] [color:var(--pg-fg-muted,#5C5C5C)]",
            isOpen && "animate-comic-pop"
          )}
        >
          {isOpen ? children : null}
        </div>
      </div>
    );
  }
);
FAQItem.displayName = "FAQItem";
