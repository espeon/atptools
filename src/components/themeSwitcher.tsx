"use client";
import { useTheme } from "@/providers/themeProvider";
import { useEffect, useState } from "react";
import { ChevronsUpDown, Circle, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const THEMES: ("auto" | "dark" | "light")[] = ["auto", "dark", "light"];

export function ColorToggle() {
  const { setTheme, theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const DarkLightIcon = !mounted ? Circle : theme === "dark" ? Moon : Sun;

  return (
    <Popover open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 mr-0 rounded-l-none flex-row align-middle w-full"
        >
          <DarkLightIcon className="h-4 w-4" />
          Theme
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px]">
        <div className="grid gap-1 p-2">
          {THEMES.map((t) => (
            <button
              onClick={() => {
                setTheme(t);
                setIsOpen(false);
              }}
              className="flex items-center justify-between rounded-sm p-2 text-sm hover:bg-accent"
            >
              {t}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
