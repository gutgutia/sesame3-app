# AI Tools Catalog

## Overview

Tools available to Kimi (the fast parser model) for extracting data from conversations and triggering widgets. Each tool call results in a confirmation widget shown to the user.

---

## 1. Profile CRUD Tools

These tools manage the student's profile data. All require user confirmation via widget before saving.

### 1.1 Testing Scores

| Tool | Action | Widget |
|------|--------|--------|
| `saveTestScores` | Add/update SAT, ACT, PSAT scores | Score input with section breakdown |
| `addAPScore` | Add an AP exam score | AP subject + score (1-5) |
| `removeTestScore` | Remove a test score | Inline confirmation required |

**Fields**: satTotal, satMath, satReading, actComposite, actEnglish, actMath, actReading, actScience, psatTotal, apSubject, apScore

### 1.2 GPA & Academics

| Tool | Action | Widget |
|------|--------|--------|
| `saveGPA` | Add/update GPA (weighted/unweighted) | GPA input with scale |
| `addCourse` | Add a course (completed, in-progress, planned) | Course form with grade |
| `updateCourse` | Update course details or grade | Pre-filled course form |
| `removeCourse` | Remove a course | Inline confirmation |

**Note**: GPA is user-reported, not calculated. We store both weighted and unweighted separately.

### 1.3 Activities

| Tool | Action | Widget |
|------|--------|--------|
| `addActivity` | Add an extracurricular activity | Activity form |
| `updateActivity` | Update activity details | Pre-filled form |
| `removeActivity` | Remove an activity | Inline confirmation |

**Fields**: title, organization, category, isLeadership, description, hoursPerWeek, yearsActive

### 1.4 Awards & Honors

| Tool | Action | Widget |
|------|--------|--------|
| `addAward` | Add an award or recognition | Award form with level |
| `updateAward` | Update award details | Pre-filled form |
| `removeAward` | Remove an award | Inline confirmation |

**Fields**: title, organization, level (school/regional/state/national/international), year

### 1.5 Programs

| Tool | Action | Widget |
|------|--------|--------|
| `addProgram` | Add summer program, research, internship | Program form |
| `updateProgram` | Update program details or status | Pre-filled form |
| `removeProgram` | Remove a program | Inline confirmation |

**Fields**: name, organization, type, status (interested/applying/accepted/completed), year

**Matching**: When user says "UCSB SRA" and we have "UCSB Summer Research Academy" in DB, use AI to fuzzy match. If uncertain, show picker widget.

### 1.6 Schools List

| Tool | Action | Widget |
|------|--------|--------|
| `addSchool` | Add school to list | School card with tier selector |
| `updateSchool` | Update tier or application type | School settings |
| `removeSchool` | Remove school from list | Inline confirmation |

**Fields**: schoolName, tier (dream/reach/target/safety), applicationType (ED/EA/REA/RD), whyInterested

### 1.7 Basic Profile

| Tool | Action | Widget |
|------|--------|--------|
| `saveProfileInfo` | Update name, grade, high school | Profile form |

**Fields**: firstName, lastName, preferredName, grade, graduationYear, highSchoolName

---

## 2. Document Parsing Tools

These tools handle document uploads (transcripts, screenshots, PDFs).

| Tool | Action | Widget |
|------|--------|--------|
| `parseTranscript` | Parse uploaded transcript | Courses table for review/confirm |
| `parseDocument` | Parse general document | Extracted data for review |

**Implementation**: Use Gemini 3 Pro Vision API for parsing + inference. Returns structured data that populates a confirmation widget.

**Flow**:
1. User drops file or shares screenshot
2. Kimi calls `parseTranscript`
3. Gemini Vision extracts courses, grades
4. Widget shows parsed data in table format
5. User reviews, edits if needed, confirms
6. Data saved to profile

---

## 3. View/Info Tools

These tools display information widgets without modifying profile data.

| Tool | Action | Widget |
|------|--------|--------|
| `showProgramInfo` | Show details about a program | Program info card |
| `showSchoolInfo` | Show details about a school | School info card |
| `showChances` | Calculate and show admission chances | Chances breakdown panel |
| `showDeadlines` | Show upcoming deadlines | Deadline timeline |
| `showProfileSummary` | Show current profile overview | Profile snapshot |

### showChances (Priority Tool)

**Why important**: Key marketing feature - students want to know their odds.

**Widget displays**:
- Overall chance percentage
- Breakdown by factor (GPA, testing, activities, awards)
- What's helping, what's hurting
- What's missing from profile
- Comparison to admitted student stats

**Data source**: School database with acceptance rates, admitted student profiles, etc.

---

## 4. Search/Match Tools

These tools help match user input to database entries.

| Tool | Action | Widget |
|------|--------|--------|
| `findProgram` | Fuzzy search for a program | Picker if multiple matches |
| `findSchool` | Fuzzy search for a school | Picker if multiple matches |
| `findActivity` | Match to existing activity | Picker if uncertain |

**Matching strategy**:
1. AI attempts fuzzy match (e.g., "UCSB SRA" → "UCSB Summer Research Academy")
2. High confidence → proceed with matched entity
3. Low confidence → show picker widget with top matches
4. No match → ask user for clarification

---

## 5. Confirmation Patterns

### Add/Update: Widget Confirmation
```
User: "I got 1490 on my SAT"
     ↓
Kimi: calls saveTestScores({ satTotal: 1490 })
     ↓
Widget: [SAT Score: 1490] [Math: ___] [Reading: ___] [Save] [Skip]
     ↓
User clicks Save → Data persisted
```

### Remove: Inline Confirmation
```
User: "Actually remove my debate activity"
     ↓
Kimi: calls removeActivity({ match: "debate" })
     ↓
Widget: "Remove 'Debate Team - Captain'?" [Yes, remove] [Cancel]
     ↓
User confirms → Data deleted
```

### Fuzzy Match: Picker
```
User: "I'm applying to Stanford SRI"
     ↓
Kimi: calls findProgram({ query: "Stanford SRI" })
     ↓
AI matches with low confidence
     ↓
Widget: "Did you mean?"
  • Stanford Research Institute (SRI)
  • Stanford Summer Research Program
  • Stanford Institutes of Medicine
     ↓
User selects → Proceed with that program
```

---

## 6. Priority Order for Implementation

| Priority | Tool | Reason |
|----------|------|--------|
| P0 | saveTestScores, saveGPA | Core profile data |
| P0 | addActivity, addAward | Core profile data |
| P0 | showChances | Key marketing feature |
| P1 | addSchool, addProgram | School list building |
| P1 | updateX, removeX | Complete CRUD |
| P1 | showSchoolInfo, showProgramInfo | Reference data |
| P2 | parseTranscript | Convenience feature |
| P2 | findProgram, findSchool | Fuzzy matching |
| P3 | showDeadlines, showProfileSummary | Nice to have |

---

## 7. Data Sources

| Data Type | Source | Status |
|-----------|--------|--------|
| Student profile | Supabase (StudentProfile + relations) | ✅ Ready |
| Schools | Database (to be built via scraping/APIs) | 🔄 Planned |
| Programs | Database (to be built via scraping/human input) | 🔄 Planned |
| Deadlines | Derived from school application data | 🔄 Planned |
| Chances calculation | Algorithm + school stats | 🔄 Planned |
