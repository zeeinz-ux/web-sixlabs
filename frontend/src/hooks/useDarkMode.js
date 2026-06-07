import { useState, useEffect } from "react";

export function useDarkMode() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Read saved preference or system preference
    const saved = localStorage.getItem("sixlabs-theme");
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

    const initial = saved || preferred;
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("sixlabs-theme", next);
  };

  return { theme, toggleTheme, isDark: theme === "dark" };
}
