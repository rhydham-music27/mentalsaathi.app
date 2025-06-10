"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Calendar,
  BookOpen,
  Smile,
  ChevronLeft,
  ChevronRight,
  Star,
  Shield,
  Clock,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import useAuthStore from "@/store/auth.store";

const features = [
  {
    icon: Users,
    title: "Anonymous Forums",
    description:
      "Share your thoughts and connect with peers in a safe, judgment-free environment.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Calendar,
    title: "Peer Listener Sessions",
    description:
      "Book one-on-one sessions with trained student listeners who understand your journey.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: BookOpen,
    title: "Self-Help Library",
    description:
      "Access curated resources, articles, and tools for mental wellness and academic success.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Smile,
    title: "Mood Tracker & Journal",
    description:
      "Track your emotional journey and reflect through private journaling features.",
    color: "bg-orange-100 text-orange-600",
  },
];

const testimonials = [
  {
    id: 1,
    text: "MentalSaathi helped me through my toughest semester. The anonymous community made me feel less alone.",
    author: "Anonymous Student",
    course: "Engineering, 3rd Year",
    avatar: "🌸",
    rating: 5,
  },
  // {
  //   id: 2,
  //   text: "The peer listeners are amazing. Finally, someone who understands the pressure we face as students.",
  //   author: "Anonymous Student",
  //   course: "Medical, 2nd Year",
  //   avatar: "🌟",
  //   rating: 5,
  // },
  // {
  //   id: 3,
  //   text: "I love how private and safe this platform feels. It's exactly what Indian students needed.",
  //   author: "Anonymous Student",
  //   course: "Commerce, Final Year",
  //   avatar: "🦋",
  //   rating: 5,
  // },
];

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };
  const token = useAuthStore((state) => state.token);
  const ping = async () => {
    const response = await fetch(
      "https://mentalsaathi-express-backend.onrender.com/api/v1/admin/ping",
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    try {
      return;
    } catch (error) {
      return;
    }
  };
  useEffect(() => {
    ping();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            {/* Hindi Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Andar ki baat,
                </span>
                <br />
                <span className="text-gray-800">ab Saathi ke saath.</span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                A safe digital space to express, connect, and heal together.
              </p>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>100% Anonymous</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-500" />
                <span>Peer Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-500" />
                <span>24/7 Available</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/community">
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Join Community
                </Button>
              </Link>
              <Link href="/book-listener">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 rounded-full px-8 py-3 text-lg font-semibold transform hover:scale-105 transition-all duration-200"
                >
                  Book a Session
                </Button>
              </Link>
            </div>

            {/* Stats */}
            {/* <div className="grid grid-cols-3 gap-8 max-w-md mx-auto pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">500+</div>
                <div className="text-sm text-gray-600">Students Helped</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">50+</div>
                <div className="text-sm text-gray-600">Peer Listeners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Everything you need for your mental wellness
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive support designed specifically for Indian university
              students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm"
                >
                  <CardContent className="p-6 text-center space-y-4">
                    <div
                      className={`w-16 h-16 rounded-full ${feature.color} flex items-center justify-center mx-auto`}
                    >
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              What students are saying
            </h2>
            <p className="text-xl text-gray-600">
              Real experiences from our community members
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 sm:p-12">
                <div className="text-center space-y-6">
                  {/* Stars */}
                  <div className="flex justify-center gap-1">
                    {[...Array(testimonials[currentTestimonial].rating)].map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                        />
                      )
                    )}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-xl sm:text-2xl text-gray-700 leading-relaxed italic">
                    "{testimonials[currentTestimonial].text}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full flex items-center justify-center text-xl">
                      {testimonials[currentTestimonial].avatar}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">
                        {testimonials[currentTestimonial].author}
                      </div>
                      <div className="text-gray-600">
                        {testimonials[currentTestimonial].course}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial
                        ? "bg-purple-600"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                "Mental health is not a destination, but a process."
              </h2>
              <p className="text-xl text-purple-100 max-w-2xl mx-auto">
                Take the first step towards better mental wellness. Join
                thousands of students who have found their support system.
              </p>
            </div>

            <Link href="/login">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-50 rounded-full px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Start Your Journey
              </Button>
            </Link>

            <div className="flex flex-wrap justify-center gap-6 text-purple-100 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Completely Free</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Student Community</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>Anonymous Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
