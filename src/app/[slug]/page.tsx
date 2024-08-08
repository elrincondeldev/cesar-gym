// src/app/[slug]/page.tsx

import RedirectPage from "./RedirectPage";
import UAParser from "ua-parser-js";

export async function getServerSideProps(context: any) {
  const ua = UAParser(context.req.headers["user-agent"]);
  const { slug } = context.query;

  // Ejemplo de cómo podrías obtener parámetros adicionales
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

export default function SlugPage({ url }: { url: string }) {
  return <RedirectPage url={url} />;
}
