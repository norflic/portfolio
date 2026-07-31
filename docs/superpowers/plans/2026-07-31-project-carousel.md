# Project Carousel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remplacer la liste statique de projets par un carrousel Embla navigable (flèches + drag souris), affichant 1 à 3 projets visibles avec gap minimum et cards à largeur fixe.

**Architecture:** Un hook `useCarouselLayout` mesure le viewport et calcule `visibleCount` / `slideWidthPx`. Le composant `ProjectCarousel` encapsule Embla (drag, snap, limites). `Projets` délègue le rendu slide (card + cœurs) sans modifier `App.tsx`.

**Tech Stack:** React 19, Vite 6, Tailwind CSS 4, `embla-carousel-react`

## Global Constraints

- `MIN_GAP_PX = 40`, `MIN_CARD_WIDTH_PX = 280`, `MAX_VISIBLE = 3`
- Embla config : `{ slidesToScroll: 1, dragFree: false, loop: false, containScroll: 'trimSnaps' }`
- Flèches masquées si `items.length <= visibleCount` ; drag désactivé dans ce cas
- Pas de modification de `App.tsx`, `Stats`, ni du modèle `Project`
- Souris uniquement v1 ; pas d'autoplay
- Reset au changement de catégorie via clé dérivée des titres (`items.map(p => p.title).join('|')`)

## File Structure

| File | Responsibility |
|------|----------------|
| `src/utils/carouselLayout.ts` | Pure function `computeCarouselLayout` + constantes exportées |
| `src/hooks/useCarouselLayout.ts` | `ResizeObserver` sur viewport → layout |
| `src/Components/ProjectCarousel.tsx` | Embla, flèches, styles inline, reset catégorie |
| `src/Components/Projets.tsx` | Passe items + `renderSlide` au carrousel |
| `src/Components/ProjectCard.tsx` | Retrait `flex-1`, largeur 100 % du slide |
| `package.json` | Ajout `embla-carousel-react` |

---

### Task 1: Installer Embla Carousel

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**
- Produces: dépendance `embla-carousel-react` installée

- [ ] **Step 1: Installer la dépendance**

```bash
cd /home/nils/portfolio && npm install embla-carousel-react
```

- [ ] **Step 2: Vérifier l'installation**

Run: `npm ls embla-carousel-react`
Expected: affiche une version (ex. `embla-carousel-react@8.x.x`)

