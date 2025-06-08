"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Upload, Video, ImageIcon, CheckCircle, AlertCircle, X, FileText } from "lucide-react"
import { useRouter } from "next/navigation"

const categories = ["Anxiety", "Sleep", "Motivation", "Relationships", "Academic", "Self-Care"]
const instructors = ["Dr. Priya Sharma", "Dr. Arjun Patel", "Dr. Kavya Reddy", "Dr. Rahul Singh"]

export default function UploadPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [uploadStep, setUploadStep] = useState(1)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)

  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    instructor: "",
    duration: "",
    tags: "",
    transcript: "",
    status: "draft",
  })

  const videoRef = useRef<HTMLVideoElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const thumbnailInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuth")
    if (adminAuth === "true") {
      setIsAuthenticated(true)
    } else {
      router.push("/admin/login")
    }
  }, [router])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file)
      const url = URL.createObjectURL(file)
      setVideoPreview(url)

      // Auto-extract duration when video loads
      const video = document.createElement("video")
      video.src = url
      video.onloadedmetadata = () => {
        const duration = Math.floor(video.duration)
        const minutes = Math.floor(duration / 60)
        const seconds = duration % 60
        setFormData((prev) => ({
          ...prev,
          duration: `${minutes}:${seconds.toString().padStart(2, "0")}`,
        }))
      }
    }
  }

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      setThumbnailFile(file)
      const url = URL.createObjectURL(file)
      setThumbnailPreview(url)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!videoFile) return

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setUploadComplete(true)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 500)
  }

  const resetForm = () => {
    setVideoFile(null)
    setThumbnailFile(null)
    setVideoPreview(null)
    setThumbnailPreview(null)
    setFormData({
      title: "",
      description: "",
      category: "",
      instructor: "",
      duration: "",
      tags: "",
      transcript: "",
      status: "draft",
    })
    setUploadStep(1)
    setUploadProgress(0)
    setUploadComplete(false)
    if (fileInputRef.current) fileInputRef.current.value = ""
    if (thumbnailInputRef.current) thumbnailInputRef.current.value = ""
  }

  if (uploadComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <AdminSidebar />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <Card className="max-w-md w-full mx-4">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Successful!</h2>
              <p className="text-gray-600 mb-6">Your video has been uploaded and is ready for review.</p>
              <div className="space-y-3">
                <Button onClick={resetForm} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  Upload Another Video
                </Button>
                <Button variant="outline" onClick={() => router.push("/admin/videos")} className="w-full">
                  View All Videos
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />

      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Upload className="w-6 h-6 text-purple-600" />
                Upload Video Content
              </h1>
              <p className="text-gray-600">Add new therapy videos to the platform</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    uploadStep >= 1 ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  1
                </span>
                <span>Upload</span>
                <div className="w-8 h-px bg-gray-300"></div>
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    uploadStep >= 2 ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  2
                </span>
                <span>Details</span>
                <div className="w-8 h-px bg-gray-300"></div>
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    uploadStep >= 3 ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  3
                </span>
                <span>Review</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: File Upload */}
              {uploadStep === 1 && (
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Video className="w-5 h-5 text-purple-600" />
                      Upload Video File
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Video Upload */}
                    <div>
                      <Label className="text-base font-medium">Video File *</Label>
                      <div className="mt-2">
                        {!videoFile ? (
                          <div
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 cursor-pointer transition-colors"
                          >
                            <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-lg font-medium text-gray-900 mb-2">Upload your video</p>
                            <p className="text-gray-600 mb-4">Drag and drop or click to browse</p>
                            <p className="text-sm text-gray-500">Supports MP4, MOV, AVI (Max 500MB)</p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                              <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                <div>
                                  <p className="font-medium text-green-900">{videoFile.name}</p>
                                  <p className="text-sm text-green-700">
                                    {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                                  </p>
                                </div>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setVideoFile(null)
                                  setVideoPreview(null)
                                  if (fileInputRef.current) fileInputRef.current.value = ""
                                }}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>

                            {videoPreview && (
                              <div className="relative">
                                <video
                                  ref={videoRef}
                                  src={videoPreview}
                                  className="w-full max-w-md mx-auto rounded-lg"
                                  controls
                                />
                              </div>
                            )}
                          </div>
                        )}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="video/*"
                          onChange={handleVideoUpload}
                          className="hidden"
                        />
                      </div>
                    </div>

                    {/* Thumbnail Upload */}
                    <div>
                      <Label className="text-base font-medium">Thumbnail Image</Label>
                      <div className="mt-2">
                        {!thumbnailFile ? (
                          <div
                            onClick={() => thumbnailInputRef.current?.click()}
                            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 cursor-pointer transition-colors"
                          >
                            <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="font-medium text-gray-900 mb-1">Upload thumbnail</p>
                            <p className="text-sm text-gray-500">JPG, PNG (Recommended: 1280x720)</p>
                          </div>
                        ) : (
                          <div className="flex items-center gap-4">
                            <img
                              src={thumbnailPreview || ""}
                              alt="Thumbnail preview"
                              className="w-32 h-20 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{thumbnailFile.name}</p>
                              <p className="text-sm text-gray-600">{(thumbnailFile.size / 1024).toFixed(2)} KB</p>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setThumbnailFile(null)
                                setThumbnailPreview(null)
                                if (thumbnailInputRef.current) thumbnailInputRef.current.value = ""
                              }}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                        <input
                          ref={thumbnailInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleThumbnailUpload}
                          className="hidden"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        type="button"
                        onClick={() => setUploadStep(2)}
                        disabled={!videoFile}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        Next: Add Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Video Details */}
              {uploadStep === 2 && (
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-purple-600" />
                      Video Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="title">Video Title *</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                          placeholder="e.g., 5-Minute Breathing Exercise for Anxiety"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="instructor">Instructor *</Label>
                        <Select
                          value={formData.instructor}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, instructor: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select instructor" />
                          </SelectTrigger>
                          <SelectContent>
                            {instructors.map((instructor) => (
                              <SelectItem key={instructor} value={instructor}>
                                {instructor}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration</Label>
                        <Input
                          id="duration"
                          value={formData.duration}
                          onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
                          placeholder="e.g., 5:23"
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe what this video covers and how it can help students..."
                        className="min-h-[100px]"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags (comma-separated)</Label>
                      <Input
                        id="tags"
                        value={formData.tags}
                        onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
                        placeholder="e.g., breathing, anxiety, relaxation, mindfulness"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="transcript">Transcript (Optional)</Label>
                      <Textarea
                        id="transcript"
                        value={formData.transcript}
                        onChange={(e) => setFormData((prev) => ({ ...prev, transcript: e.target.value }))}
                        placeholder="Add the video transcript for accessibility..."
                        className="min-h-[120px]"
                      />
                    </div>

                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={() => setUploadStep(1)}>
                        Back
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setUploadStep(3)}
                        disabled={
                          !formData.title || !formData.category || !formData.instructor || !formData.description
                        }
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        Next: Review
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Review & Publish */}
              {uploadStep === 3 && (
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-purple-600" />
                      Review & Publish
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Preview */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Video Preview</h3>
                        <div className="space-y-3">
                          {thumbnailPreview && (
                            <img
                              src={thumbnailPreview || "/placeholder.svg"}
                              alt="Thumbnail"
                              className="w-full h-40 object-cover rounded-lg"
                            />
                          )}
                          <div className="space-y-2">
                            <h4 className="font-medium text-gray-900">{formData.title}</h4>
                            <p className="text-sm text-gray-600">{formData.description}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span>{formData.instructor}</span>
                              <span>•</span>
                              <span>{formData.duration}</span>
                              <span>•</span>
                              <span>{formData.category}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Publishing Options</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Status</Label>
                            <Select
                              value={formData.status}
                              onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="draft">Save as Draft</SelectItem>
                                <SelectItem value="pending">Submit for Review</SelectItem>
                                <SelectItem value="published">Publish Immediately</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex items-start gap-2">
                              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                              <div>
                                <p className="font-medium text-blue-900">Publishing Guidelines</p>
                                <ul className="text-sm text-blue-800 mt-1 space-y-1">
                                  <li>• Videos are reviewed within 24 hours</li>
                                  <li>• Ensure content follows community guidelines</li>
                                  <li>• Include proper trigger warnings if needed</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Upload Progress */}
                    {isUploading && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">Uploading video...</span>
                          <span className="text-sm text-gray-600">{Math.round(uploadProgress)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={() => setUploadStep(2)} disabled={isUploading}>
                        Back
                      </Button>
                      <Button
                        type="submit"
                        disabled={isUploading}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        {isUploading ? "Uploading..." : "Upload Video"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
