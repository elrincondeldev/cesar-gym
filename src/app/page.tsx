import Dashboard from "@/components/Dashboard";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <main className="">
      <Dashboard />
      <Toaster />
    </main>
  );
}
