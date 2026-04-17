# Design Brief

## Tone
Industrial/utilitarian. Every element serves operational clarity; no decoration.

## Aesthetic
Professional coal mine ops center with regulatory authority. Deep cool tones convey trust and technical precision. Amber/orange accents signal urgency.

## Differentiation
Status token clarity via consistent color hierarchy. Overdue states command visual attention. Data-dense layout with clean horizontal rhythm to prevent cognitive overload.

## Color Palette

| Token             | Light (OKLCH)       | Dark (OKLCH)        | Usage                                      |
|-------------------|---------------------|---------------------|-------------------------------------------|
| Background        | 0.98 0 0            | 0.11 0.02 254       | Page surface                              |
| Foreground        | 0.15 0 0            | 0.92 0.01 254       | Primary text                              |
| Card              | 0.995 0 0           | 0.155 0.02 254      | Data containers, elevated surfaces        |
| Primary           | 0.38 0.12 256       | 0.65 0.18 243       | Deep blue — CTA, links, active states     |
| Accent            | 0.68 0.15 70        | 0.68 0.15 70        | Amber — alert highlights, overdue badges  |
| Success           | 0.65 0.17 153       | 0.65 0.17 153       | Green — completed/compliant status        |
| Warning           | 0.68 0.15 70        | 0.68 0.15 70        | Amber — in-progress/caution               |
| Destructive       | 0.58 0.19 24        | 0.58 0.19 24        | Orange-red — overdue/critical             |
| Muted             | 0.9 0 0             | 0.2 0.02 254        | Secondary text, disabled states           |
| Border            | 0.88 0 0            | 0.25 0.01 254       | Dividers, card edges                      |

## Typography
- **Display**: DM Sans (geometric, technical authority)
- **Body**: Figtree (readable at small sizes, tabular-friendly)
- **Mono**: JetBrains Mono (data values, timestamps, regulatory codes)

## Structural Zones

| Zone         | Treatment                                           | Bg Token      | Border Token      |
|--------------|-----------------------------------------------------|---------------|-------------------|
| Header/Nav   | Elevated card, accent bottom-border, task count     | Card          | Primary           |
| Main Content | Clean background, card-based sections               | Background    | Border            |
| Data Cards   | Subtle border, status left-accent bar (4px)         | Card          | Border/Status-Col |
| Sidebar      | Sidebar token set, primary text on dark bg          | Sidebar       | Sidebar-border    |
| Footer       | Muted background, compliance summary, timestamp     | Muted/20      | Muted/40          |
| Alert/Badge  | Full-color pill (Completed: green, In-Progress: amber, Overdue: red, Pending: gray) | Status-color  | Status-color      |

## Spacing & Rhythm
- **Base unit**: 6px
- **Density**: Tight (data-heavy tables, compact form rows)
- **Padding**: Cards 12px, sections 18px, page gutter 24px
- **Gap**: Section headers 12px from content, data rows 6px

## Component Patterns
- **Status Badge**: Pill-shaped, semantic color, no icon (text only)
- **Data Row**: Left-to-right flex, hover bg-muted/50 smooth transition
- **Section Header**: DM Sans bold, 18px, 6px space below divider
- **Compliance Card**: Card container with left 4px accent bar (status-color), title (16px bold), metadata rows (14px regular), optional action button (small secondary)
- **Alert**: Full-color bg with alpha (e.g., bg-red-500/20), left accent bar, icon + text

## Motion
- **Transition**: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) for interactive elements
- **Constraints**: No playful animations; state changes only (hover, focus, open/close)

## Elevation & Depth
- **Flat (default)**: No shadow, subtle border
- **Elevated (cards, popover)**: `shadow-card` (0 2px 8px 0 rgba(0,0,0,0.08))
- **High (modals, tooltips)**: `shadow-elevated` (0 4px 12px 0 rgba(0,0,0,0.12))

## Border Radius
- **None (0px)**: Status accent bars, data row underlines
- **Small (4px)**: Form inputs, small badges
- **Medium (8px)**: Standard cards, buttons
- **Large (32px)**: Full-width section headers (optional)

## Signature Detail
Left-accent status bars on compliance cards. Color-coded at a glance (green = compliant, amber = monitoring, red = urgent) without relying on text. Reinforces regulatory/compliance visual language.

## Constraints
- Never use raw hex or rgb colors; only OKLCH tokens via CSS variables.
- Status colors are identical in light and dark modes (urgency clarity > mode consistency).
- No decorative gradients, patterns, or ambient elements.
- Favor border + subtle shadow over background blur or frosted glass.
- No animated icons or looping motion.

## Notes
Dark mode enforced for ops center (mining operations dashboard). Light mode available for compliance reports. Both modes satisfy AA+ contrast. Data-centric layout eliminates empty space; every card serves a regulatory or monitoring purpose.
