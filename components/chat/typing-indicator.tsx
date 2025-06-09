"use client"

export interface TypingIndicatorProps {
  avatar: string
  name: string
}

export function TypingIndicator({ avatar, name }: TypingIndicatorProps) {
  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-[85%] md:max-w-[70%]">
        <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-r from-green-200 to-blue-200 rounded-full flex items-center justify-center text-xs">
              {avatar}
            </div>
            <span className="text-xs text-gray-500">{name} is typing</span>
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div
                className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></div>
              <div
                className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
