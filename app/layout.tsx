import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Task Tracker",
  description: "Simple Next.js Task Tracker App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <Navbar />
        <main className="max-w-3xl mx-auto py-10">
          {children}
        </main>
      </body>
    </html>
  );
}
