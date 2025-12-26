import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentProfileId } from "@/lib/auth";

/**
 * GET /api/opportunities/summer-programs
 * Get the current user's tracked summer programs
 */
export async function GET() {
  try {
    const profileId = await getCurrentProfileId();

    if (!profileId) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const trackedPrograms = await prisma.studentSummerProgram.findMany({
      where: { studentProfileId: profileId },
      include: {
        summerProgram: true,
      },
      orderBy: [
        { status: "asc" },
        { displayOrder: "asc" },
        { createdAt: "desc" },
      ],
    });

    return NextResponse.json(trackedPrograms);
  } catch (error) {
    console.error("Error fetching tracked programs:", error);
    return NextResponse.json(
      { error: "Failed to fetch tracked programs" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/opportunities/summer-programs
 * Add a summer program to tracking
 */
export async function POST(request: NextRequest) {
  try {
    const profileId = await getCurrentProfileId();

    if (!profileId) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { summerProgramId, applicationYear, status = "interested", notes, whyInterested } = body;

    if (!summerProgramId) {
      return NextResponse.json(
        { error: "summerProgramId is required" },
        { status: 400 }
      );
    }

    // Get the program to determine the application year if not provided
    const program = await prisma.summerProgram.findUnique({
      where: { id: summerProgramId },
    });

    if (!program) {
      return NextResponse.json(
        { error: "Program not found" },
        { status: 404 }
      );
    }

    const year = applicationYear || program.programYear;

    // Check if already tracking this program for this year
    const existing = await prisma.studentSummerProgram.findUnique({
      where: {
        studentProfileId_summerProgramId_applicationYear: {
          studentProfileId: profileId,
          summerProgramId,
          applicationYear: year,
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Already tracking this program for this year" },
        { status: 409 }
      );
    }

    const tracked = await prisma.studentSummerProgram.create({
      data: {
        studentProfileId: profileId,
        summerProgramId,
        applicationYear: year,
        status,
        notes,
        whyInterested,
      },
      include: {
        summerProgram: true,
      },
    });

    return NextResponse.json(tracked, { status: 201 });
  } catch (error) {
    console.error("Error adding program to tracking:", error);
    return NextResponse.json(
      { error: "Failed to add program to tracking" },
      { status: 500 }
    );
  }
}
