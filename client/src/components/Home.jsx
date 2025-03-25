import { useState } from "react";
import { FaSearch, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const hotels = [
  { name: "Luxury Grand Hotel", location: "Paris, France", rating: 5, image: "https://source.unsplash.com/400x300/?hotel,paris" },
  { name: "Sunset Resort", location: "Maldives", rating: 4.5, image: "https://source.unsplash.com/400x300/?beach,resort" },
  { name: "Mountain Escape Lodge", location: "Switzerland", rating: 4.8, image: "https://source.unsplash.com/400x300/?mountain,hotel" }
];

export default function HomePage() {
  const [search, setSearch] = useState("");
  return (
    <div className="bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <div className="relative h-[500px] bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?luxury,hotel')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-5xl font-bold">Find Your Perfect Stay</h1>
          <p className="text-lg mt-2">Book luxury hotels at the best prices</p>
          <div className="mt-6 flex bg-white rounded-xl p-2 shadow-lg">
            <input type="text" className="px-4 py-2 outline-none text-gray-900 rounded-l-xl" placeholder="Enter destination..." value={search} onChange={(e) => setSearch(e.target.value)} />
            <button className="bg-yellow-500 text-white px-6 py-2 rounded-r-xl flex items-center hover:bg-yellow-600">
              <FaSearch className="mr-2" /> Search
            </button>
          </div>
        </div>
      </div>

      {/* Featured Hotels */}
      <div className="container mx-auto my-12 px-6">
        <h2 className="text-3xl font-semibold text-center mb-6">Featured Hotels</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {hotels.map((hotel, index) => (
            <motion.div whileHover={{ scale: 1.05 }} key={index}>
              <div className="overflow-hidden rounded-2xl shadow-lg bg-white">
                <img src={hotel.image} alt={hotel.name} className="w-full h-52 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-bold">{hotel.name}</h3>
                  <p className="flex items-center text-gray-500 mt-1">
                    <FaMapMarkerAlt className="mr-2 text-red-500" /> {hotel.location}
                  </p>
                  <p className="flex items-center text-yellow-500 mt-2">
                    {[...Array(Math.floor(hotel.rating))].map((_, i) => (
                      <FaStar key={i} />
                    ))} {hotel.rating}
                  </p>
                  <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-6 text-center mt-12">
        <p>&copy; 2025 Hotel Booking. All rights reserved.</p>
      </footer>
    </div>
  );
}
