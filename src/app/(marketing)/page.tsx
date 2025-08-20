import Link from "next/link";
import { db } from "@/lib/db";
import BlogCard from "@/components/BlogCard";
import { notFound } from "next/navigation";

export default async function HomePage() {
  const [latestPosts, featuredLinks] = await Promise.all([
    db.blogPost.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        author: true,
      },
    }),
    db.affiliateLink.findMany({
      take: 6,
      orderBy: { clicks: "desc" },
    }),
  ]);

  if (!latestPosts) {
    notFound();
  }

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Amazing Products
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Your trusted source for the best deals and expert recommendations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/blog"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Explore Blog
              </Link>
              <Link
                href="/categories"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Latest from Our Blog
            </h2>
            <p className="text-lg text-gray-600">
              Expert insights and recommendations you can trust
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View All Posts
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Affiliate Links */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Recommendations
            </h2>
            <p className="text-lg text-gray-600">
              Top-rated products and services our readers love
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredLinks.map((link) => (
              <div
                key={link.id}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {link.title}
                </h3>
                {link.program && (
                  <p className="text-sm text-gray-600 mb-4">
                    via {link.program}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {link.clicks} clicks
                  </span>
                  <Link
                    href={`/go/${link.slug}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Check it out
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Find Your Perfect Match?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of readers who trust our recommendations
          </p>
          <Link
            href="/blog"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Start Exploring
          </Link>
        </div>
      </section>
    </div>
  );
}
