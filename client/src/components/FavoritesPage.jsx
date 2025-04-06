import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import { hotelService } from '../services/hotelService';
import { useAuth } from '../auth/AuthContext';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

export default function FavoritesPage() {
  const [favoriteHotels, setFavoriteHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavoriteHotels = async () => {
      if (!user) {
        navigate('/signIn');
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Check if user has favorites
        if (!user.favorites || user.favorites.length === 0) {
          setFavoriteHotels([]);
          setLoading(false);
          return;
        }

        // Fetch all favorite hotels based on user's favorite IDs
        const hotelPromises = user.favorites.map(id => hotelService.getHotelById(id));
        const hotelsData = await Promise.all(hotelPromises);

        // Format hotel data
        const formattedHotels = hotelsData
          .filter(hotel => hotel) // Filter out any null responses
          .map(hotel => ({
            id: hotel._id || hotel.id,
            name: hotel.basicInfo.name,
            location: {
              city: hotel.location.city,
              country: hotel.location.country
            },
            price: Math.min(...hotel.rooms.map(room => room.pricePerNight)),
            rating: hotel.basicInfo.stars,
            image: hotel.basicInfo.images[0],
            coordinates: hotel.location.coordinates
          }));

        setFavoriteHotels(formattedHotels);
      } catch (err) {
        console.error('Error fetching favorite hotels:', err);
        setError('Failed to load favorite hotels. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if we have a user
    if (user) {
      fetchFavoriteHotels();
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please sign in to view your favorites</h2>
          <Link to="/signIn" className="text-blue-600 hover:text-blue-800">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (favoriteHotels.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No Favorite Hotels Yet</h2>
          <p className="mb-4">Start exploring hotels and add them to your favorites!</p>
          <Link
            to="/hotels"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Browse Hotels
          </Link>
        </div>
      </div>
    );
  }

  const center = favoriteHotels[0]?.coordinates
    ? [favoriteHotels[0].coordinates[1], favoriteHotels[0].coordinates[0]]
    : [0, 0];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Favorite Hotels</h1>

      {/* Map */}
      <div className="mb-8 h-[400px] rounded-lg overflow-hidden shadow-lg">
        <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {favoriteHotels.map(hotel => (
            hotel.coordinates && (
              <Marker
                key={hotel.id}
                position={[hotel.coordinates[1], hotel.coordinates[0]]}
              >
                <Popup>
                  <div>
                    <h3 className="font-bold">{hotel.name}</h3>
                    <p>{hotel.location.city}, {hotel.location.country}</p>
                    <Link
                      to={`/hotel/${hotel.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      View Details
                    </Link>
                  </div>
                </Popup>
              </Marker>
            )
          ))}
        </MapContainer>
      </div>

      {/* Hotel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteHotels.map(hotel => (
          <Link
            key={hotel.id}
            to={`/hotel/${hotel.id}`}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
          >
            <div className="relative h-48">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{hotel.name}</h2>
              <div className="flex items-center text-gray-600 mb-2">
                <FaMapMarkerAlt className="mr-1" />
                <span>{hotel.location.city}, {hotel.location.country}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  {[...Array(hotel.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <div className="text-lg font-bold text-blue-600">
                  ${hotel.price}/night
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 