import * as React from "react";
import { createPortal } from "react-dom";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";
import { mergeComixaThemeStyle, type ThemeableProps } from "../themes";
import { useComixaTheme } from "../theme-provider";

const EXIT_MS = 220;

const DIALOG_STYLE_ID = "comixa-dialog-keyframes";

const DIALOG_CSS = `
@keyframes comixa-overlay-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes comixa-overlay-out {
  from { opacity: 1; }
  to { opacity: 0; }
}
@keyframes comixa-dialog-in {
  0% { opacity: 0; transform: scale(0.55) rotate(-6deg) translateY(18px); }
  55% { opacity: 1; transform: scale(1.08) rotate(2deg) translateY(-4px); }
  100% { opacity: 1; transform: scale(1) rotate(0deg) translateY(0); }
}
@keyframes comixa-dialog-out {
  0% { opacity: 1; transform: scale(1) rotate(0deg) translateY(0); }
  100% { opacity: 0; transform: scale(0.72) rotate(4deg) translateY(12px); }
}
[data-comixa-dialog-overlay][data-state="preopen"] {
  opacity: 0;
}
[data-comixa-dialog-overlay][data-state="open"] {
  animation: comixa-overlay-in 0.2s ease-out both;
}
[data-comixa-dialog-overlay][data-state="closed"] {
  animation: comixa-overlay-out 0.2s ease-in both;
}
[data-comixa-dialog-panel][data-state="preopen"] {
  opacity: 0;
  transform: scale(0.55) rotate(-6deg) translateY(18px);
}
[data-comixa-dialog-panel][data-state="open"] {
  animation: comixa-dialog-in 0.42s cubic-bezier(0.34, 1.45, 0.64, 1) both;
}
[data-comixa-dialog-panel][data-state="closed"] {
  animation: comixa-dialog-out 0.2s ease-in both;
}
[data-comixa-dialog-panel][data-effect="shake"][data-state="open"] {
  animation:
    comixa-dialog-in 0.42s cubic-bezier(0.34, 1.45, 0.64, 1) both;
}
`;

function ensureDialogStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(DIALOG_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = DIALOG_STYLE_ID;
  style.textContent = DIALOG_CSS;
  document.head.appendChild(style);
}

