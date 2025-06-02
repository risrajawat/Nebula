"use client";

import { useEffect } from "react";
import "fullpage.js/dist/fullpage.css";

interface FullPageWrapperProps {
  children: React.ReactNode;
}

const FullPageWrapper: React.FC<FullPageWrapperProps> = ({ children }) => {
  useEffect(() => {
    let fullpageInstance: any;

    // Only run if window is available (i.e., client-side)
    if (typeof window !== "undefined") {
      (async () => {
        const fullpage = (await import("fullpage.js")).default;

        fullpageInstance = new fullpage("#fullpage", {
          autoScrolling: true,
          navigation: true,
          scrollHorizontally: true,
          licenseKey: "gplv3-license",
        });
      })();
    }

    return () => {
      if (fullpageInstance && fullpageInstance.destroy) {
        fullpageInstance.destroy("all");
      }
    };
  }, []);

  return <div id="fullpage">{children}</div>;
};

export default FullPageWrapper;
