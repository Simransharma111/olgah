import React from "react";

export default function AboutUs() {
  return (
    <section className="min-h-screen bg-[#F6F1EA] flex flex-col items-center py-16 px-4">
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl font-serif text-[#A67B5B] mb-6">About Olgah</h1>
        <p className="text-lg text-gray-700 mb-4">
          Olgah is your premium destination for comfortable and affordable stays
          in Manali. We provide well-furnished rooms, personalized services, and
          a seamless booking experience.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Our mission is to make every stay memorable by combining modern amenities,
          great locations, and a touch of local hospitality. Whether you're traveling
          solo, with family, or friends, Olgah has a perfect room for you.
        </p>
        <p className="text-lg text-gray-700">
          Explore Manali hassle-free with Olgah and enjoy the comfort of home away
          from home.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl">
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-2 text-[#A67B5B]">Our Vision</h3>
          <p className="text-gray-700">
            To be the leading choice for travelers seeking quality stays with
            exceptional service in Manali and beyond.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-2 text-[#A67B5B]">Our Values</h3>
          <p className="text-gray-700">
            Comfort, reliability, and customer satisfaction are at the core of
            everything we do. We strive to make your stay safe, easy, and memorable.
          </p>
        </div>
      </div>
    </section>
  );
}
