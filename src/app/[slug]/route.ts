import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import UAParser from "ua-parser-js";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Parsear el User-Agent para detectar si es un móvil
    const userAgent = request.headers.get("user-agent") || "";
    const parser = new UAParser(userAgent);
    const device = parser.getDevice();
    const isMobile = device.type === "mobile" || device.type === "tablet";

    const link = await prisma.link.findFirst({
      where: { url: `https://cesar-gym.vercel.app/${slug}` },
    });

    if (!link) {
      return NextResponse.redirect("/404", 302);
    }

    if (link.uses <= 0) {
      return NextResponse.json(
        { error: "No remaining uses for this link" },
        { status: 410 }
      );
    }

    await prisma.link.update({
      where: { id: link.id },
      data: { uses: link.uses - 1 },
    });

    if (isMobile) {
      // Devolver JSON si es móvil
      return NextResponse.json({ redirectTo: "https://wa.me/34601506486" });
    } else {
      // Redirección directa si es escritorio
      const response = NextResponse.redirect("https://wa.me/34601506486", 302);

      response.headers.set(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, proxy-revalidate"
      );
      response.headers.set("Pragma", "no-cache");
      response.headers.set("Expires", "0");

      return response;
    }
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

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
