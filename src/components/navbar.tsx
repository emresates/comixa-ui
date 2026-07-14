import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const navbarVariants = cva(
  [
    "relative z-40 flex w-full flex-wrap items-center gap-3 border-b-2 border-ink",
    "px-4 py-3 font-body text-ink",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-paper shadow-comic-sm",
        cream: "bg-paper-cream shadow-comic-sm",
        pop: "bg-comic-yellow shadow-comic",
        panel: "bg-comic-blue text-white shadow-comic",
        ink: "bg-ink text-paper shadow-comic",
        transparent: "border-transparent bg-transparent shadow-none",
      },
      position: {
        static: "static",
        sticky: "sticky top-0",
        fixed: "fixed inset-x-0 top-0",
      },
    },
    defaultVariants: {
      variant: "default",
      position: "static",
    },
  }
);

type NavbarMobileContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const NavbarMobileContext =
  React.createContext<NavbarMobileContextValue | null>(null);

function useNavbarMobile() {
  const ctx = React.useContext(NavbarMobileContext);
  if (!ctx) {
    throw new Error("Navbar mobile parts must be used within <Navbar>");
  }
  return ctx;
}

export interface NavbarProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof navbarVariants> {}

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className, variant, position, children, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);

    return (
      <NavbarMobileContext.Provider value={{ open, setOpen }}>
        <header
          ref={ref}
          className={cn(navbarVariants({ variant, position }), className)}
          {...props}
        >
          {children}
        </header>
      </NavbarMobileContext.Provider>
    );
  }
);
Navbar.displayName = "Navbar";

export const NavbarBrand = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      "inline-flex shrink-0 items-center gap-2 font-comic text-2xl uppercase tracking-wide",
      className
    )}
    {...props}
  />
));
NavbarBrand.displayName = "NavbarBrand";

export const NavbarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex min-w-0 flex-1 items-center gap-3", className)}
    {...props}
  />
));
NavbarContent.displayName = "NavbarContent";

export const NavbarMenu = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    className={cn("hidden items-center gap-1 md:flex", className)}
    {...props}
  />
));
NavbarMenu.displayName = "NavbarMenu";

export const navbarLinkVariants = cva(
  [
    "inline-flex items-center rounded-lg px-3 py-1.5 font-comic text-sm uppercase tracking-wide",
    "transition-[transform,background-color,box-shadow] duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-comic-blue focus-visible:ring-offset-2",
  ].join(" "),
  {
    variants: {
      active: {
        true: "bg-ink text-paper shadow-comic-sm",
        false: "hover:bg-black/5 hover:-translate-y-0.5",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

export interface NavbarLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof navbarLinkVariants> {}

export const NavbarLink = React.forwardRef<HTMLAnchorElement, NavbarLinkProps>(
  ({ className, active, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(navbarLinkVariants({ active }), className)}
      aria-current={active ? "page" : undefined}
      {...props}
    />
  )
);
NavbarLink.displayName = "NavbarLink";

export const NavbarActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("ml-auto flex shrink-0 items-center gap-2", className)}
    {...props}
  />
));
NavbarActions.displayName = "NavbarActions";

export const NavbarItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("inline-flex items-center", className)}
    {...props}
  />
));
NavbarItem.displayName = "NavbarItem";

export interface NavbarToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const NavbarToggle = React.forwardRef<
  HTMLButtonElement,
  NavbarToggleProps
>(({ className, onClick, ...props }, ref) => {
  const { open, setOpen } = useNavbarMobile();

  return (
    <button
      ref={ref}
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center border-2 border-ink bg-paper font-comic text-lg text-ink shadow-comic-sm md:hidden",
        "transition-[transform,box-shadow] duration-150",
        "hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
        className
      )}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) setOpen(!open);
      }}
      {...props}
    >
      {open ? "×" : "☰"}
    </button>
  );
});
NavbarToggle.displayName = "NavbarToggle";

export const NavbarMobileMenu = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { open } = useNavbarMobile();
  if (!open) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-x-0 top-full z-40 w-full border-b-2 border-ink bg-paper p-3 text-ink shadow-comic md:hidden",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
});
NavbarMobileMenu.displayName = "NavbarMobileMenu";
