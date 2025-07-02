import { profile } from "console";
import { Socket, io } from "socket.io-client";
import React, { useEffect, useRef, useState } from "react";
import { Divide } from "lucide-react";
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

export default function TherapistChatUI({
  therapistData,
  userData,
}: TherapistChatUIProps) {
  type Messagedata = {
    message?: string;
    sentbyyou?: boolean;
    timestamp?: Date;
  };
  const [messagearray, setMessagearray] = useState<Messagedata[]>([]);
  const [messagedata, setMessagedata] = useState<Messagedata>({ message: "" });
  const [room_id, setRoom_id] = useState("");
  const socket = useRef<Socket | null>(null);
  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_SOCKET_URL);
    socket.current = io(process.env.NEXT_PUBLIC_SOCKET_URL);
    console.log(socket.current.id);
    if (!userData?._id || !therapistData?._id) return;
    const room_id = `${userData._id}_${therapistData._id}`;
    setRoom_id(room_id);
    socket.current.emit("join", { room: room_id });
    socket.current.on("message", (item: any) => {
      setMessagearray((previous) => [...previous, item]);
    });
    return () => {
      socket.current?.disconnect();
    };
  }, [userData._id, therapistData._id, messagearray]);

  // <aside className="w-full md:w-1/4 bg-white border-r border-gray-200 h-1/3 md:h-full flex-shrink-0">
  //   <div className="p-4 border-b">
  //     <h2 className="text-xl font-bold">SaathiChat</h2>
  //     <p className="text-sm text-gray-500">Conversations</p>
  //   </div>
  //   <div className="overflow-y-auto h-full">
  //     <ul className="divide-y">
  //       <li className="p-4 hover:bg-gray-50 cursor-pointer">
  //         <div className="flex items-center space-x-3">
  //           <img src="/avatar1.png" className="w-10 h-10 rounded-full" />
  //           <div className="flex-1">
  //             <p className="font-medium">Therapist A</p>
  //             <p className="text-xs text-gray-500 truncate">
  //               How are you feeling today?
  //             </p>
  //           </div>
  //         </div>
  //       </li>
  //       <li className="p-4 hover:bg-gray-50 cursor-pointer">
  //         <div className="flex items-center space-x-3">
  //           <img src="/avatar1.png" className="w-10 h-10 rounded-full" />
  //           <div className="flex-1">
  //             <p className="font-medium">Therapist A</p>
  //             <p className="text-xs text-gray-500 truncate">
  //               How are you feeling today?
  //             </p>
  //           </div>
  //         </div>
  //       </li>
  //       <li className="p-4 hover:bg-gray-50 cursor-pointer">
  //         <div className="flex items-center space-x-3">
  //           <img src="/avatar1.png" className="w-10 h-10 rounded-full" />
  //           <div className="flex-1">
  //             <p className="font-medium">Therapist A</p>
  //             <p className="text-xs text-gray-500 truncate">
  //               How are you feeling today?
  //             </p>
  //           </div>
  //         </div>
  //       </li>
  //       <li className="p-4 hover:bg-gray-50 cursor-pointer">
  //         <div className="flex items-center space-x-3">
  //           <img src="/avatar1.png" className="w-10 h-10 rounded-full" />
  //           <div className="flex-1">
  //             <p className="font-medium">Therapist A</p>
  //             <p className="text-xs text-gray-500 truncate">
  //               How are you feeling today?
  //             </p>
  //           </div>
  //         </div>
  //       </li>
  //       <li className="p-4 hover:bg-gray-50 cursor-pointer">
  //         <div className="flex items-center space-x-3">
  //           <img src="/avatar1.png" className="w-10 h-10 rounded-full" />
  //           <div className="flex-1">
  //             <p className="font-medium">Therapist A</p>
  //             <p className="text-xs text-gray-500 truncate">
  //               How are you feeling today?
  //             </p>
  //           </div>
  //         </div>
  //       </li>
  //       {/* More contacts... */}
  //     </ul>
  //   </div>
  // </aside>
  return (
    <div className="h-screen flex flex-col md:flex-row bg-gray-100 text-gray-800">
      {/* Sidebar */}
      {/* You can place your sidebar here */}

      {/* Chat Window */}
      <main className="flex flex-col flex-1 min-h-0">
        {/* Header */}
        <div className="p-4 border-b bg-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={userData.profile_picture || "/placeholder.png"}
              className="w-10 h-10 rounded-full"
              alt="User"
            />
            <div>
              <h3 className="font-semibold">{userData.name}</h3>
              {/* <p className="text-xs text-green-500">Online</p> */}
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messagearray.map((item, index) => (
            <div key={`${item.message}_${messagearray.length}_${index}`}>
              <div
                className={`flex ${
                  item.sentbyyou ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg shadow max-w-xs text-sm ${
                    item.sentbyyou
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-900"
                  }`}
                >
                  <p>{item.message}</p>
                  <span className="block text-xs text-gray-400 mt-1 text-right">
                    {formatTime(item.timestamp ?? new Date())}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="p-4 bg-white border-t">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setMessagearray((previous) => [...previous, messagedata]);
              socket.current?.emit("message", {
                room: room_id,
                message: messagedata.message,
              });
              setMessagedata({ message: "" });
            }}
            className="flex items-center space-x-3"
          >
            <input
              value={messagedata.message}
              onChange={(event) => {
                setMessagedata({
                  message: event.target.value,
                  sentbyyou: true,
                  timestamp: new Date(),
                });
              }}
              type="text"
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm"
            >
              Send
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
