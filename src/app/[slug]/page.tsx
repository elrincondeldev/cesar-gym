import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectHandler() {
  const router = useRouter();

  useEffect(() => {
    const handleRedirection = async () => {
      try {
        const response = await fetch(window.location.href);
        if (
          response.headers.get("content-type")?.includes("application/json")
        ) {
          const data = await response.json();
          if (data.redirectTo) {
            router.push(data.redirectTo); // Redirigir a la URL especificada
          }
        }
      } catch (error) {
        console.error("Error processing redirection:", error);
      }
    };

    handleRedirection();
  }, [router]);

  return <div>Redirigiendo...</div>; // Muestra un mensaje mientras se procesa la redirección
}
