const API_URL = 'http://localhost:5088/api/hotel';

export const hotelService = {
  getAllHotels: async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching hotels:', error);
      throw error;
    }
  },

  searchHotels: async (query) => {
    try {
      const response = await fetch(`${API_URL}/search?city=${query}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error searching hotels:', error);
      throw error;
    }
  }
}; 