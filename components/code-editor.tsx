"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronRight, MoreHorizontal, Save, Play } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import Editor, { type Monaco } from "@monaco-editor/react"
import type { editor } from "monaco-editor"

interface FileTreeItem {
  id: string
  name: string
  type: "file" | "folder"
  children?: FileTreeItem[]
  extension?: string
}

interface CodeEditorProps {
  className?: string
}

export function CodeEditor({ className }: CodeEditorProps) {
  const [activeFile, setActiveFile] = useState("sidebar.tsx")
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    app: true,
    components: true,
  })

  // Add code editing functionality
  const [files, setFiles] = useState<Record<string, string>>({
    "sidebar.tsx": `function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Navigation items
  const navItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Keywords", icon: <KeywordsIcon />, path: "/keywords" },
    { text: "Domains", icon: <DomainsIcon />, path: "/domains" },
  ];

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isCollapsed ? collapsedWidth : drawerWidth,
        flexShrink: 0,
        transition: "width 0.3s ease",
        "& .MuiDrawer-paper": {
          width: isCollapsed ? collapsedWidth : drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#111827",
          color: "white",
          borderRight: "1px solid #1e293b"
        }
      }}
      open={!isCollapsed}
    >
      <DrawerHeader>
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          {!isCollapsed && (
            <Typography variant="h6" noWrap component="div">
              App Name
            </Typography>
          )}
          <IconButton onClick={toggleCollapse}>
            {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Box>
      </DrawerHeader>
    </Drawer>
  );
}`,
    "mobile-sidebar-trigger.tsx": `"use client";

import { Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

export function MobileSidebarTrigger() {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden h-9 w-9 rounded-full"
      onClick={toggleSidebar}
    >
      <Menu className="h-5 w-5" />
      <span className="sr-only">Toggle Menu</span>
    </Button>
  );
}`,
    "use-mobile.tsx": `"use client";

import { useEffect, useState } from "react";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window is defined (browser environment)
    if (typeof window !== "undefined") {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };

      // Initial check
      checkIfMobile();

      // Add event listener for window resize
      window.addEventListener("resize", checkIfMobile);

      // Clean up event listener
      return () => window.removeEventListener("resize", checkIfMobile);
    }
  }, []);

  return isMobile;
}`,
  })

  const [currentCode, setCurrentCode] = useState(files[activeFile] || "")
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
  const monacoRef = useRef<Monaco | null>(null)
  const [position, setPosition] = useState({ lineNumber: 1, column: 1 })

  // Update current code when active file changes
  useEffect(() => {
    setCurrentCode(files[activeFile] || "")
  }, [activeFile, files])

  // Get file language based on extension
  const getLanguage = (fileName: string) => {
    const extension = fileName.split(".").pop()
    switch (extension) {
      case "js":
        return "javascript"
      case "ts":
      case "tsx":
        return "typescript"
      case "css":
        return "css"
      case "json":
        return "json"
      case "html":
        return "html"
      case "md":
        return "markdown"
      default:
        return "typescript"
    }
  }

  // Handle mounting of Monaco editor
  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = editor
    monacoRef.current = monaco

    // Configure editor
    editor.updateOptions({
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      fontFamily: "'Menlo', 'Monaco', 'Courier New', monospace",
      fontSize: 12,
      lineNumbers: "on",
      renderLineHighlight: "all",
      cursorBlinking: "blink",
      cursorWidth: 1,
      tabSize: 2,
      scrollbar: {
        useShadows: false,
        verticalHasArrows: false,
        horizontalHasArrows: false,
        vertical: "auto",
        horizontal: "auto",
      },
      colorDecorators: true,
    })

    // Add cursor position change listener
    editor.onDidChangeCursorPosition((e) => {
      setPosition({
        lineNumber: e.position.lineNumber,
        column: e.position.column,
      })
    })

    // Set up theme
    setupDraculaTheme(monaco)
  }

  // Set up Dracula theme
  const setupDraculaTheme = (monaco: Monaco) => {
    monaco.editor.defineTheme("dracula", {
      base: "vs-dark",
      inherit: true,
      rules: [
        // Base colors
        { token: "comment", foreground: "6272a4" },
        { token: "string", foreground: "8be9fd" },
        { token: "keyword", foreground: "ff79c6" },
        { token: "function", foreground: "bd93f9" },
        { token: "variable", foreground: "9cdcfe" },
        { token: "number", foreground: "bd93f9" },
        { token: "boolean", foreground: "bd93f9" },
        { token: "identifier", foreground: "f8f8f2" },
        { token: "type", foreground: "50fa7b" },
        { token: "delimiter", foreground: "f8f8f2" },
        { token: "tag", foreground: "ff79c6" },
        { token: "metatag", foreground: "50fa7b" },
      ],
      colors: {
        "editor.background": "#1e1e1e",
        "editor.foreground": "#f8f8f2",
        "editor.lineHighlightBackground": "#282a36",
        "editorCursor.foreground": "#f8f8f2",
        "editorWhitespace.foreground": "#6272a4",
        "editorIndentGuide.background": "#3B4048",
        "editor.selectionBackground": "#44475a",
        "editor.findMatchBackground": "#6272a4",
        "editor.findMatchHighlightBackground": "#6272a4",
      },
    })

    monaco.editor.setTheme("dracula")
  }

  // Handle code changes
  const handleCodeChange = (value: string | undefined) => {
    const newCode = value || ""
    setCurrentCode(newCode)
    setFiles((prev) => ({
      ...prev,
      [activeFile]: newCode,
    }))
  }

  // Save current file
  const saveFile = () => {
    console.log(`Saving file: ${activeFile}`)
    // In a real app, you would send this to the server
  }

  const fileTree: FileTreeItem[] = [
    {
      id: "app",
      name: "app",
      type: "folder",
      children: [
        { id: "globals.css", name: "globals.css", type: "file", extension: "css" },
        { id: "layout.tsx", name: "layout.tsx", type: "file", extension: "tsx" },
        { id: "page.tsx", name: "page.tsx", type: "file", extension: "tsx" },
      ],
    },
    {
      id: "components",
      name: "components",
      type: "folder",
      children: [
        { id: "sidebar.tsx", name: "sidebar.tsx", type: "file", extension: "tsx" },
        { id: "mobile-sidebar-trigger.tsx", name: "mobile-sidebar-trigger.tsx", type: "file", extension: "tsx" },
        { id: "app-sidebar.tsx", name: "app-sidebar.tsx", type: "file", extension: "tsx" },
        { id: "chat-main.tsx", name: "chat-main.tsx", type: "file", extension: "tsx" },
        { id: "chat-interface.tsx", name: "chat-interface.tsx", type: "file", extension: "tsx" },
        {
          id: "ui",
          name: "ui",
          type: "folder",
          children: [
            { id: "button.tsx", name: "button.tsx", type: "file", extension: "tsx" },
            { id: "sidebar.tsx", name: "sidebar.tsx", type: "file", extension: "tsx" },
          ],
        },
      ],
    },
    {
      id: "hooks",
      name: "hooks",
      type: "folder",
      children: [{ id: "use-mobile.tsx", name: "use-mobile.tsx", type: "file", extension: "tsx" }],
    },
    { id: "tailwind.config.ts", name: "tailwind.config.ts", type: "file", extension: "ts" },
  ]

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }))
  }

  const getFileIcon = (extension?: string) => {
    switch (extension) {
      case "tsx":
      case "ts":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-4 w-4">
            <path
              fill="#3178c6"
              d="M23.827,8.243A4.424,4.424,0,0,1,26.05,9.524a5.853,5.853,0,0,1,.852,1.143c.011.045-1.534,1.083-2.471,1.662-.034.023-.169-.124-.322-.35a2.014,2.014,0,0,0-1.67-1c-1.077-.074-1.771.49-1.766,1.433a1.3,1.3,0,0,0,.153.666c.237.49.677.784,2.059,1.383,2.544,1.1,3.636,1.817,4.31,2.843a5.158,5.158,0,0,1,.416,4.333,4.764,4.764,0,0,1-3.932,2.815,10.9,10.9,0,0,1-2.708-.028,6.531,6.531,0,0,1-3.616-1.884,6.278,6.278,0,0,1-.926-1.371,2.655,2.655,0,0,1,.327-.208c.158-.09.756-.434,1.32-.761l1.024-.6.214.312a4.771,4.771,0,0,0,1.35,1.292,3.3,3.3,0,0,0,3.458-.175,1.545,1.545,0,0,0,.2-1.974c-.276-.4-.84-.727-2.443-1.422a8.8,8.8,0,0,1-3.349-2.055,4.687,4.687,0,0,1-.976-1.777,7.116,7.116,0,0,1-.062-2.268,4.332,4.332,0,0,1,3.644-3.374A9,9,0,0,1,23.827,8.243ZM15.484,9.726l.011,1.454h-4.63V24.328H7.6V11.183H2.97V9.755a13.986,13.986,0,0,1,.04-1.466c.017-.023,2.832-.034,6.245-.028l6.211.017Z"
            />
          </svg>
        )
      case "css":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-4 w-4">
            <path fill="#1572B6" d="M5.902,27.201,3.656,2h24.688l-2.249,25.197L15.985,30L5.902,27.201z" />
            <path fill="#33A9DC" d="M16,27.858l8.17-2.265l1.922-21.532H16V27.858z" />
            <path fill="#fff" d="M16,13.191h4.09l0.282-3.165H16V6.935h7.75l-0.074,0.83l-0.759,8.518H16V13.191z" />
            <path
              fill="#EBEBEB"
              d="M16.019,21.218l-0.014,0.004l-3.442-0.93l-0.22-2.465H9.24l0.433,4.853l6.331,1.758l0.015-0.004V21.218z"
            />
            <path
              fill="#fff"
              d="M19.827,16.151l-0.379,4.23l-3.445,0.93v3.216l6.337-1.756l0.047-0.522l0.537-6.002L19.827,16.151z"
            />
            <path fill="#EBEBEB" d="M16.011,6.935v3.091H8.545l-0.062-0.695l-0.141-1.567L8.269,6.935H16.011z" />
            <path fill="#EBEBEB" d="M16,13.191v3.091H12.601l-0.062-0.695l-0.14-1.567L12.324,13.191H16z" />
          </svg>
        )
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-4 w-4">
            <path
              fill="#c5c5c5"
              d="M20.682,3H8.333C6.542,3,5.08,4.443,5.08,6.222v19.556C5.08,27.557,6.542,29,8.333,29h15.334c1.791,0,3.253-1.443,3.253-3.222V8.667L20.682,3z"
            />
            <path fill="#f6f6f6" d="M19.778,9.455V3.778L26.92,9.455H19.778z" />
          </svg>
        )
    }
  }

  const getFolderIcon = (isOpen: boolean) => {
    if (isOpen) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-4 w-4">
          <path fill="#dcb67a" d="M27.5,8.5h-11L13,5.5H4.5v21h23V8.5z" />
          <path fill="#dcb67a" d="M27.5,8.5v3h-23v-3H27.5z" />
        </svg>
      )
    }
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-4 w-4">
        <path fill="#dcb67a" d="M27.5,8.5h-11L13,5.5H4.5v21h23V8.5z" />
      </svg>
    )
  }

  const renderFileTree = (items: FileTreeItem[], level = 0) => {
    return items.map((item) => {
      const isExpanded = expandedFolders[item.id] || false

      if (item.type === "folder") {
        return (
          <div key={item.id} className="select-none">
            <div
              className={cn(
                "flex items-center py-1 px-2 hover:bg-[#2a2d2e] cursor-pointer",
                level > 0 && `pl-${level * 4 + 2}px`,
              )}
              style={{ paddingLeft: level > 0 ? level * 16 + 8 : 8 }}
              onClick={() => toggleFolder(item.id)}
            >
              <span className="mr-1">
                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </span>
              <span className="mr-1">{getFolderIcon(isExpanded)}</span>
              <span className="text-sm">{item.name}</span>
            </div>
            {isExpanded && item.children && <div>{renderFileTree(item.children, level + 1)}</div>}
          </div>
        )
      } else {
        return (
          <div
            key={item.id}
            className={cn(
              "flex items-center py-1 hover:bg-[#2a2d2e] cursor-pointer",
              activeFile === item.id && "bg-[#37373d]",
              level > 0 && `pl-${level * 4 + 2}px`,
            )}
            style={{ paddingLeft: level > 0 ? level * 16 + 8 : 8 }}
            onClick={() => setActiveFile(item.id)}
          >
            <span className="w-5"></span>
            <span className="mr-1">{getFileIcon(item.extension)}</span>
            <span className="text-sm">{item.name}</span>
          </div>
        )
      }
    })
  }

  return (
    <div className={cn("flex h-full bg-[#1e1e1e]", className)}>
      {/* File Explorer */}
      <div className="w-64 border-r border-[#252526] flex flex-col">
        <div className="p-2 text-xs font-medium text-[#cccccc] uppercase flex items-center justify-between border-b border-[#252526]">
          <span>Explorer</span>
          <MoreHorizontal className="h-4 w-4" />
        </div>
        <ScrollArea className="flex-1">
          <div className="py-2">{renderFileTree(fileTree)}</div>
        </ScrollArea>
      </div>

      {/* Code Editor */}
      <div className="flex-1 flex flex-col">
        {/* Tabs */}
        <div className="flex bg-[#252526] border-b border-[#252526]">
          <div className={cn("flex items-center px-3 py-1 text-sm border-r border-[#252526]", "bg-[#1e1e1e]")}>
            <span>{activeFile}</span>
            <button className="ml-2 text-[#cccccc] hover:text-white">×</button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-2 px-2 py-1 bg-[#252526] border-b border-[#252526]">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-[#cccccc] hover:text-white hover:bg-[#2a2d2e]"
            onClick={saveFile}
          >
            <Save className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-[#cccccc] hover:text-white hover:bg-[#2a2d2e]">
            <Play className="h-4 w-4" />
          </Button>
          <div className="text-xs text-gray-500 ml-auto">
            Ln {position.lineNumber}, Col {position.column}
          </div>
        </div>

        {/* Monaco Editor */}
        <div className="flex-1 relative overflow-hidden">
          <Editor
            height="100%"
            language={getLanguage(activeFile)}
            value={currentCode}
            theme="dracula"
            onChange={handleCodeChange}
            onMount={handleEditorDidMount}
            options={{
              automaticLayout: true,
            }}
          />
        </div>
      </div>
    </div>
  )
}

