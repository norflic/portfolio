# Project Carousel — Design Spec

**Date:** 2026-07-31  
**Status:** Approved (brainstorming)  
**Scope:** Carrousel de projets dans la section `Projets` du portfolio

## Context

Le portfolio affiche les projets d'une catégorie sélectionnée en ligne horizontale (`Projets.tsx`). Aujourd'hui, toutes les cards sont rendues d'un coup (`flex-row gap-10`). L'utilisateur va ajouter des projets (4+ par catégorie) et souhaite un carrousel permettant de naviguer projet par projet, sans défilement automatique.

### État actuel

- **Stack :** React 19, Vite, Tailwind CSS 4
- **Composants concernés :** `Projets.tsx`, `ProjectCard.tsx`, `App.tsx` (données inchangées)
- **Gap actuel entre cards :** `gap-10` (40 px / 2.5 rem)
- **Card :** hauteur fixe `h-96`, largeur variable via `flex-1`
- **Catégories :** 1 à 3 projets aujourd'hui, évolution vers 4+

## Requirements

| ID | Requirement |
|----|-------------|
| R1 | Afficher 1 à 3 projets visibles simultanément, selon l'espace disponible |
| R2 | Si une catégorie contient plus de projets que le nombre visible, activer le carrousel |
| R3 | Clic flèche gauche/droite : avancer/reculer de **1 projet** |
| R4 | Drag à la souris ; au relâchement, snap sur le projet le plus proche |
| R5 | Pas de défilement automatique |
| R6 | La largeur des cards ne change pas lors de la navigation (seul le scroll bouge) |
| R7 | Flèches masquées quand tous les projets tiennent à l'écran |
| R8 | Gap minimum entre les slides respecté dans le calcul responsive |
| R9 | Souris uniquement en v1 ; touch prévu en v2 |
| R10 | Changement de catégorie → retour au premier projet |

## Non-goals (v1)

- Support tactile (touch drag)
- Boucle infinie (`loop`)
- Indicateurs / dots de pagination
- Défilement libre sans snap (`dragFree`)
- Modification de `App.tsx`, `Stats`, ou du modèle `Project`

## Approach

