# Sesame3 App — Information Architecture

## Overview

Sesame3 is a college counseling platform designed for stressed high school students navigating the college preparation journey. The app serves as a supportive coach that helps students stay calm AND productive.

**Core Philosophy:**
- Warm, supportive, not clinical
- Reduce anxiety while driving action
- Connect every task to meaningful outcomes
- Adapt to the student's stage (9th-12th grade)

---

## Product Hierarchy

The app is organized around a nested goal structure:

```
DREAM SCHOOLS (The destination)
│
├── Stanford, MIT, UCLA, etc.
├── Each has: chance %, requirements per pillar, deadlines
│
└── PILLARS (The categories that matter for admission)
    │
    ├── Academics (GPA, course rigor, transcript)
    ├── Testing (SAT, ACT, AP scores)
    ├── Activities (clubs, sports, jobs, leadership)
    ├── Programs (summer, research, internships)
    ├── Awards (competitions, honors, recognition)
    └── Applications (essays, rec letters, forms) — 11th/12th only
        │
        └── GOALS (Specific objectives within each pillar)
            │
            ├── Example: "Get summer research experience"
            ├── Example: "Qualify for AIME"
            ├── Example: "Launch nonprofit to 500 users"
            │
            └── OPPORTUNITIES (Concrete things being pursued)
                │
                ├── Example: "Stanford SIMR" (status: applying)
                ├── Example: "UCSB SRA" (status: researching)
                │
                └── TASKS (Action items to complete)
                    │
                    ├── "Write personal statement"
                    ├── "Request rec from Mr. Chen"
                    └── "Submit application"
```

---

## Navigation Structure

### Primary Navigation (5 tabs)

| Tab | Purpose | Key Content |
|-----|---------|-------------|
| **Dashboard** | Entry point, daily check-in | Reassurance, quick actions, priorities, wins, dream school status |
| **Plan** | Goals → Opportunities → Tasks | Full planning hierarchy, progress tracking |
| **Portfolio** | Pillar data ("what I have") | Academics, Testing, Activities, Programs, Awards, Applications |
| **Schools** | Target destinations | School list, chances, requirements, deadlines, comparison |
| **Discover** | Search & browse | Find programs, schools, competitions, scholarships to add |

### User Flow

```
DISCOVER → Find opportunity (e.g., "Stanford SIMR")
    ↓
PLAN → Add to Goal "Get summer research"
       Create tasks: application, essays, recs
    ↓
DASHBOARD → See priority: "Submit SIMR app"
            Mark done, add updates
    ↓
PORTFOLIO → Completed program appears under "Programs" pillar
    ↓
SCHOOLS → Chance at Stanford increases
```

---

## Dashboard Structure

The dashboard is the emotional center of the app — designed to reduce anxiety while driving action.

### Layout (Desktop)

