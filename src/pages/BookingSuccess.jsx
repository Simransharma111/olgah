import React from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BookingSuccess(){
  const loc = useLocation();
  const booking = loc.state?.booking;
  return (
    <div>
      <Navbar/>
      <main className="max-w-4xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold">Booking Confirmed</h1>
        <p className="mt-4">Thank you {booking?.guest?.name || ""}. Your booking reference is <strong>{booking?._id}</strong></p>
        <div className="mt-6"><Link to="/" className="text-primary underline">Back to home</Link></div>
      </main>
      <Footer/>
    </div>
  );
}
