import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    console.log("test22");
    return NextResponse.redirect(new URL("https://girlazo.com", request.url));

    // const { slug } = params;

    // const link = await prisma.link.findFirst({
    //   where: { url: `https://cesar-gym.vercel.app/${slug}` },
    // });

    // if (!link) {
    //   console.log("Link not found");
    //   return Response.redirect("/404", 302);
    // }

    // if (link.uses <= 0) {
    //   console.log("No remaining uses");
    //   return Response.json(
    //     { error: "No remaining uses for this link" },
    //     { status: 410 }
    //   );
    // }

    // await prisma.link.update({
    //   where: { id: link.id },
    //   data: { uses: link.uses - 1 },
    // });

    // console.log("Redirecting to external URL");
    // const response = Response.redirect("https://wa.me/34601506486", 302);

    // response.headers.set("Access-Control-Allow-Origin", "*");
    // response.headers.set(
    //   "Access-Control-Allow-Methods",
    //   "GET, POST, PUT, DELETE, OPTIONS"
    // );
    // response.headers.set(
    //   "Access-Control-Allow-Headers",
    //   "Content-Type, Authorization"
    // );

    // return response;
  } catch (error) {
    console.error("Error in GET request:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function OPTIONS(request: NextRequest) {
  const response = Response.json({}, { status: 204 });
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
