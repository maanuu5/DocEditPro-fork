# macOS Light UI Design System — DESIGN.md Specification

> **Source of Truth for AI Coding Agents & Front-End Developers**
> Modern, clean Apple macOS Light UI aesthetic with high clarity, frosted acrylic glass, and refined typography.

---

## 1. Design Philosophy & Aesthetic Core

DocEditPro's visual identity embraces the timeless simplicity, legibility, and elegance of Apple macOS:
1. **Clean Canvas**: Neutral light desktop canvas (`#f5f5f7`) with crisp white window surfaces (`#ffffff`).
2. **Apple System Typography**: Clean, high-contrast typography (`-apple-system`, `SF Pro`, `Inter`) with deep charcoal (`#1d1d1f`) for optimal readability.
3. **macOS Window Motifs**: Subtle hairline borders (`rgba(0, 0, 0, 0.08)`), rounded squircle corners (`14px` - `20px`), soft multi-layered depth shadows, and macOS traffic lights (`#ff5f57`, `#febc2e`, `#28c840`).
4. **Vibrant Apple Accents**: Apple System Blue (`#0071e3`), Emerald Green (`#34c759`), and harmonious pastel category chips.
5. **Translucent Frosted Glass**: Dynamic `backdrop-blur` and translucent glass headers (`bg-white/80 backdrop-blur-xl`).

---

## 2. Color Tokens

### Primary & Brand Accents
| Token | Hex | Role |
|---|---|---|
| `--mac-blue` | `#0071e3` | Apple System Blue primary CTA, active controls, links |
| `--mac-blue-hover` | `#0077ed` | Hover state for primary CTAs |
| `--mac-blue-light` | `rgba(0, 113, 227, 0.08)` | Selected states, badge containers |
| `--mac-traffic-red` | `#ff5f57` | macOS Close traffic light dot |
| `--mac-traffic-yellow` | `#febc2e` | macOS Minimize traffic light dot |
| `--mac-traffic-green` | `#28c840` | macOS Expand/Zoom traffic light dot |

### Neutral & Surface Scales (macOS Light Mode)
| Token | Hex / Value | Usage |
|---|---|---|
| `--background` | `#f5f5f7` | macOS desktop canvas background |
| `--surface` | `#ffffff` | Clean white cards, window panels |
| `--surface-hover` | `#f0f0f4` | List item hover, button hover |
| `--surface-elevated` | `#ffffff` | Popovers, modals, spotlight search |
| `--border` | `rgba(0, 0, 0, 0.08)` | Hairline dividers and window frames |
| `--border-hover` | `rgba(0, 113, 227, 0.35)` | Active/focused card borders |
| `--foreground` | `#1d1d1f` | High-contrast Apple charcoal text |
| `--muted-foreground` | `#6e6e73` | Apple secondary text, descriptions |
| `--subtle-foreground` | `#86868b` | Captions, metadata, keyboard shortcuts |

### macOS Soft Pastel Spectrum (Categories)
| Category | Background | Text Accent | Border |
|---|---|---|---|
| **Essentials** | `#eff6ff` (Sky) | `#0071e3` | `#bfdbfe` |
| **Edit & Organize** | `#f5f3ff` (Purple) | `#7c3aed` | `#ddd6fe` |
| **Security & Privacy**| `#ecfdf5` (Mint) | `#059669` | `#a7f3d0` |
| **Convert & Export** | `#fffbeb` (Amber) | `#d97706` | `#fde68a` |
| **Scan & Share** | `#ecfeff` (Cyan) | `#0891b2` | `#a5f3fc` |
| **Business** | `#fff1f2` (Rose) | `#e11d48` | `#fecdd3` |

---

## 3. Typography Scale

Font Stack: `Inter, "Notion Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`  
Monospace: `ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace`

| Token | Size | Line Height | Weight | Usage |
|---|---|---|---|---|
| `--text-hero` | `56px` / `3.5rem` | `1.1` | `800` (Bold) | Hero main headline |
| `--text-h1` | `36px` / `2.25rem` | `1.2` | `700` (Bold) | Page titles |
| `--text-h2` | `24px` / `1.5rem` | `1.3` | `600` (SemiBold) | Section headers |
| `--text-h3` | `18px` / `1.125rem`| `1.4` | `600` (SemiBold) | Card titles |
| `--text-body` | `14px` / `0.875rem`| `1.5` | `400` (Regular) | Primary copy, tool descriptions |
| `--text-small` | `12px` / `0.75rem` | `1.4` | `400` / `500` | Secondary metadata, pills |
| `--text-micro` | `10px` / `0.625rem`| `1.3` | `600` (Bold Mono)| Category codes, shortcut keys |

