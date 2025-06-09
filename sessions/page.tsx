"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, ArrowLeft, Filter, Star, Users } from "lucide-react"
import Link from "next/link"

const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM", "07:00 PM", "08:00 PM"]

const listeners = [
  {
    id: 1,
    name: "Listener Maya",
    avatar: "🌺",
    rating: 4.9,
    sessions: 127,
    languages: ["Hindi", "English"],
    gender: "Female",
    specialties: ["Anxiety", "Academic Stress"],
    bio: "Final year psychology student. Here to listen without judgment.",
    availability: ["09:00 AM", "10:00 AM", "02:00 PM", "03:00 PM"],
  },
  {
    id: 2,
    name: "Listener Arjun",
    avatar: "🌟",
    rating: 4.8,
    sessions: 89,
    languages: ["Hindi", "English", "Tamil"],
    gender: "Male",
    specialties: ["Loneliness", "Relationships"],
    bio: "Engineering student who believes in the power of conversation.",
    availability: ["11:00 AM", "04:00 PM", "07:00 PM", "08:00 PM"],
  },
  {
    id: 3,
    name: "Listener Priya",
    avatar: "🦋",
    rating: 4.9,
    sessions: 156,
    languages: ["Hindi", "English", "Bengali"],
    gender: "Female",
    specialties: ["Sleep Issues", "Family Problems"],
    bio: "Medical student passionate about mental health awareness.",
    availability: ["09:00 AM", "11:00 AM", "07:00 PM"],
  },
]

export default function SessionsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedListener, setSelectedListener] = useState<number | null>(null)
  const [genderFilter, setGenderFilter] = useState<string | null>(null)
  const [languageFilter, setLanguageFilter] = useState<string | null>(null)
  const [showBooking, setShowBooking] = useState(false)

  const filteredListeners = listeners.filter((listener) => {
    if (genderFilter && listener.gender !== genderFilter) return false
    if (languageFilter && !listener.languages.includes(languageFilter)) return false
    if (selectedTime && !listener.availability.includes(selectedTime)) return false
    return true
  })

  const getNextSevenDays = () => {
    const days = []
    for (let i = 0; i < 7; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      days.push(date)
    }
    return days
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    })
  }

  const handleBookSession = () => {
    setShowBooking(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <h1 className="text-lg font-semibold text-gray-800">Book a Listener</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Booking Confirmation Modal */}
      {showBooking && selectedListener && selectedTime && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-center text-green-600">Session Booked!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <div className="text-4xl">✅</div>
              <div className="space-y-2">
                <p className="font-medium">{listeners.find((l) => l.id === selectedListener)?.name}</p>
                <p className="text-sm text-gray-600">
                  {formatDate(selectedDate)} at {selectedTime}
                </p>
                <p className="text-xs text-gray-500">
                  You'll receive a private chat link 5 minutes before your session.
                </p>
              </div>
              <Button
                className="w-full"
                onClick={() => {
                  setShowBooking(false)
                  setSelectedListener(null)
                  setSelectedTime(null)
                }}
              >
                Done
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6 space-y-6 pb-24">
        {/* Info Card */}
        <Card className="border-blue-100 shadow-sm bg-blue-50">
          <CardContent className="pt-4">
            <div className="flex items-start gap-3">
              <div className="text-2xl">🤝</div>
              <div>
                <p className="font-medium text-blue-800">Anonymous & Safe</p>
                <p className="text-sm text-blue-700 mt-1">
                  All sessions are completely anonymous. Our peer listeners are trained students.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Date Selection */}
        <Card className="border-purple-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-500" />
              Select Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {getNextSevenDays().map((date, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedDate(date)}
                  className={`p-2 rounded-lg text-center transition-colors ${
                    selectedDate.toDateString() === date.toDateString()
                      ? "bg-purple-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  <div className="text-xs font-medium">{date.toLocaleDateString("en-IN", { weekday: "short" })}</div>
                  <div className="text-sm font-bold">{date.getDate()}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Time Selection */}
        <Card className="border-green-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-500" />
              Select Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 rounded-lg text-center transition-colors ${
                    selectedTime === time ? "bg-green-500 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="border-orange-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
              <Filter className="w-5 h-5 text-orange-500" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Gender Preference</p>
              <div className="flex gap-2">
                {["Male", "Female"].map((gender) => (
                  <Badge
                    key={gender}
                    variant="outline"
                    className={`cursor-pointer transition-colors ${
                      genderFilter === gender ? "bg-orange-100 text-orange-700 border-orange-300" : "hover:bg-gray-100"
                    }`}
                    onClick={() => setGenderFilter(genderFilter === gender ? null : gender)}
                  >
                    {gender}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Language</p>
              <div className="flex flex-wrap gap-2">
                {["Hindi", "English", "Tamil", "Bengali"].map((language) => (
                  <Badge
                    key={language}
                    variant="outline"
                    className={`cursor-pointer transition-colors ${
                      languageFilter === language
                        ? "bg-orange-100 text-orange-700 border-orange-300"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => setLanguageFilter(languageFilter === language ? null : language)}
                  >
                    {language}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Listeners */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-500" />
            Available Listeners ({filteredListeners.length})
          </h3>

          {filteredListeners.map((listener) => (
            <Card key={listener.id} className="border-gray-100 shadow-sm">
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full flex items-center justify-center text-xl">
                    {listener.avatar}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-800">{listener.name}</h4>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">{listener.rating}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600">{listener.bio}</p>

                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs">
                        {listener.gender}
                      </Badge>
                      {listener.languages.map((lang) => (
                        <Badge key={lang} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {listener.specialties.map((specialty) => (
                        <Badge key={specialty} variant="outline" className="text-xs bg-purple-50 text-purple-700">
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    <p className="text-xs text-gray-500">{listener.sessions} sessions completed</p>

                    <Button
                      className="w-full mt-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full"
                      onClick={() => {
                        setSelectedListener(listener.id)
                        handleBookSession()
                      }}
                      disabled={!selectedTime}
                    >
                      {selectedTime ? `Book for ${selectedTime}` : "Select a time first"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredListeners.length === 0 && (
            <Card className="border-gray-100 shadow-sm">
              <CardContent className="pt-6 text-center space-y-2">
                <div className="text-4xl">😔</div>
                <p className="text-gray-600">No listeners available for your selected criteria</p>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setGenderFilter(null)
                    setLanguageFilter(null)
                    setSelectedTime(null)
                  }}
                  className="text-purple-600"
                >
                  Clear filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-purple-100 z-30">
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex justify-around items-center">
            <Link href="/" className="flex flex-col items-center gap-1 py-2 px-3 text-gray-500">
              <User className="w-5 h-5" />
              <span className="text-xs">Home</span>
            </Link>
            <Link href="/community" className="flex flex-col items-center gap-1 py-2 px-3 text-gray-500">
              <Users className="w-5 h-5" />
              <span className="text-xs">Community</span>
            </Link>
            <Link href="/sessions" className="flex flex-col items-center gap-1 py-2 px-3 text-blue-600">
              <Calendar className="w-5 h-5" />
              <span className="text-xs font-medium">Sessions</span>
            </Link>
            <Link href="/library" className="flex flex-col items-center gap-1 py-2 px-3 text-gray-500">
              <User className="w-5 h-5" />
              <span className="text-xs">Library</span>
            </Link>
            <Link href="/profile" className="flex flex-col items-center gap-1 py-2 px-3 text-gray-500">
              <User className="w-5 h-5" />
              <span className="text-xs">Profile</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}
