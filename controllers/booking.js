import Booking from '../models/bookModel';

// ...

const book = async (req, res) => {
  const { userId, rideType } = req.body; // Adjust the fields as per your requirements

  try {
    // Create a booking entry in the database
    const booking = await Booking.create({
      userId,
      rideType,
    });

    res.status(200).json({ message: 'Booking successful', booking });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get bookings for a specific host (you can modify this route as needed)
app.get('/bookings/:userId', async (req, res) => {
    const userId = req.params.userId;
  
    try {
      // Find bookings for the specified host
      const bookings = await Booking.find({ userId });
  
      res.status(200).json({ bookings });
    } catch (error) {
      console.error('Fetch bookings error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  export {book}