"use client";

import { useEffect, useRef } from "react";

export default function SmoothScroll() {
  const currentScroll = useRef(0);
  const targetScroll = useRef(0);
  const requestId = useRef<number | null>(null); // Initialize with null and allow null type

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      targetScroll.current = Math.min(
        Math.max(targetScroll.current + event.deltaY, 0),
        document.documentElement.scrollHeight - window.innerHeight
      );
      if (!requestId.current) {
        requestId.current = requestAnimationFrame(updateScroll);
      }
    };

    const updateScroll = () => {
      // Increase easing factor to reduce smoothness (snappier feel)
      const easing = 0.35; // was 0.10
      currentScroll.current += (targetScroll.current - currentScroll.current) * easing;
      window.scrollTo(0, currentScroll.current);

      if (Math.abs(currentScroll.current - targetScroll.current) > 0.5) {
        requestId.current = requestAnimationFrame(updateScroll);
      } else {
        requestId.current = null; // Use null instead of undefined here
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (requestId.current !== null) {
        cancelAnimationFrame(requestId.current);
      }
    };
  }, []);

  return null;
}
