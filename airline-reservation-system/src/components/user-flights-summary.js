
import React, { useState, useEffect } from "react";
import UserFlightCardSeats from "./user-flight-card-seats";
import axios from "axios";
import { useHistory } from "react-router-dom";

const FlightsSummary = () => {

    const [depFlight, setDepFlight] = useState([]);
    const [returnFlight, setReturnFlight] = useState([]);

    useEffect(() => {
      const departureFlight= {
        _id :localStorage.getItem("FlightIDAro")
      }
      const returnFlight= {
        _id :localStorage.getItem("FlightIDKizo")
      }
        axios.get("http://localhost:8000/search", { params: departureFlight })
          .then((res) => {
            setDepFlight(res.data);
          });
          axios.get("http://localhost:8000/search", { params: returnFlight })
          .then((res) => {
            setReturnFlight(res.data);
          });  
      }, []);

      let history = useHistory();
    const clickHandlerChooseSeats = async (input) => {
    const temp = JSON.stringify(input);
    const temp2 = JSON.parse(temp);
    localStorage.setItem("SelectedFlightChooseSeats", temp2._id);
    history.push("/choose-seats");
  };
  
    return (
        <div>
        <h1>Reserved Flights</h1>
        {depFlight.map((flight) => (
        <div>
          <UserFlightCardSeats
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
            onClickChooseSeats={clickHandlerChooseSeats}
          />
        </div>
      ))}
      {returnFlight.map((flight) => (
        <div>
          <UserFlightCardSeats
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
            onClickChooseSeats={clickHandlerChooseSeats}
          />
        </div>
      ))}
    </div>
    );
};

export default FlightsSummary;