"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Brain, Heart, Eye, EyeOff, Shield, AlertCircle, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [loginStatus, setLoginStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginStatus("loading")

    // Simulate admin authentication
    setTimeout(() => {
      if (credentials.email === "admin@mentalsaathi.com" && credentials.password === "admin123") {
        setLoginStatus("success")
        localStorage.setItem("adminAuth", "true")
        setTimeout(() => {
          router.push("/admin/dashboard")
        }, 1000)
      } else {
        setLoginStatus("error")
        setErrorMessage("Invalid admin credentials. Please try again.")
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="w-8 h-8 text-purple-400" />
            <Heart className="w-7 h-7 text-pink-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">MentalSaathi</h1>
          <div className="flex items-center justify-center gap-2">
            <Shield className="w-5 h-5 text-purple-400" />
            <p className="text-purple-200">Admin Portal</p>
          </div>
        </div>

        <Card className="border-purple-500/20 shadow-2xl bg-white/10 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center">Admin Login</CardTitle>
            <p className="text-purple-200 text-center">Access the administrative dashboard</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Admin Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@mentalsaathi.com"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  className="bg-white/10 border-purple-300/30 text-white placeholder:text-purple-200 focus:border-purple-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter admin password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    className="bg-white/10 border-purple-300/30 text-white placeholder:text-purple-200 focus:border-purple-400 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {loginStatus === "error" && (
                <div className="flex items-center gap-2 text-red-300 bg-red-500/20 p-3 rounded-lg border border-red-500/30">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{errorMessage}</span>
                </div>
              )}

              {loginStatus === "success" && (
                <div className="flex items-center gap-2 text-green-300 bg-green-500/20 p-3 rounded-lg border border-green-500/30">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Login successful! Redirecting to dashboard...</span>
                </div>
              )}

              <Button
                type="submit"
                disabled={loginStatus === "loading" || loginStatus === "success"}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-full py-3 font-semibold"
              >
                {loginStatus === "loading" ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Authenticating...
                  </div>
                ) : loginStatus === "success" ? (
                  "Redirecting..."
                ) : (
                  "Login to Dashboard"
                )}
              </Button>
            </form>

            {/* Demo credentials */}
            <div className="mt-6 p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
              <p className="text-blue-200 text-sm font-medium mb-2">Demo Credentials:</p>
              <p className="text-blue-100 text-xs">Email: admin@mentalsaathi.com</p>
              <p className="text-blue-100 text-xs">Password: admin123</p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-purple-300 text-sm">Secure admin access • End-to-end encrypted • Privacy protected</p>
        </div>
      </div>
    </div>
  )
}
