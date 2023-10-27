"use client"

import * as React from "react"
import { ToggleLeft, ToggleRight } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="link"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <ToggleLeft className="h-[2rem] w-[2rem] dark:hidden" />
      <ToggleRight className="hidden h-8 w-8 dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}