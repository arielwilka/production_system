import { User } from "@prisma/client"
import type { Icon } from "lucide-react"

import { Icons } from "@/components/icons"

interface IAgent {
    id?: string;
    name?: string;
    status?: string;
    avatarUrl?: string;
  }
  
  interface ISidebarNavItem {
    title: string;
    href: string;
  }