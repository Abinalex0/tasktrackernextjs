// let tasks: any[] = [];

// export async function GET() {
//   return Response.json(tasks);
// }

// export async function POST(req: Request) {
//   const body = await req.json();
//   const newTask = { id: Date.now().toString(), ...body };
//   tasks.push(newTask);

//   return Response.json(newTask, { status: 201 });
// }



// app/api/tasks/route.ts

export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db"
import Task from "@/models/Task";

export async function GET() {
  try {
    await connectDB();
    const tasks = await Task.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(tasks);
  } catch (err) {
    console.error("GET /api/tasks error:", err);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description } = body || {};

    if (!title || typeof title !== "string") {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    await connectDB();

    const newTask = await Task.create({
      title: title.trim(),
      description: description ? String(description).trim() : null,
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (err) {
    console.error("POST /api/tasks error:", err);
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}
