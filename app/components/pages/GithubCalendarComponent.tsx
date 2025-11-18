import ContributionGraph from "./ContributionGraph";
import { FadeIn } from "@/app/animation/FadeIn";
import { BiGitBranch } from "react-icons/bi";

export default function GithubCalendarComponent() {
  return (
    <section className="mt-16 lg:mt-20">
      <FadeIn delay={0.16}>
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-green-500 to-teal-500"></div>
            <div className="inline-flex items-center gap-3 px-4 py-2 border-2 border-zinc-300 dark:border-zinc-800 rounded-md bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
              <BiGitBranch />
              <span className="text-sm font-mono font-semibold dark:text-zinc-300 text-zinc-700">
                {'<'} Activity {'/>'}
              </span>
            </div>
            <div className="h-1 flex-1 bg-gradient-to-r from-teal-500 to-transparent"></div>
          </div>
          <h2 className="font-incognito text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold tracking-tight dark:text-white text-zinc-900">
            Contribution Graph
          </h2>
        </div>
      </FadeIn>

      <FadeIn delay={0.18}>
        <ContributionGraph />
      </FadeIn>
    </section>
  );
}
