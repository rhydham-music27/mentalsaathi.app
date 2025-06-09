"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { useParams, useRouter } from "next/navigation"
import { ChatMessage } from "@/components/chat/chat-message"
import { TypingIndicator } from "@/components/chat/typing-indicator"
import { ChatHeader } from "@/components/chat/chat-header"
import { MessageInput } from "@/components/chat/message-input"

// Mock therapist data
const therapistData = {
  "1": {
    id: "1",
    name: "Dr. Priya Sharma",
    avatar: "🌸",
    status: "online",
    lastSeen: "online",
    specialization: "Anxiety & Stress Management",
    isTyping: false,
  },
  "2": {
    id: "2",
    name: "Dr. Arjun Patel",
    avatar: "🌟",
    status: "online",
    lastSeen: "last seen today at 2:30 PM",
    specialization: "Depression & Mood Disorders",
    isTyping: false,
  },
}

// Mock conversation data
const mockMessages = [
  {
    id: 1,
    text: "Hello! I'm Dr. Priya. I'm here to support you today. How are you feeling?",
    sender: "therapist",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    status: "delivered",
  },
  {
    id: 2,
    text: "Hi Dr. Priya. I've been feeling quite anxious lately, especially about my upcoming exams.",
    sender: "user",
    timestamp: new Date(Date.now() - 1000 * 60 * 28),
    status: "read",
  },
  {
    id: 3,
    text: "I understand how overwhelming exam anxiety can feel. It's completely normal to experience these feelings. Can you tell me more about what specifically is making you feel anxious?",
    sender: "therapist",
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
    status: "delivered",
  },
  {
    id: 4,
    text: "I keep thinking I'm not prepared enough, even though I've been studying for weeks. I can't sleep properly and my mind keeps racing with worst-case scenarios.",
    sender: "user",
    timestamp: new Date(Date.now() - 1000 * 60 * 22),
    status: "read",
  },
  {
    id: 5,
    text: "Those racing thoughts and sleep difficulties are common symptoms of anxiety. You're not alone in feeling this way. Let's work together on some techniques that can help calm your mind. Have you tried any breathing exercises before?",
    sender: "therapist",
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
    status: "delivered",
  },
  {
    id: 6,
    text: "I've tried a few times but I find it hard to focus. My mind keeps wandering back to my worries.",
    sender: "user",
    timestamp: new Date(Date.now() - 1000 * 60 * 18),
    status: "read",
  },
  {
    id: 7,
    text: "That's perfectly normal when you're feeling anxious. Let me guide you through a simple 4-7-8 breathing technique. Would you like to try it together right now?",
    sender: "therapist",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    status: "delivered",
  },
  {
    id: 8,
    text: "Yes, I'd like to try that. Thank you for being so patient with me.",
    sender: "user",
    timestamp: new Date(Date.now() - 1000 * 60 * 12),
    status: "read",
  },
]

export default function ChatPage() {
  const params = useParams()
  const router = useRouter()
  const chatId = params.id as string
  const therapist = therapistData[chatId as keyof typeof therapistData]

  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Simulate therapist typing
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender === "user") {
      const timer = setTimeout(() => {
        setIsTyping(true)
        setTimeout(() => {
          setIsTyping(false)
          // Add a response from therapist
          const responses = [
            "I understand. Take your time to process these feelings.",
            "That's a great insight. How does acknowledging that make you feel?",
            "You're doing really well by opening up about this.",
            "Let's explore that feeling a bit more. What comes to mind when you think about it?",
          ]
          const randomResponse = responses[Math.floor(Math.random() * responses.length)]

          setMessages((prev) => [
            ...prev,
            {
              id: prev.length + 1,
              text: randomResponse,
              sender: "therapist",
              timestamp: new Date(),
              status: "delivered",
            },
          ])
        }, 2000)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        text: newMessage.trim(),
        sender: "user" as const,
        timestamp: new Date(),
        status: "sent" as const,
      }

      setMessages((prev) => [...prev, message])
      setNewMessage("")
      setShowEmojiPicker(false)

      // Mark as delivered after a short delay
      setTimeout(() => {
        setMessages((prev) => prev.map((msg) => (msg.id === message.id ? { ...msg, status: "delivered" } : msg)))
      }, 1000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleEmojiSelect = (emoji: string) => {
    setNewMessage((prev) => prev + emoji)
    setShowEmojiPicker(false)
  }

  if (!therapist) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Chat not found</h2>
          <p className="text-gray-600 mb-4">The conversation you're looking for doesn't exist.</p>
          <Button onClick={() => router.back()} variant="outline">
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex flex-col">
      {/* Chat Header */}
      <ChatHeader therapist={therapist} onBack={() => router.back()} />

      {/* Messages Container */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gradient-to-b from-green-50/30 to-blue-50/30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23f0f9ff' fillOpacity='0.3'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        {/* Welcome Message */}
        <div className="text-center py-6">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-green-100">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Secure & confidential conversation</span>
          </div>
        </div>

        {/* Messages */}
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {/* Typing Indicator */}
        {isTyping && <TypingIndicator avatar={therapist.avatar} name={therapist.name} />}

        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <MessageInput
        value={newMessage}
        onChange={setNewMessage}
        onSend={handleSendMessage}
        onKeyPress={handleKeyPress}
        showEmojiPicker={showEmojiPicker}
        onToggleEmojiPicker={() => setShowEmojiPicker(!showEmojiPicker)}
        onEmojiSelect={handleEmojiSelect}
      />
    </div>
  )
}
