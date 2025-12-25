import { NextRequest } from "next/server";
import { streamText } from "ai";
import { models } from "@/lib/ai/providers";
import { requireProfile } from "@/lib/auth";
import { STORY_CAPTURE_SYSTEM } from "@/lib/prompts";

export const maxDuration = 60;

// POST /api/profile/stories/chat - Stream story conversation
export async function POST(request: NextRequest) {
  try {
    await requireProfile();
    const body = await request.json();

    const { messages } = body;

    // Stream the conversation
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const result = streamText({
            model: models.claude.sonnet,
            system: STORY_CAPTURE_SYSTEM,
            messages,
          });

          // Get the text stream
          const textStream = result.textStream;

          // Stream text chunks
          for await (const chunk of textStream) {
            if (chunk) {
              controller.enqueue(encoder.encode(chunk));
            }
          }

          controller.close();
        } catch (error) {
          console.error("[StoryChat] Stream error:", error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error in story chat:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process story chat" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
