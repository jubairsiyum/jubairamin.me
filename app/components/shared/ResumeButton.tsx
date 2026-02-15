"use client";

import { useState } from "react";
import ResumeModal from "./ResumeModal";

interface ResumeButtonProps {
  resumeURL?: string;
}

export default function ResumeButton({ resumeURL }: ResumeButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-2 border-zinc-900 dark:border-white hover:bg-transparent hover:text-zinc-900 dark:hover:bg-transparent dark:hover:text-white rounded-lg transition-all duration-200 hover:scale-[1.02] group font-mono text-sm font-semibold w-full"
        title="View Resume"
      >
        <span>$ cat resume.pdf</span>
      </button>

      <ResumeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} resumeURL={resumeURL} />
    </>
  );
}
