import Image from "next/legacy/image";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import type { PostType } from "@/types";
import { singlePostQuery } from "@/lib/sanity.query";
import { PortableText, toPlainText } from "@portabletext/react";
import { CustomPortableText } from "../../components/shared/CustomPortableText";
import { BiChevronRight, BiSolidTime, BiTime } from "react-icons/bi";
import { formatDate } from "../../utils/date";
import SharePost from "../../components/shared/SharePost";
import FeaturedPosts from "../../components/pages/FeaturedPosts";
import { Slide } from "../../animation/Slide";
import { urlFor } from "@/lib/sanity.image";
import Buymeacoffee from "@/app/components/shared/Buymeacoffee";
import Comments from "@/app/components/shared/Comments";
import { HiCalendar, HiChat } from "react-icons/hi";
import { sanityFetch } from "@/lib/sanity.client";
import { readTime } from "@/app/utils/readTime";
import PageHeading from "@/app/components/shared/PageHeading";

type Props = {
  params: {
    post: string;
  };
};

const fallbackImage: string =
  "https://res.cloudinary.com/victoreke/image/upload/v1692636087/victoreke/blog.png";

// Dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.post;
  const post: PostType = await sanityFetch({
    query: singlePostQuery,
    tags: ["Post"],
    qParams: { slug },
  });

  if (!post) {
    notFound();
  }

  return {
    title: `${post.title}`,
    metadataBase: new URL(`https://jubairamin.me/blog/${post.slug}`),
    description: post.description,
    publisher: post.author.name,
    keywords: post.tags,
    alternates: {
      canonical:
        post.canonicalLink || `https://jubairamin.me/blog/${post.slug}`,
    },
    openGraph: {
      images:
        urlFor(post.coverImage?.image).width(1200).height(630).url() ||
        fallbackImage,
      url: `https://jubairamin.me/blog/${post.slug}`,
      title: post.title,
      description: post.description,
      type: "article",
      siteName: "jubairamin.me",
      authors: post.author.name,
      tags: post.tags,
      publishedTime: post._createdAt,
      modifiedTime: post._updatedAt || "",
    },
    twitter: {
      title: post.title,
      description: post.description,
      images:
        urlFor(post.coverImage?.image).width(680).height(340).url() ||
        fallbackImage,
      creator: `@${post.author.twitterUrl.split("twitter.com/")[1]}`,
      site: `@${post.author.twitterUrl.split("twitter.com/")[1]}`,
      card: "summary_large_image",
    },
  };
}

