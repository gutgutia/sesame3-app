/**
 * Seed All - Seeds all reference data and test users
 *
 * This file orchestrates seeding for:
 * - Summer Programs (from seed-programs.ts)
 * - Schools (from seed-schools.ts)
 * - Test Users (from seed-users.ts)
 *
 * Usage:
 *   npm run db:seed-all           # Seed everything (with confirmation)
 *   npm run db:seed-programs      # Seed only programs
 *   npm run db:seed-schools       # Seed only schools
 *   npm run db:seed-users         # Seed only test users
 */

import { execSync } from "child_process";
import path from "path";

function printWarning() {
  console.log("\n" + "=".repeat(60));
  console.log("⚠️  WARNING: SEEDING ALL DATA");
  console.log("=".repeat(60));
  console.log("\nThis will seed the following data:");
  console.log("  - Summer Programs (21 programs)");
  console.log("  - Schools (50 top US schools)");
  console.log("  - Test Users (4 student profiles)");
  console.log("\nExisting test users will be REPLACED.");
  console.log("=".repeat(60) + "\n");
}

async function main() {
  printWarning();

  console.log("=== SEEDING ALL REFERENCE DATA ===\n");

  const seedDir = path.dirname(__filename);

  // Seed programs
  console.log("--- Seeding Summer Programs ---");
  execSync(`tsx ${path.join(seedDir, "seed-programs.ts")}`, {
    stdio: "inherit",
    env: process.env,
  });

  console.log("\n--- Seeding Schools ---");
  execSync(`tsx ${path.join(seedDir, "seed-schools.ts")}`, {
    stdio: "inherit",
    env: process.env,
  });

  console.log("\n--- Seeding Test Users ---");
  execSync(`tsx ${path.join(seedDir, "seed-users.ts")}`, {
    stdio: "inherit",
    env: process.env,
  });

  console.log("\n" + "=".repeat(60));
  console.log("=== ALL SEEDING COMPLETE ===");
  console.log("=".repeat(60));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
