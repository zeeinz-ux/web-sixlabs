"use client";

import { Sun, Moon } from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";
import styles from "./navbar.module.css";

export function ThemeToggle() {
  const { isDark, toggleTheme } = useDarkMode();

  return (
    <button
      onClick={toggleTheme}
      className={styles.themeToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? (
        <Sun size={16} strokeWidth={2} />
      ) : (
        <Moon size={16} strokeWidth={2} />
      )}
    </button>
  );
}
