# Summer Programs Data Standards

This document defines the quality standards and field requirements for summer program entries in the Sesame3 database.

## Critical: Year Awareness

**All data must be for the 2026 program year.**

- Application deadlines, program dates, and costs change annually
- Always verify on the official program website
- If 2026 data is not yet available, note this in `dataStatus`
- Never assume dates from previous years

---

## Field Reference

### Basic Information (Required)

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `name` | string | Full official program name | "Research Science Institute" |
| `shortName` | string \| null | Common abbreviation | "RSI" |
| `organization` | string | Host institution or organization | "MIT / Center for Excellence in Education" |
| `description` | string | 1-3 sentence overview (user-facing) | See examples below |
| `websiteUrl` | string | Official program website | "https://www.cee.org/programs/rsi" |
| `programYear` | number | Year of the program | 2026 |

**Description Guidelines:**
- Keep to 1-3 sentences
- Include: program type, duration, what students do, unique aspect
- Avoid marketing language
- Example: "A free six-week summer program at MIT for high school students who have demonstrated excellence in math and science. Students conduct original research under the mentorship of scientists and researchers at MIT and Boston-area labs."

---

### Eligibility Fields (All Required, use null if not applicable)

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `minGrade` | number \| null | Minimum current grade (when applying) | 10 |
| `maxGrade` | number \| null | Maximum current grade (when applying) | 11 |
| `minAge` | number \| null | Minimum age during program | 15 |
| `maxAge` | number \| null | Maximum age during program | 18 |
| `minGpaUnweighted` | number \| null | Minimum unweighted GPA (0-4.0 scale) | 3.5 |
| `minGpaWeighted` | number \| null | Minimum weighted GPA | 3.8 |
| `citizenship` | string \| null | Citizenship requirement | See values below |
| `requiredCourses` | string[] | Prerequisite courses | ["AP Calculus BC"] |
| `recommendedCourses` | string[] | Recommended but not required | ["AP Physics C", "AP Chemistry"] |
| `eligibilityNotes` | string \| null | Complex eligibility details | See examples below |

**Citizenship Values:**
- `"us_only"` - U.S. citizens only
- `"us_permanent_resident"` - U.S. citizens or permanent residents
- `"international_ok"` - International students welcome
- `null` - Not specified

**Grade Notes:**
- Use the grade the student is IN when applying (not rising grade)
- Example: A program for "rising seniors" = `minGrade: 11, maxGrade: 11`

---

### Gender Requirements (Critical)

Some programs are restricted by gender. This MUST be clearly documented.

**Where to Document:**
1. In `eligibilityNotes` - Always state gender restriction clearly
2. In `focusAreas` - Add `"women_in_STEM"` or `"girls_only"` tag
3. In `llmContext` - Mention the gender focus and reasoning

**Examples of Gender-Restricted Programs:**
- MIT Women's Technology Program (WTP) - Women only
- Girls Who Code - Girls and nonbinary students
- Kode With Klossy - Girls and nonbinary students

**How to Document:**
```typescript
// In eligibilityNotes:
eligibilityNotes: "Open to students who identify as women. Program designed to address gender gap in engineering."

// In focusAreas:
focusAreas: ["engineering", "women_in_STEM", "girls_only"]

// In llmContext:
llmContext: "WTP is a women-focused program designed to address the gender gap in engineering..."
```

---

### Age Requirements (Critical - Read Carefully)

Age requirements are often confusing and critical for younger students. Document these with precision.

**Key Distinctions:**
1. **Age at time of APPLICATION** vs **Age during PROGRAM** - These differ!
2. **Specific date cutoffs** - e.g., "Must be 16 by July 1, 2026"
3. **Age ranges** - Some programs have both minimum AND maximum ages

**Common Age Requirement Patterns:**

| Pattern | How to Document |
|---------|-----------------|
| "Must be 16+ by program start" | `minAge: 16`, note specific date in eligibilityNotes |
| "Ages 13-18" | `minAge: 13`, `maxAge: 18` |
| "Must be under 18" | `maxAge: 17` |
| "No age requirement, grade-based only" | `minAge: null`, `maxAge: null` |

