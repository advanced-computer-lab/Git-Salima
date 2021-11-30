import React, { useState, useEffect } from "react";
import UserFlightCardItinerary from "./user-flight-card-itinerary";
import UserConfirmationCard from "./user-confirmation-card";
import axios from "axios";

const FlightsItinerary = () => {

    const [depFlight, setDepFlight] = useState([]);
    const [returnFlight, setReturnFlight] = useState([]);

    const departureSeats = ["A1", "A2", "B1"]; //localStorage.getItem("departureSeats")
    const returnSeats = ["C1", "C2"]; //localStorage.getItem("returnSeats")

    let departureFlightSeats = "";
    let returnFlightSeats = "";

    for (let seat of departureSeats) {
        departureFlightSeats = departureFlightSeats + " " + seat;
    }
    for (let seat of returnSeats) {
        returnFlightSeats = returnFlightSeats + " " + seat;
    }

    useEffect(() => {

        const departureFlight = {
            _id: localStorage.getItem("FlightIDAro")
        }
        const returnFlight = {
            _id: localStorage.getItem("FlightIDKizo")
        }
        axios.get("http://localhost:8000/search", { params: departureFlight })
            .then((res) => {
                setDepFlight(res.data);
            });
        axios.get("http://localhost:8000/search", { params: returnFlight })
            .then((res) => {
                setReturnFlight(res.data);
            });

    }, []);

    const totalPrice = (localStorage.getItem("departureFlightPrice") * departureSeats.length) +
        (localStorage.getItem("returnFlightPrice") * returnSeats.length);

    localStorage.setItem("totalPrice", totalPrice)

    return (
        <div>
            <h1>Departure Flight</h1>
            {depFlight.map((flight) => (
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
            <h1>Return Flight</h1>
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