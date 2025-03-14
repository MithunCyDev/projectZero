"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"

export function MobileSidebarTrigger() {
  const { toggleSidebar } = useSidebar()

  return (
    <Button variant="ghost" size="icon" className="md:hidden h-9 w-9 rounded-full" onClick={toggleSidebar}>
      <Menu className="h-5 w-5" />
      <span className="sr-only">Toggle Menu</span>
    </Button>
  )
}

