"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { User, ArrowLeft, Shield, Eye, Heart, Calendar, BookOpen, Users, Settings, LogOut } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [anonymousMode, setAnonymousMode] = useState(true)

  const stats = [
    { label: "Days Active", value: "23", icon: Calendar },
    { label: "Journal Entries", value: "15", icon: BookOpen },
    { label: "Community Posts", value: "8", icon: Users },
    { label: "Sessions Attended", value: "3", icon: Heart },
  ]

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
              <User className="w-5 h-5 text-purple-500" />
              <h1 className="text-lg font-semibold text-gray-800">Profile</h1>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6 space-y-6 pb-24">
        {/* Profile Card */}
        <Card className="border-purple-100 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-2xl text-white">
                🌸
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800">Saathi123</h2>
                <p className="text-sm text-gray-600">Anonymous User</p>
                <Badge variant="outline" className="mt-2 bg-green-50 text-green-700 border-green-200">
                  <Shield className="w-3 h-3 mr-1" />
                  Privacy Protected
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card className="border-blue-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800">Your Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => {
                const IconComponent = stat.icon
                return (
                  <div key={stat.label} className="text-center space-y-2">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <IconComponent className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                      <p className="text-xs text-gray-600">{stat.label}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="border-green-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" />
              Privacy & Safety
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium text-gray-800">Anonymous Mode</p>
                <p className="text-sm text-gray-600">Keep your identity completely private</p>
              </div>
              <Switch checked={anonymousMode} onCheckedChange={setAnonymousMode} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium text-gray-800">Data Protection</p>
                <p className="text-sm text-gray-600">No personal data is stored or tracked</p>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                <Eye className="w-3 h-3 mr-1" />
                Enabled
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* App Settings */}
        <Card className="border-orange-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
              <Settings className="w-5 h-5 text-orange-500" />
              App Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium text-gray-800">Notifications</p>
                <p className="text-sm text-gray-600">Daily check-in reminders</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium text-gray-800">Dark Mode</p>
                <p className="text-sm text-gray-600">Easier on the eyes</p>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
          </CardContent>
        </Card>

        {/* Support Resources */}
        <Card className="border-red-100 shadow-sm bg-red-50">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              Support Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <p className="font-medium text-red-800">Crisis Helplines</p>
              <div className="space-y-1 text-sm text-red-700">
                <p>• National: 9152987821 (24/7)</p>
                <p>• NIMHANS: 080-46110007</p>
                <p>• Vandrevala Foundation: 9999666555</p>
              </div>
            </div>
            <Button variant="outline" className="w-full border-red-200 text-red-700 hover:bg-red-100">
              View All Resources
            </Button>
          </CardContent>
        </Card>

        {/* About */}
        <Card className="border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800">About MentalSaathi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-gray-600 leading-relaxed">
              MentalSaathi is a safe, anonymous platform designed specifically for Indian university students. We
              believe in peer support, privacy, and accessible mental health resources.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs">
                Version 1.0.0
              </Badge>
              <Badge variant="outline" className="text-xs">
                Privacy First
              </Badge>
              <Badge variant="outline" className="text-xs">
                Student Safe
              </Badge>
            </div>
            <div className="space-y-2 pt-2">
              <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-800">
                Terms of Service
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-800">
                Privacy Policy
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-800">
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Logout */}
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="pt-4">
            <Button variant="outline" className="w-full text-gray-600 hover:text-red-600 hover:border-red-200">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-purple-100 z-30">
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex justify-around items-center">
            <Link href="/" className="flex flex-col items-center gap-1 py-2 px-3 text-gray-500">
              <Heart className="w-5 h-5" />
              <span className="text-xs">Home</span>
            </Link>
            <Link href="/community" className="flex flex-col items-center gap-1 py-2 px-3 text-gray-500">
              <Users className="w-5 h-5" />
              <span className="text-xs">Community</span>
            </Link>
            <Link href="/sessions" className="flex flex-col items-center gap-1 py-2 px-3 text-gray-500">
              <Calendar className="w-5 h-5" />
              <span className="text-xs">Sessions</span>
            </Link>
            <Link href="/library" className="flex flex-col items-center gap-1 py-2 px-3 text-gray-500">
              <BookOpen className="w-5 h-5" />
              <span className="text-xs">Library</span>
            </Link>
            <Link href="/profile" className="flex flex-col items-center gap-1 py-2 px-3 text-purple-600">
              <User className="w-5 h-5" />
              <span className="text-xs font-medium">Profile</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}