**Always Include in eligibilityNotes:**
- The EXACT cutoff date (e.g., "Must be 15 by June 1, 2026")
- Whether age is measured at application or program start
- Any exceptions for younger students

**Example for Younger Students:**
```typescript
// Program that accepts younger students with caveats
minAge: 13,
maxAge: 18,
eligibilityNotes: "Ages 13-18 during program. Students under 15 require parental consent and may have modified housing arrangements. Age calculated as of June 15, 2026 (program start date)."
```

**Example with Strict Cutoff:**
```typescript
minAge: 16,
maxAge: null,
eligibilityNotes: "Must be at least 16 years old by July 1, 2026. No exceptions for younger students regardless of grade level."
```

**In llmContext - Always Address:**
- Whether younger students are realistically competitive
- Any special considerations for younger applicants
- If the program culture is suited to younger students

**Red Flags to Watch For:**
- Programs that say "typically juniors/seniors" may still accept younger students
- Some programs have different age requirements for residential vs commuter
- "High school student" sometimes means 14+ and sometimes 15+

---

**eligibilityNotes Guidelines:**
- Use for complex requirements that don't fit structured fields
- **MUST include**: gender restrictions, age cutoff dates, regional restrictions
- Include: special qualifications, application quirks
- Example: "Must be a current high school junior (rising senior). Must be 16+ by July 1, 2026. U.S. citizens/permanent residents apply directly; international students through country-specific processes."

---

### Application Fields (Required)

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `applicationOpens` | Date \| null | When applications open | new Date("2025-10-01") |
| `applicationDeadline` | Date \| null | Final deadline | new Date("2025-12-10") |
| `isRolling` | boolean | Rolling admissions? | false |
| `rollingNotes` | string \| null | Details if rolling | "Priority deadline Nov 15" |
| `applicationUrl` | string | Direct link to apply | "https://example.org/apply" |
| `applicationNotes` | string \| null | Application requirements summary | See examples below |

**applicationNotes Guidelines:**
Include:
- What's required (transcripts, recommendations, essays, test scores)
- Application fee and waiver availability
- Decision notification timeline
- Example: "Requires 2-3 teacher recommendations (math/science), official transcript, essays about STEM goals, and standardized test scores. Application fee $65 (waivers available)."

---

### Program Details (Required)

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `format` | string | Program format | See values below |
| `location` | string | Where program takes place | "Cambridge, MA" |

**Format Values:**
- `"residential"` - Live on campus
- `"commuter"` - Daily attendance, live at home
- `"online"` - Fully virtual
- `"hybrid"` - Mix of online and in-person

**Location Notes:**
- For residential: include city/state
- For online: "Online" or "Online (synchronous)"
- For multiple locations: list all or use "Multiple campuses"

---

### AI Context (Required)

| Field | Type | Description |
|-------|------|-------------|
| `llmContext` | string \| null | Detailed context for AI advisor |

**This is the most important field for the AI advisor.** It should be 200-400 words and include:

1. **Selectivity & Prestige**
   - Acceptance rate (exact % if known)
   - Number of applicants vs. accepted
   - Reputation in the field

2. **Program Structure**
   - Daily/weekly schedule
   - What students actually do
   - Duration breakdown

3. **Cost & Financial Aid**
   - Full cost
   - FREE if applicable
   - Aid availability and thresholds

4. **Outcomes**
   - Where alumni go to college
   - Competition success rates
   - Career pathways

5. **Insider Tips**
   - What makes a strong applicant
   - Common mistakes to avoid
   - Who this is ideal for

6. **Comparisons**
   - How it differs from similar programs
   - Alternatives for different profiles

**Example llmContext:**
```
RSI is the most prestigious pre-college STEM program in the US with selectivity
comparable to Harvard/Yale/Princeton (~2-3% acceptance rate, 100 accepted from
~3,000 applicants). Program structure: Week 1 intensive STEM classes with
professors, Weeks 2-6 individual research projects with mentors at MIT/Boston-area
labs, final week written papers and oral presentations. About 10% have no prior
research experience - selection based on superior academic achievement, leadership
potential, math/science competitions, university coursework, or original research.
Outcomes: 90% MIT acceptance rate among alumni, most attend Ivy+. Students publish
research and compete in Intel STS, Siemens Competition, ISEF. 100 students total
(2/3 U.S., 1/3 international). Completely FREE - covers tuition, room, board,
and travel.
```

