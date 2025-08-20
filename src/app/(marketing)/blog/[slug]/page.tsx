import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = await db.blogPost.findUnique({
    where: { slug: params.slug },
    include: { category: true, author: true },
  });

  if (!post) {
    return {
      title: "Post Not Found - AffiliateSite",
    };
  }

  return {
    title: `${post.title} - AffiliateSite`,
    description: post.excerpt,
    openGraph: post.coverImage
      ? {
          images: [{ url: post.coverImage }],
        }
      : undefined,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await db.blogPost.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      author: true,
      links: true,
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          {post.coverImage && (
            <div className="relative h-64 md:h-96 w-full">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {post.category.name}
              </span>
              <span className="text-sm text-gray-500">
                by {post.author.name}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-xl text-gray-600 mb-8">{post.excerpt}</p>

              <div
                className="markdown-content"
                dangerouslySetInnerHTML={{
                  __html: post.content
                    .replace(/\n/g, "<br>")
                    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
                    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
                    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
                    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                    .replace(/\*(.*?)\*/g, "<em>$1</em>")
                    .replace(/- (.*$)/gim, "<li>$1</li>")
                    .replace(/<li>(.*?)<\/li>/g, "<ul><li>$1</li></ul>"),
                }}
              />
            </div>

            {post.links.length > 0 && (
              <div className="border-t pt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Recommended Products
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {post.links.map((link) => (
                    <div
                      key={link.id}
                      className="bg-gray-50 rounded-lg p-4 border"
                    >
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {link.title}
                      </h4>
                      {link.program && (
                        <p className="text-sm text-gray-600 mb-3">
                          via {link.program}
                        </p>
                      )}
                      <Link
                        href={`/go/${link.slug}`}
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                        rel="nofollow sponsored"
                      >
                        Check Price
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
