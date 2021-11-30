const express = require("express");
const router = express.Router();
const Flight = require("../models/flight");
const Booking = require("../models/booking");
const User = require("../models/user");
const axios = require('axios').default;

router.get("/", (req, res) => {
  res.status(200).send("You have everything installed !");
});



router.post("/createBooking", async (req, res) => {
  const UserID = req.body.UserID;
  const FlightID = req.body.FlightID;
   const Seats=req.body.Seats;
 
   const newBooking = new Booking({
    FlightID,
    UserID,
  
    Seats,
  });

  await newBooking.save();
});

router.post("/createUser", async (req, res) => {
  console.dir(req.body);
  const Email = req.body.Email;
  const Password = req.body.Password;
  const FirstName = req.body.FirstName;
  const LastName = req.body.LastName;
  const PassportNumber=req.body.PassportNumber;
  
  const newUser = new User({
    Email,
    Password,
  
    FirstName,
    LastName,
    PassportNumber,
  });

  await newUser.save().then((result) => {
    res.send(result)
  })


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
  const EconomyPrice = req.body.EconomyPrice;
  const BusinessClassPrice = req.body.BusinessClassPrice;
  const FirstClassPrice = req.body.FirstClassPrice;
  const DepartureAirport = req.body.DepartureAirport;
  const ArrivalAirport = req.body.ArrivalAirport;
  const TakenSeats=[];
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
    EconomyPrice,
    BusinessClassPrice, 
    FirstClassPrice,
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
router.get("/listBookings", async (req, res) => {
  const Bookings = await Booking.find({});
  res.send(Bookings);
});
router.get("/listUsers", async (req, res) => {
  const Users = await User.find({});
  res.send(Users);
});
router.get("/searchBookings",  (req, res) => {
  const booking = req.query;

  const query = {};
  for (const p in booking) {
    if (!(booking[p] == "")) {
      query[`${p}`] = booking[p];
    }
  }
  Booking.find(query).then((result) => {
    res.send(result)
  })


});

router.get("/searchUsers",  (req, res) => {
  const Users = req.query;

  const query = {};
  for (const p in Users) {
    if (!(Users[p] == "")) {
      query[`${p}`] = Users[p];
    }
  }
  User.find(query).then((result) => {
    res.send(result)
  })


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

router.get("/deletebooking", async (req, res) => {
  const flight = req.query;
  const query = {};
  for (const p in flight) {
    if (!(flight[p] == "")) {
      query[`${p}`] = flight[p];
    }
  }
  Booking.remove(query).then((result) => {
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
router.post("/updateUser", async (req, res) => {
  const user = req.body;
  const query = {};
  for (const p in user) {
    if (!(user[p] == user._id)) {
      query[`${p}`] = user[p];
    }
  }
  User.findByIdAndUpdate(user._id, query)
    .then((result) => {
      res.send(result)
    })

});

router.get("/getAirports", async (req, res) => {
  const flights = await Flight.find({});
  const res1=[];
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
  
 await  Flight.findByIdAndUpdate(flight.Flight_id, query)
    
  }
  Flight.findById(flight._id).then((result) => {
    res.send(result)
  })
}



 );

 router.post("/removeSeats", async (req, res) => {
  const flight = req.body;
  for(const p of flight.TakenSeats){
    
  const query = {$pull: { TakenSeats: p } };
  
 await  Flight.findByIdAndUpdate(flight.Flight_id, query)
    
  }
  Flight.findById(flight._id).then((result) => {
    res.send(result)
  })
});
module.exports = router;
