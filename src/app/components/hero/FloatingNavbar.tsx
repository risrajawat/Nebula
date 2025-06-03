import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

// Updated nav items to include sidebar items
const navItems = ["Home", "Leaderboard", "Contact", "FAQ", "Idea Box", "Contribute"];

type FloatingNavbarProps = {
  showLoginState?: {
    setShowLoginPopup: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

const FloatingNavbar: React.FC<FloatingNavbarProps> = ({ showLoginState }) => {
  const [hovered, setHovered] = useState<string | null>("Login");
  const [hoverStyle, setHoverStyle] = useState({ left: 0, width: 0, height: 42 });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const router = useRouter();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    if (hovered && itemRefs.current[hovered] && containerRef.current) {
      const item = itemRefs.current[hovered]!;
      const container = containerRef.current;
      const { left: itemLeft, width } = item.getBoundingClientRect();
      const containerLeft = container.getBoundingClientRect().left;
      setHoverStyle({
        left: itemLeft - containerLeft,
        width,
        height: 42,
      });
    }
  }, [hovered]);

  const handleNavigation = (item: string) => {
    switch (item) {
      case "Home":
        router.push("/contribution-ranks");
        break;
      case "Leaderboard":
        router.push("/leaderboard-contest");
        break;
      case "Contact":
        router.push("/contribution-ranks?section=contact");
        break;
      case "FAQ":
        router.push("/contribution-ranks?section=faq");
        break;
      case "Idea Box":
        router.push("/ideabox");
        break;
      case "Profile":
        router.push("/contribution-ranks?section=profile");
        break;
      case "Contribute":
        window.open("https://github.com/SASTxNST/Nebula", "_blank");
        break;
      default:
        break;
    }
  };

  // Add Profile to nav items if logged in, otherwise add Login
  const displayNavItems = [...navItems];
  if (isLoggedIn) {
    displayNavItems.push("Profile");
  } else {
    displayNavItems.push("Login");
  }

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div
        ref={containerRef}
        className="relative bg-black border border-white/10 px-4 py-2 rounded-full flex gap-4 backdrop-blur-md"
      >
        <AnimatePresence>
          <motion.div
            layout
            className={`absolute top-1 bottom-1 rounded-full ${
              hovered === "Contribute" ? "bg-pink-500/20" : "bg-white/10"
            }`}
            initial={false}
            animate={{
              left: hoverStyle.left,
              width: hoverStyle.width,
              height: hoverStyle.height,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </AnimatePresence>

        {displayNavItems.map((item) => (
          <div
            key={item}
            ref={(el) => {
              itemRefs.current[item] = el;
            }}
            onMouseEnter={() => setHovered(item)}
            onFocus={() => setHovered(item)}
            onClick={() => {
              if (item === "Login") {
                showLoginState?.setShowLoginPopup(true);
              } else {
                handleNavigation(item);
              }
            }}
            className={`relative z-10 px-4 py-2 text-sm cursor-pointer whitespace-nowrap ${
              item === "Contribute"
                ? "text-pink-400 font-semibold"
                : item === "Profile" 
                  ? "text-blue-400 font-semibold" 
                  : "text-white"
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FloatingNavbar;
