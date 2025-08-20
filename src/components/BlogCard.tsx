import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@prisma/client";

interface BlogCardProps {
  post: BlogPost & {
    category: { name: string; slug: string };
    author: { name: string };
  };
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {post.coverImage && (
        <div className="relative h-48 w-full">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {post.category.name}
          </span>
          <span className="text-sm text-gray-500">by {post.author.name}</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
            {post.title}
          </Link>
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
          <Link
            href={`/blog/${post.slug}`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
}
