import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireProfile } from "@/lib/auth";

/**
 * GET /api/profile/testing/act
 * Get all ACT scores for the current user
 */
export async function GET() {
  try {
    const profileId = await requireProfile();
    
    // Get or create Testing container
    const testing = await prisma.testing.upsert({
      where: { studentProfileId: profileId },
      create: { studentProfileId: profileId },
      update: {},
      include: { actScores: { orderBy: { testDate: "desc" } } },
    });
    
    return NextResponse.json(testing.actScores);
  } catch (error) {
    if (error instanceof Error && error.message === "Profile not found") {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    console.error("Error fetching ACT scores:", error);
    return NextResponse.json({ error: "Failed to fetch ACT scores" }, { status: 500 });
  }
}

/**
 * POST /api/profile/testing/act
 * Add a new ACT score
 */
export async function POST(request: NextRequest) {
  try {
    const profileId = await requireProfile();
    const body = await request.json();
    
    // Get or create Testing container
    const testing = await prisma.testing.upsert({
      where: { studentProfileId: profileId },
      create: { studentProfileId: profileId },
      update: {},
    });
    
    // Calculate composite from sections
    const composite = Math.round(
      ((body.english || 0) + (body.math || 0) + (body.reading || 0) + (body.science || 0)) / 4
    );
    
    const actScore = await prisma.aCTScore.create({
      data: {
        testingId: testing.id,
        composite,
        english: body.english,
        math: body.math,
        reading: body.reading,
        science: body.science,
        writing: body.writing,
        testDate: new Date(body.testDate),
        isSuperscored: body.isSuperscored || false,
        isPrimary: body.isPrimary || false,
      },
    });
    
    return NextResponse.json(actScore, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "Profile not found") {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    console.error("Error creating ACT score:", error);
    return NextResponse.json({ error: "Failed to create ACT score" }, { status: 500 });
  }
}

