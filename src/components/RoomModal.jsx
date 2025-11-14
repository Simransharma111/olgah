import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RoomModal({ room, onClose }) {
  const [current, setCurrent] = useState(0);

  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = () => {
    setCurrent((prev) =>
      prev === 0 ? room.images.length - 1 : prev - 1
    );
  };

  if (!room) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl relative"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* ✕ Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#4B2E14] text-2xl font-bold hover:text-[#6b4421]"
          >
            ✕
          </button>

          {/* 🖼️ Image Carousel */}
          <div className="relative h-80 overflow-hidden">
            <img
              src={room.images[current]}
              alt={room.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
            {room.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-[#4B2E14] rounded-full p-2 text-lg shadow"
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-[#4B2E14] rounded-full p-2 text-lg shadow"
                >
                  ›
                </button>
              </>
            )}
          </div>

          {/* 🛏️ Room Details */}
          <div className="p-8">
            <h2 className="text-3xl font-serif text-[#4B2E14] mb-3">
              {room.name}
            </h2>
            <p className="text-[#6B4C35] leading-relaxed mb-6">
              {room.description}
            </p>

            {/* Amenities */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {room.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-[#4B2E14]"
                >
                  <span className="text-lg">•</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Price & CTA */}
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold text-[#4B2E14]">
                ₹{room.price.toLocaleString()} / night
              </span>
              <button className="bg-[#4B2E14] text-white px-6 py-2 rounded-lg hover:bg-[#61422A] transition-all duration-300">
                Book Now
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
