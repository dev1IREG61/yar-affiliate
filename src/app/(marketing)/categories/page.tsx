import { db } from "@/lib/db";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories - AffiliateSite",
  description:
    "Browse our content by category to find exactly what you're looking for.",
};

export default async function CategoriesPage() {
  const categories = await db.category.findMany({
    include: {
      _count: {
        select: { posts: true },
      },
    },
  });

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Categories</h1>
          <p className="text-xl text-gray-600">Browse our content by topic</p>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              No categories yet
            </h2>
            <p className="text-gray-600">
              Check back soon for organized content categories.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.name}
                </h2>
                <p className="text-gray-600">
                  {category._count.posts}{" "}
                  {category._count.posts === 1 ? "post" : "posts"}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
