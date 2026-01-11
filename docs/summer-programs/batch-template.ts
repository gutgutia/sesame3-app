/**
 * Summer Programs Batch Template
 *
 * HOW TO USE THIS FILE:
 * 1. Copy this entire file to a new location (e.g., prisma/seeds/batch-2.ts)
 * 2. Replace the example programs with your researched programs
 * 3. Run validation: npx ts-node prisma/seeds/batch-2.ts --validate
 * 4. Merge into prisma/seed-programs.ts
 *
 * IMPORTANT: All data must be verified for 2026 from official program websites.
 */

// =============================================================================
// TYPE DEFINITION (matches schema in seed-programs.ts)
// =============================================================================

interface SummerProgramSeed {
  // Basic Info
  name: string;
  shortName: string | null;
  organization: string;
  description: string;
  websiteUrl: string;
  programYear: number;

  // Eligibility
  minGrade: number | null; // Grade when APPLYING (not rising grade)
  maxGrade: number | null;
  minAge: number | null; // Age during program
  maxAge: number | null;
  minGpaUnweighted: number | null; // 0-4.0 scale
  minGpaWeighted: number | null;
  citizenship: "us_only" | "us_permanent_resident" | "international_ok" | null;
  requiredCourses: string[];
  recommendedCourses: string[];
  eligibilityNotes: string | null;

  // Application
  applicationOpens: Date | null;
  applicationDeadline: Date | null;
  isRolling: boolean;
  rollingNotes: string | null;
  applicationUrl: string;
  applicationNotes: string | null;

  // Details
  format: "residential" | "commuter" | "online" | "hybrid";
  location: string;

  // AI Context (CRITICAL - 200-400 words)
  llmContext: string | null;

  // Metadata
  category: string;
  focusAreas: string[];
  isActive: boolean;
  dataSource: "manual" | "api" | "import";
  dataStatus: "verified" | "pending_2026" | "needs_review";

  // Sessions (at least one required)
  sessions: Array<{
    name: string;
    startDate: Date;
    endDate: Date;
    notes?: string;
  }>;
}

// =============================================================================
// BATCH PROGRAMS - Replace with your researched programs
// =============================================================================

