"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import {
  Users,
  Search,
  Filter,
  MoreHorizontal,
  Shield,
  Ban,
  CheckCircle,
  AlertTriangle,
  Calendar,
  MessageSquare,
  Eye,
  UserCheck,
} from "lucide-react"
import { useRouter } from "next/navigation"

// Mock user data
const mockUsers = [
  {
    id: 1,
    username: "Anonymous_Student_001",
    email: "user1@university.edu",
    joinDate: "2024-01-15",
    lastActive: "2024-01-20",
    status: "active",
    postsCount: 12,
    sessionsCount: 3,
    reportsCount: 0,
    university: "Delhi University",
    course: "Engineering",
    year: "3rd Year",
  },
  {
    id: 2,
    username: "Anonymous_Student_002",
    email: "user2@university.edu",
    joinDate: "2024-01-10",
    lastActive: "2024-01-19",
    status: "active",
    postsCount: 8,
    sessionsCount: 5,
    reportsCount: 1,
    university: "Mumbai University",
    course: "Medical",
    year: "2nd Year",
  },
  {
    id: 3,
    username: "Anonymous_Student_003",
    email: "user3@university.edu",
    joinDate: "2024-01-05",
    lastActive: "2024-01-18",
    status: "suspended",
    postsCount: 25,
    sessionsCount: 1,
    reportsCount: 3,
    university: "Bangalore University",
    course: "Commerce",
    year: "Final Year",
  },
  {
    id: 4,
    username: "Anonymous_Student_004",
    email: "user4@university.edu",
    joinDate: "2024-01-12",
    lastActive: "2024-01-20",
    status: "active",
    postsCount: 6,
    sessionsCount: 7,
    reportsCount: 0,
    university: "Chennai University",
    course: "Arts",
    year: "1st Year",
  },
  {
    id: 5,
    username: "Anonymous_Student_005",
    email: "user5@university.edu",
    joinDate: "2024-01-08",
    lastActive: "2024-01-16",
    status: "inactive",
    postsCount: 2,
    sessionsCount: 0,
    reportsCount: 0,
    university: "Pune University",
    course: "Science",
    year: "2nd Year",
  },
]

const statusFilters = ["All", "Active", "Inactive", "Suspended", "Banned"]

export default function UserManagementPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [users, setUsers] = useState(mockUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
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

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.university.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === "All" || user.status === selectedStatus.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700"
      case "inactive":
        return "bg-gray-100 text-gray-700"
      case "suspended":
        return "bg-yellow-100 text-yellow-700"
      case "banned":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const handleStatusChange = (userId: number, newStatus: string) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, status: newStatus } : user)))
  }

  const handleBulkAction = (action: string) => {
    if (selectedUsers.length === 0) return

    if (confirm(`Are you sure you want to ${action} ${selectedUsers.length} user(s)?`)) {
      setUsers(users.map((user) => (selectedUsers.includes(user.id) ? { ...user, status: action } : user)))
      setSelectedUsers([])
    }
  }

  const toggleUserSelection = (userId: number) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const selectAllUsers = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(filteredUsers.map((user) => user.id))
    }
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
                <Users className="w-6 h-6 text-purple-600" />
                User Management
              </h1>
              <p className="text-gray-600">Manage platform users and their activities</p>
            </div>
            <div className="flex items-center gap-3">
              {selectedUsers.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{selectedUsers.length} selected</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleBulkAction("suspended")}
                    className="text-yellow-600 hover:bg-yellow-50"
                  >
                    Suspend
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleBulkAction("active")}
                    className="text-green-600 hover:bg-green-50"
                  >
                    Activate
                  </Button>
                </div>
              )}
            </div>
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
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-3xl font-bold text-gray-900">{users.length}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-100 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Users</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {users.filter((u) => u.status === "active").length}
                    </p>
                  </div>
                  <UserCheck className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-100 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Suspended</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {users.filter((u) => u.status === "suspended").length}
                    </p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-100 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Reports</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {users.reduce((sum, user) => sum + user.reportsCount, 0)}
                    </p>
                  </div>
                  <Shield className="w-8 h-8 text-red-600" />
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
                    placeholder="Search users, emails, universities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {statusFilters.map((status) => (
                      <option key={status} value={status}>
                        {status} Status
                      </option>
                    ))}
                  </select>
                  <Button variant="outline" className="rounded-full">
                    <Filter className="w-4 h-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Users ({filteredUsers.length})</span>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={selectAllUsers}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-600">Select All</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleUserSelection(user.id)}
                      className="rounded border-gray-300"
                    />

                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold">
                      {user.username.charAt(0)}
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{user.username}</h3>
                        <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                        {user.reportsCount > 0 && (
                          <Badge variant="outline" className="bg-red-50 text-red-700">
                            {user.reportsCount} reports
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{user.email}</span>
                        <span>•</span>
                        <span>{user.university}</span>
                        <span>•</span>
                        <span>
                          {user.course} - {user.year}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Joined {new Date(user.joinDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          {user.postsCount} posts
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {user.sessionsCount} sessions
                        </span>
                        <span>Last active: {new Date(user.lastActive).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="rounded-full">
                        <Eye className="w-4 h-4" />
                      </Button>
                      {user.status === "active" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full text-yellow-600 hover:bg-yellow-50"
                          onClick={() => handleStatusChange(user.id, "suspended")}
                        >
                          <Ban className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full text-green-600 hover:bg-green-50"
                          onClick={() => handleStatusChange(user.id, "active")}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="rounded-full">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                {filteredUsers.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No users found</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria.</p>
                    <Button
                      onClick={() => {
                        setSearchQuery("")
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
