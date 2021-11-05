import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdatedFlight from "./edit-flight";
import FlightCard from "./flight-card";


const Flights = () => {
  const [allFlights, setAllFlights] = useState([]);
  const [showEditFlight, setShowEditFlight] = useState("allFlights");
  const [chosenFlight, setChosenFlight] = useState({});
  // const test = [{},{}]

  useEffect(() => {
    axios.get("http://localhost:8000/list")
      .then((res) => {
        setAllFlights(res.data);
      });
  }, [])

  // const editFlight = async (flight) => {
  //   const temp = JSON.stringify(flight);
  //   const temp2 = JSON.parse(temp);
  //   setChosenFlight(temp2);
  //   setShowEditFlight("showEditForm");
  // };

  // const clickHandlerParent = async () => {

  // };


  return allFlights.map((flight) => {
    return (
      <div>
        {showEditFlight === "allFlights" && (
          <div>
            <FlightCard

              FlightNo={flight.FlightNo}
              DepartureDate={flight.DepartureDate}
              ArrivalDate={flight.ArrivalDate}
              DepartureTime={flight.DepartureTime}
              ArrivalTime={flight.ArrivalTime}
              EconomySeats={flight.EconomySeats}
              BusinessClassSeats={flight.BusinessClassSeats}
              DepartureAirport={flight.DepartureAirport}
              ArrivalAirport={flight.ArrivalAirport}

            // onClick={this.clickHandlerParent}
            >

            </FlightCard>
          </div>

        )
        }
        {showEditFlight === "showEditForm" && (
          <div>
            <UpdatedFlight flightToEdit={chosenFlight}></UpdatedFlight>
          </div>
        )}
      </div >);
  })
}
export default Flights;
