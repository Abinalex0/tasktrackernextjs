// import Link from "next/link";

// export default function TaskCard({ task }: any) {
//   return (
//     <Link href={`/tasks/${task._id}`}

//       className="p-4 bg-white shadow rounded border hover:bg-gray-50"
//     >
//       <h2 className="text-xl font-semibold">{task.title}</h2>
//       <p className="text-gray-600">{task.description}</p>
//     </Link>
//   );
// }


import Link from "next/link";

type Task = {
  _id: string;
  title: string;
  description?: string | null;
};

export default function TaskCard({ task }: { task: Task }) {
  return (
    <Link
      href={`/tasks/${task._id}`}
      className="p-4 bg-white shadow rounded border hover:bg-gray-50 block"
    >
      <h2 className="text-xl font-semibold">{task.title}</h2>
      <p className="text-gray-600 text-sm mt-1">
        {task.description || "No description"}
      </p>
    </Link>
  );
}
