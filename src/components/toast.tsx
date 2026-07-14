import * as React from "react";
import { createPortal } from "react-dom";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const TOAST_STYLE_ID = "comixa-toast-keyframes";
const TOAST_CSS = `
@keyframes comixa-toast-in {
  0% { opacity: 0; transform: translateY(12px) scale(0.92) rotate(-2deg); }
  60% { opacity: 1; transform: translateY(-2px) scale(1.04) rotate(1deg); }
  100% { opacity: 1; transform: translateY(0) scale(1) rotate(0deg); }
}
@keyframes comixa-toast-out {
  0% { opacity: 1; transform: translateY(0) scale(1); }
  100% { opacity: 0; transform: translateY(8px) scale(0.9); }
}
[data-comixa-toast][data-state="open"] {
  animation: comixa-toast-in 0.35s cubic-bezier(0.34, 1.45, 0.64, 1) both;
}
[data-comixa-toast][data-state="closed"] {
  animation: comixa-toast-out 0.2s ease-in both;
}
`;

function ensureToastStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(TOAST_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = TOAST_STYLE_ID;
  style.textContent = TOAST_CSS;
  document.head.appendChild(style);
}

export const toastVariants = cva(
  [
    "pointer-events-auto relative flex w-[min(100%,22rem)] gap-3 border-2 border-ink p-3 shadow-comic",
    "font-body text-ink",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-paper rounded-xl",
        pop: "bg-comic-yellow rounded-xl",
        success: "bg-comic-green rounded-xl",
        danger: "bg-comic-red text-white rounded-xl",
        info: "bg-comic-blue text-white rounded-xl",
      },
    },
    defaultVariants: {
      variant: "pop",
    },
  }
);

export type ToastVariant = NonNullable<
  VariantProps<typeof toastVariants>["variant"]
>;

export type ToastClassNames = {
  root?: string;
  title?: string;
  description?: string;
  close?: string;
};

export type ToastInput = {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: ToastVariant;
  duration?: number;
  className?: string;
  classNames?: ToastClassNames;
};

type ToastRecord = Required<Pick<ToastInput, "id">> &
  Omit<ToastInput, "id"> & {
    open: boolean;
  };

type ToastContextValue = {
  toasts: ToastRecord[];
  push: (toast: ToastInput) => string;
  dismiss: (id: string) => void;
  clear: () => void;
};

const ToastContext = React.createContext<ToastContextValue | null>(null);

type Listener = (toasts: ToastRecord[]) => void;

let memoryToasts: ToastRecord[] = [];
const memoryListeners = new Set<Listener>();
const DEFAULT_DURATION = 3500;
const EXIT_MS = 200;

function emit() {
  for (const listener of memoryListeners) listener(memoryToasts);
}

function dismissToast(id: string) {
  memoryToasts = memoryToasts.map((toast) =>
    toast.id === id ? { ...toast, open: false } : toast
  );
  emit();
  window.setTimeout(() => {
    memoryToasts = memoryToasts.filter((toast) => toast.id !== id);
    emit();
  }, EXIT_MS);
}

function pushToast(input: ToastInput) {
  ensureToastStyles();
  const id = input.id ?? `toast-${Math.random().toString(36).slice(2, 9)}`;
  const next: ToastRecord = {
    id,
    title: input.title,
    description: input.description,
    variant: input.variant ?? "pop",
    duration: input.duration ?? DEFAULT_DURATION,
    className: input.className,
    classNames: input.classNames,
    open: true,
  };
  memoryToasts = [...memoryToasts, next];
  emit();

  if (next.duration && next.duration > 0) {
    window.setTimeout(() => dismissToast(id), next.duration);
  }

  return id;
}

function clearToasts() {
  memoryToasts = memoryToasts.map((toast) => ({ ...toast, open: false }));
  emit();
  window.setTimeout(() => {
    memoryToasts = [];
    emit();
  }, EXIT_MS);
}

