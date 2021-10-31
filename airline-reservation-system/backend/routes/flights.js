const express = require('express');
const router = express.Router();
const Flight = require('../models/flight');
router.use(express.urlencoded({ extended: true }));

/* GET home page. */
router.get('/', (req, res) => {
    res.status(200).send("You have everything installed !");
});

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
   // console.log(req.body.username);
    // const FlightNo = 999
    // const DepartureDate = new Date(2018, 11, 24);
    // const ArrivalDate = new Date(2018, 11, 22);
    // const DepartureTime =req.body.username;
    // const ArrivalTime = req.body.username;
    // const EconomySeats = 12;
    // const BusinessClassSeats = 122
    // const DepartureAirport = "cai2";
    // const ArrivalAirport = "cafeaulait2";

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
    //console.log(newFlight)
    const flightTest = await newFlight.save();
    res.send('gamed fash5')
   // console.log(flightTest);


});


router.get('/List', async (req, res) => {
    const flights = await Flight.find({});
    console.log(flights);
    res.send(flights);
});

// router.post('/createTrial', async (req, res) => {

//     const newFlight = new Flight({
//         FlightNo: 890,
//         DepartureDate: new Date(),
//         ArrivalDate: new Date(),
//         DepartureTime: '13:20',
//         ArrivalTime: '18:20',
//         EconomySeats: 80,
//         BusinessClassSeats: 15,
//         DepartureAirport: "CAI",
//         ArrivalAirport: "JFL=K"
//     });

//     await newFlight.save();

// });


module.exports = router;