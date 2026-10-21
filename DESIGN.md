# UI Design System Specification — DESIGN.md

> **Source of Truth for AI Coding Agents & Front-End Developers**
> Based directly on `vercel.md`. Minimalist, monochrome-first aesthetic popularized by Vercel/Geist blended with clean Apple squircle elevation and typography.

---

## 1. Philosophy & Core Principles

1. **Monochrome First, One Accent**: The interface is pure black/white/gray. Color is used only for the single accent (`--accent: #3b82f6`), and for semantic states (success/warning/danger).
2. **Borders Over Shadows**: Elevation comes from a 1px border (`rgba(255, 255, 255, 0.08)`) and subtle surface background shifts, never drop shadows.
3. **Content First**: No hero illustrations, no gradients, no decorative graphics. The tool grid and file dropzones are the focus.
4. **Fast and Quiet**: Motion is short (150ms ease-out), functional, and never bouncy. Respects `prefers-reduced-motion`.
5. **Smooth Scrolling**: Powered by `lenis` for smooth momentum scroll across anchor points.

---

## 2. Color Tokens

```css
:root {
  /* Backgrounds */
  --background: #000000;        /* Page background */
  --surface: #0a0a0a;           /* Cards, panels */
  --surface-hover: #111111;     /* Hover states */
  --surface-elevated: #141414;  /* Modals, popovers */

  /* Borders */
  --border: rgba(255, 255, 255, 0.08);
  --border-hover: rgba(255, 255, 255, 0.16);

  /* Foreground */
  --foreground: #fafafa;
  --muted-foreground: #a1a1a1;
  --subtle-foreground: #6e6e6e;

  /* Accent — Pure Monochrome White */
  --accent: #ffffff;
  --accent-hover: #ededed;
  --accent-foreground: #000000;

  /* Semantic */
  --success: #22c55e;
  --warning: #eab308;
  --danger: #ef4444;

  /* Focus ring */
  --ring: #3b82f6;
}
```

---

## 3. Tool Card Specification

- `radius-md` (8px), `1px solid var(--border)`, `p-5`, background `var(--surface)`
- Icon chip: 40x40px, `radius-sm` (6px), background `var(--accent)` at 12% opacity, icon in `var(--accent)`, lucide-react icon size 20, stroke-width 1.75
- Hover: border → `var(--border-hover)`, subtle `translateY(-2px)` (150ms ease-out)
