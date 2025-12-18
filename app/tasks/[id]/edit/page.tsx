import { redirect } from "next/navigation";

export default async function EditTaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const origin = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${origin}/api/tasks/${id}`, { cache: "no-store" });
  const task = await res.json();

  async function updateTask(formData: FormData) {
    "use server";

    const title = formData.get("title");
    const description = formData.get("description");

    await fetch(`${origin}/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
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
        defaultValue={task.description}
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
