"use client";

import { useEffect, useRef } from "react";

export default function CursorBlob({ mounted }) {
  const blobRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const blobPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mounted) return;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationId;
    function loop() {
      const blob = blobRef.current;
      if (blob) {
        const tx = mousePos.current.x - 11;
        const ty = mousePos.current.y - 11;
        let bx = blobPos.current.x;
        let by = blobPos.current.y;

        // Smooth follow physics lerp interpolation
        bx += (tx - bx) * 0.18;
        by += (ty - by) * 0.18;

        blobPos.current = { x: bx, y: by };
        blob.style.left = bx + "px";
        blob.style.top = by + "px";
      }
      animationId = requestAnimationFrame(loop);
    }
    loop();

    const handleMouseOver = (e) => {
      const blob = blobRef.current;
      if (!blob) return;
      const target = e.target.closest(
        ".icon, .titlebar, .dot, a, .proj-link, button"
      );
      if (target) {
        blob.style.width = "40px";
        blob.style.height = "40px";
        blob.style.background = "#FF6B9D";
      } else {
        blob.style.width = "22px";
        blob.style.height = "22px";
        blob.style.background = "#6C63FF";
      }
    };

    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationId);
    };
  }, [mounted]);

  return <div id="blob" ref={blobRef}></div>;
}
