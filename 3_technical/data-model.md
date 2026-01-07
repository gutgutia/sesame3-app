# Sesame3 Data Model — High-Level Architecture

## Overview

This document describes the high-level data model for Sesame3. The model is designed to:

1. **Support the core product** — Students building their college application profile
2. **Enable future expansion** — Parent sharing, counselor dashboards, organizations
3. **Integrate with AI** — Conversation storage, summarization, context management
4. **Maintain data integrity** — Relational structure with PostgreSQL

---

## Conceptual Layers

```
┌─────────────────────────────────────────────────────────────────┐
│                      LAYER 1: IDENTITY                           │
│   Users, Authentication, Organizations                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   LAYER 2: STUDENT DATA                          │
│   Profiles, Academics, Activities, Awards, Goals                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   LAYER 3: REFERENCE DATA                        │
│   Schools, Programs, Competitions (shared/curated)               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   LAYER 4: AI & CONVERSATIONS                    │
│   Chat history, Summaries, Context management                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   LAYER 5: ACCESS CONTROL                        │
│   Permissions, Sharing, Organization membership                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Layer 1: Identity

### User
The authenticated person. Role-agnostic — a user can be a student, parent, counselor, or multiple.

| Key Fields | Notes |
|------------|-------|
| id | Primary identifier |
| email | Unique, used for auth |
| auth_provider | Email/password, Google, Apple |
| created_at | Account creation |

### Organization (Future)
For counselors/schools managing multiple students.

| Key Fields | Notes |
|------------|-------|
| id | Primary identifier |
| name | "Bay Area College Prep" |
| type | `counseling_practice` / `high_school` / `tutoring_center` |
| owner_user_id | The admin who created it |

### OrganizationMember (Future)
Links users to organizations with roles.

| Key Fields | Notes |
|------------|-------|
| organization_id | FK to Organization |
| user_id | FK to User |
| role | `owner` / `counselor` / `assistant` |

---

## Layer 2: Student Data

### StudentProfile
The core entity — one per student. Owned by a User.

| Key Fields | Notes |
|------------|-------|
| id | Primary identifier |
| user_id | Owner (FK to User) |
| name | Student's name |
| grade | 9th, 10th, 11th, 12th |
| high_school | School name |
| graduation_year | Expected graduation |
| onboarding_state | Progress through onboarding |

### AboutMe
Personal narrative and identity (separate from stats).

| Key Fields | Notes |
|------------|-------|
| student_profile_id | FK |
| story | Free-form personal narrative |
| values | Array of values |
| interests | Array of interests |
| personality | Self-description |
| aspirations | What they want to become |

### Academics
GPA, course rigor, transcript data.

| Key Fields | Notes |
|------------|-------|
| student_profile_id | FK |
| gpa_unweighted | 0.0 - 4.0 |
| gpa_weighted | 0.0 - 5.0+ |
| class_rank | Optional |
| course_rigor | "8 AP, 4 Honors" |

### Testing
Standardized test scores.

| Key Fields | Notes |
|------------|-------|
| student_profile_id | FK |
| sat_total | 400-1600 |
| sat_math | 200-800 |
| sat_reading | 200-800 |
| act_composite | 1-36 |
| ap_scores | JSONB array of subject/score |

### Activity
Extracurricular activities.

| Key Fields | Notes |
|------------|-------|
| id | Primary identifier |
| student_profile_id | FK |
| title | Role/position |
| organization | Club/team name |
| category | `club` / `sport` / `work` / `volunteer` / `other` |
| is_leadership | Boolean |
| years_active | "9th-11th" |
| hours_per_week | Number |
| description | Details and impact |

### Award
Honors and recognition.

| Key Fields | Notes |
|------------|-------|
| id | Primary identifier |
| student_profile_id | FK |
| title | Award name |
| level | `school` / `regional` / `state` / `national` / `international` |
| year | Year received |
| description | Details |

### Program
Summer programs, research, internships.

| Key Fields | Notes |
|------------|-------|
| id | Primary identifier |
| student_profile_id | FK |
| name | Program name |
| organization | Hosting institution |
| year | Year attended/applying |
| status | `interested` / `applying` / `accepted` / `completed` |
| description | Details |

### Goal
Student's objectives and plans.

| Key Fields | Notes |
|------------|-------|
| id | Primary identifier |
| student_profile_id | FK |
| title | Goal description |
| category | `research` / `competition` / `leadership` / `project` / `other` |
| status | `parking_lot` / `planning` / `in_progress` / `completed` |
| target_date | Deadline |
| description | Details |

### Task
Action items within goals.

| Key Fields | Notes |
|------------|-------|
| id | Primary identifier |
| goal_id | FK to Goal |
| title | Task description |
| completed | Boolean |
| due_date | Deadline |

### StudentSchoolList
Schools the student is targeting.

| Key Fields | Notes |
|------------|-------|
| id | Primary identifier |
| student_profile_id | FK |
| school_id | FK to School (reference data) |
| tier | `dream` / `reach` / `target` / `safety` |
| status | `researching` / `applying` / `submitted` / `accepted` / `rejected` |
| deadline | Application deadline |
| notes | Student's notes |

---

## Layer 3: Reference Data

Shared data not owned by any student. Curated by the platform.

### School
College/university data.

| Key Fields | Notes |
|------------|-------|
| id | Primary identifier |
| name | Full name |
| short_name | "MIT", "UCLA" |
| location | City, State |
| type | `public` / `private` / `community` |
| acceptance_rate | Percentage |
| avg_gpa | Admitted student average |
| avg_sat | Admitted student average |
| website | URL |
| deadlines | JSONB of deadline types/dates |

### ProgramDirectory (Future)
Curated list of summer programs, research opportunities.

| Key Fields | Notes |
|------------|-------|
| id | Primary identifier |
| name | Program name |
| organization | Host institution |
| category | `research` / `summer` / `competition` |
| deadline | Application deadline |
| requirements | JSONB |
| url | Website |

### CompetitionDirectory (Future)
Curated list of academic competitions.

| Key Fields | Notes |
|------------|-------|
| id | Primary identifier |
| name | Competition name |
| category | `math` / `science` / `writing` / `other` |
| levels | `regional` / `national` / `international` |
| timeline | JSONB of key dates |

---

## Layer 4: AI & Conversations

### Conversation
A chat session with the AI advisor.

| Key Fields | Notes |
|------------|-------|
| id | Primary identifier |
| student_profile_id | FK |
| title | Auto-generated or user-set |
| mode | `general` / `chances` / `planning` / `schools` / `story` |
| summary | Rolling summary of this conversation |
| started_at | Session start |
| ended_at | Session end (null if ongoing) |
| message_count | Number of messages |

### Message
Individual messages within a conversation.

| Key Fields | Notes |
|------------|-------|
| id | Primary identifier |
| conversation_id | FK |
| role | `user` / `assistant` / `system` |
| content | Message text |
| widget_type | `gpa` / `sat` / `activity` / etc. (if widget shown) |
| widget_data | JSONB of structured data |
| widget_status | `draft` / `confirmed` / `dismissed` |
| tokens_used | For cost tracking |
| created_at | Timestamp |

### StudentContext
Master context for AI across all conversations.

| Key Fields | Notes |
|------------|-------|
| student_profile_id | FK (1:1 with StudentProfile) |
| master_summary | Cross-conversation rolling summary |
| facts_snapshot | JSONB of quick-access facts |
| communication_preferences | JSONB of learned preferences |
| total_conversations | Count |
| total_messages | Count |
| last_conversation_at | Timestamp |

---

## Layer 5: Access Control

### AccessGrant
Explicit permission for one user to access a student's profile.

| Key Fields | Notes |
|------------|-------|
| id | Primary identifier |
| student_profile_id | FK — the profile being shared |
| granted_to_user_id | FK — the user receiving access |
| granted_by_user_id | FK — who granted it (usually the student) |
| permission | `view` / `comment` / `edit` / `admin` |
| expires_at | Optional expiration |
| created_at | When granted |

### OrganizationStudentLink (Future)
Links students to counseling organizations.

| Key Fields | Notes |
|------------|-------|
| organization_id | FK |
| student_profile_id | FK |
| counselor_user_id | Assigned counselor within org |
| status | `active` / `archived` |
| notes | Counselor notes |
| joined_at | When linked |

---

## Entity Relationship Diagram (Simplified)

```
┌──────────┐         ┌─────────────────┐
│   USER   │────────▶│ STUDENT_PROFILE │
└──────────┘  owns   └─────────────────┘
     │                       │
     │                       │ has many
     │               ┌───────┴───────────────────┐
     │               ▼       ▼       ▼           ▼
     │          ┌────────┐ ┌────┐ ┌────────┐ ┌──────┐
     │          │ACADEMIC│ │TEST│ │ACTIVITY│ │AWARD │
     │          └────────┘ └────┘ └────────┘ └──────┘
     │               │
     │               │ has many
     │               ▼
     │          ┌─────────┐       ┌──────┐
     │          │  GOAL   │──────▶│ TASK │
     │          └─────────┘       └──────┘
     │               │
     │               │ targets
     │               ▼
     │     ┌─────────────────────┐      ┌────────┐
     │     │ STUDENT_SCHOOL_LIST │─────▶│ SCHOOL │ (reference)
     │     └─────────────────────┘      └────────┘
     │
     │         ┌─────────────────┐
     └────────▶│  ACCESS_GRANT   │────────▶ STUDENT_PROFILE
      grants   └─────────────────┘   to

     ┌──────────────┐         ┌─────────┐
     │ CONVERSATION │────────▶│ MESSAGE │
     └──────────────┘         └─────────┘
           │
           ▼
     ┌─────────────────┐
     │ STUDENT_CONTEXT │ (1:1 with StudentProfile)
     └─────────────────┘

     ┌──────────────┐         ┌────────────┐
     │ ORGANIZATION │────────▶│ ORG_MEMBER │────▶ USER
     └──────────────┘         └────────────┘
           │
           ▼
     ┌────────────────────┐
     │ ORG_STUDENT_LINK   │────▶ STUDENT_PROFILE
     └────────────────────┘
