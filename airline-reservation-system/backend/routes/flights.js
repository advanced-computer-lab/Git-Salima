const express = require("express");
const router = express.Router();
const Flight = require("../models/flight");

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
  console.log(flights);
  res.send(flights);
});

router.get("/Tickets", async (req, res) => {
  res.send("opa");
});

module.exports = router;
