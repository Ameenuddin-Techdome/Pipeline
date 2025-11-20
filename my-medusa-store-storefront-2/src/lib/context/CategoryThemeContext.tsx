"use client";

import { createContext, useContext } from "react";

type ThemeContextType = {
  color: string;
  backgroundColor: string;
};

export const CategoryThemeContext = createContext<ThemeContextType>({
  color: "#175CD3",
  backgroundColor: "#D1E9FF",
});

export const useCategoryTheme = () => useContext(CategoryThemeContext);
