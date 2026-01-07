# Sesame3 Product Design System

> Design system for the application (`02_app`) — student dashboard, profile builder, matching engine, data-heavy interfaces.

---

## Overview

The product design system extends the marketing design system with additional patterns for:
- **Data-dense interfaces** (dashboards, lists, tables)
- **Interactive components** (forms, selects, toggles)
- **Application navigation** (sidebar, tabs, breadcrumbs)
- **Feedback patterns** (alerts, toasts, progress indicators)
- **Complex widgets** (deadline trackers, school cards, opportunity matches)

The visual language remains consistent with marketing (dark theme, cyan accent, bold typography) but optimizes for **usability, scannability, and repeated use**.

---

## Design Principles

### 1. Clarity Over Cleverness
Students are stressed. Parents are anxious. Every piece of information should be immediately clear. No ambiguity.

### 2. Action-Oriented
Every screen should answer: "What should I do next?" Surface the most important action prominently.

### 3. Progressive Disclosure
Show the essential first. Let users drill down for details. Don't overwhelm on first view.

### 4. Celebrate Progress
The college process is long. Acknowledge wins, show progress, create moments of delight.

### 5. Data with Context
Numbers alone aren't helpful. "23% chance" means nothing without comparison. Always provide context.

---

## Color Palette

Inherits all colors from marketing design system, plus:

### Application-Specific Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--s3-reach` | `#EF4444` (error) | Reach schools (<25% chance) |
| `--s3-match` | `#FACC15` (warning) | Match schools (25-60% chance) |
| `--s3-safety` | `#22C55E` (success) | Safety schools (>60% chance) |
| `--s3-sidebar-bg` | `#0D0D0D` | Sidebar background |
| `--s3-sidebar-active` | `rgba(0, 229, 255, 0.08)` | Active nav item bg |

### State Colors (Extended)

| State | Color | Usage |
|-------|-------|-------|
| Complete | `--s3-success` | Completed tasks, submitted apps |
| In Progress | `--s3-cyan` | Currently working on |
| Not Started | `--s3-text-muted` | Pending items |
| Overdue | `--s3-error` | Missed deadlines |
| Due Soon | `--s3-warning` | Approaching deadlines |

---

## Typography (Product Adjustments)

### Reduced Display Sizes for App Context

| Style | Font | Size | Usage |
|-------|------|------|-------|
| **Page Title** | Bebas Neue | 36px | Dashboard headers |
| **Section Title** | Bebas Neue | 24px | Card/widget headers |
| **Card Title** | DM Sans | 18px, 600 | Individual item titles |
| **Body** | DM Sans | 14px | Primary content |
| **Small** | DM Sans | 13px | Secondary content |
| **Caption** | DM Sans | 12px | Labels, metadata |
| **Data Large** | JetBrains Mono | 28px | Primary statistics |
| **Data Medium** | JetBrains Mono | 20px | Secondary statistics |
| **Data Small** | JetBrains Mono | 14px | Inline data |

---

## Layout Patterns

### Application Shell

```
+-------------------+------------------------------------------+
|  SIDEBAR (240px)  |  MAIN CONTENT                            |
|                   |                                          |
|  +--------------+ |  +------------------------------------+  |
|  | Logo         | |  | Page Header                        |  |
|  +--------------+ |  | Title + Actions                    |  |
|                   |  +------------------------------------+  |
|  +--------------+ |                                          |
|  | Navigation   | |  +------------------------------------+  |
|  | - Dashboard  | |  |                                    |  |
|  | - Schools    | |  |  Page Content                      |  |
|  | - Profile    | |  |                                    |  |
|  | - Programs   | |  |                                    |  |
|  | - Deadlines  | |  |                                    |  |
|  | - Essays     | |  |                                    |  |
|  +--------------+ |  |                                    |  |
|                   |  +------------------------------------+  |
|  +--------------+ |                                          |
|  | User Menu    | |                                          |
|  +--------------+ |                                          |
+-------------------+------------------------------------------+
```

