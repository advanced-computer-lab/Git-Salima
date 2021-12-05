import React, { useState, useEffect } from "react";
import UserFlightCardReservation from "./user-flight-card-reservation";
import axios from "axios";
import { removeBookingAPI, removeSeatsAPI } from "../apis";

import Header from "./Header.js";
import HeaderLinks from "./HeaderLinks.js";
import "../styles/header.css";

const ReservedFlights = () => {
  const [reservedFlights, setReservedFlights] = useState([]);

  const flight = {
    User_ID: localStorage.getItem("userID"),
  };

  useEffect(() => {
    const temp1 = JSON.stringify(flight);
    const temp2 = JSON.parse(temp1);
    axios
      .get("http://localhost:8000/searchBookings", { params: temp2 })
      .then((res) => {
        setReservedFlights(res.data);
      });
  }, []);

  const cancelReservationHandler = async (input) => {
    const temp = JSON.stringify(input);
    const temp2 = JSON.parse(temp);

    const deletedBooking = {
      Flight_ID: temp2._id,
      ReturnFlight_ID: temp2.Return_id,
      TakenSeats: temp2.TakenSeats,
      ReturnTakenSeats: temp2.ReturnTakenSeats,
      Cabin: temp2.Cabin,
      BookingNumber: temp2.BookingNumber,
    };

    removeSeatsAPI(deletedBooking);
    removeBookingAPI(deletedBooking);
  };

  return (
    <div>
      <Header
        color="primary"
        fixed
        brand="Git Salima Airlines"
        rightLinks={<HeaderLinks />}
        // changeColorOnScroll={{
        //   height: 0,
        //   color: "#082567",
        // }}
      />
      <br />
      <br />
      <br />
      <h1 className="colour" style={{ textAlign: "center" }}>
        {" "}
        Hello {localStorage.getItem("userFName")}{" "}
        {localStorage.getItem("userLName")}, here are your reserved flights
      </h1>
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
            TotalPrice={flight.TotalPrice}
            Cabin={flight.Cabin}
            Return_id={flight.Return_id}
            ReturnFlightNo={flight.ReturnFlightNo}
            ReturnDepartureDate={flight.ReturnDepartureDate}
            ReturnArrivalDate={flight.ReturnArrivalDate}
            ReturnDepartureTime={flight.ReturnDepartureTime}
            ReturnArrivalTime={flight.ReturnArrivalTime}
            ReturnEconomySeats={flight.ReturnEconomySeats}
            ReturnBusinessClassSeats={flight.ReturnBusinessClassSeats}
            ReturnFirstClassSeats={flight.ReturnFirstClassSeats}
            ReturnEconomyLuggage={flight.ReturnEconomyLuggage}
            ReturnBusinessClassLuggage={flight.ReturnBusinessClassLuggage}
            ReturnFirstClassLuggage={flight.ReturnFirstClassLuggage}
            ReturnEconomyPrice={flight.ReturnEconomyPrice}
            ReturnBusinessClassPrice={flight.ReturnBusinessClassPrice}
            ReturnFirstClassPrice={flight.ReturnFirstClassPrice}
            ReturnDepartureAirport={flight.ReturnDepartureAirport}
            ReturnArrivalAirport={flight.ReturnArrivalAirport}
            ReturnTakenSeats={flight.ReturnTakenSeats}
            onClickCancel={cancelReservationHandler}
          />
        </div>
      ))}
    </div>
  );
};

export default ReservedFlights;
