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
    
    // Get or create Testing container
    const testing = await prisma.testing.upsert({
      where: { studentProfileId: profileId },
      create: { studentProfileId: profileId },
      update: {},
    });
    
    // Calculate total from sections
    const total = (body.math || 0) + (body.reading || 0);
    
    const satScore = await prisma.sATScore.create({
      data: {
        testingId: testing.id,
        total,
        math: body.math,
        reading: body.reading,
        essay: body.essay,
        testDate: new Date(body.testDate),
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
    return NextResponse.json({ error: "Failed to create SAT score" }, { status: 500 });
  }
}

