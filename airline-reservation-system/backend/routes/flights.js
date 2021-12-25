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
const cors = require("cors")
const Stripe = require('stripe');

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
router.post("/checkauth", authenticateToken, (req, res) => {
  res.send(true);
});
router.post("/checkauthadmin", authenticateTokenAdmin, (req, res) => {
  res.send(true);
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
  const ReturnCabin = req.body.ReturnCabin;
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
    ReturnCabin,
    TotalPrice,
  });

  try{ await newBooking.save().then((result) => {
    res.send(result);
  });}
  catch (error) {
    res.send( error);
  }
});

async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {return res.send(false);}
  let refreshTokens = [];
  await axios.get("http://localhost:8000/listTokens").then((res1) => {
    refreshTokens = res1.data;
  });
  // console.log(refreshTokens)
  if (!refreshTokens.includes(token)) {
    res.send(false);
    return
  };
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    //console.log(err)
    console.log("alomeen");

    if (err) {
      res.send(false);
      return;
    }
    req.user = user;
    next();
  });

  // next();
}
async function authenticateTokenAdmin(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {return res.send(false);}
  let refreshTokens = [];
  await axios.get("http://localhost:8000/listTokens").then((res1) => {
    refreshTokens = res1.data;
  });
  // console.log(refreshTokens)
  if (!refreshTokens.includes(token)) {
    res.send(false);
  };
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    //console.log(err)
    console.log("alomeen");

    if (err) {
      res.send(false);
      return;
    }
    if(user.Email=="admin@gitsalima.com"){
    req.user = user;
    next();}
    else{
      res.send(false);
      return;
    }
  });

  // next();
}

router.post("/getAccessToken", async (req, res) => {
  const user1 = req.body.user;
  const token = await User.find({ Email: user1 }).Token;
  res.send(token);
});
router.post("/logout", authenticateToken, async (req, res) => {
  const email = req.user.Email;
  res.send(await User.findOneAndUpdate({ Email: email }, { Token: null }));
});
router.post("/login", async (req, res) => {
  const user1 = req.body.Email;
  const user2 = await User.find({ Email: user1 });
  if (user2.length == 0) res.send("naah");
  const Password12 = user2[0].Password;
  console.log(Password12);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("1234", salt);
  const Password1 = hashedPassword;
  try {
    if (await bcrypt.compare(req.body.Password, Password12)) {
      console.log("lakad wasalt");
      await axios
        .post("http://localhost:4000/login", { Email: user1 })
        .then((res1) => {
          console.log(res1.data.refreshToken);

          User.findByIdAndUpdate(user2[0]._id, {
            Token: res1.data.refreshToken,
          }).then((resu) => {
            res.send(res1.data.refreshToken);
          });
        });
    } else {
      return res.send(false);
    }
  } catch (error) {
    throw error;
  }
});
router.post("/createUser", async (req, res) => {
  const Email = req.body.Email;
  //const Password = await bcrypt.hash(req.body.Password,10);
  const Password = req.body.Password;
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
    TelephoneNumber,
  });

  await newUser.save().then((result) => {
    res.send(result);
  });
});

router.get("/testapi", async (req, res) => {
  // const flights = await Flight.find({});
  console.log("zizi");
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

router.get("/listlist", authenticateToken, async (req, res) => {
  // const flights = await Flight.find({});
  console.log("zizi");
  await axios.get("http://localhost:8000/getAirports").then((res1) => {
    res.send(res1.data);
  });
  // res.send(req.user);
});

router.get("/listtokens", async (req, res) => {
  // const flights = await Flight.find({});
  const l = await User.find({}, { Token: 1, _id: 0 });
  let r = [];
  for (const a of l) {
    if (!(a == "{}")) if (!(a.Token == null)) r.push(a.Token);
  }
  res.send(r);
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
      if (!(p == "TakenSeats" || p == "_id")) {
        a[`${p}`] = fl[p];
      }
    }
    a[`${"Departure" + "_id"}`] = fl["_id"];
  }

  for (const a of r) {
    let fl = {};
    fl = await Flight.findById(a.ReturnFlight_ID).lean();
    for (const p in fl) {
      if (!(p == "TakenSeats" )) {
        a[`${"Return" + p}`] = fl[p];
      }
    }
  }
  res.send(r);
});

