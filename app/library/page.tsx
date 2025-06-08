"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { BookOpen, Search, Clock, Star, Play, FileText } from "lucide-react"

const topics = ["All", "Stress", "Productivity", "Relationships", "Sleep", "Motivation", "Anxiety"]

const articles = [
  {
    id: 1,
    title: "5-Minute Breathing Exercises for Instant Calm",
    category: "Stress",
    type: "article",
    readTime: "3 min read",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300",
    description: "Simple breathing techniques to help you find peace in stressful moments.",
    featured: true,
  },
  {
    id: 2,
    title: "The Pomodoro Technique: Study Smarter, Not Harder",
    category: "Productivity",
    type: "video",
    readTime: "8 min watch",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300",
    description: "Learn how to break your study sessions into focused, productive chunks.",
    featured: true,
  },
  {
    id: 3,
    title: "Building Healthy Relationships in College",
    category: "Relationships",
    type: "article",
    readTime: "6 min read",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300",
    description: "Navigate friendships, romantic relationships, and social connections.",
    featured: false,
  },
  {
    id: 4,
    title: "Sleep Hygiene for Better Academic Performance",
    category: "Sleep",
    type: "article",
    readTime: "4 min read",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300",
    description: "Optimize your sleep schedule for better focus and memory retention.",
    featured: false,
  },
  {
    id: 5,
    title: "Overcoming Procrastination: A Student's Guide",
    category: "Motivation",
    type: "video",
    readTime: "12 min watch",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300",
    description: "Practical strategies to beat procrastination and stay motivated.",
    featured: true,
  },
  {
    id: 6,
    title: "Managing Social Anxiety in University Settings",
    category: "Anxiety",
    type: "article",
    readTime: "7 min read",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300",
    description: "Tips and techniques for feeling more confident in social situations.",
    featured: false,
  },
]

export default function LibraryPage() {
  const [selectedTopic, setSelectedTopic] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredArticles = articles.filter((article) => {
    const matchesTopic = selectedTopic === "All" || article.category === selectedTopic
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTopic && matchesSearch
  })

  const featuredArticles = filteredArticles.filter((article) => article.featured)
  const regularArticles = filteredArticles.filter((article) => !article.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
              Knowledge is{" "}
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                self-care.
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto">
              Curated articles, videos, and tools to support your journey.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search articles and resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-green-200 focus:border-green-300"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <Button
                key={topic}
                variant={selectedTopic === topic ? "default" : "outline"}
                onClick={() => setSelectedTopic(topic)}
                className={`rounded-full ${
                  selectedTopic === topic
                    ? "bg-green-600 hover:bg-green-700"
                    : "border-green-200 text-green-700 hover:bg-green-50"
                }`}
              >
                {topic}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Resources */}
      {featuredArticles.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500" />
            Featured Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <Card
                key={article.id}
                className="border-yellow-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-yellow-50 to-orange-50"
              >
                <div className="relative">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-3 left-3 bg-yellow-500 text-white">Featured</Badge>
                  <div className="absolute top-3 right-3">
                    {article.type === "video" ? (
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                        <Play className="w-4 h-4 text-white" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <FileText className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        {article.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{article.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 leading-tight">{article.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{article.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{article.readTime}</span>
                      </div>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white rounded-full">
                        {article.type === "video" ? "Watch" : "Read"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Resources */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">All Resources</h2>
          <span className="text-gray-600">{filteredArticles.length} resources found</span>
        </div>

        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularArticles.map((article) => (
              <Card
                key={article.id}
                className="border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-3 right-3">
                    {article.type === "video" ? (
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                        <Play className="w-4 h-4 text-white" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <FileText className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-purple-50 text-purple-700">
                        {article.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{article.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 leading-tight">{article.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{article.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{article.readTime}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-purple-200 text-purple-700 hover:bg-purple-50 rounded-full"
                      >
                        {article.type === "video" ? "Watch" : "Read"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-gray-100 shadow-lg">
            <CardContent className="p-12 text-center">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No resources found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedTopic("All")
                }}
                variant="outline"
                className="mt-4 rounded-full"
              >
                Clear filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  )
}
