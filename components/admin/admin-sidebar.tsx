"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Brain,
  Heart,
  LayoutDashboard,
  Video,
  Users,
  MessageSquare,
  BarChart3,
  Settings,
  Upload,
  Shield,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

const sidebarItems = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/videos",
    label: "Video Management",
    icon: Video,
  },
  {
    href: "/admin/users",
    label: "User Management",
    icon: Users,
  },
  {
    href: "/admin/community",
    label: "Community Moderation",
    icon: MessageSquare,
  },
  {
    href: "/admin/analytics",
    label: "Analytics",
    icon: BarChart3,
  },
  {
    href: "/admin/upload",
    label: "Upload Content",
    icon: Upload,
  },
  {
    href: "/admin/settings",
    label: "Settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    router.push("/admin/login")
  }

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-lg transition-all duration-300 z-50 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-purple-600" />
              <Heart className="w-5 h-5 text-pink-500" />
              <span className="font-bold text-gray-900">MentalSaathi</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-8 h-8 hover:bg-gray-100"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
        {!isCollapsed && (
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
            <Shield className="w-4 h-4" />
            <span>Admin Panel</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {sidebarItems.map((item) => {
          const IconComponent = item.icon
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start h-10 ${isCollapsed ? "px-2" : "px-3"} ${
                  isActive
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <IconComponent className={`w-4 h-4 ${isCollapsed ? "" : "mr-3"}`} />
                {!isCollapsed && <span>{item.label}</span>}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-4 left-4 right-4">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className={`w-full justify-start h-10 text-red-600 hover:bg-red-50 hover:text-red-700 ${
            isCollapsed ? "px-2" : "px-3"
          }`}
        >
          <LogOut className={`w-4 h-4 ${isCollapsed ? "" : "mr-3"}`} />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  )
}
