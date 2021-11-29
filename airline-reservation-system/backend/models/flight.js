const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    FlightNo: {
        type: Number,
        required: true,
    },
    DepartureDate: {
        type: Date,
        required: true
    },
    ArrivalDate: {
        type: Date,
        required: true
    },
    DepartureTime: {
        type: String,
        required: true
    },
    ArrivalTime: {
        type: String,
        required: true
    },
    Terminal: {
        type: String,
        required: true
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
    EconomyLuggage : {
        type: Number,
        required: true
    },
    BusinessClassLuggage : {
        type: Number,
        required: true
    },
    FirstClassLuggage  : {
        type: Number,
        required: true
    },
    EconomyPrice: {
        type: Number,
        required: true
    },
    BusinessClassPrice: {
        type: Number,
        required: true
    },
    BusinessClassPrice: {
        type: Number,
        required: true
    },
    DepartureAirport: {
        type: String,
        required: true
    },
    
    ArrivalAirport: {
        type: String,
        required: true
    },
    TakenSeats: {
        type: Array,
        required: true
    }
}, { timestamps: true });

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;