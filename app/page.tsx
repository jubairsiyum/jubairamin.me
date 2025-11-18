import { profileQuery } from "@/lib/sanity.query";
import type { ProfileType } from "@/types";
import HeroSvg from "./assets/icons/HeroSvg";
import Job from "./components/pages/Job";
import Social from "./components/shared/Social";
import { Slide } from "./animation/Slide";
import { FadeIn } from "./animation/FadeIn";
import { sanityFetch } from "@/lib/sanity.client";
import ContributionGraph from "./components/pages/GithubCalendarComponent";

export default async function Home() {
  const profile: ProfileType = await sanityFetch({
    query: profileQuery,
    tags: ["profile"],
  });

  return (
    <main className="relative w-full min-h-screen">
      {/* Grid pattern background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-zinc-950"></div>
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"></div>
        <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 -mt-16 pt-36 lg:pt-48 pb-12 lg:pb-20">
        <section className="flex lg:flex-row flex-col lg:items-center items-start gap-x-16 gap-y-12 mb-24 lg:mb-32">
          <div key={profile?._id} className="flex-1 w-full lg:w-auto">
            <FadeIn>
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs font-mono font-semibold tracking-wider uppercase dark:text-zinc-500 text-zinc-400">
                    Available for work
                  </span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-zinc-300 dark:from-zinc-700 to-transparent"></div>
              </div>
              <h1 className="font-incognito font-bold tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl mb-8 leading-tight max-w-3xl">
                {profile?.headline ?? "Backend-Focused PHP Developer & APIs, Databases & CMS Platforms"}
              </h1>
              <div className="p-6 border-l-4 border-blue-500 dark:border-blue-400 bg-zinc-50 dark:bg-zinc-900/50 rounded-r-lg">
                <p className="text-base md:text-lg dark:text-zinc-400 text-zinc-600 leading-relaxed">
                  {profile?.shortBio ?? "I'm Jubair Amin, a backend developer passionate about building scalable server-side applications, crafting efficient APIs, and working with databases to create reliable systems that serve users and developers worldwide."}
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="mt-8">
                <Social type="social" />
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.14} className="lg:w-auto w-full flex justify-center lg:justify-end flex-shrink-0">
            <div className="relative w-full max-w-md lg:max-w-lg">
              <HeroSvg />
            </div>
          </FadeIn>
        </section>
        <ContributionGraph />
        <Job />
      </div>
    </main>
  );
}
