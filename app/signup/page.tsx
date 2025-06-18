"use client";
import { authApi, mediaApi } from "../../utils/api.utils.js";
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
import { toast } from "react-hot-toast";

export default function page() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [file, setFile] = useState<File | null>(null);
  const [signupData, setSignupData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    profile_picture: "",
  });
  const [loginStatus, setLoginStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const profiledata = new FormData();
  const [signupStatus, setSignupStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    setTimeout(() => {
      if (loginData.email && loginData.password) {
        setLoginStatus("success");
      } else {
        setLoginStatus("error");
      }
    }, 1000);
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
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    console.log("clocked")
                    authApi
                      .post("/signup", signupData, {
                        headers: {
                          "Content-type": "application/json",
                        },
                      })
                      .then((resposne) => {
                        toast.success(resposne.data.message);
                      })
                      .catch((error) => {
                        toast.error(error.response.data.message);
                      });
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your.email@university.edu"
                      value={signupData.email}
                      onChange={(e) =>
                        setSignupData({ ...signupData, email: e.target.value })
                      }
                      className="border-purple-200 focus:border-purple-300"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="abx xyz"
                      value={signupData.name}
                      onChange={(e) =>
                        setSignupData({ ...signupData, name: e.target.value })
                      }
                      className="border-purple-200 focus:border-purple-300"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={signupData.password}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
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

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={signupData.confirmPassword}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="border-purple-200 focus:border-purple-300 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Profile Picture</Label>
                    <div className="relative">
                      <Input
                        type="file"
                        placeholder="Enter your profile picture"
                        onChange={(e) => {
                          e.preventDefault();
                          const selectedFile = e.target.files?.[0];
                          console.log(selectedFile);
                          if (!selectedFile) return;

                          setFile(selectedFile); // if needed elsewhere

                          const formData = new FormData();
                          formData.append("profile", selectedFile); // MUST match your backend field

                          mediaApi
                            .post("/profile", formData)
                            .then((response) => {
                              console.log(
                                "Upload Success:",
                                response.data.file.url
                              );
                              setSignupData((prev) => ({
                                ...prev,
                                profile_picture: response.data.file.url,
                              }));
                              toast.success("image uploaded succesfully")
                              // Optional: setUploadedUrl(response.data.file.url);
                            })
                            .catch((error) => {
                              console.error(
                                "Upload Error:",
                                error.response?.data || error.message
                              );
                              toast.error("somehtin unexpected happened, please try later")
                            });
                        }}
                        className="border-purple-200 focus:border-purple-300 pr-10"
                        required
                      />
                    </div>
                  </div>

                  {signupStatus === "error" && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">
                        {signupData.password !== signupData.confirmPassword
                          ? "Passwords don't match. Please try again."
                          : "Please fill in all fields correctly."}
                      </span>
                    </div>
                  )}

                  {signupStatus === "success" && (
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">
                        Account created successfully! Welcome to MentalSaathi.
                      </span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-full py-3 font-semibold"
                    disabled={signupStatus === "success"}
                  >
                    {signupStatus === "success"
                      ? "Creating account..."
                      : "Create Account"}
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-gray-300 rounded-full py-3 font-semibold"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Sign up with Google
                  </Button>

                  <div className="text-center text-xs text-gray-500">
                    By creating an account, you agree to our{" "}
                    <button className="text-purple-600 hover:text-purple-700 underline">
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button className="text-purple-600 hover:text-purple-700 underline">
                      Privacy Policy
                    </button>
                  </div>
                </form>
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
