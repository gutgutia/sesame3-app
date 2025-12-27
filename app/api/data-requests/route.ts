import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireProfile } from "@/lib/auth";

/**
 * POST /api/data-requests
 * Submit a request to add a new program or school to the database
 *
 * Body:
 *   - type: "program" | "school"
 *   - name: string (required)
 *   - organization?: string (for programs, e.g., "UCSB" for "UCSB SRA")
 *   - details?: object (additional info like year, type, url)
 */
export async function POST(request: NextRequest) {
  try {
    const profileId = await requireProfile();
    const body = await request.json();

    // Validate required fields
    if (!body.type || !["program", "school"].includes(body.type)) {
      return NextResponse.json(
        { error: "type must be 'program' or 'school'" },
        { status: 400 }
      );
    }

    if (!body.name || typeof body.name !== "string") {
      return NextResponse.json(
        { error: "name is required" },
        { status: 400 }
      );
    }

    // Check for existing pending request with same name and type
    const existingRequest = await prisma.dataRequest.findFirst({
      where: {
        type: body.type,
        name: { equals: body.name, mode: "insensitive" },
        status: "pending",
      },
    });

    if (existingRequest) {
      // Request already exists, just return success
      return NextResponse.json({
        message: "Request already submitted",
        requestId: existingRequest.id,
        alreadyExists: true,
      });
    }

    // Create the request
    const dataRequest = await prisma.dataRequest.create({
      data: {
        studentProfileId: profileId,
        type: body.type,
        name: body.name.trim(),
        organization: body.organization?.trim() || null,
        details: body.details || null,
      },
    });

    console.log(`[DataRequest] New ${body.type} request: ${body.name} (${dataRequest.id})`);

    return NextResponse.json({
      message: "Request submitted successfully",
      requestId: dataRequest.id,
    }, { status: 201 });

  } catch (error) {
    if (error instanceof Error && error.message === "Profile not found") {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    console.error("Error creating data request:", error);
    return NextResponse.json(
      { error: "Failed to submit request" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/data-requests
 * Get user's data requests (for viewing status)
 */
export async function GET() {
  try {
    const profileId = await requireProfile();

    const requests = await prisma.dataRequest.findMany({
      where: { studentProfileId: profileId },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json(requests);

  } catch (error) {
    if (error instanceof Error && error.message === "Profile not found") {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    console.error("Error fetching data requests:", error);
    return NextResponse.json(
      { error: "Failed to fetch requests" },
      { status: 500 }
    );
  }
}