```

---

## Implementation Phases

### Phase 1: MVP
- ✅ User
- ✅ StudentProfile
- ✅ Academics, Testing, Activity, Award, Program
- ✅ Goal, Task
- ✅ StudentSchoolList
- ✅ School (reference data — seed with top 100 schools)
- ✅ Conversation, Message, StudentContext

### Phase 2: Parent Sharing
- ✅ AccessGrant
- Parent can view child's profile with `view` permission

### Phase 3: Counselors
- ✅ Organization
- ✅ OrganizationMember
- ✅ OrganizationStudentLink
- Counselor dashboard, bulk views, notes

### Phase 4: Discovery
- ✅ ProgramDirectory
- ✅ CompetitionDirectory
- Curated opportunity database

---

## Key Design Principles

1. **User ≠ Role** — Users can have multiple relationships (parent + counselor)
2. **Student owns their data** — Clear ownership, simple permissions
3. **Explicit sharing** — AccessGrant model, auditable and revocable
4. **AI context is layered** — Facts, summary, recent messages, full history
5. **Reference data is shared** — Schools, programs curated once, used by all
6. **Future-ready but not over-built** — Organizations exist in schema, built when needed

---

## Technology

- **Database**: PostgreSQL (relational with JSONB flexibility)
- **ORM**: Prisma or Drizzle
- **Hosting**: Supabase, Neon, or Vercel Postgres
- **Migrations**: ORM-managed with version control

---

## Next Steps

1. Define detailed field-level schema with types and constraints
2. Set up database and ORM
3. Create seed data (schools, sample profiles)
4. Implement API layer