const batchPrograms: SummerProgramSeed[] = [
  // ---------------------------------------------------------------------------
  // EXAMPLE 1: Complete entry for reference
  // ---------------------------------------------------------------------------
  {
    name: "Clark Scholars Program",
    shortName: "Clark Scholars",
    organization: "Texas Tech University",
    description:
      "A highly selective 7-week summer research program for high-achieving students. Only 12 students are accepted worldwide to conduct original research with Texas Tech faculty mentors.",
    websiteUrl: "https://www.depts.ttu.edu/honors/academicsandenrichment/affiliatedandhighschool/clarks/",
    programYear: 2026,

    // Eligibility
    minGrade: 11,
    maxGrade: 12,
    minAge: 17,
    maxAge: null,
    minGpaUnweighted: null,
    minGpaWeighted: null,
    citizenship: "international_ok",
    requiredCourses: [],
    recommendedCourses: [],
    eligibilityNotes:
      "Current juniors or seniors. Must be 17+ by program start. Looking for students with strong academic record and genuine research interest. No prior research experience required.",

    // Application
    applicationOpens: new Date("2025-11-01"),
    applicationDeadline: new Date("2026-02-15"),
    isRolling: false,
    rollingNotes: null,
    applicationUrl: "https://www.depts.ttu.edu/honors/academicsandenrichment/affiliatedandhighschool/clarks/application.php",
    applicationNotes:
      "Online application, essay, high school transcript, SAT/ACT scores, 3 letters of recommendation (at least 2 from teachers). Finalists invited for interviews.",

    // Details
    format: "residential",
    location: "Lubbock, TX",

    // AI Context
    llmContext:
      "Clark Scholars is one of the most prestigious and selective summer research programs in the country, accepting only 12 students worldwide each year. The 7-week program pairs each student with a Texas Tech faculty mentor for intensive, original research across any field - from STEM to humanities to social sciences. Full scholarship covers tuition, room, board, and provides a $750 stipend. Students live on campus and present their research at a final symposium. The small cohort creates an intimate, rigorous intellectual community. Notable for accepting students without prior research experience - selection based on intellectual curiosity, academic achievement, and interview performance. Alumni have won Intel STS, attended top universities, and pursued successful research careers. Ideal for students who want deep research immersion in a supportive environment. The program's flexibility in research topic (not limited to STEM) makes it unique among top programs. Competition is fierce - applicants should have strong essays and genuine passion for inquiry.",

    // Metadata
    category: "research",
    focusAreas: ["research", "STEM", "humanities", "social_sciences", "mentorship"],
    isActive: true,
    dataSource: "manual",
    dataStatus: "verified",

    // Sessions
    sessions: [
      {
        name: "Main Session",
        startDate: new Date("2026-06-14"),
        endDate: new Date("2026-08-01"),
        notes: "7 weeks, fully funded with $750 stipend",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // EXAMPLE 2: Minimal valid entry (shows what you can omit)
  // ---------------------------------------------------------------------------
  {
    name: "Example Program Name",
    shortName: null, // No common abbreviation
    organization: "Example University",
    description:
      "Brief 1-3 sentence description of what the program offers and what makes it unique.",
    websiteUrl: "https://example.edu/program",
    programYear: 2026,

    // Eligibility - use null for "not specified"
    minGrade: 10,
    maxGrade: 11,
    minAge: null, // Not specified
    maxAge: null,
    minGpaUnweighted: null, // No minimum
    minGpaWeighted: null,
    citizenship: "us_permanent_resident",
    requiredCourses: [],
    recommendedCourses: [],
    eligibilityNotes: null, // Simple eligibility, no notes needed

    // Application
    applicationOpens: null, // Not yet announced
    applicationDeadline: new Date("2026-03-01"),
    isRolling: false,
    rollingNotes: null,
    applicationUrl: "https://example.edu/program/apply",
    applicationNotes:
      "Transcript and 2 recommendations required.",

    // Details
    format: "residential",
    location: "Example City, ST",

    // AI Context - ALWAYS include substantial content
    llmContext:
      "This program has X% acceptance rate and focuses on... [200-400 words covering selectivity, structure, cost, outcomes, and tips]",

    // Metadata
    category: "STEM",
    focusAreas: ["STEM", "research"],
    isActive: true,
    dataSource: "manual",
    dataStatus: "pending_2026", // 2025 data, awaiting 2026 updates

    sessions: [
      {
        name: "Main Session",
        startDate: new Date("2026-06-15"),
        endDate: new Date("2026-07-30"),
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // ADD YOUR PROGRAMS BELOW
  // Copy the structure above and fill in your researched data
  // ---------------------------------------------------------------------------

  // Program 3
  // {
  //   name: "",
  //   shortName: null,
  //   organization: "",
  //   description: "",
  //   websiteUrl: "",
  //   programYear: 2026,
  //   minGrade: null,
  //   maxGrade: null,
  //   minAge: null,
  //   maxAge: null,
  //   minGpaUnweighted: null,
  //   minGpaWeighted: null,
  //   citizenship: null,
  //   requiredCourses: [],
  //   recommendedCourses: [],
  //   eligibilityNotes: null,
  //   applicationOpens: null,
  //   applicationDeadline: null,
  //   isRolling: false,
  //   rollingNotes: null,
  //   applicationUrl: "",
  //   applicationNotes: null,
  //   format: "residential",
  //   location: "",
  //   llmContext: "",
  //   category: "",
  //   focusAreas: [],
  //   isActive: true,
  //   dataSource: "manual",
  //   dataStatus: "verified",
  //   sessions: [
  //     {
  //       name: "Main Session",
  //       startDate: new Date("2026-06-01"),
  //       endDate: new Date("2026-07-31"),
  //     },
  //   ],
  // },
];

// =============================================================================
// VALIDATION (run with --validate flag)
// =============================================================================

function validateProgram(program: SummerProgramSeed): string[] {
  const errors: string[] = [];
  const name = program.name || "Unknown";

  // Required fields
  if (!program.name) errors.push(`${name}: Missing name`);
  if (!program.organization) errors.push(`${name}: Missing organization`);
  if (!program.description) errors.push(`${name}: Missing description`);
  if (!program.websiteUrl) errors.push(`${name}: Missing websiteUrl`);
  if (!program.applicationUrl) errors.push(`${name}: Missing applicationUrl`);
  if (program.programYear !== 2026) errors.push(`${name}: programYear should be 2026`);

  // llmContext quality
  if (!program.llmContext) {
    errors.push(`${name}: Missing llmContext (critical for AI advisor)`);
  } else if (program.llmContext.length < 200) {
    errors.push(`${name}: llmContext too short (${program.llmContext.length} chars, need 200+)`);
  }

  // Sessions
  if (!program.sessions || program.sessions.length === 0) {
    errors.push(`${name}: At least one session required`);
  }

  // URL validation
  if (program.websiteUrl && !program.websiteUrl.startsWith("http")) {
    errors.push(`${name}: websiteUrl must start with http/https`);
  }
  if (program.applicationUrl && !program.applicationUrl.startsWith("http")) {
    errors.push(`${name}: applicationUrl must start with http/https`);
  }

  // Grade logic
  if (program.minGrade && program.maxGrade && program.minGrade > program.maxGrade) {
    errors.push(`${name}: minGrade cannot be greater than maxGrade`);
  }

  // focusAreas
  if (!program.focusAreas || program.focusAreas.length === 0) {
    errors.push(`${name}: At least one focusArea required`);
  }

  return errors;
}

function validateBatch(): void {
  console.log(`\nValidating ${batchPrograms.length} programs...\n`);

  let totalErrors = 0;
  for (const program of batchPrograms) {
    const errors = validateProgram(program);
    if (errors.length > 0) {
      totalErrors += errors.length;
      errors.forEach((e) => console.log(`  ERROR: ${e}`));
    } else {
      console.log(`  OK: ${program.name}`);
    }
  }

  console.log(`\n${totalErrors === 0 ? "All programs valid!" : `Found ${totalErrors} errors`}\n`);
  process.exit(totalErrors > 0 ? 1 : 0);
}

// Run validation if --validate flag is passed
if (process.argv.includes("--validate")) {
  validateBatch();
}

// =============================================================================
// EXPORT for merging into main seed file
// =============================================================================

export { batchPrograms };
export type { SummerProgramSeed };
