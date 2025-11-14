import React from "react";
import { motion } from "framer-motion";
import RoomList from "../pages/RoomList";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover brightness-90"
      >
        <source src="bg.mp4" type="video/mp4" />
      </video>

      {/* Overlay gradient for wooden contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50"></div>

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6"
      >
        <h1 className="text-5xl md:text-6xl font-serif mb-4 tracking-wide">
          Where Every Stay Tells a Story
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8">
          Boutique retreats crafted for comfort and inspiration
        </p>

        <motion.a
          href="#rooms"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#7B5E3B] text-white px-8 py-3 rounded-full shadow-lg hover:bg-[#6b5033] transition-all"
        >
          Explore Our Rooms
        </motion.a>
      </motion.div>

      {/* Decorative Wooden Border Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-[#8b6f4e]/80"></div>
      <RoomList />
    </section>
  );
}
