import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import RoomCard from "../components/RoomCard";
import RoomList from "../pages/RoomList";
import Footer from "../components/Footer";
import GalleryPage from "./GalleryPage";
import axios from "axios";
const BACKEND = import.meta.env.VITE_BACKEND_URL;
export default function Home(){
  const [rooms,setRooms] = useState([]);
  useEffect(()=>{ axios.get(`${BACKEND}/api/rooms`).then(r=>setRooms(r.data)).catch(()=>{}); },[]);
  return (
    <div>
      <Navbar/>
      <Hero/>
      <section id="rooms">
      <RoomList />
      </section>
     <section id="gallery">
  <GalleryPage />
</section>
      <Footer/>
    </div>
  );
}
