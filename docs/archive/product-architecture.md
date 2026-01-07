# Sesame3 Product Architecture

> UI/UX Architecture for Prototype Development
> 
> Focus: Information Architecture + Key User Flows
> Platform: Mobile-first, responsive to desktop

---

## Design Principle: Mobile-First

Students live on their phones. Every design decision starts with mobile:

- **Bottom tab navigation** (not sidebar)
- **Thumb-friendly** - key actions within easy reach
- **Progressive disclosure** - don't overwhelm small screens
- **Quick capture** - photo upload, minimal typing
- **Responsive** - scales gracefully to tablet/desktop

---

## Core Concept: Stage-Adaptive Experience

The app adapts based on where the student is in their journey:

| Stage | Grade | Primary Mode | Focus |
|-------|-------|--------------|-------|
| **Building** | 9th-10th | Task-centric | Profile building, opportunity discovery |
| **Researching** | 11th early | Hybrid | School research, gap analysis, list building |
| **Applying** | 11th late - 12th | School-centric | Per-school execution, deadlines, essays |

The navigation structure stays consistent, but the **Dashboard content adapts** to surface what's relevant for each stage.

---

## Information Architecture

### Global Navigation (Mobile)

```
+----------------------------------------------------------+
|                                                          |
|                    [Page Content]                        |
|                                                          |
+----------------------------------------------------------+
|                                                          |
|   (o) Floating Chat Button (always visible)              |
|                                                          |
+----------------------------------------------------------+
| [Home]    [Schools]    [Profile]   [Programs]   [More]   |
+----------------------------------------------------------+
```

### Global Navigation (Desktop/Tablet)

```
+------------------------------------------------------------------+
| [Logo]                              [Search]  [Chat]  [Profile]  |
+------------------------------------------------------------------+
| Sidebar        |  Main Content                                    |
|                |                                                  |
| * Dashboard    |  +--------------------------------------------+  |
| * Schools      |  |                                            |  |
| * Profile      |  |            Page Content                    |  |
| * Programs     |  |                                            |  |
| * Deadlines    |  |                                            |  |
| -----          |  |                                            |  |
| * Settings     |  +--------------------------------------------+  |
+------------------------------------------------------------------+
```

---

## Page Structure

### 1. Home (Dashboard)

**Purpose:** Command center. "What should I do today?"

**Adapts by stage:**

#### Early Stage (9th-10th Grade)

```
+------------------------------------------+
| Welcome back, Alex                   [?] |
+------------------------------------------+

+------------------------------------------+
| PROFILE STRENGTH                         |
| [=======---------] 45%                   |
| Next: Add your activities                |
|                          [Continue ->]   |
+------------------------------------------+

+------------------------------------------+
| OPPORTUNITIES FOR YOU                    |
|                                          |
| +--------------------------------------+ |
| | Stanford SIMR           94% match    | |
| | 8-week research program              | |
| | Deadline: Mar 15        [View ->]    | |
| +--------------------------------------+ |
|                                          |
| +--------------------------------------+ |
| | COSMOS UC Program       89% match    | |
| | Summer STEM program                  | |
| | Deadline: Feb 1         [View ->]    | |
| +--------------------------------------+ |
|                                          |
| [See All Opportunities ->]               |
+------------------------------------------+

+------------------------------------------+
| EXPLORE SCHOOLS                          |
| Not sure where to apply yet? Start       |
| exploring colleges that match your       |
| interests.                               |
|                          [Explore ->]    |
+------------------------------------------+

+------------------------------------------+
| [chat icon] Ask me anything...           |
+------------------------------------------+
```

#### Late Stage (11th-12th Grade)

