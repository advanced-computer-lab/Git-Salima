import React, { useState, useEffect } from "react";
import UserFlightCardItinerary from "./user-flight-card-itinerary";
import UserConfirmationCard from "./user-confirmation-card";
import axios from "axios";

const FlightsItinerary = () => {

    const [departureFlight, setDepartureFlight] = useState([]);
    const [returnFlight, setReturnFlight] = useState([]);

    // const temp = JSON.parse(localStorage.getItem("departureSeats"))

    const departureSeats = JSON.parse(localStorage.getItem("departureSeats"))
    const returnSeats = JSON.parse(localStorage.getItem("returnSeats"))

    let departureFlightSeats = "";
    let returnFlightSeats = "";

    let departureBookingNumber = "";
    let returnBookingNumber = "";

    useEffect(() => {

        const departureFlight = {
            _id: localStorage.getItem("FlightIDAro")
        }
        const returnFlight = {
            _id: localStorage.getItem("FlightIDKizo")
        }
        axios.get("http://localhost:8000/search", { params: departureFlight })
            .then((res) => {
                setDepartureFlight(res.data);
            });
        axios.get("http://localhost:8000/search", { params: returnFlight })
            .then((res) => {
                setReturnFlight(res.data);
            });

    }, []);

    departureBookingNumber = departureBookingNumber + localStorage.getItem("FlightNoAro") + "-";
    returnBookingNumber = returnBookingNumber + localStorage.getItem("FlightNoKizo") + "-";

    for (let seat of departureSeats) {
        departureFlightSeats = departureFlightSeats + " " + seat.row + seat.number;
        departureBookingNumber += seat.row + seat.number;
    }
    for (let seat of returnSeats) {
        returnFlightSeats = returnFlightSeats + " " + seat.row + seat.number;
        returnBookingNumber += seat.row + seat.number;
    }

    const totalPrice = (localStorage.getItem("departureFlightPrice") * departureSeats.length) +
        (localStorage.getItem("returnFlightPrice") * returnSeats.length);

    localStorage.setItem("totalPrice", totalPrice);
    localStorage.setItem("departureBookingNumber", departureBookingNumber);
    localStorage.setItem("returnBookingNumber", returnBookingNumber);

    // {localStorage.getItem("Username")}

    return (
        <div>
            <h1 style={{ textAlign: 'center' }} > Please Mario confirm your flight </h1>
            <br />
            <h3>Departure Flight</h3>
            {departureFlight.map((flight) => (
                <div>
                    <UserFlightCardItinerary
                        _id={flight._id}
                        FlightNo={flight.FlightNo}
                        DepartureDate={flight.DepartureDate}
                        ArrivalDate={flight.ArrivalDate}
                        DepartureTime={flight.DepartureTime}
                        ArrivalTime={flight.ArrivalTime}
                        Terminal={flight.Terminal}
                        EconomySeats={flight.EconomySeats}
                        BusinessClassSeats={flight.BusinessClassSeats}
                        Seats={departureFlightSeats}
                        FirstClassSeats={flight.FirstClassSeats}
                        EconomyLuggage={flight.EconomyLuggage}
                        BusinessClassLuggage={flight.BusinessClassLuggage}
                        FirstClassLuggage={flight.FirstClassLuggage}
                        DepartureAirport={flight.DepartureAirport}
                        ArrivalAirport={flight.ArrivalAirport} />
                </div>
            ))}
            <br />
            <h3>Return Flight</h3>
            {returnFlight.map((flight) => (
                <div>
                    <UserFlightCardItinerary
                        _id={flight._id}
                        FlightNo={flight.FlightNo}
                        DepartureDate={flight.DepartureDate}
                        ArrivalDate={flight.ArrivalDate}
                        DepartureTime={flight.DepartureTime}
                        ArrivalTime={flight.ArrivalTime}
                        Terminal={flight.Terminal}
                        EconomySeats={flight.EconomySeats}
                        BusinessClassSeats={flight.BusinessClassSeats}
                        Seats={returnFlightSeats}
                        FirstClassSeats={flight.FirstClassSeats}
                        EconomyLuggage={flight.EconomyLuggage}
                        BusinessClassLuggage={flight.BusinessClassLuggage}
                        FirstClassLuggage={flight.FirstClassLuggage}
                        DepartureAirport={flight.DepartureAirport}
                        ArrivalAirport={flight.ArrivalAirport} />
                </div>
            ))}
            <br />
            {
                <div>
                    <UserConfirmationCard />
                </div>
            }
        </div>
    );
};
export default FlightsItinerary;