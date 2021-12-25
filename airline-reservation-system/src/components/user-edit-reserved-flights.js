import React, { useState, useEffect } from "react";
import UserReservedFlightCardDepEdit from "./user-flight-card-dep-edit";
import UserReservedFlightCardRetEdit from "./user-flight-card-ret-edit";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./Header.js";
import HeaderLinks from "./HeaderLinks.js";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { removeSeatsAPI , searchFlightsAPI} from "../apis";

import { searchBookingsAPI } from "../../src/apis";
import "../styles/header.css";

const steps = [
  "Choose Outbound Flight",
  "Choose Return Flight",
  "Choose your Seats",
  "Confirm your Flights",
];

const theme = createTheme({
  palette: {
    primary: {
      main: "#082567",
    },
    secondary: {
      main: "#FBB404",
    },
  },
  typography: {
    fontFamily: "Philosopher",
  },
});

const ReservedFlights = () => {
  const [reservedFlight, setReservedFlight] = useState([]);

  useEffect(() => {
    const flight = {
      BookingNumber: localStorage.getItem("BookingNumberToEdit"),
    };
    (async function () {
      try {
        setReservedFlight(await searchBookingsAPI(flight));
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  let history = useHistory();

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#082567"),
    backgroundColor: "#082567",
    "&:hover": {
      backgroundColor: "#5F9CC5",
    },
  }));

  const editDepFlightHandler = async (input) => {
    const temp = JSON.stringify(input);
    const temp2 = JSON.parse(temp);
    localStorage.setItem("OutboundDepAirportEdit", temp2.DepartureAirport);
    localStorage.setItem("OutboundArrAirportEdit", temp2.ArrivalAirport);
    localStorage.setItem(
      "ReturnDepDateEdit",
      reservedFlight[0].ReturnDepartureDate
    );
    localStorage.setItem("OldTakenSeatsDep", reservedFlight[0].TakenSeats);
    localStorage.setItem("OldDepID", reservedFlight[0].Flight_ID);
    localStorage.setItem("OldDepCabin", reservedFlight[0].Cabin);
    let pricePerSeatEdit;
    if (reservedFlight[0].Cabin === "Economy") {
      pricePerSeatEdit = reservedFlight[0].EconomyPrice;
    } else if (reservedFlight[0].Cabin === "Business") {
      pricePerSeatEdit = reservedFlight[0].BusinessClassPrice;
    } else if (reservedFlight[0].Cabin === "First Class") {
      pricePerSeatEdit = reservedFlight[0].FirstClassPrice;
    }
    localStorage.setItem(
      "OldDepFlightPrice",
      pricePerSeatEdit * reservedFlight[0].TakenSeats.length
    );
    let pricePerSeatEditReturn;
    if (reservedFlight[0].Cabin === "Economy") {
      pricePerSeatEditReturn = reservedFlight[0].ReturnEconomyPrice;
    } else if (reservedFlight[0].Cabin === "Business") {
      pricePerSeatEditReturn = reservedFlight[0].ReturnBusinessClassPrice;
    } else if (reservedFlight[0].Cabin === "First Class") {
      pricePerSeatEditReturn = reservedFlight[0].ReturnFirstClassPrice;
    }
    localStorage.setItem(
      "CurrentRetFlightPrice",
      pricePerSeatEditReturn * reservedFlight[0].ReturnTakenSeats.length
    );

    history.push("/user-search-dep-edit");
  };

  const editRetFlightHandler = async (input) => {
    const temp = JSON.stringify(input);
    const temp2 = JSON.parse(temp);
    localStorage.setItem("ReturnDepAirportEdit", temp2.DepartureAirport);
    localStorage.setItem("ReturnArrAirportEdit", temp2.ArrivalAirport);
    localStorage.setItem(
      "OutboundDepDateEdit",
      reservedFlight[0].DepartureDate
    );
    localStorage.setItem(
      "OldTakenSeatsRet",
      reservedFlight[0].ReturnTakenSeats
    );
    localStorage.setItem("OldRetID", reservedFlight[0].ReturnFlight_ID);
    localStorage.setItem("OldRetCabin", reservedFlight[0].ReturnCabin);
    let pricePerSeatEdit;
    if (reservedFlight[0].ReturnCabin === "Economy") {
      pricePerSeatEdit = reservedFlight[0].ReturnEconomyPrice;
    } else if (reservedFlight[0].ReturnCabin === "Business") {
      pricePerSeatEdit = reservedFlight[0].ReturnBusinessClassPrice;
    } else if (reservedFlight[0].ReturnCabin === "First Class") {
      pricePerSeatEdit = reservedFlight[0].ReturnFirstClassPrice;
    }
    localStorage.setItem(
      "OldRetFlightPrice",
      pricePerSeatEdit * reservedFlight[0].ReturnTakenSeats.length
    );

    localStorage.setItem("OldRetCabin", reservedFlight[0].ReturnCabin);
    let pricePerSeatEditOutbound;
    if (reservedFlight[0].ReturnCabin === "Economy") {
      pricePerSeatEditOutbound = reservedFlight[0].EconomyPrice;
    } else if (reservedFlight[0].ReturnCabin === "Business") {
      pricePerSeatEditOutbound = reservedFlight[0].BusinessClassPrice;
    } else if (reservedFlight[0].ReturnCabin === "First Class") {
      pricePerSeatEditOutbound = reservedFlight[0].FirstClassPrice;
    }
    localStorage.setItem(
      "CurrentDepFlightPrice",
      pricePerSeatEditOutbound * reservedFlight[0].TakenSeats.length
    );

    history.push("/user-search-ret-edit");
  };

  const changeDepSeatsHandler = async (input) => {
    const temp = JSON.stringify(input);
    const temp2 = JSON.parse(temp);

    // remove seats

    const f = {
      _id: temp2._id
    }
    console.log(temp2._id + "test1")
    const b = await searchBookingsAPI(f);
    localStorage.setItem("EditedBookingNumber",b[0].BookingNumber)
    let f2 = await searchFlightsAPI({_id:b[0].Departure_id});

   console.log(b)
    let s = ""
    localStorage.setItem("clickedSeats",temp2.TakenSeats)
    let TakenSeats
    if(temp2.TakenSeats.length > 1){
       TakenSeats = (temp2.TakenSeats).map((seat)=> s += seat+",")
    }
    else{
       TakenSeats = s+temp2.TakenSeats[0];
    }
    
    const seatsToRemove = {
      Flight_ID: f2[0]._id,
      Cabin:b[0].Cabin,
      TakenSeats: s,
    };
    console.dir(b)
    console.log(seatsToRemove)
    await removeSeatsAPI(seatsToRemove);


    f2 = await searchFlightsAPI({_id:b[0].Departure_id});

//-----

    localStorage.setItem("DepartureAirportAro", f2[0].DepartureAirport);
    localStorage.setItem("ArrivalAirportAro", f2[0].ArrivalAirport);
    localStorage.setItem(
      "DepartureDateAro",
      f2[0].DepartureDate.substring(0, 10)
    );
    localStorage.setItem("BookedSeatsAro", JSON.stringify(f2[0].TakenSeats));
    localStorage.setItem("FlightIDAro", f2[0]._id);

    if (localStorage.getItem("UFSFClass") === "First Class") {
      localStorage.setItem("departureFlightPrice", f2[0].FirstClassPrice);
    } else if (localStorage.getItem("UFSFClass") === "Economy") {
      localStorage.setItem("departureFlightPrice", f2[0].EconomyPrice);
    } else if (localStorage.getItem("UFSFClass") === "Business") {
      localStorage.setItem("departureFlightPrice", f2[0].BusinessClassPrice);
    }
    localStorage.setItem("FirstClassSeatsAro", f2[0].FirstClassSeats);
    localStorage.setItem("BusinessClassSeatsAro", f2[0].BusinessClassSeats);
    localStorage.setItem("EconomySeatsAro", f2[0].EconomySeats);
    localStorage.setItem("FlightNoAro", f2[0].FlightNo);

    localStorage.setItem("SelectedFlightChooseSeats", f2[0]._id);
    localStorage.setItem("SelectedFlightReservedSeats", f2[0].FlightNo);

    // ----


    
    history.push("/change-seats");
  };

  const changeRetSeatsHandler = async (input) => { 
    // for return change return seats
    const temp = JSON.stringify(input);
    const temp2 = JSON.parse(temp);

    // remove seats
    console.log("INNNNN")

    const f = {
      _id: temp2._id
    }
    console.log(temp2)
    const b = await searchBookingsAPI(f);
    localStorage.setItem("EditedBookingNumber",b[0].BookingNumber)
    let f2 = await searchFlightsAPI({_id:b[0].ReturnFlight_ID});

   
    let s = ""
    localStorage.setItem("clickedSeats",temp2.TakenSeats)
    let TakenSeats
    if(temp2.TakenSeats.length > 1){
       TakenSeats = (temp2.TakenSeats).map((seat)=> s += seat+",")
    }
    else{
       TakenSeats = s+temp2.TakenSeats[0];
    }
    
    const seatsToRemove = {
      Flight_ID: f2[0]._id,
      Cabin:b[0].Cabin,
      TakenSeats: s,
    };
    console.dir(b)
    console.log(seatsToRemove)
    await removeSeatsAPI(seatsToRemove);


    f2 = await searchFlightsAPI({_id:b[0].ReturnFlight_ID});

//-----

localStorage.setItem("FlightIDKizo", f2[0]._id);
if (localStorage.getItem("UFSFClass") === "First Class") {
  localStorage.setItem("returnFlightPrice", f2[0].FirstClassPrice);
} else if (localStorage.getItem("UFSFClass") === "Economy") {
  localStorage.setItem("returnFlightPrice", f2[0].EconomyPrice);
} else if (localStorage.getItem("UFSFClass") === "Business") {
  localStorage.setItem("returnFlightPrice", f2[0].BusinessClassPrice);
}
localStorage.setItem("FirstClassSeatsKizo", f2[0].FirstClassSeats);
localStorage.setItem("BusinessClassSeatsKizo", f2[0].BusinessClassSeats);
localStorage.setItem("EconomySeatsKizo", f2[0].EconomySeats);
localStorage.setItem("BookedSeatsKizo", JSON.stringify(f2[0].TakenSeats));
localStorage.setItem("FlightNoKizo", f2[0].FlightNo);

    localStorage.setItem("SelectedFlightChooseSeats", f2[0]._id);
    localStorage.setItem("SelectedFlightReservedSeats", f2[0].FlightNo);

    // ----


    
    history.push("/change-seats");
  };

  return (
    <div>
      <Header
        color="primary"
        fixed
        brand="Git Salima Airlines"
        rightLinks={<HeaderLinks />}
      />
      <br />
      <br />
      <br />
      <Stepper activeStep={2} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <br />
      <br />
      {reservedFlight.map((flight) => (
        <div>
          <div>
            <UserReservedFlightCardDepEdit
              _id={flight._id}
              FlightNo={flight.FlightNo}
              DepartureDate={flight.DepartureDate}
              ArrivalDate={flight.ArrivalDate}
              DepartureTime={flight.DepartureTime}
              ArrivalTime={flight.ArrivalTime}
              EconomySeats={flight.EconomySeats}
              BusinessClassSeats={flight.BusinessClassSeats}
              FirstClassSeats={flight.FirstClassSeats}
              EconomyLuggage={flight.EconomyLuggage}
              BusinessClassLuggage={flight.BusinessClassLuggage}
              FirstClassLuggage={flight.FirstClassLuggage}
              EconomyPrice={flight.EconomyPrice}
              BusinessClassPrice={flight.BusinessClassPrice}
              FirstClassPrice={flight.FirstClassPrice}
              DepartureAirport={flight.DepartureAirport}
              ArrivalAirport={flight.ArrivalAirport}
              TakenSeats={flight.TakenSeats}
              Cabin={flight.Cabin}
              onClickChangeDepSeats={changeDepSeatsHandler}
              onClickEditDepFlight={editDepFlightHandler}
            />
          </div>

          <br />

          <div>
            <UserReservedFlightCardRetEdit
              _id={flight._id}
              FlightNo={flight.ReturnFlightNo}
              DepartureDate={flight.ReturnDepartureDate}
              ArrivalDate={flight.ReturnArrivalDate}
              DepartureTime={flight.ReturnDepartureTime}
              ArrivalTime={flight.ReturnArrivalTime}
              EconomySeats={flight.ReturnEconomySeats}
              BusinessClassSeats={flight.ReturnBusinessClassSeats}
              FirstClassSeats={flight.ReturnFirstClassSeats}
              EconomyLuggage={flight.ReturnEconomyLuggage}
              BusinessClassLuggage={flight.ReturnBusinessClassLuggage}
              FirstClassLuggage={flight.ReturnFirstClassLuggage}
              EconomyPrice={flight.ReturnEconomyPrice}
              BusinessClassPrice={flight.ReturnBusinessClassPrice}
              FirstClassPrice={flight.ReturnFirstClassPrice}
              DepartureAirport={flight.ReturnDepartureAirport}
              ArrivalAirport={flight.ReturnArrivalAirport}
              TakenSeats={flight.ReturnTakenSeats}
              Cabin={flight.ReturnCabin}
              onClickChangeRetSeats={changeRetSeatsHandler}
              onClickEditRetFlight={editRetFlightHandler}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReservedFlights;
