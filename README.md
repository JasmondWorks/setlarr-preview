# Setlarr Design System

> Light-mode-first design system for **Setlarr** — a Nigerian peer-to-peer marketplace with built-in escrow. Built on the principles of *Refactoring UI* and *Practical UI*: meaning over decoration, spacing over borders, two type weights only.

This system was authored from a written specification supplied directly in the brief. **No codebase, Figma file, or screenshot was provided** — all components and copy were inferred from the spec's signals (Naira pricing, "Lock ₦… in escrow" CTAs, verified-seller badges, Seller Center FAB, dispute states, city chips). If a real Setlarr codebase or Figma exists, hand it over and this system will be re-aligned to match.

## Sources

| Source | Provided? | Notes |
|---|---|---|
| Written spec | ✅ | Full color/type/spacing/component spec in chat brief |
| Codebase | ❌ | None attached. Components inferred from spec language. |
| Figma | ❌ | None attached. |
| Slide deck | ❌ | None attached. |
| Logos / brand assets | ❌ | None attached. Word-mark logo synthesized from the system's own type + brand color. |

## What is Setlarr?

Setlarr (note: **not** Konfam — a related brand the team distinguishes itself from) is a peer-to-peer marketplace where buyers and sellers transact through a held-in-escrow flow. The system's vocabulary is the giveaway:

- **Escrow as a first-class verb.** Buttons say *"Lock ₦434,700 in escrow"*, not "Confirm" or "Buy".
- **Trust signals are explicit.** Verified, In Escrow, Pending, Disputed, Inactive — five states with their own badge colours.
- **Sellers are a distinct mode.** The center bottom-nav slot is a Seller Center FAB, not a tab — a deliberate physical-elevation cue.
- **Local.** Naira pricing (`₦`), city chips for location filtering.

## Governing philosophy (one sentence)

> Every visual element must earn its presence by carrying meaning, not decoration — borders, backgrounds, and shadows are on a budget; spend them only when spacing alone cannot do the grouping job.

---

## Content fundamentals

Setlarr's voice is **direct, transactional, and protective**. It speaks like a careful friend handling your money — neither cold nor cheerful. There is no marketing fluff in the product surface.

### Voice rules

- **Sentence case everywhere.** Buttons, labels, headings, nav. Never Title Case. Never ALL CAPS except for the 12px form labels which are tracking‑boosted small caps.
- **You, not we.** "You'll get a refund if the seller doesn't ship in 48 hours" — never "We refund you".
- **State the outcome, not the action.** Buttons spell out what happens, including the amount when there's money involved.
  - ✅ `Lock ₦434,700 in escrow`
  - ✅ `Release ₦434,700 to seller`
  - ❌ `Confirm` / `Submit` / `Continue`
- **Naira prefix, no space.** `₦434,700` (thousands separators, no decimals for whole amounts).
- **Time is plain.** "2 hours ago", "in 48 hours", "yesterday". Never "2h" abbreviations in primary surfaces — those belong in chat timestamps only.
- **Status is one word.** Verified. Pending. Disputed. In escrow. Released. — sentence case, no period.
- **Numbers in body copy use figures from 2 upwards.** "1 review", "12 reviews".
- **No emoji in product UI.** Customer-service replies and marketing may use them sparingly; the app itself does not.
- **Labels are last-resort.** A price under a product photo does not need "Price:". If you can remove the label without changing meaning, remove it.

### Example copy

| Surface | Copy |
|---|---|
| Empty wallet state | **No money in escrow yet** / Once a buyer locks payment for one of your items, it'll appear here. |
| Disputed-order banner | **This order is in dispute** / We've paused the funds. A Setlarr agent will message both of you within 24 hours. |
| Verification CTA | **Verify your ID to start selling** / Sellers with verified IDs get a green badge and 3× more buyer trust. |
| Primary action | `Lock ₦434,700 in escrow` |
| Destructive ghost | `Cancel order` (never red-filled; danger ghost only) |

---

## Visual foundations

### Color vibe
Warm indigo brand hue (`hsl(248, 60%, 52%)`) on slightly **warm-tinted neutrals** — neutrals carry a tiny hue offset toward indigo, so backgrounds feel crafted rather than sterile. No pure greys. No cool slate.

### Backgrounds
- Page background is `neutral-50` (`hsl(240, 20%, 98%)`) — off-white with the faintest violet warmth.
- Surfaces (cards, sheets) are **pure white** sitting on the off-white page, lifted by shadow.
- **No gradients in product chrome.** Tinted backgrounds (`brand-50`, `success-50` etc.) are flat solids.
- **No textures, no patterns, no illustrations** behind real content. Empty states get a single 48px Lucide icon in `neutral-300` — that's it.

### Type
- Inter, regular (400) and semibold (600). **Never 500. Never 700. Never bold mid-paragraph.**
- 600 is reserved for headings, prices, primary labels, CTAs. Everything else is 400.
- Form labels are 12px / 600 / uppercase / `letter-spacing: 0.04em` — the only tracking-modified text in the system.
- Line length on mobile sits between 45–75 characters.

### Spacing & rhythm
- 4px base grid, no exceptions.
- **Within a group:** 8–16px apart. **Between groups:** 24–40px (≥ 2× the within-group gap).
- Headings always have *more space above than below* — binds them to the content they introduce.

