// src/app/redirect/[...slug]/page.tsx
import { redirect } from "next/navigation";

export default function RedirectPage() {
  redirect(
    "whatsapp://send?phone=34601506486&text=Hello, this is a test message"
  );
  return null; // Esta página no renderiza nada porque se hace la redirección inmediatamente
}
