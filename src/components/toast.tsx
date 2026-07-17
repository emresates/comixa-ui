import * as React from "react";
import { createPortal } from "react-dom";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";
import { mergeComixaThemeStyle, type ThemeableProps } from "../themes";
import { useComixaTheme } from "../theme-provider";

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

export type ToastPosition =
  | "top-left"
  | "top-right"
  | "top-center"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center";

const POSITION_CLASS: Record<ToastPosition, string> = {
  "top-left": "left-4 top-4 items-start",
  "top-right": "right-4 top-4 items-end",
  "top-center": "left-1/2 top-4 -translate-x-1/2 items-center",
  "bottom-left": "bottom-4 left-4 items-start",
  "bottom-right": "bottom-4 right-4 items-end",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
};

export const toastVariants = cva(
  [
    "pointer-events-auto relative isolate flex w-[min(100%,22rem)] gap-3 overflow-hidden p-3",
    "[border-width:var(--comixa-button-border-width,2px)] [border-color:var(--comixa-toast-border)] [border-radius:var(--comixa-button-radius,0.75rem)]",
    "[background:var(--comixa-toast-bg)] [box-shadow:var(--comixa-toast-shadow-value)]",
    "font-body [color:var(--comixa-toast-text)]",
    "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:content-[''] before:[background-image:var(--comixa-toast-pattern)] before:[background-size:var(--comixa-toast-pattern-size)] before:opacity-[var(--comixa-toast-pattern-opacity)]",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "[--comixa-toast-bg:var(--comixa-outline-bg,#FFFFFF)] [--comixa-toast-text:var(--comixa-outline-text,#111111)] [--comixa-toast-border:var(--comixa-outline-border,#1E1E1E)] [--comixa-toast-shadow-value:var(--comixa-outline-shadow-value,4px_4px_0_0_var(--comixa-outline-shadow,#1E1E1E))] [--comixa-toast-pattern:var(--comixa-outline-pattern,none)] [--comixa-toast-pattern-size:var(--comixa-outline-pattern-size,auto)] [--comixa-toast-pattern-opacity:var(--comixa-outline-pattern-opacity,0)]",
        pop:
          "[--comixa-toast-bg:var(--comixa-warning-bg,#FFD84D)] [--comixa-toast-text:var(--comixa-warning-text,#111111)] [--comixa-toast-border:var(--comixa-warning-border,#1E1E1E)] [--comixa-toast-shadow-value:var(--comixa-warning-shadow-value,4px_4px_0_0_var(--comixa-warning-shadow,#1E1E1E))] [--comixa-toast-pattern:var(--comixa-warning-pattern,none)] [--comixa-toast-pattern-size:var(--comixa-warning-pattern-size,auto)] [--comixa-toast-pattern-opacity:var(--comixa-warning-pattern-opacity,0)]",
        success:
          "[--comixa-toast-bg:var(--comixa-success-bg,#4ADE80)] [--comixa-toast-text:var(--comixa-success-text,#111111)] [--comixa-toast-border:var(--comixa-success-border,#1E1E1E)] [--comixa-toast-shadow-value:var(--comixa-success-shadow-value,4px_4px_0_0_var(--comixa-success-shadow,#1E1E1E))] [--comixa-toast-pattern:var(--comixa-success-pattern,none)] [--comixa-toast-pattern-size:var(--comixa-success-pattern-size,auto)] [--comixa-toast-pattern-opacity:var(--comixa-success-pattern-opacity,0)]",
        danger:
          "[--comixa-toast-bg:var(--comixa-danger-bg,#FF5757)] [--comixa-toast-text:var(--comixa-danger-text,#FFFFFF)] [--comixa-toast-border:var(--comixa-danger-border,#1E1E1E)] [--comixa-toast-shadow-value:var(--comixa-danger-shadow-value,4px_4px_0_0_var(--comixa-danger-shadow,#1E1E1E))] [--comixa-toast-pattern:var(--comixa-danger-pattern,none)] [--comixa-toast-pattern-size:var(--comixa-danger-pattern-size,auto)] [--comixa-toast-pattern-opacity:var(--comixa-danger-pattern-opacity,0)]",
        info:
          "[--comixa-toast-bg:var(--comixa-primary-bg,#4F9CF9)] [--comixa-toast-text:var(--comixa-primary-text,#FFFFFF)] [--comixa-toast-border:var(--comixa-primary-border,#1E1E1E)] [--comixa-toast-shadow-value:var(--comixa-primary-shadow-value,4px_4px_0_0_var(--comixa-primary-shadow,#1E1E1E))] [--comixa-toast-pattern:var(--comixa-primary-pattern,none)] [--comixa-toast-pattern-size:var(--comixa-primary-pattern-size,auto)] [--comixa-toast-pattern-opacity:var(--comixa-primary-pattern-opacity,0)]",
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
  /** Overrides `<ToastProvider position>` for this toast only. */
  position?: ToastPosition;
  /**
   * Auto-dismiss in ms.
   * Use `0` or `Infinity` to keep open until closed manually.
   */
  duration?: number;
  /** Show the × close button. Default `true`. */
  closable?: boolean;
  className?: string;
  classNames?: ToastClassNames;
};

type ToastRecord = Required<Pick<ToastInput, "id">> &
  Omit<ToastInput, "id"> & {
    open: boolean;
  };

type ToastContextValue = {
  toasts: ToastRecord[];
  defaultPosition: ToastPosition;
  defaultDuration: number;
  defaultClosable: boolean;
  push: (toast: ToastInput) => string;
  dismiss: (id: string) => void;
  clear: () => void;
};

const ToastContext = React.createContext<ToastContextValue | null>(null);

type Listener = (toasts: ToastRecord[]) => void;

type ToastStore = {
  toasts: ToastRecord[];
  defaultPosition: ToastPosition;
  defaultDuration: number;
  defaultClosable: boolean;
  listeners: Set<Listener>;
};

const TOAST_STORE_KEY = "__COMIXA_TOAST_STORE__";

function getToastStore() {
  const root = globalThis as typeof globalThis & {
    [TOAST_STORE_KEY]?: ToastStore;
  };

  root[TOAST_STORE_KEY] ??= {
    toasts: [],
    defaultPosition: "bottom-right",
    defaultDuration: 3500,
    defaultClosable: true,
    listeners: new Set<Listener>(),
  };

  return root[TOAST_STORE_KEY];
}

const toastStore = getToastStore();
const EXIT_MS = 200;

function emit() {
  for (const listener of toastStore.listeners) listener(toastStore.toasts);
}

function dismissToast(id: string) {
  toastStore.toasts = toastStore.toasts.map((item) =>
    item.id === id ? { ...item, open: false } : item
  );
  emit();
  window.setTimeout(() => {
    toastStore.toasts = toastStore.toasts.filter((item) => item.id !== id);
    emit();
  }, EXIT_MS);
}

function pushToast(input: ToastInput) {
  ensureToastStyles();
  const id = input.id ?? `toast-${Math.random().toString(36).slice(2, 9)}`;
  const duration =
    input.duration === undefined ? toastStore.defaultDuration : input.duration;
  const closable =
    input.closable === undefined ? toastStore.defaultClosable : input.closable;
  const next: ToastRecord = {
    id,
    title: input.title,
    description: input.description,
    variant: input.variant ?? "pop",
    position: input.position ?? toastStore.defaultPosition,
    duration,
    closable,
    className: input.className,
    classNames: input.classNames,
    open: true,
  };
  toastStore.toasts = [...toastStore.toasts, next];
  emit();

  if (Number.isFinite(duration) && duration > 0) {
    window.setTimeout(() => dismissToast(id), duration);
  }

  return id;
}

function clearToasts() {
  toastStore.toasts = toastStore.toasts.map((item) => ({ ...item, open: false }));
  emit();
  window.setTimeout(() => {
    toastStore.toasts = [];
    emit();
  }, EXIT_MS);
}

type ToastHelperOptions = Omit<ToastInput, "title" | "description" | "variant">;

/** Imperative toast API — works when `<ToastProvider />` is mounted. */
export const toast = Object.assign(
  (input: ToastInput | string) =>
    pushToast(typeof input === "string" ? { title: input } : input),
  {
    success: (
      title: React.ReactNode,
      description?: React.ReactNode,
      options?: ToastHelperOptions
    ) => pushToast({ title, description, variant: "success", ...options }),
    danger: (
      title: React.ReactNode,
      description?: React.ReactNode,
      options?: ToastHelperOptions
    ) => pushToast({ title, description, variant: "danger", ...options }),
    info: (
      title: React.ReactNode,
      description?: React.ReactNode,
      options?: ToastHelperOptions
    ) => pushToast({ title, description, variant: "info", ...options }),
    pop: (
      title: React.ReactNode,
      description?: React.ReactNode,
      options?: ToastHelperOptions
    ) => pushToast({ title, description, variant: "pop", ...options }),
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
  viewportClassName,
  position = "bottom-right",
  duration = 3500,
  closable = true,
  theme,
}: {
  children?: React.ReactNode;
  /** Applied to every viewport container. */
  className?: string;
  /** Alias of `className` for clarity when customizing placement wrappers. */
  viewportClassName?: string;
  /** Default position for toasts that don't pass their own `position`. */
  position?: ToastPosition;
  /** Default auto-dismiss ms. `0` / `Infinity` = stay until closed. */
  duration?: number;
  /** Default close-button visibility. */
  closable?: boolean;
} & ThemeableProps) {
  const [toasts, setToasts] = React.useState<ToastRecord[]>(() => [
    ...toastStore.toasts,
  ]);

  React.useLayoutEffect(() => {
    ensureToastStyles();
    toastStore.defaultPosition = position;
    toastStore.defaultDuration = duration;
    toastStore.defaultClosable = closable;
  }, [position, duration, closable]);

  React.useEffect(() => {
    const listener: Listener = (next) => setToasts([...next]);
    toastStore.listeners.add(listener);
    setToasts([...toastStore.toasts]);
    return () => {
      toastStore.listeners.delete(listener);
    };
  }, []);

  const value = React.useMemo<ToastContextValue>(
    () => ({
      toasts,
      defaultPosition: position,
      defaultDuration: duration,
      defaultClosable: closable,
      push: pushToast,
      dismiss: dismissToast,
      clear: clearToasts,
    }),
    [toasts, position, duration, closable]
  );

  const grouped = React.useMemo(() => {
    const map = new Map<ToastPosition, ToastRecord[]>();
    for (const item of toasts) {
      const key = item.position ?? position;
      const list = map.get(key) ?? [];
      list.push(item);
      map.set(key, list);
    }
    return map;
  }, [toasts, position]);
  const providerTheme = useComixaTheme();
  const resolvedTheme = theme ?? providerTheme;

  return (
    <ToastContext.Provider value={value}>
      {children}
      {typeof document !== "undefined"
        ? createPortal(
            <>
              {[...grouped.entries()].map(([pos, items]) => (
                <div
                  key={pos}
                  className={cn(
                    "pointer-events-none fixed z-[100] flex max-h-screen w-full max-w-[calc(100%-2rem)] flex-col gap-2",
                    POSITION_CLASS[pos],
                    className,
                    viewportClassName
                  )}
                  data-comixa-toast-viewport=""
                  data-position={pos}
                  data-comixa-theme={resolvedTheme}
                  style={mergeComixaThemeStyle(resolvedTheme, undefined)}
                >
                  {items.map((item) => (
                    <ToastView
                      key={item.id}
                      toast={item}
                      onDismiss={dismissToast}
                    />
                  ))}
                </div>
              ))}
            </>,
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
  const showClose = item.closable !== false;

  return (
    <div
      data-comixa-toast=""
      data-state={item.open ? "open" : "closed"}
      data-position={item.position}
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
      {showClose ? (
        <button
          type="button"
          aria-label="Dismiss"
          className={cn(
            "inline-flex h-7 w-7 shrink-0 items-center justify-center font-comic text-sm",
            "[border-width:var(--comixa-button-border-width,2px)] [border-color:var(--comixa-outline-border,#1E1E1E)] [background:var(--comixa-outline-bg,#FFFFFF)] [color:var(--comixa-outline-text,#111111)] [border-radius:var(--comixa-button-radius,0.5rem)]",
            "[box-shadow:var(--comixa-outline-shadow-value,2px_2px_0_0_var(--comixa-outline-shadow,#1E1E1E))]",
            "transition-[transform,box-shadow] duration-150",
            "hover:-translate-y-0.5 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none",
            item.classNames?.close
          )}
          onClick={() => onDismiss(item.id)}
        >
          ×
        </button>
      ) : null}
    </div>
  );
}
