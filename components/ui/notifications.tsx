// components/TalkNotification.js
import Talk from "talkjs";
import { useEffect, useRef } from "react";
type User = {
  _id: string;
  name: string;
  email: string;
  profile_picture: string;
};
const TalkNotification = ({ currentUser, targetTherapist }: any) => {
  const chatboxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!currentUser || !targetTherapist) return;

    let session: Talk.Session;

    Talk.ready.then(() => {
      const me = new Talk.User({
        id: currentUser._id,
        name: currentUser.name,
        email: currentUser.email,
        photoUrl: currentUser.profile_picture,
        role: "user",
      });

      const therapist = new Talk.User({
        id: targetTherapist._id,
        name: targetTherapist.name,
        email: targetTherapist.email,
        photoUrl: targetTherapist.profile_picture,
        role: "therapist",
      });

      session = new Talk.Session({
        appId: "tCBmW4Ki",
        me,
      });

      const conversation = session.getOrCreateConversation(
        Talk.oneOnOneId(me, therapist)
      );

      conversation.setParticipant(me);
      conversation.setParticipant(therapist);

      const chatbox = session.createChatbox();
      chatbox.select(conversation);
      if (chatboxRef.current) chatbox.mount(chatboxRef.current);
    });

    return () => {
      if (session) session.destroy();
    };
  }, [currentUser?._id, targetTherapist?._id]);

  return <div ref={chatboxRef} style={{ height: "400px" }} />;
};

export default TalkNotification;
