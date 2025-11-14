import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function Room(){
  const {slug} = useParams();
  const [room,setRoom] = useState(null);
  const [form,setForm] = useState({name:"",email:"",phone:"",checkIn:"",checkOut:"",guests:1});
  const navigate = useNavigate();

  useEffect(()=>{ if(slug) axios.get(`http://localhost:5000/api/rooms/${slug}`).then(r=>setRoom(r.data)).catch(()=>{}); },[slug]);

  const submit = async (e)=>{
    e.preventDefault();
    try{
      const nights = 1;
      const res = await axios.post("http://localhost:5000/api/bookings", {roomId:room._id, guest:{name:form.name,email:form.email,phone:form.phone}, checkIn:form.checkIn, checkOut:form.checkOut, nights, guests:form.guests, amountPaid: room.pricePerNight});
      navigate("/success", {state: {booking: res.data}});
    }catch(e){ alert("Booking failed"); }
  };

  if(!room) return <div><Navbar/><div className="p-10">Loading...</div></div>;
  return (
    <div>
      <Navbar/>
      <main className="max-w-4xl mx-auto p-6">
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}}>
          <div className="grid md:grid-cols-2 gap-6">
            <img src={room.images && room.images[0] ? `http://localhost:5000${room.images[0]}` : "https://via.placeholder.com/600x400"} className="rounded shadow" alt=""/>
            <div>
              <h1 className="text-2xl font-bold">{room.title}</h1>
              <p className="mt-2 text-slate-600">{room.description}</p>
              <div className="mt-4 text-lg font-semibold">₹{room.pricePerNight} / night</div>

              <form onSubmit={submit} className="mt-6 space-y-3">
                <input required value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Name" className="w-full p-2 border rounded"/>
                <input required value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email" className="w-full p-2 border rounded"/>
                <div className="grid grid-cols-2 gap-2">
                  <input required type="date" value={form.checkIn} onChange={e=>setForm({...form, checkIn:e.target.value})} className="p-2 border rounded"/>
                  <input required type="date" value={form.checkOut} onChange={e=>setForm({...form, checkOut:e.target.value})} className="p-2 border rounded"/>
                </div>
                <div className="flex items-center gap-2">
                  <input value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} placeholder="Phone" className="w-full p-2 border rounded"/>
                  <input type="number" min="1" value={form.guests} onChange={e=>setForm({...form, guests:parseInt(e.target.value)})} className="w-24 p-2 border rounded"/>
                </div>
                <button className="w-full bg-primary text-white py-2 rounded">Book Now</button>
              </form>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer/>
    </div>
  );
}
