# Setlarr mobile app — UI kit

A click-through hi-fi recreation of the Setlarr mobile app, built strictly against the design system tokens in `../../colors_and_type.css`.

## What's inside

| File | What it is |
|---|---|
| `index.html` | The host page — renders the iOS device frame, wires the nav, and exposes screen-jump chips so you can hop directly to any screen. |
| `ios-frame.jsx` | iOS bezel + status bar + home indicator (starter component, untouched). |
| `icons.jsx` | Inline Lucide icons as React components (1.5px stroke). |
| `components.jsx` | Primitive components: `SButton`, `SInput`, `SBadge`, `SCard`, `ListingCard`, `TopBar`, `BottomNav`, `CityChip`, `CategoryTile`, `ListRow`, `EmptyState`. |
| `screens.jsx` | Full-app screens: `HomeScreen`, `ListingScreen`, `ConfirmScreen`, `SuccessScreen`, `WalletScreen`, `SellScreen`, `YouScreen`, `SearchScreen`, `ChatsScreen`. |

## Screens

1. **Home** — search, city chips, category tiles, listing grid.
2. **Listing detail** — hero image, seller block, escrow explainer, sticky `Lock ₦… in escrow` CTA.
3. **Confirm** — itemised breakdown, payment method, primary CTA repeats the amount.
4. **Success** — money-locked confirmation, in-escrow order badge.
5. **Wallet** — In-escrow stat, active orders, awaiting-confirmation alert.
6. **New listing** — photo dropzone, fields, category chips, verification nudge.
7. **You** — profile head, settings list with semantic icons.
8. **Search / Chats** — empty states.

## Cut corners

- Photo placeholders use the design system's tinted-glyph treatment rather than real imagery.
- Nav stack is single-level (no slide-in transitions).
- Search is decorative.
- All data is hard-coded in `screens.jsx` → `SAMPLE_LISTINGS`.
