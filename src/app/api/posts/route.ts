import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { postSchema } from "@/lib/validate";
import { slugify } from "@/lib/slug";

export async function POST(request: NextRequest) {
  try {
    const session = await getAuthSession();

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const data = postSchema.parse(body);

    // Generate slug if not provided
    const slug = data.slug || slugify(data.title);

    // Check if slug already exists
    const existingPost = await db.blogPost.findUnique({
      where: { slug },
    });

    if (existingPost) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 400 }
      );
    }

    const post = await db.blogPost.create({
      data: {
        ...data,
        slug,
        authorId: session.user.id,
      },
      include: {
        category: true,
        author: true,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
  }
}

export async function GET() {
  try {
    const posts = await db.blogPost.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        author: true,
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
