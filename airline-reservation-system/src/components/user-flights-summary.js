
import React, { useState, useEffect } from "react";
import UserFlightCardSeats from "./user-flight-card-seats";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Button, CardActions } from "@mui/material";

const FlightsSummary = () => {

    const [depFlight, setDepFlight] = useState([]);
    const [returnFlight, setReturnFlight] = useState([]);

    useEffect(() => {
      const departureFlight= {
        _id :localStorage.getItem("FlightIDAro")
      }
      const returnFlight= {
        _id :localStorage.getItem("FlightIDKizo")
      }
        axios.get("http://localhost:8000/search", { params: departureFlight })
          .then((res) => {
            setDepFlight(res.data);
          });
          axios.get("http://localhost:8000/search", { params: returnFlight })
          .then((res) => {
            setReturnFlight(res.data);
          });  
      }, []);

      let history = useHistory();
      const clickHandlerChooseSeats = async (input) => {
      const temp = JSON.stringify(input);
      const temp2 = JSON.parse(temp);
      localStorage.setItem("SelectedFlightChooseSeats", temp2._id);
      localStorage.setItem("SelectedFlightReservedSeats", temp2.FlightNo)
      console.log(temp2)
      history.push("/choose-seats");
    };

  const handleConfirmSeats = () => {
     
    // if(localStorage.getItem("depSelected") == "true" && localStorage.getItem("returnSelected")){

    // }
    // else{
      
    // }
    localStorage.setItem("depSeatsFlag",false)
    localStorage.setItem("retSeatsFlag",false)
    history.push("/user-flights-itinerary")
  }

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#082567"),
    backgroundColor: "#082567",
    "&:hover": {
      backgroundColor: "#5F9CC5",
    },
  }));
  

    return (
        <div>
        <h1>Reserved Flights</h1>
        {depFlight.map((flight) => (
        <div>
          <UserFlightCardSeats
            _id={flight._id}
            FlightNo={flight.FlightNo}
            DepartureDate={flight.DepartureDate}
            ArrivalDate={flight.ArrivalDate}
            DepartureTime={flight.DepartureTime}
            ArrivalTime={flight.ArrivalTime}
            Terminal={flight.Terminal}
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
            ReservedSeats={flight.TakenSeats}
            onClickChooseSeats={clickHandlerChooseSeats}
          />
        </div>
      ))}
      {returnFlight.map((flight) => (
        <div>
          <UserFlightCardSeats
            _id={flight._id}
            FlightNo={flight.FlightNo}
            DepartureDate={flight.DepartureDate}
            ArrivalDate={flight.ArrivalDate}
            DepartureTime={flight.DepartureTime}
            ArrivalTime={flight.ArrivalTime}
            Terminal={flight.Terminal}
            EconomySeats={flight.EconomySeats}
            BusinessClassSeats={flight.BusinessClassSeats}
            FirstClassSeats={flight.FirstClassSeats}
            EconomyLuggage={flight.EconomyLuggage}
            BusinessClassLuggage={flight.BusinessClassLuggage}
            FirstClassLuggage={flight.FirstClassLuggage}
            DepartureAirport={flight.DepartureAirport}
            ArrivalAirport={flight.ArrivalAirport}
            onClickChooseSeats={clickHandlerChooseSeats}
          />
        </div>
      ))}
      {(JSON.parse(localStorage.getItem("depSeatsFlag")) && JSON.parse(localStorage.getItem("retSeatsFlag")) )?
      <ColorButton variant="contained" onClick={handleConfirmSeats}>
                Proceed to Checkout
      </ColorButton>
      :
      <ColorButton variant="contained" >
                Proceed to Checkout
      </ColorButton>
      }

    </div>
    );
};

export default FlightsSummary;