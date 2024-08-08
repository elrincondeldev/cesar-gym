"use client";

import { useEffect } from "react";
import UAParser from "ua-parser-js";

const RedirectPage = ({ url }: { url: string }) => {
  useEffect(() => {
    if (url) {
      window.location.href = url; // Redirige automáticamente
    }
  }, [url]);

  return <div>Redirigiendo...</div>;
};

export async function getServerSideProps(context: any) {
  const ua = UAParser(context.req.headers["user-agent"]);
  const { slug } = context.query; // Aquí debes extraer el slug

  // Ejemplo de cómo podrías obtener parámetros adicionales, por ejemplo, desde una base de datos o una API.
  // Aquí simplemente se hace una simulación de cómo construir la URL.
  // Por ejemplo, podrías tener una base de datos que te diga el número de teléfono y mensaje basado en el slug.

  const phoneNumber = "34601506486"; // Número de teléfono de destino
  const message = "Hola, ¿cómo estás?"; // Mensaje a enviar

  // Determinar la URL según el tipo de dispositivo
  const deviceType = ua.device.type || "desktop";
  const url =
    deviceType === "desktop"
      ? `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
          message
        )}`
      : `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
          message
        )}`;

  return {
    props: {
      url,
    },
  };
}

export default RedirectPage;
