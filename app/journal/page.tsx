"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  BookOpen,
  Play,
  Clock,
  ChevronDown,
  ChevronUp,
  Calendar,
  Heart,
  Save,
  Filter,
} from "lucide-react";
import Link from "next/link";
import useAuthStore from "@/store/auth.store";
import toast from "react-hot-toast";

// Mock data for journal entries

// const mockJournalEntries = getJournalData()

// Mock data for therapy videos
const therapyVideos = [
  {
    id: 1,
    title: "5-Minute Breathing Exercise for Anxiety",
    duration: "5:23",
    category: "Anxiety",
    thumbnail: "/placeholder.svg?height=200&width=300",
    description: "Quick breathing techniques to calm your mind",
  },
  {
    id: 2,
    title: "Progressive Muscle Relaxation",
    duration: "12:45",
    category: "Sleep",
    thumbnail: "/placeholder.svg?height=200&width=300",
    description: "Full body relaxation for better sleep",
  },
  {
    id: 3,
    title: "Managing Academic Stress",
    duration: "8:30",
    category: "Anxiety",
    thumbnail: "/placeholder.svg?height=200&width=300",
    description: "Strategies for handling study pressure",
  },
  {
    id: 4,
    title: "Building Daily Motivation",
    duration: "6:15",
    category: "Motivation",
    thumbnail: "/placeholder.svg?height=200&width=300",
    description: "Start your day with positive energy",
  },
  {
    id: 5,
    title: "Mindful Study Techniques",
    duration: "10:20",
    category: "Motivation",
    thumbnail: "/placeholder.svg?height=200&width=300",
    description: "Focus better and retain more information",
  },
  {
    id: 6,
    title: "Evening Wind-Down Routine",
    duration: "7:45",
    category: "Sleep",
    thumbnail: "/placeholder.svg?height=200&width=300",
    description: "Prepare your mind and body for rest",
  },
];

const categories = ["All", "Anxiety", "Sleep", "Motivation"];

