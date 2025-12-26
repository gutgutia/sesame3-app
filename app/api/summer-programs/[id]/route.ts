import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentProfileId } from "@/lib/auth";

/**
 * GET /api/summer-programs/[id]
 * Get a single summer program with tracking status
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const profileId = await getCurrentProfileId();

    const program = await prisma.summerProgram.findUnique({
      where: { id },
    });

    if (!program) {
      return NextResponse.json(
        { error: "Program not found" },
        { status: 404 }
      );
    }

    // Check if user is tracking this program
    let trackingInfo = null;
    if (profileId) {
      const tracked = await prisma.studentSummerProgram.findFirst({
        where: {
          studentProfileId: profileId,
          summerProgramId: id,
        },
      });
      if (tracked) {
        trackingInfo = {
          id: tracked.id,
          status: tracked.status,
          applicationYear: tracked.applicationYear,
          notes: tracked.notes,
          whyInterested: tracked.whyInterested,
        };
      }
    }

    return NextResponse.json({
      program,
      tracking: trackingInfo,
    });
  } catch (error) {
    console.error("Error fetching program:", error);
    return NextResponse.json(
      { error: "Failed to fetch program" },
      { status: 500 }
    );
  }
}
