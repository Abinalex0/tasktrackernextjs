import { connectDB } from "@/lib/db";
import Task from "@/models/Task";
import { redirect } from "next/navigation";

export default async function EditTaskPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  await connectDB();
  const task = await Task.findById(id).lean();

  if (!task) {
    return <div>Task not found</div>;
  }

  async function updateTask(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    await connectDB();
    await Task.findByIdAndUpdate(id, {
      title,
      description,
    });

    redirect(`/tasks/${id}`);
  }

  return (
    <form action={updateTask} className="bg-white p-6 max-w-xl rounded shadow">
      <h2 className="text-xl font-bold mb-4">Edit Task</h2>

      <input
        name="title"
        defaultValue={task.title}
        className="border p-2 w-full mb-4"
      />

      <textarea
        name="description"
        defaultValue={task.description ?? ""}
        className="border p-2 w-full mb-4"
      />

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Update
      </button>
    </form>
  );
}
