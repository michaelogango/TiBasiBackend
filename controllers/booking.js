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

  export {book}