#!/usr/bin/env npx ts-node

/**
 * Summer Programs Batch Validator
 *
 * Usage:
 *   npx ts-node scripts/validate-programs-batch.ts <batch-file>
 *
 * Example:
 *   npx ts-node scripts/validate-programs-batch.ts docs/summer-programs/batch-template.ts
 *
 * This script validates a batch of summer programs before merging into the main seed file.
 */

import * as path from "path";
import * as fs from "fs";

interface SummerProgramSeed {
  name: string;
  shortName: string | null;
  organization: string;
  description: string;
  websiteUrl: string;
  programYear: number;
  minGrade: number | null;
  maxGrade: number | null;
  minAge: number | null;
  maxAge: number | null;
  minGpaUnweighted: number | null;
  minGpaWeighted: number | null;
  citizenship: string | null;
  requiredCourses: string[];
  recommendedCourses: string[];
  eligibilityNotes: string | null;
  applicationOpens: Date | null;
  applicationDeadline: Date | null;
  isRolling: boolean;
  rollingNotes: string | null;
  applicationUrl: string;
  applicationNotes: string | null;
  format: string;
  location: string;
  llmContext: string | null;
  category: string;
  focusAreas: string[];
  isActive: boolean;
  dataSource: string;
  dataStatus: string;
  sessions: Array<{
    name: string;
    startDate: Date;
    endDate: Date;
    notes?: string;
  }>;
}

// Valid values for enum-like fields
const VALID_FORMATS = ["residential", "commuter", "online", "hybrid"];
const VALID_CITIZENSHIP = ["us_only", "us_permanent_resident", "international_ok", null];
const VALID_CATEGORIES = [
  "STEM",
  "research",
  "mathematics",
  "engineering",
  "business",
  "humanities",
  "leadership",
  "academics",
  "college_prep",
  "arts",
  "performing_arts",
  "film",
  "writing",
  "law",
  "medicine",
];
const VALID_DATA_STATUS = ["verified", "pending_2026", "needs_review"];

function validateProgram(
  program: SummerProgramSeed,
  index: number
): { errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];
  const name = program.name || `Program #${index + 1}`;

  // ==========================================================================
  // REQUIRED FIELDS
  // ==========================================================================

  if (!program.name?.trim()) {
    errors.push("Missing or empty 'name'");
  }

  if (!program.organization?.trim()) {
    errors.push("Missing or empty 'organization'");
  }

  if (!program.description?.trim()) {
    errors.push("Missing or empty 'description'");
  } else if (program.description.length < 50) {
    warnings.push(`Description is very short (${program.description.length} chars)`);
  }

  if (!program.websiteUrl?.trim()) {
    errors.push("Missing 'websiteUrl'");
  } else if (!program.websiteUrl.startsWith("http")) {
    errors.push("'websiteUrl' must start with http:// or https://");
  }

  if (!program.applicationUrl?.trim()) {
    errors.push("Missing 'applicationUrl'");
  } else if (!program.applicationUrl.startsWith("http")) {
    errors.push("'applicationUrl' must start with http:// or https://");
  }

  if (program.programYear !== 2026) {
    errors.push(`'programYear' should be 2026, got ${program.programYear}`);
  }

  // ==========================================================================
  // LLMCONTEXT (Critical for AI)
  // ==========================================================================

  if (!program.llmContext?.trim()) {
    errors.push("Missing 'llmContext' - this is critical for the AI advisor");
  } else {
    const contextLength = program.llmContext.length;
    if (contextLength < 200) {
      errors.push(`'llmContext' too short (${contextLength} chars, need 200+)`);
    } else if (contextLength < 300) {
      warnings.push(`'llmContext' is short (${contextLength} chars, recommend 300+)`);
    }

    // Check for key content
    const lowerContext = program.llmContext.toLowerCase();
    if (!lowerContext.includes("%") && !lowerContext.includes("acceptance")) {
      warnings.push("'llmContext' may be missing acceptance rate information");
    }
    if (!lowerContext.includes("$") && !lowerContext.includes("free") && !lowerContext.includes("cost")) {
      warnings.push("'llmContext' may be missing cost/financial aid information");
    }
  }

  // ==========================================================================
  // ELIGIBILITY VALIDATION
  // ==========================================================================

  if (program.minGrade !== null && program.maxGrade !== null) {
    if (program.minGrade > program.maxGrade) {
      errors.push(`'minGrade' (${program.minGrade}) > 'maxGrade' (${program.maxGrade})`);
    }
  }

  if (program.minAge !== null && program.maxAge !== null) {
    if (program.minAge > program.maxAge) {
      errors.push(`'minAge' (${program.minAge}) > 'maxAge' (${program.maxAge})`);
    }
  }

  if (program.minGpaUnweighted !== null) {
    if (program.minGpaUnweighted < 0 || program.minGpaUnweighted > 4.0) {
      errors.push(`'minGpaUnweighted' should be 0-4.0, got ${program.minGpaUnweighted}`);
    }
  }

  if (program.citizenship !== null && !VALID_CITIZENSHIP.includes(program.citizenship)) {
    errors.push(`Invalid 'citizenship' value: ${program.citizenship}`);
  }

  // ==========================================================================
  // FORMAT & LOCATION
  // ==========================================================================

  if (!VALID_FORMATS.includes(program.format)) {
    errors.push(`Invalid 'format': ${program.format}. Must be one of: ${VALID_FORMATS.join(", ")}`);
  }

  if (!program.location?.trim()) {
    errors.push("Missing 'location'");
  }

  // ==========================================================================
  // METADATA
  // ==========================================================================

  if (!VALID_CATEGORIES.includes(program.category)) {
    warnings.push(`Unusual 'category': ${program.category}. Consider: ${VALID_CATEGORIES.join(", ")}`);
  }

  if (!program.focusAreas || program.focusAreas.length === 0) {
    errors.push("'focusAreas' must have at least one entry");
  }

  if (!VALID_DATA_STATUS.includes(program.dataStatus)) {
    errors.push(`Invalid 'dataStatus': ${program.dataStatus}`);
  }

  // ==========================================================================
  // SESSIONS
  // ==========================================================================

  if (!program.sessions || program.sessions.length === 0) {
    errors.push("At least one session is required");
  } else {
    program.sessions.forEach((session, sIndex) => {
      if (!session.name?.trim()) {
        errors.push(`Session ${sIndex + 1}: missing 'name'`);
      }
      if (!session.startDate) {
        errors.push(`Session ${sIndex + 1}: missing 'startDate'`);
      }
      if (!session.endDate) {
        errors.push(`Session ${sIndex + 1}: missing 'endDate'`);
      }
      if (session.startDate && session.endDate && session.startDate > session.endDate) {
        errors.push(`Session ${sIndex + 1}: 'startDate' is after 'endDate'`);
      }
    });
  }

  // ==========================================================================
  // DATE CHECKS
  // ==========================================================================

  if (program.applicationOpens && program.applicationDeadline) {
    if (program.applicationOpens > program.applicationDeadline) {
      errors.push("'applicationOpens' is after 'applicationDeadline'");
    }
  }

  return { errors, warnings };
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
Summer Programs Batch Validator

