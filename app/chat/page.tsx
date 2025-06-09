"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Users, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

// Mock active chats
const activeChats = [
  {
    id: "1",
    therapist: {
      name: "Dr. Priya Sharma",
      avatar: "🌸",
      specialization: "Anxiety & Stress Management",
    },
    lastMessage: "Let me guide you through a simple breathing technique...",
    timestamp: "2 min ago",
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: "2",
    therapist: {
      name: "Dr. Arjun Patel",
      avatar: "🌟",
      specialization: "Depression & Mood Disorders",
    },
    lastMessage: "How are you feeling today?",
    timestamp: "1 hour ago",
    unreadCount: 2,
    isOnline: false,
  },
]

export default function ChatListPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Navbar />

      {/* Hero Section */}
      <section className="py-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Your{" "}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Safe Space
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with licensed therapists in a secure, private chat environment designed for your mental wellness.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Active Chats */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-green-500" />
              Your Conversations
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Secure & Encrypted</span>
            </div>
          </div>

          {activeChats.length > 0 ? (
            <div className="space-y-4">
              {activeChats.map((chat) => (
                <Link key={chat.id} href={`/chat/${chat.id}`}>
                  <Card className="border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-1 cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-r from-green-200 to-blue-200 rounded-full flex items-center justify-center text-xl">
                            {chat.therapist.avatar}
                          </div>
                          {chat.isOnline && (
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-gray-900 truncate">{chat.therapist.name}</h3>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-500">{chat.timestamp}</span>
                              {chat.unreadCount > 0 && (
                                <div className="w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">
                                  {chat.unreadCount}
                                </div>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{chat.therapist.specialization}</p>
                          <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                        </div>

                        <ArrowRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card className="border-gray-100 shadow-sm">
              <CardContent className="p-12 text-center">
                <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No active conversations</h3>
                <p className="text-gray-600 mb-6">
                  Start your mental wellness journey by booking a session with one of our licensed therapists.
                </p>
                <Link href="/sessions">
                  <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6">
                    Book a Session
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card className="border-green-100 shadow-sm bg-green-50/50">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Secure Messaging</h3>
                <p className="text-sm text-gray-600">End-to-end encrypted conversations with licensed therapists</p>
              </CardContent>
            </Card>

            <Card className="border-blue-100 shadow-sm bg-blue-50/50">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
                <p className="text-sm text-gray-600">Get help whenever you need it, day or night</p>
              </CardContent>
            </Card>

            <Card className="border-purple-100 shadow-sm bg-purple-50/50">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Licensed Professionals</h3>
                <p className="text-sm text-gray-600">Connect with qualified mental health experts</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
