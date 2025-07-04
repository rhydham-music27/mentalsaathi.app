import { Socket, io } from "socket.io-client";
import React, { useEffect, useRef, useState } from "react";
import { playNotificationSound, unlockAudio } from "@/utils/audio.utils";
import TenMinuteTimer from "./TenMinuteTimer";

type TherapistData = {
  name: string;
  _id: string;
  profile_picture: string;
};
type UserData = {
  name: string;
  _id: string;
  profile_picture: string;
};
type TherapistChatUIProps = {
  therapistData: TherapistData;
  userData: UserData;
};

function formatTime(timestamp: string | Date) {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ChatUI({
  therapistData,
  userData,
}: TherapistChatUIProps) {
  type MessageData = {
    message?: string;
    sentbyyou?: boolean;
    timestamp?: Date;
  };

  const [messageArray, setMessageArray] = useState<MessageData[]>([]);
  const [messageData, setMessageData] = useState<MessageData>({ message: "" });
  const [roomId, setRoomId] = useState("");
  const [typing, setTyping] = useState(false);
  const [isTherapistTyping, setIsTherapistTyping] = useState(false);
  const socket = useRef<Socket | null>(null);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleUnlock = () => unlockAudio();
    document.addEventListener("click", handleUnlock, { once: true });

    return () => {
      document.removeEventListener("click", handleUnlock);
    };
  }, []);
  useEffect(() => {
    socket.current = io(process.env.NEXT_PUBLIC_SOCKET_URL);
    if (!userData?._id || !therapistData?._id) return;

    const id = `${userData._id}_${therapistData._id}`;
    setRoomId(id);
    socket.current.emit("join", { room: id });

    socket.current.on("message", (item: any) => {
      setMessageArray((prev) => [...prev, item]);
      playNotificationSound();
    });

    socket.current.on("typing", () => setIsTherapistTyping(true));
    socket.current.on("stopTyping", () => setIsTherapistTyping(false));

    return () => {
      socket.current?.disconnect();
    };
  }, [userData._id, therapistData._id]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageArray]);

  const handleTyping = (value: string) => {
    setMessageData({ message: value, sentbyyou: true, timestamp: new Date() });

    if (!typing) {
      setTyping(true);
      socket.current?.emit("typing", { room: roomId });
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.current?.emit("stopTyping", { room: roomId });
      setTyping(false);
    }, 3000);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!messageData.message?.trim()) return;
    setMessageArray((prev) => [...prev, messageData]);
    socket.current?.emit("message", {
      room: roomId,
      message: messageData.message,
    });
    socket.current?.emit("stopTyping", { room: roomId });
    setMessageData({ message: "" });
    setTyping(false);
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gray-100 text-gray-800">
      <main className="flex flex-col flex-1 min-h-0">
        <div className="p-4 border-b bg-white flex items-center justify-between">
          <div className="flex items-center space-x-3 justify-between w-full">
            <div className="flex space-x-3 items-center">
              <img
                src={therapistData.profile_picture || "/placeholder.png"}
                className="w-10 h-10 rounded-full"
                alt="Therapist"
              />
              <div>
                <h3 className="font-semibold text-lg">{therapistData.name}</h3>
                {isTherapistTyping && (
                  <p className="text-xs text-blue-500 animate-pulse">
                    Typing...
                  </p>
                )}
              </div>
            </div>
            <div>
              <TenMinuteTimer
                onTimeUp={() => {
                  alert("your session is over");
                }}
              />
            </div>
          </div>
        </div>

        <div
          id="chat-scroll"
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
        >
          {messageArray.map((item, index) => (
            <div
              key={`${item.message}_${messageArray.length}_${index}`}
              className={`flex items-end ${
                item.sentbyyou ? "justify-end" : "justify-start"
              }`}
            >
              {!item.sentbyyou && (
                <img
                  src={therapistData.profile_picture || "/placeholder.png"}
                  className="w-8 h-8 rounded-full mr-2"
                  alt="User Avatar"
                />
              )}
              <div
                className={`p-3 rounded-xl max-w-xs text-sm shadow-md ${
                  item.sentbyyou
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                <p>{item.message}</p>
                <div className="text-xs text-right text-gray-400 mt-1">
                  {formatTime(item.timestamp ?? new Date())}
                </div>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="p-4 bg-white border-t">
          <form onSubmit={handleSubmit} className="flex items-center space-x-3">
            <input
              value={messageData.message || ""}
              onChange={(e) => handleTyping(e.target.value)}
              type="text"
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 text-sm"
            >
              Send
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
