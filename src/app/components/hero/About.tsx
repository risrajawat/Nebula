import Image from "next/image";

const About = () => {
  return (
    <div className="relative w-full min-h-screen bg-black text-white font-sans overflow-hidden flex flex-col">
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-l from-black via-black/60 to-transparent absolute z-0" />
        <Image
          src="https://i.postimg.cc/pd3vC12b/unnamed.png"
          alt="Hero"
          className="object-cover w-full h-full opacity-15"
          fill
          priority
        />
      </div>
      <div className="fp-scrollable-content max-h-full overflow-y-auto px-10 py-20 text-white"></div>
      {/* Main Content */}
      <div className="w-full px-10 flex justify-start">
        <div className="max-w-xl">
          <h1 className="text-5xl lg:text-6xl font-light leading-tight text-white">
            <span>Welcome to </span>
            <span className="text-blue-500 font-semibold">SAST&apos;s</span> own
            <span className="font-semibold">
              <span className="text-blue-500"> Open-Source</span> Contribution
              Challenge
            </span>
          </h1>

          <a
            href="https://github.com/SASTxNST/Website_SAST"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-10 w-fit px-10 py-3 rounded-full text-white text-lg font-medium bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 shadow-[0_0_16px_rgba(99,102,241,0.2)] backdrop-blur-md border border-white/5 hover:scale-102 transition-transform duration-200"
          >
            Contribute
          </a>
        </div>
      </div>

      {/* Info Boxes Section */}
      <div className="w-full px-8 py-6 bg-black/80 backdrop-blur-md z-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-xs text-white">
          {[
            {
              id: "02/06/25",
              title: "Project Nebula: Launch & Orientation",
              desc: "Kickstart the journey! Get introduced to the Open Source Contribution Challenge and learn how to make your first impact.",
            },
            {
              id: "04/06/25",
              title: "First Flight: Your First Contribution",
              desc: "SAST x DevClub brings a hands-on workshop guiding you through your first ever open-source contribution — simple, friendly, and powerful.",
            },
            {
              id: "07/06/25",
              title: "Hacking Without Hacking",
              desc: "Dive into OSINT & Social Engineering with SAST x SOCS. Learn how ethical intelligence works in the real world.",
            },
            {
              id: "11/06/25",
              title: "Branch Out: Real Repos, Real Impact",
              desc: "Level up with SAST x DevClub. Go beyond the basics—learn to explore active repositories and make meaningful pull requests.",
            },
            {
              id: "18/06/25",
              title: "The Open Source Playground",
              desc: "Get your hands dirty! Experiment in a live HTML/CSS sandbox in this SAST X DevClub Workshop, then discover how open source is changing the world.",
            },
            {
              id: "23/06/25",
              title: "The Final Push",
              desc: "This is it! Wrap up your contributions, polish your work, and submit your final pull requests before the clock runs out.",
            },
            // {
            //   id: "25/06/25",
            //   title: "Winner Announcement",
            //   desc: "Time to celebrate! Winners of the SAST Open Source Contribution Challenge will be revealed — stay tuned!",
            // },
          ].map((item, i) => (
            <div
              key={i}
              className="p-4 border border-white/10 bg-white/5 hover:bg-white/10 transition duration-300"
            >
              <h4 className="text-sm font-bold mb-1 text-white/90">
                {item.id} {item.title}
              </h4>
              {item.desc && (
                <p className="text-xs text-gray-300 mt-1">{item.desc}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
