import React from "react";
import { Link } from "react-router-dom";
import { scroller } from "react-scroll";

export default function Footer() {
  // Helper for smooth scrolling to sections
  const scrollToSection = (id) => {
    scroller.scrollTo(id, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  return (
    <footer className="bg-[#A67B5B] text-white py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h2 className="text-2xl font-serif mb-4">Olgah</h2>
          <p className="text-gray-100">
            Premium stays in Manali. Comfortable rooms, seamless booking, and
            excellent service for every traveler.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:underline"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:underline"
              >
                Contact Us
              </Link>
            </li>
            <li>
              {/* Smooth scroll to rooms section */}
              <button
                onClick={() => scrollToSection("rooms")}
                className="hover:underline focus:outline-none"
              >
                Rooms
              </button>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact</h3>
          <p>📍 Manali, Himachal Pradesh, India</p>
          <p>📞 +91 98765 43210</p>
          <p>✉️ info@olgah.com</p>

          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-gray-300">
              Facebook
            </a>
            <a href="#" className="hover:text-gray-300">
              Instagram
            </a>
            <a href="#" className="hover:text-gray-300">
              Twitter
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-200 mt-10 text-sm">
        &copy; {new Date().getFullYear()} Olgah. All rights reserved.
      </div>
    </footer>
  );
}
