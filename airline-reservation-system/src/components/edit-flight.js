import React, { useState } from 'react';

let flight = {
    FlightNo: 203,
    DepartureDate: '2021-11-12',
    ArrivalDate: '2021-11-10',
    DepartureTime: '15:30',
    ArrivalTime: '20:30',
    EconomySeats: 100,
    BusinessClassSeats: 12,
    DepartureAirport: 'CAI',
    ArrivalAirport: 'MILANO',
}

const UpdatedFlight = () => {

    const [FlightNo, setFlightNo] = useState(flight.FlightNo);
    const [DepartureDate, setDepartureDate] = useState(flight.DepartureDate);
    const [ArrivalDate, setArrivalDate] = useState(flight.ArrivalDate);
    const [DepartureTime, setDepartureTime] = useState(flight.DepartureTime);
    const [ArrivalTime, setArrivalTime] = useState(flight.ArrivalTime);
    const [EconomySeats, setEconomySeats] = useState(flight.EconomySeats);
    const [BusinessClassSeats, setBusinessClassSeats] = useState(flight.BusinessClassSeats);
    const [DepartureAirport, setDepartureAirport] = useState(flight.DepartureAirport);
    const [ArrivalAirport, setArrivalAirport] = useState(flight.ArrivalAirport);

    const updateFlight = (e) => {
        e.preventDefault();

        flight = {
            FlightNo: FlightNo,
            DepartureDate: DepartureDate,
            ArrivalDate: ArrivalDate,
            DepartureTime: DepartureTime,
            ArrivalTime: ArrivalTime,
            EconomySeats: EconomySeats,
            BusinessClassSeats: BusinessClassSeats,
            DepartureAirport: DepartureAirport,
            ArrivalAirport: ArrivalAirport
        }
        console.log(flight);
        // fetch('http://localhost:8000/create', {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json'
        //         // 'Content-Type': 'application/x-www-form-urlencoded'
        //     },
        //     body: JSON.stringify(flight),
        // }).then(response => response.json())
        //     .then(data => {
        //         console.log('Success:', data);
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });
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
                    <input type="submit" value="Update Flight" className="btn btn-dark" />
                </div>
            </form>
        </div>
    )
}
export default UpdatedFlight;