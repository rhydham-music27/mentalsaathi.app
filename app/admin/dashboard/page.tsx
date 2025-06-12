"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import {
  Users,
  Video,
  MessageSquare,
  TrendingUp,
  Calendar,
  AlertTriangle,
  Clock,
  Upload,
  Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";
import useAdminAuthStore from "@/store/admin.auth.store";
import { adminApi } from "@/utils/api.utils";
import toast from "react-hot-toast";

// Mock data for dashboard
const dashboardStats = {
  totalUsers: 1247,
  activeUsers: 892,
  totalVideos: 45,
  totalPosts: 234,
  sessionsToday: 67,
  newUsersThisWeek: 89,
  videoViews: 12543,
  communityEngagement: 78,
};

const recentActivity = [
  {
    id: 1,
    type: "user_signup",
    message: "New user registered: Anonymous Student",
    time: "2 minutes ago",
    icon: Users,
    color: "text-green-500",
  },
  {
    id: 2,
    type: "video_upload",
    message: "Video uploaded: Managing Exam Anxiety",
    time: "15 minutes ago",
    icon: Video,
    color: "text-blue-500",
  },
  {
    id: 3,
    type: "community_post",
    message: "New community post flagged for review",
    time: "32 minutes ago",
    icon: MessageSquare,
    color: "text-orange-500",
  },
  {
    id: 4,
    type: "session_booked",
    message: "Peer listener session booked",
    time: "1 hour ago",
    icon: Calendar,
    color: "text-purple-500",
  },
];

const pendingReviews = [
  {
    id: 1,
    type: "Community Post",
    title: "Feeling overwhelmed with studies",
    author: "Anonymous Student",
    status: "pending",
    priority: "medium",
  },
  {
    id: 2,
    type: "User Report",
    title: "Inappropriate comment reported",
    author: "System",
    status: "urgent",
    priority: "high",
  },
  {
    id: 3,
    type: "Video Review",
    title: "New therapy video submission",
    author: "Dr. Priya Sharma",
    status: "pending",
    priority: "low",
  },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState({
    totalUser: "",
    activeUser: "",
  });
  const token = useAdminAuthStore((state) => {
    return state.token;
  });
  const getDashboardData = async () => {
    adminApi
      .get("/get-important", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDashboardData((prev) => ({
          ...prev,
          totalUser: response.data.totalUser,
          activeUser: response.data.active,
        }));
      })
      .catch((error) => {
        router.push("/admin/login");
      });
  };
  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />

      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back, Admin</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="rounded-full">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-blue-100 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Users
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {dashboardData.totalUser}
                    </p>
                    <p className="text-sm text-green-600">+{0} this week</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-100 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Active Users
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {dashboardData.activeUser}
                    </p>
                    <p className="text-sm text-green-600">
                      {Math.round(
                        (+dashboardData.activeUser / +dashboardData.totalUser) *
                          100
                      )}
                      % engagement
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* <Card className="border-purple-100 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Videos
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {dashboardStats.totalVideos}
                    </p>
                    <p className="text-sm text-blue-600">
                      {dashboardStats.videoViews.toLocaleString()} total views
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Video className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-100 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Sessions Today
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {dashboardStats.sessionsToday}
                    </p>
                    <p className="text-sm text-orange-600">
                      Peer listener sessions
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card> */}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => {
                    const IconComponent = activity.icon;
                    return (
                      <div
                        key={activity.id}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50"
                      >
                        <div
                          className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center`}
                        >
                          <IconComponent
                            className={`w-4 h-4 ${activity.color}`}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.message}
                          </p>
                          <p className="text-xs text-gray-500">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Pending Reviews */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  Pending Reviews
                  <span className="ml-auto bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">
                    {pendingReviews.length}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingReviews.map((review) => (
                    <div
                      key={review.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-gray-100"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">
                            {review.type}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              review.priority === "high"
                                ? "bg-red-100 text-red-700"
                                : review.priority === "medium"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {review.priority}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{review.title}</p>
                        <p className="text-xs text-gray-500">
                          by {review.author}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full"
                      >
                        Review
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="h-20 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex flex-col items-center justify-center gap-2">
                  <Upload className="w-6 h-6" />
                  Upload New Video
                </Button>
                <Button
                  variant="outline"
                  className="h-20 border-purple-200 text-purple-700 hover:bg-purple-50 rounded-lg flex flex-col items-center justify-center gap-2"
                >
                  <Users className="w-6 h-6" />
                  Manage Users
                </Button>
                <Button
                  variant="outline"
                  className="h-20 border-green-200 text-green-700 hover:bg-green-50 rounded-lg flex flex-col items-center justify-center gap-2"
                >
                  <MessageSquare className="w-6 h-6" />
                  Moderate Community
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
