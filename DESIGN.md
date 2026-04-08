# Design Brief: Bharat Netra

## Purpose & Tone
National-grade independent truth network delivering verified news with zero propaganda, zero bias. Institutional authority, journalistic integrity, transparency focus.

## Differentiation
**Signature Detail**: Truth Score badges (color-coded: green 70+, amber 30-70, red 0-30) + Bias Indicator labels + Source Reliability + Classification tags. Every card shows deterministic truth metrics.

## Palette (OKLCH)
| Token           | Light                | Dark                 | Purpose                          |
| --------------- | -------------------- | -------------------- | -------------------------------- |
| primary         | 0.245 0.19 260       | 0.245 0.19 260       | Dark navy institutional authority |
| accent          | 0.68 0.22 68         | 0.68 0.22 68         | Saffron orange national identity  |
| background      | 0.99 0 0             | 0.09 0.03 260        | White light / near-black dark    |
| card            | 1.0 0 0              | 0.13 0.04 260        | Surface elevation                |
| chart-1 (truth) | 0.65 0.18 142        | 0.65 0.18 142        | Green success 70-100             |
| chart-2 (caution) | 0.68 0.18 70       | 0.68 0.18 70         | Amber warning 30-70              |
| chart-3 (low)   | 0.55 0.22 25         | 0.55 0.22 25         | Red destructive 0-30             |

## Typography
| Tier       | Font             | Weight | Size    | Usage                              |
| ---------- | ---------------- | ------ | ------- | ---------------------------------- |
| display    | DM Sans          | 700    | 2.5rem  | Main headlines, article titles     |
| body       | DM Sans          | 500    | 1rem    | Article text, feed cards          |
| mono       | JetBrains Mono   | 500    | 0.875rem | Data, timestamps, classifications |

## Structural Zones
| Zone                 | Background                | Treatment                               |
| -------------------- | ------------------------- | --------------------------------------- |
| Header               | primary (navy)            | white text, tagline right, nav links    |
| Main Content         | background (dark)         | card-dense grid, news feed primary zone |
| Cards (News/Video)   | card (subtle elevation)   | 1px border, hover accent border glow    |
| Status Badges        | chart-* (color-coded)     | bold font, px-2 py-1, no radius         |
| Dashboard Stats      | muted/40 (secondary bg)   | stat cards, charts with accent accent   |
| Footer               | background/card overlay   | border-t, secondary-foreground text     |

## Component Patterns
- **News Card**: headline + summary + Truth Score badge + Bias/Source/Classification tags + article image (if available)
- **Live Video Badge**: LIVE (red), UPCOMING (amber), ENDED (muted) status labels
- **Stat Card**: icon + metric + label, grid layout in dashboard
- **Navigation**: horizontal primary nav in header, dark navy background, white text

## Motion & Interaction
- **Transitions**: 0.3s cubic-bezier(0.4, 0, 0.2, 1) for all interactive states
- **Hover State**: card border changes to accent (saffron), subtle shadow lift
- **Truth Badge Animation**: pulse effect on Truth Score updates (optional, spec later)

## Constraints
- No thin font weights (700+ bold only)
- No light backgrounds; dark mode primary
- Every news card must display Truth Score, Bias Indicator, Source Reliability, Classification
- No rounded corners on badges (institutional severity)
- Saffron accent used sparingly — highlight only, not decoration

## Learnings
Dark mode enforces discipline: every surface must be intentionally elevated to create hierarchy.
