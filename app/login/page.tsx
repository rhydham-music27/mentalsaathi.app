"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  Brain,
  Heart,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import useAuthStore from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { authApi } from "@/utils/api.utils";

export default function LoginPage() {
  const email = useAuthStore((state) => {
    return state.email;
  });
  const router = useRouter();
  const setToken = useAuthStore((state) => state.setToken);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginStatus, setLoginStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [signupStatus, setSignupStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const setMail = useAuthStore((state) => {
    return state.setEmail;
  });
  const token = useAuthStore((state) => {
    return state.token;
  });
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    authApi
      .post("/login", loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        toast.success(response.data.message);
        setToken(response.data.token);
        setMail(response.data.email);
        router.push("/community");
      })
      .catch((error) => {
        // console.log(error)
        toast.error(error.response.data.message);
        router.push('/signup')
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Navbar />

      {/* Hero Section */}
      <section className="py-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        </div>

        <div className="relative max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Brain className="w-8 h-8 text-purple-600" />
              <Heart className="w-7 h-7 text-pink-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to MentalSaathi
            </h1>
            <p className="text-gray-600">Your safe space for mental wellness</p>
          </div>

          <Card className="border-purple-100 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <Tabs defaultValue="login" className="w-full">
                {/* Login Tab */}

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your.email@university.edu"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      className="border-purple-200 focus:border-purple-300"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            password: e.target.value,
                          })
                        }
                        className="border-purple-200 focus:border-purple-300 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {loginStatus === "error" && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">
                        Invalid email or password. Please try again.
                      </span>
                    </div>
                  )}

                  {loginStatus === "success" && (
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">
                        Login successful! Redirecting...
                      </span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-full py-3 font-semibold"
                    disabled={loginStatus === "success"}
                  >
                    {loginStatus === "success" ? "Logging in..." : "Login"}
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-300" />
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      type="button"
                      className="text-sm text-purple-600 hover:text-purple-700 underline"
                    >
                      Forgot your password?
                    </button>
                  </div>
                </form>

                {/* Sign Up Tab */}
              </Tabs>
            </CardContent>
          </Card>

          {/* Privacy Notice */}
          <Card className="mt-6 border-green-100 shadow-lg bg-green-50/50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-green-800 mb-1">
                    Your Privacy is Protected
                  </h3>
                  <p className="text-sm text-green-700">
                    We use advanced encryption and never share your personal
                    information. You can always choose to remain anonymous in
                    our community.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
