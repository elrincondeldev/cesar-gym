// src/app/[slug]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Buscar el enlace en la base de datos
    const link = await prisma.link.findFirst({
      where: { url: `https://cesar-gym.vercel.app/${slug}` },
    });

    if (!link) {
      // Redirigir a una página de error si el enlace no existe
      return NextResponse.redirect("/404", 302);
    }

    if (link.uses <= 0) {
      // Devolver un error si no hay usos restantes
      return NextResponse.json(
        { error: "No remaining uses for this link" },
        { status: 410 }
      );
    }

    // Actualizar el número de usos restantes del enlace
    await prisma.link.update({
      where: { id: link.id },
      data: { uses: link.uses - 1 },
    });

    // Redirigir al destino deseado
    const response = NextResponse.redirect("https://wa.me/34601506486", 302);

    // Establecer encabezados CORS para permitir solicitudes desde cualquier origen
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Manejo de solicitudes OPTIONS para preflight CORS
export async function OPTIONS(request: NextRequest) {
  const response = NextResponse.json({}, { status: 204 });
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  return response;
}
