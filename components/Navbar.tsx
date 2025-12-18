"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-black text-white p-4 flex gap-6">
      <Link href="/">Home</Link>
      <Link href="/add">Add Task</Link>
    </nav>
  );
}