### Sidebar Specifications
- Width: 240px (collapsible to 64px on mobile)
- Background: `--s3-sidebar-bg` (#0D0D0D)
- Logo: Compact mark version (S3)
- Nav items: 44px height, 16px horizontal padding
- Active state: cyan-subtle background, cyan left border
- Icons: 20px, with 12px gap to label

### Main Content Area
- Max width: 1200px (centered)
- Padding: 32px
- Background: `--s3-bg-primary`

### Page Header
- Height: auto
- Padding bottom: 24px
- Border bottom: 1px solid `--s3-border`
- Contains: Page title (Bebas Neue 36px), action buttons (right-aligned)

---

## Navigation Components

### Sidebar Navigation Item

```
+----------------------------------------+
| [Icon]  Label                  [Badge] |
+----------------------------------------+
```

**States:**
- Default: text-secondary, transparent bg
- Hover: text-primary, elevated bg
- Active: cyan text, cyan-subtle bg, 3px cyan left border

### Tabs

```
+------------------------------------------------+
|  [Active]     Inactive     Inactive     Inactive |
|  ---------                                       |
+------------------------------------------------+
```

- Font: 14px, 500 weight
- Active: white text, cyan underline (3px)
- Inactive: secondary text
- Spacing: 24px between tabs

### Breadcrumbs

```
Dashboard  /  Schools  /  Stanford University
```

- Font: 13px
- Separator: `/` in muted color
- Current: white
- Previous: cyan, clickable

---

## Data Components

### School Card

```
+----------------------------------------------------+
|  +----------+                                      |
|  |  Logo    |  Stanford University                 |
|  |          |  Stanford, CA - Private - Reach      |
|  +----------+                                      |
|                                                    |
|  +------------+  +------------+  +------------+    |
|  |    23%     |  |  Jan 2     |  |   75%      |    |
|  |   Chance   |  |  Deadline  |  |  Complete  |    |
|  +------------+  +------------+  +------------+    |
|                                                    |
|  [View Details]                       [Remove] X   |
+----------------------------------------------------+
```

- Background: `--s3-bg-elevated`
- Border: `--s3-border`
- Border Radius: 12px
- Padding: 24px
- Hover: border-color to cyan

### Stat Widget

```
+-------------------------+
|  LABEL (muted caps)     |
|  ---------------------  |
|  VALUE (mono, large)    |
|  ^ Trend / Context      |
+-------------------------+
```

- Background: `--s3-bg-elevated`
- Padding: 20px
- Value color: cyan for positive, white for neutral

### Deadline Row

```
+---------------------------------------------------------------+
|  [Clock]  Regular Decision - Stanford  |  ||||....  |  5 days |
|           University                    |    80%    |         |
+---------------------------------------------------------------+
```

- Row height: 64px
- Icon: 40px container with status-colored bg
- Progress bar: 8px height
- Days remaining: mono font, warning/error color when urgent

### Opportunity Match Card

```
+----------------------------------------------------+
|  [FEATURED]  94% Match                             |
|                                                    |
|  Stanford SIMR                                     |
|  8-week STEM research program                      |
|                                                    |
|  Location: Stanford, CA  |  Deadline: Mar 15      |
|                                                    |
|  [Apply Now ->]                                    |
+----------------------------------------------------+
```

- Match percentage: Large mono number, cyan
- Featured badge: Cyan background
- Metadata: Icons with muted labels

---

## Form Components

### Text Input

```
+------------------------------------+
|  Label                             |
|  +------------------------------+  |
|  | Placeholder text...          |  |
|  +------------------------------+  |
|  Helper text (optional)            |
+------------------------------------+
```

- Input height: 44px
- Background: `--s3-bg-primary`
- Border: `--s3-border`
- Border Radius: 8px
- Focus: Cyan border, cyan subtle glow (0 0 0 3px)
- Error: Red border, red subtle glow

### Select / Dropdown

```
+----------------------------------+
|  Selected Option              v  |
+----------------------------------+
        |
        v
+----------------------------------+
|  Option 1                        |
|  Option 2  [check]               |
|  Option 3                        |
+----------------------------------+
```

- Same styling as input
- Dropdown: `--s3-bg-elevated`, shadow-lg
- Selected: Cyan check mark

### Toggle

```
OFF: [----O---]    ON: [---O----]
                       (cyan bg)
```

- Width: 44px, Height: 24px
- Off: `--s3-bg-surface` background
- On: `--s3-cyan` background
- Knob: 20px white circle

### Checkbox

```
[ ] Unchecked    [X] Checked (cyan bg, white check)
```

- Size: 20px
- Border Radius: 4px
- Checked: Cyan background

### Radio Button

```
( ) Unselected    (*) Selected (cyan ring, cyan dot)
```

- Outer ring: 20px
- Inner dot: 10px

---

## Feedback Components

### Toast Notification

```
+--------------------------------------------------+
|  [check]  Application submitted successfully  [x] |
+--------------------------------------------------+
```

- Position: Top-right, 24px from edges
- Background: `--s3-bg-elevated`
- Border-left: 4px solid (success/error/warning/info)
- Auto-dismiss: 5 seconds
- Manual dismiss: x button

### Alert Banner

```
+--------------------------------------------------------------+
|  [!]  UC applications are due in 5 days. You're 80% done.    |
|                                            [Finish Now ->]    |
+--------------------------------------------------------------+
```

- Background: Status-subtle color
- Border: 1px solid status color (30% opacity)
- Icon: 20px, status color
- Full-width or contained within context

### Progress Indicator

```
Linear:  [========------]  65%

Circular:    /---\
            | 65% |
             \---/
```

- Track: `--s3-border`
- Fill: `--s3-cyan`
- Height: 8px (linear)

### Empty State

```
+------------------------------------------------+
|                                                |
|           [Illustration / Icon]                |
|                                                |
|           No schools added yet                 |
|     Start by searching for colleges you're     |
|            interested in.                      |
|                                                |
|              [Add Schools]                     |
|                                                |
+------------------------------------------------+
```

- Centered vertically and horizontally
- Icon/illustration: 80px, muted
- Title: 18px, white
- Description: 14px, secondary
- CTA: Primary button

---

## Modal / Dialog

```
+-- Overlay (black 60% opacity) --------------------------+
|                                                         |
|   +------------------------------------------------+   |
|   |  Modal Title                               [x] |   |
|   |  ------------------------------------------    |   |
|   |                                                |   |
|   |  Modal content goes here...                    |   |
|   |                                                |   |
|   |  ------------------------------------------    |   |
|   |                  [Cancel]  [Confirm Action]    |   |
|   +------------------------------------------------+   |
|                                                         |
+---------------------------------------------------------+
```

- Background: `--s3-bg-elevated`
- Border Radius: 16px
- Max width: 480px (small), 640px (medium), 800px (large)
- Shadow: `--s3-shadow-lg`
- Overlay: #000 at 60% opacity

---

## Table / List

### Table Header

```
+--------------------------------------------------------------+
|  School ^        Location        Chance        Deadline      |
+--------------------------------------------------------------+
```

- Background: `--s3-bg-secondary`
- Font: 12px, uppercase, muted, 0.1em tracking
- Sortable: Arrow indicator

### Table Row

```
|  Stanford        Stanford, CA    23%           Jan 2         |
```

- Height: 56px
- Border-bottom: 1px solid `--s3-border`
- Hover: `--s3-bg-elevated` background

---

## Special Widgets

### Chance Meter

```
           REACH    MATCH    SAFETY
             *----------------------*
                      v
                    23%
```

- Track shows gradient from red to yellow to green
- Indicator shows current position
- Percentage below in mono font

### Profile Strength

```
+--------------------------------------+
|  Profile Strength                    |
|  [========================------] 72%|
|                                      |
|  [x] Academics complete              |
|  [x] Activities added                |
|  [ ] Test scores missing             |
|  [ ] Essays not started              |
+--------------------------------------+
```

- Progress bar with segments
- Checklist of profile sections

### Comparison View (Gap Analysis)

```
+-------------------------------------------------------------+
|  YOUR PROFILE  vs  STANFORD ADMITS                          |
+-------------------------------------------------------------+
|  GPA           3.87         4.15 avg    v Below             |
|  SAT           1520         1540 avg    ~ On target         |
|  APs           5            6-8 avg     v Below             |
|  Leadership    2 roles      3+ typical  v Below             |
|  Research      0            1+ typical  x Gap               |
+-------------------------------------------------------------+
```

- Side-by-side comparison
- Color-coded status indicators
- Gap highlights in error color

---

## Responsive Behavior

### Breakpoints

| Name | Width | Sidebar |
|------|-------|---------|
| Desktop | >= 1024px | 240px expanded |
| Tablet | 768-1023px | 64px collapsed (icons only) |
| Mobile | < 768px | Hidden (hamburger menu) |

### Mobile Adaptations
- Sidebar becomes bottom navigation or hamburger
- Cards stack vertically
- Tables become list views
- Modals become full-screen sheets

---

## Animation and Micro-interactions

### Sidebar Collapse
- Duration: 200ms
- Easing: ease-out
- Labels fade out, icons remain

### Card Interactions
- Hover: 150ms lift (translateY -2px)
- Click: Quick press (scale 0.98)

### Data Loading
- Skeleton screens with subtle pulse animation
- Progress bars animate fill

### Success States
- Brief celebratory animation (confetti, checkmark)
- Toast slides in from top-right

---

## Accessibility (Product-Specific)

### Keyboard Navigation
- All interactive elements focusable
- Tab order follows visual order
- Escape closes modals
- Arrow keys navigate lists

### Screen Reader
- Proper heading hierarchy
- ARIA labels on icon-only buttons
- Live regions for dynamic updates
- Progress announcements

### Color Blindness
- Don't rely on color alone (use icons, text)
- Reach/Match/Safety have distinct shapes
- Test with colorblind simulators

---

## File Structure

```
02_app/
  app/
    (auth)/              # Authentication pages
      login/
      signup/
      forgot-password/
    (dashboard)/         # Main app (authenticated)
      layout.tsx         # Sidebar + main content
      page.tsx           # Dashboard home
      schools/
      profile/
      programs/
      deadlines/
      essays/
    globals.css
    layout.tsx
  components/
    ui/                  # Base components
      Button.tsx
      Input.tsx
      Select.tsx
      Toggle.tsx
      Badge.tsx
      Card.tsx
      Modal.tsx
      Toast.tsx
      Progress.tsx
    layout/              # App layout components
      Sidebar.tsx
      Header.tsx
      PageHeader.tsx
      MobileNav.tsx
    features/            # Feature-specific components
      schools/
      profile/
      programs/
      deadlines/
  lib/
    utils.ts
    constants.ts
```

---

## Next Steps: Application Architecture

Before building, we should define:

1. **Information Architecture** - What pages/sections exist?
2. **Data Model** - What entities and relationships?
3. **User Flows** - Key journeys through the app
4. **API Design** - How does frontend talk to backend?
5. **Authentication** - How do users sign in?
6. **State Management** - Client-side data handling

*See separate application architecture document for detailed planning.*
