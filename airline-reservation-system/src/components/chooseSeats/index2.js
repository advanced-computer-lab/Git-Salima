
import React, { useState, useEffect } from "react";
import SeatPicker from "react-seat-picker";
import axios from "axios";
import {searchFlightsAPI} from "../../apis";
import { render } from "react-dom";




    

const ReturnFlights = () => {

  const [selected, setSelected] = useState(null);
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

    let FirstClassSeats = 60;
    let BusinessClassSeats = 30;
    let EconomyClassSeats = 20;
    let takenSeats = localStorage.getItem("BookedSeats")

    console.log(depFlight)



    if(localStorage.getItem("SelectedFlightChooseSeats") == localStorage.getItem("FlightIDAro")){
      FirstClassSeats = localStorage.getItem("FirstClassSeatsAro")
      BusinessClassSeats = localStorage.getItem("BusinessClassSeatsAro")
      EconomyClassSeats = localStorage.getItem("EconomyClassSeatsAro")
    }
    else{
      FirstClassSeats = localStorage.getItem("FirstClassSeatsKizo")
      BusinessClassSeats = localStorage.getItem("BusinessClassSeatsKizo")
      EconomyClassSeats = localStorage.getItem("EconomySeatsKizo")
    }
    
    const rows = []
    let numberOfRows = 0;
    if(localStorage.getItem("UFSFClass") == "First Class"){


    let temp = FirstClassSeats;  
    numberOfRows = FirstClassSeats / 6;
    console.log("num of rows = "+numberOfRows)
    for(let i=0; i < numberOfRows ; i++){
      const row = [];
        for(let j=1; j<=6;j++){
          if(j%2 != 0 && temp > 0){
            row.push({id:(i*10+j), number: j, isSelected: false, orientation:"east"});
          }
          else if(temp>0){
            row.push({id:(i*10+j), number: j, isSelected: false, orientation:"west"});
            row.push(null)
          }
          temp--;
        }
        rows.push(row);
    }

    numberOfRows = BusinessClassSeats / 6;
    console.log("num of rows = "+numberOfRows)
    for(let i=0; i < numberOfRows ; i++){
      const row = [];
        for(let j=1; j<=6;j++){
          if(j%2 != 0){
            row.push({id:(i*10+j), number: j, isReserved: true , orientation:"east"});
          }
          else{
            row.push({id:(i*10+j), number: j, isReserved: true, orientation:"west"});
            row.push(null)
          }
        }
        rows.push(row);
    }

    numberOfRows = EconomyClassSeats / 6;
    console.log("num of rows = "+numberOfRows)
    for(let i=0; i < numberOfRows ; i++){
      const row = [];
        for(let j=1; j<=6;j++){
          if(j%2 != 0){
            row.push({id:(i*10+j), number: j, isReserved: true, orientation:"east"});
          }
          else{
            row.push({id:(i*10+j), number: j, isReserved: true, orientation:"west"});
            row.push(null)
          }
        }
        rows.push(row);
    }

  } else if(localStorage.getItem("UFSFClass") == "Business"){

    numberOfRows = FirstClassSeats / 6;
    console.log("num of rows = "+numberOfRows)
    for(let i=0; i < numberOfRows ; i++){
      const row = [];
        for(let j=1; j<=6;j++){
          if(j%2 != 0){
            row.push({id:(i*10+j), number: j, isReserved: true, orientation:"east"});
          }
          else{
            row.push({id:(i*10+j), number: j, isReserved: true, orientation:"west"});
            row.push(null)
          }
        }
        rows.push(row);
    }

    numberOfRows = BusinessClassSeats / 6;
    console.log("num of rows = "+numberOfRows)
    for(let i=0; i < numberOfRows ; i++){
      const row = [];
        for(let j=1; j<=6;j++){
          if(j%2 != 0){
            row.push({id:(i*10+j), number: j, isSelected: false , orientation:"east"});
          }
          else{
            row.push({id:(i*10+j), number: j, isSelected: false, orientation:"west"});
            row.push(null)
          }
        }
        rows.push(row);
    }

    numberOfRows = EconomyClassSeats / 6;
    console.log("num of rows = "+numberOfRows)
    for(let i=0; i < numberOfRows ; i++){
      const row = [];
        for(let j=1; j<=6;j++){
          if(j%2 != 0){
            row.push({id:(i*10+j), number: j, isReserved: true, orientation:"east"});
          }
          else{
            row.push({id:(i*10+j), number: j, isReserved: true, orientation:"west"});
            row.push(null)
          }
        }
        rows.push(row);
    }

  } else{
    numberOfRows = FirstClassSeats / 6;
    console.log("num of rows = "+numberOfRows)
    for(let i=0; i < numberOfRows ; i++){
      const row = [];
        for(let j=1; j<=6;j++){
          if(j%2 != 0){
            row.push({id:(i*10+j), number: j, isReserved: true, orientation:"east"});
          }
          else{
            row.push({id:(i*10+j), number: j, isReserved: true, orientation:"west"});
            row.push(null)
          }
        }
        rows.push(row);
    }

    numberOfRows = BusinessClassSeats / 6;
    console.log("num of rows = "+numberOfRows)
    for(let i=0; i < numberOfRows ; i++){
      const row = [];
        for(let j=1; j<=6;j++){
          if(j%2 != 0){
            row.push({id:(i*10+j), number: j, isReserved: true , orientation:"east"});
          }
          else{
            row.push({id:(i*10+j), number: j, isReserved: true, orientation:"west"});
            row.push(null)
          }
        }
        rows.push(row);
    }

    numberOfRows = EconomyClassSeats / 6;
    console.log("num of rows = "+numberOfRows)
    for(let i=0; i < numberOfRows ; i++){
      const row = [];
        for(let j=1; j<=6;j++){
          if(j%2 != 0){
            row.push({id:(i*10+j), number: j, isSelected: false, orientation:"east"});
          }
          else{
            row.push({id:(i*10+j), number: j, isSelected: false, orientation:"west"});
            row.push(null)
          }
        }
        rows.push(row);
    }
  }
  // for(let i=0;i<rows.length;i++){
  //   for(let j=0;j<6;j++){
  //     if(takenSeats[i][j] )
  //   }
  // }
  
 
    return (
        <div>
            <h1>Choose your seat/s</h1>
            <h2>{selected}</h2>
        <div style={{ marginTop: "100px" }}>
          <SeatPicker
            setSelected= {setSelected}
            rows={rows}
            maxReservableSeats={6}
            alpha
            visible
            selectedByDefault
            tooltipProps={{ multiline: true }}
          />
        </div>
        </div>
    );
};

export default ReturnFlights;