router.post("/searchUsers", (req, res) => {
  const Users = req.body;

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

router.post("/search", (req, res) => {
  const flight = req.body;

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
router.post("/user/search", (req, res) => {
  const flight = req.body;

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
router.post("/delete", async (req, res) => {
  const flight = req.body;
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
  if (user["TakenSeats"]) {
    const seats = req.body.TakenSeats;
    let TakenSeats = [];
    console.log(seats)
    for (const p of seats) {
      const a = p.row.concat(p.number);
      const b = a.concat(p.id);
      TakenSeats.push(b);
    }
    query["TakenSeats"] = TakenSeats;
  }

  if (user["ReturnTakenSeats"]) {
    const seats = req.body.ReturnTakenSeats;
    let ReturnTakenSeats = [];
    console.log(seats)
    for (const p of seats) {
      const a = p.row.concat(p.number);
      const b = a.concat(p.id);
      ReturnTakenSeats.push(b);
    }
    query["ReturnTakenSeats"] = ReturnTakenSeats;
  }
  for (const p in user) {
    if (!(user[p] == user._id) && !(p == "BookingNumber") && !(p == "TakenSeats") && !(p == "ReturnTakenSeats")) {
      query[`${p}`] = user[p];
    }
  }

  //console.log("query");
  console.log(query);
  const user2 = await Booking.find({ BookingNumber: user.BookingNumber });
  //console.log(user2);
  const Password12 = user2[0]._id;
  //console.log(Password12);
  Booking.findByIdAndUpdate(Password12, query, { upsert: true }     ).then((result) => {

    res.send(result);
  });
});
router.post("/updateUser", async (req, res) => {
  const user = req.body;
  const query = {};
  for (const p in user) {
    if (!(user[p] == user._id || p == "Password")) {
      query[`${p}`] = user[p];
    }
  }
  User.findByIdAndUpdate(user._id, query).then((result) => {
    res.send(result);
  });
});
router.post("/updateUserPassword", async (req, res) => {
  const user1 = req.body.Email;
  const user2 = await User.find({ Email: user1 });

  const Password12 = user2[0].Password;
  console.log(Password12);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
  const Password1 = hashedPassword;
  try {
    if (await bcrypt.compare(req.body.Password, Password12)) {
      await User.findOneAndUpdate(
        { Email: user1 },
        { Password: Password1 }
      ).then((result) => {
        res.send(result);
      });
    }
  } catch (error) {
    throw error;
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
  console.log(flight);
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
  if (flight["ReturnTakenSeats"]) {
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
    if (flight.ReturnCabin == "Economy")
      await Flight.findByIdAndUpdate(flight.Return_id, {
        $inc: { FreeEconomySeats: flight.TakenSeats.length * -1 },
      });
    if (flight.ReturnCabin == "Business")
      await Flight.findByIdAndUpdate(flight.Return_id, {
        $inc: { FreeBusinessClassSeats: flight.TakenSeats.length * -1 },
      });
    if (flight.ReturnCabin == "First Class")
      await Flight.findByIdAndUpdate(flight.Return_id, {
        $inc: { FreeFirstClassSeats: flight.TakenSeats.length ** -1 },
      });

    Flight.findById(flight._id).then((result) => {
      res.send(result);
    });
  }
  else { res.send("teez") }
});

router.post("/removeSeats", async (req, res) => {
  const flight = req.body;
  console.log(flight);
  const myArray = flight.TakenSeats.split(",");
  for (const p of myArray) {
    let query = { $pull: { TakenSeats: p } };
    console.log(query);
    await Flight.findByIdAndUpdate(flight.Flight_ID, query).then((result) => {
      console.log("edeelo")
    });
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
  if (flight["ReturnTakenSeats"]) {
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
  } else {
    res.send(true);
  }
});

// const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)
const stripe = Stripe('sk_test_51K9b9SK25DXcjTVNrfciNXbdJpBEVmXATZbkCrJfA0Lvd5n5vQuCNH2Uytch1GrGxsdofEyphHmCR81fT2yWpCB6005t6juaCY');

router.post("/payment", cors(), async (req, res) => {
	let { amount, id } = req.body
  console.log("test payment")
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description: "Git Salima airlines",
			payment_method: id,
			confirm: true
		})
		console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})

module.exports = router;
