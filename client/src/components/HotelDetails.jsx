import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const mockHotelData = [
  {
    id: 1,
    name: "Dominion Hotel",
    location: "New York, USA",
    price: 250,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
    description: "Located in the heart of New York, Dominion Hotel offers luxury and comfort within walking distance of major landmarks.",
  },
  {
    id: 2,
    name: "Tropical Paradise Resort",
    location: "Bali, Indonesia",
    price: 180,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    description: "Enjoy the tropical breeze in this beachside resort with top-class service and stunning views.",
  },
  {
    id: 3,
    name: "Mountain View Lodge",
    location: "Swiss Alps, Switzerland",
    price: 210,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
    description: "Breathtaking alpine views and cozy, stylish rooms—perfect for a relaxing retreat.",
  }
];

const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const found = mockHotelData.find((h) => h.id === parseInt(id));
    setHotel(found);
  }, [id]);

  if (!hotel) return <div className="text-center py-20 text-lg">Loading hotel details...</div>;

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <img src={hotel.image} alt={hotel.name} className="w-full h-[400px] object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">{hotel.name}</h1>
          <p className="text-blue-600 mb-2">{hotel.location}</p>
          <p className="text-lg text-blue-800 mb-4">${hotel.price} / night</p>
          <p className="text-blue-700 mb-4">{hotel.description}</p>
          <div className="text-yellow-500 flex items-center gap-2">
            ⭐ {hotel.rating}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
