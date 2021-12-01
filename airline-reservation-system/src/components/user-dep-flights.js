import React, { useState, useEffect } from "react";
import axios from "axios";
import UserFlightCard from "./user-flight-card";
import { useHistory } from "react-router-dom";

const DepartureFlights = () => {
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
    localStorage.setItem("ArrivalDateAro", temp2.ArrivalDate.substring(0, 10));
    localStorage.setItem("FlightIDAro", temp2._id);
    if (localStorage.getItem("UFSFClass") === "First Class") {
      localStorage.setItem("departureFlightPrice", temp2.FirstClassPrice);
    } else if (localStorage.getItem("UFSFClass") === "Economy") {
      localStorage.setItem("departureFlightPrice", temp2.EconomyPrice);
    } else if (localStorage.getItem("UFSFClass") === "Business") {
      localStorage.setItem("departureFlightPrice", temp2.BusinessClassPrice);
    }
    history.push("/user-ret-flights");
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
            EconomyPrice={flight.EconomyPrice}
            BusinessClassPrice={flight.BusinessClassPrice}
            FirstClassPrice={flight.FirstClassPrice}
            DepartureAirport={flight.DepartureAirport}
            ArrivalAirport={flight.ArrivalAirport}
            onClickSelect={clickHandlerSelect}
          />
        </div>
      ))}
    </div>
  );
};
export default DepartureFlights;
