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
import { toast } from "@/components/ui/use-toast";
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

const specializations = [
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
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  specializations: string[];
  experience: string;
  bio: string;
  profilePicture: File | null;
  license: File | null;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  gender?: string;
  specializations?: string;
  experience?: string;
  bio?: string;
  profilePicture?: string;
  license?: string;
}

export default function AddTherapistPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    specializations: [],
    experience: "",
    bio: "",
    profilePicture: null,
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
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
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
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone.replace(/[\s\-$$$$]/g, ""))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = "Please select a gender";
    }

    // Specializations validation
    if (formData.specializations.length === 0) {
      newErrors.specializations = "Please select at least one specialization";
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
    if (!formData.profilePicture) {
      newErrors.profilePicture = "Profile picture is required";
    }

    // License validation
    if (!formData.license) {
      newErrors.license = "License/certification document is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSpecializationChange = (
    specialization: string,
    checked: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      specializations: checked
        ? [...prev.specializations, specialization]
        : prev.specializations.filter((s) => s !== specialization),
    }));
    if (errors.specializations) {
      setErrors((prev) => ({ ...prev, specializations: undefined }));
    }
  };

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setFormData((prev) => ({ ...prev, profilePicture: file }));
        const reader = new FileReader();
        reader.onload = () => setProfilePreview(reader.result as string);
        reader.readAsDataURL(file);
        if (errors.profilePicture) {
          setErrors((prev) => ({ ...prev, profilePicture: undefined }));
        }
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select an image file (JPG, PNG, etc.)",
          variant: "destructive",
        });
      }
    }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Therapist Added Successfully! 🎉",
        description: `Dr. ${formData.fullName} has been added to the platform and will receive login credentials via email.`,
        duration: 5000,
      });

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        gender: "",
        specializations: [],
        experience: "",
        bio: "",
        profilePicture: null,
        license: null,
      });
      setProfilePreview(null);
      if (profileInputRef.current) profileInputRef.current.value = "";
      if (licenseInputRef.current) licenseInputRef.current.value = "";
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add therapist. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      gender: "",
      specializations: [],
      experience: "",
      bio: "",
      profilePicture: null,
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
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                      Personal Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="fullName"
                          className="text-gray-700 font-medium"
                        >
                          Full Name *
                        </Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) =>
                            handleInputChange("fullName", e.target.value)
                          }
                          placeholder="Dr. Priya Sharma"
                          className={`border-2 transition-colors ${
                            errors.fullName
                              ? "border-red-300 focus:border-red-500"
                              : "border-gray-200 focus:border-purple-400"
                          }`}
                        />
                        {errors.fullName && (
                          <p className="text-red-600 text-sm flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.fullName}
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
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
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
                          htmlFor="phone"
                          className="text-gray-700 font-medium"
                        >
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          placeholder="+91 98765 43210"
                          className={`border-2 transition-colors ${
                            errors.phone
                              ? "border-red-300 focus:border-red-500"
                              : "border-gray-200 focus:border-purple-400"
                          }`}
                        />
                        {errors.phone && (
                          <p className="text-red-600 text-sm flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.phone}
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
                          onChange={(e) =>
                            handleInputChange("experience", e.target.value)
                          }
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
                        onValueChange={(value) =>
                          handleInputChange("gender", value)
                        }
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
                        {specializations.map((specialization) => (
                          <div
                            key={specialization}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={specialization}
                              checked={formData.specializations.includes(
                                specialization
                              )}
                              onCheckedChange={(checked) =>
                                handleSpecializationChange(
                                  specialization,
                                  checked as boolean
                                )
                              }
                            />
                            <Label
                              htmlFor={specialization}
                              className="text-sm cursor-pointer"
                            >
                              {specialization}
                            </Label>
                          </div>
                        ))}
                      </div>
                      {errors.specializations && (
                        <p className="text-red-600 text-sm flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.specializations}
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
                        onChange={(e) =>
                          handleInputChange("bio", e.target.value)
                        }
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
