import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentProfileId } from "@/lib/auth";

/**
 * GET /api/opportunities/summer-programs/[id]
 * Get a specific tracked program with full details
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const profileId = await getCurrentProfileId();
    const { id } = await params;

    if (!profileId) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const tracked = await prisma.studentSummerProgram.findFirst({
      where: {
        id,
        studentProfileId: profileId,
      },
      include: {
        summerProgram: true,
      },
    });

    if (!tracked) {
      return NextResponse.json(
        { error: "Tracked program not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(tracked);
  } catch (error) {
    console.error("Error fetching tracked program:", error);
    return NextResponse.json(
      { error: "Failed to fetch tracked program" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/opportunities/summer-programs/[id]
 * Update a tracked program (status, notes, etc.)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const profileId = await getCurrentProfileId();
    const { id } = await params;

    if (!profileId) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // Verify ownership
    const existing = await prisma.studentSummerProgram.findFirst({
      where: {
        id,
        studentProfileId: profileId,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Tracked program not found" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const allowedFields = [
      "status",
      "notes",
      "whyInterested",
      "applicationStarted",
      "applicationSubmitted",
      "decisionReceived",
      "outcome",
      "displayOrder",
    ];

    const updateData: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        // Handle date fields
        if (["applicationStarted", "applicationSubmitted", "decisionReceived"].includes(field) && body[field]) {
          updateData[field] = new Date(body[field]);
        } else {
          updateData[field] = body[field];
        }
      }
    }

    const updated = await prisma.studentSummerProgram.update({
      where: { id },
      data: updateData,
      include: {
        summerProgram: true,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating tracked program:", error);
    return NextResponse.json(
      { error: "Failed to update tracked program" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/opportunities/summer-programs/[id]
 * Remove a program from tracking
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const profileId = await getCurrentProfileId();
    const { id } = await params;

    if (!profileId) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // Verify ownership
    const existing = await prisma.studentSummerProgram.findFirst({
      where: {
        id,
        studentProfileId: profileId,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Tracked program not found" },
        { status: 404 }
      );
    }

    await prisma.studentSummerProgram.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing tracked program:", error);
    return NextResponse.json(
      { error: "Failed to remove tracked program" },
      { status: 500 }
    );
  }
}
