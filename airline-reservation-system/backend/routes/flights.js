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
  const EconomySeats = req.body.EconomySeats;
  const BusinessClassSeats = req.body.BusinessClassSeats;
  const FirstClassSeats = req.body.FirstClassSeats;
  const DepartureAirport = req.body.DepartureAirport;
  const ArrivalAirport = req.body.ArrivalAirport;
  const TakenSeats=[];
  const newFlight = new Flight({
    FlightNo,
    DepartureDate,
    ArrivalDate,
    DepartureTime,
    ArrivalTime,
    EconomySeats,
    BusinessClassSeats,
    FirstClassSeats,
    DepartureAirport,
    ArrivalAirport,
    TakenSeats,
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
router.get("/user/search",  (req, res) => {
  const flight = req.query;
  
  const query = {};
  for (const p in flight) {
   
    if (!(flight[p] == "")) {
      if(p=="EconomySeats"||p=="BusinessClassSeats"||p=="FirstClassSeats")
      {
        query[`${p}`] =  {$gte:flight[p]}
       
      }
      else{
      query[`${p}`] = flight[p];
      }
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
router.get("/getAirports", async (req, res) => {
  const flights = await Flight.find({});
  const res1=["alo"];
  for (const p of flights) {
    const a=p.ArrivalAirport;
    const b=p.DepartureAirport;
    if(!res1.includes(a))
    {
      res1.push(a)
      
    }
    if(!res1.includes(b))
    {
      res1.push(b)
    }

  }
  console.dir(res1);
  res.send(res1);
});
router.post("/updateSeats", async (req, res) => {
  const flight = req.body;
  for(const p of flight.TakenSeats){
    
  const query = {$push: { TakenSeats: p } };
  
 await  Flight.findByIdAndUpdate(flight._id, query)
    
  }
  Flight.findById(flight._id).then((result) => {
    res.send(result)
  })
}
 );
module.exports = router;
