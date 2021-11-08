// External variables
const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/flights");
require("dotenv").config();
const cors = require("cors");
//App variables
const axios = require('axios').default;
const app = express();
app.use(cors({ origin: true, credentials: true }));

const port = process.env.PORT || "8000";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MongoURI = process.env.MONGO_URI;
mongoose
  .connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("MongoDB is now connected"))
  .catch((err) => console.log(err));

app.use(router);

// Starting server
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
