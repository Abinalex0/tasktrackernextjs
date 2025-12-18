"use server";

import { connectDB } from "@/lib/db";
import Task from "@/models/Task";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createTask(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  if (!title) return;

  await connectDB();
  await Task.create({ title, description });
  revalidatePath("/"); 
  redirect("/");   
}