### Elevation
- Two-part shadows (direct + ambient) — never a single soft blur.
- The shadow **is** the card. A shadowed surface never also gets a border.
- Three steps only: `elevation-1` (inputs), `elevation-2` (cards, dropdowns), `elevation-3` (modals, sheets).

### Borders
On a strict budget. Borders are allowed only on:
- Input fields (1px `neutral-300`)
- List-row dividers (1px `neutral-200`, between rows only)
- Focus / selected rings (2px `brand-500`)
- Left accent strip on alerts (3px semantic-600)
- Bottom-nav top edge (1px `neutral-200`)
- Danger ghost button (1px `danger-200`)

Borders are **never** used around cards in main content, around list groups, around stat cells, around chip filters, or around category icon tiles.

### Corner radius
- 4px — inline micro elements
- 6px — inputs, small buttons, icon squares
- 10px — standard cards, lists, modals
- 16px — large cards, bottom sheets
- 20px — screen-level overlays
- 9999px (pill) — **only** for status badges, toggle pills, and city chips

Mixing radii signals a broken system. Cards never get pill radius; badges never get 10px.

### Animation
- Easing: `cubic-bezier(0.2, 0, 0, 1)` — a fast-out, slow-arrive curve. Feels like a snap into place.
- Durations: 120ms (micro — icon swap, badge flip), 200ms (standard — sheet, modal), 320ms (large — page transitions).
- **No bounces. No spring overshoot.** This is a money app — bouncing buttons read as toylike.
- Fades are paired with a 4px transform — content slides into place by 4px while fading in, never just opacity.

### Hover / press states
- **Hover** (where applicable — desktop web surfaces): background steps down by one neutral stop (e.g. `neutral-100` row → `neutral-200`), or brand button steps `brand-600` → `brand-700`. Never opacity-based hover.
- **Press** (touch): `transform: scale(0.98)` for 80ms + a 4% darkening. No colour inversion.
- **Focus**: 2px `brand-500` ring + 3px `brand-50` outer glow. Always visible for keyboard users.

### Transparency / blur
- Sparingly. The bottom-sheet scrim is `rgba(20, 16, 40, 0.48)` — flat, no blur.
- A backdrop-blur is used only behind the floating Seller Center FAB when it overlaps content during scroll (`backdrop-filter: blur(12px) saturate(140%)` on a white `0.6` alpha surface).

### Imagery
When real product photos appear (listings), they sit in a **10px radius container with no border, no shadow, just the photo**. Warm white balance is preferred; greyscale is reserved for archived listings. No filters, no duotones, no graininess.

### Layout rules
- Mobile screens: 24px universal gutter (`space-6`).
- Sticky bottom nav: 64px height + safe-area inset.
- Sticky top bar: 56px height, white background, 1px `neutral-200` bottom border *only when content scrolls under it* (otherwise borderless).
- Modals: bottom-sheet style on mobile (16px top radius, drag handle), centered card on tablet/desktop (20px radius).

---

## Iconography

**Family:** [Lucide](https://lucide.dev) — one family, never mixed with filled icon sets. 1.5px stroke weight everywhere. Loaded via CDN (`https://unpkg.com/lucide@latest`) since no internal icon font was provided.

### Sizes by context
| Size | Where |
|---|---|
| 14px | Inline with caption text (`<MapPin/>` beside city name) |
| 16px | Inline with body text, toggle icons inside inputs |
| 20px | Bottom-nav tabs, action icons, section icons |
| 24px | Category tiles, prominent standalone icons |
| 48px | Empty-state illustrations (always `neutral-300`) |

### Rules
- Icon-to-label gap is always **8px**. Icon aligns to cap-height of text, not baseline.
- Icon-only controls always have `aria-label`.
- An icon earns its place if it (a) replaces a word (`MapPin` instead of "Location:"), (b) reinforces a nav label, or (c) differentiates rows in a settings list. Decorative icons are removed.
- **No emoji** in product UI. **No unicode glyphs as icons** (no `→`, `✓`, `★`). Use the matching Lucide glyph.

### Substitutions flagged
- **Lucide** is loaded from CDN as the default — flagged in case Setlarr has a hand-tuned internal icon set we should switch to.
- **Inter** is loaded from Google Fonts — flagged if Setlarr ships a self-hosted Inter or a custom variant.

---

## Index — what's in this folder

| Path | What it is |
|---|---|
| `README.md` | This file — the human-readable manifest. |
| `colors_and_type.css` | The token layer. CSS custom properties for every colour, type ramp, spacing step, radius, shadow. Import this once. |
| `fonts/` | Self-hosted webfont stub (Inter via Google Fonts in the CSS for now). |
| `assets/` | Logos and brand marks (synthesized — replace with real assets when available). |
| `preview/` | One small HTML card per design-system concept — these populate the Design System tab. |
| `ui_kits/setlarr-app/` | Mobile UI kit: index.html click-through + JSX components for buttons, inputs, badges, list rows, bottom nav, listing cards, escrow flow. |
| `SKILL.md` | Skill manifest. Lets this folder be dropped into Claude Code as a reusable skill. |

---

## Caveats

- **No real assets were provided.** The wordmark and any sample listing imagery are placeholders. Drop in real PNG/SVG logos to replace them.
- **Components are spec-faithful, not codebase-faithful.** If a Setlarr codebase exists with deviations from the spec, those deviations are not captured here.
- **Inter** is the spec'd type face and is widely available — no substitution needed, but it is loaded from Google Fonts rather than self-hosted.
