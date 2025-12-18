import { NextResponse } from "next/server";

export async function POST(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const origin = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // Call your DELETE API route
  await fetch(`${origin}/api/tasks/${id}`, {
    method: "DELETE",
  });

  // Redirect to homepage after delete
  return NextResponse.redirect(new URL("/", origin));
}
