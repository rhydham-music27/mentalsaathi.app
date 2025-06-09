"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Calendar, Clock, Shield, User, CheckCircle } from "lucide-react"

const topics = [
  "Academic Stress",
  "Anxiety & Worry",
  "Relationship Issues",
  "Family Problems",
  "Loneliness",
  "Self-Esteem",
  "Career Confusion",
  "General Support",
]

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "07:00 PM",
  "08:00 PM",
  "09:00 PM",
]

export default function BookListenerPage() {
  const [selectedTopic, setSelectedTopic] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [isBooked, setIsBooked] = useState(false)

  const getNextSevenDays = () => {
    const days = []
    for (let i = 0; i < 7; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      days.push(date)
    }
    return days
  }

  const handleBooking = () => {
    if (selectedTopic && selectedDate && selectedTime) {
      setIsBooked(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
              Sometimes, you just need to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">talk.</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto">
              Connect with trained peer listeners who understand your journey.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {!isBooked ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <Card className="border-blue-100 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-800 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-blue-500" />
                    Book Your Session
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Topic Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">What would you like to talk about?</label>
                    <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                      <SelectTrigger className="border-blue-200 focus:border-blue-300">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        {topics.map((topic) => (
                          <SelectItem key={topic} value={topic}>
                            {topic}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date Selection */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700">Choose a date</label>
                    <div className="grid grid-cols-7 gap-2">
                      {getNextSevenDays().map((date, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedDate(date)}
                          className={`p-3 rounded-lg text-center transition-all ${
                            selectedDate?.toDateString() === date.toDateString()
                              ? "bg-blue-500 text-white shadow-lg"
                              : "bg-white hover:bg-blue-50 border border-gray-200"
                          }`}
                        >
                          <div className="text-xs font-medium">
                            {date.toLocaleDateString("en-US", { weekday: "short" })}
                          </div>
                          <div className="text-sm font-bold">{date.getDate()}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Selection */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700">Select time</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 rounded-lg text-center transition-all ${
                            selectedTime === time
                              ? "bg-blue-500 text-white shadow-lg"
                              : "bg-white hover:bg-blue-50 border border-gray-200"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Anonymity Toggle */}
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div>
                      <div className="font-medium text-gray-800">Stay Anonymous</div>
                      <div className="text-sm text-gray-600">Your identity will remain completely private</div>
                    </div>
                    <Switch checked={isAnonymous} onCheckedChange={setIsAnonymous} />
                  </div>

                  {/* Booking Button */}
                  <Button
                    onClick={handleBooking}
                    disabled={!selectedTopic || !selectedDate || !selectedTime}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    Confirm Booking
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Info Cards */}
            <div className="space-y-6">
              <Card className="border-purple-100 shadow-lg bg-purple-50/50">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                    <User className="w-5 h-5 text-purple-500" />
                    What is a Peer Listener?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    Our peer listeners are trained students who understand the unique challenges of university life.
                    They provide a safe, non-judgmental space to share your thoughts and feelings.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-100 shadow-lg bg-green-50/50">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-500" />
                    Confidential & Compassionate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      100% confidential conversations
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      No judgment, only support
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Available 7 days a week
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-orange-100 shadow-lg bg-orange-50/50">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-orange-500" />
                    Session Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 45-minute sessions</li>
                    <li>• Private video or voice call</li>
                    <li>• Flexible rescheduling</li>
                    <li>• Follow-up support available</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          /* Booking Confirmation */
          <div className="max-w-2xl mx-auto text-center">
            <Card className="border-green-100 shadow-xl bg-green-50/50">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Session Booked Successfully!</h2>
                    <p className="text-gray-600">Your peer listener session has been confirmed.</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Topic:</span>
                      <span>{selectedTopic}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Date:</span>
                      <span>{selectedDate?.toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Time:</span>
                      <span>{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Mode:</span>
                      <span>{isAnonymous ? "Anonymous" : "Named"}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    You'll receive a secure meeting link 15 minutes before your session.
                  </p>
                  <Button onClick={() => setIsBooked(false)} variant="outline" className="rounded-full">
                    Book Another Session
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
