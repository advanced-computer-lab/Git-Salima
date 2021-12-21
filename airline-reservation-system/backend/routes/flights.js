const express = require("express");
const router = express.Router();
const Flight = require("../models/flight");
const Booking = require("../models/booking");
const User = require("../models/user");
const axios = require("axios").default;
var nodemailer = require("nodemailer");
const bcrypt = require('bcrypt')
//const passport = require('passport')
const jwt = require('jsonwebtoken')
let accessT;
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "git.salima.airlines@gmail.com",
    pass: "pa$word_123",
  },
});
router.get("/", (req, res) => {
  res.status(200).send("You have everything installed !");
});

router.post("/email", (req, res) => {
  var mailOptions = {
    from: "git.salima.airlines@gmail.com",
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.send("Email Sent");
    }
  });
});
router.post("/createBooking", async (req, res) => {
  const User_ID = req.body.User_id;
  const Flight_ID = req.body._id;
  const seats = req.body.TakenSeats;
  const ReturnFlight_ID = req.body.Return_id;
  const Returnseats = req.body.ReturnTakenSeats;
  const BookingNumber = req.body.BookingNumber;
  const Cabin = req.body.Cabin;
  const TotalPrice = req.body.TotalPrice;

  let TakenSeats = [];
  let ReturnTakenSeats = [];
  for (const p of seats) {
    const a = p.row.concat(p.number);
    const b = a.concat(p.id);
    TakenSeats.push(b);
  }

  for (const p of Returnseats) {
    const a = p.row.concat(p.number);
    const b = a.concat(p.id);
    ReturnTakenSeats.push(b);
  }

  const newBooking = new Booking({
    Flight_ID,
    ReturnFlight_ID,
    User_ID,

    TakenSeats,
    ReturnTakenSeats,
    BookingNumber,
    Cabin,
    TotalPrice,
  });

  return await newBooking.save();
});







async function authenticateToken (req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)
  let refreshTokens=[]
  await axios.get("http://localhost:8000/listTokens").then((res1) => {
  refreshTokens=res1.data
    });
   // console.log(refreshTokens)
  if (!refreshTokens.includes(token)) return res.sendStatus(403)
  jwt.verify(token,  process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    //console.log(err)
    console.log("alomeen")

    if (err) {
      
      
      return res.sendStatus(403)

    }
    req.user = user
    next()
  })

// next();
}

  router.post("/getAccessToken", async (req, res) => {
    const user1=req.body.user;
    const token= await User.find({Email : user1}).Token;
    res.send(token);
  });
  router.post("/logout",authenticateToken,async(req,res)=>{

const email=req.user.Email;
res.send(await User.findOneAndUpdate({Email:email},{Token:null}))


  });
router.post("/login",async(req,res)=>{
  const user1=req.body.Email;
  const user2= await User.find({Email : user1})
  if(user2.length==0)
  res.send("naah")
 const Password12 = user2[0].Password;
console.log(Password12)
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash("1234", salt)
const Password1 = hashedPassword
  try {
    if( await bcrypt.compare(req.body.Password, Password12)){
      console.log("lakad wasalt")
      await axios.post("http://localhost:4000/login",{Email : user1}).then((res1) => {
        console.log( res1.data.refreshToken)

         User.findByIdAndUpdate(user2[0]._id, {Token: res1.data.refreshToken}).then((resu)=>{
          res.send(res1.data.refreshToken);
         })
     
      });
    }
    else{return res.sendStatus(403);}
  } catch (error) {
    throw error
  }


});
router.post("/createUser", async (req, res) => {
  const Email = req.body.Email;
  //const Password = await bcrypt.hash(req.body.Password,10);
  const Password=req.body.Password;
  const FirstName = req.body.FirstName;
  const LastName = req.body.LastName;
  const PassportNumber = req.body.PassportNumber;
  const HomeAddress = req.body.HomeAddress;
  const CountryCode = req.body.CountryCode;
  
  const TelephoneNumber = req.body.TelephoneNumber;
  const newUser = new User({
    Email,
    Password,

    FirstName,
    LastName,
    PassportNumber,
    HomeAddress,
    CountryCode,
    TelephoneNumber
  });

  await newUser.save().then((result) => {
    res.send(result);
  });
});

router.get("/testapi",async (req, res) => {
  // const flights = await Flight.find({});
  console.log("zizi")
//   const config = {
//     headers: { Authorization: `Bearer ${accessT}` }
// };

//   await axios.get("http://localhost:8000/listlist",null,config).then((res1) => {
//    res.send(res1.data);
//    }) .catch(error => {
//     // console.dir(error.response.status)
//     res.sendStatus(error.response.status)
//  })
 await axios.post("http://localhost:4000/axi").then((res1) => {
  res.send(res1.data);
  });
   // res.send(req.user);
 });
 
 


router.get("/listlist", authenticateToken  ,async (req, res) => {
 // const flights = await Flight.find({});
 console.log("zizi")
 await axios.get("http://localhost:8000/getAirports").then((res1) => {
  res.send(res1.data);
  });
  // res.send(req.user);
});

