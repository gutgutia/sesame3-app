# Sesame3 Marketing Design System

> Design system for the marketing website (`01_website`) — landing pages, pricing, conversion-focused content.

---

## Brand Identity

### Logo Variants

| Variant | Usage | Example |
|---------|-------|---------|
| **Stacked** | Primary usage, headers, hero sections | SESAME (white) + 3 (cyan) stacked vertically |
| **Inline** | Secondary, compact spaces, footer | SESAME3 (white + cyan inline) |
| **Mark** | Favicon, social icons, app icon | S3 in cyan rounded box |

### Brand Voice

**Tone:** Confident, direct, no-BS. Like a smart friend who knows how college admissions works.

**We are:**
- The advisor who actually gets it
- Smart, a little irreverent, zero fluff
- Cutting through chaos with real talk and real tools

**We are NOT:**
- A stuffy institution that talks at you
- A fear-mongering service that profits off anxiety
- A "how do you do, fellow kids" brand forcing slang

**Key phrases:**
- "The college process is chaos. We fix that."
- "No more 47 open tabs."
- "College Prep. Reimagined."

---

## Color Palette

### Background Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--s3-bg-primary` | `#0A0A0A` | Main page background |
| `--s3-bg-secondary` | `#111111` | Alternating sections |
| `--s3-bg-elevated` | `#1A1A1A` | Cards, elevated surfaces |
| `--s3-bg-surface` | `#222222` | Inputs, nested elements |

### Brand Accent (Cyan)

| Token | Value | Usage |
|-------|-------|-------|
| `--s3-cyan` | `#00E5FF` | Primary accent, CTAs, highlights |
| `--s3-cyan-hover` | `#4DFFFF` | Hover states |
| `--s3-cyan-active` | `#00B8CC` | Active/pressed states |
| `--s3-cyan-subtle` | `rgba(0, 229, 255, 0.12)` | Subtle backgrounds, badges |
| `--s3-cyan-glow` | `rgba(0, 229, 255, 0.3)` | Glow effects, shadows |

### Text Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--s3-text-primary` | `#FFFFFF` | Headlines, primary content |
| `--s3-text-secondary` | `#888888` | Body text, descriptions |
| `--s3-text-muted` | `#555555` | Labels, hints, timestamps |
| `--s3-text-inverse` | `#000000` | Text on cyan backgrounds |

### Border Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--s3-border` | `rgba(255, 255, 255, 0.08)` | Default borders |
| `--s3-border-hover` | `rgba(255, 255, 255, 0.15)` | Hover states |
| `--s3-border-active` | `rgba(255, 255, 255, 0.25)` | Active/focus states |

### Semantic Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--s3-success` | `#22C55E` | Success states, positive trends |
| `--s3-success-subtle` | `rgba(34, 197, 94, 0.12)` | Success backgrounds |
| `--s3-warning` | `#FACC15` | Warnings, deadlines approaching |
| `--s3-warning-subtle` | `rgba(250, 204, 21, 0.12)` | Warning backgrounds |
| `--s3-error` | `#EF4444` | Errors, urgent deadlines |
| `--s3-error-subtle` | `rgba(239, 68, 68, 0.12)` | Error backgrounds |
| `--s3-info` | `#3B82F6` | Informational states |
| `--s3-info-subtle` | `rgba(59, 130, 246, 0.12)` | Info backgrounds |

---

## Typography

### Font Families

| Font | Variable | Usage |
|------|----------|-------|
| **Bebas Neue** | `--font-display` | Headlines, display text, logos |
| **DM Sans** | `--font-body` | Body text, descriptions, UI |
| **JetBrains Mono** | `--font-mono` | Data, numbers, stats, code |

### Type Scale

| Style | Font | Size | Line Height | Usage |
|-------|------|------|-------------|-------|
| **Display Hero** | Bebas Neue | `clamp(60px, 10vw, 100px)` | 0.9 | Hero headlines |
| **Display 1** | Bebas Neue | 56px | 1.0 | Section headlines |
| **Display 2** | Bebas Neue | 48px | 1.0 | Sub-headlines |
| **Display 3** | Bebas Neue | 36px | 1.1 | Card titles |
| **Display 4** | Bebas Neue | 28px | 1.2 | Component headers |
| **Body Large** | DM Sans | 18px | 1.6 | Intro paragraphs |
| **Body** | DM Sans | 15px | 1.6 | Default body text |
| **Body Small** | DM Sans | 14px | 1.5 | Supporting text |
| **Label Caps** | DM Sans | 12px | 1.2 | Section labels (uppercase, 0.15em tracking) |
| **Mono Data** | JetBrains Mono | 32px | 1.0 | Large statistics |
| **Mono Small** | JetBrains Mono | 14px | 1.4 | Dates, small data |

---

## Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--s3-space-1` | 4px | Tight spacing |
| `--s3-space-2` | 8px | Icon gaps, inline spacing |
| `--s3-space-3` | 12px | Input padding |
| `--s3-space-4` | 16px | Card padding (small) |
| `--s3-space-5` | 20px | Form groups |
| `--s3-space-6` | 24px | Grid gaps |
| `--s3-space-8` | 32px | Card padding (medium) |
| `--s3-space-10` | 40px | Container padding |
| `--s3-space-12` | 48px | Section padding (small) |
| `--s3-space-16` | 64px | Section padding (medium) |
| `--s3-space-20` | 80px | Section padding (large) |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--s3-radius-sm` | 4px | Small elements |
| `--s3-radius-md` | 8px | Inputs, small cards |
| `--s3-radius-lg` | 12px | Medium cards |
| `--s3-radius-xl` | 16px | Large cards, modals |
| `--s3-radius-full` | 9999px | Pills, buttons |

---

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--s3-shadow-sm` | `0 2px 8px rgba(0, 0, 0, 0.3)` | Subtle elevation |
| `--s3-shadow-md` | `0 4px 16px rgba(0, 0, 0, 0.4)` | Cards |
| `--s3-shadow-lg` | `0 8px 30px rgba(0, 0, 0, 0.5)` | Modals, dropdowns |
| `--s3-shadow-cyan` | `0 8px 30px rgba(0, 229, 255, 0.3)` | CTA hover glow |

