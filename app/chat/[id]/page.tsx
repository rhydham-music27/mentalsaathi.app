"use client";
import ChatUI from "@/components/ui/ChatUI"; // ✅ replace TalkNotification
import { streamApi } from "@/utils/api.utils";
import React, { useEffect, useState } from "react";

type User = {
  _id: string;
  name: string;
  email: string;
  profile_picture: string;
};

export default function Page() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [therapist, setTherapist] = useState<User | null>(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const userRaw = localStorage.getItem("currentUser");
    const therapistRaw = localStorage.getItem("therapist");

    if (userRaw && therapistRaw) {
      try {
        setCurrentUser(JSON.parse(userRaw));
        setTherapist(JSON.parse(therapistRaw));
      } catch (error) {
        console.error("Failed to parse localStorage items", error);
      }
    }
  }, []);

  useEffect(() => {
    if (!currentUser?._id) return;

    streamApi
      .post("/token", {
        userId: currentUser._id,
        otherUserId: therapist?._id,
      })
      .then((response) => {
        setToken(response.data.token);
        console.log(response.data.token);
      })
      .catch((error) => {
        console.log(error.response?.data || error.message);
      });
  }, [currentUser]);

  if (!currentUser || !therapist || !token) return <p>Loading chat...</p>;

  return (
    <ChatUI
      userId={currentUser._id}
      token={token}
      otherUserId={therapist._id}
      therapistName={therapist.name}
      userName={currentUser.name}
      otherUserImage={therapist.profile_picture}
    />
  );
}
