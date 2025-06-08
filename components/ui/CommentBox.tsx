"use client";
import React, { useState } from "react";

export default function CommentBox(props: any) {
  const [comment, setComment] = useState("");
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.onSubmit(comment);
        setComment("");
      }}
    >
      <div className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Leave a Comment
        </h2>
        {/* Textarea */}
        <textarea
          onChange={(event) => {
            setComment(event.target.value);
          }}
          placeholder="Write your comment here..."
          className="w-full h-32 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          defaultValue={""}
        />
        {/* Post Button */}
        <div className="flex justify-end mt-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Post Comment
          </button>
        </div>
        {/* Comments List */}
        <div className="mt-6 space-y-4">
          {/* Example Comment */}
          {props.data.map((item: any) => {
            return (
              <div key={item._id} className="bg-gray-50 p-4 rounded-xl shadow-sm">
                <p className="text-sm text-gray-600 mb-1 font-semibold">
                  {item.userName}
                </p>
                <p className="text-gray-800">{item.comment}</p>
              </div>
            );
          })}
          {/* Add more comments below */}
        </div>
      </div>
    </form>
  );
}
