"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, MoreVertical, Phone, Video, Info } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Therapist {
  id: string
  name: string
  avatar: string
  status: string
  lastSeen: string
  specialization: string
  isTyping: boolean
}

interface ChatHeaderProps {
  therapist: Therapist
  onBack: () => void
}

export function ChatHeader({ therapist, onBack }: ChatHeaderProps) {
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-green-100 shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Back Button - Mobile */}
        <Button variant="ghost" size="icon" onClick={onBack} className="md:hidden w-8 h-8 hover:bg-green-50">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Button>

        {/* Therapist Info */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-r from-green-200 to-blue-200 rounded-full flex items-center justify-center text-lg">
              {therapist.avatar}
            </div>
            {therapist.status === "online" && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-gray-900 truncate">{therapist.name}</h2>
            <div className="flex items-center gap-1">
              {therapist.status === "online" ? (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600 font-medium">online</span>
                </>
              ) : (
                <span className="text-sm text-gray-500">{therapist.lastSeen}</span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="w-8 h-8 hover:bg-green-50 text-gray-600">
            <Phone className="w-4 h-4" />
          </Button>

          <Button variant="ghost" size="icon" className="w-8 h-8 hover:bg-green-50 text-gray-600">
            <Video className="w-4 h-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="w-8 h-8 hover:bg-green-50 text-gray-600">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="flex items-center gap-2">
                <Info className="w-4 h-4" />
                Therapist Info
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Schedule Call
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 text-red-600">End Session</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