export default async function Post({ params }: Props) {
  const slug = params.post;
  const post: PostType = await sanityFetch({
    query: singlePostQuery,
    tags: ["Post"],
    qParams: { slug },
  });

  const words = toPlainText(post.body);

  if (!post) {
    notFound();
  }

  return (
    <main className="relative w-full min-h-screen">
      {/* Grid pattern background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-zinc-950"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 -mt-16 pt-36 lg:pt-48 pb-12 lg:pb-20">
        <header>
          <Slide className="relative flex items-center gap-x-2 border-b-2 dark:border-zinc-800 border-zinc-300 pb-6 mb-10">
            <Link
              href="/blog"
              className="whitespace-nowrap dark:text-zinc-400 text-zinc-400 hover:dark:text-white hover:text-zinc-700 text-sm font-mono border-b dark:border-zinc-700 border-zinc-300 hover:border-zinc-900 dark:hover:border-white transition-colors"
            >
              cd ..
            </Link>
            <BiChevronRight />
            <p className="text-zinc-400 text-sm truncate font-mono">{post.title}</p>
          </Slide>
        </header>

        <article>
          <Slide
            className="grid lg:grid-cols-[70%,30%] grid-cols-1 gap-12 relative"
            delay={0.1}
          >
            <div className="min-h-full">
              <div className="flex items-center flex-wrap gap-4 text-sm mb-8 dark:text-zinc-400 text-zinc-600 font-mono">
                <div className="flex items-center gap-x-2">
                  <HiCalendar />
                  <time dateTime={post.date ? post.date : post._createdAt}>
                    {post.date
                      ? formatDate(post.date)
                      : formatDate(post._createdAt)}
                  </time>
                </div>
                <Link
                  href="#comments"
                  className="flex items-center gap-x-2 dark:text-blue-400 text-blue-600 hover:underline"
                >
                  <HiChat />
                  <div className="#comments">Comments</div>
                </Link>
                <div className="flex items-center gap-x-2">
                  <BiSolidTime />
                  <div className="">{readTime(words)}</div>
                </div>
              </div>

              <PageHeading title={post.title} description={post.description} />

              <div className="relative w-full h-40 pt-[52.5%] mb-10">
                <Image
                  className="rounded-lg border-2 dark:border-zinc-800 border-zinc-300 object-cover"
                  layout="fill"
                  src={post.coverImage?.image || fallbackImage}
                  alt={post.coverImage?.alt || post.title}
                  quality={100}
                  placeholder={post.coverImage?.lqip ? `blur` : "empty"}
                  blurDataURL={post.coverImage?.lqip || ""}
                />
              </div>

              <div className="mt-8 dark:text-zinc-400 text-zinc-600 leading-relaxed tracking-tight text-lg prose prose-lg dark:prose-invert max-w-none">
                <PortableText value={post.body} components={CustomPortableText} />
              </div>
            </div>

            <aside className="flex flex-col gap-y-8 lg:sticky lg:top-24 lg:self-start">
              <section className="p-6 bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-800 rounded-lg">
                <p className="dark:text-zinc-500 text-zinc-500 text-xs font-mono mb-4 uppercase tracking-wider">
                  Written By
                </p>
                <address className="flex items-center gap-x-3 not-italic">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <Image
                      src={urlFor(post.author.photo.image)
                        .width(80)
                        .height(80)
                        .url()}
                      alt={post.author.photo.alt}
                      layout="fill"
                      className="dark:bg-zinc-800 bg-zinc-300 rounded-full object-cover border-2 border-zinc-300 dark:border-zinc-700"
                    />
                  </div>
                  <div rel="author">
                    <h3 className="font-semibold text-base tracking-tight">
                      {post.author.name}
                    </h3>
                    <a
                      href={post.author.twitterUrl}
                      className="text-blue-500 text-sm font-mono hover:underline"
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      {`@${post.author.twitterUrl.split("twitter.com/")[1]}`}
                    </a>
                  </div>
                </address>
              </section>

              <section className="p-6 bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-800 rounded-lg">
                <h3 className="text-lg font-bold tracking-tight mb-4 font-mono">
                  Tags
                </h3>
                <ul className="flex flex-wrap items-center gap-2 tracking-tight">
                  {post.tags.map((tag, id) => (
                    <li
                      key={id}
                      className="bg-zinc-100 dark:bg-zinc-800 border-2 border-zinc-300 dark:border-zinc-700 rounded-md px-3 py-1.5 text-sm font-mono hover:border-zinc-900 dark:hover:border-white transition-colors"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </section>

              <SharePost
                title={post.title}
                slug={post.slug}
                description={post.description}
              />

              <section className="p-6 bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-800 rounded-lg">
                <h3 className="text-lg font-bold tracking-tight mb-4 font-mono">
                  Featured
                </h3>
                <FeaturedPosts params={params.post} />
              </section>
            </aside>
          </Slide>
        </article>

        <section
          id="comments"
          className="max-w-4xl mt-16 border-t-2 dark:border-zinc-800 border-zinc-300 pt-16"
        >
          <h3 className="text-3xl lg:text-4xl font-bold tracking-tight mb-8 font-incognito">
            Comments
          </h3>
          <Comments />
        </section>

        <section className="max-w-4xl pt-16">
          <h3 className="text-3xl lg:text-4xl font-bold tracking-tight mb-8 font-incognito">
            Support
          </h3>
          <Buymeacoffee />
        </section>
      </div>
    </main>
  );
}
