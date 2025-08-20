import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const link = await db.affiliateLink.findUnique({
      where: { slug: params.slug },
    });

    if (!link) {
      return new NextResponse("Link not found", { status: 404 });
    }

    // Increment clicks
    await db.affiliateLink.update({
      where: { id: link.id },
      data: { clicks: { increment: 1 } },
    });

    // Redirect to the affiliate URL
    const response = NextResponse.redirect(link.url, 302);

    // Add security headers
    response.headers.set("Referrer-Policy", "no-referrer");

    return response;
  } catch (error) {
    console.error("Error processing affiliate link:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
