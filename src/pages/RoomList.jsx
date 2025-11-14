import React from "react";
import RoomCard from "../components/RoomCard";

// Unified room data
const rooms = [
  {
    id: 1,
    name: "Deluxe Wooden Room",
    description: "A cozy and elegant room with wooden interiors.",
    images: ["room1.jpg"],
    price: 6500,
    availableRooms: 3,
  },
  {
    id: 2,
    name: "Family Suite",
    description: "Spacious suite with two bedrooms and mountain view.",
    images: ["room2.jpg"],
    price: 7800,
    availableRooms: 0,
  },
  {
    id: 3,
    name: "Luxury Cottage",
    description: "Private cottage with balcony and fireplace.",
    images: ["room1.jpg"],
    price: 9000,
    availableRooms: 1,
  },
  {
    id: 4,
    name: "Budget Room",
    description: "Comfortable stay for value travelers.",
    images: ["/images/room4.jpg"],
    price: 4000,
    availableRooms: 5,
  },
];

export default function RoomList() {
  return (
    <section className="bg-[#F5EFE6] py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-serif text-center text-[#3B2B20] mb-12">
          Explore Our Rooms
        </h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </section>
  );
}
