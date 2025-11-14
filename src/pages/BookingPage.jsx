import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const rooms = [
  { id: 1, name: "Deluxe Wooden Room", price: 6500, image: "/images/room1.jpg" },
  { id: 2, name: "Family Suite", price: 7800, image: "/images/room2.jpg" },
  { id: 3, name: "Luxury Cottage", price: 9000, image: "/images/room3.jpg" },
  { id: 4, name: "Budget Room", price: 4000, image: "/images/room4.jpg" },
];

export default function BookingPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const room = rooms.find((r) => r.id === Number(roomId));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/phonepe/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: room.price,
          roomId: roomId,
          userEmail: formData.email,
        }),
      });

      const data = await res.json();

      if (data.success && data.redirectUrl) {
        window.location.href = data.redirectUrl; // redirect to PhonePe
      } else {
        alert("Payment initiation failed");
        console.error(data);
      }
    } catch (err) {
      console.error("Payment request error:", err);
      alert("Something went wrong while starting payment");
    } finally {
      setIsLoading(false);
    }
  };

  if (!room) {
    return (
      <div className="h-screen flex justify-center items-center text-red-600 text-xl">
        Room Not Found
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#F6F1EA] flex justify-center py-16 px-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-3xl w-full overflow-hidden">
        <img src={room.image} className="w-full h-64 object-cover" alt={room.name} />
        <div className="p-8">
          <h2 className="text-3xl font-serif">{room.name}</h2>
          <p className="text-[#A67B5B] mt-2 mb-6">₹{room.price} / night</p>

          <form className="space-y-4" onSubmit={handlePayment}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              onChange={handleChange}
              className="border p-3 w-full rounded-lg"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
              className="border p-3 w-full rounded-lg"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                name="checkIn"
                required
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />
              <input
                type="date"
                name="checkOut"
                required
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />
            </div>
            <select
              name="guests"
              onChange={handleChange}
              className="border p-3 w-full rounded-lg"
            >
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4+ Guests</option>
            </select>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg font-semibold text-white ${
                isLoading ? "bg-gray-400" : "bg-[#A67B5B] hover:bg-[#8B674A]"
              }`}
            >
              {isLoading ? "Processing..." : "Pay Now"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
