"use client";
import Image from "next/image";
import React from "react";
import { FaUsers, FaHandshake, FaRocket, FaStar } from "react-icons/fa";

const TeamPage: React.FC = () => {
  const teamMembers = [
    {
      name: "Neelanshu Karn",
      role: "Project Lead - Nebula",
      bio: "Leads the Nebula project with vision and technical insight, driving the team toward impactful innovation in space-tech.",
      photo:
        "https://avatars.githubusercontent.com/u/67745953?s=400&u=cc8f4cb6d463c2ee4c1cc756522e79929dc65ee2&v=4",
    },
    {
      name: "Pratiti Paul",
      role: "Project Co-Lead - Nebula",
      bio: "Supports project leadership with coordination, planning, and creative contributions to team direction.",
      photo:
        "https://d3dyfaf3iutrxo.cloudfront.net/thumbnail/user/b1707d706f294124ab883d476518f6b4.jpeg",
    },

    // Development Team
    {
      name: "Kavya Katal",
      role: "MERN Developer",
      bio: "Dedicated to full-stack development with MERN, solving problems through code and creativity.",
      photo: "https://avatars.githubusercontent.com/u/178926947?v=4",
    },
    {
      name: "Ankit Kumar Pandey",
      role: "Open Source Evangelist",
      bio: "Champions open source by building bridges across developers and promoting collaborative contribution.",
      photo: "https://avatars.githubusercontent.com/u/36405347?v=4",
    },
    {
      name: "Abhinav Bajpai",
      role: "Developer",
      bio: "Focused on creating seamless and visually engaging web experiences with clean, scalable code.",
      photo: "https://avatars.githubusercontent.com/u/43998907?v=4",
    },
    {
      name: "Pratyush Parida",
      role: "Developer",
      bio: "Back-end enthusiast who ensures that data flows securely and efficiently through every digital system.",
      photo: "https://avatars.githubusercontent.com/u/68473509?v=4",
    },
    {
      name: "Kunal Vats",
      role: "Developer",
      bio: "Committed to building high-performance applications and writing maintainable code for scalable systems.",
      photo:
        "https://d3dyfaf3iutrxo.cloudfront.net/thumbnail/user/e496931dbf11497585565f81036b81b2.jpeg",
    },

    // UI/UX
    {
      name: "Prataya Silla",
      role: "UI/UX Lead",
      bio: "Designs intuitive and engaging user interfaces that enhance user experience across all touchpoints.",
      photo:
        "https://d3dyfaf3iutrxo.cloudfront.net/thumbnail/user/8bd8e4c4b408476abf043bdf7d652527.jpeg",
    },

    // Website Team
    {
      name: "Rudraksh Sharma",
      role: "Website Team",
      bio: "Ensures the project website stays robust, updated, and user-friendly with clean front-end development.",
      photo:
        "https://d3dyfaf3iutrxo.cloudfront.net/thumbnail/user/a0d5f67fe2a04dd785b12cb1dd0873db.jpeg",
    },
    {
      name: "Param Kodhiyar",
      role: "Website Team",
      bio: "Works on developing and maintaining the digital backbone of the project’s web presence.",
      photo:
        "https://scontent-sof1-2.cdninstagram.com/v/t51.2885-19/469386494_566828359423975_7909603751952130678_n.jpg?stp=dst-jpg_s160x160_tt6&_nc_cat=107&ccb=1-7&_nc_sid=bf7eb4&_nc_ohc=1KxEx9iW-kMQ7kNvwEw5ac_&_nc_oc=AdkvurIgou8t9KrfLCTO1X1jI4HeavVcS_8PqrhQPYL4AcRc88luaJyvGDdH2pWgOx8Wn8VNlLqM8s1VGluTEFxW&_nc_zt=24&_nc_ht=scontent-sof1-2.cdninstagram.com&oh=00_AfIyzra2D5ddPMfZDJvcJF_ir61vxr2vPM-n_F9WeSTa0A&oe=68428B67",
    },

    // Community & Media
    {
      name: "Rashmi Anand",
      role: "Community Manager - Nebula",
      bio: "Fosters engagement, collaboration, and inclusivity in the Nebula project community.",
      photo:
        "https://d3dyfaf3iutrxo.cloudfront.net/thumbnail/user/c8b40d3f68c543eda4c6ec39eb097310.jpeg",
    },
    {
      name: "Shaurya Sharma",
      role: "Social Media",
      bio: "Amplifies our mission through digital platforms, growing the community and keeping everyone inspired.",
      photo:
        "https://d3dyfaf3iutrxo.cloudfront.net/thumbnail/user/0bc14255948f472982d959e60cc01b69.jpeg",
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center py-20 px-6 overflow-hidden">
      <div className="absolute top-[-5rem] left-[-5rem] w-96 h-96 bg-gradient-to-tr from-indigo-900 via-blue-900 to-cyan-800 opacity-20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-5rem] right-[-5rem] w-96 h-96 bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 opacity-20 rounded-full blur-[120px]" />

      <FaUsers
        className="absolute top-20 left-16 text-indigo-700 opacity-10 blur-sm pointer-events-none"
        size={140}
      />
      <FaHandshake
        className="absolute bottom-28 right-20 text-pink-700 opacity-10 blur-sm pointer-events-none"
        size={130}
      />
      <FaRocket
        className="absolute top-40 right-24 text-cyan-600 opacity-10 blur-sm pointer-events-none"
        size={150}
      />
      <FaStar
        className="absolute bottom-36 left-24 text-purple-600 opacity-10 blur-sm pointer-events-none"
        size={120}
      />

      <h2 className="text-5xl md:text-5xl font-bold text-white mb-16 z-10 text-center tracking-wide">
        Meet The Team
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl w-full z-10">
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className="relative bg-white/5 rounded-2xl p-6 flex flex-col items-center text-center shadow-xl backdrop-blur-md"
          >
            <Image
              src={member.photo}
              alt={member.name}
              width={112} // <-- width set
              height={112} // <-- height set
              className="rounded-full mb-6 border-2 border-white/20 object-cover"
            />

            <h3 className="text-xl font-semibold text-white mb-1">
              {member.name}
            </h3>
            <p className="text-sm text-purple-300 mb-3 italic">{member.role}</p>
            <p className="text-sm text-white/80 leading-relaxed">
              {member.bio}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