export default function JournalPage() {
  const [journalEntry, setJournalEntry] = useState("");
  type JournalEntry = {
    _id: string;
    date: string;
    preview: string;
    content: string;
    mood: string;
  };
  const token = useAuthStore((state) => {
    return state.token;
  });
  const hasHydrated = useAuthStore((state) => {
    return state.hasHydrated;
  });
  const getJournalData = async () => {
    const response = await fetch(
      "https://mentalsaathi-express-backend.onrender.com/api/v1/tools/get-journal",
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res = await response.json();
    console.log(res);
    console.log(token);
    if (res.success === true) {
      setJournalEntries(res.journalData);
      console.log(res.journalData.length);
    }
  };
  useEffect(() => {
    if (hasHydrated && token) {
      getJournalData();
    }
  }, []);

  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isSaving, setIsSaving] = useState(false);

  const filteredVideos =
    selectedCategory === "All"
      ? therapyVideos
      : therapyVideos.filter((video) => video.category === selectedCategory);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "Happy":
        return "bg-green-100 text-green-700";
      case "Stressed":
        return "bg-red-100 text-red-700";
      case "Mixed":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };
  useEffect(() => {
    const ping = async () => {
      await fetch(
        "https://mentalsaathi-express-backend.onrender.com/api/v1/admin/ping",
        { 
          headers:{
            'Authorization':`Bearer ${token}`
          }
         }
      );
    };

    ping();
    const interval = setInterval(ping, 60000); // every 1 min

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <Navbar />

      {/* Hero Section */}
      <section className="py-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Your Personal{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Wellness Space
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Reflect, learn, and grow with our journaling tools and guided
            therapy videos.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Journaling Section */}
          <div className="space-y-6">
            <Card className="border-pink-100 shadow-lg bg-gradient-to-br from-pink-50 to-purple-50">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-pink-500" />
                  How are you feeling today?
                </CardTitle>
                <p className="text-gray-600">
                  Take a moment to reflect and write down your thoughts.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Dear journal, today I feel... Share whatever is on your mind. This is your safe space."
                  onChange={(e) => setJournalEntry(e.target.value)}
                  className="min-h-[150px] border-pink-200 focus:border-pink-300 resize-none bg-white/70 backdrop-blur-sm"
                />
                <Button
                  onClick={async (event) => {
                    event.preventDefault();
                    const response = await fetch(
                      "https://mentalsaathi-express-backend.onrender.com/api/v1/tools/journal",
                      {
                        method: "post",
                        headers: {
                          "Content-type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                          preview: journalEntry.split(".")[0],
                          content: journalEntry,
                          mood: "😊",
                        }),
                      }
                    );
                    const res = await response.json();
                    if (res.success === true) {
                      toast.success(res.message);
                      getJournalData();
                    } else {
                      toast.error(res.message);
                    }
                  }}
                  // disabled={!journalEntry.trim() || isSaving}
                  className={`w-full rounded-full py-3 font-semibold transition-all duration-300 ${
                    isSaving
                      ? "bg-green-500 text-white transform scale-105"
                      : "bg-pink-500 hover:bg-pink-600 text-white hover:shadow-lg hover:scale-105"
                  }`}
                >
                  {isSaving ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Save className="w-4 h-4" />
                      Save Entry
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Past Journal Entries */}
            <Card className="border-purple-100 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-500" />
                  Your Journal History
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {journalEntries.map((entry) => (
                  <Card
                    key={entry._id}
                    className="border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div
                        className="cursor-pointer"
                        onClick={() =>
                          setExpandedEntry(
                            expandedEntry === entry._id ? null : entry._id
                          )
                        }
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium text-gray-700">
                                {formatDate(entry.date)}
                              </span>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getMoodColor(
                                  entry.mood
                                )}`}
                              >
                                {entry.mood}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm">
                              {expandedEntry === entry._id
                                ? entry.content
                                : entry.preview}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm" className="ml-2">
                            {expandedEntry === entry._id ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
              <CardContent className="space-y-3">
                {journalEntries.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Heart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>
                      No journal entries yet. Start writing to see your thoughts
                      here!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* <div className="space-y-6">
            <Card className="border-blue-100 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800 flex items-center gap-2">
                  <Play className="w-6 h-6 text-blue-500" />
                  Therapy Tools: Watch & Reflect
                </CardTitle>
                <p className="text-gray-600">
                  Guided videos to support your mental wellness journey.
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="w-full border-blue-200 focus:border-blue-300">
                      <SelectValue placeholder="Filter by category" />
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
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredVideos.map((video) => (
                <Link key={video.id} href={`/video/${video.id}`}>
                  <Card className="border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer">
                    <div className="relative">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {video.duration}
                      </div>
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                          <Play className="w-6 h-6 text-gray-800 ml-1" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1 text-sm leading-tight">
                        {video.title}
                      </h3>
                      <p className="text-xs text-gray-600 mb-3">
                        {video.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                          {video.category}
                        </span>
                        <Button
                          size="sm"
                          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-1 text-xs font-medium"
                        >
                          Watch
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {filteredVideos.length === 0 && (
              <Card className="border-gray-100 shadow-lg">
                <CardContent className="p-8 text-center">
                  <Play className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No videos found
                  </h3>
                  <p className="text-gray-600">
                    Try selecting a different category to see more content.
                  </p>
                  <Button
                    onClick={() => setSelectedCategory("All")}
                    variant="outline"
                    className="mt-4 rounded-full"
                  >
                    Show All Videos
                  </Button>
                </CardContent>
              </Card>
            )}
          </div> */}
        </div>

        {/* Encouragement Section */}
        <Card className="mt-12 border-green-100 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              You're doing great! 🌟
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Taking time for self-reflection and learning new coping strategies
              shows incredible strength. Remember, every small step counts in
              your wellness journey.
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
