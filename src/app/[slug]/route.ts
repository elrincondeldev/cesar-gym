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

    const link = await prisma.link.findFirst({
      where: { url: `http://localhost:3000/${slug}` },
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

    return NextResponse.redirect("https://wa.me/34601506486", 302);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
