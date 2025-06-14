// 1. Create a Theme Context
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePreferredColorScheme } from "@/hooks/use-preferred-color-scheme";

export type FontConfig = {
  name: string;
  fontFamily?: string;
  category: "sans" | "serif" | "mono";
  url?: string;
};

export const GOOGLE_FONTS: FontConfig[] = [
  {
    name: "System",
    fontFamily:
      "system-ui, -apple-system, 'Segoe UI', 'Ubuntu', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    category: "sans",
    url: "",
  },
  {
    name: "Inter",
    category: "sans",
    url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap",
  },
  {
    name: "Roboto",
    category: "sans",
    url: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap",
  },
  {
    name: "Mona Sans",
    category: "sans",
    url: "https://fonts.googleapis.com/css2?family=Mona+Sans:wght@400;500;700&display=swap",
  },
  {
    name: "Shippori Mincho",
    category: "serif",
    url: "https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500;700&display=swap",
  },
  {
    name: "Comic Neue",
    category: "sans",
    url: "https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;500;700&display=swap",
  },
  {
    name: "IBM Plex Mono",
    category: "mono",
    url: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;700&display=swap",
  },
  {
    name: "Jetbrains Mono",
    category: "mono",
    url: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap",
  },
  {
    name: "Space Mono",
    category: "mono",
    url: "https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap",
  },
  {
    name: "DM Mono",
    category: "mono",
    url: "https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;700&display=swap",
  },
  {
    name: "Fira Mono",
    category: "mono",
    url: "https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;700&display=swap",
  },
  {
    name: "Overpass Mono",
    category: "mono",
    url: "https://fonts.googleapis.com/css2?family=Overpass+Mono:wght@400;700&display=swap",
  },
  {
    name: "Atkinson Hyperlegible Mono",
    category: "mono",
    url: "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Mono:wght@400;700&display=swap",
  },
  {
    name: "Geist Mono",
    category: "mono",
    url: "https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;700&display=swap",
  },
  {
    name: "Monaspace Neon",
    category: "mono",
    url: "/css/monaspace/neon.css",
  },
  {
    name: "Monaspace Xenon",
    category: "mono",
    url: "/css/monaspace/xenon.css",
  },
];

export type ThemeState = {
  theme: "auto" | "light" | "dark";
  effectiveTheme: "light" | "dark";
  font: FontConfig;
  loadedFonts: Set<string>;
  loadFonts: (fonts: FontConfig[]) => void;
  setTheme: (theme: "auto" | "light" | "dark") => void;
  setFont: (font: FontConfig) => void;
};

const ThemeContext = createContext<ThemeState>({} as ThemeState);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"auto" | "light" | "dark">("auto");
  const [font, setFont] = useState<FontConfig>(GOOGLE_FONTS[2]);
  const [loadedFonts, setLoadedFonts] = useState<Set<string>>(new Set());
  const preferredColorScheme = usePreferredColorScheme();

  const effectiveTheme = useMemo(
    () => theme === "auto" ? preferredColorScheme : theme,
    [theme, preferredColorScheme]
  );

  const loadFonts = useCallback(
    (fonts: FontConfig[]) => {
      console.log("Loading multiple fonts");
      console.log("already loaded", loadedFonts);
      fonts.forEach((fontConfig) => {
        console.log(
          "trying to load",
          fontConfig,
          !!fontConfig.url,
          !loadedFonts.has(fontConfig?.url || "none"),
        );
        if (
          fontConfig.url &&
          fontConfig.url !== "" &&
          !loadedFonts.has(fontConfig.url)
        ) {
          console.log("loaded", fontConfig.name);
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = fontConfig.url;
          link.crossOrigin = "anonymous";
          link.dataset.font = fontConfig.fontFamily || fontConfig.name;
          document.head.appendChild(link);

          setLoadedFonts((prev) => new Set(prev).add(fontConfig.url!));
        }
      });
    },
    [loadedFonts],
  );

  // Load saved theme/font from localStorage
  useEffect(() => {
    const savedTheme =
      (localStorage.getItem("theme") as "auto" | "light" | "dark") || "auto";
    const savedFont =
      JSON.parse(localStorage.getItem("font") || "null") || GOOGLE_FONTS[2];
    setTheme(savedTheme);
    setFont(savedFont);
  }, []);

  // Manage font loading
  useEffect(() => {
    // Remove existing font links
    // const existingLinks = document.querySelectorAll("link[data-font]");
    // existingLinks.forEach((link) => link.remove());

    // setLoadedFonts(new Set());

    // Create new font link
    if (font.url) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = font.url;
      link.crossOrigin = "anonymous";
      link.dataset.font = font.name;
      document.head.appendChild(link);

      setLoadedFonts(new Set(font.url));
    }

    // Update CSS variables
    document.documentElement.style.setProperty(
      `--font-${font.category}`,
      `'${font.name}', ${font.category === "sans" ? "sans-serif" : font.category}`,
    );
    // assume we want everything to be this font
    document.documentElement.style.setProperty(
      `--font-sans`,
      `${font.fontFamily || font.name}, sans-serif`,
    );

    if (font.category !== "mono") {
      document.documentElement.style.setProperty(`--font-mono`, `mono`);
    }

    // Save to localStorage
    localStorage.setItem("font", JSON.stringify(font));
    localStorage.setItem("theme", theme);
  }, [font, theme]);

  // Update theme class
  useEffect(() => {
    document.documentElement.setAttribute("class", effectiveTheme);
  }, [effectiveTheme]);

  return (
    <ThemeContext.Provider
      value={{ theme, effectiveTheme, font, setTheme, setFont, loadFonts, loadedFonts }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
