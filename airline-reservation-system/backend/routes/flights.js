const express = require("express");
const router = express.Router();
const Flight = require("../models/flight");
const axios = require('axios').default;

router.get("/", (req, res) => {
  res.status(200).send("You have everything installed !");
});

router.post("/create", async (req, res) => {
  const FlightNo = req.body.FlightNo;
  const DepartureDate = req.body.DepartureDate;
  const ArrivalDate = req.body.ArrivalDate;
  const DepartureTime = req.body.DepartureTime;
  const ArrivalTime = req.body.ArrivalTime;
  const Terminal = req.body.Terminal;
  const EconomySeats = req.body.EconomySeats;
  const BusinessClassSeats = req.body.BusinessClassSeats;
  const FirstClassSeats = req.body.FirstClassSeats;
  const EconomyLuggage = req.body.EconomyLuggage;
  const BusinessClassLuggage = req.body.BusinessClassLuggage;
  const FirstClassLuggage = req.body.FirstClassLuggage;
  const DepartureAirport = req.body.DepartureAirport;
  const ArrivalAirport = req.body.ArrivalAirport;

  const newFlight = new Flight({
    FlightNo,
    DepartureDate,
    ArrivalDate,
    DepartureTime,
    ArrivalTime,
    Terminal,
    EconomySeats,
    BusinessClassSeats,
    FirstClassSeats,
    EconomyLuggage,
    BusinessClassLuggage,
    FirstClassLuggage,
    DepartureAirport,
    ArrivalAirport,
  });

  await newFlight.save();
});

router.get("/list", async (req, res) => {
  const flights = await Flight.find({});
  res.send(flights);
});

 router.get("/search",  (req, res) => {
  const flight = req.query;

  const query = {};
  for (const p in flight) {
    if (!(flight[p] == "")) {
      query[`${p}`] = flight[p];
    }
  }
  Flight.find(query).then((result) => {
    res.send(result)
  })


});

router.get("/delete", async (req, res) => {
  const flight = req.query;
  const query = {};
  for (const p in flight) {
    if (!(flight[p] == "")) {
      query[`${p}`] = flight[p];
    }
  }
  Flight.remove(query).then((result) => {
    res.send(result)
  })

});

router.post("/update", async (req, res) => {
  const flight = req.body;
  const query = {};
  for (const p in flight) {
    if (!(flight[p] == flight._id)) {
      query[`${p}`] = flight[p];
    }
  }
  Flight.findByIdAndUpdate(flight._id, query)
    .then((result) => {
      res.send(result)
    })

});
module.exports = router;
