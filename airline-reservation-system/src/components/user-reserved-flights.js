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
import { searchBookingsAPI } from "../../src/apis";

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
    (async function () {
      try {
        setReservedFlights(await searchBookingsAPI(flight));
      } catch (e) {
        console.error(e);
      }
    })();
    setTimeout(() => setSpinner(false), 4000);
  }, []);
  if (reservedFlights.length > 0) resultsAvailable = true;

  const cancelReservationHandler = async (input) => {
    const temp = JSON.stringify(input);
    const temp2 = JSON.parse(temp);

    let s = ""
    let TakenSeats
    if (temp2.TakenSeats.length > 1) {
      TakenSeats = (temp2.TakenSeats).map((seat) => { s += seat + "," })
    }
    else {
      TakenSeats = s + temp2.TakenSeats[0];
    }


    if (s.charAt(s.length - 1) === ',') {
      s = s.substring(0, s.length - 1)
    }

    let s2 = ""
    let TakenSeats2
    if (temp2.ReturnTakenSeats.length > 1) {
      TakenSeats2 = (temp2.ReturnTakenSeats).map((seat) => {
        let tmp = seat + ""
        for (let i = 0; i < tmp.length; i++) {
          if (tmp.charAt(i) === '.') {
            tmp = tmp.substring(0, i)
          }
        }
        s2 += tmp + ","
      })
    }
    else {
      TakenSeats2 = s2 + temp2.ReturnTakenSeats[0];
    }

    if (s2.charAt(s2.length - 1) === ',') {
      s2 = s2.substring(0, s2.length - 1)
    }

    const u1 = {
      Flight_ID: temp2._id,
      TakenSeats: s,
      Cabin: temp2.Cabin
    };

    const u2 = {
      Flight_ID: temp2.Return_id,
      TakenSeats: s2,
      Cabin: temp2.ReturnCabin
    };

    const deletebooking = {
      BookingNumber: temp2.BookingNumber,
    }

    removeSeatsAPI(u1);
    removeSeatsAPI(u2);
    removeBookingAPI(deletebooking);
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

    <div>
      {!spinner ? (
        <div>
          <Header
            color="primary"
            fixed
            brand="Git Salima Airlines"
            rightLinks={<HeaderLinks />}

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
                      ReturnCabin={flight.ReturnCabin}
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
