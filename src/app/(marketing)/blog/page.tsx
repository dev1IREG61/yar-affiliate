import { db } from "@/lib/db";
import BlogCard from "@/components/BlogCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - AffiliateSite",
  description:
    "Read our latest articles and expert recommendations on products and services.",
};

export default async function BlogPage() {
  const posts = await db.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      author: true,
    },
  });

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Blog</h1>
          <p className="text-xl text-gray-600">
            Expert insights, reviews, and recommendations you can trust
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              No posts yet
            </h2>
            <p className="text-gray-600">
              Check back soon for our latest articles and recommendations.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
