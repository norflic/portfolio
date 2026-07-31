export const MIN_GAP_PX = 40;
export const MIN_CARD_WIDTH_PX = 280;
export const MAX_VISIBLE = 3;

export type CarouselLayout = {
  visibleCount: number;
  slideWidthPx: number;
};

export function computeCarouselLayout(
  availableWidthPx: number,
  itemCount: number,
): CarouselLayout {
  if (availableWidthPx <= 0 || itemCount <= 0) {
    return { visibleCount: 0, slideWidthPx: 0 };
  }

  const maxCandidates = Math.min(MAX_VISIBLE, itemCount);

  for (let n = maxCandidates; n >= 1; n -= 1) {
    const totalGaps = (n - 1) * MIN_GAP_PX;
    const slideWidthPx = (availableWidthPx - totalGaps) / n;
    if (slideWidthPx >= MIN_CARD_WIDTH_PX) {
      return { visibleCount: n, slideWidthPx };
    }
  }

  return { visibleCount: 1, slideWidthPx: availableWidthPx };
}
