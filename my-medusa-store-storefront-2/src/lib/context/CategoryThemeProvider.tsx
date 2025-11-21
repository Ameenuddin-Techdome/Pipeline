"use client";

import { CategoryThemeContext } from "./CategoryThemeContext";

export default function CategoryThemeProvider({
  children,
  color,
  backgroundColor,
}: {
  children: React.ReactNode;
  color: string;
  backgroundColor: string;
}) {
  return (
    <CategoryThemeContext.Provider value={{ color, backgroundColor }}>
      {children}
    </CategoryThemeContext.Provider>
  );
}
