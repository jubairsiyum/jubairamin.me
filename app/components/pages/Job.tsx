import Image from "next/image";
import { jobQuery } from "@/lib/sanity.query";
import type { JobType } from "@/types";
import { formatDate } from "../../utils/date";
import { Slide } from "../../animation/Slide";
import { FadeIn } from "../../animation/FadeIn";
import { sanityFetch } from "@/lib/sanity.client";
import RefLink from "../shared/RefLink";
import EmptyState from "../shared/EmptyState";
import { RiBriefcase3Fill } from "react-icons/ri";

export default async function Job() {
  const jobs: JobType[] = await sanityFetch({
    query: jobQuery,
    tags: ["job"],
  });

  return (
    <section className="mt-24 lg:mt-32">
      <FadeIn delay={0.16}>
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-1 w-12 bg-gradient-to-r from-orange-500 to-red-500"></div>
            <div className="inline-flex items-center gap-3 px-4 py-2 border-2 border-zinc-300 dark:border-zinc-800 rounded-md bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
              <RiBriefcase3Fill />
              <span className="text-sm font-mono font-semibold dark:text-zinc-300 text-zinc-700">
                {'<'} Experience {'/>'}
              </span>
            </div>
            <div className="h-1 flex-1 bg-gradient-to-r from-red-500 to-transparent"></div>
          </div>
          <h2 className="font-incognito text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold tracking-tight dark:text-white text-zinc-900">
            Work Experience
          </h2>
        </div>
      </FadeIn>

      {jobs.length > 0 ? (
        <FadeIn delay={0.18}>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="group flex items-start gap-x-6 p-6 bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-white rounded-lg transition-all duration-200 hover:scale-[1.02]"
              >
                <div className="grid place-items-center bg-zinc-100 dark:bg-zinc-800 border-2 border-zinc-300 dark:border-zinc-700 min-h-[80px] min-w-[80px] p-3 rounded-lg overflow-clip flex-shrink-0">
                  <RefLink href={job.url}>
                    <Image
                      src={job.logo}
                      className="object-cover duration-300 group-hover:scale-110"
                      alt={`${job.name} logo`}
                      width={50}
                      height={50}
                    />
                  </RefLink>
                </div>
                <div className="flex flex-col items-start flex-1">
                  <h3 className="text-xl font-bold tracking-tight mb-1">{job.name}</h3>
                  <p className="font-mono text-sm dark:text-zinc-400 text-zinc-600">{job.jobTitle}</p>
                  <time className="text-xs font-mono dark:text-zinc-500 text-zinc-500 mt-3 tracking-wider uppercase">
                    {formatDate(job.startDate)} -{" "}
                    {job.endDate ? (
                      formatDate(job.endDate)
                    ) : (
                      <span className="dark:text-green-400 text-green-600 font-semibold">
                        Present
                      </span>
                    )}
                  </time>
                  <p className="tracking-tight dark:text-zinc-400 text-zinc-600 mt-4 leading-relaxed">
                    {job.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      ) : (
        <EmptyState
          icon={<RiBriefcase3Fill />}
          title="Work Experience Not Provided"
          message="We could not find any work experience at the moment. To add one, visit the Sanity studio to start editing the content."
        />
      )}
    </section>
  );
}
