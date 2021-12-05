const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    Flight_ID: {
        type: String,
        required: true,
    },
    ReturnFlight_ID: {
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
    ReturnTakenSeats: {
        type: Array,
        required: true,
    },
    BookingNumber: {
        type: Number,
        required: true,
        index: { unique: true }
    },
    Cabin: {
        type: String,
        required: true},
       
    TotalPrice: {
        type: Number,
        required: true
    }
    
}, { timestamps: true });

const Booking = mongoose.model('Bookings', bookingSchema);
module.exports = Booking;