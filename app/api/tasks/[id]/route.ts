// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/db";
// import Task from "@/models/Task";

// export async function GET(
//   _req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await connectDB();
//     const task = await Task.findById(params.id).lean();

//     if (!task) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 });
//     }

//     return NextResponse.json(task);
//   } catch (err) {
//     console.error("GET /api/tasks/[id] error:", err);
//     return NextResponse.json({ error: "Failed to fetch task" }, { status: 500 });
//   }
// }

// export async function PUT(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const body = await request.json();
//     const { title, description } = body;

//     await connectDB();

//     const updated = await Task.findByIdAndUpdate(
//       params.id,
//       { title, description },
//       { new: true }
//     );

//     if (!updated) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 });
//     }

//     return NextResponse.json(updated);
//   } catch (err) {
//     console.error("PUT /api/tasks/[id] error:", err);
//     return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
//   }
// }

// export async function DELETE(
//   _req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await connectDB();

//     const deleted = await Task.findByIdAndDelete(params.id);

//     if (!deleted) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 });
//     }

//     return NextResponse.json({ message: "Task deleted successfully" });
//   } catch (err) {
//     console.error("DELETE /api/tasks/[id] error:", err);
//     return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
//   }
// }




export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Task from "@/models/Task";

// -------------------- GET TASK BY ID --------------------
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await connectDB();
    const task = await Task.findById(id).lean();

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task);
  } catch (err) {
    console.error("GET /api/tasks/[id] error:", err);
    return NextResponse.json(
      { error: "Failed to fetch task" },
      { status: 500 }
    );
  }
}

// -------------------- UPDATE TASK --------------------
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { title, description } = await req.json();

    await connectDB();

    const updated = await Task.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PUT /api/tasks/[id] error:", err);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

// -------------------- DELETE TASK --------------------
export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await connectDB();
    const deleted = await Task.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("DELETE /api/tasks/[id] error:", err);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}
