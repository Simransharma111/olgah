import React from "react";
import { motion } from "framer-motion";

const galleryImages = [
  "room1.jpg",
  "room2.jpg",
  "room1.jpg",
  "room2.jpg",
  "room1.jpg",
  "room2.jpg",
];

export default function AnimatedGallery() {
  return (
    <section className="min-h-screen bg-[#F6F1EA] flex flex-col justify-center items-center py-16">
      <h2 className="text-4xl font-serif text-[#3B2B20] mb-12">Our Rooms Gallery</h2>

      <div className="overflow-hidden w-full">
        <motion.div
          className="flex gap-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: { repeat: Infinity, repeatType: "loop", duration: 20, ease: "linear" },
          }}
        >
          {/* Duplicate images for seamless loop */}
          {[...galleryImages, ...galleryImages].map((img, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-64 h-64 rounded-xl overflow-hidden shadow-lg"
            >
              <img
                src={img}
                alt={`Room ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
