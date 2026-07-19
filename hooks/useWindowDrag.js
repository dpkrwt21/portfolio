"use client";

import { useEffect, useRef } from "react";

export default function useWindowDrag(mounted, positions, setPositions, focusWindow) {
  const dragInfo = useRef({
    activeWindow: null,
    startX: 0,
    startY: 0,
    startLeft: 0,
    startTop: 0,
    dragging: false,
  });

  const handleDragStart = (e, name) => {
    if (window.innerWidth <= 640) return;
    if (focusWindow) focusWindow(name);
    const winElement = document.getElementById(`win-${name}`);
    if (winElement) {
      winElement.classList.add("dragging");
    }

    const pos = positions[name];
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const startLeft = pos.x !== null ? pos.x : winElement ? winElement.offsetLeft : 0;
    const startTop = pos.y !== null ? pos.y : winElement ? winElement.offsetTop : 0;

    dragInfo.current = {
      activeWindow: name,
      startX: clientX,
      startY: clientY,
      startLeft,
      startTop,
      dragging: true,
    };
  };

  useEffect(() => {
    if (!mounted) return;

    const handleDragMove = (e) => {
      if (!dragInfo.current.dragging) return;
      const { activeWindow, startX, startY, startLeft, startTop } = dragInfo.current;
      if (!activeWindow) return;

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const dx = clientX - startX;
      const dy = clientY - startY;

      let nx = startLeft + dx;
      let ny = startTop + dy;

      // Boundaries check
      nx = Math.max(0, Math.min(window.innerWidth - 60, nx));
      ny = Math.max(40, Math.min(window.innerHeight - 60, ny));

      setPositions((prev) => ({
        ...prev,
        [activeWindow]: {
          ...prev[activeWindow],
          x: nx,
          y: ny,
        },
      }));
    };

    const handleDragEnd = () => {
      if (dragInfo.current.dragging) {
        const name = dragInfo.current.activeWindow;
        if (name) {
          const winElement = document.getElementById(`win-${name}`);
          if (winElement) {
            winElement.classList.remove("dragging");
          }
        }
        dragInfo.current.dragging = false;
        dragInfo.current.activeWindow = null;
      }
    };

    window.addEventListener("mousemove", handleDragMove);
    window.addEventListener("mouseup", handleDragEnd);
    window.addEventListener("touchmove", handleDragMove, { passive: false });
    window.addEventListener("touchend", handleDragEnd);

    return () => {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleDragMove);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [mounted, positions, setPositions]);

  return { handleDragStart };
}
