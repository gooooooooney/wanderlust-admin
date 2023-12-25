// app/providers.jsx

"use client";

import { ThemeProvider } from "next-themes";

export const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
};
