import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdatedFlight from "./edit-flight";
import FlightCard from "./flight-card";

import {deleteFlightsAPI} from "../apis";


const Flights = () => {
  const [allFlights, setAllFlights] = useState([]);
  const [showEditFlight, setShowEditFlight] = useState("allFlights");
  const [showDeleteAlert, setShowDeleteAlert] = useState("allFlights");
  const [chosenFlight, setChosenFlight] = useState({});
  // const test = [{},{}]

  useEffect(() => {
    axios.get("http://localhost:8000/list")
      .then((res) => {
        setAllFlights(res.data);
        console.log(res.data);
      });
  }, [])

  // const editFlight = async (flight) => {
  // const temp = JSON.stringify(flight);
  // const temp2 = JSON.parse(temp);
  // setChosenFlight(temp2);
  // };

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
    // setShowDeleteAlert("showDeleteAlert");
    // onDelete(input);
  };

  // const onDelete = async (input) => {
  //   const temp = JSON.stringify(input);
  //   const temp2 = JSON.parse(temp);
  //   deleteFlightsAPI(temp2);
  //   setShowDeleteAlert("allFlights");
  // };

  



  return (
    <div>
      {showEditFlight === "allFlights" && showDeleteAlert === "allFlights" && (
        allFlights.map((flight) => (
          <div>
            <FlightCard

              _id={flight._id}
              FlightNo={flight.FlightNo}
              DepartureDate={flight.DepartureDate}
              ArrivalDate={flight.ArrivalDate}
              DepartureTime={flight.DepartureTime}
              ArrivalTime={flight.ArrivalTime}
              EconomySeats={flight.EconomySeats}
              BusinessClassSeats={flight.BusinessClassSeats}
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
 export default Flights;



