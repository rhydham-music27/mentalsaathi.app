import React, { useEffect, useState } from "react";

const TenMinuteTimer = ({ onTimeUp }: { onTimeUp?: () => void }) => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp?.(); // Optional callback when timer hits 0
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="text-base font-bold text-black">
      {formatTime(timeLeft)}
    </div>
  );
};

export default TenMinuteTimer;
