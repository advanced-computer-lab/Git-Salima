const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const Flight = require('../models/flight');
// router.use(express.urlencoded({ extended: true }));
=======
const Flight = require("../models/flight");
router.use(express.urlencoded({ extended: true }));
>>>>>>> f005ceeb3d44c1dab590ae2137fafd6a34d103ef

/* GET home page. */
router.get("/", (req, res) => {
  res.status(200).send("You have everything installed !");
});

<<<<<<< HEAD
router.post('/create', async (req, res) => {
    const FlightNo = Number(req.body.FlightNo);
    const DepartureDate = Date.parse(req.body.DepartureDate);
    const ArrivalDate = Date.parse(req.body.ArrivalDate);
    const DepartureTime = req.body.DepartureTime;
    const ArrivalTime = req.body.ArrivalTime;
    const EconomySeats = Number(req.body.EconomySeats);
    const BusinessClassSeats = Number(req.body.BusinessClassSeats);
    const DepartureAirport = req.body.DepartureAirport;
    const ArrivalAirport = req.body.ArrivalAirport;
    console.dir(req.body);



    const newFlight = new Flight({
        FlightNo,
        DepartureDate,
        ArrivalDate,
        DepartureTime,
        ArrivalTime,
        EconomySeats,
        BusinessClassSeats,
        DepartureAirport,
        ArrivalAirport
    });

    const flightTest = await newFlight.save();

=======
router.post("/create", async (req, res) => {
  const FlightNo = Number(req.body.FlightNo);
  const DepartureDate = Date.parse(req.body.DepartureDate);
  const ArrivalDate = Date.parse(req.body.ArrivalDate);
  const DepartureTime = req.body.DepartureTime;
  const ArrivalTime = req.body.ArrivalTime;
  const EconomySeats = Number(req.body.EconomySeats);
  const BusinessClassSeats = Number(req.body.BusinessClassSeats);
  const DepartureAirport = req.body.DepartureAirport;
  const ArrivalAirport = req.body.ArrivalAirport;
  console.dir(req.body);

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

  const flightTest = await newFlight.save();
>>>>>>> f005ceeb3d44c1dab590ae2137fafd6a34d103ef
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
