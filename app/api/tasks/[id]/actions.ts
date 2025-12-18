"use server";

import { connectDB } from "@/lib/db";
import Task from "@/models/Task";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function deleteTask(id: string) {
  await connectDB();
  await Task.findByIdAndDelete(id);

  revalidatePath("/tasks");
  redirect("/tasks");
}