```
+------------------------------------------+
| Welcome back, Alex                   [?] |
+------------------------------------------+

+------------------------------------------+
| DEADLINES THIS WEEK                      |
|                                          |
| +--------------------------------------+ |
| | UC Applications              3 DAYS  | |
| | [========------] 80% complete        | |
| |                        [Continue ->] | |
| +--------------------------------------+ |
|                                          |
| +--------------------------------------+ |
| | Stanford RD             12 DAYS      | |
| | [====----------] 45% complete        | |
| |                        [Continue ->] | |
| +--------------------------------------+ |
|                                          |
| [See All Deadlines ->]                   |
+------------------------------------------+

+------------------------------------------+
| YOUR SCHOOLS                             |
|                                          |
| 8 schools on your list                   |
| 2 Reach  |  4 Match  |  2 Safety        |
|                                          |
| [Manage Schools ->]                      |
+------------------------------------------+

+------------------------------------------+
| ACTION ITEMS                             |
|                                          |
| [ ] Finish UC Essay #2                   |
| [ ] Request rec from Ms. Johnson         |
| [ ] Submit CSS Profile                   |
|                                          |
| [See All ->]                             |
+------------------------------------------+

+------------------------------------------+
| [chat icon] Ask me anything...           |
+------------------------------------------+
```

---

### 2. Schools

**Purpose:** Manage college list, track per-school progress

#### 2a. Schools List View

```
+------------------------------------------+
| MY SCHOOLS                    [+ Add]    |
+------------------------------------------+
| Filter: [All v]  Sort: [Deadline v]      |
+------------------------------------------+

REACH (2)
+------------------------------------------+
| Stanford University                      |
| 23% chance  |  Jan 2  |  45% complete   |
|                               [->]       |
+------------------------------------------+
| MIT                                      |
| 18% chance  |  Jan 1  |  30% complete   |
|                               [->]       |
+------------------------------------------+

MATCH (4)
+------------------------------------------+
| UCLA                                     |
| 52% chance  |  Nov 30  |  80% complete  |
|                               [->]       |
+------------------------------------------+
| UC Berkeley                              |
| 48% chance  |  Nov 30  |  80% complete  |
|                               [->]       |
+------------------------------------------+
...

SAFETY (2)
+------------------------------------------+
| UC San Diego                             |
| 78% chance  |  Nov 30  |  80% complete  |
|                               [->]       |
+------------------------------------------+
...
```

#### 2b. Add School (Search)

```
+------------------------------------------+
| ADD SCHOOL                          [X]  |
+------------------------------------------+
| [Search schools...]                      |
+------------------------------------------+

SUGGESTED FOR YOU
+------------------------------------------+
| Carnegie Mellon        Match (67%)       |
| Based on your CS interest     [+ Add]    |
+------------------------------------------+
| Georgia Tech           Match (71%)       |
| Based on your profile         [+ Add]    |
+------------------------------------------+

RECENT SEARCHES
+------------------------------------------+
| Northwestern University        [+ Add]   |
+------------------------------------------+
```

#### 2c. School Detail View

```
+------------------------------------------+
| [<] Back                                 |
+------------------------------------------+
| STANFORD UNIVERSITY                      |
| Stanford, CA  |  Private  |  REACH      |
+------------------------------------------+

+------------------------------------------+
| YOUR CHANCES                             |
|                                          |
|     REACH      MATCH      SAFETY        |
|       [*]--------[]---------[]          |
|              23%                         |
|                                          |
| Based on historical data for students    |
| with similar profiles.                   |
|                      [See Details ->]    |
+------------------------------------------+

+------------------------------------------+
| DEADLINE                                 |
| Regular Decision: January 2, 2025        |
| 12 days remaining                        |
+------------------------------------------+

+------------------------------------------+
| APPLICATION PROGRESS                     |
| [=====---------] 45%                     |
+------------------------------------------+

+------------------------------------------+
| REQUIREMENTS CHECKLIST                   |
|                                          |
| [x] Common App submitted                 |
| [x] Transcript requested                 |
| [ ] Stanford Essay 1 (0/650 words)       |
| [ ] Stanford Essay 2 (0/250 words)       |
| [ ] Stanford Essay 3 (0/250 words)       |
| [ ] Recommendation: Teacher 1            |
| [ ] Recommendation: Teacher 2            |
| [ ] Recommendation: Counselor            |
| [ ] Application fee / waiver             |
+------------------------------------------+

+------------------------------------------+
| GAP ANALYSIS                             |
| How you compare to admitted students     |
|                                          |
| GPA        You: 3.87  |  Avg: 4.15  [-] |
| SAT        You: 1520  |  Avg: 1540  [~] |
| APs        You: 5     |  Avg: 7     [-] |
| Leadership You: 2     |  Avg: 3+    [-] |
| Research   You: 0     |  Avg: 1+    [!] |
|                                          |
| [!] = Gap to address                     |
|                      [Get Advice ->]     |
+------------------------------------------+

+------------------------------------------+
|                            [Remove School]|
+------------------------------------------+
```

