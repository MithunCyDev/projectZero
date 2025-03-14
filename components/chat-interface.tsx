"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import ChatMain from "@/components/chat-main"
import { useIsMobile } from "@/hooks/use-mobile"

export default function ChatInterface() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const isMobile = useIsMobile()

  return (
    <div className="h-screen bg-[#111827] text-white overflow-hidden">
      <SidebarProvider defaultOpen={!isMobile} onOpenChange={setSidebarOpen}>
        <AppSidebar />
        <SidebarInset className="bg-[#111827]">
          <ChatMain />
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