```
┌─────────────────────────────────────────────────────────────────┐
│ SIDEBAR (220px)              MAIN CONTENT                       │
│                                                                  │
│ Logo                   ┌─────────────────────┬─────────────────┐│
│                        │ Greeting            │                 ││
│ Dashboard (active)     │ Status Banner       │                 ││
│ Plan                   ├─────────────────────┤  This Week      ││
│ Portfolio              │ Quick Actions       │  (wins)         ││
│ Schools                │ (input section)     │                 ││
│ Discover               ├─────────────────────┤  Your Journey   ││
│                        │ #1 Priority         │  (progress)     ││
│                        │ (hero card)         │                 ││
│                        ├─────────────────────┤  Dream School   ││
│                        │ + More priorities   │  (chance %)     ││
│ ─────────────          ├─────────────────────┤                 ││
│ User Profile           │ Goals (progress)    │                 ││
│ (avatar, name, grade)  ├─────────────────────┤                 ││
│                        │ Coming Up           │                 ││
│                        │ (milestones)        │                 ││
│                        └─────────────────────┴─────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

### Dashboard Components

| Component | Purpose |
|-----------|---------|
| **Greeting** | Personalized "Hey [Name]" |
| **Status Banner** | Reassurance: "You're on track — ahead of X% of students" |
| **Quick Actions** | Buttons: Log update, Ask question, Focus, Overwhelmed |
| **Text Input** | Free-form: "Tell me what's on your mind..." |
| **Priority Hero** | #1 task with impact, encouragement, and action buttons |
| **More Priorities** | Collapsed list of additional priorities |
| **Goals** | Progress bars for active goals |
| **Coming Up** | Calendar view of upcoming milestones |
| **This Week (Wins)** | Celebration of recent accomplishments |
| **Your Journey** | Visual progress through 9th-12th grade |
| **Dream School** | Target school with chance % and factor breakdown |

---

## Student Stages

The app adapts based on the student's grade level:

| Stage | Grade | Focus | Dashboard Emphasis |
|-------|-------|-------|-------------------|
| **Profile Building** | 9th-10th | Activities, academics, summer programs | Goals, opportunities, exploration |
| **Testing & Growth** | 11th | SAT/ACT, leadership, research | Test prep, awards, program results |
| **Application** | 12th | Essays, applications, decisions | Deadlines, submissions, decisions |

---

## Pillars (Portfolio Sections)

Each pillar represents a category of the student's profile:

| Pillar | Contains | Examples |
|--------|----------|----------|
| **Academics** | GPA, courses, transcript, class rank | 4.2 GPA, 8 APs, top 5% |
| **Testing** | SAT, ACT, AP exams, subject tests | SAT 1520, AP Calc 5 |
| **Activities** | Clubs, sports, jobs, hobbies | Robotics Club President, varsity tennis |
| **Programs** | Summer, research, internships | Stanford SIMR, Google CSSI |
| **Awards** | Competitions, honors, recognition | USAMO qualifier, National Merit |
| **Applications** | Essays, rec letters, forms | UC PIQs, Common App, CSS Profile |

---

## Key Interactions

### Check-in Flow
When student clicks "Log an update" or types in the input:
1. AI acknowledges what they share
2. Updates relevant goals/tasks if applicable
3. Provides encouragement or guidance
4. May suggest next actions

### Priority Actions
Each priority shows:
- Task/deadline name
- Parent context (which goal/opportunity)
- Impact ("Could boost chances by X%")
- Encouragement message
- Action buttons: "Mark Done" / "I need help"

### Dream School Tracking
- Shows current projected chance %
- Contextualizes ("Normal for 10th grader")
- Breaks down by pillar (Strong/Building/Gap)
- Shows trajectory (+X% this month)
- Projects impact of completing key goals

---

## Design Principles

### Emotional Design
1. **Reassure first** — Tell them they're on track before showing work
2. **Show momentum** — Celebrate wins and progress
3. **Connect to WHY** — Every task links to impact on chances
4. **Reduce overwhelm** — Show #1 priority, collapse the rest
5. **Be human** — "I'll walk you through it" not "Complete form"

### Visual Design
- **Warm palette** — Beige family, not clinical gray
- **Teal accent** — Calming, pairs with warm colors
- **Lucide icons** — Consistent, professional, not emoji
- **Generous whitespace** — Breathing room, not cramped
- **Clear hierarchy** — Priority hero > goals > milestones

---

## Mobile Considerations

- Bottom navigation (5 tabs)
- Priority hero takes full width
- Side panel content stacks below main content
- Quick actions scroll horizontally
- Touch-friendly tap targets (44px minimum)

---

## Data Model (Simplified)

```
Student
├── name, grade, email
├── dreamSchools: [School]
├── pillars: { academics, testing, activities, programs, awards, applications }
├── goals: [Goal]
└── stage: "profile_building" | "testing" | "application"

School
├── name, location, type
├── chance: number (calculated)
├── requirements: per pillar
└── deadlines: [Deadline]

Goal
├── title, pillar, status
├── progress: number
├── impact: string
└── opportunities: [Opportunity]

Opportunity
├── name, type, status
├── deadline, source
└── tasks: [Task]

Task
├── title, status, priority
├── dueDate
└── parentOpportunity
```

---

## Next Steps

1. **Plan Page** — Full goal hierarchy with CRUD operations
2. **Portfolio Page** — Pillar data entry and management
3. **Schools Page** — School list and comparison
4. **Discover Page** — Search and browse opportunities
5. **Mobile Layouts** — Responsive design implementation
6. **AI Chat** — Conversational interface for check-ins and questions

