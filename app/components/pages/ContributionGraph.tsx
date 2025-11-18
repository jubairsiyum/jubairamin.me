"use client";
import { useTheme } from "next-themes";
import GitHubCalendar from "react-github-calendar";
import { github } from "@/app/data/contribution-graph-theme";
import { useState, useEffect } from "react";
import YearButton from "../shared/YearButton";
import { getGitHubYears } from "@/app/utils/calculate-years";
import EmptyState from "../shared/EmptyState";
import { IoIosAnalytics } from "react-icons/io";
import { BiLogoGithub } from "react-icons/bi";

export default function ContributionGraph() {
  const [calendarYear, setCalendarYear] = useState<number | undefined>(
    undefined
  );
  const { theme, systemTheme } = useTheme();
  const [serverTheme, setServerTheme] = useState<"light" | "dark" | undefined>(
    undefined
  );
  const scheme =
    theme === "light" ? "light" : theme === "dark" ? "dark" : systemTheme;

  // Set theme only after rendering to avoid mismatch between client and server
  // https://github.com/vercel/next.js/issues/10608#issuecomment-589073831
  useEffect(() => {
    setServerTheme(scheme);
  }, [scheme]);

  const today = new Date().getFullYear();
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
  const joinYear = Number(process.env.NEXT_PUBLIC_GITHUB_JOIN_YEAR);
  const years = getGitHubYears(joinYear);

  if (!username || !joinYear)
    return (
      <EmptyState
        icon={<IoIosAnalytics />}
        title="Unable to load Contribution Graph"
        message="We could not find any GitHub credentials added to the .env file. To display the graph, provide your username and the year you joined GitHub"
      />
    );

  return (
    <div className="w-full bg-white dark:bg-zinc-900/95 border border-zinc-200/50 dark:border-white/10 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.35)] dark:shadow-[0_0_50px_rgba(0,0,0,0.6)] overflow-hidden">
      {/* Premium Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 lg:px-6 py-4 bg-zinc-50/50 dark:bg-zinc-800/30 border-b border-zinc-200 dark:border-zinc-800/50">
        <div className="flex items-center gap-3">
          <BiLogoGithub className="text-xl dark:text-zinc-300 text-zinc-700" />
          <div>
            <h3 className="text-lg font-semibold dark:text-white text-zinc-900 tracking-tight">
              GitHub Activity
            </h3>
            <p className="text-xs font-mono dark:text-zinc-500 text-zinc-500 mt-0.5">
              {calendarYear ? `Contributions in ${calendarYear}` : `All time contributions`}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {years.slice(0, 5).map((year) => (
            <button
              key={year}
              onClick={() => setCalendarYear(year === calendarYear ? undefined : year)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all duration-200 ${
                year === calendarYear
                  ? "bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-md scale-105"
                  : "bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 dark:text-zinc-300 text-zinc-700 hover:border-zinc-900 dark:hover:border-zinc-500 hover:scale-105"
              }`}
              title={`View contributions for ${year}`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* GitHub Calendar */}
      <div className="px-5 lg:px-6 py-4 overflow-hidden">
        <div className="w-full contribution-graph" style={{ maxWidth: '100%' }}>
          <GitHubCalendar
            username={username}
            theme={github}
            colorScheme={serverTheme}
            blockSize={12}
            year={calendarYear}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      {/* Footer with Enhanced Info */}
      <div className="px-5 lg:px-6 py-3 bg-zinc-50/30 dark:bg-zinc-800/20 border-t border-zinc-200 dark:border-zinc-800/50">
        <div className="flex items-center gap-2 text-xs font-mono dark:text-zinc-400 text-zinc-600">
          <BiLogoGithub className="text-base" />
          <span>
            <span className="dark:text-green-400 text-green-600 font-bold">●</span> Data synced from GitHub
          </span>
          <span className="dark:text-zinc-600 text-zinc-400">•</span>
          <a 
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="dark:text-zinc-300 text-zinc-700 hover:dark:text-white hover:text-zinc-900 transition-colors underline-offset-2 hover:underline font-medium"
          >
            @{username}
          </a>
        </div>
      </div>

      <style jsx global>{`
        /* Remove blank space - hide the rightmost element group */
        .contribution-graph svg > g:last-child {
          display: none !important;
        }
        /* Force full width */
        .contribution-graph,
        .contribution-graph > *,
        .contribution-graph svg {
          width: 100% !important;
          max-width: 100% !important;
        }
        .contribution-graph svg {
          height: auto !important;
          display: block !important;
        }
        .contribution-graph rect {
          transition: all 200ms ease;
          cursor: pointer;
        }
        .contribution-graph rect:hover {
          transform: scale(1.1);
          filter: brightness(1.25);
        }
      `}</style>
    </div>
  );
}
