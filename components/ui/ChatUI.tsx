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

const ChatUI = ({
  userId,
  token,
  otherUserId,
  therapistName,
  otherUserImage,
}: {
  userId: string;
  token: string;
  otherUserId: string;
  therapistName: string;
  otherUserImage: string;
}) => {
  const [client, setClient] = useState<StreamChat | null>(null);
  const [channel, setChannel] = useState<StreamChannel | null>(null);
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
  useEffect(() => {
    if (!userId || !token || !otherUserId) return;

    const setup = async () => {
      const existingClient = StreamChat.getInstance(
        process.env.NEXT_PUBLIC_STREAM_API_KEY!
      );

      // ✅ Avoid reconnecting same user
      if (existingClient?.userID === userId) {
        console.log("✅ Already connected:", userId);
        setClient(existingClient);

        // Reuse existing channel
        const channelId = [userId, otherUserId].sort().join("__");
        const chatChannel = existingClient.channel("messaging", channelId);
        await chatChannel.watch();
        setChannel(chatChannel);
        return;
      }

      try {
        await existingClient.connectUser(
          {
            id: userId,
            name: userId,
          },
          token
        );

        const channelId = [userId, otherUserId].sort().join("__");
        const chatChannel = existingClient.channel("messaging", channelId, {
          members: [userId, otherUserId],
        });

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
  }, [userId, token, otherUserId]);

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted || !client || !channel) return <p>Loading chat...</p>;

  return (
    <div className="flex flex-col h-[90vh] max-w-2xl mx-auto rounded-xl border shadow-md overflow-hidden bg-white">
      {" "}
      <Chat client={client} theme="messaging light">
        {" "}
        <Channel channel={channel}>
          {" "}
          <Window>
            {/* Header */}{" "}
            <div className="flex items-center gap-3 p-3 border-b shadow-sm bg-white">
              {" "}
              <img
                src={otherUserImage}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />{" "}
              <div className="text-lg font-semibold text-gray-800">
                {therapistName ?? "Therapist"}{" "}
              </div>{" "}
            </div>{" "}
            {/* Make MessageList take all remaining height and scroll */}{" "}
            <div className="flex-1 overflow-y-auto">
              <MessageList  />{" "}
            </div>
            {/* Pin MessageInput to bottom */}{" "}
            <div className="border-t p-3 bg-white">
              <MessageInput />{" "}
            </div>{" "}
          </Window>{" "}
        </Channel>{" "}
      </Chat>
    </div>
  );
};

export default ChatUI;
