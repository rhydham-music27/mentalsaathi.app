"use client";
import { Navbar } from "@/components/layout/navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useAuthStore from "@/store/auth.store";
import { authApi, emailApi, therapistApi } from "@/utils/api.utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Component() {
  const router = useRouter();
  type Therapist = {
    _id: string;
    profile_picture: string;
    email: string;
    name: string;
    intials: string;
    expertise: string;
    experience: string;
    bio: string;
  };
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const token = useAuthStore((state) => {
    return state.token;
  });
  useEffect(() => {
    const getTherapists = () => {
      therapistApi
        .get("/available", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setTherapists(response.data.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    };
    getTherapists();
  }, []);
  type User = {
    _id: string;
    name: string;
    email: string;
    profile_picture: string;
  };
  const [me, setMe] = useState<User>({
    _id: "",
    email: "",
    name: "",
    profile_picture: "",
  });
  const [getTherapist, setTherapist] = useState<User>({
    _id: "",
    email: "",
    name: "",
    profile_picture: "",
  });
  useEffect(() => {
    const getMyData = () => {
      authApi
        .post(
          "/authenticate",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          localStorage.setItem(
            "currentUser",
            JSON.stringify({
              _id: response.data._id,
              email: response.data.email,
              name: response.data.name,
              profile_picture: response.data.profile_picture,
            })
          );
          setMe((previous) => ({
            ...previous,
            _id: response.data._id,
            email: response.data.email,
            name: response.data.name,
            profile_picture: response.data.profile_picture,
          }));
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    };
    getMyData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Available Therapists
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Connect with experienced mental health professionals who are here
              to support your journey toward wellness and healing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {therapists.map((therapist) => (
              <Card
                key={therapist._id}
                className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden"
              >
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <Avatar className="w-24 h-24 border-4 border-blue-100">
                      <AvatarImage
                        src={therapist.profile_picture || "/placeholder.svg"}
                        alt={therapist.name}
                      />
                      <AvatarFallback className="bg-blue-100 text-blue-700 text-lg font-semibold">
                        {therapist.intials}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800 mb-2">
                    {therapist.name}
                  </CardTitle>
                  <div className="space-y-2">
                    <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {therapist.expertise}
                    </div>

                    <CardDescription className="text-blue-600 font-medium">
                      {therapist.experience} years experience
                    </CardDescription>
                  </div>
                  <div className="space-y-2">
                    <div className="inline-block bg-red-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      10 Rs/minute
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="px-6 pb-6">
                  <p className="text-gray-600 text-sm leading-relaxed text-center">
                    {therapist.bio}
                  </p>
                </CardContent>

                <CardFooter className="px-6 pb-6">
                  <Button
                    onClick={(event) => {
                      event.preventDefault();
                      therapistApi
                        .get(`/${therapist._id}`)
                        .then((response) => {
                          localStorage.setItem(
                            "therapist",
                            JSON.stringify({
                              _id: response.data._id,
                              email: response.data.email,
                              name: response.data.name,
                              profile_picture: response.data.profile_picture,
                            })
                          );
                          setTherapist((previous) => ({
                            ...previous,
                            _id: response.data._id,
                            email: response.data.email,
                            name: response.data.name,
                            profile_picture: response.data.profile_picture,
                          }));
                          router.push(
                            `/chat/${me._id}u?t=${response.data._id}`
                          );
                          // console.log(`/chat/${me._id}u?t=${getTherapist._id}`)
                          // console.log(getTherapist._id)
                        })
                        .catch((error) => {
                          console.log(error.response.data);
                        });
                      emailApi
                        .post("/message", {
                          to: therapist.email,
                          subject: "🧠 New Chat Request on MentalSaathi",
                          text: `Hi ${therapist.name},

${me.name} has initiated a chat with you on MentalSaathi.

Please click the link below to join the conversation:
https://mentalsaathi.in/therapist/${me._id}?t=${therapist._id}

Warm regards,  
Team MentalSaathi  
https://mentalsaathi.in

---

You're receiving this email because you're registered as a therapist on MentalSaathi.
`,
                        })
                        .then((response) => {
                          console.log(response.data);
                        });
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl transition-colors duration-200"
                    size="lg"
                  >
                    Chat Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Can't find the right fit? We have more therapists available.
            </p>
            <Button
              variant="outline"
              className="border-blue-300 text-blue-700 hover:bg-blue-50 rounded-xl px-8"
            >
              View All Therapists
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
