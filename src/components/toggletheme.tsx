import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
 
export function SwitchDemo() {
    const { setTheme, theme } = useTheme()
  return (
    <div className="flex items-center space-x-2">
      <Switch checked={theme === "dark"} onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} />
    </div>
  )
}