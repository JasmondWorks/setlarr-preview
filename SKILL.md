---
name: setlarr-design
description: Use this skill to generate well-branded interfaces and assets for Setlarr — the Nigerian peer-to-peer marketplace with built-in escrow. Contains essential design guidelines, colors, type tokens, fonts, assets, and a mobile UI kit for prototyping or shipping production work.
user-invocable: true
---

# Setlarr design skill

Read `README.md` first — it contains the governing philosophy, the full content/voice/visual/iconography guidelines, and the file index.

## Quick start

- **Tokens**: `colors_and_type.css` — one CSS file with every colour, type ramp, spacing step, radius, and shadow as CSS custom properties. Import this once at the root of any Setlarr surface.
- **Type**: Inter, weights 400 and 600 only. Never 500. Never 700.
- **Colour**: warm indigo brand (`hsl(248, 60%, 47%)`) on warm-tinted neutrals. Semantic: success-green, warning-amber, danger-red.
- **Spacing**: 4px grid. Within-group 8–16px; between-group 24–40px. Borders are on a tight budget — reach for spacing first.
- **Radius**: 10px for cards, 6px for inputs/buttons, pill for badges and chips only.
- **Shadow**: two-part (direct + ambient). `elevation-2` for cards — no border in addition.
- **Icons**: Lucide, 1.5px stroke.

## When working on a visual artifact (slide, mock, prototype)

1. Read `README.md` and skim the cards in `preview/` for the visual vocabulary.
2. Copy any logo or icon assets you need out of `assets/`.
3. Import `colors_and_type.css` from the root.
4. Reuse components from `ui_kits/setlarr-app/components.jsx` — `SButton`, `SInput`, `SBadge`, `SCard`, `ListingCard`, `TopBar`, `BottomNav`, `CityChip`, `ListRow`, `EmptyState`. Don't reinvent them.
5. Write copy in Setlarr's voice: sentence case, second person ("you"), outcome-stating CTAs that include the amount where money is involved (`Lock ₦434,700 in escrow`, never `Confirm`).

## When working on production code

Lift the token values from `colors_and_type.css` directly into your CSS / styled-components / tailwind config. The JSX components in `ui_kits/setlarr-app/` are cosmetic recreations — re-implement them properly in your stack, but match their visual output pixel-for-pixel.

## If invoked with no other guidance

Ask the user what they want to build (slide deck, mobile screen, marketing email, in-product flow?), ask a couple of clarifying questions about audience and goal, then act as an expert Setlarr designer. Default to HTML artifacts; produce production code only when asked.

## Caveats baked into this skill

- The wordmark in `assets/logo-wordmark.svg` is a placeholder synthesised from the system's own type + brand colour. Replace with the real mark when supplied.
- Inter is loaded from Google Fonts. If Setlarr ships a self-hosted Inter or a custom variant, swap the `@import` in `colors_and_type.css`.
- Iconography uses Lucide — flag this substitution if Setlarr has an internal icon set.
