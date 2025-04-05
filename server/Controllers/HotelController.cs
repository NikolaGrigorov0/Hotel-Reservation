using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoDB.Driver.GeoJsonObjectModel;
using HotelReservation.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HotelReservation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelController : ControllerBase
    {
        private readonly IMongoCollection<Hotel> _hotels;

        public HotelController(IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase("hotelReservationDB");
            _hotels = database.GetCollection<Hotel>("hotels");

            // Create geospatial index if it doesn't exist
            var indexKeysDefinition = Builders<Hotel>.IndexKeys.Geo2DSphere(h => h.Location.Coordinates);
            _hotels.Indexes.CreateOne(new CreateIndexModel<Hotel>(indexKeysDefinition));
        }

        // GET: api/hotel
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hotel>>> GetAllHotels()
        {
            var hotels = await _hotels.Find(hotel => true).ToListAsync();
            return Ok(hotels);
        }

        // GET: api/hotel/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Hotel>> GetHotel(string id)
        {
            var hotel = await _hotels.Find(h => h.Id == id).FirstOrDefaultAsync();
            if (hotel == null)
            {
                return NotFound();
            }
            return Ok(hotel);
        }

        // POST: api/hotel
        [HttpPost]
        public async Task<ActionResult<Hotel>> CreateHotel([FromBody] Hotel hotel)
        {
            await _hotels.InsertOneAsync(hotel);
            return CreatedAtAction(nameof(GetHotel), new { id = hotel.Id }, hotel);
        }

        // PUT: api/hotel/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateHotel(string id, [FromBody] Hotel updatedHotel)
        {
            var hotel = await _hotels.Find(h => h.Id == id).FirstOrDefaultAsync();
            if (hotel == null)
            {
                return NotFound();
            }

            updatedHotel.Id = id; // Ensure the ID remains the same
            await _hotels.ReplaceOneAsync(h => h.Id == id, updatedHotel);
            return NoContent();
        }

        // DELETE: api/hotel/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHotel(string id)
        {
            var hotel = await _hotels.Find(h => h.Id == id).FirstOrDefaultAsync();
            if (hotel == null)
            {
                return NotFound();
            }

            await _hotels.DeleteOneAsync(h => h.Id == id);
            return NoContent();
        }

        // GET: api/hotel/search?city={city}
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Hotel>>> SearchHotels([FromQuery] string city)
        {
            var filter = Builders<Hotel>.Filter.Eq(h => h.Location.City, city);
            var hotels = await _hotels.Find(filter).ToListAsync();
            return Ok(hotels);
        }

        // GET: api/hotel/nearby?longitude={longitude}&latitude={latitude}&maxDistance={maxDistance}
        [HttpGet("nearby")]
        public async Task<ActionResult<IEnumerable<Hotel>>> GetNearbyHotels(
            [FromQuery] double longitude,
            [FromQuery] double latitude,
            [FromQuery] double maxDistance = 5000) // Default 5km
        {
            var point = new GeoJsonPoint<GeoJson2DCoordinates>(new GeoJson2DCoordinates(longitude, latitude));
            var filter = Builders<Hotel>.Filter.NearSphere(h => h.Location.Coordinates, point, maxDistance);
            var hotels = await _hotels.Find(filter).ToListAsync();
            return Ok(hotels);
        }
    }
} 