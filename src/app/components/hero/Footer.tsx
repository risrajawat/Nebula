import React from "react";
import {
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About SAST */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">About SAST</h3>
            <p className="text-sm leading-relaxed">
              Society for Aerospace and Space Technology (SAST) is committed to igniting curiosity, innovation, and exploration in the field of space and technology through research, hands-on projects, and community engagement.
            </p>
            <div className="flex space-x-4 mt-2">
              <a
                href="https://www.instagram.com/sast.rishihood/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition-colors duration-200"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.linkedin.com/company/society-for-aerospace-and-space-technology/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition-colors duration-200"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Explore</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition duration-200">
                  Our Projects
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition duration-200">
                  Events
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition duration-200">
                  Team
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Initiatives */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Initiatives</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition duration-200">
                  Satellite Program
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition duration-200">
                  Water Rocket Launch
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition duration-200">
                  TARS
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition duration-200">
                  Research & Development
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition duration-200">
                  Publications
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-gray-400" />
                <span className="text-sm">
                  Rishihood University, Sonipat, Haryana, India
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-gray-400" />
                <span className="text-sm">sast@rishihood.edu.in</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-gray-400" />
                <span className="text-sm">+91 7007191498</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2025 Society for Aerospace and Space Technology. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
