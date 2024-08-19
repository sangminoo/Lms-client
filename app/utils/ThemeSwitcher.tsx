"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { BiMoon, BiSun } from "react-icons/bi";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-8 h-8 px-[28.5px]"></div>;
    // return null
  }

  const handleThemeChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    // console.log(`Theme changed to: ${newTheme}`);
  };

  return (
    <div className="flex items-center justify-center mx-4">
      {theme === "light" ? (
        <BiMoon
          className="cursor-pointer"
          fill="black"
          size={25}
          onClick={handleThemeChange}
        />
      ) : (
        <BiSun
          className="cursor-pointer"
          size={25}
          onClick={handleThemeChange}
        />
      )}
    </div>
  );
};

export default ThemeSwitcher;
