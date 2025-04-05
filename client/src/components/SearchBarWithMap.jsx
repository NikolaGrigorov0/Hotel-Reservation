import { useLocation, useNavigate } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';
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

  const destination = searchParams.get('destination') || '';
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  const guests = searchParams.get('guests') || '1';

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
    {
      id: 4,
      name: "Bali Sunset Villas",
      location: "Bali, Indonesia",
      price: 260,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e26c",
      coordinates: [-8.5005, 115.1325],
    },
    {
      id: 5,
      name: "Seaside Retreat",
      location: "Santorini, Greece",
      price: 275,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1605276374104-dee2a0edebdb",
      coordinates: [36.3932, 25.4615],
    },
    {
      id: 6,
      name: "Blue Lagoon Hotel",
      location: "Athens, Greece",
      price: 230,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1570219136620-07e0deaea2d5",
      coordinates: [37.9838, 23.7275],
    },
    {
      id: 7,
      name: "Skyline Hotel",
      location: "Tokyo, Japan",
      price: 300,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d",
      coordinates: [35.682839, 139.759455],
    },
    {
      id: 8,
      name: "Cherry Blossom Resort",
      location: "Kyoto, Japan",
      price: 280,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1580156115310-62366b6bb998",
      coordinates: [35.0116, 135.7681],
    },
  ];

  const filteredHotels = hotels.filter(hotel =>
    hotel.location.toLowerCase().includes(destination.toLowerCase()) ||
    hotel.name.toLowerCase().includes(destination.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">Hotels in {destination || 'your destination'}</h1>
        <p className="text-gray-600">{checkIn && checkOut ? `${new Date(checkIn).toLocaleDateString()} - ${new Date(checkOut).toLocaleDateString()} • ${guests} guest${guests > 1 ? 's' : ''}` : 'Select dates to see prices'}</p>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3 space-y-6">
            {filteredHotels.map(hotel => (
              <div key={hotel.id} className="bg-white rounded-xl shadow-md overflow-hidden flex">
                <img src={hotel.image} alt={hotel.name} className="w-1/3 object-cover" />
                <div className="w-2/3 p-6">
                  <h2 className="text-xl font-bold">{hotel.name}</h2>
                  <p className="text-gray-600 my-2">{hotel.location}</p>
                  <p className="text-2xl font-bold text-blue-600">${hotel.price} <span className="text-sm text-gray-500">/ night</span></p>
                </div>
              </div>
            ))}
          </div>
          <div className="md:w-1/3 h-[500px] sticky top-24">
            <MapContainer 
              center={filteredHotels.length ? filteredHotels[0].coordinates : [0, 0]} 
              zoom={filteredHotels.length ? 10 : 2} 
              className="h-full w-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {filteredHotels.map(hotel => (
                <Marker 
                key={hotel.id} 
                position={hotel.coordinates} 
                icon={L.divIcon({
                  className: '',
                  html: `<div class="bg-white bg-opacity-90 text-black py-2 rounded-lg text-sm font-semibold shadow-md">
                    $${hotel.price}
                  </div>`,
                  iconSize: [60, 30],
                  iconAnchor: [30, 15],
                })}              
                >
                  <Popup>
                    <div className="flex w-[320px] p-2">
                      <div className="flex-1 pr-3">
                        <h3 className="text-lg font-semibold mb-1">{hotel.name}</h3>
                        <p className="text-gray-600">{hotel.location}</p>
                        <p className="text-gray-800 mt-1 font-medium">Price: ${hotel.price}/night</p>
                        <p className="text-gray-800">Rating: {hotel.rating} ⭐</p>
                      </div>
                      <img src={hotel.image} alt={hotel.name} className="w-[150px] h-[110px]  object-cover rounded-md"/>
                    </div>
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
