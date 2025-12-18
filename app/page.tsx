// import TaskCard from "@/components/TaskCard";

// // async function getTasks() {
// //   const res = await fetch("http://localhost:3000/api/tasks", {
// //     cache: "no-store",
// //   });
// //   return res.json();
// // }
// async function getTasks() {
//   const res = await fetch("http://localhost:3000/api/tasks", {
//     cache: "no-store",
//   });

//   const data = await res.json();
//   console.log("DATA FROM API:", data); // 👈 Debug log
//   return data;
// }

// export default async function HomePage() {
//   const tasks = await getTasks();

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-6">Your Tasks</h1>

//       <div className="flex flex-col gap-4">
//         {tasks.map((task: any) => (
//   <TaskCard key={task._id} task={task} />
// ))}

//       </div>
//     </div>
//   );
// }

// import TaskCard from "@/components/TaskCard";

// export const dynamic = "force-dynamic";

// async function getTasks() {
//   const res = await fetch("/api/tasks", {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch tasks");
//   }

//   return res.json();
// }

// export default async function HomePage() {
//   const tasks = await getTasks();

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-6">Your Tasks</h1>

//       <div className="flex flex-col gap-4">
//         {tasks.map((task: any) => (
//           <TaskCard key={task._id} task={task} />
//         ))}
//       </div>
//     </div>
//   );
// }




// import TaskCard from "@/components/TaskCard";
// import { headers } from "next/headers";

// export const dynamic = "force-dynamic";

// async function getTasks() {
//   const headersList = headers();
//   const host = headersList.get("host");          // e.g. task-manager.vercel.app
//   const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

//   const res = await fetch(`${protocol}://${host}/api/tasks`, {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch tasks");
//   }

//   return res.json();
// }

// export default async function HomePage() {
//   const tasks = await getTasks();

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-6">Your Tasks</h1>

//       <div className="flex flex-col gap-4">
//         {tasks.map((task: any) => (
//           <TaskCard key={task._id} task={task} />
//         ))}
//       </div>
//     </div>
//   );
// }

import TaskCard from "@/components/TaskCard";
import { connectDB } from "@/lib/db";
import Task from "@/models/Task";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  await connectDB();

  const tasks = await Task.find()
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Tasks</h1>

      <div className="flex flex-col gap-4">
        {tasks.map((task: any) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
}
