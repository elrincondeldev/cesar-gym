import Dashboard from "@/components/Dashboard";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Dashboard />
      <Toaster />
    </main>
  );
}
