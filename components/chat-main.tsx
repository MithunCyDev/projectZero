"use client"

import type React from "react"

import { useState } from "react"
import { ArrowUp, ChevronLeft, Code, Eye, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { useIsMobile } from "@/hooks/use-mobile"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CodeEditor } from "@/components/code-editor"

export default function ChatMain() {
  const [inputValue, setInputValue] = useState("")
  const { state } = useSidebar()
  const isMobile = useIsMobile()
  const [isEditing, setIsEditing] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      setIsEditing(true)
    }
    // Handle chat submission
  }

  if (!isEditing) {
    return (
      <div className="flex flex-col h-full">
        <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-6">
          <div className={`max-w-3xl w-full mx-auto ${state === "collapsed" && !isMobile ? "pl-12" : ""}`}>
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">How Can I Help You Today?</h1>

            <form onSubmit={handleSubmit} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask zero to build something..."
                  className="w-full bg-[#1e293b] text-white rounded-lg px-5 py-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-base"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-[#283548] rounded-md"
                  disabled={!inputValue.trim()}
                >
                  <ArrowUp className="h-5 w-5 text-gray-400" />
                </Button>
              </div>
            </form>

            <div className="flex flex-wrap justify-center gap-2 mt-6">
              <Button
                variant="outline"
                className="bg-[#1e293b] text-white border-gray-700 hover:bg-[#283548] text-xs md:text-sm"
              >
                Clone a Screenshot
              </Button>
              <Button
                variant="outline"
                className="bg-[#1e293b] text-white border-gray-700 hover:bg-[#283548] text-xs md:text-sm"
              >
                Import From figma
              </Button>
              <Button
                variant="outline"
                className="bg-[#1e293b] text-white border-gray-700 hover:bg-[#283548] text-xs md:text-sm"
              >
                Upload a Project
              </Button>
              <Button
                variant="outline"
                className="bg-[#1e293b] text-white border-gray-700 hover:bg-[#283548] text-xs md:text-sm"
              >
                Sign Up From
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col h-full", isFullscreen && "fixed inset-0 z-50 bg-background")}>
      <div className="flex items-center justify-between border-b border-gray-800 p-2 bg-[#252526]">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsEditing(false)}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <span className="text-sm font-medium">Building: {inputValue}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsFullscreen(!isFullscreen)}>
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={40} minSize={25} maxSize={50}>
            <div className="h-full flex flex-col">
              <Tabs defaultValue="chat" className="flex-1">
                <div className="border-b border-gray-800 px-4 bg-[#252526]">
                  <TabsList className="h-12 bg-transparent">
                    <TabsTrigger
                      value="chat"
                      className="data-[state=active]:bg-[#1e1e1e] data-[state=active]:border-t data-[state=active]:border-[#1e1e1e] rounded-none border-transparent"
                    >
                      Chat
                    </TabsTrigger>
                    <TabsTrigger
                      value="files"
                      className="data-[state=active]:bg-[#1e1e1e] data-[state=active]:border-t data-[state=active]:border-[#1e1e1e] rounded-none border-transparent"
                    >
                      Files
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="chat" className="flex-1 p-4 bg-[#1e1e1e] m-0">
                  <ScrollArea className="h-[calc(100vh-10rem)]">
                    <div className="space-y-4">
                      <div className="bg-[#252526] rounded-lg p-4">
                        <p className="text-sm text-gray-400">You</p>
                        <p className="mt-1">{inputValue}</p>
                      </div>
                      <div className="bg-[#252526] rounded-lg p-4">
                        <p className="text-sm text-gray-400">Assistant</p>
                        <p className="mt-1">I'll help you build that. Let me generate the code...</p>
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="files" className="p-4 bg-[#1e1e1e] m-0">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <FileIcon className="h-4 w-4 text-gray-400" />
                      <span>sidebar.tsx</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FileIcon className="h-4 w-4 text-gray-400" />
                      <span>styles.css</span>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              <div className="border-t border-gray-800 p-4 bg-[#1e1e1e]">
                <form onSubmit={handleSubmit}>
                  <div className="relative">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask a follow-up question..."
                      className="w-full bg-[#252526] text-white rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <Button
                      type="submit"
                      size="icon"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 bg-transparent hover:bg-[#37373d]"
                    >
                      <ArrowUp className="h-4 w-4 text-gray-400" />
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={60}>
            <Tabs defaultValue="code" className="h-full flex flex-col">
              <div className="border-b border-gray-800 px-4 bg-[#252526]">
                <TabsList className="h-12 bg-transparent">
                  <TabsTrigger
                    value="preview"
                    className="data-[state=active]:bg-[#1e1e1e] data-[state=active]:border-t data-[state=active]:border-[#1e1e1e] rounded-none border-transparent"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </TabsTrigger>
                  <TabsTrigger
                    value="code"
                    className="data-[state=active]:bg-[#1e1e1e] data-[state=active]:border-t data-[state=active]:border-[#1e1e1e] rounded-none border-transparent"
                  >
                    <Code className="h-4 w-4 mr-2" />
                    Code
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="preview" className="flex-1 p-4 bg-[#1e1e1e] m-0">
                <div className="h-full rounded-lg border border-gray-800 bg-[#252526]">{/* Preview content */}</div>
              </TabsContent>
              <TabsContent value="code" className="flex-1 m-0 p-0 bg-[#1e1e1e]">
                <CodeEditor />
              </TabsContent>
            </Tabs>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="p-4 text-center text-sm text-gray-400">
      <div className="flex flex-wrap justify-center gap-2 md:gap-4">
        <a href="#" className="hover:text-white">
          Pricing
        </a>
        <span className="hidden md:inline">|</span>
        <a href="#" className="hover:text-white">
          Enterprise
        </a>
        <span className="hidden md:inline">|</span>
        <a href="#" className="hover:text-white">
          FAQ
        </a>
        <span className="hidden md:inline">|</span>
        <a href="#" className="hover:text-white">
          Legal
        </a>
        <span className="hidden md:inline">|</span>
        <a href="#" className="hover:text-white">
          Privacy
        </a>
        <span className="hidden md:inline">|</span>
        <a href="#" className="hover:text-white">
          Zero
        </a>
      </div>
    </footer>
  )
}

// Import FileIcon
import { FileIcon } from "lucide-react"

