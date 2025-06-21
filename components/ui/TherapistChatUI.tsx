"use client";

import { useEffect, useState } from "react";
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Window,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import { StreamChat } from "stream-chat";
import type { Channel as StreamChannel } from "stream-chat";

const TherapistChatUI = ({
  therapistId,
  token,
  userId,
  userName,
  userImage,
}: {
  therapistId: string;
  token: string;
  userId: string;
  userName: string;
  userImage: string;
}) => {
  const [client, setClient] = useState<StreamChat | null>(null);
  const [channel, setChannel] = useState<StreamChannel | null>(null);

  // Mark as read
  useEffect(() => {
    if (!channel) return;

    const mark = async () => {
      try {
        await channel.markRead();
      } catch (err) {
        console.log("📭 Manual markRead failed:", err.message);
      }
    };

    mark();
  }, [channel]);

  // Connect therapist
  useEffect(() => {
    if (!therapistId || !token || !userId) return;

    const setup = async () => {
      const existingClient = StreamChat.getInstance(
        process.env.NEXT_PUBLIC_STREAM_API_KEY!
      );

      const channelId = [userId, therapistId].sort().join("__");

      if (existingClient?.userID === therapistId) {
        console.log("✅ Already connected:", therapistId);
        setClient(existingClient);

        const chatChannel = existingClient.channel("messaging", channelId);

        try {
          await chatChannel.addMembers([therapistId, userId]);
        } catch (err) {
          console.warn(
            "⚠️ addMembers warning (probably already a member):",
            err.message
          );
        }

        await chatChannel.watch();
        setChannel(chatChannel);
        return;
      }

      try {
        await existingClient.connectUser(
          {
            id: therapistId,
            name: "Therapist",
          },
          token
        );

        const chatChannel = existingClient.channel("messaging", channelId); // 🚫 No member update

        try {
          await chatChannel.watch(); // ✅ Only reads, no permission issues
          setClient(existingClient);
          setChannel(chatChannel);
        } catch (err) {
          console.error("❌ Error watching channel:", err.message);
        }

        await chatChannel.watch();

        setClient(existingClient);
        setChannel(chatChannel);
      } catch (err) {
        console.error("❌ Error connecting to Stream Chat:", err);
      }
    };

    setup();

    return () => {
      if (client) {
        client.disconnectUser();
        setClient(null);
        setChannel(null);
      }
    };
  }, [therapistId, token, userId]);

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted || !client || !channel) return <p>Loading chat...</p>;

  return (
    <div className="flex flex-col h-[90vh] max-w-2xl mx-auto rounded-xl border shadow-md overflow-hidden bg-white">
      <Chat client={client} theme="messaging light">
        <Channel channel={channel}>
          <Window>
            {/* Header */}
            <div className="flex items-center gap-3 p-3 border-b shadow-sm bg-white">
              <img
                src={userImage}
                alt="User Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="text-lg font-semibold text-gray-800">
                {userName ?? "User"}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto">
              <MessageList />
            </div>

            {/* Input */}
            <div className="border-t p-3 bg-white">
              <MessageInput />
            </div>
          </Window>
        </Channel>
      </Chat>
    </div>
  );
};

export default TherapistChatUI;
