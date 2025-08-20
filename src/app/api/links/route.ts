import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { linkSchema } from "@/lib/validate";
import { slugify } from "@/lib/slug";

export async function POST(request: NextRequest) {
  try {
    const session = await getAuthSession();

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const data = linkSchema.parse(body);

    // Generate slug if not provided
    const slug = data.slug || slugify(data.title);

    // Check if slug already exists
    const existingLink = await db.affiliateLink.findUnique({
      where: { slug },
    });

    if (existingLink) {
      return NextResponse.json(
        { error: "A link with this slug already exists" },
        { status: 400 }
      );
    }

    const link = await db.affiliateLink.create({
      data: {
        ...data,
        slug,
      },
      include: {
        post: {
          select: { title: true, slug: true },
        },
      },
    });

    return NextResponse.json(link, { status: 201 });
  } catch (error) {
    console.error("Error creating link:", error);
    return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
  }
}

export async function GET() {
  try {
    const links = await db.affiliateLink.findMany({
      orderBy: { clicks: "desc" },
      include: {
        post: {
          select: { title: true, slug: true },
        },
      },
    });

    return NextResponse.json(links);
  } catch (error) {
    console.error("Error fetching links:", error);
    return NextResponse.json(
      { error: "Failed to fetch links" },
      { status: 500 }
    );
  }
}