---

### 3. Profile

**Purpose:** Central data hub. The source of truth.

#### 3a. Profile Overview

```
+------------------------------------------+
| MY PROFILE                     [Edit]    |
+------------------------------------------+

+------------------------------------------+
| PROFILE STRENGTH                         |
| [==========--------] 65%                 |
|                                          |
| [x] Academics                            |
| [x] Test Scores                          |
| [x] Activities                           |
| [ ] Awards (incomplete)                  |
| [ ] Essays (not started)                 |
+------------------------------------------+

+------------------------------------------+
| ACADEMICS                       [Edit]   |
|                                          |
| GPA: 3.87 (Weighted: 4.42)              |
| Class Rank: Top 10%                      |
| Current Grade: 11th                      |
|                                          |
| 5 AP Courses | 3 Honors Courses          |
+------------------------------------------+

+------------------------------------------+
| TEST SCORES                     [Edit]   |
|                                          |
| SAT: 1520 (Math: 780, ERW: 740)         |
| AP World History: 4                      |
| AP Chemistry: 5                          |
+------------------------------------------+

+------------------------------------------+
| ACTIVITIES                      [Edit]   |
|                                          |
| * Robotics Team Captain (4 yrs)         |
| * Math Club VP (3 yrs)                  |
| * Volunteer Coding Instructor (2 yrs)   |
| + 4 more activities                      |
+------------------------------------------+

+------------------------------------------+
| AWARDS                          [Add]    |
|                                          |
| * National Merit Semifinalist           |
| * FIRST Robotics Regional Champion      |
+------------------------------------------+
```

#### 3b. Section Edit View (e.g., Activities)

```
+------------------------------------------+
| [<] ACTIVITIES                   [Done]  |
+------------------------------------------+

+------------------------------------------+
| [+ Add Activity]  [Upload Document]      |
+------------------------------------------+

+------------------------------------------+
| Robotics Team                   [Edit]   |
| Captain | 4 years | 15 hrs/week         |
| FIRST Robotics Team #4159               |
+------------------------------------------+

+------------------------------------------+
| Math Club                       [Edit]   |
| Vice President | 3 years | 5 hrs/week  |
| Competition team leader                  |
+------------------------------------------+

+------------------------------------------+
| Volunteer Coding Instructor     [Edit]   |
| Instructor | 2 years | 4 hrs/week       |
| Boys & Girls Club                        |
+------------------------------------------+

...
```

#### 3c. Add New Item (Smart Upload Flow)

