const express = require("express");
const router = express.Router();
const Flight = require("../models/flight");
const axios = require('axios').default;
/* GET home page. */
router.get("/", (req, res) => {
  res.status(200).send("You have everything installed !");
});

router.post("/create", async (req, res) => {
  const FlightNo = req.body.FlightNo;
  const DepartureDate = req.body.DepartureDate;
  const ArrivalDate = req.body.ArrivalDate;
  const DepartureTime = req.body.DepartureTime;
  const ArrivalTime = req.body.ArrivalTime;
  const EconomySeats = req.body.EconomySeats;
  const BusinessClassSeats = req.body.BusinessClassSeats;
  const DepartureAirport = req.body.DepartureAirport;
  const ArrivalAirport = req.body.ArrivalAirport;
  // console.dir(req.body);

  const newFlight = new Flight({
    FlightNo,
    DepartureDate,
    ArrivalDate,
    DepartureTime,
    ArrivalTime,
    EconomySeats,
    BusinessClassSeats,
    DepartureAirport,
    ArrivalAirport,
  });

  await newFlight.save();
});

router.get("/List", async (req, res) => {
  const flights = await Flight.find({});
  res.send(flights);
});

router.get("/search", async(req, res) => {
  const flight = req.body;

  const query = {};
  for(const p in flight){
    if(!(flight[p] =="")){
      query[`${p}`] = flight[p];
    }
  }
  Flight.find(query).then((result)=>{
    res.send(result)})

});




module.exports = router;
