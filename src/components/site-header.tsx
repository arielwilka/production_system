import { ThemeToggle } from "@/components/theme-toggle"
import {NavigationMenuDemo}  from "./nav"
import { cn } from '@/lib/utils';
export function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-20 items-center space-x-4 sm:justify-between sm:space-x-0">
        <NavigationMenuDemo/>
        <div className="flex items-center">
          <nav className="flex justify-between space-x-10">
              <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
