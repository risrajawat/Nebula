"use client";

import { FaRocket, FaStar, FaGithub, FaCode } from "react-icons/fa";

const EventsSection: React.FC = () => {
  const events = [
    {
      title: "NASA Space Apps Challenge",
      date: "Dates to be announced",
      description:
        "The world’s largest space and science hackathon is coming to our campus! Collaborate with global problem-solvers and build innovative solutions using NASA's open data.",
    },
    {
      title: "Embedded C Workshop",
      date: "Dates to be announced",
      description:
        "A week-long hands-on workshop diving deep into Embedded C programming—ideal for aspiring system-level programmers and space hardware enthusiasts.",
    },
    {
      title: "RC Plane Competition",
      date: "Dates to be announced",
      description:
        "Design, build, and fly your own remote-controlled aircraft. Compete in real-world flight challenges that test your engineering and aerodynamics skills.",
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center py-20 px-6 overflow-hidden">
      <div className="absolute top-[-5rem] left-[-5rem] w-96 h-96 bg-gradient-to-tr from-[#2a0000] via-purple-700 to-blue-700 opacity-20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-5rem] right-[-5rem] w-96 h-96 bg-gradient-to-br from-red-800 via-pink-600 to-purple-700 opacity-20 rounded-full blur-[120px]" />

      <FaRocket
        className="absolute top-20 left-10 text-purple-700 opacity-10 blur-sm pointer-events-none"
        size={150}
      />
      <FaStar
        className="absolute top-40 right-20 text-yellow-400 opacity-10 blur-sm pointer-events-none"
        size={120}
      />
      <FaGithub
        className="absolute bottom-32 left-16 text-gray-500 opacity-10 blur-sm pointer-events-none"
        size={140}
      />
      <FaCode
        className="absolute bottom-20 right-24 text-blue-600 opacity-10 blur-sm pointer-events-none"
        size={130}
      />

      <h2 className="text-5xl md:text-5xl font-bold text-white mb-16 z-10 text-center tracking-wide">
        Upcoming Events
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl w-full z-10">
        {events.map((event, idx) => (
          <div
            key={idx}
            className="relative bg-white/3 rounded-2xl p-6 shadow-xl backdrop-blur-md"
          >
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-red-500 to-purple-700 opacity-30 rotate-45 rounded-3xl blur-md pointer-events-none" />
            <h3 className="text-xl font-semibold text-white mb-2">
              {event.title}
            </h3>
            <p className="text-sm text-gray-300 mb-3">{event.date}</p>
            <p className="text-sm text-white/80 leading-relaxed">
              {event.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsSection;
