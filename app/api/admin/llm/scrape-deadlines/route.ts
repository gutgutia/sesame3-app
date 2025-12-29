import { NextRequest, NextResponse } from "next/server";
import { generateObject } from "ai";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin";
import { modelFor } from "@/lib/ai/providers";

// Schema for deadline extraction
const DeadlineExtractionSchema = z.object({
  deadlineEd: z.string().nullable().describe("Early Decision deadline (YYYY-MM-DD format)"),
  deadlineEd2: z.string().nullable().describe("Early Decision II deadline (YYYY-MM-DD format)"),
  deadlineEa: z.string().nullable().describe("Early Action deadline (YYYY-MM-DD format)"),
  deadlineRea: z.string().nullable().describe("Restrictive Early Action deadline (YYYY-MM-DD format)"),
  deadlineRd: z.string().nullable().describe("Regular Decision deadline (YYYY-MM-DD format)"),
  deadlineFinancialAid: z.string().nullable().describe("Financial Aid priority deadline (YYYY-MM-DD format)"),
  notificationEd: z.string().nullable().describe("ED notification date (YYYY-MM-DD format)"),
  notificationEa: z.string().nullable().describe("EA notification date (YYYY-MM-DD format)"),
  notificationRd: z.string().nullable().describe("RD notification date (YYYY-MM-DD format)"),
  deadlineCommitment: z.string().nullable().describe("Enrollment commitment deadline, usually May 1 (YYYY-MM-DD format)"),
  confidence: z.enum(["high", "medium", "low"]).describe("How confident you are in this data"),
  source: z.string().nullable().describe("URL or source where this information was found"),
  notes: z.string().nullable().describe("Any additional notes about the deadlines"),
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
      prompt = `Extract the college admissions deadlines for "${name}" for the ${admissionsCycle} admissions cycle.

Based on your knowledge, provide the typical deadlines for this school. Common patterns:
- Most schools have ED around November 1-15
- EA is usually November 1-15
- RD is usually January 1-15
- ED2 is usually January 1-15
- Financial aid deadlines often align with application deadlines
- ED notification is typically mid-December
- EA notification is typically mid-December to early February
- RD notification is typically late March to early April
- Commitment deadline is usually May 1

If you're not confident about specific dates for this school, use null and set confidence to "low".
Only provide dates you have reasonable confidence about.`;
    } else {
      prompt = `Extract the application deadlines for the "${name}" summer program for ${currentYear}.

Provide any deadlines you know about, including:
- Application deadline
- Early/priority deadline (if applicable)
- Notification date
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
