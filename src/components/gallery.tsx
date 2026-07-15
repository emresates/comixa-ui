import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export type GalleryItem = {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  badge?: string;
};

export const galleryVariants = cva("grid gap-4 text-ink", {
  variants: {
    variant: {
      grid: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      strip: "grid-flow-col auto-cols-[minmax(14rem,1fr)] overflow-x-auto pb-2",
      featured: "grid-cols-1 md:grid-cols-4",
    },
    framed: {
      true: "",
      false: "",
    },
  },
  defaultVariants: {
    variant: "grid",
    framed: true,
  },
});

export interface GalleryProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof galleryVariants> {
  items: GalleryItem[];
}

function assignRef<T>(ref: React.ForwardedRef<T>, node: T | null) {
  if (typeof ref === "function") ref(node);
  else if (ref) ref.current = node;
}

export const Gallery = React.forwardRef<HTMLDivElement, GalleryProps>(
  (
    {
      className,
      variant = "grid",
      framed = true,
      items,
      onWheel,
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
      onPointerLeave,
      ...props
    },
    ref
  ) => {
    const localRef = React.useRef<HTMLDivElement | null>(null);
    const dragRef = React.useRef({
      active: false,
      pointerId: -1,
      startX: 0,
      scrollLeft: 0,
      moved: false,
    });

    const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
      onWheel?.(event);
      if (event.defaultPrevented || variant !== "strip") return;

      const el = event.currentTarget;
      const canScrollHorizontally = el.scrollWidth > el.clientWidth;
      if (!canScrollHorizontally) return;

      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;
      if (delta === 0) return;

      event.preventDefault();
      el.scrollLeft += delta;
    };

    const handlePointerDown = (
      event: React.PointerEvent<HTMLDivElement>
    ) => {
      onPointerDown?.(event);
      if (event.defaultPrevented || variant !== "strip") return;
      if (event.button !== 0 || event.pointerType === "touch") return;

      const el = event.currentTarget;
      if (el.scrollWidth <= el.clientWidth) return;

      dragRef.current = {
        active: true,
        pointerId: event.pointerId,
        startX: event.clientX,
        scrollLeft: el.scrollLeft,
        moved: false,
      };
      el.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (
      event: React.PointerEvent<HTMLDivElement>
    ) => {
      onPointerMove?.(event);
      if (variant !== "strip") return;

      const drag = dragRef.current;
      if (!drag.active || drag.pointerId !== event.pointerId) return;

      const dx = event.clientX - drag.startX;
      if (Math.abs(dx) > 3) drag.moved = true;
      event.preventDefault();
      event.currentTarget.scrollLeft = drag.scrollLeft - dx;
    };

    const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      if (!drag.active || drag.pointerId !== event.pointerId) return;

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      dragRef.current = {
        active: false,
        pointerId: -1,
        startX: 0,
        scrollLeft: 0,
        moved: false,
      };
    };

    const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
      onPointerUp?.(event);
      endDrag(event);
    };

    const handlePointerCancel = (
      event: React.PointerEvent<HTMLDivElement>
    ) => {
      onPointerCancel?.(event);
      endDrag(event);
    };

    const handlePointerLeave = (
      event: React.PointerEvent<HTMLDivElement>
    ) => {
      onPointerLeave?.(event);
      if (variant !== "strip") return;
      if (dragRef.current.active) return;
      endDrag(event);
    };

    return (
      <div
        ref={(node) => {
          localRef.current = node;
          assignRef(ref, node);
        }}
        className={cn(
          galleryVariants({ variant, framed }),
          variant === "strip" &&
            "cursor-grab select-none overscroll-x-contain scroll-smooth active:cursor-grabbing [scrollbar-gutter:stable]",
          className
        )}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onPointerLeave={handlePointerLeave}
        {...props}
      >
        {items.map((item, index) => {
          const isFeatured = variant === "featured" && index === 0;
          return (
            <figure
              key={`${item.src}-${index}`}
              className={cn(
                "group relative min-w-0 overflow-hidden border-2 border-ink bg-paper shadow-comic transition-transform duration-150 hover:-translate-y-1",
                framed ? "rounded-lg" : "rounded-none",
                isFeatured ? "md:col-span-2 md:row-span-2" : ""
              )}
            >
              <img
                src={item.src}
                alt={item.alt}
                className={cn(
                  "h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105",
                  isFeatured ? "md:h-full md:min-h-[25rem]" : ""
                )}
              />
              {item.badge ? (
                <span className="absolute left-3 top-3 -rotate-2 border-2 border-ink bg-comic-yellow px-2 py-1 font-comic text-xs uppercase tracking-wide shadow-comic-sm">
                  {item.badge}
                </span>
              ) : null}
              {(item.title || item.description) ? (
                <figcaption className="border-t-2 border-ink bg-paper/95 p-3">
                  {item.title ? (
                    <h3 className="font-comic text-xl uppercase leading-none tracking-wide">
                      {item.title}
                    </h3>
                  ) : null}
                  {item.description ? (
                    <p className="mt-1 font-body text-sm text-ink-muted">
                      {item.description}
                    </p>
                  ) : null}
                </figcaption>
              ) : null}
            </figure>
          );
        })}
      </div>
    );
  }
);
Gallery.displayName = "Gallery";