```
STEP 1: Choose method
+------------------------------------------+
| ADD ACTIVITY                        [X]  |
+------------------------------------------+
|                                          |
| How would you like to add this?          |
|                                          |
| +--------------------------------------+ |
| | [camera] Take Photo                  | |
| | Snap your resume, activity list,     | |
| | or any document                      | |
| +--------------------------------------+ |
|                                          |
| +--------------------------------------+ |
| | [upload] Upload Document             | |
| | PDF, image, or document              | |
| +--------------------------------------+ |
|                                          |
| +--------------------------------------+ |
| | [pencil] Enter Manually              | |
| | Type in the details                  | |
| +--------------------------------------+ |
|                                          |
+------------------------------------------+

STEP 2: AI Processing (after upload)
+------------------------------------------+
| PROCESSING...                       [X]  |
+------------------------------------------+
|                                          |
|         [document preview]               |
|                                          |
|    Extracting information...             |
|    [====-------]                         |
|                                          |
+------------------------------------------+

STEP 3: Confirm Extracted Data
+------------------------------------------+
| CONFIRM DETAILS                     [X]  |
+------------------------------------------+
| We found this information:               |
+------------------------------------------+
|                                          |
| Activity Name                            |
| [Robotics Team                      ]    |
|                                          |
| Position/Role                            |
| [Captain                            ]    |
|                                          |
| Organization                             |
| [FIRST Robotics Team #4159          ]    |
|                                          |
| Years                                    |
| [4                                  ]    |
|                                          |
| Hours per Week                           |
| [15                                 ]    |
|                                          |
| Description                              |
| [Lead team of 35 students in        ]    |
| [designing and building robots...   ]    |
|                                          |
| +--------------------------------------+ |
| | [!] Please verify this is correct    | |
| +--------------------------------------+ |
|                                          |
|            [Cancel]    [Save Activity]   |
+------------------------------------------+
```

---

### 4. Programs (Opportunities)

**Purpose:** Discover summer programs, internships, research opportunities

#### 4a. Programs Discovery

```
+------------------------------------------+
| OPPORTUNITIES                [Filters]   |
+------------------------------------------+
| [Search programs...]                     |
+------------------------------------------+

+------------------------------------------+
| FOR YOU                    [See All ->]  |
| Matched to your profile                  |
+------------------------------------------+

+--------------------------------------+
| [FEATURED]                 94% MATCH |
|                                      |
| Stanford SIMR                        |
| 8-week STEM research program         |
|                                      |
| Stanford, CA  |  Jun-Aug  |  Paid   |
| Deadline: Mar 15                     |
|                                      |
|            [Save]  [View Details ->] |
+--------------------------------------+

+--------------------------------------+
|                            89% MATCH |
|                                      |
| COSMOS UC                            |
| Summer STEM intensive                |
|                                      |
| Multiple CA  |  Jul-Aug  |  Free    |
| Deadline: Feb 1                      |
|                                      |
|            [Save]  [View Details ->] |
+--------------------------------------+

+------------------------------------------+
| BROWSE BY CATEGORY                       |
+------------------------------------------+
| [Research]  [Internships]  [Leadership] |
| [STEM]  [Arts]  [Community Service]     |
+------------------------------------------+

+------------------------------------------+
| BROWSE BY DEADLINE                       |
+------------------------------------------+
| [This Month]  [Next 3 Months]  [All]    |
+------------------------------------------+
```

#### 4b. Program Detail

```
+------------------------------------------+
| [<] Back                          [Save] |
+------------------------------------------+

+------------------------------------------+
| STANFORD SIMR                            |
| Stanford Institutes of Medicine Research |
+------------------------------------------+

+------------------------------------------+
| 94% MATCH                                |
| Based on your STEM interests and GPA    |
+------------------------------------------+

+------------------------------------------+
| QUICK FACTS                              |
|                                          |
| Duration:    8 weeks (Jun - Aug)        |
| Location:    Stanford, CA               |
| Cost:        Paid ($6,000 stipend)      |
| Housing:     Provided                    |
| Deadline:    March 15, 2025             |
+------------------------------------------+

+------------------------------------------+
| DESCRIPTION                              |
|                                          |
| The Stanford Institutes of Medicine      |
| Research (SIMR) program introduces       |
| high school students to biomedical       |
| research through hands-on laboratory     |
| experience...                            |
|                                          |
| [Read More v]                            |
+------------------------------------------+

+------------------------------------------+
| REQUIREMENTS                             |
|                                          |
| * Currently in 11th grade               |
| * GPA of 3.5 or higher                  |
| * Strong interest in STEM               |
| * 2 teacher recommendations             |
| * Personal statement                     |
+------------------------------------------+

+------------------------------------------+
| YOUR FIT                                 |
|                                          |
| [x] Grade requirement met               |
| [x] GPA requirement met (you: 3.87)     |
| [x] STEM interest indicated             |
+------------------------------------------+

+------------------------------------------+
|      [Track This Program]                |
|                                          |
|      [Visit Official Website ->]         |
+------------------------------------------+
```

