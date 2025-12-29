import { NextRequest, NextResponse } from "next/server";
import { generateObject } from "ai";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin";
import { modelFor } from "@/lib/ai/providers";

// Schema for deadline extraction
const DeadlineExtractionSchema = z.object({
  // Admission type flags
  hasEarlyDecision: z.boolean().describe("Does this school offer Early Decision?"),
  hasEarlyDecisionII: z.boolean().describe("Does this school offer Early Decision II?"),
  hasEarlyAction: z.boolean().describe("Does this school offer Early Action?"),
  isRestrictiveEarlyAction: z.boolean().describe("If EA exists, is it Restrictive EA (REA/SCEA)?"),
  hasRollingAdmissions: z.boolean().describe("Does this school have rolling admissions?"),

  // Deadline dates
  deadlineEd: z.string().nullable().describe("Early Decision deadline (YYYY-MM-DD format)"),
  deadlineEd2: z.string().nullable().describe("Early Decision II deadline (YYYY-MM-DD format)"),
  deadlineEa: z.string().nullable().describe("Early Action deadline (YYYY-MM-DD format)"),
  deadlineRd: z.string().nullable().describe("Regular Decision deadline (YYYY-MM-DD format)"),
  deadlinePriority: z.string().nullable().describe("Priority deadline for rolling admissions (YYYY-MM-DD format)"),
  deadlineFinancialAid: z.string().nullable().describe("Financial Aid priority deadline (YYYY-MM-DD format)"),

  // Metadata
  confidence: z.enum(["high", "medium", "low"]).describe("How confident you are in this data"),
  source: z.string().nullable().describe("URL or source where this information was found"),
  notes: z.string().nullable().describe("Any additional notes about the admissions process"),
});

/**
 * POST /api/admin/llm/scrape-deadlines
 * Use LLM to extract deadline information based on knowledge
 */
export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();
    const { type, name } = body as {
      type: "school" | "program";
      id: string;
      name: string;
    };

    if (!name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    const currentYear = new Date().getFullYear();
    const admissionsCycle = `${currentYear}-${currentYear + 1}`;

    let prompt: string;
    if (type === "school") {
      prompt = `Extract the college admissions information for "${name}" for the ${admissionsCycle} admissions cycle.

First, determine which application types this school offers:
- Early Decision (ED): Binding commitment, typically November 1-15 deadline
- Early Decision II (ED2): Second round binding, typically January 1-15 deadline
- Early Action (EA): Non-binding early, typically November 1-15 deadline
- Restrictive Early Action (REA/SCEA): EA with restrictions on other early apps (Harvard, Yale, Princeton, Stanford use this)
- Rolling Admissions: Applications reviewed on a rolling basis

Then provide the specific deadlines for this school.

Common deadline patterns:
- ED: November 1-15
- EA: November 1-15
- ED2: January 1-15
- RD: January 1-15
- Financial aid priority deadlines often align with application deadlines

If you're not confident about specific dates for this school, use null and set confidence to "low".
Only provide dates you have reasonable confidence about.`;
    } else {
      prompt = `Extract the application deadlines for the "${name}" summer program for ${currentYear}.

Provide any deadlines you know about, including:
- Application deadline
- Early/priority deadline (if applicable)
- Program dates

If you're not confident about specific dates, use null and set confidence to "low".`;
    }

    const result = await generateObject({
      model: modelFor.fast, // Using Haiku for speed/cost
      schema: DeadlineExtractionSchema,
      prompt,
    });

    return NextResponse.json({
      success: true,
      deadlines: result.object,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("[LLM Scrape] Error:", error);
    return NextResponse.json(
      { error: "Failed to scrape deadlines", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