export const dialogContentVariants = cva(
  [
    "relative flex w-[min(100%,28rem)] flex-col",
    "[border-width:var(--comixa-button-border-width,2px)] [border-color:var(--comixa-outline-border,#1E1E1E)] [border-radius:var(--comixa-button-radius,0.75rem)]",
    "[color:var(--comixa-outline-text,#111111)] [font-family:var(--comixa-button-font,inherit)]",
    "origin-center focus:outline-none",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "[background:var(--comixa-outline-bg,#FFFFFF)] [color:var(--comixa-outline-text,#111111)] [box-shadow:var(--comixa-outline-shadow-value,6px_6px_0_0_var(--comixa-outline-shadow,#1E1E1E))]",
        cream:
          "[background:var(--comixa-default-bg,#FFF3D6)] [color:var(--comixa-default-text,#111111)] [border-color:var(--comixa-default-border,#1E1E1E)] [box-shadow:var(--comixa-default-shadow-value,6px_6px_0_0_var(--comixa-default-shadow,#1E1E1E))]",
        boom:
          "[background:var(--comixa-warning-bg,#FFD84D)] [color:var(--comixa-warning-text,#111111)] [border-color:var(--comixa-warning-border,#1E1E1E)] [box-shadow:var(--comixa-warning-shadow-value,6px_6px_0_0_var(--comixa-warning-shadow,#1E1E1E))]",
        alert:
          "[background:var(--comixa-danger-bg,#FF5757)] [color:var(--comixa-danger-text,#FFFFFF)] [border-color:var(--comixa-danger-border,#1E1E1E)] [box-shadow:var(--comixa-danger-shadow-value,6px_6px_0_0_var(--comixa-danger-shadow,#1E1E1E))]",
        success:
          "[background:var(--comixa-success-bg,#4ADE80)] [color:var(--comixa-success-text,#111111)] [border-color:var(--comixa-success-border,#1E1E1E)] [box-shadow:var(--comixa-success-shadow-value,6px_6px_0_0_var(--comixa-success-shadow,#1E1E1E))]",
        panel:
          "[background:var(--comixa-primary-bg,#4F9CF9)] [color:var(--comixa-primary-text,#FFFFFF)] [border-color:var(--comixa-primary-border,#1E1E1E)] [box-shadow:var(--comixa-primary-shadow-value,6px_6px_0_0_var(--comixa-primary-shadow,#1E1E1E))]",
      },
      size: {
        sm: "max-w-sm p-4",
        md: "max-w-md p-5",
        lg: "max-w-lg p-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  /** Close when clicking the dimmed backdrop. Default true. */
  closeOnOverlayClick?: boolean;
  /** Close on Escape. Default true. */
  closeOnEscape?: boolean;
}

type DialogContextValue = {
  open: boolean;
  state: "preopen" | "open" | "closed";
  onOpenChange: (open: boolean) => void;
};

const DialogContext = React.createContext<DialogContextValue | null>(null);

function useDialogContext() {
  const ctx = React.useContext(DialogContext);
  if (!ctx) {
    throw new Error("Dialog compound components must be used within <Dialog>");
  }
  return ctx;
}

export function Dialog({
  open,
  onOpenChange,
  children,
  closeOnOverlayClick = true,
  closeOnEscape = true,
}: DialogProps) {
  const [present, setPresent] = React.useState(open);
  const [entered, setEntered] = React.useState(false);

  React.useLayoutEffect(() => {
    ensureDialogStyles();
  }, []);

  React.useEffect(() => {
    if (open) {
      setPresent(true);
      setEntered(false);
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => setEntered(true));
      });
      return () => cancelAnimationFrame(frame);
    }

    setEntered(false);
    const timer = window.setTimeout(() => setPresent(false), EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [open]);

  React.useEffect(() => {
    if (!open || !closeOnEscape) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, closeOnEscape, onOpenChange]);

  React.useEffect(() => {
    if (!present) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [present]);

  if (!present || typeof document === "undefined") return null;

  const state: "preopen" | "open" | "closed" = !open
    ? "closed"
    : entered
      ? "open"
      : "preopen";

  return createPortal(
    <DialogContext.Provider value={{ open, state, onOpenChange }}>
      <div
        className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-[1px]"
        data-comixa-dialog-overlay=""
        data-state={state}
        onClick={() => {
          if (closeOnOverlayClick) onOpenChange(false);
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4"
        data-comixa-dialog-stage=""
      >
        {children}
      </div>
    </DialogContext.Provider>,
    document.body
  );
}

export interface DialogContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dialogContentVariants>,
    ThemeableProps {
  showClose?: boolean;
  effect?: "none" | "pop" | "shake";
}

export const DialogContent = React.forwardRef<
  HTMLDivElement,
  DialogContentProps
>(
  (
    {
      className,
      variant,
      size,
      effect = "pop",
      showClose = true,
      children,
      onClick,
      theme,
      style,
      ...props
    },
    ref
  ) => {
    const { state, onOpenChange } = useDialogContext();
    const providerTheme = useComixaTheme();
    const resolvedTheme = theme ?? providerTheme;

    return (
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        data-comixa-dialog-panel=""
        data-state={effect === "none" ? "open" : state}
        data-effect={effect}
        data-comixa-theme={resolvedTheme}
        className={cn(
          "pointer-events-auto",
          dialogContentVariants({ variant, size }),
          className
        )}
        style={mergeComixaThemeStyle(resolvedTheme, style)}
        onClick={(event) => {
          event.stopPropagation();
          onClick?.(event);
        }}
        {...props}
      >
        {showClose ? (
          <button
            type="button"
            aria-label="Close"
            className={cn(
              "absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center",
              "[border-width:var(--comixa-button-border-width,2px)] [border-color:var(--comixa-outline-border,#1E1E1E)] [background:var(--comixa-outline-bg,#FFFFFF)] [color:var(--comixa-outline-text,#111111)] [border-radius:var(--comixa-button-radius,0.5rem)]",
              "[box-shadow:var(--comixa-outline-shadow-value,2px_2px_0_0_var(--comixa-outline-shadow,#1E1E1E))] font-comic text-lg leading-none",
              "transition-[transform,box-shadow] duration-150",
              "hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            )}
            onClick={() => onOpenChange(false)}
          >
            ×
          </button>
        ) : null}
        {children}
      </div>
    );
  }
);
DialogContent.displayName = "DialogContent";

export const DialogHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mb-3 flex flex-col gap-1.5 pr-10", className)}
    {...props}
  />
));
DialogHeader.displayName = "DialogHeader";

export const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "font-comic text-2xl uppercase leading-none tracking-wide sm:text-3xl",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("font-body text-base opacity-90", className)}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";

export const DialogFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
      className
    )}
    {...props}
  />
));
DialogFooter.displayName = "DialogFooter";

export function DialogClose({
  className,
  children = "Close",
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { onOpenChange } = useDialogContext();

  return (
    <button
      type="button"
      className={className}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) onOpenChange(false);
      }}
    >
      {children}
    </button>
  );
}

/** @deprecated Overlay variants are handled via injected CSS. Kept for API stability. */
export const dialogOverlayVariants = cva("fixed inset-0 z-50 bg-ink/50");
