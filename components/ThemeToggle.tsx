"use client";

import { useEffect, useState, useRef } from "react";

type Theme = "light" | "dark" | "system";

function setHtmlTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (theme === "light" || theme === "dark") {
    root.setAttribute("data-theme", theme);
  } else {
    root.removeAttribute("data-theme");
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("theme")) as Theme | null;
    if (stored === "light" || stored === "dark" || stored === "system") {
      setTheme(stored);
      setHtmlTheme(stored);
    } else {
      setTheme("system");
      setHtmlTheme("system");
    }
  }, []);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function applyTheme(next: Theme) {
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setHtmlTheme(next);
    setOpen(false);
  }

  function quickToggle() {
    const next = theme === "dark" ? "light" : theme === "light" ? "dark" : "dark";
    applyTheme(next);
  }

  const icon = (
    theme === "dark" ? (
      // Moon
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
      </svg>
    ) : (
      // Sun
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.8 1.8-1.8zm10.48 0l1.8-1.79 1.79 1.79-1.8 1.8-1.79-1.8zM12 4c.55 0 1-.45 1-1V1h-2v2c0 .55.45 1 1 1zm8 8c0-.55.45-1 1-1h2v2h-2c-.55 0-1-.45-1-1zM12 20c-.55 0-1 .45-1 1v2h2v-2c0-.55-.45-1-1-1zM4 12c0 .55-.45 1-1 1H1v-2h2c.55 0 1 .45 1 1zm2.76 7.16l-1.8 1.79-1.79-1.79 1.8-1.8 1.79 1.8zm10.48 0l1.79 1.79 1.8-1.79-1.8-1.8-1.79 1.8zM12 8a4 4 0 100 8 4 4 0 000-8z" />
      </svg>
    )
  );

  return (
    <div className="fixed right-4 top-4 z-50" ref={menuRef}>
      <div className="relative">
        <button
          aria-label="Toggle theme"
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          onDoubleClick={quickToggle}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 bg-background/80 text-foreground/80 shadow-sm backdrop-blur transition hover:bg-foreground/5"
        >
          {icon}
        </button>
        {open && (
          <div
            role="menu"
            aria-label="Theme menu"
            className="absolute right-0 mt-2 w-40 overflow-hidden rounded-xl border border-foreground/10 bg-background/95 p-1 text-sm shadow-lg backdrop-blur"
          >
            {([
              ["light", "Light"],
              ["dark", "Dark"],
              ["system", "System"],
            ] as [Theme, string][]).map(([value, label]) => (
              <button
                key={value}
                role="menuitemradio"
                aria-checked={theme === value}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left hover:bg-foreground/5 ${
                  theme === value ? "bg-foreground/5" : ""
                }`}
                onClick={() => applyTheme(value)}
              >
                <span
                  className={`grid h-4 w-4 place-items-center rounded-full border ${
                    theme === value ? "bg-foreground/80" : "border-foreground/30"
                  }`}
                />
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

