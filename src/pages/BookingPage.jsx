import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BACKEND = import.meta.env.VITE_BACKEND_URL;

const rooms = [
  { id: 1, name: "Deluxe Wooden Room", price: 6500, image: "room1.jpg" },
  { id: 2, name: "Family Suite", price: 7800, image: "room2.jpg" },
  { id: 3, name: "Luxury Cottage", price: 9000, image: "room3.jpg" },
  { id: 4, name: "Budget Room", price: 4000, image: "room2.jpg" },
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

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Load Razorpay SDK
    const sdkLoaded = await loadRazorpay();
    if (!sdkLoaded) {
      alert("Razorpay SDK load failed");
      setIsLoading(false);
      return;
    }

    try {
      // Create order from backend
      const res = await fetch(`${BACKEND}/api/razorpay/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: room.price, roomId }),
      });

      const data = await res.json();
      if (!data.success) {
        alert("Order creation failed");
        return;
      }

      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: "INR",
        name: "OlgaH Manali",
        description: room.name,
        order_id: data.order.id,
        image: "/logo.png",

        handler: async function (response) {
          const verifyRes = await fetch(`${BACKEND}/api/razorpay/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingData: { roomId, ...formData, price: room.price },
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            navigate(`/booking-success/${verifyData.bookingId}`);
          } else {
            alert("Payment failed to verify.");
          }
        },

        prefill: {
          name: formData.name,
          email: formData.email,
        },

        theme: {
          color: "#A67B5B",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (!room) {
    return (
      <div className="h-screen flex justify-center items-center text-xl text-red-600">
        Room Not Found
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#F6F1EA] flex justify-center py-16 px-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-3xl w-full">
        <img src={room.image} className="w-full h-64 object-cover" />

        <div className="p-8">
          <h2 className="text-3xl font-serif">{room.name}</h2>
          <p className="text-[#A67B5B] mt-2 mb-6">₹{room.price} / night</p>

          <form className="space-y-4" onSubmit={handlePayment}>
            <input type="text" name="name" required placeholder="Your Name"
              className="border p-3 w-full rounded-lg" onChange={handleChange} />

            <input type="email" name="email" required placeholder="Email"
              className="border p-3 w-full rounded-lg" onChange={handleChange} />

            <div className="grid grid-cols-2 gap-4">
              <input type="date" name="checkIn" required className="border p-3 rounded-lg"
                onChange={handleChange} />

              <input type="date" name="checkOut" required className="border p-3 rounded-lg"
                onChange={handleChange} />
            </div>

            <select name="guests" className="border p-3 w-full rounded-lg" onChange={handleChange}>
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4+ Guests</option>
            </select>

            <button type="submit"
              className={`w-full py-3 rounded-lg text-white font-semibold ${
                isLoading ? "bg-gray-400" : "bg-[#A67B5B] hover:bg-[#8B674A]"
              }`}>
              {isLoading ? "Processing..." : "Pay Now"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
