import React, { useState } from "react";
import UpdatedFlight from "./edit-flight";
import FlightCard from "./flight-card";
import {deleteFlightsAPI} from "../apis";

const SearchResults = (props) => {
  const [showEditFlight, setShowEditFlight] = useState("allFlights");
  const [showDeleteAlert, setShowDeleteAlert] = useState("allFlights");
  const [chosenFlight, setChosenFlight] = useState({});

  const clickHandlerEdit = async (input) => {
    const temp = JSON.stringify(input);
    const temp2 = JSON.parse(temp);
    setChosenFlight(temp2);
    setShowEditFlight("showEditForm");
  };
  const clickHandlerDelete = async (input) => {
    const temp = JSON.stringify(input);
    const temp2 = JSON.parse(temp);
    console.log(temp2);
    deleteFlightsAPI(temp2);
    setShowDeleteAlert("allFlights");
  };

  return (
    <div>
      {showEditFlight === "allFlights" && showDeleteAlert === "allFlights" && (
        props.flights.map((flight) => (
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

              onClickEdit={clickHandlerEdit}
              onClickDelete={clickHandlerDelete}>

            </FlightCard>
          </div>
        ))
      )
      }
      {showEditFlight === "showEditForm" && showDeleteAlert ==="allFlights" && (
        <div>
          <UpdatedFlight flightToEdit={chosenFlight}></UpdatedFlight>
        </div>
      )}
    </div >
  );
}
export default SearchResults;
