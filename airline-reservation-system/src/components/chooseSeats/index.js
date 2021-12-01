import React, { useState, useEffect } from "react";
import SeatPicker from "react-seat-picker";
import { styled } from "@mui/material/styles";
import { Button, CardActions } from "@mui/material";
import { useHistory } from "react-router-dom";
import { contains } from "ramda";

const ReturnFlights = () => {
  const [takenSeats, setTakenSeats] = useState([]);

  let FirstClassSeats = 60;
  let BusinessClassSeats = 30;
  let EconomyClassSeats = 20;
  const numOfSeats = 6; //localStorage.getItem("numOfSeats")

  console.log(
    localStorage.getItem("SelectedFlightChooseSeats") ==
      localStorage.getItem("FlightIDAro")
  );

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

  const BookedSeats = [
    {
      id: 1,
      row: "D",
      number: 4,
    },
    {
      id: 11,
      row: "E",
      number: 2,
    },
    {
      id: 21,
      row: "F",
      number: 4,
    },
  ];

  const BookedSeatsIDs = [];
  const rows = [];
  let numberOfRowsF = 0;
  let numberOfRowsB = 0;
  let numberOfRowsE = 0;

  //let BookedSeats = JSON.parse(localStorage.getItem("BookedSeats"))
  BookedSeats.map((seat) => BookedSeatsIDs.push(seat.id));
  if (localStorage.getItem("UFSFClass") == "First Class") {
    let temp = FirstClassSeats;
    numberOfRowsF = FirstClassSeats / 6;
    console.log("num of rows = " + numberOfRowsF);
    for (let i = 0; i < numberOfRowsF; i++) {
      const row = [];
      for (let j = 1; j <= 6; j++) {
        if (contains(i * 10 + j, BookedSeatsIDs) && j % 2 != 0 && temp > 0) {
          row.push({
            id: i * 10 + j,
            number: j,
            isReserved: true,
            orientation: "east",
          });
        } else if (
          contains(i * 10 + j, BookedSeatsIDs) &&
          j % 2 != 1 &&
          temp > 0
        ) {
          row.push({
            id: i * 10 + j,
            number: j,
            isReserved: true,
            orientation: "west",
          });
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
    console.log("num of rows = " + numberOfRowsB);
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
    console.log("num of rows = " + numberOfRowsE);
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
    console.log("num of rows = " + numberOfRowsF);
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
    console.log("num of rows = " + numberOfRowsB);
    for (let i = 0; i < numberOfRowsB; i++) {
      const row = [];
      for (let j = 1; j <= 6; j++) {
        if (
          contains((numberOfRowsF + i) * 10 + j, BookedSeatsIDs) &&
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
          contains((numberOfRowsF + i) * 10 + j, BookedSeatsIDs) &&
          j % 2 != 1 &&
          temp > 0
        ) {
          row.push({
            id: (numberOfRowsF + i) * 10 + j,
            number: j,
            isReserved: true,
            orientation: "west",
          });
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
    console.log("num of rows = " + numberOfRowsE);
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
    console.log("num of rows = " + numberOfRowsF);
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
    console.log("num of rows = " + numberOfRowsB);
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
    console.log("num of rows = " + numberOfRowsE);
    for (let i = 0; i < numberOfRowsE; i++) {
      const row = [];
      for (let j = 1; j <= 6; j++) {
        if (
          contains(
            (numberOfRowsF + numberOfRowsB + i) * 10 + j,
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
            (numberOfRowsF + numberOfRowsB + i) * 10 + j,
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
        } else if (j % 2 != 0 && temp > 0) {
          row.push({
            id: (numberOfRowsF + numberOfRowsB + i) * 10 + j,
            number: j,
            isSelected: false,
            orientation: "east",
          });
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
    const newTooltip = `tooltip for id-${id} added by callback`;
    addCb(row, number, id, newTooltip);
    const seat = { row, number, id };
    setTakenSeats((oldArray) => [...oldArray, seat]);
    console.log(takenSeats);
    console.dir("added: " + "id " + id + " row " + row + " number " + number);
  };

  const removeSeatCallback = ({ row, number, id }, removeCb) => {
    const newTooltip = ["A", "B", "C"].includes(row) ? null : "";
    removeCb(row, number, newTooltip);
    setTakenSeats(takenSeats.filter((item) => item.id !== id));
    console.dir(takenSeats);
    console.dir("removed: " + "id " + id + " row " + row + " number" + number);
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
    if (
      localStorage.getItem("SelectedFlightChooseSeats") ==
      localStorage.getItem("FlightIDAro")
    ) {
      localStorage.setItem("departureSeats", JSON.stringify(takenSeats));
      localStorage.setItem("depSeatsFlag", true);
      console.dir(JSON.parse(localStorage.getItem("departureFlight")));
    } else {
      localStorage.setItem("returnSeats", JSON.stringify(takenSeats));
      localStorage.setItem("retSeatsFlag", true);
      console.dir(localStorage.getItem("returnFlight"));
    }
    history.push("/user-flights-summary");
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
      </div>
    </div>
  );
};

export default ReturnFlights;
