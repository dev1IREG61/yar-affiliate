import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "@/components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AffiliateSite - Your Trusted Affiliate Marketing Platform",
  description:
    "Discover the best products and services through our curated affiliate links and expert blog content.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <footer className="bg-gray-900 text-white py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="col-span-1 md:col-span-2">
                    <h3 className="text-lg font-semibold mb-4">
                      AffiliateSite
                    </h3>
                    <p className="text-gray-300 mb-4">
                      Your trusted source for the best products and services. We
                      curate affiliate links to help you make informed
                      purchasing decisions.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
                      Navigation
                    </h4>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          href="/"
                          className="text-gray-300 hover:text-white"
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/blog"
                          className="text-gray-300 hover:text-white"
                        >
                          Blog
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/categories"
                          className="text-gray-300 hover:text-white"
                        >
                          Categories
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
                      Legal
                    </h4>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          href="/privacy"
                          className="text-gray-300 hover:text-white"
                        >
                          Privacy Policy
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/terms"
                          className="text-gray-300 hover:text-white"
                        >
                          Terms of Service
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/disclosure"
                          className="text-gray-300 hover:text-white"
                        >
                          Affiliate Disclosure
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-700">
                  <p className="text-gray-300 text-sm text-center">
                    © 2024 AffiliateSite. All rights reserved.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
