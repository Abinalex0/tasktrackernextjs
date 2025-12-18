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

"use client";

import { createTask } from "@/app/add/actions";

export default function TaskForm() {
  return (
    <form action={createTask} className="flex flex-col gap-4">
      <input
        type="text"
        name="title"
        placeholder="Task title"
        required
        className="border p-2 rounded"
      />

      <textarea
        name="description"
        placeholder="Task description (optional)"
        className="border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Task
      </button>
    </form>
  );
}
