import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireProfile } from "@/lib/auth";

/**
 * PUT /api/profile/testing/sat/[id]
 * Update an SAT score
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireProfile();
    const { id } = await params;
    const body = await request.json();
    
    // Calculate total from sections
    const total = (body.math || 0) + (body.reading || 0);
    
    const satScore = await prisma.sATScore.update({
      where: { id },
      data: {
        total,
        math: body.math,
        reading: body.reading,
        essay: body.essay,
        testDate: new Date(body.testDate),
        isSuperscored: body.isSuperscored || false,
        isPrimary: body.isPrimary || false,
      },
    });
    
    return NextResponse.json(satScore);
  } catch (error) {
    if (error instanceof Error && error.message === "Profile not found") {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    console.error("Error updating SAT score:", error);
    return NextResponse.json({ error: "Failed to update SAT score" }, { status: 500 });
  }
}

/**
 * DELETE /api/profile/testing/sat/[id]
 * Delete an SAT score
 */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireProfile();
    const { id } = await params;
    
    await prisma.sATScore.delete({
      where: { id },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === "Profile not found") {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    console.error("Error deleting SAT score:", error);
    return NextResponse.json({ error: "Failed to delete SAT score" }, { status: 500 });
  }
}