router.get("/listtokens"  ,async (req, res) => {
  // const flights = await Flight.find({});
 const l= await User.find( {} ,{Token:1,_id:0});
 let r=[];
 for(const a of l){
   if(!(a=="{}"))
   if(!(a.Token==null))
   r.push(a.Token)
 }
 res.send(r)
   // res.send(req.user);
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
  const FreeEconomySeats = req.body.EconomySeats;
  const FreeBusinessClassSeats = req.body.BusinessClassSeats;
  const FreeFirstClassSeats = req.body.FirstClassSeats;
  const EconomyLuggage = req.body.EconomyLuggage;
  const BusinessClassLuggage = req.body.BusinessClassLuggage;
  const FirstClassLuggage = req.body.FirstClassLuggage;
  const EconomyPrice = req.body.EconomyPrice;
  const BusinessClassPrice = req.body.BusinessClassPrice;
  const FirstClassPrice = req.body.FirstClassPrice;
  const DepartureAirport = req.body.DepartureAirport;
  const ArrivalAirport = req.body.ArrivalAirport;
  const TakenSeats = [];
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
    FreeEconomySeats,
    FreeBusinessClassSeats,
    FreeFirstClassSeats,
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
router.post("/searchBookings", async (req, res) => {
  const booking = req.body;

  const query = {};
  for (const p in booking) {
    if (!(booking[p] == "")) {
      query[`${p}`] = booking[p];
    }
  }

  const r = await Booking.find(query).lean();

  for (const a of r) {
    let fl = {};
    fl = await Flight.findById(a.Flight_ID).lean();
    for (const p in fl) {
      if (!(p == "TakenSeats"||p=="_id")) {
        a[`${p}`] = fl[p];
      }
    }
    a[`${"Departure" + "_id"}`]=fl["_id"]
  }

  for (const a of r) {
    let fl = {};
    fl = await Flight.findById(a.ReturnFlight_ID).lean();
    for (const p in fl) {
      if (!(p == "TakenSeats"||p=="_id")) {
        a[`${"Return" + p}`] = fl[p];
      }
    }
  }
  res.send(r);
});

router.get("/searchUsers", (req, res) => {
  const Users = req.query;

  const query = {};
  for (const p in Users) {
    if (!(Users[p] == "")) {
      query[`${p}`] = Users[p];
    }
  }
  User.find(query).then((result) => {
    res.send(result);
  });
});

router.get("/search", (req, res) => {
  const flight = req.query;

  const query = {};
  for (const p in flight) {
    if (!(flight[p] == "")) {
      query[`${p}`] = flight[p];
    }
  }
  Flight.find(query).then((result) => {
    res.send(result);
  });
});
router.get("/user/search", (req, res) => {
  const flight = req.query;

  const query = {};
  for (const p in flight) {
    if (!(flight[p] == "")) {
      if (
        p == "EconomySeats" ||
        p == "BusinessClassSeats" ||
        p == "FirstClassSeats"
      ) {
        if (p == "EconomySeats") {
          query[`${"FreeEconomySeats"}`] = { $gte: flight[p] };
        }

        if (p == "BusinessClassSeats") {
          query[`${"FreeBusinessClassSeats"}`] = { $gte: flight[p] };
        }

        if (p == "FirstClassSeats") {
          query[`${"FreeFirstClassSeats"}`] = { $gte: flight[p] };
        }
      } else {
        query[`${p}`] = flight[p];
      }
    }
  }
  Flight.find(query).then((result) => {
    res.send(result);
  });
});
router.get("/delete", async (req, res) => {
  const flight = req.query;
  const query = {};
  for (const p in flight) {
    if (!(flight[p] == "")) {
      query[`${p}`] = flight[p];
    }
  }
  if (!(Object.keys(query).length === 0)) {
    Flight.remove(query).then((result) => {
      res.send(result);
    });
  }
});

router.post("/deleteBooking", async (req, res) => {
  const flight = req.body;

  console.dir(flight);
  const query = {};
  for (const p in flight) {
    if (!(flight[p] == "")) {
      query[`${p}`] = flight[p];
    }
  }
  if (!(Object.keys(query).length === 0)) {
    Booking.remove(query).then((result) => {
      res.send(result);
    });
  }
});

router.post("/update", async (req, res) => {
  const flight = req.body;
  const query = {};
  for (const p in flight) {
    if (!(flight[p] == flight._id)) {
      query[`${p}`] = flight[p];
    }
  }
  Flight.findByIdAndUpdate(flight._id, query).then((result) => {
    res.send(result);
  });
});
router.post("/updateBooking", async (req, res) => {
  const user = req.body;
  const query = {};
  for (const p in user) {
    if (!(user[p] == user._id)) {
      query[`${p}`] = user[p];
    }
  }
  Booking.findByIdAndUpdate(user._id, query).then((result) => {
    res.send(result);
  });
});
router.post("/updateUser", async (req, res) => {
  const user = req.body;
  const query = {};
  for (const p in user) {
    if (!(user[p] == user._id||p=="Password")) {
      query[`${p}`] = user[p];
    }
  }
  User.findByIdAndUpdate(user._id, query).then((result) => {
    res.send(result);
  });
});
router.post("/updateUserPassword", async (req, res) => {


  const user1=req.body.Email;
  const user2= await User.find({Email : user1})
  
 const Password12 = user2[0].Password;
console.log(Password12)
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(req.body.newPassword, salt)
const Password1 = hashedPassword
  try {
    if( await bcrypt.compare(req.body.Password, Password12)){
      
      await User.findOneAndUpdate({Email:user1},{Password:Password1}).then((result) => {
        res.send(result);
      });

    }}
    catch (error) {
      throw error
    }
  
  
});

router.get("/getAirports", async (req, res) => {
  const flights = await Flight.find({});
  const res1 = [];
  for (const p of flights) {
    const a = p.ArrivalAirport;
    const b = p.DepartureAirport;
    if (!res1.includes(a)) {
      res1.push(a);
    }
    if (!res1.includes(b)) {
      res1.push(b);
    }
  }
  console.dir(res1);
  res.send(res1);
});
router.post("/updateSeats", async (req, res) => {
  const flight = req.body;

  const seats = req.body.TakenSeats;

  let Taken = [];
  for (const p of seats) {
    const a = p.row.concat(p.number);
    const b = a.concat(p.id);
    Taken.push(b);
  }
  for (const p of Taken) {
    const query = { $push: { TakenSeats: p } };

    await Flight.findByIdAndUpdate(flight._id, query);
  }
  if (flight.Cabin == "Economy")
    await Flight.findByIdAndUpdate(flight._id, {
      $inc: { FreeEconomySeats: flight.TakenSeats.length * -1 },
    });
  if (flight.Cabin == "Business")
    await Flight.findByIdAndUpdate(flight._id, {
      $inc: { FreeBusinessClassSeats: flight.TakenSeats.length * -1 },
    });
  if (flight.Cabin == "First Class")
    await Flight.findByIdAndUpdate(flight._id, {
      $inc: { FreeFirstClassSeats: flight.TakenSeats.length ** -1 },
    });

  const Returnseats = req.body.ReturnTakenSeats;

  let ReturnTaken = [];
  for (const p of Returnseats) {
    const a = p.row.concat(p.number);
    const b = a.concat(p.id);
    ReturnTaken.push(b);
  }

  for (const p of ReturnTaken) {
    const query = { $push: { TakenSeats: p } };

    await Flight.findByIdAndUpdate(flight.Return_id, query);
  }
  if (flight.Cabin == "Economy")
    await Flight.findByIdAndUpdate(flight.Return_id, {
      $inc: { FreeEconomySeats: flight.TakenSeats.length * -1 },
    });
  if (flight.Cabin == "Business")
    await Flight.findByIdAndUpdate(flight.Return_id, {
      $inc: { FreeBusinessClassSeats: flight.TakenSeats.length * -1 },
    });
  if (flight.Cabin == "First Class")
    await Flight.findByIdAndUpdate(flight.Return_id, {
      $inc: { FreeFirstClassSeats: flight.TakenSeats.length ** -1 },
    });

  Flight.findById(flight._id).then((result) => {
    res.send(result);
  });
});

router.post("/removeSeats", async (req, res) => {
  const flight = req.body;
  console.log(flight);
  for (const p of flight.TakenSeats) {
    const query = { $pull: { TakenSeats: p } };

    await Flight.findByIdAndUpdate(flight.Flight_ID, query);
  }
  if (flight.Cabin == "Economy")
    await Flight.findByIdAndUpdate(flight.Flight_ID, {
      $inc: { FreeEconomySeats: flight.TakenSeats.length * 1 },
    });
  if (flight.Cabin == "Business")
    await Flight.findByIdAndUpdate(flight.Flight_ID, {
      $inc: { FreeBusinessClassSeats: flight.TakenSeats.length * 1 },
    });
  if (flight.Cabin == "First Class")
    await Flight.findByIdAndUpdate(flight.Flight_ID, {
      $inc: { FreeFirstClassSeats: flight.TakenSeats.length * 1 },
    });

  for (const p of flight.ReturnTakenSeats) {
    const query = { $pull: { TakenSeats: p } };

    await Flight.findByIdAndUpdate(flight.ReturnFlight_ID, query);
  }
  if (flight.Cabin == "Economy")
    await Flight.findByIdAndUpdate(flight.ReturnFlight_ID, {
      $inc: { FreeEconomySeats: flight.TakenSeats.length * 1 },
    });
  if (flight.Cabin == "Business")
    await Flight.findByIdAndUpdate(flight.ReturnFlight_ID, {
      $inc: { FreeBusinessClassSeats: flight.TakenSeats.length * 1 },
    });
  if (flight.Cabin == "First Class")
    await Flight.findByIdAndUpdate(flight.ReturnFlight_ID, {
      $inc: { FreeFirstClassSeats: flight.TakenSeats.length * 1 },
    });

  Flight.findById(flight.Flight_ID).then((result) => {
    res.send(result);
  });
});
module.exports = router;
