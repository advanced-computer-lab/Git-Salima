const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    FlightID: {
        type: String,
        required: true,
    },
    UserID: {
        type: String,
        required: true,
    },
    Seats: {
        type: Array,
        required: true,
    },
    EconomySeats: {
        type: Number,
        required: true
    },
    BusinessClassSeats: {
        type: Number,
        required: true
    },
    FirstClassSeats: {
        type: Number,
        required: true
    },
    
}, { timestamps: true });

const Booking = mongoose.model('Bookings', bookingSchema);
module.exports = Booking;