"use client";
import React, { useEffect, useRef } from "react";

let fullpageInstance: any = null;

const FullPageWrapper: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function initFullpage() {
      if (!containerRef.current) return;

      if (fullpageInstance) {
        // Destroy previous instance before creating a new one
        fullpageInstance.destroy("all");
        fullpageInstance = null;
      }

      const fullpage = (await import("fullpage.js")).default;

      fullpageInstance = new fullpage(containerRef.current, {
        autoScrolling: true,
        navigation: true,
        scrollHorizontally: true,
        // your other options
      });
    }

    initFullpage();

    // Cleanup on unmount
    return () => {
      if (fullpageInstance) {
        fullpageInstance.destroy("all");
        fullpageInstance = null;
      }
    };
  }, []);

  return (
    <div id="fullpage" ref={containerRef}>
      {/* Your fullpage sections */}
    </div>
  );
};

export default FullPageWrapper;
