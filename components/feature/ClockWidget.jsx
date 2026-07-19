"use client";

import { useState, useEffect, useRef } from "react";
import { FiClock, FiCpu, FiCoffee, FiActivity, FiX } from "react-icons/fi";

export default function ClockWidget({ onClose }) {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [cpuLoad, setCpuLoad] = useState(12);
  const widgetRef = useRef(null);

  // Dragging states
  const [position, setPosition] = useState({ x: 20, y: 120 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Clock tick
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
      setDate(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    // CPU simulation load jitter
    const cpuInterval = setInterval(() => {
      setCpuLoad((prev) => {
        const delta = Math.floor(Math.random() * 9) - 4; // -4 to +4
        return Math.max(5, Math.min(48, prev + delta));
      });
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(cpuInterval);
    };
  }, []);

  const handleMouseDown = (e) => {
    if (e.target.closest(".widget-handle") || e.target.closest(".widget-header")) {
      setIsDragging(true);
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      dragStart.current = {
        x: clientX - position.x,
        y: clientY - position.y,
      };
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      
      let nx = clientX - dragStart.current.x;
      let ny = clientY - dragStart.current.y;

      // Bound boundaries
      nx = Math.max(10, Math.min(window.innerWidth - 220, nx));
      ny = Math.max(50, Math.min(window.innerHeight - 220, ny));

      setPosition({ x: nx, y: ny });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleMouseMove, { passive: false });
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={widgetRef}
      className={`desktop-widget flex flex-col ${isDragging ? "dragging" : ""}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      <div className="widget-header widget-handle flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider opacity-75">
          <FiActivity size={10} /> Dashboard.sys
        </span>
        <button
          onClick={onClose}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          className="widget-close-btn"
          title="Close Widget"
        >
          <FiX size={10} />
        </button>
      </div>
      <div className="widget-body flex flex-col gap-3">
        {/* Time section */}
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-ink">{time}</span>
          <span className="text-[10px] opacity-75 font-semibold uppercase">{date}</span>
        </div>

        {/* System metrics */}
        <div className="border-t border-ink/20 pt-2.5 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 opacity-80">
              <FiCpu size={12} /> Cpu Load
            </span>
            <span className="font-bold">{cpuLoad}%</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 opacity-80">
              <FiCoffee size={12} /> Coffee Status
            </span>
            <span className="font-bold text-teal">94%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
