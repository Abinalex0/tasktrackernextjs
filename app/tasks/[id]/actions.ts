"use server";

import { connectDB } from "@/lib/db";
import Task from "@/models/Task";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function deleteTask(id: string) {
  if (!id) {
    throw new Error("Task id missing");
  }

  await connectDB();
  await Task.findByIdAndDelete(id);

  revalidatePath("/"); 
  redirect("/");         
}

