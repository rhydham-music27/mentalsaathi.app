"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Paperclip, Smile, Mic } from "lucide-react"
import { EmojiPicker } from "./emoji-picker"

interface MessageInputProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  onKeyPress: (e: React.KeyboardEvent) => void
  showEmojiPicker: boolean
  onToggleEmojiPicker: () => void
  onEmojiSelect: (emoji: string) => void
}

export function MessageInput({
  value,
  onChange,
  onSend,
  onKeyPress,
  showEmojiPicker,
  onToggleEmojiPicker,
  onEmojiSelect,
}: MessageInputProps) {
  return (
    <div className="bg-white/95 backdrop-blur-md border-t border-green-100 p-4 sticky bottom-0">
      <div className="flex items-end gap-3 max-w-4xl mx-auto">
        {/* Attachment Button */}
        <Button variant="ghost" size="icon" className="w-10 h-10 hover:bg-green-50 text-gray-600 flex-shrink-0">
          <Paperclip className="w-5 h-5" />
        </Button>

        {/* Message Input Container */}
        <div className="flex-1 relative">
          <div className="flex items-end bg-white border border-gray-200 rounded-2xl shadow-sm focus-within:border-green-300 focus-within:ring-1 focus-within:ring-green-200">
            {/* Emoji Picker Button */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleEmojiPicker}
                className="w-10 h-10 hover:bg-green-50 text-gray-600 rounded-full m-1"
              >
                <Smile className="w-5 h-5" />
              </Button>

              <EmojiPicker isVisible={showEmojiPicker} onEmojiSelect={onEmojiSelect} />
            </div>

            {/* Text Input */}
            <Textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyPress={onKeyPress}
              placeholder="Type a message..."
              className="flex-1 border-0 resize-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent px-2 py-3 max-h-32 min-h-[44px]"
              rows={1}
              style={{
                height: "auto",
                minHeight: "44px",
                maxHeight: "128px",
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement
                target.style.height = "auto"
                target.style.height = Math.min(target.scrollHeight, 128) + "px"
              }}
            />

            {/* Voice Message Button (when no text) */}
            {!value.trim() && (
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 hover:bg-green-50 text-gray-600 rounded-full m-1"
              >
                <Mic className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>

        {/* Send Button */}
        <Button
          onClick={onSend}
          disabled={!value.trim()}
          className={`
            w-10 h-10 rounded-full flex-shrink-0 transition-all duration-200
            ${
              value.trim()
                ? "bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg transform hover:scale-105"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