---

## Components

### Buttons

#### Primary Button
- Background: `--s3-cyan`
- Text: `--s3-text-inverse` (black)
- Padding: 14px 28px
- Border Radius: `--s3-radius-full`
- Hover: `--s3-cyan-hover`, translateY(-2px), cyan glow shadow
- Uppercase, 0.05em letter-spacing, 600 weight

#### Secondary Button
- Background: transparent
- Text: `--s3-text-primary`
- Border: 2px solid `--s3-border-hover`
- Hover: border-color to white, subtle white background

#### Ghost Button
- Background: transparent
- Text: `--s3-text-secondary`
- Hover: text to white, subtle white background

#### Button Sizes
| Size | Padding | Font Size |
|------|---------|-----------|
| Small | 10px 20px | 12px |
| Default | 14px 28px | 14px |
| Large | 18px 36px | 16px |

### Cards

#### Feature Card
- Background: `--s3-bg-primary`
- Border: 1px solid `--s3-border`
- Padding: 40px
- No border radius (sharp edges for drama)
- Hover: border-color to cyan, translateY(-4px)
- Contains: icon (48x48 cyan subtle bg), title (Display 4), description

#### Stat Card
- Background: `--s3-bg-elevated`
- Border: 1px solid `--s3-border`
- Border Radius: `--s3-radius-xl`
- Padding: 24px
- Contains: label (muted caps), value (mono, cyan), trend (success)

### Badges

| Variant | Background | Text Color |
|---------|------------|------------|
| Cyan | `--s3-cyan-subtle` | `--s3-cyan` |
| Success | `--s3-success-subtle` | `--s3-success` |
| Warning | `--s3-warning-subtle` | `--s3-warning` |
| Error | `--s3-error-subtle` | `--s3-error` |
| Info | `--s3-info-subtle` | `--s3-info` |

- Padding: 4px 12px
- Border Radius: `--s3-radius-full`
- Font: 12px, 600 weight, uppercase

### Form Elements

#### Input
- Background: `--s3-bg-primary`
- Border: 1px solid `--s3-border`
- Border Radius: `--s3-radius-md`
- Padding: 12px 16px
- Font: 14px DM Sans
- Focus: border-color cyan, 3px cyan subtle box-shadow

#### Label
- Font: 13px, 500 weight
- Color: `--s3-text-secondary`
- Margin bottom: 8px

---

## Layout

### Container
- Max width: 1400px
- Padding: 40px horizontal
- Mobile padding: 24px

### Section
- Padding: 64px vertical (adjust per section)
- Border bottom: 1px solid `--s3-border` (optional between sections)

### Grid
- Gap: 24px default
- Responsive breakpoints:
  - Desktop: Full columns
  - Tablet (≤1024px): 2 columns max
  - Mobile (≤768px): 1 column

---

## Hero Section Pattern

```
┌──────────────────────────────────────────────────────────┐
│  [Label: "College Prep. Reimagined." - cyan caps]        │
│                                                          │
│  THE COLLEGE           ┌─────────────┐                   │
│  PROCESS IS            │ Stat Card 1 │   (floating,      │
│  CHAOS.                └─────────────┘    rotated)       │
│                                                          │
│  [Subtitle paragraph]  ┌─────────────┐                   │
│                        │ Stat Card 2 │                   │
│  [CTA Button] [Ghost]  └─────────────┘                   │
│                                                          │
│                        ┌─────────────┐                   │
│                        │ Stat Card 3 │                   │
│                        └─────────────┘                   │
└──────────────────────────────────────────────────────────┘
```

- Background: Radial gradient glows (cyan at 8% and 5% opacity)
- Pattern overlay: Subtle repeating circles (3% opacity)

---

## Animation Guidelines

### Transitions
- Default duration: 200ms
- Easing: ease or ease-out
- Properties to animate: transform, opacity, border-color, background-color

### Hover Effects
- Buttons: translateY(-2px), add shadow
- Cards: translateY(-4px), border-color to cyan
- Links: color transition

### Page Load (Optional)
- Stagger section reveals with animation-delay
- Fade up effect (translateY(20px) → 0, opacity 0 → 1)

---

## Accessibility

- Ensure 4.5:1 contrast ratio for text
- Cyan (#00E5FF) on dark backgrounds passes WCAG AA
- Focus states must be visible (cyan ring)
- Interactive elements need :focus-visible styles

---

## File Structure

```
01_website/
├── src/
│   ├── app/
│   │   ├── globals.css      # Design tokens + base styles
│   │   ├── layout.tsx       # Font loading
│   │   └── page.tsx
│   └── components/
│       ├── ui/
│       │   ├── Button.tsx
│       │   └── Card.tsx
│       ├── layout/
│       │   ├── Header.tsx
│       │   └── Footer.tsx
│       └── sections/
│           ├── Hero.tsx
│           ├── Features.tsx
│           └── ...
```





