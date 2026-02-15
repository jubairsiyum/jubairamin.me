"use client";

import { useEffect } from "react";
import { BiX } from "react-icons/bi";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-7xl h-[95vh] bg-white dark:bg-zinc-900 rounded-xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-sm font-mono font-semibold dark:text-zinc-300 text-zinc-700">
              $ cat resume.pdf
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition-colors group"
            aria-label="Close modal"
            title="Close (Esc)"
          >
            <BiX className="text-2xl dark:text-zinc-400 text-zinc-600 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* PDF Content - Inline Display */}
        <div className="flex-1 overflow-auto bg-zinc-100 dark:bg-zinc-950 p-4">
          <div className="w-full h-full min-h-[600px] bg-white dark:bg-zinc-900 rounded-lg shadow-inner">
            <iframe
              src="/resume.pdf#view=FitH&toolbar=0&navpanes=0"
              className="w-full h-full border-0 rounded-lg"
              title="Resume PDF Viewer"
              style={{ minHeight: '600px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
