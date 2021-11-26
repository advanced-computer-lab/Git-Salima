import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdatedFlight from "./edit-flight";
import FlightCard from "./flight-card";

import { searchFlightsAPI } from "../apis";

const Flights = () => {
  const [FlightNo, setFlightNo] = useState("");
  const [DepartureDate, setDepartureDate] = useState("");
  const [ArrivalDate, setArrivalDate] = useState("");
  const [DepartureTime, setDepartureTime] = useState("");
  const [ArrivalTime, setArrivalTime] = useState("");
  const [Terminal, setTerminal] = useState("");
  const [EconomySeats, setEconomySeats] = useState("");
  const [BusinessClassSeats, setBusinessClassSeats] = useState("");
  const [FirstClassSeats, setFirstClassSeats] = useState("");
  const [DepartureAirport, setDepartureAirport] = useState("");
  const [ArrivalAirport, setArrivalAirport] = useState("");
  const [EconomyLuggage, setEconomyLuggage] = useState("");
  const [BusinessClassLuggage, setBusinessClassLuggage] = useState("");
  const [FirstClassLuggage, setFirstClassLuggage] = useState("");

  setDepartureDate(localStorage.getItem("UFSDDate"));
  setArrivalDate(localStorage.getItem("UFSAAirport"));
  setDepartureAirport(localStorage.getItem("UFSDAirport"));
  setArrivalAirport(localStorage.getItem("UFSAAirport"));
  const [allFlights, setAllFlights] = useState([]);
  const Flight = async (e) => {
    e.preventDefault();
    const flight = {
      FlightNo: FlightNo,
      DepartureDate: DepartureDate,
      ArrivalDate: ArrivalDate,
      DepartureTime: DepartureTime,
      ArrivalTime: ArrivalTime,
      Terminal: Terminal,
      EconomySeats: EconomySeats,
      BusinessClassSeats: BusinessClassSeats,
      FirstClassSeats: FirstClassSeats,
      EconomyLuggage: EconomyLuggage,
      BusinessClassLuggage: BusinessClassLuggage,
      FirstClassLuggage: FirstClassLuggage,
      DepartureAirport: DepartureAirport,
      ArrivalAirport: ArrivalAirport,
    };
    setDepartureDate(localStorage.getItem("UserFSCriteria"));
    setArrivalDate(localStorage.getItem("UserFSCriteria"));
    setDepartureAirport(localStorage.getItem("UserFSCriteria"));
    setArrivalAirport(localStorage.getItem("UserFSCriteria"));

    // console.log(localStorage.getItem("UserFSCriteria"));
    const result = await searchFlightsAPI(flight);
    // console.log(result);
    setAllFlights(result);
  };
  return (
    <div>
      {allFlights.map((flight) => (
        <div>
          <FlightCard
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
            DepartureAirport={flight.DepartureAirport}
            ArrivalAirport={flight.ArrivalAirport}
          />
        </div>
      ))}
    </div>
  );
};
export default Flights;
