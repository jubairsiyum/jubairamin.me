import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { projectsQuery } from "@/lib/sanity.query";
import type { ProjectType } from "@/types";
import EmptyState from "../components/shared/EmptyState";
import { Slide } from "../animation/Slide";
import { sanityFetch } from "@/lib/sanity.client";
import PageHeading from "../components/shared/PageHeading";

export const metadata: Metadata = {
  title: "Project | Jubair Amin",
  metadataBase: new URL("https://jubairamin.me/projects"),
  description: "Explore projects built by Jubair Amin",
  openGraph: {
    title: "Projects | Jubair Amin",
    url: "https://jubairamin.me/projects",
    description: "Explore projects built by Jubair Amin",
    images:
      "https://res.cloudinary.com/jubairamin/image/upload/v1763563263/projects_h5a9hf.png",
  },
};

export default async function Project() {
  const projects: ProjectType[] = await sanityFetch({
    query: projectsQuery,
    tags: ["project"],
  });

  return (
    <main className="relative w-full min-h-screen">
      {/* Grid pattern background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-zinc-950"></div>
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent"></div>
        <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-pink-500/20 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 -mt-16 pt-36 lg:pt-48 pb-12 lg:pb-20">
        <PageHeading
          title="Projects"
          description="I've worked on tons of little projects over the years but these are the ones that I'm most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas on how it can be improved."
        />

        <Slide delay={0.1}>
          {projects.length > 0 ? (
            <section className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-6 mb-12">
              {projects.map((project) => (
                <Link
                  href={`/projects/${project.slug}`}
                  key={project._id}
                  className="group flex items-start gap-x-4 bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-white p-6 rounded-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                >
                  {project.logo ? (
                    <Image
                      src={project.logo}
                      width={60}
                      height={60}
                      alt={project.name}
                      className="dark:bg-zinc-800 bg-zinc-100 rounded-md p-2 border border-zinc-300 dark:border-zinc-700"
                    />
                  ) : (
                    <div className="dark:bg-zinc-800 bg-zinc-100 border border-zinc-300 dark:border-zinc-700 p-2 rounded-lg text-3xl w-[60px] h-[60px] flex items-center justify-center">
                      🪴
                    </div>
                  )}
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold tracking-tight mb-2 group-hover:text-blue-500 transition-colors">{project.name}</h2>
                    <div className="text-sm dark:text-zinc-400 text-zinc-600 font-mono">
                      {project.tagline}
                    </div>
                  </div>
                </Link>
              ))}
            </section>
          ) : (
            <EmptyState value="Projects" />
          )}
        </Slide>
      </div>
    </main>
  );
}