---

## 4. Spacing Scale

Based on a standard 4px / 8px incremental grid with generous document gutters:

| Spacing Token | Value | Common Application |
|---|---|---|
| `space-1` | `4px` | Micro-pill padding, inline tag gaps |
| `space-2` | `8px` | Icon-to-text spacing, small button padding |
| `space-3` | `12px` | Input internal padding, chip margins |
| `space-4` | `16px` | Card internal padding (mobile), list gaps |
| `space-6` | `24px` | Standard Bento card padding |
| `space-8` | `32px` | Section margins, grid gaps |
| `space-12` | `48px` | Component block separation |
| `space-16` | `64px` | Major section gutters |
| `space-24` | `96px` | Hero section top/bottom padding |

---

## 5. Shape Language & Radii

| Radius Token | Value | Target Elements |
|---|---|---|
| `--radius-pill` | `9999px` | Badges, filter chips, search bar triggers |
| `--radius-sm` | `4px` | Tag chips, table cells, shortcut keys (`<kbd>`) |
| `--radius-md` | `8px` | Standard buttons, text inputs, dropdown menus |
| `--radius-lg` | `14px` | Tool cards, callout boxes, modal containers |
| `--radius-xl` | `22px` | Bento showcase containers, hero feature frames |

---

## 6. Shadows & Elevation

- **Elevation 0 (Flat)**: Hairline border with zero drop-shadow (`border: 1px solid rgba(255, 255, 255, 0.08)`).
- **Elevation 1 (Card Hover)**: `0 8px 24px -4px rgba(0, 0, 0, 0.35), 0 2px 6px -1px rgba(0, 0, 0, 0.2)`.
- **Elevation 2 (Floating Popover / Modal)**: `0 20px 48px -8px rgba(0, 0, 0, 0.6), 0 4px 12px -2px rgba(0, 0, 0, 0.3)`.
- **Glow Accent Shadow**: `0 0 30px -4px rgba(86, 69, 212, 0.35)`.

---

## 7. Component Specifications

### 1. Primary "Notion Purple" Pill Button
- Height: `38px` (Medium) / `46px` (Large)
- Background: `#5645d4`
- Text: `#ffffff`, font-weight `600`, font-size `13px` / `14px`
- Radius: `8px` or `9999px` (Pill variant)
- Hover: `#4838bc`, subtle scale `1.01`, box-shadow `0 4px 14px rgba(86, 69, 212, 0.4)`

### 2. Secondary Ghost / Surface Button
- Background: `rgba(255, 255, 255, 0.05)`
- Border: `1px solid rgba(255, 255, 255, 0.1)`
- Text: `#fafafa`, hover background `rgba(255, 255, 255, 0.1)`

### 3. Bento Card Container
- Background: `#16161d` with `backdrop-filter: blur(12px)`
- Border: `1px solid rgba(255, 255, 255, 0.08)`
- Corner Radius: `16px` to `20px`
- Padding: `24px`
- Hover: border changes to `rgba(86, 69, 212, 0.4)`, subtle translateY `-2px`

### 4. Notion Callout Block
- Background: `rgba(86, 69, 212, 0.08)`
- Border: `1px solid rgba(86, 69, 212, 0.25)`
- Left icon: Emoji or 18px Lucide icon in accent container
- Content: 13px clean text with bold lead-in title

### 5. Tag / Chip Pills
- Height: `22px`
- Radius: `4px` or `9999px`
- Typography: 11px font-medium
- Colors: Utilizes the Notion Pastel Palette (Mint, Sky, Lavender, Rose, Peach, Cream)

---

## 8. Implementation Guidelines for DocEditPro

1. **Keep Colors Consistent**: Map all UI themes to CSS variables in `src/app/globals.css`.
2. **Prioritize Performance**: Maintain 100% client-side WebAssembly execution without introducing blocking dependencies.
3. **Dark / High-Contrast Priority**: Dark mode by default with deep carbon surfaces, glowing hairline borders, and Notion Purple accent highlights.
4. **Strict Accessibility**: Ensure WCAG 2.1 AA compliant contrast ratios across all pastel chips and button text.
