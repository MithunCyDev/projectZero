"use client"

import { ChevronLeft, ChevronRight, Circle, LogOut, MoreHorizontal, Settings, User } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar()

  return (
    <Sidebar variant="inset" className="border-r border-gray-800">
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 bg-gray-700">
              <AvatarFallback>O</AvatarFallback>
            </Avatar>
            {state === "expanded" && (
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto h-8 w-8 rounded-full hover:bg-[#283548] text-gray-400"
                onClick={toggleSidebar}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
        {state === "expanded" && (
          <Button className="mt-4 w-full bg-[#1e293b] hover:bg-[#283548] text-white">New Chat</Button>
        )}
      </SidebarHeader>

      <SidebarContent className="px-2">
        {state === "expanded" && (
          <>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Circle className="h-4 w-4 mr-2" />
                  <span>Community</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Circle className="h-4 w-4 mr-2" />
                  <span>Project</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Circle className="h-4 w-4 mr-2" />
                  <span>Feedback</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>

            <SidebarSeparator className="my-4" />

            <div className="px-2 py-1 text-sm text-gray-400">Projects</div>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <span>AI-Powered code genaration</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <span>Task Management app</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <span>Website design</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>

            <div className="px-2 py-2">
              <Button variant="ghost" size="sm" className="w-full justify-start text-gray-400">
                <span>View All</span>
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            <SidebarSeparator className="my-2" />

            <div className="px-2 py-1 text-sm text-gray-400">Recent Chats</div>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <span>AI-Powered code genaration</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <span>Task Management app</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <span>Website design</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <span>Futuristic dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <span>Design a car website</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>

            <div className="px-2 py-2">
              <Button variant="ghost" size="sm" className="w-full justify-start text-gray-400">
                <span>View All</span>
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-800">
        {state === "expanded" ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 bg-gray-700">
                <AvatarFallback>CY</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">mithuncy</span>
                <span className="text-xs text-yellow-500 font-medium">Premium</span>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-[#283548]">
                  <MoreHorizontal className="h-5 w-5 text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-[#1e293b] border-gray-700 text-white">
                <DropdownMenuItem className="hover:bg-[#283548] cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#283548] cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="hover:bg-[#283548] cursor-pointer text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex justify-center">
            <Avatar className="h-9 w-9 bg-gray-700">
              <AvatarFallback>CY</AvatarFallback>
            </Avatar>
          </div>
        )}
      </SidebarFooter>

      <SidebarRail />

      {/* Custom expand button for collapsed state */}
      {state === "collapsed" && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 h-8 w-8 rounded-full hover:bg-[#283548] bg-[#1e293b]"
          onClick={toggleSidebar}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      )}
    </Sidebar>
  )
}

