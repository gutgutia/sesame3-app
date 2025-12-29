import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireProfile } from "@/lib/auth";

/**
 * GET /api/profile/testing/sat
 * Get all SAT scores for the current user
 */
export async function GET() {
  try {
    const profileId = await requireProfile();
    
    // Get or create Testing container
    const testing = await prisma.testing.upsert({
      where: { studentProfileId: profileId },
      create: { studentProfileId: profileId },
      update: {},
      include: { satScores: { orderBy: { testDate: "desc" } } },
    });
    
    return NextResponse.json(testing.satScores);
  } catch (error) {
    if (error instanceof Error && error.message === "Profile not found") {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    console.error("Error fetching SAT scores:", error);
    return NextResponse.json({ error: "Failed to fetch SAT scores" }, { status: 500 });
  }
}

/**
 * POST /api/profile/testing/sat
 * Add a new SAT score
 */
export async function POST(request: NextRequest) {
  try {
    const profileId = await requireProfile();
    const body = await request.json();

    // Validate: need at least some score data
    if (!body.math && !body.reading && !body.total) {
      return NextResponse.json(
        { error: "At least math, reading, or total score is required" },
        { status: 400 }
      );
    }

    // Get or create Testing container
    const testing = await prisma.testing.upsert({
      where: { studentProfileId: profileId },
      create: { studentProfileId: profileId },
      update: {},
    });

    // Parse scores - math and reading are required
    const math = body.math ? parseInt(body.math) : 0;
    const reading = body.reading ? parseInt(body.reading) : 0;
    const total = body.total ? parseInt(body.total) : (math + reading);

    // Parse test date, default to today if not provided or invalid
    let testDate: Date;
    if (body.testDate) {
      testDate = new Date(body.testDate);
      if (isNaN(testDate.getTime())) {
        testDate = new Date();
      }
    } else {
      testDate = new Date();
    }

    const satScore = await prisma.sATScore.create({
      data: {
        testingId: testing.id,
        total,
        math,
        reading,
        essay: body.essay ? parseInt(body.essay) : null,
        testDate,
        isSuperscored: body.isSuperscored || false,
        isPrimary: body.isPrimary || false,
      },
    });

    return NextResponse.json(satScore, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "Profile not found") {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    console.error("Error creating SAT score:", error);
    return NextResponse.json(
      { error: "Failed to create SAT score", details: error instanceof Error ? error.message : "Unknown" },
      { status: 500 }
    );
  }
}

