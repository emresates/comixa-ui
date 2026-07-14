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
      panel: "rounded-xl border-2 border-ink bg-paper p-3 shadow-comic-sm",
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
  "overflow-hidden rounded-xl border-2 border-ink bg-paper shadow-comic-sm",
  {
    variants: {
      open: {
        true: "bg-paper-cream",
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
              "font-comic text-base uppercase tracking-wide text-ink",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-comic-blue focus-visible:ring-offset-2"
            )}
            onClick={() => toggle(value)}
          >
            <span>{title}</span>
            <span
              className={cn(
                "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border-2 border-ink bg-comic-yellow text-sm shadow-comic-sm transition-transform",
                isOpen && "rotate-45 bg-comic-orange"
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
            "border-t-2 border-ink px-4 py-3 font-body text-sm text-ink-muted",
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
