"use client";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { SiOpenproject } from "react-icons/si";
import { BsRocketTakeoff } from "react-icons/bs";

const GitHubShowcase = () => {
  const repos = [
    {
      name: "SAST",
      moto: "Exploring the cosmos through code and collaboration.",
      description:
        "Welcome to the official repository of the SAST website — a collaborative space to build a vibrant platform showcasing our club's spirit, achievements, and events.",
      logo: "https://i.postimg.cc/g2G97j2c/society-for-aerospace-and-space-technology-logo.jpg",
      link: "https://github.com/SASTxNST/Website_SAST",
    },
    {
      name: "Nebula",
      moto: "The flagship open-source initiative of the Society for Astrophysics and Space Technology (SAST)",
      description:
        "Project Nebula is envisioned to be a collaborative platform that blends innovation, learning, and real-world development. At its core, Nebula aims to empower SAST members—especially juniors—by immersing them in the world of open-source contribution and full-stack development.",
      logo: "https://i.postimg.cc/8C7fbZ8L/Nebula-Logo.png",
      link: "https://github.com/SASTxNST/Nebula",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-black flex items-center justify-center py-16 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full">
        {repos.map((repo, index) => (
          <div
            key={index}
            className="relative rounded-3xl p-[2px] bg-gradient-to-br from-[#2a0000] via-[#0a0a0a] to-[#001d3d] shadow-lg"
          >
            <div className="relative h-[20rem] rounded-[22px] bg-black/60 backdrop-blur-lg text-white p-8 flex flex-col justify-between overflow-hidden">
              <BsRocketTakeoff className="absolute top-10 left-10 text-white/10 text-[5rem] rotate-12 blur-sm pointer-events-none" />
              <SiOpenproject className="absolute bottom-20 right-10 text-blue-900/20 text-[4rem] blur-[1px] pointer-events-none" />
              <FaGithub className="absolute bottom-4 left-4 text-white/10 text-[3.5rem] blur-sm pointer-events-none" />

              <div>
                <div className="flex items-center gap-4 mb-5 relative z-10">
                  <Image
                    src={repo.logo}
                    alt={repo.name}
                    className="w-14 h-14 object-contain rounded-lg bg-white/10 p-1"
                  />
                  <div>
                    <h2 className="text-2xl font-semibold">{repo.name}</h2>
                    <p className="text-sm text-white/60">{repo.moto}</p>
                  </div>
                </div>

                <p className="text-sm text-white/80 leading-relaxed mt-2 relative z-10">
                  {repo.description}
                </p>
              </div>

              <div className="mt-6 relative z-10">
                <a
                  href={repo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-400 transition underline text-sm"
                >
                  <FaGithub /> View on GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GitHubShowcase;
