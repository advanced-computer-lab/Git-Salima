import React, { useState, useEffect } from "react";
import UserFlightCardItinerary from "./user-flight-card-itinerary";
import UserConfirmationCardEdit from "./user-confirmation-card-edit";
import axios from "axios";
import Header from "./Header.js";
import HeaderLinks from "./HeaderLinks.js";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import LinearProgress from "@mui/material/LinearProgress";

import "../styles/header.css";
const steps = [
    "Choose Outbound Flight",
    "Choose Return Flight",
    "Choose your Seats",
    "Confirm your Flights",
];

const FlightsItinerary = () => {
    const [returnFlight, setReturnFlight] = useState([]);
    const [spinner, setSpinner] = useState(true);
    const returnSeats = JSON.parse(localStorage.getItem("returnSeats"));

    let returnFlightSeats = "";

    useEffect(() => {
        const returnFlight = {
            _id: localStorage.getItem("FlightIDKizo"),
        };

        axios
            .get("http://localhost:8000/search", { params: returnFlight })
            .then((res) => {
                setReturnFlight(res.data);
            });

        setTimeout(() => setSpinner(false), 3000);
    }, []);

    for (let seat of returnSeats) {
        returnFlightSeats = returnFlightSeats + " " + seat.row + seat.number;
    }

    const diff =
        parseInt(localStorage.getItem("returnFlightPrice")) *
        parseInt(returnSeats.length) -
        parseInt(localStorage.getItem("OldRetFlightPrice"));

    const newTotalPrice =
        parseInt(localStorage.getItem("returnFlightPrice")) *
        parseInt(returnSeats.length) +
        parseInt(localStorage.getItem("CurrentDepFlightPrice"));
    localStorage.setItem("totalPrice", newTotalPrice);
    localStorage.setItem("priceDiff", diff);

    return (
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
                    <Stepper activeStep={3} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <br />
                    <h1 className="colour" style={{ textAlign: "center" }}>
                        {" "}
                        Please {localStorage.getItem("userFName")} confirm your flight{" "}
                    </h1>
                    <br />
                    <h3 className="colour">Return Flight</h3>
                    {returnFlight.map((flight) => (
                        <div>
                            <UserFlightCardItinerary
                                _id={flight._id}
                                FlightNo={flight.FlightNo}
                                DepartureDate={flight.DepartureDate}
                                ArrivalDate={flight.ArrivalDate}
                                DepartureTime={flight.DepartureTime}
                                ArrivalTime={flight.ArrivalTime}
                                EconomySeats={flight.EconomySeats}
                                BusinessClassSeats={flight.BusinessClassSeats}
                                Seats={returnFlightSeats}
                                FirstClassSeats={flight.FirstClassSeats}
                                EconomyLuggage={flight.EconomyLuggage}
                                BusinessClassLuggage={flight.BusinessClassLuggage}
                                FirstClassLuggage={flight.FirstClassLuggage}
                                EconomyPrice={flight.EconomyPrice}
                                BusinessClassPrice={flight.BusinessClassPrice}
                                FirstClassPrice={flight.FirstClassPrice}
                                DepartureAirport={flight.DepartureAirport}
                                ArrivalAirport={flight.ArrivalAirport}
                            />
                        </div>
                    ))}
                    <br />

                    <br />
                    {
                        <div>
                            <UserConfirmationCardEdit />
                        </div>
                    }
                </div>
            ) : (
                <LinearProgress />
            )}
        </div>
    );
};
export default FlightsItinerary;
