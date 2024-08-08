"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RedirectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLink = async () => {
      const slug = window.location.pathname.split("/").pop();
      if (!slug) {
        router.push("/404");
        return;
      }

      try {
        const response = await fetch(`/api/cesar/${slug}`);
        const data = await response.json();
        console.log(response);

        if (response.ok && data.success) {
          // Redirigir si el enlace es válido
          window.location.href =
            "whatsapp://send?phone=34601506486&text=Hello, this is a test message";
        } else {
          // Redirigir a una página de error si el enlace no es válido
          router.push("/404");
        }
      } catch (error) {
        console.error("Error fetching link:", error);
      } finally {
        setLoading(false);
      }
    };

    checkLink();
  }, [router]);

  if (loading) {
    return <p>Loading...</p>; // O cualquier otro indicador de carga
  }

  return null; // Esta página no renderiza nada ya que la redirección es inmediata
}
