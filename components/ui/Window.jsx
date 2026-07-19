"use client";

import { useEffect, useState } from "react";

export default function Window({
  name,
  title,
  isOpen,
  isMinimized,
  isMaximized,
  onClose,
  onMinimize,
  onZoom,
  onFocus,
  windowStyles,
  onDragStart,
  children,
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!isOpen) return null;

  const isMobile = mounted && window.innerWidth <= 640;

  // Compile final CSS class list
  const windowClassList = [
    "window",
    name,
    isOpen ? "open" : "",
    isMaximized && !isMobile ? "maximized" : "",
    isMobile ? "mobile-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      id={`win-${name}`}
      className={windowClassList}
      style={{
        ...windowStyles,
        ...(isMinimized ? { display: "none" } : {}),
      }}
      onMouseDown={onFocus}
      onTouchStart={onFocus}
    >
      <div
        className="titlebar"
        onMouseDown={onDragStart}
        onTouchStart={onDragStart}
      >
        <span>{title}</span>
        <div className="dots">
          {/* Red Close button */}
          <div
            className="dot close"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          ></div>
          {/* Yellow Minimize button */}
          <div
            className="dot min"
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
          ></div>
          {/* Green Zoom / Maximize button */}
          <div
            className="dot zoom"
            onClick={(e) => {
              e.stopPropagation();
              onZoom();
            }}
          ></div>
        </div>
      </div>
      <div className="win-body">{children}</div>
    </div>
  );
}