/** Imperative toast API — works when `<ToastProvider />` is mounted. */
export const toast = Object.assign(
  (input: ToastInput | string) =>
    pushToast(typeof input === "string" ? { title: input } : input),
  {
    success: (title: React.ReactNode, description?: React.ReactNode) =>
      pushToast({ title, description, variant: "success" }),
    danger: (title: React.ReactNode, description?: React.ReactNode) =>
      pushToast({ title, description, variant: "danger" }),
    info: (title: React.ReactNode, description?: React.ReactNode) =>
      pushToast({ title, description, variant: "info" }),
    pop: (title: React.ReactNode, description?: React.ReactNode) =>
      pushToast({ title, description, variant: "pop" }),
    dismiss: dismissToast,
    clear: clearToasts,
  }
);

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within <ToastProvider>");
  }
  return ctx;
}

export function ToastProvider({
  children,
  className,
  position = "bottom-right",
}: {
  children?: React.ReactNode;
  className?: string;
  position?:
    | "top-left"
    | "top-right"
    | "top-center"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center";
}) {
  const [toasts, setToasts] = React.useState<ToastRecord[]>(memoryToasts);

  React.useLayoutEffect(() => {
    ensureToastStyles();
  }, []);

  React.useEffect(() => {
    const listener: Listener = (next) => setToasts([...next]);
    memoryListeners.add(listener);
    setToasts([...memoryToasts]);
    return () => {
      memoryListeners.delete(listener);
    };
  }, []);

  const value = React.useMemo<ToastContextValue>(
    () => ({
      toasts,
      push: pushToast,
      dismiss: dismissToast,
      clear: clearToasts,
    }),
    [toasts]
  );

  const positionClass = {
    "top-left": "left-4 top-4 items-start",
    "top-right": "right-4 top-4 items-end",
    "top-center": "left-1/2 top-4 -translate-x-1/2 items-center",
    "bottom-left": "bottom-4 left-4 items-start",
    "bottom-right": "bottom-4 right-4 items-end",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
  }[position];

  return (
    <ToastContext.Provider value={value}>
      {children}
      {typeof document !== "undefined"
        ? createPortal(
            <div
              className={cn(
                "pointer-events-none fixed z-[100] flex max-h-screen w-full max-w-[calc(100%-2rem)] flex-col gap-2",
                positionClass,
                className
              )}
              data-comixa-toast-viewport=""
            >
              {toasts.map((item) => (
                <ToastView key={item.id} toast={item} onDismiss={dismissToast} />
              ))}
            </div>,
            document.body
          )
        : null}
    </ToastContext.Provider>
  );
}

function ToastView({
  toast: item,
  onDismiss,
}: {
  toast: ToastRecord;
  onDismiss: (id: string) => void;
}) {
  return (
    <div
      data-comixa-toast=""
      data-state={item.open ? "open" : "closed"}
      role="status"
      className={cn(
        toastVariants({ variant: item.variant }),
        item.className,
        item.classNames?.root
      )}
    >
      <div className="min-w-0 flex-1">
        {item.title ? (
          <p
            className={cn(
              "font-comic text-base uppercase tracking-wide",
              item.classNames?.title
            )}
          >
            {item.title}
          </p>
        ) : null}
        {item.description ? (
          <p
            className={cn(
              "mt-0.5 text-sm opacity-90",
              item.classNames?.description
            )}
          >
            {item.description}
          </p>
        ) : null}
      </div>
      <button
        type="button"
        aria-label="Dismiss"
        className={cn(
          "inline-flex h-7 w-7 shrink-0 items-center justify-center border-2 border-ink bg-paper font-comic text-sm text-ink shadow-comic-sm",
          "transition-[transform,box-shadow] duration-150",
          "hover:-translate-y-0.5 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none",
          item.classNames?.close
        )}
        onClick={() => onDismiss(item.id)}
      >
        ×
      </button>
    </div>
  );
}
