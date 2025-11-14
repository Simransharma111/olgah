import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaWifi, FaTv, FaSmokingBan, FaBed } from "react-icons/fa";

export default function RoomCard({ room }) {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-lg rounded-2xl border border-[#d3c0a3] overflow-hidden hover:shadow-2xl transition-all">
      <img
        src={room.images[0]}
        alt={room.name}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">
        <h3 className="text-xl font-serif text-[#3B2B20]">{room.name}</h3>
        <p className="text-gray-600 mt-2">{room.description}</p>

        <p className="mt-3 text-[#3B2B20] font-semibold">
          ₹{room.price} / night
        </p>

        <p
          className={`mt-2 font-medium ${
            room.availableRooms === 0
              ? "text-red-600"
              : room.availableRooms <= 2
              ? "text-yellow-600"
              : "text-green-700"
          }`}
        >
          {room.availableRooms === 0
            ? "Fully Booked"
            : `${room.availableRooms} Rooms Available`}
        </p>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-[#A67B5B] mt-3 hover:underline"
        >
          {showDetails ? "Hide Details" : "View Details"}
        </button>

        {showDetails && (
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2"><FaBed /> King Beds</div>
            <div className="flex items-center gap-2"><FaWifi /> Free WiFi</div>
            <div className="flex items-center gap-2"><FaTv /> Smart TV</div>
            <div className="flex items-center gap-2"><FaSmokingBan /> No Smoking</div>

            <button
              onClick={() => navigate(`/book/${room.id}`)}
              disabled={room.availableRooms === 0}
              className={`mt-4 w-full py-2 rounded-lg font-semibold transition-all ${
                room.availableRooms === 0
                  ? "bg-gray-300 cursor-not-allowed text-gray-700"
                  : "bg-[#A67B5B] text-white hover:bg-[#8B674A]"
              }`}
            >
              {room.availableRooms === 0 ? "Not Available" : "Book Now"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
