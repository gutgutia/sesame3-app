import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireProfile } from "@/lib/auth";

/**
 * PUT /api/profile/testing/act/[id]
 * Update an ACT score
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireProfile();
    const { id } = await params;
    const body = await request.json();
    
    // Calculate composite from sections
    const composite = Math.round(
      ((body.english || 0) + (body.math || 0) + (body.reading || 0) + (body.science || 0)) / 4
    );
    
    const actScore = await prisma.aCTScore.update({
      where: { id },
      data: {
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
    
    return NextResponse.json(actScore);
  } catch (error) {
    if (error instanceof Error && error.message === "Profile not found") {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    console.error("Error updating ACT score:", error);
    return NextResponse.json({ error: "Failed to update ACT score" }, { status: 500 });
  }
}

/**
 * DELETE /api/profile/testing/act/[id]
 * Delete an ACT score
 */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireProfile();
    const { id } = await params;
    
    await prisma.aCTScore.delete({
      where: { id },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === "Profile not found") {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    console.error("Error deleting ACT score:", error);
    return NextResponse.json({ error: "Failed to delete ACT score" }, { status: 500 });
  }
}

