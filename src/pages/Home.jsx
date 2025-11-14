import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import RoomCard from "../components/RoomCard";
import RoomList from "../pages/RoomList";
import Footer from "../components/Footer";
import axios from "axios";

export default function Home(){
  const [rooms,setRooms] = useState([]);
  useEffect(()=>{ axios.get("http://localhost:5000/api/rooms").then(r=>setRooms(r.data)).catch(()=>{}); },[]);
  return (
    <div>
      <Navbar/>
      <Hero/>
      <RoomList />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <section id="rooms">
          <h2 className="text-2xl font-bold mb-4">Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map(r=> <RoomCard key={r._id} room={r} />)}
          </div>
        </section>
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <img src="https://via.placeholder.com/400x300" className="w-full h-40 object-cover rounded" alt=""/>
            <img src="https://via.placeholder.com/400x300" className="w-full h-40 object-cover rounded" alt=""/>
            <img src="https://via.placeholder.com/400x300" className="w-full h-40 object-cover rounded" alt=""/>
            <img src="https://via.placeholder.com/400x300" className="w-full h-40 object-cover rounded" alt=""/>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  );
}