#### 4c. My Programs (Tracking)

```
+------------------------------------------+
| MY PROGRAMS                              |
+------------------------------------------+
| [Saved]  [Applied]  [Accepted]           |
+------------------------------------------+

SAVED (3)
+------------------------------------------+
| Stanford SIMR              Due: Mar 15  |
| Not started               [Start App ->] |
+------------------------------------------+
| COSMOS UC                  Due: Feb 1   |
| Not started               [Start App ->] |
+------------------------------------------+

APPLIED (1)
+------------------------------------------+
| MIT PRIMES                 Applied: Dec 1|
| Waiting for decision                     |
+------------------------------------------+
```

---

### 5. AI Chat

**Purpose:** Contextual, conversational assistant accessible from anywhere

#### 5a. Chat Interface (Full Screen or Drawer)

```
+------------------------------------------+
| ADVISOR                             [X]  |
+------------------------------------------+

+------------------------------------------+
| Hi Alex! I can help you with:            |
|                                          |
| * College questions                      |
| * Profile improvement                    |
| * School recommendations                 |
| * Deadlines and planning                 |
| * Essay feedback                         |
|                                          |
| What's on your mind?                     |
+------------------------------------------+

+------------------------------------------+
|                                          |
| [User] What are my chances at Stanford?  |
|                                          |
+------------------------------------------+

+------------------------------------------+
| [AI] Based on your profile, I'd estimate |
| your chances at Stanford around 23%.     |
| Here's why:                              |
|                                          |
| Strengths:                               |
| * Strong SAT (1520)                      |
| * Excellent robotics leadership          |
| * Good GPA (3.87)                        |
|                                          |
| Areas to strengthen:                     |
| * Research experience (most admits       |
|   have some)                             |
| * Consider one more AP senior year       |
|                                          |
| Want me to suggest some research         |
| programs that could help?                |
|                                          |
| [Yes, show me] [No thanks]               |
+------------------------------------------+

+------------------------------------------+
| Type a message...              [Send ->] |
+------------------------------------------+
```

#### 5b. Context-Aware Suggestions

When launched from different pages, Chat knows context:

- **From Dashboard:** "What should I focus on this week?"
- **From School Detail:** "How can I improve my chances at [this school]?"
- **From Profile:** "What's missing from my profile?"
- **From Programs:** "Which programs would be best for me?"

---

### 6. More / Settings

```
+------------------------------------------+
| SETTINGS                                 |
+------------------------------------------+

+------------------------------------------+
| ACCOUNT                                  |
| Alex Chen                       [Edit]   |
| alex.chen@email.com                      |
+------------------------------------------+

+------------------------------------------+
| SHARE ACCESS                             |
| Invite family or counselor      [->]     |
+------------------------------------------+

+------------------------------------------+
| NOTIFICATIONS                            |
| Deadline reminders, updates     [->]     |
+------------------------------------------+

+------------------------------------------+
| HELP & SUPPORT                           |
| FAQs, Contact us                [->]     |
+------------------------------------------+

+------------------------------------------+
| ABOUT                                    |
| Version 1.0.0                            |
+------------------------------------------+

+------------------------------------------+
|              [Log Out]                   |
+------------------------------------------+
```

---

## Key User Flows

### Flow 1: New Student Onboarding

