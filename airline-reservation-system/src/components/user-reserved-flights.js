import React, { useState, useEffect } from "react";
import UserFlightCardReservation from "./user-flight-card-reservation";
import axios from "axios";

const ReservedFlights = () => {
    const [reservedFlights, setReservedFlights] = useState([]);

    const flight = {
        User_id: 123 //localStorage.getItem("UserID");
    };

    useEffect(() => {
        const temp1 = JSON.stringify(flight);
        const temp2 = JSON.parse(temp1);
        axios.get("http://localhost:8000/searchBookings", { params: temp2 })
            .then((res) => {
                setReservedFlights(res.data);
            });
    }, []);

    const cancelReservationHandler = async (input) => {
        //kizo kamel hena
    };

    // {localStorage.getItem("Username")}

    return (
        <div>
            <h1 style={{ textAlign: 'center' }} > Hello Mario, here are your reserved flights </h1>
            <br />
            {reservedFlights.map((flight) => (
                <div>
                    <UserFlightCardReservation
                        _id={flight._id}
                        FlightNo={flight.FlightNo}
                        DepartureDate={flight.DepartureDate}
                        ArrivalDate={flight.ArrivalDate}
                        DepartureTime={flight.DepartureTime}
                        ArrivalTime={flight.ArrivalTime}
                        EconomySeats={flight.EconomySeats}
                        BusinessClassSeats={flight.BusinessClassSeats}
                        FirstClassSeats={flight.FirstClassSeats}
                        EconomyLuggage={flight.EconomyLuggage}
                        BusinessClassLuggage={flight.BusinessClassLuggage}
                        FirstClassLuggage={flight.FirstClassLuggage}
                        EconomyPrice={flight.EconomyPrice}
                        BusinessClassPrice={flight.BusinessClassPrice}
                        FirstClassPrice={flight.FirstClassPrice}
                        DepartureAirport={flight.DepartureAirport}
                        ArrivalAirport={flight.ArrivalAirport}
                        TakenSeats={flight.TakenSeats}
                        BookingNumber={flight.BookingNumber}
                        Cabin={flight.Cabin}
                        onClickCancel={cancelReservationHandler}
                    />
                </div>
            ))}
        </div>
    );
};

export default ReservedFlights;