---

### Metadata (Required)

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `category` | string | Primary category | See values below |
| `focusAreas` | string[] | Tags for filtering/search | ["STEM", "research", "physics"] |
| `isActive` | boolean | Currently accepting applications? | true |
| `dataSource` | string | How data was collected | "manual" |
| `dataStatus` | string | Verification status | See values below |

**Category Values:**
- `"STEM"` - General STEM
- `"research"` - Research-focused
- `"mathematics"` - Math-focused
- `"engineering"` - Engineering-focused
- `"business"` - Business/entrepreneurship
- `"humanities"` - Humanities/social sciences
- `"leadership"` - Leadership development
- `"academics"` - General academics
- `"college_prep"` - College preparation
- `"arts"` - Visual arts
- `"performing_arts"` - Music, theater, dance
- `"film"` - Film/media
- `"writing"` - Creative writing/journalism
- `"law"` - Pre-law
- `"medicine"` - Pre-med/health

**focusAreas Guidelines:**
- Include 3-8 relevant tags
- Use lowercase with underscores for multi-word tags
- Common tags: STEM, research, science, mathematics, engineering, biology, chemistry, physics, computer_science, AI, robotics, medicine, writing, journalism, leadership, diversity, women_in_STEM

**dataStatus Values:**
- `"verified"` - Confirmed on official website for 2026
- `"pending_2026"` - 2025 data, awaiting 2026 updates
- `"needs_review"` - Requires verification

---

### Sessions (Required - at least one)

```typescript
sessions: Array<{
  name: string;      // Session name
  startDate: Date;   // When session starts
  endDate: Date;     // When session ends
  notes?: string;    // Optional notes (cost, duration, etc.)
}>
```

**Session Guidelines:**
- Most programs have 1 main session
- Multi-session programs (like CTY, SSP) should list each session
- Include all session options students can choose from
- Add cost/duration notes if they vary by session

**Examples:**
```typescript
// Single session
sessions: [
  {
    name: "Main Session",
    startDate: new Date("2026-06-28"),
    endDate: new Date("2026-08-08"),
  }
]

// Multiple sessions with different costs
sessions: [
  {
    name: "In-Person Boston Session 1",
    startDate: new Date("2026-06-29"),
    endDate: new Date("2026-07-26"),
    notes: "4 weeks, $11,495"
  },
  {
    name: "Online Session",
    startDate: new Date("2026-07-06"),
    endDate: new Date("2026-08-14"),
    notes: "6 weeks, $6,495"
  }
]
```

---

## Quality Checklist

Before adding a program, verify:

- [ ] All dates are for 2026
- [ ] Website URL is correct and current
- [ ] Application URL goes directly to application
- [ ] llmContext is 200-400 words with all key info
- [ ] Acceptance rate is included (or noted as unknown)
- [ ] Cost and financial aid are documented
- [ ] At least one session with dates
- [ ] Category and focusAreas are appropriate
- [ ] eligibilityNotes covers anything complex
- [ ] Citizenship requirements are accurate
- [ ] **Gender restrictions clearly documented** (if applicable)
- [ ] **Age requirements with specific cutoff dates** documented
- [ ] **Younger student considerations** addressed in llmContext

---

## Common Mistakes to Avoid

1. **Using 2025 dates for 2026 programs** - Always verify
2. **Missing acceptance rates** - Critical for advisor context
3. **Incomplete llmContext** - This powers the AI; don't skimp
4. **Wrong grade interpretation** - "Rising senior" = applying as junior (grade 11)
5. **Missing financial aid info** - Important for many students
6. **Generic descriptions** - Be specific about what makes this program unique
7. **Third-party URLs** - Always use official program websites
8. **Assuming US-only** - Many programs welcome international students
9. **Not documenting gender restrictions** - Girls Who Code, WTP, Kode With Klossy are gender-specific
10. **Vague age requirements** - "Must be 16" is not enough; specify "by July 1, 2026"
11. **Ignoring younger student viability** - Always note if younger students can realistically apply
12. **Missing age cutoff dates** - Age requirements often have specific date thresholds
