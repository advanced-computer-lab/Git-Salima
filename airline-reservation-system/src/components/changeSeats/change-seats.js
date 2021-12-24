import React, { useState, useEffect } from "react";
import SeatPicker from "react-seat-picker";
import { styled } from "@mui/material/styles";
import { Button, CardActions } from "@mui/material";
import { useHistory } from "react-router-dom";
import { contains } from "ramda";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const ReturnFlights = () => {
  const [takenSeats, setTakenSeats] = useState([]);

  let FirstClassSeats = 60;
  let BusinessClassSeats = 30;
  let EconomyClassSeats = 20;
  const numOfSeats = parseInt(localStorage.getItem("numOfSeats"));

  if (
    localStorage.getItem("SelectedFlightChooseSeats") ==
    localStorage.getItem("FlightIDAro")
  ) {
    FirstClassSeats = localStorage.getItem("FirstClassSeatsAro");
    BusinessClassSeats = localStorage.getItem("BusinessClassSeatsAro");
    EconomyClassSeats = localStorage.getItem("EconomySeatsAro");
  } else {
    FirstClassSeats = localStorage.getItem("FirstClassSeatsKizo");
    BusinessClassSeats = localStorage.getItem("BusinessClassSeatsKizo");
    EconomyClassSeats = localStorage.getItem("EconomySeatsKizo");
  }

  const BookedSeats = [];
  const BookedSeatsAro = JSON.parse(localStorage.getItem("BookedSeatsAro"));
  const BookedSeatsKizo = JSON.parse(localStorage.getItem("BookedSeatsKizo"));
  // const BookedSeatsKizo = localStorage.getItem("BookedSeatsKizo")
  const BookedSeatsIDs = [];
  let i;
  if (
    localStorage.getItem("SelectedFlightChooseSeats") ==
    localStorage.getItem("FlightIDAro")
  ) {
    for (i = 0; i < BookedSeatsAro.length; i++) {
      if (BookedSeatsAro[i].substring(2, BookedSeatsAro[i].length) != ",")
        BookedSeatsIDs.push(
          parseInt(BookedSeatsAro[i].substring(2, BookedSeatsAro[i].length))
        );
    }
  } else {
    for (i = 0; i < BookedSeatsKizo.length; i++) {
      if (BookedSeatsKizo[i].substring(2, BookedSeatsKizo[i].length) != ",")
        BookedSeatsIDs.push(
          parseInt(BookedSeatsKizo[i].substring(2, BookedSeatsKizo[i].length))
        );
    }
  }

  const rows = [];
  let numberOfRowsF = 0;
  let numberOfRowsB = 0;
  let numberOfRowsE = 0;

  if (localStorage.getItem("UFSFClass") == "First Class") {
    let temp = FirstClassSeats;
    numberOfRowsF = FirstClassSeats / 6;
    for (let i = 0; i < numberOfRowsF; i++) {
      const row = [];
      for (let j = 1; j <= 6; j++) {
        if (
          contains(Math.floor(i * 10 + j), BookedSeatsIDs) &&
          j % 2 != 0 &&
          temp > 0
        ) {
          row.push({
            id: i * 10 + j,
            number: j,
            isReserved: true,
            orientation: "east",
          });
        } else if (
          contains(Math.floor(i * 10 + j), BookedSeatsIDs) &&
          j % 2 != 1 &&
          temp > 0
        ) {
          row.push({
            id: i * 10 + j,
            number: j,
            isReserved: true,
            orientation: "west",
          });
          row.push(null);
        } else if (j % 2 != 0 && temp > 0) {
          row.push({
            id: i * 10 + j,
            number: j,
            isSelected: false,
            orientation: "east",
          });
        } else if (temp > 0) {
          row.push({
            id: i * 10 + j,
            number: j,
            isSelected: false,
            orientation: "west",
          });
          row.push(null);
        }
        temp--;
      }
      rows.push(row);
    }

    numberOfRowsB = BusinessClassSeats / 6;
    for (let i = 0; i < numberOfRowsB; i++) {
      const row = [];
      for (let j = 1; j <= 6; j++) {
        if (j % 2 != 0) {
          row.push({
            id: (numberOfRowsF + i) * 10 + j,
            number: j,
            isReserved: true,
            orientation: "east",
          });
        } else {
          row.push({
            id: (numberOfRowsF + i) * 10 + j,
            number: j,
            isReserved: true,
            orientation: "west",
          });
          row.push(null);
        }
      }
      rows.push(row);
    }

    numberOfRowsE = EconomyClassSeats / 6;
    for (let i = 0; i < numberOfRowsE; i++) {
      const row = [];
      for (let j = 1; j <= 6; j++) {
        if (j % 2 != 0) {
          row.push({
            id: (numberOfRowsF + numberOfRowsB + i) * 10 + j,
            number: j,
            isReserved: true,
            orientation: "east",
          });
        } else {
          row.push({
            id: i * 10 + j,
            number: j,
            isReserved: true,
            orientation: "west",
          });
          row.push(null);
        }
      }
      rows.push(row);
    }
  } else if (localStorage.getItem("UFSFClass") == "Business") {
    let temp = BusinessClassSeats;
    numberOfRowsF = FirstClassSeats / 6;
    for (let i = 0; i < numberOfRowsF; i++) {
      const row = [];
      for (let j = 1; j <= 6; j++) {
        if (j % 2 != 0) {
          row.push({
            id: i * 10 + j,
            number: j,
            isReserved: true,
            orientation: "east",
          });
        } else {
          row.push({
            id: i * 10 + j,
            number: j,
            isReserved: true,
            orientation: "west",
          });
          row.push(null);
        }
      }
      rows.push(row);
    }

    numberOfRowsB = BusinessClassSeats / 6;
    for (let i = 0; i < numberOfRowsB; i++) {
      const row = [];
      for (let j = 1; j <= 6; j++) {
        if (
          contains(Math.floor((numberOfRowsF + i) * 10 + j), BookedSeatsIDs) &&
          j % 2 != 0 &&
          temp > 0
        ) {
          row.push({
            id: (numberOfRowsF + i) * 10 + j,
            number: j,
            isReserved: true,
            orientation: "east",
          });
        } else if (
          contains(Math.floor((numberOfRowsF + i) * 10 + j), BookedSeatsIDs) &&
          j % 2 != 1 &&
          temp > 0
        ) {
          row.push({
            id: (numberOfRowsF + i) * 10 + j,
            number: j,
            isReserved: true,
            orientation: "west",
          });
          row.push(null);
        } else if (j % 2 != 0 && temp > 0) {
          row.push({
            id: (numberOfRowsF + i) * 10 + j,
            number: j,
            isSelected: false,
            orientation: "east",
          });
        } else if (temp > 0) {
          row.push({
            id: (numberOfRowsF + i) * 10 + j,
            number: j,
            isSelected: false,
            orientation: "west",
          });
          row.push(null);
        }
        temp--;
      }
      rows.push(row);
    }

    numberOfRowsE = EconomyClassSeats / 6;
    for (let i = 0; i < numberOfRowsE; i++) {
      const row = [];
      for (let j = 1; j <= 6; j++) {
        if (j % 2 != 0) {
          row.push({
            id: (numberOfRowsF + numberOfRowsB + i) * 10 + j,
            number: j,
            isReserved: true,
            orientation: "east",
          });
        } else {
          row.push({
            id: (numberOfRowsF + numberOfRowsB + i) * 10 + j,
            number: j,
            isReserved: true,
            orientation: "west",
          });
          row.push(null);
        }
      }
      rows.push(row);
    }
  } else {
    let temp = EconomyClassSeats;
    numberOfRowsF = FirstClassSeats / 6;
    for (let i = 0; i < numberOfRowsF; i++) {
      const row = [];
      for (let j = 1; j <= 6; j++) {
        if (j % 2 != 0) {
          row.push({
            id: i * 10 + j,
            number: j,
            isReserved: true,
            orientation: "east",
          });
        } else {
          row.push({
            id: i * 10 + j,
            number: j,
            isReserved: true,
            orientation: "west",
          });
          row.push(null);
        }
      }
      rows.push(row);
    }

    numberOfRowsB = BusinessClassSeats / 6;
    for (let i = 0; i < numberOfRowsB; i++) {
      const row = [];
      for (let j = 1; j <= 6; j++) {
        if (j % 2 != 0) {
          row.push({
            id: (numberOfRowsF + i) * 10 + j,
            number: j,
            isReserved: true,
            orientation: "east",
          });
        } else {
          row.push({
            id: (numberOfRowsF + i) * 10 + j,
            number: j,
            isReserved: true,
            orientation: "west",
          });
          row.push(null);
        }
      }
      rows.push(row);
    }

    numberOfRowsE = EconomyClassSeats / 6;
    for (let i = 0; i < numberOfRowsE; i++) {
      const row = [];
      for (let j = 1; j <= 6; j++) {
        if (
          contains(
            Math.floor((numberOfRowsF + numberOfRowsB + i) * 10 + j),
            BookedSeatsIDs
          ) &&
          j % 2 != 0 &&
          temp > 0
        ) {
          row.push({
            id: i * 10 + j,
            number: j,
            isReserved: true,
            orientation: "east",
          });
        } else if (
          contains(
            Math.floor((numberOfRowsF + numberOfRowsB + i) * 10 + j),
            BookedSeatsIDs
          ) &&
          j % 2 != 1 &&
          temp > 0
        ) {
          row.push({
            id: (numberOfRowsF + numberOfRowsB + i) * 10 + j,
            number: j,
            isReserved: true,
            orientation: "west",
          });
          row.push(null);
        } else if (j % 2 != 0 && temp > 0) {
          row.push({
            id: (numberOfRowsF + numberOfRowsB + i) * 10 + j,
            number: j,
            isSelected: false,
            orientation: "east",
          });
          // row.push(null);
        } else if (temp > 0) {
          row.push({
            id: (numberOfRowsF + numberOfRowsB + i) * 10 + j,
            number: j,
            isSelected: false,
            orientation: "west",
          });
          row.push(null);
        }
        temp--;
      }
      rows.push(row);
    }
  }
  // for(let i=0;i<rows.length;i++){
  //   for(let j=0;j<6;j++){
  //     if(takenSeats[i][j] )
  //   }
  // }
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#082567"),
    backgroundColor: "#082567",
    "&:hover": {
      backgroundColor: "#5F9CC5",
    },
  }));

  const addSeatCallback = async ({ row, number, id }, addCb) => {
    const newTooltip = `You have already booked this seat`;
    addCb(row, number, id, newTooltip);
    const seat = { row, number, id };
    setTakenSeats((oldArray) => [...oldArray, seat]);
  };

  const removeSeatCallback = ({ row, number, id }, removeCb) => {
    const newTooltip = ["A", "B", "C"].includes(row) ? null : "";
    removeCb(row, number, newTooltip);
    setTakenSeats(takenSeats.filter((item) => item.id !== id));
  };

  let history = useHistory();
  const handleConfirmSeats = () => {
    const flight = {
      TakenSeats: takenSeats,
      Flight_id: localStorage.getItem("SelectedFlightChooseSeats"),
      User_ID: 1,
      FirstClassSeats: FirstClassSeats,
      BusinessClassSeats: BusinessClassSeats,
      EconomySeats: EconomyClassSeats,
    };

    if (numOfSeats == takenSeats.length) {
      if (
        localStorage.getItem("SelectedFlightChooseSeats") ==
        localStorage.getItem("FlightIDAro")
      ) {
        localStorage.setItem("departureSeats", JSON.stringify(takenSeats));
        localStorage.setItem("depSeatsFlag", true);
      } else {
        localStorage.setItem("returnSeats", JSON.stringify(takenSeats));
        localStorage.setItem("retSeatsFlag", true);
      }

      history.push("/user-reserved-flights");
    } else {
      handleClickOpen();
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <h1>Choose your seat/s</h1>
      <div style={{ marginTop: "100px" }}>
        <SeatPicker
          rows={rows}
          maxReservableSeats={numOfSeats}
          alpha
          visible
          selectedByDefault
          addSeatCallback={addSeatCallback}
          removeSeatCallback={removeSeatCallback}
          tooltipProps={{ multiline: true }}
        />

        <br />
        <ColorButton variant="contained" onClick={handleConfirmSeats}>
          Confirm seats
        </ColorButton>
        <CardActions>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Please choose a total of `${numOfSeats}` seats
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </CardActions>
      </div>
    </div>
  );
};

export default ReturnFlights;
