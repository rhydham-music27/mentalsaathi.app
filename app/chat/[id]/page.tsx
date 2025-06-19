"use client";
import TalkNotification from "@/components/ui/notifications";
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

  if (!currentUser || !therapist) return <p>Loading chat...</p>;

  return (
    <TalkNotification
      currentUser={currentUser}
      targetTherapist={therapist}
    />
  );
}
