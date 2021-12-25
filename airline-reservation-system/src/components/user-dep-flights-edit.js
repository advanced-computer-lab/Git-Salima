import React, { useState, useEffect } from "react";
import UserFlightCard from "./user-flight-card";
import { useHistory } from "react-router-dom";
import Header from "./Header.js";
import HeaderLinks from "./HeaderLinks.js";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import "../styles/header.css";
import { userSearchFlightsAPI } from "../../src/apis";

const steps = [
  "Choose Outbound Flight",
  "Choose Return Flight",
  "Choose your Seats",
  "Confirm your Flights",
];

const DepartureFlights = () => {
  const [FlightNo, setFlightNo] = useState("");
  const [ArrivalDate, setArrivalDate] = useState("");
  const [DepartureTime, setDepartureTime] = useState("");
  const [ArrivalTime, setArrivalTime] = useState("");
  const [EconomySeats, setEconomySeats] = useState("");
  const [BusinessClassSeats, setBusinessClassSeats] = useState("");
  const [FirstClassSeats, setFirstClassSeats] = useState("");
  const [EconomyLuggage, setEconomyLuggage] = useState("");
  const [BusinessClassLuggage, setBusinessClassLuggage] = useState("");
  const [FirstClassLuggage, setFirstClassLuggage] = useState("");

  const [allFlights, setAllFlights] = useState([]);
  var resultsAvailable = false;

  const flight = {
    FlightNo: FlightNo,
    DepartureDate: localStorage.getItem("UFSDDate"),
    ArrivalDate: ArrivalDate,
    DepartureTime: DepartureTime,
    ArrivalTime: ArrivalTime,
    EconomySeats: EconomySeats,
    BusinessClassSeats: BusinessClassSeats,
    FirstClassSeats: FirstClassSeats,
    EconomyLuggage: EconomyLuggage,
    BusinessClassLuggage: BusinessClassLuggage,
    FirstClassLuggage: FirstClassLuggage,
    DepartureAirport: localStorage.getItem("UFSDAirport"),
    ArrivalAirport: localStorage.getItem("UFSAAirport"),
    FreeEconomySeats: "",
    FreeBusinessClassSeats: "",
    FreeFirstClassSeats: "",
    EconomyPrice: "",
    BusinessClassPrice: "",
    TakenSeats: "",
  };

  useEffect(() => {
    (async function () {
      try {
        setAllFlights(await userSearchFlightsAPI(flight));
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  if (allFlights.length > 0) resultsAvailable = true;
  let history = useHistory();
  const clickHandlerSelect = async (input) => {
    const temp = JSON.stringify(input);
    const temp2 = JSON.parse(temp);

    localStorage.setItem("DepartureAirportAro", temp2.DepartureAirport);
    localStorage.setItem("ArrivalAirportAro", temp2.ArrivalAirport);
    localStorage.setItem(
      "DepartureDateAro",
      temp2.DepartureDate.substring(0, 10)
    );
    localStorage.setItem("BookedSeatsAro", JSON.stringify(temp2.TakenSeats));
    localStorage.setItem("FlightIDAro", temp2._id);

    if (localStorage.getItem("UFSFClass") === "First Class") {
      localStorage.setItem("departureFlightPrice", temp2.FirstClassPrice);
    } else if (localStorage.getItem("UFSFClass") === "Economy") {
      localStorage.setItem("departureFlightPrice", temp2.EconomyPrice);
    } else if (localStorage.getItem("UFSFClass") === "Business") {
      localStorage.setItem("departureFlightPrice", temp2.BusinessClassPrice);
    }
    localStorage.setItem("FirstClassSeatsAro", temp2.FirstClassSeats);
    localStorage.setItem("BusinessClassSeatsAro", temp2.BusinessClassSeats);
    localStorage.setItem("EconomySeatsAro", temp2.EconomySeats);
    localStorage.setItem("FlightNoAro", temp2.FlightNo);
    history.push("/user-dep-summary-edit");
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
      <Stepper activeStep={0} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <br />

      {allFlights.map((flight) => (
        <div>
          <UserFlightCard
            _id={flight._id}
            FlightNo={flight.FlightNo}
            DepartureDate={flight.DepartureDate}
            ArrivalDate={flight.ArrivalDate}
            DepartureTime={flight.DepartureTime}
            ArrivalTime={flight.ArrivalTime}
            Terminal={flight.Terminal}
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
            onClickSelect={clickHandlerSelect}
          />
        </div>
      ))}
      {resultsAvailable === false && (
        <Stack direction="row" spacing={1.2} style={{ marginLeft: "7%" }}>
          <h2 style={{ textAlign: "center" }} className="colour">
            We apologize, there are no flights available. Check out our other
            flights
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
    </div>
  );
};
export default DepartureFlights;
