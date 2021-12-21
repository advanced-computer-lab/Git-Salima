import React, { useState, useEffect } from "react";
import UserFlightCardReservation from "./user-flight-card-reservation";
import axios from "axios";
import { removeBookingAPI, removeSeatsAPI, sendEmailAPI } from "../apis";
import Header from "./Header.js";
import HeaderLinks from "./HeaderLinks.js";
import "../styles/header.css";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import LinearProgress from "@mui/material/LinearProgress";
import { useHistory } from "react-router-dom";

var resultsAvailable = false;
const ReservedFlights = () => {
  const [reservedFlights, setReservedFlights] = useState([]);

  const flight = {
    User_ID: localStorage.getItem("userID"),
  };
  const [spinner, setSpinner] = useState(true);
  const email = {
    to: localStorage.getItem("userEmail"),
    subject: "Flight Cancellation Confirmation",
    text:
      "Dear " +
      localStorage.getItem("userFName") +
      " " +
      localStorage.getItem("userLName") +
      "," +
      "\n" +
      "Your flight with the booking number " +
      localStorage.getItem("bookingNumber") +
      " has been cancelled." +
      "\n" +
      "An amount of " +
      localStorage.getItem("totalPrice") +
      " EGP will be refunded to your account." +
      "\n" +
      "The Git Salima Team",
  };

  useEffect(() => {
    const temp1 = JSON.stringify(flight);
    const temp2 = JSON.parse(temp1);
    axios
      .get("http://localhost:8000/searchBookings", { params: temp2 })
      .then((res) => {
        setReservedFlights(res.data);
      });
    setTimeout(() => setSpinner(false), 4000);
    return <h1>enta sa7 ya kizo ...</h1>;
  }, []);
  if (reservedFlights.length > 0) resultsAvailable = true;

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
    sendEmailAPI(email);
  };

  let history = useHistory();
  const editReservationHandler = async (input) => {
    const temp = JSON.stringify(input);
    const temp2 = JSON.parse(temp);

    localStorage.setItem("BookingNumberToEdit", temp2.BookingNumber);
    history.push("/user-edit-reserved-flights");
  };

  return (
    // spinner && <LinearProgress /> && (
    <div>
      {!spinner ? (
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
          {resultsAvailable === true &&
            localStorage.getItem("type") === "User" && (
              <div>
                <h1 className="colour" style={{ textAlign: "center" }}>
                  {" "}
                  Hello {localStorage.getItem("userFName")}{" "}
                  {localStorage.getItem("userLName")}, here are your reserved
                  flights
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
                      ReturnBusinessClassLuggage={
                        flight.ReturnBusinessClassLuggage
                      }
                      ReturnFirstClassLuggage={flight.ReturnFirstClassLuggage}
                      ReturnEconomyPrice={flight.ReturnEconomyPrice}
                      ReturnBusinessClassPrice={flight.ReturnBusinessClassPrice}
                      ReturnFirstClassPrice={flight.ReturnFirstClassPrice}
                      ReturnDepartureAirport={flight.ReturnDepartureAirport}
                      ReturnArrivalAirport={flight.ReturnArrivalAirport}
                      ReturnTakenSeats={flight.ReturnTakenSeats}
                      onClickCancel={cancelReservationHandler}
                      onClickEdit={editReservationHandler}
                    />
                  </div>
                ))}
              </div>
            )}
          {resultsAvailable === false &&
            localStorage.getItem("type") === "User" && (
              <Stack
                direction="row"
                spacing={1.2}
                style={{ marginLeft: "15%" }}
              >
                {/* <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box> */}
                <h2 style={{ textAlign: "center" }} className="colour">
                  You have not yet booked a flight. Explore a destination
                </h2>
                <Link
                  href="/user-home"
                  underline="always"
                  sx={{ fontSize: "30px", fontFamily: "Philosopher" }}
                >
                  {"here."}
                </Link>
              </Stack>
            )}
          {localStorage.getItem("type") === "Guest" && (
            <Stack direction="row" spacing={1.2} style={{ marginLeft: "10%" }}>
              <h2 style={{ textAlign: "center" }} className="colour">
                You should be logged in in order to see your reserved Flights.
                Login in
              </h2>
              <Link
                href="/"
                underline="always"
                sx={{ fontSize: "30px", fontFamily: "Philosopher" }}
              >
                {"here."}
              </Link>
            </Stack>
          )}
        </div>
      ) : (
        <LinearProgress />
      )}
    </div>
  );
};

export default ReservedFlights;
