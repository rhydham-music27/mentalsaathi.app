"use client";
import CommentBox from "@/components/ui/CommentBox";
import { mediaApi } from "@/utils/api.utils";
// import CommentContainer from "@/components/ui/CommentContainer";
import React, { useState } from "react";

export default function page() {
  const [file, setFile] = useState<File | null>(null);
  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const profileData = new FormData();
          if (!file) return;
          profileData.append("profile", file);
          mediaApi
            .post("/profile", profileData)
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        <input
          type="file"
          onChange={(event) => {
            event.preventDefault();
            // console.log(event.target.files);
            if (event.target.files && event.target.files.length > 0) {
              setFile(event.target.files[0]);
            }
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
