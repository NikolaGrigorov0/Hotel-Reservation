import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaPhone, FaEnvelope, FaChevronLeft, FaChevronRight, FaHeart } from 'react-icons/fa';
import { hotelService } from '../services/hotelService';
import { useAuth } from '../auth/AuthContext';

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, updateUserFavorites } = useAuth();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        setLoading(true);
        const data = await hotelService.getHotelById(id);
        setHotel(data);
        // Check if hotel is in user's favorites
        if (user?.favorites) {
          setIsFavorite(user.favorites.includes(id));
        }
      } catch (err) {
        console.error('Error fetching hotel:', err);
        setError('Failed to load hotel details');
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id, user]);

  const showFeedback = (message, isError = false) => {
    setFeedbackMessage({ text: message, isError });
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  const handleFavoriteClick = async () => {
    if (!user) {
      navigate('/signIn', { state: { from: `/hotel/${id}` } });
      return;
    }

    try {
      setIsTogglingFavorite(true);
      await hotelService.toggleFavorite(id);
      
      // Update user favorites in context
      await updateUserFavorites();
      
      // Toggle local state
      setIsFavorite(!isFavorite);
      
      showFeedback(
        isFavorite ? 'Removed from favorites' : 'Added to favorites',
        false
      );
    } catch (err) {
      console.error('Error toggling favorite:', err);
      showFeedback('Failed to update favorites. Please try again.', true);
    } finally {
      setIsTogglingFavorite(false);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === hotel.basicInfo.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? hotel.basicInfo.images.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error || 'Hotel not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Feedback Message */}
      {feedbackMessage && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
            feedbackMessage.isError ? 'bg-red-500' : 'bg-green-500'
          } text-white transition-opacity duration-300`}
        >
          {feedbackMessage.text}
        </div>
      )}

      {/* Hero Section with Image Carousel */}
      <div className="relative h-[600px] bg-black">
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={hotel.basicInfo.images[currentImageIndex]}
            alt={`${hotel.basicInfo.name} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Navigation Arrows */}
        {hotel.basicInfo.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition-all"
            >
              <FaChevronLeft className="text-2xl text-black" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition-all"
            >
              <FaChevronRight className="text-2xl text-black" />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-4 py-2 rounded-full text-white">
          {currentImageIndex + 1} / {hotel.basicInfo.images.length}
        </div>

        {/* Hotel Name and Favorite Button */}
        <div className="absolute top-0 left-0 right-0 p-8 bg-gradient-to-b from-black to-transparent">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-white">{hotel.basicInfo.name}</h1>
              <div className="flex items-center mt-2">
                <FaStar className="text-yellow-400 mr-1" />
                <span className="text-white">{hotel.basicInfo.stars} stars</span>
              </div>
            </div>
            <button
              onClick={handleFavoriteClick}
              disabled={isTogglingFavorite}
              className={`
                absolute top-4 right-4 
                p-3 rounded-full 
                transform transition-all duration-300
                hover:scale-110
                ${isTogglingFavorite ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                ${isFavorite 
                  ? 'bg-red-500 text-white hover:bg-red-600 hover:shadow-lg' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 hover:shadow-lg'
                }
              `}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <FaHeart 
                className={`
                  text-2xl transform transition-all duration-300
                  ${isFavorite ? 'text-white scale-110' : 'text-gray-600'}
                  ${isTogglingFavorite ? 'animate-pulse' : ''}
                  hover:scale-110
                `}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Hotel Info and Amenities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Hotel Info */}
          <div>
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <p className="text-gray-600 mb-6">{hotel.basicInfo.description}</p>
              
              <h2 className="text-2xl font-bold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 gap-4">
                {hotel.basicInfo.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center text-gray-600">
                    <span className="mr-2">•</span>
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Location & Contact */}
          <div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Location & Contact</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-blue-500 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">{hotel.location.street}</p>
                    <p className="text-gray-600">{hotel.location.city}, {hotel.location.country}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaPhone className="text-blue-500 mr-3" />
                  <p className="text-gray-600">{hotel.contact.phone}</p>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-blue-500 mr-3" />
                  <p className="text-gray-600">{hotel.contact.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Available Rooms Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Available Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotel.rooms.map((room, index) => (
              <div key={index} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {/* Room Image */}
                {room.images && room.images.length > 0 && (
                  <div className="relative h-48">
                    <img
                      src={room.images[0]}
                      alt={`${room.type} room`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-bold text-lg">{room.type}</h3>
                  <p className="text-gray-600 mt-1">{room.description}</p>
                  <div className="mt-2">
                    <p className="text-gray-600">Capacity: {room.capacity} guests</p>
                    <p className="text-blue-600 font-bold mt-1">${room.pricePerNight}/night</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
