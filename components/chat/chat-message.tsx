"use client"

import { Check, CheckCheck } from "lucide-react"

interface Message {
  id: number
  text: string
  sender: "user" | "therapist"
  timestamp: Date
  status: "sent" | "delivered" | "read"
}



export function ChatMessage({ message }:any) {
  const isUser = message.sender === "user"

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const getStatusIcon = () => {
    switch (message.status) {
      case "sent":
        return <Check className="w-3 h-3 text-gray-400" />
      case "delivered":
        return <CheckCheck className="w-3 h-3 text-gray-400" />
      case "read":
        return <CheckCheck className="w-3 h-3 text-blue-500" />
      default:
        return null
    }
  }

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`max-w-[85%] md:max-w-[70%] ${isUser ? "order-2" : "order-1"}`}>
        {/* Message Bubble */}
        <div
          className={`
            relative px-4 py-3 rounded-2xl shadow-sm
            ${
              isUser
                ? "bg-gradient-to-r from-green-400 to-green-500 text-white ml-auto"
                : "bg-white text-gray-800 border border-gray-100"
            }
            ${isUser ? "rounded-br-md" : "rounded-bl-md"}
          `}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.text}</p>

          {/* Message Info */}
          <div className={`flex items-center gap-1 mt-2 ${isUser ? "justify-end" : "justify-start"}`}>
            <span className={`text-xs ${isUser ? "text-green-100" : "text-gray-500"}`}>
              {formatTime(message.timestamp)}
            </span>
            {isUser && <div className="ml-1">{getStatusIcon()}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
