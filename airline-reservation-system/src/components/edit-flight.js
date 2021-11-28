import React, { useState } from "react";
import { editFlightsAPI } from "../apis";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";

const UpdatedFlight = (props) => {
  const [FlightNo, setFlightNo] = useState(props.flightToEdit.FlightNo);
  const [DepartureDate, setDepartureDate] = useState(
    props.flightToEdit.DepartureDate
  );
  const [ArrivalDate, setArrivalDate] = useState(
    props.flightToEdit.ArrivalDate
  );
  const [DepartureTime, setDepartureTime] = useState(
    props.flightToEdit.DepartureTime
  );
  const [ArrivalTime, setArrivalTime] = useState(
    props.flightToEdit.ArrivalTime
  );
  const [Terminal, setTerminal] = useState(
    props.flightToEdit.Terminal
  );
  const [EconomySeats, setEconomySeats] = useState(
    props.flightToEdit.EconomySeats
  );
  const [BusinessClassSeats, setBusinessClassSeats] = useState(
    props.flightToEdit.BusinessClassSeats
  );
  const [FirstClassSeats, setFirstClassSeats] = useState(
    props.flightToEdit.FirstClassSeats
  );
  const [EconomyLuggage, setEconomyLuggage] = useState(
    props.flightToEdit.EconomyLuggage
  );
  const [BusinessClassLuggage, setBusinessClassLuggage] = useState(
    props.flightToEdit.BusinessClassLuggage
  );
  const [FirstClassLuggage, setFirstClassLuggage] = useState(
    props.flightToEdit.FirstClassLuggage
  );

  const [EconomyPrice, setEconomyPrice] = useState(
    props.flightToEdit.EconomyPrice
  );
  const [BusinessClassPrice, setBusinessClassPrice] = useState(
    props.flightToEdit.BusinessClassPrice
  );
  const [FirstClassPrice, setFirstClassPrice] = useState(
    props.flightToEdit.FirstClassPrice
  );

  const [DepartureAirport, setDepartureAirport] = useState(
    props.flightToEdit.DepartureAirport
  );
  const [ArrivalAirport, setArrivalAirport] = useState(
    props.flightToEdit.ArrivalAirport
  );
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  let temp = JSON.stringify(DepartureDate);
  console.log(temp);
  temp = temp.substring(0, 11);
  //const temp2 = JSON.parse(temp);
  console.log(temp);

  const updateFlight = (e) => {
    e.preventDefault();

    props.flightToEdit.FlightNo = FlightNo;
    props.flightToEdit.DepartureDate = DepartureDate;
    props.flightToEdit.ArrivalDate = ArrivalDate;
    props.flightToEdit.DepartureTime = DepartureTime;
    props.flightToEdit.ArrivalTime = ArrivalTime;
    props.flightToEdit.Terminal = Terminal;
    props.flightToEdit.EconomySeats = EconomySeats;
    props.flightToEdit.BusinessClassSeats = BusinessClassSeats;
    props.flightToEdit.FirstClassSeats = FirstClassSeats;
    props.flightToEdit.EconomyLuggage = EconomyLuggage;
    props.flightToEdit.BusinessClassLuggage = BusinessClassLuggage;
    props.flightToEdit.FirstClassLuggage = FirstClassLuggage;
    props.flightToEdit.EconomyPrice = EconomyPrice;
    props.flightToEdit.BusinessClassPrice = BusinessClassPrice;
    props.flightToEdit.FirstClassPrice = FirstClassPrice;
    props.flightToEdit.DepartureAirport = DepartureAirport;
    props.flightToEdit.ArrivalAirport = ArrivalAirport;

    editFlightsAPI(props.flightToEdit);
  };
  const handleClose = (e) => {
    e.preventDefault();

    props.flightToEdit.FlightNo = FlightNo;
    props.flightToEdit.DepartureDate = DepartureDate;
    props.flightToEdit.ArrivalDate = ArrivalDate;
    props.flightToEdit.DepartureTime = DepartureTime;
    props.flightToEdit.ArrivalTime = ArrivalTime;
    props.flightToEdit.Terminal = Terminal;
    props.flightToEdit.EconomySeats = EconomySeats;
    props.flightToEdit.BusinessClassSeats = BusinessClassSeats;
    props.flightToEdit.FirstClassSeats = FirstClassSeats;
    props.flightToEdit.EconomyLuggage = EconomyLuggage;
    props.flightToEdit.BusinessClassLuggage = BusinessClassLuggage;
    props.flightToEdit.FirstClassLuggage = FirstClassLuggage;
    props.flightToEdit.EconomyPrice = EconomyPrice;
    props.flightToEdit.BusinessClassPrice = BusinessClassPrice;
    props.flightToEdit.FirstClassPrice = FirstClassPrice;
    props.flightToEdit.DepartureAirport = DepartureAirport;
    props.flightToEdit.ArrivalAirport = ArrivalAirport;
    editFlightsAPI(props.flightToEdit);
    setOpen(false);
    window.location.reload(false);
  };

  return (
    <div>
      <h3>Edit Flight</h3>
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
          type="time"
          required
          className="form-control"
          value={DepartureTime}
          onChange={(e) => setDepartureTime(e.target.value)}
        />
      </div>

      <div className="form-group" className="col-md-6">
        <label>Arrival Time: </label>
        <input
          type="time"
          required
          className="form-control"
          value={ArrivalTime}
          onChange={(e) => setArrivalTime(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Terminal: </label>
        <input
          type="number"
          required
          className="form-control"
          value={Terminal}
          onChange={(e) => setTerminal(e.target.value)}
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

      <div className="form-group">
        <label>First Class Seats: </label>
        <input
          type="number"
          required
          className="form-control"
          value={FirstClassSeats}
          onChange={(e) => setFirstClassSeats(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Economy Luggage: </label>
        <input
          type="number"
          required
          className="form-control"
          value={EconomyLuggage}
          onChange={(e) => setEconomyLuggage(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Business Class Luggage: </label>
        <input
          type="number"
          required
          className="form-control"
          value={BusinessClassLuggage}
          onChange={(e) => setBusinessClassLuggage(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>First Class Luggage: </label>
        <input
          type="number"
          required
          className="form-control"
          value={FirstClassLuggage}
          onChange={(e) => setFirstClassLuggage(e.target.value)}
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
        <br />
      </div>
      <div className="form-group">
        <input
          type="button"
          value="Update Flight"
          className="btn btn-dark"
          onClick={handleClickOpen}
        />
      </div>

      <Card>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Flight Updated Successfully
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>OK</Button>
          </DialogActions>
        </Dialog>
      </Card>
    </div>
  );
};
export default UpdatedFlight;
