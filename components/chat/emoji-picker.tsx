"use client"

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void
  isVisible: boolean
}

const emojis = [
  "😊",
  "😢",
  "😰",
  "😌",
  "🤗",
  "💙",
  "💚",
  "🌸",
  "🌟",
  "✨",
  "🙏",
  "💪",
  "🌈",
  "☀️",
  "🌙",
  "❤️",
  "🧘‍♀️",
  "🧘‍♂️",
  "🤝",
  "👍",
  "🌺",
  "🍃",
  "🦋",
  "🕊️",
  "💫",
  "🌻",
  "🌿",
  "🌱",
  "🌊",
  "🏔️",
]

export function EmojiPicker({ onEmojiSelect, isVisible }: EmojiPickerProps) {
  if (!isVisible) return null

  return (
    <div className="absolute bottom-full left-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg p-3 w-64 z-50">
      <div className="grid grid-cols-6 gap-2">
        {emojis.map((emoji, index) => (
          <button
            key={index}
            onClick={() => onEmojiSelect(emoji)}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md transition-colors text-lg"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  )
}