```
[Sign Up]
    |
    v
[Basic Info: Name, Email, Grade, School]
    |
    v
[Quick Profile Setup]
    |
    +-- Option A: "Upload transcript/resume"
    |       |
    |       v
    |   [AI extracts info]
    |       |
    |       v
    |   [Student confirms]
    |
    +-- Option B: "I'll add manually later"
    |
    v
[Add first schools (optional)]
    |
    +-- Search for schools
    +-- Or "Suggest schools for me"
    |
    v
[Dashboard - First time experience]
    |
    v
[Prompt: Complete your profile to unlock chances]
```

### Flow 2: Upload Document & Extract

```
[User in Profile > Activities]
    |
    v
[Tap "+ Add Activity"]
    |
    v
[Choose: Photo / Upload / Manual]
    |
    +-- [Take Photo]
    |       |
    |       v
    |   [Camera opens, snap document]
    |
    +-- [Upload Document]
            |
            v
        [File picker, select PDF/image]
    |
    v
[Processing: "Extracting information..."]
    |
    v
[Show extracted data in form fields]
    |
    v
[User reviews, edits if needed]
    |
    v
[Tap "Save"]
    |
    v
[Activity added to profile]
    |
    v
[Profile strength updates]
```

### Flow 3: Add School & See Chances

```
[User on Schools tab]
    |
    v
[Tap "+ Add School"]
    |
    v
[Search: "Stanford"]
    |
    v
[See search result: Stanford University]
    |
    v
[Tap "Add"]
    |
    v
[School added to list with initial chance %]
    |
    v
[User taps school to see detail]
    |
    v
[School detail: Chance meter, gap analysis, checklist]
    |
    v
[Option: "Get advice on improving chances" -> Chat]
```

### Flow 4: Daily Check-In (Late Stage Student)

```
[User opens app]
    |
    v
[Dashboard shows:]
    - Deadlines this week
    - Top action items
    |
    v
[User sees: "UC Essay 2 not complete"]
    |
    v
[Taps to go to UC school detail]
    |
    v
[Sees requirements checklist]
    |
    v
[Taps "Essay 2" to work on it]
    |
    v
[Essay editor / tracker]
```

### Flow 5: Discover Programs

```
[User on Programs tab]
    |
    v
[See "For You" matched programs]
    |
    v
[Tap program card]
    |
    v
[Program detail: description, requirements, fit]
    |
    v
[Tap "Track This Program"]
    |
    v
[Program saved to "My Programs"]
    |
    v
[Later: Shows in Dashboard as upcoming deadline]
```

### Flow 6: Ask the AI Advisor

```
[User on any screen]
    |
    v
[Tap floating chat button]
    |
    v
[Chat drawer/screen opens]
    |
    v
[AI greets with context-aware prompt]
    |
    v
[User types question: "What should I do this summer?"]
    |
    v
[AI responds with personalized advice based on profile]
    |
    v
[AI suggests specific programs with links]
    |
    v
[User taps suggestion to view program detail]
```

### Flow 7: Invite Parent Access

```
[User in Settings > Share Access]
    |
    v
[Tap "Invite Family Member"]
    |
    v
[Enter email: parent@email.com]
    |
    v
[Select permissions:]
    [ ] View profile
    [ ] View schools
    [ ] View deadlines
    [ ] View essays (drafts)
    |
    v
[Tap "Send Invite"]
    |
    v
[Parent receives email invitation]
    |
    v
[Parent creates account, sees limited view]
```

---

## Responsive Breakpoints

| Breakpoint | Width | Navigation | Layout |
|------------|-------|------------|--------|
| Mobile | < 768px | Bottom tabs | Single column |
| Tablet | 768-1023px | Bottom tabs or side | 2 columns possible |
| Desktop | >= 1024px | Sidebar | Multi-column, wider cards |

---

## Next Steps

1. **Wireframes** - Create low-fidelity wireframes for each page
2. **Prototype** - Build clickable prototype in Figma or code
3. **User Testing** - Validate flows with target students
4. **Iterate** - Refine based on feedback
5. **Build** - Implement in Next.js (02_app)

---

*Document Version: 1.0*
*Last Updated: December 2024*

