"use client";
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { TopBar } from "@/components/dashboard/top-bar";
import { AIChatWidget } from "@/components/dashboard/ai-chat-widget";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (mobile) {
        setSidebarCollapsed(true)
      }
    }
    
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggleCollapse={handleToggleSidebar}
        isMobile={isMobile}
      />
      <div className={`transition-all duration-300 ${
        isMobile ? 'pl-0' : (sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64')
      }`}>
        <TopBar onToggleSidebar={handleToggleSidebar} />
        <main className="p-4 sm:p-6">
          {children}
        </main>
      </div>
      <AIChatWidget />
    </div>
  )
}
