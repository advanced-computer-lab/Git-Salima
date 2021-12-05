import React, { useState } from "react";
import { searchFlightsAPI } from "../apis";
import SearchResults from "./search-results";

const Flight = () => {
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
  const [EconomyPrice, setEconomyPrice] = useState("");
  const [BusinessClassPrice, setBusinessClassPrice] = useState("");
  const [FirstClassPrice, setFirstClassPrice] = useState("");
  const [showResult, setShowResult] = useState("search");
  const [results, setResults] = useState([]);

  const searchFlight = async (e) => {
    e.preventDefault();

    const flight = {
      FlightNo: FlightNo,
      DepartureDate: DepartureDate,
      ArrivalDate: ArrivalDate,
      DepartureTime: DepartureTime,
      ArrivalTime: ArrivalTime,
      Terminal:Terminal,
      EconomySeats: EconomySeats,
      BusinessClassSeats: BusinessClassSeats,
      FirstClassSeats: FirstClassSeats,
      EconomyLuggage:EconomyLuggage,
      BusinessClassLuggage:BusinessClassLuggage,
      FirstClassLuggage:FirstClassLuggage,
      EconomyPrice: EconomyPrice,
      BusinessClassPrice: BusinessClassPrice,
      FirstClassPrice: FirstClassPrice,
      DepartureAirport: DepartureAirport,
      ArrivalAirport: ArrivalAirport,
    };

    setShowResult("available");
    const resu = await searchFlightsAPI(flight);
    console.dir(resu);

    if (resu) {
      setResults(resu);
    } else {
      setShowResult("error");
    }
  };

  return (
    <div>
      <h3>Search Flight</h3>
      {showResult === "search" && (
        <form onSubmit={searchFlight} className="row g-3">
          <div className="form-group">
            <label>Flight Number: </label>
            <input
              type="number"
              className="form-control"
              value={FlightNo}
              onChange={(e) => setFlightNo(e.target.value)}
            />
          </div>

          <div className="form-group" className="col-md-6">
            <label>Departure Date: </label>
            <input
              type="date"
              className="form-control"
              value={DepartureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
          </div>

          <div className="form-group" className="col-md-6">
            <label>Arrival Date: </label>
            <input
              type="date"
              className="form-control"
              value={ArrivalDate}
              onChange={(e) => setArrivalDate(e.target.value)}
            />
          </div>

          <div className="form-group" className="col-md-6">
            <label>Departure Time: </label>
            <input
              type="time"
              className="form-control"
              value={DepartureTime}
              onChange={(e) => setDepartureTime(e.target.value)}
            />
          </div>

          <div className="form-group" className="col-md-6">
            <label>Arrival Time: </label>
            <input
              type="time"
              className="form-control"
              value={ArrivalTime}
              onChange={(e) => setArrivalTime(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Terminal: </label>
            <input
              type="number"
              className="form-control"
              value={Terminal}
              onChange={(e) => setTerminal(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Economy Seats: </label>
            <input
              type="number"
              className="form-control"
              value={EconomySeats}
              onChange={(e) => setEconomySeats(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Business Class Seats: </label>
            <input
              type="number"
              className="form-control"
              value={BusinessClassSeats}
              onChange={(e) => setBusinessClassSeats(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>First Class Seats: </label>
            <input
              type="number"
              className="form-control"
              value={FirstClassSeats}
              onChange={(e) => setFirstClassSeats(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Economy Luggage: </label>
            <input
              type="number"
              className="form-control"
              value={EconomyLuggage}
              onChange={(e) => setEconomyLuggage(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Business Class Luggage: </label>
            <input
              type="number"
              className="form-control"
              value={BusinessClassLuggage}
              onChange={(e) => setBusinessClassLuggage(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>First Class Luggage: </label>
            <input
              type="number"
              className="form-control"
              value={FirstClassLuggage}
              onChange={(e) => setFirstClassLuggage(e.target.value)}
            />
          </div>
          <div className="form-group">
          <label>Economy Price: </label>
          <input
            type="number"
            required
            className="form-control"
            min="0"
            value={EconomyPrice}
            onChange={(e) => setEconomyPrice(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Business Class Price: </label>
          <input
            type="number"
            required
            className="form-control"
            min="0"
            value={BusinessClassPrice}
            onChange={(e) => setBusinessClassPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>First Class Price: </label>
          <input
            type="number"
            required
            className="form-control"
            min="0"
            value={FirstClassPrice}
            onChange={(e) => setFirstClassPrice(e.target.value)}
          />
        </div>
          <div className="form-group" className="col-md-6">
            <label>Departure Airport: </label>
            <input
              type="text"
              className="form-control"
              value={DepartureAirport}
              onChange={(e) => setDepartureAirport(e.target.value)}
            />
          </div>

          <div className="form-group" className="col-md-6">
            <label>Arrival Airport: </label>
            <input
              type="text"
              className="form-control"
              value={ArrivalAirport}
              onChange={(e) => setArrivalAirport(e.target.value)}
            />
          </div>
          <br />
          <div className="form-group">
            <input type="submit" value="Search Flight" className="btn btn-dark" />
          </div>
        </form>
      )}
      {showResult === "available" && (
        <div>
          <SearchResults
            flights={results}
            onClick={searchFlight}
          ></SearchResults>
        </div>
      )}
      {showResult === "error" && <div>Error</div>}
    </div>
  );
};
export default Flight;
