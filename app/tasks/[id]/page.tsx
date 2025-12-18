
// type Params = { id: string };

// export default async function StudentDetail({ params }: { params: Promise<Params> }) {
//   const { id } = await params; // ✅ MUST await params

//   const res = await fetch(`/api/tasks/${id}`, {
//     cache: "no-store",
//     // OR: next: { revalidate: 0 }
//   });

//   if (!res.ok) {
//     return (
//       <div className="text-center p-6 bg-white rounded shadow">
//         Task not found
//       </div>
//     );
//   }

//   const task = await res.json();

//   return (
//     <div className="bg-white p-6 rounded shadow">
//       <h1 className="text-2xl font-bold">{task.title}</h1>
//       <p className="text-gray-600 mt-2">{task.description ?? "No description"}</p>
//     </div>
//   );
// }

// import { headers } from "next/headers";

// export default async function StudentDetail({ params }: { params: Promise<{ id: string }> }) {
//   const { id } = await params; // await required

//   // Build absolute URL
// const hdrs = await headers();
// const host = hdrs.get("host");

//   const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
//   const baseUrl = `${protocol}://${host}`;

//   const res = await fetch(`${baseUrl}/api/tasks/${id}`, {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     return <div>Task not found</div>;
//   }

//   const task = await res.json();

//   return (
//     <div className="bg-white p-6 rounded shadow">
//       <h1 className="text-2xl font-bold">{task.title}</h1>
//       <p>{task.description ?? "No description"}</p>
//     </div>
//   );
// }

import Link from "next/link";

export default async function StudentDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const res = await fetch(`/api/tasks/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <div>Task not found</div>;
  }

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

        <form action={`/tasks/${id}/delete`} method="post">
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
