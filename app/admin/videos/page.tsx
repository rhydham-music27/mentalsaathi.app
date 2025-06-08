"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Video, Search, Filter, Plus, Edit, Trash2, Eye, Clock, TrendingUp, MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

// Mock video data
const mockVideos = [
  {
    id: 1,
    title: "5-Minute Breathing Exercise for Anxiety",
    category: "Anxiety",
    duration: "5:23",
    instructor: "Dr. Priya Sharma",
    views: 2543,
    likes: 156,
    status: "published",
    uploadDate: "2024-01-05",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    id: 2,
    title: "Progressive Muscle Relaxation",
    category: "Sleep",
    duration: "12:45",
    instructor: "Dr. Arjun Patel",
    views: 1876,
    likes: 98,
    status: "published",
    uploadDate: "2024-01-03",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    id: 3,
    title: "Managing Academic Stress",
    category: "Anxiety",
    duration: "8:30",
    instructor: "Dr. Kavya Reddy",
    views: 3421,
    likes: 234,
    status: "published",
    uploadDate: "2024-01-01",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    id: 4,
    title: "Building Daily Motivation",
    category: "Motivation",
    duration: "6:15",
    instructor: "Dr. Priya Sharma",
    views: 1234,
    likes: 67,
    status: "draft",
    uploadDate: "2024-01-08",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    id: 5,
    title: "Mindful Study Techniques",
    category: "Motivation",
    duration: "10:20",
    instructor: "Dr. Arjun Patel",
    views: 0,
    likes: 0,
    status: "pending",
    uploadDate: "2024-01-08",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
]

const categories = ["All", "Anxiety", "Sleep", "Motivation", "Relationships", "Academic"]
const statuses = ["All", "Published", "Draft", "Pending", "Archived"]

export default function VideoManagementPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [videos, setVideos] = useState(mockVideos)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
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

  const filteredVideos = videos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || video.category === selectedCategory
    const matchesStatus = selectedStatus === "All" || video.status === selectedStatus.toLowerCase()
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-700"
      case "draft":
        return "bg-yellow-100 text-yellow-700"
      case "pending":
        return "bg-blue-100 text-blue-700"
      case "archived":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const handleDeleteVideo = (videoId: number) => {
    if (confirm("Are you sure you want to delete this video?")) {
      setVideos(videos.filter((video) => video.id !== videoId))
    }
  }

  const handleStatusChange = (videoId: number, newStatus: string) => {
    setVideos(videos.map((video) => (video.id === videoId ? { ...video, status: newStatus } : video)))
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
                <Video className="w-6 h-6 text-purple-600" />
                Video Management
              </h1>
              <p className="text-gray-600">Manage therapy videos and content</p>
            </div>
            <Link href="/admin/upload">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full">
                <Plus className="w-4 h-4 mr-2" />
                Upload Video
              </Button>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-blue-100 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Videos</p>
                    <p className="text-3xl font-bold text-gray-900">{videos.length}</p>
                  </div>
                  <Video className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-100 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Published</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {videos.filter((v) => v.status === "published").length}
                    </p>
                  </div>
                  <Eye className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-100 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Views</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {videos.reduce((sum, video) => sum + video.views, 0).toLocaleString()}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-100 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Review</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {videos.filter((v) => v.status === "pending").length}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search videos, instructors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category} Category
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status} Status
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Videos Table */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Videos ({filteredVideos.length})</span>
                <Button variant="outline" size="sm" className="rounded-full">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredVideos.map((video) => (
                  <div
                    key={video.id}
                    className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-24 h-16 object-cover rounded-lg"
                    />

                    <div className="flex-1 space-y-1">
                      <h3 className="font-semibold text-gray-900">{video.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>by {video.instructor}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {video.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {video.views.toLocaleString()} views
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-purple-50 text-purple-700">
                          {video.category}
                        </Badge>
                        <Badge className={getStatusColor(video.status)}>{video.status}</Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link href={`/video/${video.id}`}>
                        <Button variant="outline" size="sm" className="rounded-full">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm" className="rounded-full">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full text-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteVideo(video.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-full">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                {filteredVideos.length === 0 && (
                  <div className="text-center py-12">
                    <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No videos found</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria.</p>
                    <Button
                      onClick={() => {
                        setSearchQuery("")
                        setSelectedCategory("All")
                        setSelectedStatus("All")
                      }}
                      variant="outline"
                      className="rounded-full"
                    >
                      Clear filters
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
