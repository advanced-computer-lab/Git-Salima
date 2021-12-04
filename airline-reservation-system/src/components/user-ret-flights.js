import React, { useState, useEffect } from "react";
import UserFlightCard from "./user-flight-card";
import axios from "axios";
import { useHistory } from "react-router-dom";

const ReturnFlights = () => {
  const [allFlights, setAllFlights] = useState([]);

  const flight = {
    ArrivalAirport: localStorage.getItem("DepartureAirportAro"),
    DepartureAirport: localStorage.getItem("ArrivalAirportAro"),
    DepartureDate: localStorage.getItem("UFSRDate")
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
    localStorage.setItem("FlightIDKizo", temp2._id);
    if (localStorage.getItem("UFSFClass") === "First Class") {
      localStorage.setItem("returnFlightPrice", temp2.FirstClassPrice);
    } else if (localStorage.getItem("UFSFClass") === "Economy") {
      localStorage.setItem("returnFlightPrice", temp2.EconomyPrice);
    } else if (localStorage.getItem("UFSFClass") === "Business") {
      localStorage.setItem("returnFlightPrice", temp2.BusinessClassPrice);
    }
    localStorage.setItem("FirstClassSeatsKizo", temp2.FirstClassSeats);
    localStorage.setItem("BusinessClassSeatsKizo", temp2.BusinessClassSeats);
    localStorage.setItem("EconomySeatsKizo", temp2.EconomySeats);
    //localStorage.setItem("BookedSeats", temp2.TakenSeats)
    localStorage.setItem("FlightNoKizo", temp2.FlightNo);
    history.push("/user-flights-summary");
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

export default ReturnFlights;
