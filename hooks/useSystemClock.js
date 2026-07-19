"use client";

import { useState, useEffect } from "react";

export default function useSystemClock() {
  const [clockText, setClockText] = useState("00:00:00 AM");
  const [showClock, setShowClock] = useState(true);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // hour 0 should be 12
      const hrsStr = String(hours).padStart(2, "0");
      setClockText(`${hrsStr}:${minutes}:${seconds} ${ampm}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleClock = () => {
    setShowClock((prev) => !prev);
  };

  return { clockText, showClock, handleToggleClock };
}
