"use client";
import TherapistChatUI from "@/components/ui/TherapistChatUI";
import useTherapistAuthStore from "@/store/therapist.store";
import { streamApi, therapistApi, userApi } from "@/utils/api.utils";
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
    profile_picture: string;
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
    profile_picture: "",
    name: "",
  });
  const [token1, setToken] = useState("");
  const therapistId = query.get("t");
  useEffect(() => {
    therapistApi
      .post(
        "/verify",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const therapist = response.data.data;

        if (therapist._id !== therapistId) {
          toast.error("Access denied. Therapist mismatch.");
          return router.push("/therapist/login");
        }

        // ✅ Step 1: Set therapist
        setAuthorization(true);
        setTherapistData(therapist);

        // ✅ Step 2: Get stream token
        streamApi
          .post(
            "/therapist/token",
            { userId: therapist._id },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            const streamToken = res.data.token;
            setToken(streamToken);
            console.log("✅ Stream Token:", streamToken);

            // ✅ Step 3: Get user data only after token is ready
            userApi
              .get(`/verify/${userId.id}`)
              .then((res2) => {
                setUserData(res2.data.data);

                // ✅ Final log once everything is ready
                console.log("🔁 All ready:", {
                  therapistId: therapist._id,
                  userId: res2.data.data._id,
                  token: streamToken,
                });
              })
              .catch((err) => {
                console.error(
                  "User fetch error:",
                  err.response?.data || err.message
                );
              });
          })
          .catch((err) => {
            console.error("Token error:", err.response?.data || err.message);
          });
      })
      .catch((error) => {
        console.log(
          "Therapist verify error:",
          error.response?.data || error.message
        );
        toast.error("Please login via therapist page to proceed further");
        router.push("/therapist/login");
      });
  }, []);

  return (
    <div>
      <TherapistChatUI
        therapistId={therapistData._id}
        token={token1}
        userId={userData._id}
        userImage={userData.profile_picture}
        userName={userData.name}
      />
    </div>
  );
}
