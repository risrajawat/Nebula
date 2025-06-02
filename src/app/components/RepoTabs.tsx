"use client";
import React, { useEffect, useRef, useState } from "react";
import "../globals.css";

export interface Repo {
  owner: string;
  name: string;
}

interface RepoTabsProps {
  repos: Repo[];
  selectedRepo: Repo;
  onSelect: (repo: Repo) => void;
}

const RepoTabs: React.FC<RepoTabsProps> = ({
  repos,
  selectedRepo,
  onSelect,
}) => {
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    const currentRef = tabsRef.current; // Copy ref to variable

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef); // Use copied variable in cleanup
      }
    };
  }, []);

  return (
    <div
      ref={tabsRef}
      style={{
        display: "flex",
        overflowX: "auto",
        gap: "1rem",
        padding: "1rem 0",
        justifyContent: "center",
        flexWrap: "wrap",
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        opacity: isVisible ? 1 : 0,
        transition: "all 0.6s ease-out",
      }}
    >
      {repos.map((repo) => {
        const isActive = selectedRepo.name === repo.name;
        return (
          <button
            key={repo.name}
            onClick={() => onSelect(repo)}
            style={{
              padding: "0.6rem 1.5rem",
              borderRadius: "9999px",
              fontWeight: "bold",
              cursor: "pointer",
              border: isActive
                ? "2px solid rgba(0, 161, 255, 0.6)"
                : "1px solid rgba(255,255,255,0.1)",
              background: isActive
                ? "linear-gradient(135deg, #00a1ff, #0066cc)"
                : "rgba(255, 255, 255, 0.03)",
              color: isActive ? "#ffffff" : "#cccccc",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease-in-out",
              boxShadow: isActive
                ? "0px 4px 12px rgba(0, 161, 255, 0.2)"
                : "none",
            }}
            onMouseEnter={(e) => {
              if (!isActive)
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            }}
            onMouseLeave={(e) => {
              if (!isActive)
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
            }}
          >
            {repo.name}
          </button>
        );
      })}
    </div>
  );
};

export default RepoTabs;
