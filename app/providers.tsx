"use client";

import { ThemeProvider } from "next-themes";
import PageLoader from "./components/global/PageLoader";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <PageLoader />
      {children}
    </ThemeProvider>
  );
}
