// src/app/[slug]/RedirectPage.tsx

"use client"; // Directiva para indicar que este es un Client Component

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const RedirectPage = ({ url }: { url: string }) => {
  const router = useRouter();

  useEffect(() => {
    if (url) {
      window.location.href = url; // Redirige automáticamente
    }
  }, [url]);

  return <div>Redirigiendo...</div>; // Mensaje mientras se procesa la redirección
};

export default RedirectPage;
