const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    Flight_ID: {
        type: String,
        required: true,
    },
    User_ID: {
        type: String,
        required: true,
    },
    TakenSeats: {
        type: Array,
        required: true,
    },
    BookingNumber: {
        type: Number,
        required: true
    },
    Cabin: {
        type: String,
        required: true,
    },
    
}, { timestamps: true });

const Booking = mongoose.model('Bookings', bookingSchema);
module.exports = Booking;