Usage:
  npx ts-node scripts/validate-programs-batch.ts <batch-file>

Example:
  npx ts-node scripts/validate-programs-batch.ts docs/summer-programs/batch-template.ts
`);
    process.exit(0);
  }

  const batchFile = args[0];
  const absolutePath = path.resolve(batchFile);

  if (!fs.existsSync(absolutePath)) {
    console.error(`Error: File not found: ${absolutePath}`);
    process.exit(1);
  }

  console.log(`\nValidating: ${batchFile}\n`);

  try {
    // Dynamic import the batch file
    const batch = await import(absolutePath);

    if (!batch.batchPrograms || !Array.isArray(batch.batchPrograms)) {
      console.error("Error: File must export 'batchPrograms' array");
      process.exit(1);
    }

    const programs: SummerProgramSeed[] = batch.batchPrograms;
    console.log(`Found ${programs.length} programs to validate\n`);
    console.log("─".repeat(60));

    let totalErrors = 0;
    let totalWarnings = 0;

    for (let i = 0; i < programs.length; i++) {
      const program = programs[i];
      const { errors, warnings } = validateProgram(program, i);

      const name = program.name || `Program #${i + 1}`;
      const status =
        errors.length === 0
          ? warnings.length === 0
            ? "OK"
            : "OK (with warnings)"
          : "FAILED";

      console.log(`\n${i + 1}. ${name}: ${status}`);

      if (errors.length > 0) {
        errors.forEach((e) => console.log(`   ERROR: ${e}`));
        totalErrors += errors.length;
      }

      if (warnings.length > 0) {
        warnings.forEach((w) => console.log(`   WARN:  ${w}`));
        totalWarnings += warnings.length;
      }
    }

    console.log("\n" + "─".repeat(60));
    console.log(`\nSummary:`);
    console.log(`  Programs: ${programs.length}`);
    console.log(`  Errors:   ${totalErrors}`);
    console.log(`  Warnings: ${totalWarnings}`);

    if (totalErrors > 0) {
      console.log(`\nValidation FAILED. Fix errors before merging.\n`);
      process.exit(1);
    } else {
      console.log(`\nValidation PASSED. Ready to merge into seed-programs.ts\n`);
      process.exit(0);
    }
  } catch (err) {
    console.error(`Error loading batch file: ${err}`);
    process.exit(1);
  }
}

main();
