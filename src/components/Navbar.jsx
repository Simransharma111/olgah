import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#3B2B20]/95 shadow-md backdrop-blur-sm"
          : "bg-gradient-to-b from-black/70 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 text-white">
        {/* Brand */}
        <Link
          to="/"
          className="text-2xl font-serif tracking-wide font-bold text-[#EED7B8]"
        >
          Olgah Manali
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a
            href="#rooms"
            className="hover:text-[#EED7B8] transition-colors duration-200"
          >
            Rooms
          </a>
          <a
            href="#dining"
            className="hover:text-[#EED7B8] transition-colors duration-200"
          >
            Dining
          </a>
          <a
            href="#gallery"
            className="hover:text-[#EED7B8] transition-colors duration-200"
          >
            Gallery
          </a>
          <a
            href="#contact"
            className="hover:text-[#EED7B8] transition-colors duration-200"
          >
            Contact
          </a>
          <motion.a
            href="#book"
            whileHover={{ scale: 1.05 }}
            className="bg-[#7B5E3B] px-5 py-2 rounded-full shadow hover:bg-[#6b5033] transition-all"
          >
            Book Now
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="md:hidden bg-[#3B2B20]/95 backdrop-blur-sm border-t border-[#7B5E3B]/50"
          >
            <div className="flex flex-col items-center gap-5 py-6 text-white text-lg">
              <a
                href="#rooms"
                className="hover:text-[#EED7B8]"
                onClick={() => setMenuOpen(false)}
              >
                Rooms
              </a>
              <a
                href="#dining"
                className="hover:text-[#EED7B8]"
                onClick={() => setMenuOpen(false)}
              >
                Dining
              </a>
              <a
                href="#gallery"
                className="hover:text-[#EED7B8]"
                onClick={() => setMenuOpen(false)}
              >
                Gallery
              </a>
              <a
                href="#contact"
                className="hover:text-[#EED7B8]"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </a>
              <motion.a
                href="#book"
                whileHover={{ scale: 1.05 }}
                onClick={() => setMenuOpen(false)}
                className="bg-[#7B5E3B] px-6 py-2 rounded-full shadow hover:bg-[#6b5033] transition-all"
              >
                Book Now
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
