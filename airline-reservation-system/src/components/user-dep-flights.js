import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdatedFlight from "./edit-flight";
import UserFlightCard from "./user-flight-card";

import { useHistory } from "react-router-dom";
import { searchFlightsAPI } from "../apis";

const Flights = () => {
  const [FlightNo, setFlightNo] = useState("");
  const [ArrivalDate, setArrivalDate] = useState("");
  const [DepartureTime, setDepartureTime] = useState("");
  const [ArrivalTime, setArrivalTime] = useState("");
  const [Terminal, setTerminal] = useState("");
  const [EconomySeats, setEconomySeats] = useState("");
  const [BusinessClassSeats, setBusinessClassSeats] = useState("");
  const [FirstClassSeats, setFirstClassSeats] = useState("");
  const [EconomyLuggage, setEconomyLuggage] = useState("");
  const [BusinessClassLuggage, setBusinessClassLuggage] = useState("");
  const [FirstClassLuggage, setFirstClassLuggage] = useState("");

  const [allFlights, setAllFlights] = useState([]);

  console.log(localStorage.getItem("UFSDAirport"));

  const flight = {
    FlightNo: FlightNo,
    DepartureDate: localStorage.getItem("UFSDDate"),
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
    DepartureAirport: localStorage.getItem("UFSDAirport"),
    ArrivalAirport: localStorage.getItem("UFSAAirport"),
  };

  useEffect(() => {
    const temp1 = JSON.stringify(flight);
    const temp2 = JSON.parse(temp1);
    axios.get("http://localhost:8000/search", { params: temp2 }).then((res) => {
      setAllFlights(res.data);
      console.log(res.data);
    });
  }, []);
  let history = useHistory();
  const clickHandlerSelect = async (input) => {
    //the address of the results vvvv
    history.push("/user-ret-flights");
    // const temp = JSON.stringify(input);
    // const temp2 = JSON.parse(temp);
    // console.log(temp2);
    // deleteFlightsAPI(temp2);
    // setShowDeleteAlert("allFlights");
  };

  return (
    <div>
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
            DepartureAirport={flight.DepartureAirport}
            ArrivalAirport={flight.ArrivalAirport}
            onClickSelect={clickHandlerSelect}
          />
        </div>
      ))}
    </div>
  );
};
export default Flights;
