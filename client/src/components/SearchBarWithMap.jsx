import { useLocation, useNavigate } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaCalendarAlt, FaUser } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  
  // Get search parameters with fallbacks
  const destination = searchParams.get('destination') || '';
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  const guests = searchParams.get('guests') || '1';

  // Sample hotel data - in a real app, this would come from your API
  const hotels = [
    {
      id: 1,
      name: "Dominion Hotel",
      location: "New York, USA",
      price: 250,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      coordinates: [40.7128, -74.0060],
    },
    {
      id: 2,
      name: "Tropical Paradise Resort",
      location: "Bali, Indonesia",
      price: 180,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      coordinates: [-8.4095, 115.1889],
    },
    {
      id: 3,
      name: "Mountain View Lodge",
      location: "Swiss Alps, Switzerland",
      price: 210,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
      coordinates: [46.8182, 8.2275],
    },
  ];

  // Filter hotels based on search (simplified for demo)
  const filteredHotels = hotels.filter(hotel => 
    hotel.location.toLowerCase().includes(destination.toLowerCase()) ||
    hotel.name.toLowerCase().includes(destination.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Bar (fixed at top) */}
      <div className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Destination */}
            <div className="md:col-span-4">
              <div className="relative">
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => navigate(`/search?destination=${e.target.value}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`)}
                  placeholder="Where are you going?"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg"
                />
                <FaMapMarkerAlt className="absolute left-3 top-3.5 text-blue-500" />
              </div>
            </div>
            
            {/* Dates and Guests */}
            <div className="md:col-span-6 grid grid-cols-3 gap-4">
              <div className="relative">
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => navigate(`/search?destination=${destination}&checkIn=${e.target.value}&checkOut=${checkOut}&guests=${guests}`)}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg"
                />
                <FaCalendarAlt className="absolute left-3 top-3.5 text-blue-500" />
              </div>
              <div className="relative">
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => navigate(`/search?destination=${destination}&checkIn=${checkIn}&checkOut=${e.target.value}&guests=${guests}`)}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg"
                />
                <FaCalendarAlt className="absolute left-3 top-3.5 text-blue-500" />
              </div>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  value={guests}
                  onChange={(e) => navigate(`/search?destination=${destination}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${e.target.value}`)}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg"
                />
                <FaUser className="absolute left-3 top-3.5 text-blue-500" />
              </div>
            </div>
            
            {/* Search Button */}
            <div className="md:col-span-2">
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Results Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Hotels in {destination || 'your destination'}</h1>
          <p className="text-gray-600">
            {checkIn && checkOut 
              ? `${new Date(checkIn).toLocaleDateString()} - ${new Date(checkOut).toLocaleDateString()} • ${guests} ${guests === '1' ? 'guest' : 'guests'}`
              : 'Select dates to see prices'}
          </p>
        </div>

        {/* Results Grid */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Hotels List */}
          <div className="md:w-2/3 space-y-6">
            {filteredHotels.length > 0 ? (
              filteredHotels.map(hotel => (
                <div key={hotel.id} className="bg-white rounded-xl shadow-md overflow-hidden flex">
                  <div className="w-1/3">
                    <img 
                      src={hotel.image} 
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-2/3 p-6">
                    <div className="flex justify-between">
                      <h2 className="text-xl font-bold">{hotel.name}</h2>
                      <div className="flex items-center bg-blue-100 px-2 py-1 rounded">
                        <FaStar className="text-yellow-500 mr-1" />
                        <span>{hotel.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 my-2">{hotel.location}</p>
                    <div className="mt-4 flex justify-between items-end">
                      <div>
                        <p className="text-sm text-gray-500">Price for {guests} {guests === '1' ? 'guest' : 'guests'}</p>
                        <p className="text-2xl font-bold text-blue-600">${hotel.price}</p>
                        <p className="text-sm text-gray-500">per night</p>
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg">
                        View Deal
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <h3 className="text-xl font-bold mb-2">No hotels found</h3>
                <p className="text-gray-600">Try adjusting your search criteria</p>
              </div>
            )}
          </div>

          {/* Map */}
          <div className="md:w-1/3 h-[500px] sticky top-24">
            <MapContainer 
              center={filteredHotels[0]?.coordinates || [0, 0]} 
              zoom={filteredHotels.length ? 10 : 2} 
              style={{ height: '100%', width: '100%', borderRadius: '0.75rem' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {filteredHotels.map(hotel => (
                <Marker key={hotel.id} position={hotel.coordinates}>
                  <Popup>
                    <div className="font-bold">{hotel.name}</div>
                    <div>${hotel.price}/night</div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;