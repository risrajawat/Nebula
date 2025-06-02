"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Typewriter } from "react-simple-typewriter";
import NebulaHero from "../components/NebulaHero";
import About from "../components/About";
import Timeline from "../components/Timeline";

const HomeLanding: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [stars, setStars] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(true);
  const [contributors, setContributors] = useState<any[]>([]);
  const [featuredRepos, setFeaturedRepos] = useState<any[]>([]);

  useEffect(() => {
    if (inView && !hasAnimated) {
      controls.start("visible");
      setHasAnimated(true);
    }
  }, [controls, inView, hasAnimated]);

  useEffect(() => {
    fetch("https://api.github.com/repos/SASTxNST/Website_SAST")
      .then((res) => res.json())
      .then((data) => setStars(data.stargazers_count))
      .catch(() => setStars(null));

    fetch("https://api.github.com/repos/SASTxNST/Website_SAST/contributors")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setContributors(data);
        } else {
          setContributors([]);
        }
      })
      .catch(() => setContributors([]));

    Promise.all([
      fetch("https://api.github.com/repos/SASTxNST/Website_SAST").then((res) =>
        res.json()
      ),
      fetch("https://api.github.com/repos/SASTxNST/Nebula").then((res) =>
        res.json()
      ),
      fetch(
        "https://api.github.com/repos/SASTxNST/Sensor-Data-Visualiser"
      ).then((res) => res.json()),
    ])
      .then((data) => {
        if (Array.isArray(data)) {
          setFeaturedRepos(data);
        } else {
          setFeaturedRepos([]);
        }
      })
      .catch(() => setFeaturedRepos([]));
  }, []);

  useEffect(() => {
    const checkWidth = () => setIsDesktop(window.innerWidth >= 768);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div
      className="ml-[5px] w-full px-4 sm:px-6 lg:px-8"
      style={{ minHeight: "100vh", overflowX: "hidden", marginRight: "5px" }}
    >
      <div style={{ position: "relative" }}>
        <NebulaHero />
      </div>

      {isDesktop && (
        <div
          style={{
            width: "100%",
            maxWidth: "1000px",
            margin: "4rem auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1.5rem",
            padding: "0 1rem",
          }}
        >
          {["Fix Bugs", "Improve UI", "Write Docs", "Add Features"].map(
            (task) => (
              <div
                key={task}
                style={{
                  width: "100%",
                  maxWidth: "220px",
                  padding: "1.5rem",
                  borderRadius: "20px",
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  textAlign: "center",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
                  flex: "1 1 200px",
                }}
              >
                <div
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                    color: "#00aaff",
                  }}
                >
                  {task}
                </div>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "rgba(255, 255, 255, 0.75)",
                  }}
                >
                  Explore GitHub issues for this task
                </p>
              </div>
            )
          )}
        </div>
      )}

      <section className="w-full px-6 sm:px-12 py-24">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white font-orbitron">
            What is <span className="text-blue-400">NEBULA</span>?
            <span className="block mt-2 text-xl text-gray-300 font-light">
              Everything you need to know
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              title: "Pick your challenge",
              description:
                "Browse through curated open-source issues that match your skills and interests.",
              image: "/cards/pick-your-challenge.jpg",
            },
            {
              title: "Contribute & Earn",
              description:
                "Solve issues to earn DCoins while making meaningful contributions to open-source.",
              image: "/cards/contribute-earn.jpg",
            },
            {
              title: "Build Your Reputation",
              description:
                "Climb the leaderboard and showcase your impact in the developer community.",
              image: "/cards/build-reputation.jpg",
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="bg-black/40 border border-gray-700 rounded-xl overflow-hidden shadow-xl backdrop-blur-sm hover:shadow-blue-500/30 transition duration-300"
            >
              <Image
                src={card.image}
                alt={card.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2 font-orbitron">
                  {card.title}
                </h3>
                <p className="text-gray-300 text-sm">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline section (native layout to be made responsive later) */}
      <div>
        <Timeline />
      </div>
      <About />

      <h2
        style={{
          textAlign: "center",
          fontSize: "1.5rem",
          marginBottom: "1rem",
          color: "#00aaff",
        }}
      >
        Some of our Contributors
      </h2>
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "1rem",
          padding: "2rem 1rem",
          maxWidth: "100%",
          margin: "0 auto",
        }}
      >
        {Array.isArray(contributors) &&
          contributors.slice(0, 12).map((contributor) => (
            <a
              key={contributor.id}
              href={contributor.html_url}
              target="_blank"
              rel="noopener noreferrer"
              title={contributor.login}
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                padding: "0.8rem",
                borderRadius: "12px",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <Image
                src={contributor.avatar_url}
                alt={contributor.login}
                style={{ width: 48, height: 48, borderRadius: "50%" }}
              />
            </a>
          ))}
      </div>

      {featuredRepos.length > 0 && (
        <div
          style={{ padding: "2rem 1rem", maxWidth: "800px", margin: "0 auto" }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              marginBottom: "1rem",
              color: "#00aaff",
              textAlign: "center",
            }}
          >
            🚀 Featured Repositories
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {featuredRepos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "1rem",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <div style={{ fontWeight: "600", color: "#66ccff" }}>
                  {repo.name}
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                    color: "#ccc",
                    marginBottom: "0.5rem",
                  }}
                >
                  {repo.description}
                </div>
                <div style={{ fontSize: "0.8rem", color: "#999" }}>
                  ⭐ {repo.stargazers_count} &nbsp; | &nbsp; 🍴{" "}
                  {repo.forks_count}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeLanding;
