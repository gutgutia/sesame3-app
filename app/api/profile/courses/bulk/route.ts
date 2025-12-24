import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireProfile } from "@/lib/auth";

// Grade to numeric value mapping
const GRADE_VALUES: Record<string, number> = {
  "A+": 4.0, "A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7,
  "D+": 1.3, "D": 1.0, "D-": 0.7,
  "F": 0.0,
};

interface CourseInput {
  name: string;
  subject?: string;
  level?: string;
  gradeLevel?: string;
  grade?: string;
  credits?: number;
  skipDuplicate?: boolean;
}

/**
 * POST /api/profile/courses/bulk
 * Import multiple courses at once
 */
export async function POST(request: NextRequest) {
  try {
    const profileId = await requireProfile();
    const body = await request.json();
    
    const courses: CourseInput[] = body.courses;
    
    if (!Array.isArray(courses) || courses.length === 0) {
      return NextResponse.json({ error: "No courses provided" }, { status: 400 });
    }

    // Get existing courses for deduplication
    const existingCourses = await prisma.course.findMany({
      where: { studentProfileId: profileId },
      select: { id: true, name: true, gradeLevel: true },
    });

    const results = {
      imported: 0,
      skipped: 0,
      duplicates: [] as string[],
      errors: [] as string[],
    };

    // Process each course
    for (const course of courses) {
      try {
        // Skip if marked as duplicate to skip
        if (course.skipDuplicate) {
          results.skipped++;
          continue;
        }

        // Check for duplicates
        const isDuplicate = existingCourses.some(
          (c) =>
            c.name.toLowerCase().trim() === course.name.toLowerCase().trim() &&
            c.gradeLevel === course.gradeLevel
        );

        if (isDuplicate) {
          results.duplicates.push(`${course.name} (${course.gradeLevel})`);
          results.skipped++;
          continue;
        }

        // Calculate numeric grade if letter grade provided
        const gradeNumeric = course.grade ? GRADE_VALUES[course.grade] : undefined;

        // Create the course
        await prisma.course.create({
          data: {
            studentProfileId: profileId,
            name: course.name.trim(),
            subject: course.subject || null,
            level: course.level || "regular",
            status: "completed",
            gradeLevel: course.gradeLevel || null,
            grade: course.grade || null,
            gradeNumeric: gradeNumeric ?? null,
            credits: course.credits ?? 1,
          },
        });

        results.imported++;

        // Add to existing courses list to prevent duplicates within batch
        existingCourses.push({
          id: "temp",
          name: course.name,
          gradeLevel: course.gradeLevel || null,
        });

      } catch (error) {
        console.error("Error importing course:", course.name, error);
        results.errors.push(course.name);
      }
    }

    return NextResponse.json({
      success: true,
      imported: results.imported,
      skipped: results.skipped,
      duplicates: results.duplicates,
      errors: results.errors,
    });

  } catch (error) {
    console.error("Error bulk importing courses:", error);
    return NextResponse.json(
      { error: "Failed to import courses" },
      { status: 500 }
    );
  }
}

