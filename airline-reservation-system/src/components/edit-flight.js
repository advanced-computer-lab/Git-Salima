import React, { useState } from 'react';

const UpdatedFlight = (props) => {

    const [FlightNo, setFlightNo] = useState(props.flightToEdit.FlightNo);
    const [DepartureDate, setDepartureDate] = useState(props.flightToEdit.DepartureDate);
    const [ArrivalDate, setArrivalDate] = useState(props.flightToEdit.ArrivalDate);
    const [DepartureTime, setDepartureTime] = useState(props.flightToEdit.DepartureTime);
    const [ArrivalTime, setArrivalTime] = useState(props.flightToEdit.ArrivalTime);
    const [EconomySeats, setEconomySeats] = useState(props.flightToEdit.EconomySeats);
    const [BusinessClassSeats, setBusinessClassSeats] = useState(props.flightToEdit.BusinessClassSeats);
    const [DepartureAirport, setDepartureAirport] = useState(props.flightToEdit.DepartureAirport);
    const [ArrivalAirport, setArrivalAirport] = useState(props.flightToEdit.ArrivalAirport);

    const updateFlight = (e) => {
        e.preventDefault();

        props.flightToEdit.FlightNo = FlightNo;
        props.flightToEdit.DepartureDate = DepartureDate;
        props.flightToEdit.ArrivalDate = ArrivalDate;
        props.flightToEdit.DepartureTime = DepartureTime;
        props.flightToEdit.ArrivalTime = ArrivalTime;
        props.flightToEdit.EconomySeats = EconomySeats;
        props.flightToEdit.BusinessClassSeats = BusinessClassSeats;
        props.flightToEdit.DepartureAirport = DepartureAirport;
        props.flightToEdit.ArrivalAirport = ArrivalAirport;

        console.log(props.flightToEdit);
    }

    return (
        <div>
            <h3>Edit Flight</h3>
            <form onSubmit={updateFlight} className="row g-3">

                <div className="form-group">
                    <label>Flight Number: </label>
                    <input type="number"
                        required
                        className="form-control"
                        value={FlightNo}
                        onChange={(e) => setFlightNo(e.target.value)}
                    />
                </div>

                <div className="form-group" className="col-md-6">
                    <label>Departure Date: </label>
                    <input type="date"
                        required
                        className="form-control"
                        value={DepartureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                    />
                </div>

                <div className="form-group" className="col-md-6">
                    <label>Arrival Date: </label>
                    <input type="date"
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
                    <input type="submit" value="Update" className="btn btn-dark" />
                </div>
            </form>
        </div>
    )
}
export default UpdatedFlight;