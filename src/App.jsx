import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";
import RoomList from "./pages/RoomList";
import BookingPage from "./pages/BookingPage";
import BookingSuccess from "./pages/BookingSuccess";

export default function App(){
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/room/:slug" element={<Room/>}/>
       <Route path="/book/:roomId" element={<BookingPage />} />
        <Route path="/success" element={<BookingSuccess/>}/>
      </Routes>
    </div>
  );
}
