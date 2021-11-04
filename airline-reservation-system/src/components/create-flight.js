import React, { useState } from "react";
import { createFlightAPI } from "../apis";
const Flight = () => {
  const [FlightNo, setFlightNo] = useState("");
  const [DepartureDate, setDepartureDate] = useState("");
  const [ArrivalDate, setArrivalDate] = useState("");
  const [DepartureTime, setDepartureTime] = useState("");
  const [ArrivalTime, setArrivalTime] = useState("");
  const [EconomySeats, setEconomySeats] = useState("");
  const [BusinessClassSeats, setBusinessClassSeats] = useState("");
  const [DepartureAirport, setDepartureAirport] = useState("");
  const [ArrivalAirport, setArrivalAirport] = useState("");

  const createFlight = (e) => {
    e.preventDefault();

    const flight = {
      FlightNo: FlightNo,
      DepartureDate: DepartureDate,
      ArrivalDate: ArrivalDate,
      DepartureTime: DepartureTime,
      ArrivalTime: ArrivalTime,
      EconomySeats: EconomySeats,
      BusinessClassSeats: BusinessClassSeats,
      DepartureAirport: DepartureAirport,
      ArrivalAirport: ArrivalAirport,
    };
    createFlightAPI(flight);
  };

  return (
    <div>
      <h3>Create Flight</h3>
      <form onSubmit={createFlight} className="row g-3">
        <div className="form-group">
          <label>Flight Number: </label>
          <input
            type="number"
            required
            className="form-control"
            value={FlightNo}
            onChange={(e) => setFlightNo(e.target.value)}
          />
        </div>

        <div className="form-group" className="col-md-6">
          <label>Departure Date: </label>
          <input
            type="date"
            required
            className="form-control"
            value={DepartureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
        </div>

        <div className="form-group" className="col-md-6">
          <label>Arrival Date: </label>
          <input
            type="date"
            required
            className="form-control"
            value={ArrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
          />
        </div>

        <div className="form-group" className="col-md-6">
          <label>Departure Time: </label>
          <input
            type="text"
            required
            className="form-control"
            value={DepartureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
          />
        </div>

        <div className="form-group" className="col-md-6">
          <label>Arrival Time: </label>
          <input
            type="text"
            required
            className="form-control"
            value={ArrivalTime}
            onChange={(e) => setArrivalTime(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Economy Seats: </label>
          <input
            type="number"
            required
            className="form-control"
            value={EconomySeats}
            onChange={(e) => setEconomySeats(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Business Class Seats: </label>
          <input
            type="number"
            required
            className="form-control"
            value={BusinessClassSeats}
            onChange={(e) => setBusinessClassSeats(e.target.value)}
          />
        </div>

        <div className="form-group" className="col-md-6">
          <label>Departure Airport: </label>
          <input
            type="text"
            required
            className="form-control"
            value={DepartureAirport}
            onChange={(e) => setDepartureAirport(e.target.value)}
          />
        </div>

        <div className="form-group" className="col-md-6">
          <label>Arrival Airport: </label>
          <input
            type="text"
            required
            className="form-control"
            value={ArrivalAirport}
            onChange={(e) => setArrivalAirport(e.target.value)}
          />
        </div>
        <br />
        <div className="form-group">
          <input type="submit" value="Create Flight" className="btn btn-dark" />
        </div>
      </form>
    </div>
  );
};
export default Flight;
