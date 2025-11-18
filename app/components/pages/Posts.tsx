import Image from "next/legacy/image";
import Link from "next/link";
import { postsQuery } from "@/lib/sanity.query";
import { PostType } from "@/types";
import EmptyState from "../shared/EmptyState";
import { BiSolidTime, BiTime } from "react-icons/bi";
import { formatDate } from "../../utils/date";
import { HiCalendar } from "react-icons/hi";
import { sanityFetch } from "@/lib/sanity.client";
import { readTime } from "@/app/utils/readTime";
import { toPlainText } from "@portabletext/react";

const fallbackImage: string =
  "https://res.cloudinary.com/victoreke/image/upload/v1692608339/victoreke/blog.png";

export default async function Posts() {
  const posts: PostType[] = await sanityFetch({
    query: postsQuery,
    tags: ["Post"],
  });

  return (
    <section>
      {posts.length > 0 ? (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 mb-12">
          {posts.map((post) =>
            post.isPublished !== true ? null : (
              <article key={post._id}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col h-full bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-white rounded-lg overflow-hidden transition-all duration-200 hover:scale-[1.02] hover:shadow-xl"
                >
                  <div className="relative w-full h-64 overflow-clip">
                    <Image
                      src={post.coverImage?.image || fallbackImage}
                      className="dark:bg-zinc-800 bg-zinc-100 object-cover group-hover:scale-110 duration-300"
                      alt={post.coverImage?.alt || post.title}
                      layout="fill"
                      placeholder={post.coverImage ? "blur" : "empty"}
                      blurDataURL={post.coverImage?.lqip || ""}
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h2 className="text-2xl font-bold tracking-tight mb-3 group-hover:text-blue-500 transition-colors">
                      {post.title}
                    </h2>
                    <p className="dark:text-zinc-400 text-zinc-600 text-base leading-relaxed flex-1">
                      {post.description}
                    </p>
                    <div className="flex items-center gap-x-4 mt-4 pt-4 border-t border-zinc-300 dark:border-zinc-800 text-sm font-mono">
                      <div className="flex items-center gap-x-2 dark:text-zinc-500 text-zinc-500">
                        <HiCalendar />
                        <time
                          dateTime={post.date ? post.date : post._createdAt}
                        >
                          {post.date
                            ? formatDate(post.date)
                            : formatDate(post._createdAt)}
                        </time>
                      </div>
                      <div className="flex items-center gap-x-2 dark:text-zinc-500 text-zinc-500">
                        <BiSolidTime />
                        <div className="">
                          {readTime(toPlainText(post.body))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            )
          )}
        </div>
      ) : (
        <EmptyState value="Blog Post" />
      )}
    </section>
  );
}
