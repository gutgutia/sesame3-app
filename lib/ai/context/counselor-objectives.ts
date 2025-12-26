// =============================================================================
// COUNSELOR OBJECTIVES
// =============================================================================

/**
 * Generates the counselor's objectives for this conversation.
 * Uses StudentContext to incorporate open commitments and session context.
 *
 * Token budget: ~150 tokens
 */

import { prisma } from "@/lib/db";

// Profile type for objectives - using any for flexibility with Prisma types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ProfileForObjectives = any;

export async function buildCounselorObjectives(
  profileId: string,
  profile?: ProfileForObjectives | null
): Promise<string> {
  // Load StudentContext to get open commitments and session info
  const context = await prisma.studentContext.findUnique({
    where: { studentProfileId: profileId },
    select: {
      openCommitments: true,
      accountabilityLevel: true,
      lastConversationAt: true,
      totalConversations: true,
    },
  });

  // Calculate days since last conversation
  const daysSinceLastSession = context?.lastConversationAt
    ? Math.floor(
        (Date.now() - new Date(context.lastConversationAt).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : null;

  const objectives: string[] = [];

  // Priority 1: Follow up on open commitments
  if (context?.openCommitments && context.accountabilityLevel !== "light") {
    objectives.push("Follow up on any open commitments from last session");
  }

  // Priority 2: Re-engagement after break
  if (daysSinceLastSession !== null && daysSinceLastSession > 7) {
    objectives.push(
      `Reconnect warmly (${daysSinceLastSession} days since last chat)`
    );
  }

  // Priority 3: Profile gaps
  if (!profile) {
    return buildFirstTimeObjectives();
  }

  // Check for basic profile gaps
  const hasGpa =
    profile.academics?.schoolReportedGpaUnweighted ||
    profile.academics?.schoolReportedGpaWeighted;
  const hasTests = !!profile.testing;
  const hasActivities = profile.activities && profile.activities.length > 0;
  const hasSchools = profile.schoolList && profile.schoolList.length > 0;

  if (!hasGpa) {
    objectives.push("Learn their GPA if it comes up naturally");
  }

  if (!hasTests) {
    objectives.push("Find out about standardized testing plans");
  }

  if (!hasActivities) {
    objectives.push("Discover their extracurricular activities");
  }

  if (!hasSchools) {
    objectives.push("Explore what schools interest them");
  }

  // Priority 4: Active goals
  if (profile.goals && profile.goals.length > 0) {
    const inProgress = profile.goals.filter((g) => g.status === "in_progress");
    if (inProgress.length > 0) {
      objectives.push(`Check progress on: "${inProgress[0].title}"`);
    }
  }

  // Default objectives if profile is mostly complete
  if (objectives.length === 0) {
    objectives.push("Help with whatever the student needs today");
    objectives.push("Look for opportunities to deepen their profile");

    // Add proactive coaching based on accountability level
    if (context?.accountabilityLevel === "high") {
      objectives.push("Challenge them to take their next step forward");
    }
  }

  // Format output
  const objectivesList = objectives
    .slice(0, 4) // Max 4 objectives
    .map((o, i) => `${i + 1}. ${o}`)
    .join("\n");

  const footer =
    context?.accountabilityLevel === "high"
      ? "\nNote: This student prefers high accountability - be proactive about follow-ups."
      : "\nRemember: Focus primarily on what the student wants. These are secondary goals.";

  return `Session Objectives:\n${objectivesList}${footer}`;
}

/**
 * Objectives for first-time students
 */
function buildFirstTimeObjectives(): string {
  return `Session Objectives:
1. Welcome warmly and learn their name
2. Understand what grade they're in and their timeline
3. Find out what brings them here today
4. Start building rapport and trust

Note: This is a new student. Focus on making them feel comfortable and understood.`;
}

/**
 * Regenerates objectives for a student.
 * Called after session ends, on profile update, or by daily cron.
 *
 * Future: Use AI to generate more sophisticated objectives
 */
export async function regenerateObjectives(profileId: string): Promise<void> {
  // For now, objectives are generated dynamically
  // In the future, we could pre-generate and cache them
  console.log(`[CounselorObjectives] Objectives regenerated for ${profileId}`);
}
