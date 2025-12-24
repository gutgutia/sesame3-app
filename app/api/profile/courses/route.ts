import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireProfile } from "@/lib/auth";

/**
 * GET /api/profile/courses
 * Get all courses for the current user
 */
export async function GET() {
  try {
    const profileId = await requireProfile();
    
    const courses = await prisma.course.findMany({
      where: { studentProfileId: profileId },
      orderBy: [
        { gradeLevel: "asc" },
        { name: "asc" },
      ],
    });
    
    return NextResponse.json(courses);
  } catch (error) {
    if (error instanceof Error && error.message === "Profile not found") {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    console.error("Error fetching courses:", error);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}

/**
 * POST /api/profile/courses
 * Add a new course
 */
export async function POST(request: NextRequest) {
  try {
    const profileId = await requireProfile();
    const body = await request.json();
    
    const course = await prisma.course.create({
      data: {
        studentProfileId: profileId,
        name: body.name,
        subject: body.subject,
        level: body.level || "regular",
        status: body.status || "completed",
        gradeLevel: body.gradeLevel,
        grade: body.grade,
        gradeNumeric: body.gradeNumeric,
        credits: body.credits,
      },
    });
    
    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "Profile not found") {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    console.error("Error creating course:", error);
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
  }
}
