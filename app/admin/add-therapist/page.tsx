"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
// import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  UserPlus,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  FileText,
  Camera,
  ChevronRight,
  Home,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAdminAuthStore from "@/store/admin.auth.store";
import { adminApi, mediaApi } from "@/utils/api.utils";
import toast from "react-hot-toast";

const expertise = [
  "Anxiety Disorders",
  "Depression",
  "Cognitive Behavioral Therapy (CBT)",
  "Trauma & PTSD",
  "Relationship Counseling",
  "Academic Stress",
  "Eating Disorders",
  "Addiction Counseling",
  "Family Therapy",
  "Mindfulness & Meditation",
  "Career Counseling",
  "Sleep Disorders",
];

interface FormData {
  name: string;
  email: string;
  phone_number: string;
  gender: string;
  expertise: string;
  experience: string;
  bio: string;
  profile_picture: string;
  license: File | null;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone_number?: string;
  gender?: string;
  expertise?: string;
  experience?: string;
  bio?: string;
  profile_picture?: string;
  license?: string;
}

export default function AddTherapistPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone_number: "",
    gender: "",
    expertise: "",
    experience: "",
    bio: "",
    profile_picture: "",
    license: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const token = useAdminAuthStore((state) => {
    return state.token;
  });
  const getDashboardData = async () => {
    const response = await fetch(
      "https://mentalsaathi-express-backend.onrender.com/api/v1/admin/get-important",
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res = await response.json();
    console.log(res);
    if (res.success === false) {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  };
  useEffect(() => {
    getDashboardData();
  }, []);
  const profileInputRef = useRef<HTMLInputElement>(null);
  const licenseInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Full Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Full name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required";
    } else if (
      !phoneRegex.test(formData.phone_number.replace(/[\s\-$$$$]/g, ""))
    ) {
      newErrors.phone_number = "Please enter a valid phone_number number";
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = "Please select a gender";
    }

    // Specializations validation
    if (formData.expertise.length === 0) {
      newErrors.expertise = "Please select at least one specialization";
    }

    // Experience validation
    if (!formData.experience.trim()) {
      newErrors.experience = "Years of experience is required";
    } else if (
      Number.parseInt(formData.experience) < 0 ||
      Number.parseInt(formData.experience) > 50
    ) {
      newErrors.experience = "Please enter a valid number of years (0-50)";
    }

    // Bio validation
    if (!formData.bio.trim()) {
      newErrors.bio = "Bio is required";
    } else if (formData.bio.trim().length < 50) {
      newErrors.bio = "Bio must be at least 50 characters";
    }

    // Profile picture validation
    if (!formData.profile_picture) {
      newErrors.profile_picture = "Profile picture is required";
    }

    // License validation
    if (!formData.license) {
      newErrors.license = "License/certification document is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLicenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, license: file }));
      if (errors.license) {
        setErrors((prev) => ({ ...prev, license: undefined }));
      }
    }
  };

  const clearForm = () => {
    setFormData({
      name: "",
      email: "",
      phone_number: "",
      gender: "",
      expertise: "",
      experience: "",
      bio: "",
      profile_picture: "",
      license: null,
    });
    setProfilePreview(null);
    setErrors({});
    if (profileInputRef.current) profileInputRef.current.value = "";
    if (licenseInputRef.current) licenseInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-purple-50 to-blue-50 flex">
      <AdminSidebar />

      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-purple-100 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                <Link
                  href="/admin/dashboard"
                  className="hover:text-purple-600 transition-colors"
                >
                  <Home className="w-4 h-4" />
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-purple-600 font-medium">
                  Add Therapist
                </span>
              </nav>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <UserPlus className="w-6 h-6 text-purple-600" />
                Add New Therapist
              </h1>
              <p className="text-gray-600">
                Add a licensed mental health professional to the platform
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <div className="max-w-4xl mx-auto">
            <Card className="border-purple-100 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 border-b border-purple-100">
                <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-purple-600" />
                  Therapist Information
                </CardTitle>
                <p className="text-gray-600 text-sm">
                  Please fill in all required information to add a new therapist
                  to the platform.
                </p>
              </CardHeader>

              <CardContent className="p-8">
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    // console.log(formData);
                    adminApi
                      .post("/add-therapist", formData, {
                        headers: {
                          "Content-Type": "application/json",
                        },
                      })
                      .then((response) => {
                        toast.success(response.data.message);
                      })
                      .catch((error) => {
                        toast.error(error.response.data.message);
                      });
                  }}
                  className="space-y-8"
                >
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                      Personal Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="name"
                          className="text-gray-700 font-medium"
                        >
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(event) => {
                            setFormData((previous) => ({
                              ...previous,
                              name: event.target.value,
                            }));
                          }}
                          placeholder="Dr. Priya Sharma"
                          className={`border-2 transition-colors ${
                            errors.name
                              ? "border-red-300 focus:border-red-500"
                              : "border-gray-200 focus:border-purple-400"
                          }`}
                        />
                        {errors.name && (
                          <p className="text-red-600 text-sm flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="text-gray-700 font-medium"
                        >
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(event) => {
                            setFormData((previous) => ({
                              ...previous,
                              email: event.target.value,
                            }));
                          }}
                          placeholder="priya.sharma@example.com"
                          className={`border-2 transition-colors ${
                            errors.email
                              ? "border-red-300 focus:border-red-500"
                              : "border-gray-200 focus:border-purple-400"
                          }`}
                        />
                        {errors.email && (
                          <p className="text-red-600 text-sm flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="phone_number"
                          className="text-gray-700 font-medium"
                        >
                          Phone Number *
                        </Label>
                        <Input
                          id="phone_number"
                          type="tel"
                          value={formData.phone_number}
                          onChange={(event) => {
                            setFormData((previous) => ({
                              ...previous,
                              phone_number: event.target.value,
                            }));
                          }}
                          placeholder="+91 98765 43210"
                          className={`border-2 transition-colors ${
                            errors.phone_number
                              ? "border-red-300 focus:border-red-500"
                              : "border-gray-200 focus:border-purple-400"
                          }`}
                        />
                        {errors.phone_number && (
                          <p className="text-red-600 text-sm flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.phone_number}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="experience"
                          className="text-gray-700 font-medium"
                        >
                          Years of Experience *
                        </Label>
                        <Input
                          id="experience"
                          type="number"
                          min="0"
                          max="50"
                          value={formData.experience}
                          onChange={(event) => {
                            setFormData((previous) => ({
                              ...previous,
                              experience: event.target.value,
                            }));
                          }}
                          placeholder="5"
                          className={`border-2 transition-colors ${
                            errors.experience
                              ? "border-red-300 focus:border-red-500"
                              : "border-gray-200 focus:border-purple-400"
                          }`}
                        />
                        {errors.experience && (
                          <p className="text-red-600 text-sm flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.experience}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Gender Selection */}
                    <div className="space-y-3">
                      <Label className="text-gray-700 font-medium">
                        Gender *
                      </Label>
                      <RadioGroup
                        value={formData.gender}
                        onValueChange={(value) => {
                          setFormData((previous) => ({
                            ...previous,
                            gender: value,
                          }));
                        }}
                        className="flex gap-6"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" />
                          <Label htmlFor="male" className="cursor-pointer">
                            Male
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" />
                          <Label htmlFor="female" className="cursor-pointer">
                            Female
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other" className="cursor-pointer">
                            Other
                          </Label>
                        </div>
                      </RadioGroup>
                      {errors.gender && (
                        <p className="text-red-600 text-sm flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.gender}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                      Professional Information
                    </h3>

                    {/* Specializations */}
                    <div className="space-y-3">
                      <Label className="text-gray-700 font-medium">
                        Specializations *
                      </Label>
                      <p className="text-sm text-gray-600">
                        Select all areas of expertise (minimum 1 required)
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        <RadioGroup
                          value={formData.expertise}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              expertise: value,
                            }))
                          }
                          
                        >
                          {expertise.map((specialization) => (
                            <div
                              key={specialization}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem
                                value={specialization}
                                id={specialization}
                              />
                              <Label
                                htmlFor={specialization}
                                className="text-sm cursor-pointer"
                              >
                                {specialization}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                      {errors.expertise && (
                        <p className="text-red-600 text-sm flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.expertise}
                        </p>
                      )}
                    </div>

                    {/* Bio */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="bio"
                        className="text-gray-700 font-medium"
                      >
                        Professional Bio *
                      </Label>
                      <p className="text-sm text-gray-600">
                        Write a brief professional bio (minimum 50 characters).
                        This will be visible to patients.
                      </p>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(event) => {
                          setFormData((previous) => ({
                            ...previous,
                            bio: event.target.value,
                          }));
                        }}
                        placeholder="Dr. Priya Sharma is a licensed clinical psychologist with over 5 years of experience in treating anxiety and depression. She specializes in Cognitive Behavioral Therapy and has helped hundreds of students overcome academic stress..."
                        className={`min-h-[120px] border-2 transition-colors ${
                          errors.bio
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-200 focus:border-purple-400"
                        }`}
                      />
                      <div className="flex justify-between items-center">
                        {errors.bio && (
                          <p className="text-red-600 text-sm flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.bio}
                          </p>
                        )}
                        <p className="text-sm text-gray-500 ml-auto">
                          {formData.bio.length} characters
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="bio"
                        className="text-gray-700 font-medium"
                      >
                        Profile Picture *
                      </Label>

                      <input
                        type="file"
                        onChange={(event) => {
                          event.preventDefault();
                          if (!event.target.files) return;
                          const file = event.target.files[0];
                          const form = new FormData();
                          form.append("profile", file);
                          mediaApi
                            .post("/profile", form)
                            .then((response) => {
                              setFormData((previous) => ({
                                ...previous,
                                profile_picture: response.data.file.url,
                              }));
                            })
                            .catch((error) => {
                              return;
                            });
                        }}
                      />
                    </div>
                  </div>

                  {/* File Uploads */}

                  {/* Form Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full py-3 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Adding Therapist...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Add Therapist
                        </>
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={clearForm}
                      disabled={isSubmitting}
                      className="flex-1 sm:flex-none border-2 border-gray-300 hover:border-gray-400 rounded-full py-3 px-6"
                    >
                      Clear Form
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <Toaster />
    </div>
  );
}
