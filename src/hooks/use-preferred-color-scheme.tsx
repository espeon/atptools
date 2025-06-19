import { useEffect, useState } from "preact/hooks";

const PREFERS_DARK_QUERY = "(prefers-color-scheme: dark)";
const initialColorScheme = window.matchMedia(PREFERS_DARK_QUERY).matches ? "dark" : "light";

export function usePreferredColorScheme() {
  const [value, setValue] = useState<"light" | "dark">(initialColorScheme);

  useEffect(() => {
    const mql = window.matchMedia(PREFERS_DARK_QUERY);
    setValue(mql.matches ? "dark" : "light");

    const callback = (e: MediaQueryListEvent) =>
      setValue(e.matches ? "dark" : "light");

    mql.addEventListener("change", callback);
    return () => mql.removeEventListener("change", callback);
  }, []);

  return value;
}
