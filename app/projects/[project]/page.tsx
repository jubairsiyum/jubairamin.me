import Image from "next/image";
import { Metadata } from "next";
import { singleProjectQuery } from "@/lib/sanity.query";
import type { ProjectType } from "@/types";
import { PortableText } from "@portabletext/react";
import { CustomPortableText } from "@/app/components/shared/CustomPortableText";
import { Slide } from "../../animation/Slide";
import { urlFor } from "@/lib/sanity.image";
import { sanityFetch } from "@/lib/sanity.client";
import { BiLinkExternal, BiLogoGithub } from "react-icons/bi";

type Props = {
  params: {
    project: string;
  };
};

const fallbackImage: string =
  "https://res.cloudinary.com/victoreke/image/upload/v1692636087/victoreke/projects.png";

// Dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.project;
  const project: ProjectType = await sanityFetch({
    query: singleProjectQuery,
    tags: ["project"],
    qParams: { slug },
  });

  return {
    title: `${project.name} | Project`,
    metadataBase: new URL(`https://jubairamin.me/projects/${project.slug}`),
    description: project.tagline,
    openGraph: {
      images: project.coverImage
        ? urlFor(project.coverImage.image).width(1200).height(630).url()
        : fallbackImage,
      url: `https://jubairamin.me/projects/${project.slug}`,
      title: project.name,
      description: project.tagline,
    },
  };
}

export default async function Project({ params }: Props) {
  const slug = params.project;
  const project: ProjectType = await sanityFetch({
    query: singleProjectQuery,
    tags: ["project"],
    qParams: { slug },
  });

  return (
    <main className="relative w-full min-h-screen">
      {/* Grid pattern background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-zinc-950"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 -mt-16 pt-36 lg:pt-48 pb-12 lg:pb-20">
        <Slide>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start justify-between flex-wrap gap-6 mb-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                  <span className="text-xs font-mono font-semibold tracking-wider uppercase dark:text-zinc-500 text-zinc-400">
                    Project Details
                  </span>
                </div>
                <h1 className="font-incognito font-bold tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl mb-4 max-w-3xl">
                  {project.name}
                </h1>
              </div>

              <div className="flex items-center gap-x-3">
                <a
                  href={project.projectUrl}
                  rel="noreferrer noopener"
                  target="_blank"
                  className={`flex items-center gap-x-2 px-5 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-2 border-zinc-900 dark:border-white rounded-lg font-medium font-mono text-sm transition-all duration-200 ${
                    !project.projectUrl
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer hover:scale-[1.02] hover:shadow-lg"
                  }`}
                >
                  <BiLinkExternal aria-hidden="true" />
                  {project.projectUrl ? "Live URL" : "Coming Soon"}
                </a>

                <a
                  href={project.repository}
                  rel="noreferrer noopener"
                  target="_blank"
                  className={`flex items-center gap-x-2 px-5 py-3 bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-700 hover:border-zinc-900 dark:hover:border-white rounded-lg font-medium font-mono text-sm transition-all duration-200 ${
                    !project.repository
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer hover:scale-[1.02]"
                  }`}
                >
                  <BiLogoGithub aria-hidden="true" />
                  {project.repository ? "GitHub" : "No Repo"}
                </a>
              </div>
            </div>

            <div className="relative w-full h-40 pt-[52.5%] mb-10">
              <Image
                className="rounded-lg border-2 dark:border-zinc-800 border-zinc-300 object-cover"
                fill
                src={project.coverImage?.image ?? fallbackImage}
                alt={project.coverImage?.alt ?? project.name}
                quality={100}
                placeholder={project.coverImage?.lqip ? `blur` : "empty"}
                blurDataURL={project.coverImage?.lqip || ""}
              />
            </div>

            <div className="p-6 border-l-4 border-purple-500 dark:border-purple-400 bg-zinc-50 dark:bg-zinc-900/50 rounded-r-lg">
              <div className="prose prose-lg dark:prose-invert prose-zinc max-w-none dark:text-zinc-400 text-zinc-600 leading-relaxed">
                <PortableText
                  value={project.description}
                  components={CustomPortableText}
                />
              </div>
            </div>
          </div>
        </Slide>
      </div>
    </main>
  );
}
