# Summer Programs Database Management

This directory contains documentation and tools for managing the summer programs database in Sesame3.

## Overview

The summer programs database helps high school students discover prestigious summer opportunities. Each program entry includes comprehensive data for both user-facing discovery and AI advisor context.

## Current Status

- **Programs in Database**: 21 (as of January 2026)
- **Target**: 100+ programs
- **Program Year**: 2026

## Directory Contents

| File | Purpose |
|------|---------|
| `master-programs-list.md` | Comprehensive list of programs to research and add |
| `data-standards.md` | Quality standards and field requirements for program entries |
| `batch-template.ts` | Copy-paste template for adding new program batches |

## Workflow for Adding Programs

1. **Pick a batch** - Select 20 programs from `master-programs-list.md`
2. **Research thoroughly** - Use official program websites for 2026 data
3. **Use the template** - Copy `batch-template.ts` and fill in all fields
4. **Validate** - Ensure all required fields are complete
5. **Merge** - Add to `prisma/seed-programs.ts`
6. **Seed** - Run `npm run db:seed-programs`
7. **Mark complete** - Update checkboxes in `master-programs-list.md`

## Key Principles

1. **Year awareness** - All data must be for 2026. Verify dates, costs, and deadlines on official websites.
2. **Quality over quantity** - Each program needs a thorough `llmContext` field for the AI advisor.
3. **Official sources only** - Use program websites, not third-party aggregators, for accurate data.
4. **Verification** - Mark `dataStatus` as "verified" only after confirming with official sources.

## Running the Seed

```bash
# Seed only programs
npm run db:seed-programs

# Seed all data (programs, schools, users)
npm run db:seed-all
```
