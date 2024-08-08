// src/app/[slug]/page.tsx

import { redirect } from "next/navigation";
import UAParser from "ua-parser-js";
import RedirectPage from "./RedirectPage"; // Asegúrate de que este archivo sea "client component"

async function fetchLinkData(slug: string) {
  // Aquí simulas la lógica de recuperación de datos basada en el slug
  // En una aplicación real, esto podría ser una llamada a una base de datos o API
  const phoneNumber = "34601506486";
  const message = "Hola, ¿cómo estás?";

  // Determina la URL según el tipo de dispositivo
  const userAgent = navigator.userAgent; // Esto es un ejemplo; en el servidor, tendrías que obtener el user-agent de la solicitud
  const ua = new UAParser(userAgent);
  const deviceType = ua.getDevice().type || "desktop";
  const url =
    deviceType === "desktop"
      ? `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
          message
        )}`
      : `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
          message
        )}`;

  return url;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Simular la recuperación de datos
  const url = await fetchLinkData(slug);

  // Si el cliente es un navegador, deberías redirigir usando `window.location` dentro del componente cliente
  if (typeof window === "undefined") {
    // Server-side redirection logic if needed
    redirect(url);
  }

  return <RedirectPage url={url} />;
}
