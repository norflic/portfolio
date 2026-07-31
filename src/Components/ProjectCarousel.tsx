import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import clsx from "clsx";
import { useCarouselLayout } from "../hooks/useCarouselLayout";
import { MIN_GAP_PX } from "../utils/carouselLayout";

export type ProjectCarouselProps<T> = {
  items: T[];
  renderSlide: (item: T, index: number) => ReactNode;
  carouselKey: string;
};

function CarouselArrow({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Projet précédent" : "Projet suivant"}
      onClick={onClick}
      disabled={disabled}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#74C69D] bg-[#142C52] text-[#74C69D] transition-opacity disabled:cursor-not-allowed disabled:opacity-40 hover:enabled:bg-[#1B3A66]"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        className="h-5 w-5"
        aria-hidden
      >
        {direction === "prev" ? (
          <path d="M15 6l-6 6 6 6" />
        ) : (
          <path d="M9 6l6 6-6 6" />
        )}
      </svg>
    </button>
  );
}

export default function ProjectCarousel<T>({
  items,
  renderSlide,
  carouselKey,
}: ProjectCarouselProps<T>) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const { visibleCount, slideWidthPx } = useCarouselLayout(viewportRef, items.length);

  const isCarouselActive = items.length > visibleCount && visibleCount > 0;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: 1,
    dragFree: false,
    loop: false,
    containScroll: "trimSnaps",
    watchDrag: isCarouselActive,
    align: "start",
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    emblaApi?.reInit();
  }, [emblaApi, slideWidthPx, visibleCount, items.length]);

  useEffect(() => {
    emblaApi?.scrollTo(0, true);
  }, [emblaApi, carouselKey]);

  if (items.length === 0) {
    return null;
  }

  const setViewportRef = (node: HTMLDivElement | null) => {
    viewportRef.current = node;
    emblaRef(node);
  };

  return (
    <div className="mx-10 flex items-center gap-4">
      {isCarouselActive && (
        <CarouselArrow
          direction="prev"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canScrollPrev}
        />
      )}

      <div
        className="min-w-0 flex-1 overflow-hidden"
        ref={setViewportRef}
        style={{ "--slide-width": `${slideWidthPx}px` } as CSSProperties}
      >
        <div
          className={clsx("flex", !isCarouselActive && "justify-center")}
          style={{ gap: MIN_GAP_PX, touchAction: "pan-y pinch-zoom" }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="min-w-0 shrink-0 grow-0"
              style={{ flex: "0 0 var(--slide-width)" }}
            >
              {renderSlide(item, index)}
            </div>
          ))}
        </div>
      </div>

      {isCarouselActive && (
        <CarouselArrow
          direction="next"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canScrollNext}
        />
      )}
    </div>
  );
}
