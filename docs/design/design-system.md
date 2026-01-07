# Sesame3 Design System — The "Rich & Calm" Aesthetic

## Core Philosophy

Sesame3 is designed to be a **Calm Command Center** for stressed high school students. It balances two opposing needs:
1.  **Calmness:** Reducing anxiety through warm colors, soft shapes, and focused views.
2.  **Richness:** Providing deep, substantive data (plans, chances, portfolio) without overwhelming the user.

---

## 1. Color Palette

### The Warm Foundation (Backgrounds)
Instead of clinical white/gray, we use "paper" tones to feel grounded and organic.

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-app` | `#FDFCF8` | Main application background (Very warm off-white) |
| `--bg-sidebar` | `#F7F5F0` | Sidebar and secondary backgrounds |
| `--bg-card` | `#FFFFFF` | Cards and elevated surfaces |
| `--bg-card-hover` | `#FCFCFA` | Hover states for cards |

### The Trustworthy Accent (Teal)
We use a deep, natural Teal instead of "Startup Blue" or "Alert Red."

| Token | Hex | Usage |
|-------|-----|-------|
| `--accent-primary` | `#12756A` | Primary actions, active states, key data |
| `--accent-hover` | `#0F6158` | Hover state for primary buttons |
| `--accent-surface` | `#E8F5F3` | Subtle backgrounds for accents |
| `--accent-border` | `#C8EAE6` | Borders for active/focused elements |

### Text & Functional
| Token | Hex | Usage |
|-------|-----|-------|
| `--text-main` | `#2D2A26` | Primary text (Soft Black, never pure #000) |
| `--text-muted` | `#6B665E` | Secondary text, labels, icons |
| `--text-light` | `#9E988E` | Placeholders, timestamps |
| `--border-subtle` | `#ECEAE4` | Dividers, card borders |

### Status Indicators
| Status | Background | Text | Meaning |
|--------|------------|------|---------|
| **Success / Strong** | `#EAF7ED` | `#145935` | On track, strong pillar, completed |
| **Warning / Building** | `#FEFCE8` | `#854D0E` | Needs attention, deadline soon |
| **Gap / Alert** | `#FEF2F2` | `#B91C1C` | Missing requirement (Use sparingly) |
| **Info / Resource** | `#F0F9FF` | `#0C4A6E` | Tips, insights, resources |

---

## 2. Typography

We pair a confident, modern display font with a clean, legible body font.

*   **Headings:** `Satoshi` (Weights: 500, 700) — Modern, geometric but friendly.
*   **Body:** `Inter` (Weights: 400, 500, 600) — Highly legible UI text.
*   **Data:** `JetBrains Mono` (Weight: 500) — For percentages, grades, and stats.

---

## 3. Component Library

### Buttons
*   **Primary:** Solid Teal (`#12756A`), White Text, `12px` radius. Soft shadow (`0 4px 12px rgba(0,0,0,0.1)`).
*   **Secondary:** White, Border (`#E0DCD4`), Text Main.
*   **Ghost/Icon:** Transparent, Text Muted, Hover to Text Main.

### Cards
*   **Style:** White background, 1px subtle border (`#ECEAE4`), `20px` border radius (Large/Friendly).
*   **Shadow:** Large, diffused shadow (`0 4px 20px rgba(45, 42, 38, 0.03)`).
*   **Interaction:** On hover, slight lift (`translateY(-2px)`) and border color shift to Accent.

### The "Focus" Widget
A signature component that combines task management with resources.
*   **Layout:** Split view (Task Left, Resources Right).
*   **Visuals:** Uses a "Blob" background gradient for softness.
*   **Micro-interactions:** Checklist items with satisfying "Done" states (strikethrough + opacity).

### Status Pills
*   **Shape:** Pill (Full radius).
*   **Typography:** Uppercase, 11px, Tracking `0.05em`, Bold.
*   **Usage:** To label school difficulty (Reach/Target), Pillar status (Strong/Building).

### Progress Rings
*   **Style:** Minimal SVG rings.
*   **Track:** Sidebar BG color (`#F7F5F0`).
*   **Fill:** Accent Primary (`#12756A`) with rounded caps.

---

## 4. Visual Metaphors

### "The Map" vs. "The List"
*   Prefer **Timelines** (Vertical lines connecting dots) over static tables for dates.
*   This implies a *journey* and *momentum*.

### "The Ticket"
*   Used for "Dream Schools" or major goals.
*   Visual cues: Left-border accent strip, slightly different background color (`#FAFAF9`), horizontal layout.

### "The Advisor"
*   A specific pattern for AI insights.
*   **Avatar:** "AI" or Persona Icon.
*   **Container:** Sidebar BG color, rounded.
*   **Tone:** Encouraging, specific, actionable.

---

## 5. Iconography
*   **Set:** `Lucide` Icons.
*   **Style:** Stroke width 2px.
*   **Color:** Muted by default, Accent for active states.
