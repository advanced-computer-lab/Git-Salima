import React, { useState } from "react";
import { createFlightAPI } from "../apis";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
const Flight = () => {
  const [FlightNo, setFlightNo] = useState("");
  const [DepartureDate, setDepartureDate] = useState("");
  const [ArrivalDate, setArrivalDate] = useState("");
  const [DepartureTime, setDepartureTime] = useState("");
  const [ArrivalTime, setArrivalTime] = useState("");
  const [EconomySeats, setEconomySeats] = useState("");
  const [BusinessClassSeats, setBusinessClassSeats] = useState("");
  const [FirstClassSeats, setFirstClassSeats] = useState("");
  const [DepartureAirport, setDepartureAirport] = useState("");
  const [ArrivalAirport, setArrivalAirport] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

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
      FirstClassSeats: FirstClassSeats,
      DepartureAirport: DepartureAirport,
      ArrivalAirport: ArrivalAirport,
    };
    createFlightAPI(flight);
  };
  const handleClose = (e) => {
    e.preventDefault();

    const flight = {
      FlightNo: FlightNo,
      DepartureDate: DepartureDate,
      ArrivalDate: ArrivalDate,
      DepartureTime: DepartureTime,
      ArrivalTime: ArrivalTime,
      EconomySeats: EconomySeats,
      BusinessClassSeats: BusinessClassSeats,
      FirstClassSeats: FirstClassSeats,
      DepartureAirport: DepartureAirport,
      ArrivalAirport: ArrivalAirport,
    };
    createFlightAPI(flight);
    setOpen(false);
    window.location.reload(false);
  };
  const handleCloseFalse = () => {
    setOpen(false);
    window.location.reload(false);
  };

  return (
    <div>
      <h3>Create Flight</h3>
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
        <input
          type="button"
          value="Create Flight"
          className="btn btn-dark"
          onClick={handleClickOpen}
        />
      </div>
      {{ FlightNo } === "" ? (
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
                You must enter Flight Number
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>OK</Button>
            </DialogActions>
          </Dialog>
        </Card>
      ) : (
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
                Flight Created Successfully
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>OK</Button>
            </DialogActions>
          </Dialog>
        </Card>
      )}
    </div>
  );
};
export default Flight;