**Librairie :** [Embla Carousel](https://www.embla-carousel.com/) via `embla-carousel-react`

**Pourquoi Embla plutôt que custom :**
- Drag, snap, limites début/fin gérés nativement
- API légère (~3 kB gzippé), une seule dépendance
- Extensible pour le touch en v2 sans refonte
- Le calcul responsive (1–3 visibles + gap) reste custom dans les deux cas ; Embla évite la partie la plus fragile (physique du drag)

**Configuration Embla :**
```ts
{
  slidesToScroll: 1,
  dragFree: false,
  loop: false,
  containScroll: 'trimSnaps',
}
```

Désactiver `draggable` quand le carrousel n'est pas nécessaire (`projects.length <= visibleCount`).

## Architecture

```
Projets (existant, refactorisé)
 └── ProjectCarousel (nouveau)
      ├── bouton ← (conditionnel)
      ├── .embla__viewport  (overflow hidden, ref Embla)
      │    └── .embla__container  (display flex, gap: MIN_GAP)
      │         └── .embla__slide × N
      │              ├── ProjectCard
      │              └── cœurs (notation)
      └── bouton → (conditionnel)
```

### Responsabilités

| Fichier | Rôle |
|---------|------|
| `ProjectCarousel.tsx` | Hook Embla, calcul responsive, flèches, drag, reset catégorie |
| `Projets.tsx` | Passe `selectedProjects`, rend chaque slide (card + cœurs) |
| `ProjectCard.tsx` | Retrait de `flex-1` ; largeur héritée du slide parent |
| `useCarouselLayout.ts` (optionnel) | Hook extrait si la logique resize dépasse ~40 lignes |

### Props `ProjectCarousel`

```ts
type ProjectCarouselProps<T> = {
  items: T[];
  renderSlide: (item: T, index: number) => React.ReactNode;
  /** Clé stable pour reset au changement de catégorie */
  carouselKey: string;
};
```

## Calcul responsive

### Constantes

```ts
const MIN_GAP_PX = 40;        // aligné sur gap-10 actuel
const MIN_CARD_WIDTH_PX = 280; // largeur minimale acceptable pour une card
const MAX_VISIBLE = 3;
```

### Algorithme

Mesurer la largeur disponible du viewport carrousel (via `ResizeObserver` sur `.embla__viewport`).

```
maxCandidates = min(MAX_VISIBLE, projects.length)

pour n = maxCandidates … 1 :
  totalGaps = (n - 1) × MIN_GAP_PX
  slideWidth = (availableWidth - totalGaps) / n
  si slideWidth >= MIN_CARD_WIDTH_PX :
    visibleCount = n
    break

slideWidth final appliqué en CSS : --slide-width: {slideWidth}px
gap appliqué sur .embla__container : gap: {MIN_GAP_PX}px
```

### Exemple

Viewport 900 px, 5 projets :
- n=3 : `(900 - 80) / 3 = 273` → < 280, rejeté
- n=2 : `(900 - 40) / 2 = 430` → OK → **2 visibles**, slides à 430 px

### Comportement au resize

- Recalcul de `visibleCount` et `slideWidth`
- Clamp de l'index courant si nécessaire
- `emblaApi.reInit()` après mise à jour des dimensions CSS

## Navigation

| Action | Comportement |
|--------|--------------|
| Flèche → | `emblaApi.scrollNext()` — 1 snap |
| Flèche ← | `emblaApi.scrollPrev()` — 1 snap |
| Drag souris | Embla gère ; snap au plus proche au relâchement |
| Auto-scroll | Désactivé (pas d'option autoplay) |

### Visibilité des flèches

Afficher les flèches **uniquement** si le carrousel est actif :
```
isCarouselActive = projects.length > visibleCount
```

Quand actif, désactiver visuellement (← grisée) si `!canScrollPrev`, idem pour →.

### Changement de catégorie

- Passer une `carouselKey` (= catégorie courante) à `ProjectCarousel`
- Au changement : `scrollTo(0)` via effet sur `carouselKey`

## Styles

### Slides Embla

```css
.embla__viewport { overflow: hidden; }
.embla__container { display: flex; touch-action: pan-y pinch-zoom; }
.embla__slide {
  flex: 0 0 var(--slide-width);
  min-width: 0;
}
```

### Flèches

- Positionnées à gauche et à droite du viewport (hors zone de drag)
- Style cohérent avec la palette portfolio : bordure `#74C69D`, fond `#142C52`
- Icônes simples (chevron SVG ou caractères Unicode) — pas de lib d'icônes

### ProjectCard

- Retirer `flex-1` de la card
- La card occupe 100 % de la largeur du slide parent
- Hauteur `h-96` conservée

## Data flow

```
App (selectedProjects par catégorie)
  → Projets (map → renderSlide)
    → ProjectCarousel (layout + navigation)
      → embla__slide × N
        → ProjectCard + cœurs
```

Aucun état de navigation remonté vers `App` ; le carrousel est autonome.

## Error handling

- Tableau `items` vide : ne rien afficher (cas absent aujourd'hui)
- 1 projet : affichage simple, pas de flèches, pas de drag
- Images manquantes : comportement existant de `ProjectCard` (placeholder)

## Testing (manuel v1)

1. Catégorie Web (3 projets) sur grand écran → 3 visibles, pas de flèches
2. Ajouter un 4e projet test → flèches visibles, 1 projet par clic
3. Drag souris → snap correct au relâchement
4. Réduire la fenêtre → passage à 2 puis 1 visible, recalcul des largeurs
5. Changer de catégorie → retour au premier projet
6. Catégorie Mobile (1 projet) → pas de flèches
7. Vérifier que la largeur des cards reste stable pendant la navigation

## Évolution v2 (hors scope)

- Support touch via `pointer events` ou réactivation du drag Embla sur mobile
- Dots / indicateur de position
- Animation de transition personnalisée

## Files to create/modify

| Action | File |
|--------|------|
| Create | `src/Components/ProjectCarousel.tsx` |
| Create | `src/hooks/useCarouselLayout.ts` (si logique extraite) |
| Modify | `src/Components/Projets.tsx` |
| Modify | `src/Components/ProjectCard.tsx` (retirer `flex-1`) |
| Modify | `package.json` (ajouter `embla-carousel-react`) |
