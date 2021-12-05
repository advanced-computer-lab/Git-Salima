import React, { useState, useEffect } from "react";
import axios from "axios";
import UserFlightCard from "./user-flight-card";
import { useHistory } from "react-router-dom";

import Header from "./Header.js";
import HeaderLinks from "./HeaderLinks.js";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

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
    const temp1 = JSON.stringify(flight);
    const temp2 = JSON.parse(temp1);
    axios.get("http://localhost:8000/search", { params: temp2 }).then((res) => {
      setAllFlights(res.data);
    });
  }, []);

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
    history.push("/user-ret-flights");
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
    </div>
  );
};
export default DepartureFlights;
