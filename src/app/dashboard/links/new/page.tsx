"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { linkSchema, type LinkFormData } from "@/lib/validate";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
}

export default function NewLinkPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LinkFormData>({
    resolver: zodResolver(linkSchema),
  });

  // Fetch posts on component mount
  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  const onSubmit = async (data: LinkFormData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/dashboard/links");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to create link");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/dashboard/links"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Links
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">
            Add New Link
          </h1>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                {...register("title")}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="slug"
                className="block text-sm font-medium text-gray-700"
              >
                Slug (optional - will be generated from title)
              </label>
              <input
                type="text"
                id="slug"
                {...register("slug")}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.slug && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.slug.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="url"
                className="block text-sm font-medium text-gray-700"
              >
                URL
              </label>
              <input
                type="url"
                id="url"
                {...register("url")}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com"
              />
              {errors.url && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.url.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="program"
                className="block text-sm font-medium text-gray-700"
              >
                Program (optional)
              </label>
              <input
                type="text"
                id="program"
                {...register("program")}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Amazon Associates, Commission Junction"
              />
              {errors.program && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.program.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="postId"
                className="block text-sm font-medium text-gray-700"
              >
                Associated Post (optional)
              </label>
              <select
                id="postId"
                {...register("postId")}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">No associated post</option>
                {posts.map((post) => (
                  <option key={post.id} value={post.id}>
                    {post.title}
                  </option>
                ))}
              </select>
              {errors.postId && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.postId.message}
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <Link
                href="/dashboard/links"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? "Creating..." : "Create Link"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
