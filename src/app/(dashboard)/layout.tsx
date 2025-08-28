// src/app/(dashboard)/layout.tsx
'use client'

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <ProtectedRoute>
      <SidebarProvider defaultOpen={true}>
        <div className="flex h-screen overflow-hidden bg-background">
          <AppSidebar />
          
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Mobile Header */}
            <header className="md:hidden flex items-center justify-between border-b border-border bg-background px-4 py-3">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="md:hidden"
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-xs text-primary-foreground font-bold">J</span>
                  </div>
                  <span className="font-semibold">Jaydai</span>
                </div>
              </div>
            </header>
            
            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto">
              <div className="container mx-auto px-4 py-6">
                {children}
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  )
}