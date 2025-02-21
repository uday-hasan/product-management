"use client";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

const ThemeControll = () => {
  const { setTheme, theme } = useTheme();
  return (
    <Button
      variant={"outline"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="md:w-full"
    >
      {theme === "dark" ? <Moon /> : <Sun />}
    </Button>
  );
};

export default ThemeControll;
