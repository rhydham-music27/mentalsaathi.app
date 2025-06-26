"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Heart, Target, Eye, Award } from "lucide-react";
import { useEffect } from "react";
import useAuthStore from "@/store/auth.store";

const founders = [
  {
    name: "Rhydham",
    role: "Founder & CEO",
    bio: "I'm a Computer Science student at Chandigarh University, deeply passionate about using technology to transform the way we approach mental health care. I founded MentalSaathi with a vision to build a pioneering digital platform that breaks down stigma and makes mental wellness support accessible, relatable, and empowering—especially for students like me.Driven by empathy and innovation, I'm committed to creating a safe space where young minds can find guidance, community, and the support they need on their mental wellness journey."

,
    avatar: "🧠",
    university: "Mental Saathi",
  },
];

const milestones = [
  {
    year: "2023",
    title: "The Beginning",
    description:
      "Three students came together with a shared vision of making mental health support accessible.",
  },
  {
    year: "2024",
    title: "Platform Launch",
    description:
      "MentalSaathi officially launched with our first community of 100 students.",
  },
  {
    year: "2024",
    title: "Growing Impact",
    description:
      "Reached 500+ students across 50+ universities with 24/7 peer support.",
  },
  {
    year: "2024",
    title: "Recognition",
    description:
      "Awarded 'Best Student Initiative' by the National Mental Health Foundation.",
  },
];

export default function AboutPage() {
  const token = useAuthStore((state) => {
    return state.token;
  });
  useEffect(() => {
    const ping = async () => {
      await fetch(
        "https://mentalsaathi-express-backend.onrender.com/api/v1/admin/ping",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    };

    ping();
    const interval = setInterval(ping, 60000); // every 1 min

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
              Our{" "}
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Story
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto">
              Born from the belief that every student deserves accessible mental
              health support.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* <Card className="border-pink-100 shadow-lg bg-pink-50/50">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800 flex items-center gap-2">
                <Target className="w-6 h-6 text-pink-500" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed text-lg">
                MentalSaathi's mission is to create a compassionate digital
                space where individuals can prioritize their mental well-being
                without fear or stigma. We aim to empower students and young
                adults with accessible tools like journaling, therapy videos,
                and peer-driven communities. By blending technology with
                empathy, MentalSaathi provides a safe, supportive, and
                judgment-free environment where mental health conversations are
                normalized, healing is encouraged, and no one feels alone in
                their journey.
              </p>
            </CardContent>
          </Card> */}

          {/* <Card className="border-purple-100 shadow-lg bg-purple-50/50">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800 flex items-center gap-2">
                <Eye className="w-6 h-6 text-purple-500" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed text-lg">
                MentalSaathi's vision is to become the leading student-led
                mental wellness platform in India, revolutionizing how young
                minds access support, share their struggles, and grow
                emotionally. We envision a future where mental health is treated
                with the same urgency and care as physical health—openly
                discussed, universally supported, and deeply integrated into
                everyday life. Through innovation, empathy, and community, we
                strive to make mental wellness a norm, not a privilege.
              </p>
            </CardContent>
          </Card> */}
        </div>

        {/* Story Section
        <Card className="border-blue-100 shadow-lg mb-16 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800 flex items-center gap-2">
              <Heart className="w-6 h-6 text-blue-500" />
              How MentalSaathi Began
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="leading-relaxed mb-4">
                MentalSaathi began as a solo journey rooted in empathy. As a
                student, I noticed the quiet struggles around me—friends
                overwhelmed by academic pressure, anxiety, or loneliness, yet
                too afraid to speak up. The lack of accessible, non-judgmental
                support inspired me to take action. Without a team or funding, I
                decided to build something meaningful on my own—a safe digital
                space where mental health isn't a taboo, but a conversation.
              </p>
              <p className="leading-relaxed mb-4">
                What started as a small idea soon became a mission: to make
                mental wellness approachable and stigma-free. I began developing
                features like journaling, therapy videos, and a community
                space—tools I wish more people had access to when they needed
                help the most. Each element of MentalSaathi is designed to be
                personal, easy to use, and focused on genuine emotional support.
              </p>
              <p className="leading-relaxed">
                MentalSaathi isn't just another mental health app—it’s a
                companion. Built by a student, for students and young adults, it
                aims to grow into a platform where people feel heard,
                understood, and empowered to care for their mental well-being.
                This is just the beginning, and I’m excited to share this
                journey with you.
              </p>
            </div>
          </CardContent>
        </Card> */}

        {/* Founders Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Meet Our Founders
          </h2>
          <div
            className={`grid gap-8 ${
              founders.length === 1
                ? "grid-cols-1 place-items-center"
                : "grid-cols-1 md:grid-cols-1"
            }`}
          >
            {founders.map((founder, index) => (
              <Card
                key={index}
                className="border-gray-100 max-w-[90vw] md:max-w-[40vw]  shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <CardContent className="p-6 text-left">
                  <img
                    className="w-40 h-40 bg-gradient-to-r from-purple-200 to-pink-200 rounded-xl border-2 border-black border-spacing-2 text-3xl mb-4 text-right"
                    src="./1.png"
                    alt=""
                  />

                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {founder.name}
                  </h3>
                  <p className="text-purple-600 font-medium mb-2">
                    {founder.role}
                  </p>
                  <p className="text-sm text-gray-500 mb-3">
                    {founder.university}
                  </p>
                  <p className="text-gray-600 leading-relaxed">{founder.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Milestones */}
        {/* <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Journey</h2>
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <Card key={index} className="border-gray-100 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      {milestone.year}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div> */}

        {/* Impact Stats */}
        {/* <Card className="border-green-100 shadow-lg bg-green-50/50">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800 text-center flex items-center justify-center gap-2">
              <Award className="w-6 h-6 text-green-500" />
              Our Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-green-600 mb-1">
                  500+
                </div>
                <div className="text-gray-600">Students Supported</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-1">50+</div>
                <div className="text-gray-600">Universities</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  1000+
                </div>
                <div className="text-gray-600">Peer Sessions</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-600 mb-1">
                  24/7
                </div>
                <div className="text-gray-600">Support Available</div>
              </div>
            </div>
          </CardContent>
        </Card> */}
      </div>

      <Footer />
    </div>
  );
}
