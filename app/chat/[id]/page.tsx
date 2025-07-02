"use client";
import ChatUI from "@/components/ui/ChatUI";
import TherapistChatUI from "@/components/ui/TherapistChatUI";
import useTherapistAuthStore from "@/store/therapist.store";
import { therapistApi, userApi } from "@/utils/api.utils";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function page() {
  const router = useRouter();
  // const [token, setToken] = useState<string | null>("");
  const token = useTherapistAuthStore((state) => {
    return state.token;
  });
  type User = {
    _id: string;
    profile_picture: string | null;
    name: string;
  };
  const [authorization, setAuthorization] = useState(false);
  const userId = useParams();
  const query = useSearchParams();
  const [therapistData, setTherapistData] = useState<User>({
    _id: "",
    profile_picture: "",
    name: "",
  });
  const [userData, setUserData] = useState<User>({
    _id: "",
    profile_picture: null,
    name: "",
  });
  const [token1, setToken] = useState("");
  const therapistId = query.get("t");

  useEffect(() => {
    userApi
      .get(`/verify/${userId.id}`)
      .then((response) => {
        // console.log(response.data.data);
        setUserData({
          _id: response.data.data._id,
          name: response.data.data.name,
          profile_picture: response.data.data.profile_picture,
        });
      })
      .catch((error) => {
        console.log(error.response.data);
        return;
      });
    therapistApi
      .get(`/${therapistId} `)
      .then((response) => {
        // console.log(response.data);
        setTherapistData({
          _id: response.data._id,
          name: response.data.name,
          profile_picture: response.data.profile_picture,
        });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  return (
    <div>
      
      <ChatUI
        userData={{
          ...userData,
          profile_picture: userData.profile_picture ?? "/default.png", // fallback
        }}
        therapistData={{
          ...therapistData,
          profile_picture: therapistData.profile_picture ?? "/default.png", // fallback
        }}
      />
    </div>
  );
}
