import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { linkSchema } from "@/lib/validate";
import { slugify } from "@/lib/slug";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ await it

  try {
    const session = await getAuthSession();

    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const data = linkSchema.parse(body);

    // Generate slug if not provided
    const slug = data.slug || slugify(data.title);

    // Check if slug already exists (excluding current link)
    const existingLink = await db.affiliateLink.findFirst({
      where: {
        slug,
        id: { not: id },
      },
    });

    if (existingLink) {
      return NextResponse.json(
        { error: "A link with this slug already exists" },
        { status: 400 }
      );
    }

    const link = await db.affiliateLink.update({
      where: { id },
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

    return NextResponse.json(link);
  } catch (error) {
    console.error("Error updating link:", error);
    return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ await it

  try {
    const session = await getAuthSession();

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await db.affiliateLink.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Link deleted successfully" });
  } catch (error) {
    console.error("Error deleting link:", error);
    return NextResponse.json(
      { error: "Failed to delete link" },
      { status: 500 }
    );
  }
}