- [ ] **Step 3: Commit (si demandé par l'utilisateur)**

```bash
git add package.json package-lock.json
git commit -m "chore: add embla-carousel-react for project carousel"
```

---

### Task 2: Logique de layout responsive

**Files:**
- Create: `src/utils/carouselLayout.ts`
- Create: `src/hooks/useCarouselLayout.ts`

**Interfaces:**
- Produces:
  - `export const MIN_GAP_PX = 40`
  - `export const MIN_CARD_WIDTH_PX = 280`
  - `export const MAX_VISIBLE = 3`
  - `export type CarouselLayout = { visibleCount: number; slideWidthPx: number }`
  - `export function computeCarouselLayout(availableWidthPx: number, itemCount: number): CarouselLayout`
  - `export function useCarouselLayout(viewportRef: RefObject<HTMLElement | null>, itemCount: number): CarouselLayout`

- [ ] **Step 1: Créer `src/utils/carouselLayout.ts`**

```typescript
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
```

- [ ] **Step 2: Vérifier la fonction pure**

Run:
```bash
cd /home/nils/portfolio && npx tsx -e "
import { computeCarouselLayout } from './src/utils/carouselLayout.ts';

const r1 = computeCarouselLayout(900, 5);
console.assert(r1.visibleCount === 2, '900px/5 items → 2 visible, got ' + r1.visibleCount);
console.assert(Math.round(r1.slideWidthPx) === 430, 'slideWidth 430, got ' + r1.slideWidthPx);

const r2 = computeCarouselLayout(1200, 3);
console.assert(r2.visibleCount === 3, '1200px/3 items → 3 visible');

const r3 = computeCarouselLayout(400, 5);
console.assert(r3.visibleCount === 1, '400px → 1 visible');

console.log('computeCarouselLayout OK');
"
```
Expected: `computeCarouselLayout OK` (exit 0)

- [ ] **Step 3: Créer `src/hooks/useCarouselLayout.ts`**

```typescript
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
```

- [ ] **Step 4: Vérifier la compilation**

Run: `npm run build`
Expected: build réussit (ou au minimum pas d'erreur TS sur les nouveaux fichiers)

- [ ] **Step 5: Commit (si demandé par l'utilisateur)**

```bash
git add src/utils/carouselLayout.ts src/hooks/useCarouselLayout.ts
git commit -m "feat: add responsive carousel layout calculation"
```

---

### Task 3: Composant ProjectCarousel

**Files:**
- Create: `src/Components/ProjectCarousel.tsx`

**Interfaces:**
- Consumes: `useCarouselLayout`, `MIN_GAP_PX` from Task 2
- Produces:
  - `export type ProjectCarouselProps<T> = { items: T[]; renderSlide: (item: T, index: number) => React.ReactNode; carouselKey?: string }`
  - `export default function ProjectCarousel<T>(props: ProjectCarouselProps<T>): JSX.Element | null`

- [ ] **Step 1: Créer `src/Components/ProjectCarousel.tsx`**

```tsx
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useCarouselLayout } from "../hooks/useCarouselLayout";
import { MIN_GAP_PX } from "../utils/carouselLayout";

export type ProjectCarouselProps<T> = {
  items: T[];
  renderSlide: (item: T, index: number) => React.ReactNode;
  carouselKey?: string;
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

  const resetKey = carouselKey ?? items.map((item) => String(item)).join("|");

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      slidesToScroll: 1,
      dragFree: false,
      loop: false,
      containScroll: "trimSnaps",
      draggable: isCarouselActive,
      align: "start",
    },
    [isCarouselActive],
  );

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
  }, [emblaApi, resetKey]);

  const slideStyle = useMemo(
    () =>
      ({
        "--slide-width": `${slideWidthPx}px`,
      }) as React.CSSProperties,
    [slideWidthPx],
  );

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
        style={slideStyle}
      >
        <div
          className="flex touch-action-pan-y"
          style={{ gap: MIN_GAP_PX }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="min-w-0 shrink-0 grow-0"
              style={{ flex: `0 0 var(--slide-width)` }}
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
```

- [ ] **Step 2: Vérifier la compilation**

Run: `npm run build`
Expected: PASS sans erreur TS sur `ProjectCarousel.tsx`

- [ ] **Step 3: Commit (si demandé par l'utilisateur)**

```bash
git add src/Components/ProjectCarousel.tsx
git commit -m "feat: add ProjectCarousel with Embla navigation"
```

---

### Task 4: Intégrer dans Projets et ajuster ProjectCard

**Files:**
- Modify: `src/Components/Projets.tsx`
- Modify: `src/Components/ProjectCard.tsx`

**Interfaces:**
- Consumes: `ProjectCarousel`, `ProjectCarouselProps`, `Project`, `ProjectCard`, `clsx`
- Produces: `Projets` utilise le carrousel ; `ProjectCard` sans `flex-1`

- [ ] **Step 1: Retirer `flex-1` de ProjectCard**

Dans `src/Components/ProjectCard.tsx`, remplacer la ligne 19 :

```tsx
// Avant
<div className="card flex-1 flex flex-col justify-between  items-center text-center  h-96">

// Après
<div className="card flex w-full flex-col justify-between items-center text-center h-96">
```

- [ ] **Step 2: Refactoriser `src/Components/Projets.tsx`**

```tsx
import { Project } from "../Models/Project";
import ProjectCard from "./ProjectCard";
import ProjectCarousel from "./ProjectCarousel";
import clsx from "clsx";

export type ProjetsProps = {
  selectedProjects: Project[];
};

export default function Projets({ selectedProjects }: ProjetsProps) {
  const carouselKey = selectedProjects.map((p) => p.title).join("|");

  return (
    <div className="flex flex-col justify-between">
      <ProjectCarousel
        items={selectedProjects}
        carouselKey={carouselKey}
        renderSlide={(project, index) => (
          <div className="flex flex-col items-center">
            <ProjectCard displayedProject={project} />
            <div className="flex flex-row">
              {Array.from({ length: 5 }).map((_, i) => (
                <img
                  key={`${index}-${i}`}
                  src={
                    i < project.note
                      ? "/portfolio/projects_img/coeur.png"
                      : "/portfolio/projects_img/coeur_vide.png"
                  }
                  alt={i < project.note ? "coeur plein" : "coeur vide"}
                  className={clsx(
                    "mx-0.5 transition-all duration-300",
                    i > project.note - 1
                      ? "w-8 h-8 translate-x-[-0px] translate-y-[3px]"
                      : "w-10 h-10",
                  )}
                />
              ))}
            </div>
          </div>
        )}
      />
    </div>
  );
}
```

- [ ] **Step 3: Vérifier clsx (dépendance manquante potentielle)**

Run: `npm ls clsx`
Expected: si absent, installer :

```bash
npm install clsx
```

- [ ] **Step 4: Build + lint**

Run:
```bash
npm run build && npm run lint
```
Expected: build OK ; lint sans nouvelle erreur bloquante sur les fichiers modifiés

- [ ] **Step 5: Commit (si demandé par l'utilisateur)**

```bash
git add src/Components/Projets.tsx src/Components/ProjectCard.tsx
git commit -m "feat: wire project list through ProjectCarousel"
```

---

### Task 5: Validation manuelle et projet test 4+

**Files:**
- Modify (temporaire, pour test uniquement): `src/App.tsx` — ajouter un 4e projet dans `web` pour tester le carrousel, **retirer après validation** ou garder si l'utilisateur le souhaite

**Interfaces:**
- Consumes: carrousel intégré dans `Projets`

- [ ] **Step 1: Lancer le dev server**

```bash
npm run dev
```

- [ ] **Step 2: Checklist spec (R1–R10)**

| # | Test | Attendu |
|---|------|---------|
| 1 | Catégorie Web, grand écran (~1200px) | 3 projets visibles, pas de flèches |
| 2 | Ajouter temporairement un 4e projet dans `web` | Flèches visibles, 1 projet par clic |
| 3 | Drag souris horizontal | Snap au projet le plus proche |
| 4 | Réduire fenêtre ~600px | 1–2 visibles, largeurs recalculées |
| 5 | Changer catégorie (Web → Mobile) | Retour au 1er projet |
| 6 | Catégorie Mobile (1 projet) | Pas de flèches, pas de drag |
| 7 | Clic flèche → plusieurs fois | Largeur cards stable, pas de resize |
| 8 | Inspecter gap entre slides | ≥ 40px |

- [ ] **Step 3: Projet test optionnel (copier-coller dans `initialProjects.web`)**

```typescript
{
  title: "Projet test carrousel",
  image: "/portfolio/projects_img/portfolio.png",
  listeLiens: [],
  description: "Projet temporaire pour valider le carrousel à 4+ items.",
  note: 3,
  data: { time: 10 },
},
```

- [ ] **Step 4: Retirer le projet test** si ajouté temporairement (sauf demande contraire de l'utilisateur)

- [ ] **Step 5: Commit final (si demandé par l'utilisateur)**

```bash
git add -A
git commit -m "feat: project carousel with Embla — responsive 1-3 slides"
```

---

## Spec Coverage (self-review)

| Requirement | Task |
|-------------|------|
| R1 1–3 visibles responsive | Task 2 `computeCarouselLayout` |
| R2 Carrousel si plus de projets que visibles | Task 3 `isCarouselActive` |
| R3 Flèches 1 projet/clic | Task 3 `slidesToScroll: 1` |
| R4 Drag snap | Task 3 Embla `dragFree: false` |
| R5 Pas d'autoplay | Task 3 (pas d'autoplay configuré) |
| R6 Cards largeur fixe | Task 2 slideWidthPx + Task 4 `w-full` |
| R7 Flèches masquées si tout visible | Task 3 `isCarouselActive` |
| R8 Gap minimum | Task 2 `MIN_GAP_PX` |
| R9 Souris uniquement | Task 3 (pas de touch-specific) |
| R10 Reset catégorie | Task 3 `resetKey` + Task 4 `carouselKey` |

## Placeholder scan

Aucun TBD / TODO / « implement later » dans ce plan.
