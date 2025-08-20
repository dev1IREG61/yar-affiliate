import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import BlogCard from "@/components/BlogCard";
import Link from "next/link";

interface CategoryPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const category = await db.category.findUnique({
    where: { slug: params.slug },
  });

  if (!category) {
    return {
      title: "Category Not Found - AffiliateSite",
    };
  }

  return {
    title: `${category.name} - AffiliateSite`,
    description: `Browse all posts in the ${category.name} category.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await db.category.findUnique({
    where: { slug: params.slug },
    include: {
      posts: {
        include: {
          author: true,
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!category) {
    notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {category.name}
          </h1>
          <p className="text-xl text-gray-600">
            {category.posts.length}{" "}
            {category.posts.length === 1 ? "post" : "posts"} in this category
          </p>
        </div>

        {category.posts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              No posts in this category yet
            </h2>
            <p className="text-gray-600 mb-6">
              Check back soon for content in this category.
            </p>
            <Link
              href="/categories"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Browse all categories
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.posts.map((post) => (
              <BlogCard
                key={post.id}
                post={{
                  ...post,
                  category: { name: category.name, slug: category.slug },
                }}
              />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/categories"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Categories
          </Link>
        </div>
      </div>
    </div>
  );
}
