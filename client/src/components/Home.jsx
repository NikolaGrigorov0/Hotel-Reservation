import { useState } from 'react';
import { FaSearch, FaCalendarAlt, FaUser, FaStar, FaWifi, FaSwimmingPool, FaParking, FaUtensils } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const HomePage = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [destination, setDestination] = useState('');

  const featuredHotels = [
    {
      id: 1,
      name: "Dominion Hotel",
      location: "New York, USA",
      price: 250,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
    },
    {
      id: 2,
      name: "Tropical Paradise Resort",
      location: "Bali, Indonesia",
      price: 180,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    },
    {
      id: 3,
      name: "Mountain View Lodge",
      location: "Swiss Alps, Switzerland",
      price: 210,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
    },
  ];

  const amenities = [
    { icon: <FaWifi className="text-2xl" />, name: "Free WiFi" },
    { icon: <FaSwimmingPool className="text-2xl" />, name: "Swimming Pool" },
    { icon: <FaParking className="text-2xl" />, name: "Free Parking" },
    { icon: <FaUtensils className="text-2xl" />, name: "Restaurant" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[500px] bg-blue-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/80"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Find Your Perfect Stay</h1>
            <p className="text-xl text-blue-100 mb-8">Discover and book luxury hotels around the world</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="bg-white rounded-xl shadow-xl p-6 border border-blue-100">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Book your dream hotel</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium text-blue-800 mb-1">Destination</label>
              <div className="relative">
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Where are you going?"
                  className="w-full p-3 pl-10 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-blue-50"
                />
                <FaSearch className="absolute left-3 top-3.5 text-blue-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">Check-in</label>
              <div className="relative">
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full p-3 pl-10 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-blue-50"
                />
                <FaCalendarAlt className="absolute left-3 top-3.5 text-blue-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">Check-out</label>
              <div className="relative">
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full p-3 pl-10 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-blue-50"
                />
                <FaCalendarAlt className="absolute left-3 top-3.5 text-blue-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">Guests</label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  className="w-full p-3 pl-10 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-blue-50"
                />
                <FaUser className="absolute left-3 top-3.5 text-blue-400" />
              </div>
            </div>
          </div>
          <Link
            to={{
              pathname: "/search",
              search: `?destination=${encodeURIComponent(destination)}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
            }}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition duration-300 shadow-md hover:shadow-lg text-center block"
          >
            Search Hotels
          </Link>
        </div>
      </div>

      {/* Featured Hotels */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4 text-blue-900">Featured Hotels</h2>
        <p className="text-center text-blue-600 mb-12">Discover our most popular destinations</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredHotels.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02] group">
              <div className="h-60 overflow-hidden relative">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute bottom-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  ${hotel.price}/night
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-blue-900">{hotel.name}</h3>
                  <div className="flex items-center bg-blue-100 px-2 py-1 rounded">
                    <FaStar className="text-yellow-500 mr-1" />
                    <span className="font-medium text-blue-800">{hotel.rating}</span>
                  </div>
                </div>
                <p className="text-blue-600 mb-4">{hotel.location}</p>
                <button className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800 py-2 px-4 rounded-lg font-medium transition duration-300">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Amenities Section */}
      <div className="bg-blue-800 py-16 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Our Amenities</h2>
          <p className="text-center text-blue-200 mb-12">Everything you need for a perfect stay</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {amenities.map((amenity, index) => (
              <div key={index} className="flex flex-col items-center p-6 bg-blue-700 rounded-xl hover:bg-blue-600 transition-colors">
                <div className="text-white mb-3">{amenity.icon}</div>
                <h3 className="text-lg font-medium">{amenity.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for an unforgettable experience?</h2>
          <p className="text-xl mb-8 text-blue-100">Join thousands of satisfied guests who've enjoyed our premium hospitality</p>
          <button className="bg-white text-blue-800 hover:bg-blue-100 py-3 px-8 rounded-lg font-bold text-lg transition duration-300 shadow-lg hover:shadow-xl">
            Book Your Stay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;