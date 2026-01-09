import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentProfileId } from "@/lib/auth";

/**
 * GET /api/opportunities/summer-programs/search
 * Search available summer programs
 * Query params:
 *   - q: search query (name, shortName, organization)
 *   - year: program year (default: current year + 1)
 *   - limit: max results (default: 20)
 */
export async function GET(request: NextRequest) {
  try {
    const profileId = await getCurrentProfileId();

    if (!profileId) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const yearParam = searchParams.get("year");
    const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 50);

    // Default to next summer (e.g., if it's Dec 2024, show 2025 programs)
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const defaultYear = currentMonth >= 6 ? currentYear + 1 : currentYear; // After June, show next year
    const year = yearParam ? parseInt(yearParam) : defaultYear;

    // Get student's already tracked programs for this year
    const trackedProgramIds = await prisma.studentSummerProgram.findMany({
      where: {
        studentProfileId: profileId,
        applicationYear: year,
      },
      select: { summerProgramId: true },
    });
    const trackedIds = new Set(trackedProgramIds.map(t => t.summerProgramId));

    // Search programs - only select fields needed for list display
    const programs = await prisma.summerProgram.findMany({
      where: {
        isActive: true,
        programYear: year,
        OR: query
          ? [
              { name: { contains: query, mode: "insensitive" } },
              { shortName: { contains: query, mode: "insensitive" } },
              { organization: { contains: query, mode: "insensitive" } },
            ]
          : undefined,
      },
      select: {
        id: true,
        name: true,
        shortName: true,
        organization: true,
        websiteUrl: true,
        programYear: true,
        applicationDeadline: true,
        category: true,
        location: true,
        format: true,
      },
      orderBy: [
        { applicationDeadline: "asc" },
        { name: "asc" },
      ],
      take: limit,
    });

    // Mark which ones are already tracked
    const programsWithTracking = programs.map(p => ({
      ...p,
      isTracked: trackedIds.has(p.id),
    }));

    return NextResponse.json({
      programs: programsWithTracking,
      year,
      total: programs.length,
    });
  } catch (error) {
    console.error("Error searching programs:", error);
    return NextResponse.json(
      { error: "Failed to search programs" },
      { status: 500 }
    );
  }
}
