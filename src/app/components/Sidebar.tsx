"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import "../globals.css";

interface SidebarProps {
  setActiveSection: (
    section: "home" | "ranks" | "contact" | "faq" | "profile"
  ) => void;
  isOpen?: boolean;
  onToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  setActiveSection,
  isOpen = true,
  onToggle,
}) => {
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  useEffect(() => {
    const element = sidebarRef.current; // Store ref value locally
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const baseStyle: React.CSSProperties = {
    padding: isOpen ? "0.75rem 1rem" : "0.75rem",
    borderRadius: "9999px",
    fontWeight: "bold",
    fontFamily: "'Orbitron', 'Inter', sans-serif",
    background: "rgba(255, 255, 255, 0.03)",
    color: "#cccccc",
    border: "0.5px solid rgba(255,255,255,0.1)",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
    backdropFilter: "blur(10px)",
    marginBottom: "1rem",
    width: "100%",
    textAlign: "center",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const handleHover = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    hover = true
  ) => {
    e.currentTarget.style.background = hover
      ? "rgba(255, 255, 255, 0.07)"
      : "rgba(255, 255, 255, 0.03)";
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  return (
    <div
      ref={sidebarRef}
      style={{
        width: isOpen ? (isMobile ? "100%" : "20rem") : "4rem",
        position: isMobile ? "fixed" : "relative",
        zIndex: 1000,
        color: "var(--color-text)",
        minHeight: "100vh",
        padding: isOpen ? "2rem 1.5rem" : "2rem 0.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        WebkitBackdropFilter: "blur(6px)",
        transform: isVisible ? "translateX(0)" : "translateX(-50px)",
        opacity: isVisible ? 1 : 0,
        transition: "all 0.3s ease-out",
        overflow: "hidden",
        borderRight: "1px solid rgba(255,255,255,0.1)",
        fontWeight: "bold",
        fontFamily: "'Orbitron', 'Inter', sans-serif",
      }}
    >
      <button
        onClick={() => {
          if (typeof window !== "undefined") {
            window.location.href = "/contribution-ranks";
          }
        }}
        style={baseStyle}
        onMouseEnter={(e) => handleHover(e, true)}
        onMouseLeave={(e) => handleHover(e, false)}
      >
        🏠 Home
      </button>

      <button
        onClick={() => {
          if (typeof window !== "undefined") {
            window.location.href = "/leaderboard-contest";
          }
        }}
        style={baseStyle}
        onMouseEnter={(e) => handleHover(e, true)}
        onMouseLeave={(e) => handleHover(e, false)}
      >
        🏆 Leaderboard
      </button>

      {email && (
        <button
          onClick={() => setActiveSection("profile")}
          style={baseStyle}
          onMouseEnter={(e) => handleHover(e, true)}
          onMouseLeave={(e) => handleHover(e, false)}
        >
          👤 Profile
        </button>
      )}

      {/* {email && (
        <button
          onClick={() => {
            localStorage.removeItem("email");
            localStorage.removeItem("token");
            setEmail("");
            router.push("/");
          }}
          style={baseStyle}
          onMouseEnter={(e) => handleHover(e, true)}
          onMouseLeave={(e) => handleHover(e, false)}
        >
          🚪 Logout
        </button>
      )} */}

      <button
        onClick={() => router.push("/contribution-ranks?section=contact")}
        style={baseStyle}
        onMouseEnter={(e) => handleHover(e, true)}
        onMouseLeave={(e) => handleHover(e, false)}
      >
        📬 Contact
      </button>

      <button
        onClick={() => router.push("/contribution-ranks?section=faq")}
        style={baseStyle}
        onMouseEnter={(e) => handleHover(e, true)}
        onMouseLeave={(e) => handleHover(e, false)}
      >
        ❓ FAQ
      </button>

      {/* ✅ New Idea Box Button */}
      <button
        onClick={() => router.push("/ideabox")}
        style={baseStyle}
        onMouseEnter={(e) => handleHover(e, true)}
        onMouseLeave={(e) => handleHover(e, false)}
      >
        💡 Idea Box
      </button>

      {/* Sidebar toggle button */}
      <button
        onClick={onToggle}
        style={{
          position: "absolute",
          right: "-12px",
          top: "2rem",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          background: "#fff",
          border: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          zIndex: 10,
        }}
      >
        {isOpen ? "←" : "→"}
      </button>
    </div>
  );
};

export default Sidebar;
