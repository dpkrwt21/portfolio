"use client";

import { useState, useEffect, useCallback } from "react";
import { profileData } from "@/lib/data";

export default function useBootSequence(mounted, addNotification) {
  const [booting, setBooting] = useState(true);
  const [bootText, setBootText] = useState("");

  const bootLines = profileData.bootLines;

  const finishBoot = useCallback(() => {
    setBooting(false);
    if (addNotification) {
      setTimeout(() => {
        addNotification("✨ Welcome to Deepak's OS Playground!", "success");
      }, 500);
    }
  }, [addNotification]);

  useEffect(() => {
    if (!mounted || !booting) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBootText("");
    let bi = 0;
    let ci = 0;
    let finished = false;
    let typeTimeout;

    function typeBoot() {
      if (finished) return;
      if (bi >= bootLines.length) {
        finishBoot();
        return;
      }
      const line = bootLines[bi];
      if (ci < line.length) {
        const char = line[ci];
        setBootText((prev) => prev + char);
        ci++;
        typeTimeout = setTimeout(typeBoot, 18);
      } else {
        setBootText((prev) => prev + "\n");
        bi++;
        ci = 0;
        typeTimeout = setTimeout(typeBoot, 150);
      }
    }

    typeBoot();

    return () => {
      finished = true;
      clearTimeout(typeTimeout);
    };
  }, [booting, mounted, bootLines, finishBoot]);

  const handleSkipBoot = () => {
    finishBoot();
  };

  const handleRestart = () => {
    setBootText("");
    setBooting(true);
  };

  const handleShutdown = () => {
    setBooting(true);
    setBootText("portfolio-os has shutdown successfully.\npress power or reload to restart.");
  };

  return { booting, bootText, handleSkipBoot, handleRestart, handleShutdown };
}
