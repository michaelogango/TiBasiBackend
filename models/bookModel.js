import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rideType: { type: String, required: true },
    // Add other fields as needed, e.g., pickupLocation, dropoffLocation, etc.
  },
  { timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;