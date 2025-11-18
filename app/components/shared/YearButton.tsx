import { MouseEventHandler } from "react";

export default function YearButton({
  year,
  currentYear,
  onClick,
}: {
  year: number;
  currentYear: number | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-md text-center px-3 py-1.5 border-2 transition-all duration-200 text-xs font-mono font-semibold hover:scale-105 ${
        year === currentYear
          ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-zinc-900 dark:border-white"
          : "bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-white dark:text-white text-zinc-800"
      }`}
      title={`View Graph for the year ${year}`}
    >
      {year}
    </button>
  );
}
