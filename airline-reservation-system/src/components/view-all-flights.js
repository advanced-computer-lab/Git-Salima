import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdatedFlight from "./edit-flight";
import FlightCard from "./flight-card";

import { deleteFlightsAPI } from "../apis";

const Flights = () => {
  const [allFlights, setAllFlights] = useState([]);
  const [showEditFlight, setShowEditFlight] = useState("allFlights");
  const [showDeleteAlert, setShowDeleteAlert] = useState("allFlights");
  const [chosenFlight, setChosenFlight] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8000/list").then((res) => {
      setAllFlights(res.data);
      console.log(res.data);
    });
  }, []);

  const clickHandlerEdit = async (input) => {
    const temp = JSON.stringify(input);
    const temp2 = JSON.parse(temp);
    setChosenFlight(temp2);
    setShowEditFlight("showEditForm");
  };
  const clickHandlerDelete = async (input) => {
    const temp = JSON.stringify(input);
    const temp2 = JSON.parse(temp);
    deleteFlightsAPI(temp2);
    setShowDeleteAlert("allFlights");
  };

  return (
    <div>
      {showEditFlight === "allFlights" &&
        showDeleteAlert === "allFlights" &&
        allFlights.map((flight) => (
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
              EconomyPrice={flight.EconomyPrice}
              BusinessClassPrice={flight.BusinessClassPrice}
              FirstClassPrice={flight.FirstClassPrice}
              DepartureAirport={flight.DepartureAirport}
              ArrivalAirport={flight.ArrivalAirport}
              onClickEdit={clickHandlerEdit}
              onClickDelete={clickHandlerDelete}
            ></FlightCard>
          </div>
        ))}
      {showEditFlight === "showEditForm" && showDeleteAlert === "allFlights" && (
        <div>
          <UpdatedFlight flightToEdit={chosenFlight}></UpdatedFlight>
        </div>
      )}
    </div>
  );
};
export default Flights;
