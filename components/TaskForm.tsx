// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function TaskForm() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     await fetch("/api/tasks", {
//       method: "POST",
//       body: JSON.stringify({ title, description }),
//     });

//     router.push("/");
//     router.refresh();
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 shadow rounded">
//       <input
//         className="border p-2 rounded"
//         placeholder="Task Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />

//       <textarea
//         className="border p-2 rounded"
//         placeholder="Task Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />

//       <button className="bg-black text-white p-2 rounded">Add Task</button>
//     </form>
//   );
// }


import Link from "next/link";
import { deleteTask } from "./actions";

export default async function StudentDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const res = await fetch(`/api/tasks/${id}`, { cache: "no-store" });

  if (!res.ok) return <div>Task not found</div>;

  const task = await res.json();

  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold">{task.title}</h1>
      <p>{task.description ?? "No description"}</p>

      <div className="mt-6 flex gap-4">
        <Link
          href={`/tasks/${id}/edit`}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Edit
        </Link>

        <form action={deleteTask.bind(null, id)}>
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}
