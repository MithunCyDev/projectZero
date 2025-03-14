"use client"

import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useSidebar } from "@/components/ui/sidebar"

export function CollapsedSidebar() {
  const { toggleSidebar } = useSidebar()

  return (
    <div className="h-full w-16 bg-[#111827] border-r border-gray-800 flex flex-col items-center py-4">
      <div className="mb-8">
        <Avatar className="h-8 w-8 bg-gray-700">
          <AvatarFallback>O</AvatarFallback>
        </Avatar>
      </div>

      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-[#283548]" onClick={toggleSidebar}>
        <ChevronRight className="h-5 w-5" />
      </Button>

      <div className="mt-auto">
        <Avatar className="h-9 w-9 bg-gray-700">
          <AvatarFallback>CY</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

