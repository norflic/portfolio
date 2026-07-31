import { useEffect, useState, type RefObject } from "react";
import {
  computeCarouselLayout,
  type CarouselLayout,
} from "../utils/carouselLayout";

const EMPTY_LAYOUT: CarouselLayout = { visibleCount: 0, slideWidthPx: 0 };

export function useCarouselLayout(
  viewportRef: RefObject<HTMLElement | null>,
  itemCount: number,
): CarouselLayout {
  const [layout, setLayout] = useState<CarouselLayout>(EMPTY_LAYOUT);

  useEffect(() => {
    const node = viewportRef.current;
    if (!node) return;

    const update = () => {
      const width = node.getBoundingClientRect().width;
      setLayout(computeCarouselLayout(width, itemCount));
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(node);

    return () => observer.disconnect();
  }, [viewportRef, itemCount]);

  return layout;
}
